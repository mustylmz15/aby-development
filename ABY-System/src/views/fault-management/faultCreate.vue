<template>
    <div>
        <!-- Breadcrumb -->
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline" @click="$router.push('/ariza-yonetimi')">Arıza Yönetimi</a>
            </li>
            <li class="before:content-['/'] before:mr-2 rtl:before:ml-2">
                <span>Yeni Arıza Kaydı</span>
            </li>
        </ul>

        <!-- Header -->
        <div class="pt-5 flex items-center justify-between">
            <h1 class="text-2xl font-bold text-primary">Yeni Arıza Kaydı</h1>
            <button type="button" class="btn btn-outline-secondary" @click="$router.back()">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Geri
            </button>
        </div>

      <!-- Main Form Panel -->
        <div class="panel mt-6">
            <div class="space-y-8">
                <!-- Ürün Bilgileri (Component) -->
                <createProductInfoSection
                  v-model="formData"
                  :projects="projects"
                  :available-products="availableProducts"
                  :selected-sku-info="selectedSkuInfo"
                  :consignment-stock-items="consignmentStockItems"
                  :available-consignment-serials="availableConsignmentSerials"
                  @project-change="onProjectChange"
                  @sku-change="onSkuChange"
                  @consignment-product-change="onConsignmentProductChange"
                />
                <!-- Arıza Bilgileri (Component) -->
                <createFaultInfoSection v-model="formData" />
                <createRepairCenterSection v-model="formData.repairCenter" :repair-centers="repairCenters" />
                <createCustomerLocationSection v-model="formData" :warehouses="warehouses.filter(w => w.type !== 'CENTRAL' && w.type !== 'REPAIR')" />

                <createAdditionalNotesSection v-model="formData.additionalNotes" />

                <!-- Action Buttons -->
                <div class="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button type="button" class="btn btn-outline-secondary" @click="cancelForm">
                        İptal
                    </button>
                    <button type="button" class="btn btn-primary" @click="submitForm">
                        <svg v-if="isSubmitting" class="animate-spin w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {{ isSubmitting ? 'Kaydediliyor...' : 'Kaydet' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-xs text-gray-500 mt-4">
            2025, ABY All rights reserved.
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import createProductInfoSection from './components/createProductInfoSection.vue';
import createFaultInfoSection from './components/createFaultInfoSection.vue';
import createRepairCenterSection from './components/createRepairCenterSection.vue';
import createCustomerLocationSection from './components/createCustomerLocationSection.vue';
import createAdditionalNotesSection from './components/createAdditionalNotesSection.vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

// Router
const router = useRouter();

// Reactive data
const isSubmitting = ref(false);

import axios from 'axios';

// Types
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

interface ProjectProduct {
    id: string;
    projectId: string;
    productId: string;
}

interface Warehouse {
    id: string;
    name: string;
    code?: string; // Depo kodu (API'de 'DEP0231', 'DEP-004' gibi)
    address?: string;
    type: string;
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
    warehouse?: { id: string; name: string; }; // Warehouse object olabilir
    location?: string; // Farklı alan adı olabilir
    depot?: string; // Farklı alan adı olabilir
    serialNumbers?: string[];
    serialNumber?: string;
    quantity?: number;
    [key: string]: any; // Diğer bilinmeyen alanlar için
}

// Projeleri, proje-ürün ilişkilerini, ürünleri ve arıza kayıtlarını veritabanından çek
const projects = ref<Project[]>([]);
const projectProducts = ref<ProjectProduct[]>([]);
const products = ref<Product[]>([]); // Ürün isim/id eşlemesi için
const repairs = ref([]);
const warehouses = ref<Warehouse[]>([]); // Depo listesi
const consignmentStockItems = ref<ConsignmentStockItem[]>([]); // Konsinye ürünler (stock-items endpointinden)
onMounted(async () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
        const responseProjects = await axios.get(`${API_BASE_URL}/api/v1/projects`, { headers });
        projects.value = responseProjects.data;
    } catch (e) {
        console.error('Projeler alınamadı:', e);
    }
    try {
        const responseProjectProducts = await axios.get(`${API_BASE_URL}/api/v1/project-products`, { headers });
        projectProducts.value = responseProjectProducts.data;
    } catch (e) {
        console.error('Proje-ürün ilişkileri alınamadı:', e);
    }
    try {
        const responseProducts = await axios.get(`${API_BASE_URL}/api/v1/products`, { headers });
        products.value = responseProducts.data;
    } catch (e) {
        console.error('Ürünler alınamadı:', e);
    }
    try {
        const responseWarehouses = await axios.get(`${API_BASE_URL}/api/v1/warehouses`, { headers });
        console.log('Depo API response:', responseWarehouses.data);
        warehouses.value = responseWarehouses.data;
    } catch (e) {
        console.error('Depolar alınamadı:', e);
    }
    try {
        const responseRepairs = await axios.get(`${API_BASE_URL}/api/v1/repairs`, { headers });
        repairs.value = responseRepairs.data;
    } catch (e) {
        console.error('Arıza kayıtları alınamadı:', e);
    }
});

// formData tanımından sonra müşteri bilgilerini localStorage'den doldur
onMounted(() => {
    if (isEditMode.value) {
        const state = history.state;
        if (state && state.fault) {
            fillFormDataForEdit(state.fault, state.productInfo, state.customerInfo, state.repairCenter);
        }
    } else {
        formData.value.customerName = localStorage.getItem('customerName') || '';
        formData.value.customerPhone = localStorage.getItem('customerPhone') || '';
        formData.value.customerEmail = localStorage.getItem('customerEmail') || '';
    }
});

// Ürünler artık products API'den çekiliyor

const repairCenters = computed(() => {
    // warehouses tablosundan type === 'REPAIR' olanları filtrele
    return warehouses.value
        .filter((w: any) => w.type === 'REPAIR')
        .map((w: any) => ({
            id: w.id,
            name: w.name,
            location: w.address || ''
        }));
});

const availableConsignmentSerials = ref([
    'CNS-2025-001234',
    'CNS-2025-001235',
    'CNS-2025-001236',
    'CNS-2025-001237',
    'CNS-2025-001238'
]);

const formData = ref({
    // Ürün Bilgileri
    project: '',
    selectedSku: '',
    faultySerialNumber: '',
    consignmentSerial: '',
    selectedConsignmentProductId: '', // Konsinye ürün select için
    selectedConsignmentWarehouse: '', // Konsinye ürünün deposu (readonly)
    consignmentSerialNumber: '', // Konsinye ürün seri numarası
    consignmentSerialNumber2: '', // (Kullanılmıyor, eski alan)
    faultyQuantity: 1,
    consignmentQuantity: 1,
    
    // Arıza Bilgileri
    faultType: '',
    description: '',
    ticketNumber: '',
    sourceSystem: '',
    callOpenDate: '',
    callOpenTime: '',
      // Onarım Merkezi
    repairCenter: '',
    
    // Müşteri Bilgileri
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: '',
    location: '',
    
    // Ek Notlar

    additionalNotes: ''
});

// Edit mode detection
import { useRoute } from 'vue-router';
const route = useRoute();
const isEditMode = computed(() => {
    return !!route.params.id && (route.query.fault || history.state?.fault);
});

// Fill formData for edit mode
const fillFormDataForEdit = (fault, productInfo, customerInfo, repairCenter) => {
    formData.value.project = productInfo?.project || '';
    formData.value.selectedSku = productInfo?.skuCode || '';
    formData.value.faultySerialNumber = productInfo?.serialNumber || '';
    formData.value.consignmentSerial = productInfo?.consignmentSerial || '';
    formData.value.consignmentSerialNumber = productInfo?.consignmentSerialNumber || '';
    formData.value.consignmentSerialNumber2 = productInfo?.consignmentSerialNumber2 || '';
    formData.value.faultyQuantity = productInfo?.quantity || 1;
    formData.value.consignmentQuantity = productInfo?.consignmentQuantity || 1;
    formData.value.faultType = fault?.faultType || '';
    formData.value.description = fault?.description || '';
    formData.value.ticketNumber = fault?.ticketNumber || '';
    formData.value.sourceSystem = fault?.sourceSystem || '';
    formData.value.callOpenDate = fault?.callOpenDate || '';
    formData.value.callOpenTime = fault?.callOpenTime || '';
    formData.value.repairCenter = repairCenter?.assignedCenter || '';
    formData.value.customerName = customerInfo?.customerName || '';
    formData.value.customerPhone = customerInfo?.phone || '';
    formData.value.customerEmail = customerInfo?.email || '';
    formData.value.customerAddress = customerInfo?.address || '';
    formData.value.location = customerInfo?.location || '';
    formData.value.additionalNotes = fault?.additionalNotes || '';
};


// Computed
const selectedSkuInfo = computed(() => {
    if (!formData.value.selectedSku) return null;
    return products.value.find((product: Product) => product.id === formData.value.selectedSku) || null;
});

const availableProducts = computed(() => {
    // Eğer proje seçildiyse, o projeye ait ürün id'lerini projectProducts'tan bul
    if (!formData.value.project) return [];
    const productIds = projectProducts.value
        .filter((pp: ProjectProduct) => pp.projectId === formData.value.project)
        .map((pp: ProjectProduct) => pp.productId);
    // Sonra products listesinden bu id'lere karşılık gelen ürünleri bul
    return products.value.filter((product: Product) => productIds.includes(product.id));
});

const selectedProductInfo = computed(() => {
    if (!formData.value.selectedSku) return null;
    return products.value.find((product: Product) => product.id === formData.value.selectedSku);
});

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

// Telefon numarasını temizleyip Türkiye formatına getir
const formatTurkishPhoneNumber = (phone: string) => {
    if (!phone) return phone;
    
    // Sadece rakam ve + karakterini bırak
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    
    // +90 ile başlıyorsa temizle
    if (cleanPhone.startsWith('+90')) {
        return '0' + cleanPhone.substring(3);
    }
    
    // 0090 ile başlıyorsa temizle
    if (cleanPhone.startsWith('0090')) {
        return '0' + cleanPhone.substring(4);
    }
    
    // 0 ile başlamıyorsa ve 10 haneliyse başına 0 ekle
    if (!cleanPhone.startsWith('0') && cleanPhone.length === 10) {
        return '0' + cleanPhone;
    }
    
    return cleanPhone;
};

const isFormValid = computed(() => {
    const basicValidation = formData.value.project && 
                           formData.value.selectedSku && 
                           formData.value.faultType &&
                           formData.value.description &&
                           formData.value.customerName &&
                           formData.value.customerPhone &&
                           formData.value.customerEmail &&
                           formData.value.customerAddress &&
                           formData.value.location;

    if (!basicValidation) return false;

    // Telefon numarası formatı kontrolü
    if (!isValidTurkishPhoneNumber(formData.value.customerPhone)) {
        return false;
    }

    const skuInfo = selectedSkuInfo.value;
    if (!skuInfo) return false;

    // Seri numaralı ürünler için validasyon
    if (skuInfo.hasSerial) {
        if (!formData.value.faultySerialNumber) return false;
        if ((skuInfo.isConsignment || skuInfo.isConsumable) && !formData.value.consignmentSerial) return false;
    } else {
        // Seri numarasız ürünler için validasyon
        if (!formData.value.faultyQuantity || formData.value.faultyQuantity < 1) return false;
        if (skuInfo.isConsignment || skuInfo.isConsumable) {
            if (!formData.value.consignmentQuantity || formData.value.consignmentQuantity < formData.value.faultyQuantity) return false;
        }
    }

    return true;
});

// Methods
const fetchConsignmentStockItems = async (projectId: string) => {
    if (!projectId) {
        consignmentStockItems.value = [];
        return;
    }
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/stock-items?projectId=${projectId}`, { headers });
        consignmentStockItems.value = response.data || [];
    } catch (e) {
        consignmentStockItems.value = [];
        console.error('Konsinye ürünler alınamadı:', e);
    }
};

// Ana dosyada da getConsignmentItemName benzeri fonksiyon
const getItemName = (item: ConsignmentStockItem) => {
    // products array'inde productId ile ara
    if (item.productId) {
        const product = products.value.find(p => p.id === item.productId);
        if (product) {
            return product.name || product.sku;
        }
    }
    
    // Direkt alanlardan ara
    if (item.productName || item.name || item.productSku || item.sku || item.description) {
        return item.productName || item.name || item.productSku || item.sku || item.description;
    }
    
    // Fallback
    return `Konsinye Ürün ${item.id}`;
};

// Konsinye ürün seçildiğinde otomatik depo seçimi
const onConsignmentProductChange = (consignmentProductId: string) => {
    console.log('🔄 onConsignmentProductChange çağrıldı:', consignmentProductId);
    
    if (!consignmentProductId) {
        console.log('❌ Konsinye ürün ID boş, depo bilgisi temizleniyor');
        formData.value.selectedConsignmentWarehouse = '';
        return;
    }
    
    console.log('📋 Mevcut konsinye ürünler:', consignmentStockItems.value);
    console.log('🔍 Aranan ürün adı:', consignmentProductId);
    
    // Seçilen konsinye ürünün hangi depoda olduğunu bul
    let selectedItem: ConsignmentStockItem | null = null;
    
    // Debug: Tüm item'ları kontrol et
    console.log('🔄 Konsinye ürünleri kontrol ediliyor:');
    for (const item of consignmentStockItems.value) {
        // getConsignmentItemName fonksiyonunu ana dosyada da çağır
        const itemNameFromFunction = getItemName(item);
        const itemNameFallback = item.productName || item.name || item.productSku || item.sku || item.description || `Konsinye Ürün ${item.id}`;
        
        // Depo ID'sini farklı alanlardan bulmaya çalış
        const warehouseId = item.warehouseId || 
                           item.warehouse?.id || 
                           item.location || 
                           item.depot ||
                           item['warehouse_id'] ||
                           item['depot_id'] ||
                           item.locationId ||
                           item.depotId;
        
        // Eğer warehouseId bulunamadıysa, status alanından depo kodunu al ve depo ID'sine çevir
        let finalWarehouseId = warehouseId;
        if (!finalWarehouseId && item.status) {
            // status: 'DEPO' gibi bir değer varsa, bunu depo code ile eşleştir
            const matchingWarehouse = warehouses.value.find((w: Warehouse) => 
                w.code === item.status || 
                w.name?.includes(item.status) ||
                w.id === item.status
            );
            if (matchingWarehouse) {
                finalWarehouseId = matchingWarehouse.id;
                console.log(`    � Status '${item.status}' ile depo bulundu:`, matchingWarehouse);
            }
        }
        
        console.log(`  �📦 Item Analysis:`);
        console.log(`    🏷️ İsim (function): "${itemNameFromFunction}"`);
        console.log(`    🏷️ İsim (fallback): "${itemNameFallback}"`);
        console.log(`    🎯 Aranan: "${consignmentProductId}"`);
        console.log(`    ✅ Function eşleşme: ${itemNameFromFunction === consignmentProductId}`);
        console.log(`    ✅ Fallback eşleşme: ${itemNameFallback === consignmentProductId}`);
        console.log(`    🏗️ WarehouseId (direkt): ${warehouseId}`);
        console.log(`    🏗️ Status: ${item.status}`);
        console.log(`    🎯 Final WarehouseId: ${finalWarehouseId}`);
        console.log(`    🏗️ Tam item:`, item);
        
        if (itemNameFromFunction === consignmentProductId || itemNameFallback === consignmentProductId) {
            selectedItem = item;
            console.log('✅ Eşleşen ürün bulundu:', selectedItem);
            break; // İlk eşleşeni al
        }
    }
    
    if (selectedItem) {
        // Depo ID'sini farklı alanlardan bulmaya çalış
        const warehouseId = selectedItem.warehouseId || 
                           selectedItem.warehouse?.id || 
                           selectedItem.location || 
                           selectedItem.depot ||
                           selectedItem['warehouse_id'] ||
                           selectedItem['depot_id'];
        
        console.log('🎯 Bulunan warehouseId:', warehouseId);
        
        if (warehouseId) {
            // Depo ismini bul
            const selectedWarehouse = warehouses.value.find((w: Warehouse) => w.id === warehouseId);
            const warehouseName = selectedWarehouse ? selectedWarehouse.name : warehouseId;
            
            // Otomatik olarak depoyu seç
            console.log('🎯 Depo otomatik seçiliyor:', warehouseId);
            formData.value.location = warehouseId;
            formData.value.selectedConsignmentWarehouse = warehouseName; // Depo adını da kaydet
            
            console.log('✅ Konsinye ürün deposu otomatik seçildi:', {
                productName: consignmentProductId,
                warehouseId: warehouseId,
                warehouseName: warehouseName,
                formDataLocation: formData.value.location
            });
            
            // Başarı mesajı göster (toast formatında)
            Swal.fire({
                title: 'Depo Otomatik Seçildi!',
                text: `Konsinye ürünün bulunduğu depo (${warehouseName}) otomatik olarak seçildi.`,
                icon: 'info',
                timer: 2000,
                showConfirmButton: false,
                position: 'top-end',
                toast: true,
                timerProgressBar: true,
                customClass: {
                    popup: 'sweet-alerts'
                }
            });
        } else {
            console.warn('⚠️ Konsinye ürün bulundu ama depo bilgisi yok:', {
                productName: consignmentProductId,
                selectedItem: selectedItem,
                allPossibleWarehouseFields: {
                    warehouseId: selectedItem.warehouseId,
                    warehouse: selectedItem.warehouse,
                    location: selectedItem.location,
                    depot: selectedItem.depot,
                    warehouse_id: selectedItem['warehouse_id'],
                    depot_id: selectedItem['depot_id']
                }
            });
            
            // Depo bilgisini temizle
            formData.value.selectedConsignmentWarehouse = '';
        }
    } else {
        console.warn('⚠️ Konsinye ürün için eşleşme bulunamadı:', {
            productName: consignmentProductId,
            totalConsignmentItems: consignmentStockItems.value.length,
            availableItemNames: consignmentStockItems.value.map(item => 
                item.productName || item.name || item.productSku || item.sku || item.description || `Konsinye Ürün ${item.id}`
            )
        });
        
        // Depo bilgisini temizle
        formData.value.selectedConsignmentWarehouse = '';
    }
};

const onProjectChange = async () => {
    formData.value.selectedSku = '';
    formData.value.faultySerialNumber = '';
    formData.value.consignmentSerial = '';
    formData.value.selectedConsignmentProductId = '';
    formData.value.selectedConsignmentWarehouse = '';
    formData.value.consignmentSerialNumber = '';
    formData.value.faultyQuantity = 1;
    formData.value.consignmentQuantity = 1;
    formData.value.repairCenter = '';
    // Konsinye ürünleri çek
    await fetchConsignmentStockItems(formData.value.project);
    // Debug loglar
    console.log('formData.project:', formData.value.project);
    console.log('projectProducts:', projectProducts.value);
    console.log('products:', products.value);
    console.log('availableProducts:', availableProducts.value);
    console.log('consignmentStockItems:', consignmentStockItems.value);
    
    // Konsinye ürünlerin detaylı analizi
    console.log('🔍 KONSINYE ÜRÜN DETAY ANALİZİ:');
    consignmentStockItems.value.forEach((item, index) => {
        console.log(`  [${index}] Konsinye Item:`, {
            id: item.id,
            productId: item.productId,
            productName: item.productName,
            name: item.name,
            productSku: item.productSku,
            sku: item.sku,
            description: item.description,
            warehouseId: item.warehouseId,
            serialNumbers: item.serialNumbers,
            serialNumber: item.serialNumber,
            quantity: item.quantity,
            status: item.status,
            ConsigmentItemId: item.ConsigmentItemId,
            allKeys: Object.keys(item),
            fullItem: item
        });
        
        // Olası depo alanlarını kontrol et
        console.log(`    🏗️ Olası depo alanları:`, {
            warehouseId: item.warehouseId,
            warehouse: item.warehouse,
            location: item.location,
            depot: item.depot,
            status: item.status,
            ConsigmentItemId: item.ConsigmentItemId,
            warehouse_id: item['warehouse_id'],
            depot_id: item['depot_id'],
            locationId: item.locationId,
            depotId: item.depotId
        });
    });
};

const onSkuChange = () => {
    formData.value.faultySerialNumber = '';
    formData.value.consignmentSerial = '';
    formData.value.faultyQuantity = 1;
    formData.value.consignmentQuantity = 1;
    formData.value.repairCenter = '';
    
    // Debug: Seçilen ürün bilgilerini console'a yazdır
    console.log('Seçilen ürün:', selectedSkuInfo.value);
    console.log('hasSerial:', selectedSkuInfo.value?.hasSerial);
    console.log('Ürün object keys:', Object.keys(selectedSkuInfo.value || {}));
    console.log('Tam ürün objesi:', JSON.stringify(selectedSkuInfo.value, null, 2));
};

// Depo seçilince adresi otomatik doldur
watch(() => formData.value.location, (newVal) => {
    if (!newVal) {
        formData.value.customerAddress = '';
        return;
    }
    const selectedWarehouse = warehouses.value.find((w: Warehouse) => w.id === newVal);
    formData.value.customerAddress = selectedWarehouse ? selectedWarehouse.address || '' : '';
});

// Telefon numarası formatını otomatik düzelt
watch(() => formData.value.customerPhone, (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
        const formatted = formatTurkishPhoneNumber(newVal);
        if (formatted !== newVal) {
            // Vue reactive sisteminin sonsuz döngüye girmemesi için kontrol
            nextTick(() => {
                formData.value.customerPhone = formatted;
            });
        }
    }
});

// Methods
const cancelForm = () => {
    router.push('/ariza-yonetimi');
};

const submitForm = async () => {
    // Önce temel alanları kontrol et
    const basicValidation = formData.value.project && 
                           formData.value.selectedSku && 
                           formData.value.faultType &&
                           formData.value.description &&
                           formData.value.customerName &&
                           formData.value.customerPhone &&
                           formData.value.customerEmail &&
                           formData.value.customerAddress &&
                           formData.value.location;

    if (!basicValidation) {
        await Swal.fire({
            title: 'Eksik Bilgi!',
            text: 'Lütfen tüm zorunlu alanları doldurun!',
            icon: 'warning',
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Tamam',
            padding: '2em',
            customClass: {
                popup: 'sweet-alerts'
            }
        });
        return;
    }

    // Telefon numarası formatını kontrol et
    if (!isValidTurkishPhoneNumber(formData.value.customerPhone)) {
        await Swal.fire({
            title: 'Geçersiz Telefon Numarası!',
            html: `Lütfen geçerli bir Türkiye telefon numarası giriniz.<br><br>
                   <strong>Geçerli formatlar:</strong><br>
                   • +90 5XX XXX XX XX<br>
                   • 0 5XX XXX XX XX<br>
                   • 5XX XXX XX XX<br>
                   • 0 2XX XXX XX XX (sabit hat)`,
            icon: 'error',
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Tamam',
            padding: '2em',
            customClass: {
                popup: 'sweet-alerts'
            }
        });
        return;
    }

    if (!isFormValid.value) {
        await Swal.fire({
            title: 'Form Hatası!',
            text: 'Lütfen tüm alanları doğru formatta doldurun!',
            icon: 'warning',
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Tamam',
            padding: '2em',
            customClass: {
                popup: 'sweet-alerts'
            }
        });
        return;
    }

    isSubmitting.value = true;
    try {
        // Sadece gerekli alanları içeren payload
        const payload: any = {
            projeId: formData.value.project,
            urunId: formData.value.selectedSku,
            seriNumarasi: formData.value.consignmentSerialNumber2 || formData.value.faultySerialNumber,
            consinyeSeriNumarasi: formData.value.consignmentSerialNumber, // Consinye Ürün Alanı
            arizaTuru: formData.value.faultType,
            arizaAciklamasi: formData.value.description,
            arizaCagriNumarasi: formData.value.ticketNumber,
            cagriKaynakSistemi: formData.value.sourceSystem,
            cagriAcilisTarihi: formData.value.callOpenDate ? new Date(formData.value.callOpenDate + 'T' + (formData.value.callOpenTime || '00:00') + ':00.000Z').toISOString() : null,
            cagriAcilisSaati: formData.value.callOpenTime,
            warehouseId: formData.value.location
        };

        // API'ya POST isteği gönder
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.post(`${API_BASE_URL}/api/v1/repairs`, payload, { headers });

        // Başarılı mesajı göster
        await Swal.fire({
            title: 'Başarılı!',
            text: 'Arıza kaydı başarıyla oluşturuldu.',
            icon: 'success',
            confirmButtonColor: '#10b981',
            confirmButtonText: 'Tamam',
            timer: 3000,
            timerProgressBar: true,
            padding: '2em',
            customClass: {
                popup: 'sweet-alerts'
            }
        });

        // Başarılı ise yönlendir
        if (response.data && response.data.id) {
            router.push(`/ariza-yonetimi/detay/${response.data.id}`);
        } else {
            router.push('/ariza-yonetimi');
        }
    } catch (error: any) {
        console.error('Error submitting form:', error);
        await Swal.fire({
            title: 'Hata!',
            text: 'Arıza kaydı oluşturulurken bir hata oluştu!',
            icon: 'error',
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Tamam',
            padding: '2em',
            customClass: {
                popup: 'sweet-alerts'
            }
        });
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style scoped>
.panel {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    padding: 2rem;
}

.dark .panel {
    background-color: #1b2e4b;
}

.btn {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: all 0.2s;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-primary {
    color: white;
    background-color: #3b82f6;
    border-color: #3b82f6;
}

.btn-primary:hover:not(:disabled) {
    background-color: #2563eb;
    border-color: #2563eb;
}

.btn-outline-primary {
    color: #1d4ed8;
    background-color: transparent;
    border-color: #3b82f6;
}

.btn-outline-primary:hover {
    background-color: #eff6ff;
}

.btn-outline-secondary {
    color: #374151;
    background-color: transparent;
    border-color: #6b7280;
}

.btn-outline-secondary:hover {
    background-color: #f9fafb;
}

.dark .btn-outline-secondary {
    color: #9ca3af;
    border-color: #9ca3af;
}

.dark .btn-outline-secondary:hover {
    background-color: rgba(31, 41, 55, 0.5);
}

.form-input,
.form-select,
.form-textarea {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    background-color: white;
    transition: all 0.2s;
}

.dark .form-input,
.dark .form-select,
.dark .form-textarea {
    background-color: #374151;
    border-color: #4b5563;
    color: white;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    border-color: #3b82f6;
}

.form-input:disabled,
.form-select:disabled,
.form-textarea:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.form-textarea {
    resize: vertical;
    min-height: 100px;
}

.bg-gray-100 {
    background-color: #f3f4f6;
}

.dark .bg-gray-100 {
    background-color: #374151;
}

.dark .bg-gray-700 {
    background-color: #374151;
}

.text-primary {
    color: #3b82f6;
}

.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
