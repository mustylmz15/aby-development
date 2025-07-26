
<template>
  <div>
    <h3 class="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Arıza Bilgileri</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Arıza Türü -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Arıza Türü <span class="text-red-500">*</span>
        </label>
        <select v-model="modelValue.faultType" class="form-select" required>
          <option value="">Arıza türü seçin</option>
          <option value="Elektronik Arıza">Elektronik Arıza</option>
          <option value="Güç Arızası">Güç Arızası</option>
          <option value="Yazılım Arızası">Yazılım Arızası</option>
          <option value="Mekanik Arıza">Mekanik Arıza</option>
          <option value="Donanım Arızası">Donanım Arızası</option>
          <option value="Ağ Sorunu">Ağ Sorunu</option>
          <option value="Güvenlik Açığı">Güvenlik Açığı</option>
        </select>
      </div>
      <!-- Arıza Açıklaması -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Arıza Açıklaması <span class="text-red-500">*</span>
        </label>
        <textarea 
          v-model="modelValue.description" 
          class="form-textarea" 
          rows="4"
          placeholder="Arızayla ilgili detaylı açıklama girin..."
          required
        ></textarea>
      </div>
      <!-- Çağrı Numarası -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Çağrı Numarası
        </label>
        <input 
          type="text" 
          v-model="modelValue.ticketNumber" 
          class="form-input" 
          placeholder="Çağrı numarası girin"
        />
      </div>
      <!-- Çağrı Kaynak Sistemi -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Çağrı Kaynak Sistemi
        </label>
        <select v-model="modelValue.sourceSystem" class="form-select">
          <option value="">Kaynak sistem seçin</option>
          <option value="MAXIMO">MAXIMO</option>
          <option value="SAP FIORI">SAP FIORI</option>
          <option value="CRM">CRM</option>
          <option value="Web Portal">Web Portal</option>
          <option value="Telefon">Telefon</option>
          <option value="Manuel Giriş">Manuel Giriş</option>
        </select>
      </div>
      <!-- Çağrı Açılış Tarihi -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Çağrı Açılış Tarihi
        </label>
        <input 
          type="date" 
          v-model="modelValue.callOpenDate" 
          class="form-input"
        />
      </div>
      <!-- Çağrı Açılış Saati -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Çağrı Açılış Saati
        </label>
        <input 
          type="time" 
          v-model="modelValue.callOpenTime" 
          class="form-input"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, toRefs, watch } from 'vue';

interface FaultInfo {
  faultType: string;
  description: string;
  ticketNumber: string;
  sourceSystem: string;
  callOpenDate: string;
  callOpenTime: string;
}

const props = defineProps<{ modelValue: FaultInfo }>();
const emit = defineEmits(['update:modelValue']);

const { modelValue } = toRefs(props);

// İki yönlü binding için watcher
watch(
  modelValue,
  (val) => {
    emit('update:modelValue', val);
  },
  { deep: true }
);
</script>
