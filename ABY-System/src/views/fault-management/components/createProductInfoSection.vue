<script setup lang="ts">
import { computed } from 'vue';
// Props: modelValue (formData), projects, availableProducts, selectedSkuInfo, consignmentStockItems, availableConsignmentSerials
interface Project {
  id: string;
  name?: string;
}

interface Product {
  id: string;
  sku: string;
  name: string;
  stockNumber?: string;
  hasSerial?: boolean; // Eski alan (backward compatibility için)
  isSerialized?: boolean; // Yeni alan
  isConsignment?: boolean; // Eski alan (backward compatibility için)
  isConsumable?: boolean; // Yeni alan
  defaultRepairCenter?: string;
}

interface ConsignmentStockItem {
  id: string;
  productId?: string;
  productName?: string;
  name?: string;
  productSku?: string;
  sku?: string;
  description?: string;
  warehouseId?: string;
  serialNumbers?: string[];
  serialNumber?: string;
  quantity?: number;
}

interface FormDataType {
  project: string;
  selectedSku: string;
  faultySerialNumber: string;
  consignmentSerial: string;
  selectedConsignmentProductId: string;
  selectedConsignmentWarehouse: string;
  consignmentSerialNumber: string;
  consignmentSerialNumber2: string;
  faultyQuantity: number;
  consignmentQuantity: number;
}
const props = defineProps<{
  modelValue: FormDataType;
  projects: Project[];
  availableProducts: Product[];
  selectedSkuInfo?: Product | null;
  consignmentStockItems: ConsignmentStockItem[];
  availableConsignmentSerials: string[];
}>();
const emit = defineEmits(['update:modelValue', 'project-change', 'sku-change', 'consignment-product-change']);

// Konsinye ürün için isim bulma fonksiyonu
const getConsignmentItemName = (item: ConsignmentStockItem) => {
  console.log('🏷️ getConsignmentItemName çağrıldı:', item);
  
  // Önce item içindeki isim alanlarını kontrol et
  if (item.productName || item.name || item.productSku || item.sku || item.description) {
    const result = item.productName || item.name || item.productSku || item.sku || item.description;
    console.log('✅ İsim bulundu (direkt alanlardan):', result);
    return result;
  }
  
  // Eğer item'da productId varsa, availableProducts'tan ismini bul
  if (item.productId) {
    console.log('🔍 ProductId ile arama yapılıyor:', item.productId);
    const product = props.availableProducts.find(p => p.id === item.productId);
    if (product) {
      const result = product.name || product.sku;
      console.log('✅ İsim bulundu (productId ile):', result);
      return result;
    }
    console.log('❌ ProductId ile ürün bulunamadı');
  }
  
  // Son çare olarak fallback
  const fallback = `Konsinye Ürün ${item.id}`;
  console.log('⚠️ Fallback kullanıldı:', fallback);
  return fallback;
};

// Konsinye ürünleri gruplama - aynı ürün adı/SKU olanları tek satırda göster
const groupedConsignmentItems = computed(() => {
  console.log('🔄 groupedConsignmentItems hesaplanıyor...');
  const groups = new Map();
  
  props.consignmentStockItems.forEach((item, index) => {
    const itemName = getConsignmentItemName(item);
    console.log(`  [${index}] Item processing: "${itemName}"`);
    const key = itemName; // Aynı isme sahip ürünleri grupla
    
    if (!groups.has(key)) {
      groups.set(key, {
        name: itemName,
        items: [],
        serialNumbers: []
      });
      console.log(`    ✅ Yeni grup oluşturuldu: "${itemName}"`);
    }
    
    const group = groups.get(key);
    group.items.push(item);
    
    // Seri numaralarını topla
    if (item.serialNumbers && Array.isArray(item.serialNumbers)) {
      group.serialNumbers.push(...item.serialNumbers);
    } else if (item.serialNumber) {
      group.serialNumbers.push(item.serialNumber);
    }
    
    console.log(`    📋 Gruba eklendi. Toplam seri: ${group.serialNumbers.length}`);
  });
  
  const result = Array.from(groups.values());
  console.log('🏁 Grouping sonucu:', result);
  return result;
});

// Seçilen konsinye ürünün mevcut seri numaralarını getir
const availableSerialNumbers = computed(() => {
  if (!props.modelValue.selectedConsignmentProductId) {
    return [];
  }
  
  // Gruplardan seçilen ürünün seri numaralarını bul
  const selectedGroup = groupedConsignmentItems.value.find(group => 
    group.name === props.modelValue.selectedConsignmentProductId
  );
  
  if (selectedGroup) {
    return selectedGroup.serialNumbers;
  }
  
  // Fallback: Eski yöntemle tek item kontrol et
  const selectedItem = props.consignmentStockItems.find(item => item.id === props.modelValue.selectedConsignmentProductId);
  if (!selectedItem) {
    return [];
  }
  
  // Eğer item'da serialNumbers array'i varsa onu kullan
  if (selectedItem.serialNumbers && Array.isArray(selectedItem.serialNumbers)) {
    return selectedItem.serialNumbers;
  }
  
  // Eğer tek seri numarası varsa array'e çevir
  if (selectedItem.serialNumber) {
    return [selectedItem.serialNumber];
  }
  
  // availableConsignmentSerials'dan da kontrol et
  return props.availableConsignmentSerials || [];
});

// Konsinye ürün değişimi handler'ı
const handleConsignmentProductChange = () => {
  console.log('🔄 handleConsignmentProductChange çağrıldı');
  console.log('📋 Seçilen ürün:', props.modelValue.selectedConsignmentProductId);
  console.log('📋 Emit ediliyor:', props.modelValue.selectedConsignmentProductId);
  
  emit('consignment-product-change', props.modelValue.selectedConsignmentProductId);
};
</script>

<template>
  <div>
    <h3 class="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Ürün Bilgileri</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Proje -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Proje ID <span class="text-red-500">*</span>
        </label>
        <select v-model="modelValue.project" class="form-select" required @change="$emit('project-change')">
          <option value="">Proje ID seçin</option>
          <option v-for="project in projects" :key="project.id" :value="project.id">
            {{ project.name || project.id }}
          </option>
        </select>
      </div>

      <!-- SKU / Ürün Seçimi -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Ürün Seç <span class="text-red-500">*</span>
        </label>
        <select v-model="modelValue.selectedSku" class="form-select" required @change="$emit('sku-change')" :disabled="!modelValue.project">
          <option value="">Ürün seçin</option>
          <option v-for="product in availableProducts" :key="product.id" :value="product.id">
            {{ product.sku }} - {{ product.name }}
          </option>
        </select>
      </div>

      <!-- Ürün Adı (Otomatik doluyor) -->
      <div v-if="selectedSkuInfo">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Ürün Adı <span class="text-red-500">*</span>
        </label>
        <input type="text" :value="selectedSkuInfo.name" class="form-input bg-gray-100 dark:bg-gray-700" readonly />
      </div>

      <!-- Stok Numarası (Otomatik doluyor) -->
      <div v-if="selectedSkuInfo">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Stok Numarası
        </label>
        <input type="text" :value="selectedSkuInfo.stockNumber || selectedSkuInfo.sku" class="form-input bg-gray-100 dark:bg-gray-700" readonly />
      </div>

      <!-- Seri Numaralı Ürün için Seri Numarası -->
      <div v-if="selectedSkuInfo && selectedSkuInfo.isSerialized">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Arızalı Ürün Seri Numarası <span class="text-red-500">*</span>
        </label>
        <input type="text" v-model="modelValue.faultySerialNumber" class="form-input" placeholder="Seri numarası girin" required />
      </div>
      
      <!-- Konsinye Seri Numarası (Seri numaralı ve konsinyeli ürünler için) -->
      <div v-if="selectedSkuInfo && (selectedSkuInfo.hasSerial || selectedSkuInfo.isSerialized) && (selectedSkuInfo.isConsignment || selectedSkuInfo.isConsumable)">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Konsinye Seri Numarası <span class="text-red-500">*</span>
        </label>
        <select v-model="modelValue.consignmentSerial" class="form-select" required>
          <option value="">Konsinye seri numarası seçin</option>
          <option v-for="serial in availableConsignmentSerials" :key="serial" :value="serial">
            {{ serial }}
          </option>
        </select>
      </div>

      <!-- Konsinye Ürünler Listesi (Gruplandırılmış) -->
      <div v-if="groupedConsignmentItems.length > 0">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Konsinye Ürünler
        </label>
        <select 
          v-model="modelValue.selectedConsignmentProductId" 
          class="form-select"
          @change="handleConsignmentProductChange"
        >
          <option value="">Konsinye ürün seçin</option>
          <option v-for="group in groupedConsignmentItems" :key="group.name" :value="group.name">
            {{ group.name }} ({{ group.serialNumbers.length }} adet)
          </option>
        </select>
      </div>

      <!-- Konsinye Ürün Depo Bilgisi (Seçim yapıldıktan sonra gösterilir) -->
      <div v-if="modelValue.selectedConsignmentProductId && modelValue.selectedConsignmentWarehouse">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Konsinye Ürün Deposu
        </label>
        <input 
          type="text" 
          :value="modelValue.selectedConsignmentWarehouse" 
          class="form-input bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700" 
          readonly 
          placeholder="Konsinye ürün deposu..."
        />
        <div class="text-xs text-green-600 dark:text-green-400 mt-1">
          ✓ Bu ürünün bulunduğu depo lokasyon bölümünde otomatik seçilecek
        </div>
      </div>

      <!-- Konsinye Seri Numarası Alanı (Ürün seçilince aktif) -->
      <div v-if="modelValue.selectedConsignmentProductId">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Konsinye Ürün Seri Numarası <span class="text-red-500">*</span>
        </label>
        <select v-model="modelValue.consignmentSerialNumber" class="form-select" required>
          <option value="">Seri numarası seçin</option>
          <option v-for="serial in availableSerialNumbers" :key="serial" :value="serial">
            {{ serial }}
          </option>
        </select>
      </div>

      <!-- Seri Numarasız Ürün için Adet -->
      <div v-if="selectedSkuInfo && !selectedSkuInfo.hasSerial">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Arıza Adet <span class="text-red-500">*</span>
        </label>
        <input type="number" v-model="modelValue.faultyQuantity" class="form-input" placeholder="Arızalı adet girin" min="1" required />
      </div>

      <!-- Konsinye Adet (Seri numarasız ve konsinyeli ürünler için) -->
      <div v-if="selectedSkuInfo && !(selectedSkuInfo.hasSerial || selectedSkuInfo.isSerialized) && (selectedSkuInfo.isConsignment || selectedSkuInfo.isConsumable)">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Konsinye Adet <span class="text-red-500">*</span>
        </label>
        <input type="number" v-model="modelValue.consignmentQuantity" class="form-input" placeholder="Konsinye adet girin" :min="modelValue.faultyQuantity || 1" required />
        <div v-if="modelValue.consignmentQuantity < modelValue.faultyQuantity" class="text-red-500 text-sm mt-1">
          Konsinye adet, arızalı adetten az olamaz
        </div>
      </div>
    </div>
  </div>
</template>
