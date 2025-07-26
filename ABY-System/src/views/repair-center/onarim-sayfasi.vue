<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="panel">
      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center space-x-3">
         
          <div>
            <h1 class="text-4xl font-bold dark:text-white-light flex items-center">
              <i class="fas fa-tools mr-4 text-orange-500 text-5xl"></i>
              Onarım İşlemleri
            </h1>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Onarım No: <span class="font-mono font-semibold">{{ repairData?.repairNumber || repairId }}</span>
            </p>
          </div>
        </div>
        
        <div class="flex space-x-3">
          
          <button @click="completeRepair" class="btn btn-primary">
            <i class="fa fa-check mr-2"></i>
            Onarımı Tamamla
          </button>
           <button 
            @click="goBack"
            class="btn btn-outline-secondary"
          >
            <i class="fa fa-arrow-left mr-2"></i>
            Geri Dön
          </button>
        </div>
      </div>
    </div>

    <!-- Birinci Grid - Temel Bilgiler (2x2) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Sol Üst - repairId -->
      <div class="panel">
        <div class="mb-5">
          <h3 class="text-lg font-semibold dark:text-white-light">
            <i class="fa fa-hashtag mr-2 text-blue-500"></i>
            Onarım ID
          </h3>
        </div>
        <div>
          <input 
            v-model="formData.repairId" 
            type="text" 
            class="form-input"
            readonly
            placeholder="Onarım ID otomatik atanacak"
          />
        </div>
      </div>

      <!-- Sağ Üst - Seri Numarası -->
      <div class="panel">
        <div class="mb-5">
          <h3 class="text-lg font-semibold dark:text-white-light">
            <i class="fa fa-barcode mr-2 text-green-500"></i>
            Seri Numarası
          </h3>
        </div>
        <div>
          <input 
            v-model="productInfo.serialNumber" 
            type="text" 
            class="form-input"
            readonly
            placeholder="Ürün seri numarası"
          />
        </div>
      </div>

      <!-- Sol Alt - SKU -->
      <div class="panel">
        <div class="mb-5">
          <h3 class="text-lg font-semibold dark:text-white-light">
            <i class="fa fa-tag mr-2 text-yellow-500"></i>
            SKU
          </h3>
        </div>
        <div>
          <input 
            v-model="productInfo.sku" 
            type="text" 
            class="form-input"
            readonly
            placeholder="Ürün SKU kodu"
          />
        </div>
      </div>

      <!-- Sağ Alt - Ürün Adı -->
      <div class="panel">
        <div class="mb-5">
          <h3 class="text-lg font-semibold dark:text-white-light">
            <i class="fa fa-cube mr-2 text-purple-500"></i>
            Ürün Adı
          </h3>
        </div>
        <div>
          <input 
            v-model="productInfo.productName" 
            type="text" 
            class="form-input"
            readonly
            placeholder="Ürün adı"
          />
        </div>
      </div>
    </div>

    <!-- İkinci Grid - Hasar ve Neden -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Sol - Hasar -->
      <div class="panel">
        <div class="mb-5 flex items-center justify-between">
          <h3 class="text-lg font-semibold dark:text-white-light">
            <i class="fa fa-exclamation-triangle mr-2 text-orange-500"></i>
            Hasar
          </h3>
          <button 
            @click="clearDamageReason" 
            class="btn btn-outline-secondary btn-sm"
            v-if="selectedDamageReasonId"
          >
            <i class="fa fa-eraser mr-1"></i>
            Temizle
          </button>
        </div>
        <div class="space-y-4">
          <!-- Mevcut seçili damage reason (tek seçim) -->
          <div v-if="selectedDamageReasonId" class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <h4 class="text-sm font-medium text-orange-700 dark:text-orange-300 mb-3">Seçili Hasar:</h4>
            <div class="flex items-center justify-between bg-white dark:bg-gray-800 rounded p-3 border border-orange-200 dark:border-orange-700">
              <span class="text-sm font-medium">{{ getDamageReasonName(selectedDamageReasonId) }}</span>
              <span class="text-xs text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/50 px-2 py-1 rounded">
                Seçildi
              </span>
            </div>
          </div>
          <!-- Hasar seçimi -->
          <div class="border border-dashed border-orange-300 dark:border-orange-600 rounded-lg p-4">
            <div class="flex items-center space-x-3">
              <select 
                v-model="selectedDamageReasonId" 
                class="form-input flex-1"
              >
                <option value="">Hasar seçin...</option>
                <option v-for="reason in availableDamageReasons" :key="reason.id" :value="reason.id">
                  {{ reason.name }}
                </option>
              </select>
            </div>            
          </div>
        </div>
      </div>

      <!-- Sağ - Neden -->
      <div class="panel">
        <div class="mb-5 flex items-center justify-between">
          <h3 class="text-lg font-semibold dark:text-white-light">
            <i class="fa fa-question-circle mr-2 text-purple-500"></i>
            Neden
          </h3>
          <button 
            @click="clearNeden" 
            class="btn btn-outline-secondary btn-sm"
            v-if="selectedNedenId"
          >
            <i class="fa fa-eraser mr-1"></i>
            Temizle
          </button>
        </div>
        <div class="space-y-4">
          <!-- Mevcut seçili neden (tek seçim) -->
          <div v-if="selectedNedenId" class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h4 class="text-sm font-medium text-purple-700 dark:text-purple-300 mb-3">Seçili Neden:</h4>
            <div class="flex items-center justify-between bg-white dark:bg-gray-800 rounded p-3 border border-purple-200 dark:border-purple-700">
              <span class="text-sm font-medium">{{ getNedenName(selectedNedenId) }}</span>
              <span class="text-xs text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded">
                Seçildi
              </span>
            </div>
          </div>
          <!-- Neden seçimi -->
          <div class="border border-dashed border-purple-300 dark:border-purple-600 rounded-lg p-4">
            <div class="flex items-center space-x-3">
              <select 
                v-model="selectedNedenId" 
                class="form-input flex-1"
              >
                <option value="">Neden seçin...</option>
                <option v-for="neden in availableNeden" :key="neden.id" :value="neden.id">
                  {{ neden.name }}
                </option>
              </select>
            </div>            
          </div>
        </div>
      </div>
    </div>

    <!-- Üçüncü Grid - removedParts ve installedParts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Sol Kolon - Çıkarılan Parçalar -->
      <div class="panel">
        <div class="mb-5 flex items-center justify-between">
          <h3 class="text-lg font-semibold dark:text-white-light">
            <i class="fa fa-minus-circle mr-2 text-red-500"></i>
            Çıkarılan Parçalar
          </h3>
          <span v-if="selectedRemovedParts.length > 0" class="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-full text-sm font-medium">
            {{ selectedRemovedParts.length }} Seçili
          </span>
        </div>
        
        <div class="space-y-4">
          <!-- Arama -->
          <div>
            <div class="relative">
              <input
                v-model="removedPartsSearchTerm"
                type="text"
                placeholder="Alt parça ara..."
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                @input="filterRemovedParts"
              />
              <i class="fa fa-search absolute right-3 top-3.5 text-gray-400"></i>
            </div>
          </div>

          <!-- Alt Parça Listesi -->
          <div class="border border-gray-300 dark:border-gray-600 rounded-lg max-h-80 overflow-y-auto">
            <div v-if="loading" class="p-4 text-center text-gray-500 dark:text-gray-400">
              <i class="fa fa-spinner fa-spin mr-2"></i>
              Alt parçalar yükleniyor...
            </div>
            <div v-else-if="filteredRemovedSubParts.length === 0" class="p-4 text-center text-gray-500 dark:text-gray-400">
              {{ removedPartsSearchTerm ? 'Arama kriterlerine uygun alt parça bulunamadı' : 'Bu ürün için alt parça tanımlanmamış' }}
            </div>
            <div
              v-for="subPart in filteredRemovedSubParts"
              :key="subPart.uniqueId || `removed-${subPart.id}`"
              @click="toggleRemovedPart(subPart)"
              class="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-600 last:border-b-0"
              :class="{
                'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800': isRemovedPartSelected(subPart.id || subPart.component?.id || 'unknown')
              }"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 dark:text-white">{{ subPart.component?.name || subPart.name }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">SKU: {{ subPart.component?.sku || subPart.sku }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-500">{{ subPart.component?.category || subPart.category || 'Alt Parça' }}</p>
                </div>
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    :id="subPart.uniqueId || `removed-checkbox-${subPart.id || subPart.component?.id || 'unknown'}`"
                    :checked="isRemovedPartSelected(subPart.id || subPart.component?.id || 'unknown')"
                    @click.stop="toggleRemovedPart(subPart)"
                    class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Seçili Çıkarılan Parçalar -->
          <div v-if="selectedRemovedParts.length > 0" class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
            <h4 class="text-sm font-medium text-red-700 dark:text-red-300 mb-3">Çıkarılacak Parçalar:</h4>
            <div class="space-y-2">
              <div
                v-for="part in selectedRemovedParts"
                :key="`selected-removed-${part.id}`"
                class="flex items-center justify-between bg-white dark:bg-gray-800 rounded p-3 border border-red-200 dark:border-red-700"
              >
                <div class="flex-1">
                  <p class="text-sm font-medium text-red-900 dark:text-red-100">{{ part.component?.name || part.name }}</p>
                  <p class="text-xs text-red-700 dark:text-red-300">{{ part.component?.sku || part.sku }}</p>
                  <!-- Seri numarası için input -->
                  <div class="mt-2">
                    <input
                      v-model="part.serialNumber"
                      type="text"
                      placeholder="Seri numarası girin..."
                      class="w-full px-2 py-1 text-xs border border-red-300 dark:border-red-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <button
                  @click="removeFromSelectedRemovedParts(part.id)"
                  class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 ml-2"
                  title="Kaldır"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sağ Kolon - Takılan Parçalar -->
      <div class="panel">
        <div class="mb-5 flex items-center justify-between">
          <h3 class="text-lg font-semibold dark:text-white-light">
            <i class="fa fa-plus-circle mr-2 text-green-500"></i>
            Takılan Parçalar
          </h3>
          <span v-if="selectedInstalledParts.length > 0" class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
            {{ selectedInstalledParts.length }} Seçili
          </span>
        </div>
        
        <div class="space-y-4">
          <!-- Arama -->
          <div>
            <div class="relative">
              <input
                v-model="installedPartsSearchTerm"
                type="text"
                placeholder="Alt parça ara..."
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                @input="filterInstalledParts"
              />
              <i class="fa fa-search absolute right-3 top-3.5 text-gray-400"></i>
            </div>
          </div>

          <!-- Alt Parça Listesi -->
          <div class="border border-gray-300 dark:border-gray-600 rounded-lg max-h-80 overflow-y-auto">
            <div v-if="loading" class="p-4 text-center text-gray-500 dark:text-gray-400">
              <i class="fa fa-spinner fa-spin mr-2"></i>
              Alt parçalar yükleniyor...
            </div>
            <div v-else-if="filteredInstalledSubParts.length === 0" class="p-4 text-center text-gray-500 dark:text-gray-400">
              {{ installedPartsSearchTerm ? 'Arama kriterlerine uygun alt parça bulunamadı' : 'Bu ürün için alt parça tanımlanmamış' }}
            </div>
            <div
              v-for="subPart in filteredInstalledSubParts"
              :key="subPart.uniqueId || `installed-${subPart.id}`"
              @click="toggleInstalledPart(subPart)"
              class="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-600 last:border-b-0"
              :class="{
                'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800': isInstalledPartSelected(subPart.id || subPart.component?.id || 'unknown')
              }"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 dark:text-white">{{ subPart.component?.name || subPart.name }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">SKU: {{ subPart.component?.sku || subPart.sku }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-500">{{ subPart.component?.category || subPart.category || 'Alt Parça' }}</p>
                </div>
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    :id="subPart.uniqueId || `installed-checkbox-${subPart.id || subPart.component?.id || 'unknown'}`"
                    :checked="isInstalledPartSelected(subPart.id || subPart.component?.id || 'unknown')"
                    @click.stop="toggleInstalledPart(subPart)"
                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Seçili Takılan Parçalar -->
          <div v-if="selectedInstalledParts.length > 0" class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h4 class="text-sm font-medium text-green-700 dark:text-green-300 mb-3">Takılacak Parçalar:</h4>
            <div class="space-y-2">
              <div
                v-for="part in selectedInstalledParts"
                :key="`selected-installed-${part.id}`"
                class="flex items-center justify-between bg-white dark:bg-gray-800 rounded p-3 border border-green-200 dark:border-green-700"
              >
                <div class="flex-1">
                  <p class="text-sm font-medium text-green-900 dark:text-green-100">{{ part.component?.name || part.name }}</p>
                  <p class="text-xs text-green-700 dark:text-green-300">{{ part.component?.sku || part.sku }}</p>
                  <!-- Seri numarası için input -->
                  <div class="mt-2">
                    <input
                      v-model="part.serialNumber"
                      type="text"
                      placeholder="Seri numarası girin..."
                      class="w-full px-2 py-1 text-xs border border-green-300 dark:border-green-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <button
                  @click="removeFromSelectedInstalledParts(part.id)"
                  class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 ml-2"
                  title="Kaldır"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dördüncü Grid - Yapılan İşlemler ve Notes -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Sol Kolon - Yapılan İşlemler -->
      <div class="panel">
        <div class="mb-5">
          <h3 class="text-lg font-semibold dark:text-white-light">
            <i class="fa fa-list-ul mr-2 text-blue-500"></i>
            Yapılan İşlemler
          </h3>
        </div>
        <div class="space-y-4">
          <!-- Mevcut seçili actions -->
          <div v-if="formData.actions.length > 0" class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 class="text-sm font-medium text-blue-700 dark:text-blue-300 mb-3">Seçili İşlemler:</h4>
            <div class="space-y-2">
              <div 
                v-for="(action, index) in formData.actions" 
                :key="`action-${index}`" 
                class="flex items-center justify-between bg-white dark:bg-gray-800 rounded p-3 border border-blue-200 dark:border-blue-700"
              >
                <span class="text-sm font-medium">{{ action }}</span>
                <button 
                  @click="removeAction(index)" 
                  class="btn btn-sm bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition-all duration-200"
                  title="Bu işlemi kaldır"
                >
                  <i class="fa fa-times text-xs"></i>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Yeni action ekleme -->
          <div class="border border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-4">
            <div class="flex items-center space-x-3">
              <select 
                v-model="newActionId" 
                class="form-input flex-1"
                @change="addActionFromSelect"
              >
                <option value="">İşlem türü seçin...</option>
                <option v-for="action in availableActions" :key="action" :value="action">
                  {{ action }}
                </option>
              </select>
              <button 
                @click="addAction" 
                class="btn btn-outline-info"
                :disabled="!newActionId"
              >
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sağ Kolon - Notes -->
      <div class="panel">
        <div class="mb-5">
          <h3 class="text-lg font-semibold dark:text-white-light">
            <i class="fa fa-sticky-note mr-2 text-yellow-500"></i>
            Notlar
          </h3>
        </div>
        <div>
          <textarea 
            v-model="formData.notes" 
            class="form-textarea min-h-[200px]" 
            placeholder="Onarım süreci ile ilgili notlarınızı buraya yazabilirsiniz..."
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="text-center mt-6">
      <button @click="submitRepair" class="btn btn-primary w-40">
        <i class="fa fa-save mr-2"></i>
        Onarımı Tamamla
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { repairAPI } from './api/repair-api';
import type { Repair } from './api/types';
import Swal from 'sweetalert2';

// Router
const route = useRoute();
const router = useRouter();

// Props & Route Params
const repairId = ref<string>(route.params.id as string || '');

// Reactive Data
const loading = ref(false);
const repairData = ref<Repair | null>(null);

// Ürün Bilgileri (readonly)
const productInfo = ref({
  serialNumber: '',
  sku: '',
  productName: ''
});

// Damage Reasons ve Actions için seçim listeleri (API'den gelecek)
const availableDamageReasons = ref<Array<{id: string, name: string}>>([]);
const availableNeden = ref<Array<{id: string, name: string}>>([]);

const availableActions = ref([
  'POE Kartı Değişimi Yapıldı',
  'Yatay Kayış Değişimi Yapıldı',
  'Yatay Motor Değişimi Yapıldı',
  'Power Kablosu Değiştirildi',
  'Kamera Modülü Değiştirildi',
  'Silindirik Halka Değiştirildi',
  'İmaj Atıldı',
  'Versiyon Güncellemesi Yapıldı',
  'Arızaya Rastlanılmadı',
  'Testler ve Genel Kontroller Yapıldı',
  'Dikey Kayış Değiştirildi',
  'Kamera Kurtarma İşlemi Yapıldı',
  'HK Bağlantı Kartı Değiştirildi',
  'İADE Yapıldı',
  'Dikey Motor Değişimi Yapıldı',
  'P/T Kontrol Devresi Değiştirildi',
  'Algılama Kartı Değiştirildi',
  'Network Kartı Değiştirildi'
]);

// Seçim inputları - Tek seçimli olarak değiştirildi
const selectedDamageReasonId = ref('');
const selectedNedenId = ref('');
const newActionId = ref('');

// Form Data - Tek seçimli sistem
const formData = ref({
  repairId: '',
  removedParts: [
    { componentProductId: '', serialNumber: '', sku: '', productName: '' }
  ],
  installedParts: [
    { componentProductId: '', serialNumber: '', sku: '', productName: '' }
  ],
  damageReasonId: '', // Tek seçim
  nedenId: '', // Tek seçim
  actions: [] as string[],
  notes: ''
});

// Yeni alt parça sistemi için değişkenler
const availableSubParts = ref<any[]>([]);

// Her liste için ayrı filtreleme array'leri  
const filteredRemovedSubParts = ref<any[]>([]);
const filteredInstalledSubParts = ref<any[]>([]);

// Çıkarılan parçalar için
const selectedRemovedParts = ref<any[]>([]);
const removedPartsSearchTerm = ref('');
const removedCheckboxStates = ref<{[key: string]: boolean}>({});

// Takılan parçalar için
const selectedInstalledParts = ref<any[]>([]);
const installedPartsSearchTerm = ref('');
const installedCheckboxStates = ref<{[key: string]: boolean}>({});

// Methods
const goBack = () => {
  router.push('/onarim-merkezi/onarim-merkezi');
};

// Helper functions - Arıza bekleyen ürünler sayfasındaki gibi
const getProductName = (repair: Repair): string => {
  return repair.item?.product?.name || 'Bilinmeyen Ürün';
};

const getProductSku = (repair: Repair): string => {
  return repair.item?.product?.sku || '-';
};

const getSerialNumber = (repair: Repair): string => {
  return repair.item?.serialNumber || '-';
};

// Helper functions for damage reasons
const getDamageReasonName = (reasonId: string): string => {
  const reason = availableDamageReasons.value.find(r => r.id === reasonId);
  return reason ? reason.name : reasonId;
};

const getNedenName = (nedenId: string): string => {
  const neden = availableNeden.value.find(n => n.id === nedenId);
  return neden ? neden.name : nedenId;
};

// API Data Loading Functions
const loadDamageReasons = async () => {
  try {

    availableDamageReasons.value = await repairAPI.getDamageReasonsByType('HASAR');

  } catch (error) {
  }
};

const loadNeden = async () => {
  try {

    availableNeden.value = await repairAPI.getDamageReasonsByType('NEDEN');

  } catch (error) {
  }
};

const loadRepairData = async () => {
  try {

    
    // API'lerden veri yüklemelerini paralel başlat
    const [repairs] = await Promise.all([
      repairAPI.getRepairsByStatus('DIAGNOSED'),
      loadDamageReasons(),
      loadNeden()
    ]);
    

    
    // Belirtilen repairId'ye sahip onarımı bul
    const targetRepair = repairs.find((repair: Repair) => 
      repair.id === repairId.value
    );
    
    if (targetRepair) {
      repairData.value = targetRepair;
      
      // Form data'yı doldur
      formData.value.repairId = targetRepair.id || repairId.value;
      
      // Ürün bilgilerini arıza bekleyen ürünler sayfasındaki helper fonksiyonlarla al
      productInfo.value = {
        serialNumber: getSerialNumber(targetRepair),
        sku: getProductSku(targetRepair),
        productName: getProductName(targetRepair)
      };
      

      
      // Ürünün alt parçalarını yükle
      const productId = targetRepair.item?.product?.id;
      if (productId) {
        await loadProductSubParts(productId);
      }
      
      // Mevcut damage reason ID varsa form'a yükle (tek seçim)
      const repairWithExtendedData = targetRepair as any;
      if (repairWithExtendedData.damageReasonId) {

        formData.value.damageReasonId = repairWithExtendedData.damageReasonId;
        selectedDamageReasonId.value = repairWithExtendedData.damageReasonId;
      }
      
      // Mevcut neden ID varsa form'a yükle (tek seçim)
      if (repairWithExtendedData.nedenId) {
 
        formData.value.nedenId = repairWithExtendedData.nedenId;
        selectedNedenId.value = repairWithExtendedData.nedenId;
      }
      
      // Mevcut actions varsa form'a yükle
      if (repairWithExtendedData.actions && repairWithExtendedData.actions.length > 0) {
    
        formData.value.actions = [...repairWithExtendedData.actions];
      }
      
      // API'den detaylı repair bilgilerini yükle (parçalar için)
      await loadRepairPartsDetails();
      
      // Notes yükle
      if (repairWithExtendedData.notes) {
        formData.value.notes = repairWithExtendedData.notes;
      }
      
    } else {
  
      // Fallback test data
      formData.value.repairId = repairId.value;
      productInfo.value = {
        serialNumber: 'TEST-SN-001',
        sku: 'TEST-SKU-001',
        productName: 'Test Ürün - Bulunamadı'
      };
    }
    
  } catch (error) {

    // Error fallback test data
    formData.value.repairId = repairId.value;
    productInfo.value = {
      serialNumber: 'ERROR-SN',
      sku: 'ERROR-SKU',
      productName: 'Hata - Veri Yüklenemedi'
    };
  }
};

const loadRepairPartsDetails = async () => {
  try {

    
    const repairDetails = await repairAPI.getRepairDetails(repairId.value);
    
    
    if (repairDetails.repairParts && repairDetails.repairParts.length > 0) {
      // Çıkarılan parçaları filtrele ve selectedRemovedParts'a ekle
      const removedParts = repairDetails.repairParts
        .filter((part: any) => part.partType === 'REMOVED')
        .map((part: any) => ({
          id: part.id,
          componentProductId: part.productId,
          serialNumber: part.serialNumber,
          sku: part.product?.sku || '',
          productName: part.product?.name || '',
          component: part.product
        }));
      
      // Takılan parçaları filtrele ve selectedInstalledParts'a ekle
      const installedParts = repairDetails.repairParts
        .filter((part: any) => part.partType === 'INSTALLED')
        .map((part: any) => ({
          id: part.id,
          componentProductId: part.productId,
          serialNumber: part.serialNumber,
          sku: part.product?.sku || '',
          productName: part.product?.name || '',
          component: part.product
        }));
      
      
      
      selectedRemovedParts.value = removedParts;
      selectedInstalledParts.value = installedParts;
      
      // Checkbox state'lerini güncelle
      removedParts.forEach(part => {
        removedCheckboxStates.value[part.id] = true;
      });
      installedParts.forEach(part => {
        installedCheckboxStates.value[part.id] = true;
      });
      
      // Eski formData formatını da koru (backwards compatibility)
      formData.value.removedParts = removedParts.map(part => ({
        componentProductId: part.componentProductId,
        serialNumber: part.serialNumber,
        sku: part.sku,
        productName: part.productName
      }));
      formData.value.installedParts = installedParts.map(part => ({
        componentProductId: part.componentProductId,
        serialNumber: part.serialNumber,
        sku: part.sku,
        productName: part.productName
      }));
    }
    
  } catch (error) {
   
  }
};

// Ürünün alt parçalarını yükle
const loadProductSubParts = async (productId: string) => {
  try {
  
    
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/api/v1/products/${productId}/components`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      const subParts = Array.isArray(data) ? data : (data.items || []);
   
      
      // Her liste için benzersiz ID'li kopyalar oluştur
      const removedSubParts = subParts.map((part, index) => {
        const baseId = part.id || part.component?.id || `auto-${index}`;
        return {
          ...part,
          id: baseId, // Fallback ID ata
          uniqueId: `removed-${baseId}-${Date.now()}-${Math.random()}`
        };
      });
      
      const installedSubParts = subParts.map((part, index) => {
        const baseId = part.id || part.component?.id || `auto-${index}`;
        return {
          ...part,
          id: baseId, // Fallback ID ata
          uniqueId: `installed-${baseId}-${Date.now()}-${Math.random()}`
        };
      });
      
      availableSubParts.value = subParts;
      filteredRemovedSubParts.value = removedSubParts;
      filteredInstalledSubParts.value = installedSubParts;
      
      // Checkbox state'lerini reset et
      removedCheckboxStates.value = {};
      installedCheckboxStates.value = {};
    } else {
      availableSubParts.value = [];
      filteredRemovedSubParts.value = [];
      filteredInstalledSubParts.value = [];
      removedCheckboxStates.value = {};
      installedCheckboxStates.value = {};
    }
  } catch (error) {
    availableSubParts.value = [];
    filteredRemovedSubParts.value = [];
    filteredInstalledSubParts.value = [];
    removedCheckboxStates.value = {};
    installedCheckboxStates.value = {};
  }
};

const addRemovedPart = () => {
  formData.value.removedParts.push({ 
    componentProductId: '', 
    serialNumber: '',
    sku: '',
    productName: ''
  });
};

const removeRemovedPart = (index: number) => {
  formData.value.removedParts.splice(index, 1);
};

const addInstalledPart = () => {
  formData.value.installedParts.push({ 
    componentProductId: '', 
    serialNumber: '',
    sku: '',
    productName: ''
  });
};

const removeInstalledPart = (index: number) => {
  formData.value.installedParts.splice(index, 1);
};

// Yeni alt parça seçim fonksiyonları
const filterRemovedParts = () => {
  const searchTerm = removedPartsSearchTerm.value.toLowerCase();
  filteredRemovedSubParts.value = availableSubParts.value
    .map((part, index) => {
      const baseId = part.id || part.component?.id || `auto-${index}`;
      return {
        ...part,
        id: baseId, // Fallback ID ata
        uniqueId: `removed-${baseId}-${Date.now()}-${Math.random()}`
      };
    })
    .filter(subPart => {
      const name = subPart.component?.name || subPart.name || '';
      const sku = subPart.component?.sku || subPart.sku || '';
      const category = subPart.component?.category || subPart.category || '';
      
      return name.toLowerCase().includes(searchTerm) ||
             sku.toLowerCase().includes(searchTerm) ||
             category.toLowerCase().includes(searchTerm);
    });
};

const filterInstalledParts = () => {
  const searchTerm = installedPartsSearchTerm.value.toLowerCase();
  filteredInstalledSubParts.value = availableSubParts.value
    .map((part, index) => {
      const baseId = part.id || part.component?.id || `auto-${index}`;
      return {
        ...part,
        id: baseId, // Fallback ID ata
        uniqueId: `installed-${baseId}-${Date.now()}-${Math.random()}`
      };
    })
    .filter(subPart => {
      const name = subPart.component?.name || subPart.name || '';
      const sku = subPart.component?.sku || subPart.sku || '';
      const category = subPart.component?.category || subPart.category || '';
      
      return name.toLowerCase().includes(searchTerm) ||
             sku.toLowerCase().includes(searchTerm) ||
             category.toLowerCase().includes(searchTerm);
    });
};

const toggleRemovedPart = (subPart: any) => {

  
  // ID belirleme stratejisi
  const partId = subPart.id || subPart.component?.id || subPart.productId || `fallback-${Date.now()}-${Math.random()}`;

  
  const isCurrentlySelected = removedCheckboxStates.value[partId] || false;
  
  if (isCurrentlySelected) {

    // Checkbox state'ini false yap
    removedCheckboxStates.value[partId] = false;
    // selectedRemovedParts'tan kaldır
    const index = selectedRemovedParts.value.findIndex(part => (part.id || part.component?.id) === partId);
    if (index > -1) {
      selectedRemovedParts.value.splice(index, 1);
    }
  } else {
    // Checkbox state'ini true yap
    removedCheckboxStates.value[partId] = true;
    // selectedRemovedParts'a ekle
    selectedRemovedParts.value.push({
      ...subPart,
      id: partId, // ID'yi zorla ata
      serialNumber: '',
      componentProductId: subPart.component?.id || subPart.id || partId
    });
  }
  

  updateFormDataFromSelections();
};

const toggleInstalledPart = (subPart: any) => {
  // ID belirleme stratejisi
  const partId = subPart.id || subPart.component?.id || subPart.productId || `fallback-${Date.now()}-${Math.random()}`;
  
  const isCurrentlySelected = installedCheckboxStates.value[partId] || false;
  
  if (isCurrentlySelected) {
    // Checkbox state'ini false yap
    installedCheckboxStates.value[partId] = false;
    // selectedInstalledParts'tan kaldır
    const index = selectedInstalledParts.value.findIndex(part => (part.id || part.component?.id) === partId);
    if (index > -1) {
      selectedInstalledParts.value.splice(index, 1);
    }
  } else {
    // Checkbox state'ini true yap
    installedCheckboxStates.value[partId] = true;
    // selectedInstalledParts'a ekle
    selectedInstalledParts.value.push({
      ...subPart,
      id: partId, // ID'yi zorla ata
      serialNumber: '',
      componentProductId: subPart.component?.id || subPart.id || partId
    });
  }
  

  updateFormDataFromSelections();
};

const isRemovedPartSelected = (partId: string) => {
  // Eğer partId undefined ise, false döndür
  if (!partId || partId === 'undefined') {

    return false;
  }
  
  const isSelected = removedCheckboxStates.value[partId] || false;

  return isSelected;
};

const isInstalledPartSelected = (partId: string) => {
  // Eğer partId undefined ise, false döndür
  if (!partId || partId === 'undefined') {
 
    return false;
  }
  
  const isSelected = installedCheckboxStates.value[partId] || false;
 
  return isSelected;
};

const removeFromSelectedRemovedParts = (partId: string) => {
  removedCheckboxStates.value[partId] = false;
  selectedRemovedParts.value = selectedRemovedParts.value.filter(part => 
    (part.id || part.component?.id) !== partId
  );
  updateFormDataFromSelections();
};

const removeFromSelectedInstalledParts = (partId: string) => {
  installedCheckboxStates.value[partId] = false;
  selectedInstalledParts.value = selectedInstalledParts.value.filter(part => 
    (part.id || part.component?.id) !== partId
  );
  updateFormDataFromSelections();
};

// FormData'yı seçimlerden güncelle
const updateFormDataFromSelections = () => {
  formData.value.removedParts = selectedRemovedParts.value.map(part => ({
    componentProductId: part.componentProductId,
    serialNumber: part.serialNumber,
    sku: part.component?.sku || part.sku || '',
    productName: part.component?.name || part.name || ''
  }));
  
  formData.value.installedParts = selectedInstalledParts.value.map(part => ({
    componentProductId: part.componentProductId,
    serialNumber: part.serialNumber,
    sku: part.component?.sku || part.sku || '',
    productName: part.component?.name || part.name || ''
  }));
};

// Hasar Management Functions (Tek seçimli)
const clearDamageReason = () => {
  selectedDamageReasonId.value = '';
  formData.value.damageReasonId = '';
};

// Neden Management Functions (Tek seçimli)
const clearNeden = () => {
  selectedNedenId.value = '';
  formData.value.nedenId = '';
};

// Reactive watchers for single selections
watch(selectedDamageReasonId, (newValue) => {
  formData.value.damageReasonId = newValue;
});

watch(selectedNedenId, (newValue) => {
  formData.value.nedenId = newValue;
});

const addAction = () => {
  if (newActionId.value && !formData.value.actions.includes(newActionId.value)) {
    formData.value.actions.push(newActionId.value);
    newActionId.value = '';
  }
};

const addActionFromSelect = () => {
  addAction();
};

const removeAction = (index: number) => {
 
  formData.value.actions.splice(index, 1);
 
};

const saveRepair = async () => {
  try {
    
    
    // Seçimlerden formData'yı güncelle
    updateFormDataFromSelections();
    
    // Veriyi API format'ına dönüştür
    const repairUpdateData = {
      repairId: formData.value.repairId,
      removedParts: formData.value.removedParts.map(part => ({
        componentProductId: part.componentProductId,
        serialNumber: part.serialNumber
      })),
      installedParts: formData.value.installedParts.map(part => ({
        componentProductId: part.componentProductId,
        serialNumber: part.serialNumber
      })),
      damageReasonIds: [formData.value.damageReasonId, formData.value.nedenId].filter(id => id !== ''),
      actions: formData.value.actions,
      notes: formData.value.notes
    };
    
   
    
    await repairAPI.updateRepairParts(repairUpdateData);
    
  
    await Swal.fire({
      icon: 'success',
      title: 'Başarılı!',
      text: 'Onarım bilgileri başarıyla kaydedildi!',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });
    
  } catch (error) {
   
    await Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Onarım kaydedilirken bir hata oluştu!',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });
  }
};

const completeRepair = async () => {
  try {
   
    
    // Seçimlerden formData'yı güncelle
    updateFormDataFromSelections();
    
    // Veriyi API format'ına dönüştür
    const repairUpdateData = {
      repairId: formData.value.repairId,
      removedParts: formData.value.removedParts.map(part => ({
        componentProductId: part.componentProductId,
        serialNumber: part.serialNumber
      })),
      installedParts: formData.value.installedParts.map(part => ({
        componentProductId: part.componentProductId,
        serialNumber: part.serialNumber
      })),
      damageReasonIds: [formData.value.damageReasonId, formData.value.nedenId].filter(id => id !== ''),
      actions: formData.value.actions,
      notes: formData.value.notes
    };
    
   
    
    await repairAPI.updateRepairParts(repairUpdateData);
    
   
    
    // SweetAlert ile başarı mesajı göster
    await Swal.fire({
      icon: 'success',
      title: 'Başarılı!',
      text: 'Arıza Başarılı Bir Şekilde Onarılmıştır',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });
    
    // Başarı mesajından sonra geri yönlendir
    router.push('/onarim-merkezi/onarim-merkezi');
    
  } catch (error) {
   
    
    // Hata durumunda SweetAlert ile hata mesajı göster
    await Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Onarım tamamlanırken bir hata oluştu!',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });
  }
};

const submitRepair = async () => {
  // submitRepair ile completeRepair aynı işlemi yapacak
  await completeRepair();
};

// Lifecycle
onMounted(async () => {
  loading.value = true;
  try {
    await loadRepairData();
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.dark .form-label {
  color: #d1d5db;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dark .form-input,
.dark .form-textarea {
  background-color: #1f2937;
  border-color: #374151;
  color: #f9fafb;
}

.dark .form-input:focus,
.dark .form-textarea:focus {
  border-color: #60a5fa;
}

.btn-outline-danger {
  color: #dc2626;
  border-color: #dc2626;
  background-color: transparent;
}

.btn-outline-danger:hover {
  color: #ffffff;
  background-color: #dc2626;
}

.btn-outline-success {
  color: #10b981;
  border-color: #10b981;
  background-color: transparent;
}

.btn-outline-success:hover {
  color: #ffffff;
  background-color: #10b981;
}

.btn-outline-warning {
  color: #f59e0b;
  border-color: #f59e0b;
  background-color: transparent;
}

.btn-outline-warning:hover {
  color: #ffffff;
  background-color: #f59e0b;
}

.btn-outline-info {
  color: #3b82f6;
  border-color: #3b82f6;
  background-color: transparent;
}

.btn-outline-info:hover {
  color: #ffffff;
  background-color: #3b82f6;
}

.btn-outline-purple {
  color: #7c3aed;
  border-color: #7c3aed;
  background-color: transparent;
}

.btn-outline-purple:hover {
  color: #ffffff;
  background-color: #7c3aed;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  line-height: 1.25rem;
}
</style>
