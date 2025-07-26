<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import IconX from '@/components/icon/icon-x.vue';

interface Option {
  id: string;
  name: string;
  code?: string;
  sku?: string;
}

interface Props {
  options: Option[];
  modelValue: string | string[];
  multiple?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  disabled?: boolean;
  clearable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  placeholder: 'Seçiniz...',
  searchPlaceholder: 'Ara...',
  label: '',
  disabled: false,
  clearable: false
});

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>();

const isOpen = ref(false);
const searchTerm = ref('');
const comboboxRef = ref<HTMLElement>();

// Filtered options based on search
const filteredOptions = computed(() => {
  if (!searchTerm.value) return props.options;
  
  const search = searchTerm.value.toLowerCase();
  return props.options.filter(option => 
    option.name.toLowerCase().includes(search) ||
    (option.code && option.code.toLowerCase().includes(search)) ||
    (option.sku && option.sku.toLowerCase().includes(search))
  );
});

// Selected options display
const selectedOptions = computed(() => {
  if (props.multiple) {
    const values = Array.isArray(props.modelValue) ? props.modelValue : [];
    return props.options.filter(option => values.includes(option.id));
  } else {
    return props.options.filter(option => option.id === props.modelValue);
  }
});

// Display text for the input
const displayText = computed(() => {
  if (selectedOptions.value.length === 0) {
    return props.placeholder;
  }
  
  if (props.multiple) {
    if (selectedOptions.value.length === 1) {
      const option = selectedOptions.value[0];
      return `${option.name}${option.code ? ` (${option.code})` : ''}${option.sku ? ` (${option.sku})` : ''}`;
    }
    return `${selectedOptions.value.length} öğe seçildi`;
  } else {
    const option = selectedOptions.value[0];
    return option ? `${option.name}${option.code ? ` (${option.code})` : ''}${option.sku ? ` (${option.sku})` : ''}` : props.placeholder;
  }
});

// Toggle dropdown
const toggleDropdown = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    searchTerm.value = '';
  }
};

// Clear selection (for single select)
const clearSelection = (event: Event) => {
  event.stopPropagation();
  if (!props.multiple) {
    emit('update:modelValue', '');
  }
};

// Select option
const selectOption = (option: Option) => {
  if (props.multiple) {
    const currentValues = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
    const index = currentValues.indexOf(option.id);
    
    if (index > -1) {
      currentValues.splice(index, 1);
    } else {
      currentValues.push(option.id);
    }
    
    emit('update:modelValue', currentValues);
  } else {
    emit('update:modelValue', option.id);
    isOpen.value = false;
  }
};

// Remove selected option (for multiple selection)
const removeOption = (optionId: string, event: Event) => {
  event.stopPropagation();
  if (props.multiple) {
    const currentValues = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
    const index = currentValues.indexOf(optionId);
    if (index > -1) {
      currentValues.splice(index, 1);
      emit('update:modelValue', currentValues);
    }
  }
};

// Check if option is selected
const isOptionSelected = (optionId: string) => {
  if (props.multiple) {
    const values = Array.isArray(props.modelValue) ? props.modelValue : [];
    return values.includes(optionId);
  }
  return props.modelValue === optionId;
};

// Click outside handler
const handleClickOutside = (event: Event) => {
  if (comboboxRef.value && event.target && !comboboxRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Watch for changes in isOpen to focus search input
watch(isOpen, (newValue) => {
  if (newValue) {
    // Focus search input when dropdown opens
    setTimeout(() => {
      const searchInput = comboboxRef.value?.querySelector('input[type="text"]') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    }, 100);
  }
});
</script>

<template>
  <div ref="comboboxRef" class="relative">
    <!-- Main Button -->
    <button
      type="button"
      class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-left text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
      :class="{
        'cursor-not-allowed opacity-50': disabled,
        'ring-2 ring-primary border-primary': isOpen
      }"
      @click="toggleDropdown"
      :disabled="disabled"
    >      <div class="flex items-center justify-between">
        <span class="truncate" :class="{ 'text-gray-500': !displayText || displayText === placeholder }">
          {{ displayText }}
        </span>
        
        <div class="flex items-center gap-2 flex-shrink-0 ml-2">          <!-- Clear Button for single selection -->
          <button
            v-if="clearable && !multiple && modelValue && modelValue !== ''"
            type="button"
            @click="clearSelection"
            class="hover:bg-red-50 dark:hover:bg-red-900/20 rounded p-1 transition-colors group"
            title="Seçimi temizle"
          >
            <IconX class="w-3 h-3 text-red-400 group-hover:text-red-600 dark:group-hover:text-red-300" />
          </button>
          
          <!-- Dropdown Arrow -->
          <IconCaretDown 
            class="w-4 h-4 text-gray-400 transform transition-transform duration-200"
            :class="{ 'rotate-180': isOpen }"
          />
        </div>
      </div>
    </button>

    <!-- Selected Items Chips (for multiple selection) -->
    <div v-if="multiple && selectedOptions.length > 0" class="mt-2 flex flex-wrap gap-1">
      <span
        v-for="option in selectedOptions"
        :key="option.id"
        class="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
      >
        {{ option.name }}{{ option.code ? ` (${option.code})` : '' }}{{ option.sku ? ` (${option.sku})` : '' }}        <button
          type="button"
          @click="removeOption(option.id, $event)"
          class="hover:bg-red-100 dark:hover:bg-red-900/20 rounded p-0.5 transition-colors group"
        >
          <IconX class="w-3 h-3 text-red-400 group-hover:text-red-600 dark:group-hover:text-red-300" />
        </button>
      </span>
    </div>    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute z-[9999] w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-2xl max-h-60 overflow-hidden"
      style="box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.1);"
    >
      <!-- Search Input -->
      <div class="p-3 border-b border-gray-200 dark:border-gray-700">
        <div class="relative">
          <IconSearch class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            v-model="searchTerm"
            type="text"
            :placeholder="searchPlaceholder"
            class="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <!-- Options List -->
      <div class="max-h-48 overflow-y-auto">
        <div v-if="filteredOptions.length === 0" class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
          Sonuç bulunamadı
        </div>
        
        <button
          v-for="option in filteredOptions"
          :key="option.id"
          type="button"
          class="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
          :class="{
            'bg-primary/10 text-primary': isOptionSelected(option.id),
            'text-gray-900 dark:text-white': !isOptionSelected(option.id)
          }"
          @click="selectOption(option)"
        >
          <span class="truncate">
            {{ option.name }}{{ option.code ? ` (${option.code})` : '' }}{{ option.sku ? ` (${option.sku})` : '' }}
          </span>
          
          <!-- Checkmark for selected items -->
          <div v-if="isOptionSelected(option.id)" class="w-4 h-4 flex-shrink-0 ml-2">
            <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>
