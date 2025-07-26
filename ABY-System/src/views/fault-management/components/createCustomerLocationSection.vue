
<template>
  <div>
    <h3 class="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Müşteri ve Lokasyon Bilgileri</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Müşteri Adı -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Müşteri Adı <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          v-model="modelValue.customerName"
          class="form-input"
          placeholder="Müşteri adını girin"
          required
        />
      </div>
      <!-- Telefon -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Telefon <span class="text-red-500">*</span>
        </label>
        <input
          type="tel"
          v-model="modelValue.customerPhone"
          class="form-input"
          :class="{ 'border-red-500': modelValue.customerPhone && !isValidTurkishPhoneNumber(modelValue.customerPhone) }"
          placeholder="Örn: +90 555 123 45 67 veya 0555 123 45 67"
          required
        />
        <div v-if="modelValue.customerPhone && !isValidTurkishPhoneNumber(modelValue.customerPhone)" 
             class="mt-1 text-sm text-red-600 dark:text-red-400">
          Geçerli bir Türkiye telefon numarası giriniz (5XX XXX XX XX veya 2XX/3XX/4XX XXX XX XX)
        </div>
      </div>
      <!-- E-posta -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          E-posta Adresi <span class="text-red-500">*</span>
        </label>
        <input
          type="email"
          v-model="modelValue.customerEmail"
          class="form-input"
          placeholder="E-posta adresi girin"
          required
        />
      </div>
      <!-- Lokasyon/Depo Bilgisi -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Lokasyon/Depo Bilgisi <span class="text-red-500">*</span>
        </label>
        <select v-model="modelValue.location" class="form-select" required>
          <option value="">Depo seçin</option>
          <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
            {{ warehouse.name }}
          </option>
        </select>
      </div>
      <!-- Adres -->
      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Adres <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="modelValue.customerAddress"
          class="form-textarea"
          rows="3"
          placeholder="Müşteri adresini girin"
          required
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, toRefs, watch } from 'vue';

interface Warehouse {
  id: string;
  name: string;
  address?: string;
  type: string;
}

interface CustomerLocationInfo {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  location: string;
}

const props = defineProps<{
  modelValue: CustomerLocationInfo;
  warehouses: Warehouse[];
}>();
const emit = defineEmits(['update:modelValue']);
const { modelValue, warehouses } = toRefs(props);

// Türkiye telefon numarası validasyonu
const isValidTurkishPhoneNumber = (phone: string) => {
    if (!phone) return false;
    
    // Türkiye telefon numarası formatları:
    // +90 XXX XXX XX XX
    // 0 XXX XXX XX XX
    // XXX XXX XX XX (başında 5 olan cep telefonları)
    
    // Sadece rakam ve + karakterini bırak, diğer karakterleri temizle
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    
    // Türkiye ülke kodu ile başlayanlarda +90 veya 0090 formatı
    if (cleanPhone.startsWith('+90') || cleanPhone.startsWith('0090')) {
        const phoneNumber = cleanPhone.replace(/^(\+90|0090)/, '');
        // Cep telefonu (5XX XXX XX XX format) veya sabit hat (2XX, 3XX, 4XX) kontrolü
        return /^[2-5]\d{9}$/.test(phoneNumber);
    }
    
    // 0 ile başlayan Türkiye formatı (0 XXX XXX XX XX)
    if (cleanPhone.startsWith('0')) {
        const phoneNumber = cleanPhone.substring(1);
        return /^[2-5]\d{9}$/.test(phoneNumber);
    }
    
    // Direkt 10 haneli numara (5XX XXX XX XX format)
    if (cleanPhone.length === 10) {
        return /^[2-5]\d{9}$/.test(cleanPhone);
    }
    
    return false;
};

watch(modelValue, (val) => {
  emit('update:modelValue', val);
}, { deep: true });
</script>
