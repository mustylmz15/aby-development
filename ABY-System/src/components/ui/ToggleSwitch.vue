<template>
  <label class="toggle-switch" :class="{ 'disabled': disabled || loading }">
    <input 
      type="checkbox" 
      :checked="modelValue"
      :disabled="disabled || loading"
      @change="handleChange"
      class="toggle-input"
    />
    <span class="toggle-slider" :class="{ 'checked': modelValue, 'disabled': disabled || loading, 'loading': loading }">
      <span v-if="loading" class="toggle-spinner">
        <svg class="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-dasharray="60 40" />
        </svg>
      </span>
      <span v-else class="toggle-button" :class="{ 'checked': modelValue }"></span>
    </span>
    <span v-if="label" class="toggle-label" :class="{ 'disabled': disabled || loading }">
      {{ label }}
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', value: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  disabled: false,
  loading: false,
  size: 'medium',
  color: 'primary'
});

const emit = defineEmits<Emits>();

const handleChange = (event: Event) => {
  if (props.disabled || props.loading) return;
  
  const target = event.target as HTMLInputElement;
  const newValue = target.checked;
  
  emit('update:modelValue', newValue);
  emit('change', newValue);
};
</script>

<style scoped>
.toggle-switch {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s ease;
}

.toggle-switch.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.toggle-input {
  display: none;
}

.toggle-slider {
  position: relative;
  width: 44px;
  height: 24px;
  background: #e5e7eb;
  border-radius: 24px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.toggle-slider:hover:not(.disabled) {
  background: #d1d5db;
}

.toggle-slider.checked {
  background: #10b981; /* Default primary color */
}

.toggle-slider.checked:hover:not(.disabled) {
  background: #059669;
}

.toggle-slider.disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}

.toggle-button {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-button.checked {
  transform: translateX(20px);
}
</style>
