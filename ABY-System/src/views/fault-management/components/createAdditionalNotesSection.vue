
<template>
  <div>
    <h3 class="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Ek Notlar</h3>
    <textarea
      v-model="modelValue"
      class="form-textarea"
      rows="4"
      placeholder="Varsa ek notlar, Özel durumlar, vb. ..."
    ></textarea>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, toRefs, watch } from 'vue';

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(['update:modelValue']);
const { modelValue } = toRefs(props);

watch(modelValue, (val) => {
  emit('update:modelValue', val);
});
</script>
