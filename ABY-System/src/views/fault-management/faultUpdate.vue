<template>
    <!-- ...faultCreate.vue ile aynı modern form ve alanlar buraya eklenecek... -->
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMeta } from '@/composables/use-meta';

// Meta
useMeta({ title: 'Arızayı Güncelle' });

// Router
const route = useRoute();
const router = useRouter();

// Reactive data
const isSubmitting = ref(false);
const faultId = ref(route.params.id as string);

const formData = ref({
    // Ürün Bilgileri
    project: '',
    mainCategory: '',
    productFamily: '',
    productName: '',
    serialNumber: '',
    stockNumber: '',
    // Arıza Bilgileri
    faultType: '',
    priority: '',
    description: '',
    // External Sistem
    ticketNumber: '',
    sourceSystem: '',
    // Onarım Merkezi
    repairCenter: '',
    estimatedCompletion: '',
    // Müşteri Bilgileri
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: '',
    location: '',
    // Ek Notlar
    additionalNotes: ''
});

// Methods
const loadFaultData = async () => {
    // Simulate loading fault data from API
    try {
        console.log('Loading fault data for ID:', faultId.value);
        // In a real app, this would be an API call
        // const response = await api.getFault(faultId.value);
        // formData.value = response.data;
    } catch (error) {
        console.error('Error loading fault data:', error);
    }
};

const cancelUpdate = () => {
    router.back();
};

const saveUpdate = async () => {
    isSubmitting.value = true;
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('Fault updated:', formData.value);
        console.log('Fault ID:', faultId.value);
        
        // Show success message (you might want to add a toast notification here)
        alert('Arıza başarıyla güncellendi!');
        
        // Redirect back to fault detail page
        router.push(`/ariza-yonetimi/detay/${faultId.value}`);
        
    } catch (error) {
        console.error('Error updating fault:', error);
        alert('Güncelleme sırasında bir hata oluştu!');
    } finally {
        isSubmitting.value = false;
    }
};

// Lifecycle

import axios from 'axios';
onMounted(async () => {
    // repairs tablosundan ilgili arıza kaydını çek
    try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${API_BASE_URL}/api/v1/repairs/${faultId.value}`, { headers });
        const data = response.data;
        // Alanları mapping ile doldur
        formData.value.project = data.projectId || '';
        formData.value.mainCategory = data.mainCategory || '';
        formData.value.productFamily = data.productFamily || '';
        formData.value.productName = data.item?.product?.name || '';
        formData.value.serialNumber = data.item?.serialNumber || '';
        formData.value.stockNumber = data.item?.product?.sku || '';
        formData.value.faultType = data.faultType || '';
        formData.value.priority = data.priority || '';
        formData.value.description = data.reportedIssue || '';
        formData.value.ticketNumber = data.callReference || '';
        formData.value.sourceSystem = data.sourceSystem || '';
        formData.value.repairCenter = data.warehouse?.name || '';
        formData.value.estimatedCompletion = data.completedAt || '';
        formData.value.customerName = ((data.reportedByUser?.firstName || '') + ' ' + (data.reportedByUser?.lastName || '')).trim();
        formData.value.customerPhone = '';
        formData.value.customerEmail = data.reportedByUser?.email || '';
        formData.value.customerAddress = '';
        formData.value.location = '';
        formData.value.additionalNotes = '';
    } catch (error) {
        console.error('Arıza detayı yüklenemedi:', error);
        alert('Arıza detayı yüklenemedi!');
    }
});
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

.form-textarea {
    resize: vertical;
    min-height: 100px;
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
