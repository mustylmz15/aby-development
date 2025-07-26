<template>
    <div>
        <!-- Page Header -->
        <div class="flex items-center justify-between flex-wrap gap-4 mb-6">
            <h2 class="text-xl font-semibold">İzin Yönetimi</h2>
            <div class="flex gap-3">
                <button type="button" class="btn btn-primary" @click="showCreatePermissionModal = true">
                    <IconPlus class="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                    Yeni İzin Ekle
                </button>
                <button type="button" class="btn btn-success" @click="refreshData">
                    <IconRefresh class="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                    Yenile
                </button>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div class="panel p-6">
                <div class="flex items-center">
                    <div class="shrink-0">
                        <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <IconLock class="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <div class="ltr:ml-4 rtl:mr-4">
                        <p class="text-xs text-gray-500 mb-1">Toplam İzin</p>
                        <h3 class="text-xl font-semibold">{{ totalPermissions }}</h3>
                    </div>
                </div>
            </div>
            <div class="panel p-6">
                <div class="flex items-center">
                    <div class="shrink-0">
                        <div class="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                            <IconUsers class="w-6 h-6 text-success" />
                        </div>
                    </div>
                    <div class="ltr:ml-4 rtl:mr-4">
                        <p class="text-xs text-gray-500 mb-1">Aktif Rol</p>
                        <h3 class="text-xl font-semibold">{{ totalRoles }}</h3>
                    </div>
                </div>
            </div>
            <div class="panel p-6">
                <div class="flex items-center">
                    <div class="shrink-0">
                        <div class="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                            <IconSettings class="w-6 h-6 text-warning" />
                        </div>
                    </div>
                    <div class="ltr:ml-4 rtl:mr-4">
                        <p class="text-xs text-gray-500 mb-1">Sistem İzni</p>
                        <h3 class="text-xl font-semibold">{{ systemPermissions }}</h3>
                    </div>
                </div>
            </div>
            <div class="panel p-6">
                <div class="flex items-center">
                    <div class="shrink-0">
                        <div class="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center">
                            <IconUser class="w-6 h-6 text-info" />
                        </div>
                    </div>
                    <div class="ltr:ml-4 rtl:mr-4">
                        <p class="text-xs text-gray-500 mb-1">Özel İzin</p>
                        <h3 class="text-xl font-semibold">{{ customPermissions }}</h3>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab Navigation -->
        <div class="mb-6">
            <div class="border-b border-gray-200">
                <nav class="-mb-px flex space-x-8">
                    <button
                        @click="activeTab = 'permissions'"
                        :class="[
                            'py-2 px-1 border-b-2 font-medium text-sm',
                            activeTab === 'permissions'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        ]"
                    >
                        İzin Listesi
                    </button>
                    <button
                        @click="activeTab = 'roles'"
                        :class="[
                            'py-2 px-1 border-b-2 font-medium text-sm',
                            activeTab === 'roles'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        ]"
                    >
                        Rol-İzin Matrix
                    </button>
                    <button
                        @click="activeTab = 'hierarchy'"
                        :class="[
                            'py-2 px-1 border-b-2 font-medium text-sm',
                            activeTab === 'hierarchy'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        ]"
                    >
                        İzin Hiyerarşisi
                    </button>
                </nav>
            </div>
        </div>        <!-- Tab Content -->
        <div v-if="dataLoading" class="panel">
            <div class="flex items-center justify-center py-12">
                <div class="text-center">
                    <div class="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-lg">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Veriler yükleniyor...
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="activeTab === 'permissions'" class="panel">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold">İzin Listesi</h3>
                <div class="flex gap-3">
                    <div class="relative">
                        <input
                            v-model="searchTerm"
                            type="text"
                            placeholder="İzin ara..."
                            class="form-input w-64 ltr:pl-10 rtl:pr-10"
                        />
                        <IconSearch class="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>                    <select v-model="filterModule" class="form-select w-48">
                        <option value="">Tüm Modüller</option>
                        <option v-for="module in modules" :key="module" :value="module">
                            {{ formatModuleName(module) }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="datatables">
                <table class="table-hover">
                    <thead>
                        <tr>
                            <th>İzin Adı</th>
                            <th>Görünen Ad</th>
                            <th>Modül</th>
                            <th>Seviye</th>
                            <th>Route Pattern</th>
                            <th>Sistem</th>
                            <th>Durum</th>
                            <th class="text-center">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="permission in filteredPermissions" :key="permission.id">                            <td>
                                <div class="flex items-center">
                                    <IconLock class="w-4 h-4 text-primary mr-2" />
                                    <span class="font-medium">{{ permission.name }}</span>
                                </div>
                            </td>
                            <td>{{ permission.display_name }}</td>                            <td>
                                <span class="badge bg-primary/10 text-primary">{{ formatModuleName(permission.module) }}</span>
                            </td>
                            <td>
                                <span :class="getLevelClass(permission.level)">
                                    {{ getLevelText(permission.level) }}
                                </span>
                            </td>
                            <td>
                                <code class="text-xs bg-gray-100 px-2 py-1 rounded">
                                    {{ permission.route_pattern || '-' }}
                                </code>
                            </td>
                            <td>
                                <span v-if="permission.is_system" class="badge bg-warning/10 text-warning">
                                    Sistem
                                </span>
                                <span v-else class="badge bg-info/10 text-info">
                                    Özel
                                </span>
                            </td>
                            <td>
                                <span class="badge bg-success/10 text-success">Aktif</span>
                            </td>
                            <td class="text-center">
                                <div class="flex items-center justify-center gap-2">
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-outline-primary"
                                        @click="editPermission(permission)"
                                        :disabled="permission.is_system"
                                    >
                                        <IconEdit class="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-outline-danger"
                                        @click="deletePermission(permission)"
                                        :disabled="permission.is_system"
                                    >
                                        <IconTrash class="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>        <!-- Role-Permission Matrix Tab -->
        <div v-else-if="activeTab === 'roles'" class="panel">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold">Rol-İzin Matrix</h3>
                <button type="button" class="btn btn-success" @click="saveAllRolePermissions">
                    <IconSave class="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                    Tüm Değişiklikleri Kaydet
                </button>
            </div>

            <div class="overflow-x-auto">
                <table class="table-hover min-w-full">
                    <thead>
                        <tr>
                            <th class="sticky left-0 bg-white z-10 min-w-[200px]">İzinler</th>                            <th v-for="role in roles" :key="role.id" class="text-center min-w-[120px]">
                                <div class="flex flex-col items-center">
                                    <span class="font-semibold">{{ formatRoleName(role.name) }}</span>
                                    <span class="text-xs text-gray-500">{{ role.display_name || formatRoleName(role.name) }}</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="permission in permissions" :key="permission.id" class="hover:bg-gray-50">                            <td class="sticky left-0 bg-white z-10">
                                <div class="flex items-center">
                                    <IconLock class="w-4 h-4 text-primary mr-2" />
                                    <div>
                                        <div class="font-medium">{{ permission.display_name }}</div>
                                        <div class="text-xs text-gray-500">{{ permission.name }}</div>
                                    </div>
                                </div>
                            </td>                            <td v-for="role in roles" :key="role.id" class="text-center">
                                <ToggleSwitch
                                    :modelValue="hasRolePermission(role.id.toString(), permission.id.toString())"
                                    @update:modelValue="toggleRolePermission(role.id.toString(), permission.id.toString(), $event)"
                                    size="small"
                                    :disabled="role.name === 'admin' && permission.is_system"
                                    :loading="toggleLoading.has(`${role.id}-${permission.id}`)"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>        <!-- Permission Hierarchy Tab -->
        <div v-else-if="activeTab === 'hierarchy'" class="panel">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold">İzin Hiyerarşisi</h3>                <select v-model="selectedModule" class="form-select w-48">
                    <option value="">Tüm Modüller</option>
                    <option v-for="module in modules" :key="module" :value="module">
                        {{ formatModuleName(module) }}
                    </option>
                </select>
            </div>

            <div class="space-y-4">
                <div v-for="module in filteredModules" :key="module" class="border rounded-lg p-4">                    <h4 class="text-lg font-semibold mb-3 flex items-center">
                        <IconFolder class="w-5 h-5 mr-2 text-primary" />
                        {{ formatModuleName(module) }}
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div
                            v-for="permission in getModulePermissions(module)"
                            :key="permission.id"
                            class="border rounded-lg p-3 hover:bg-gray-50"
                        >
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <h5 class="font-medium text-sm">{{ permission.display_name }}</h5>
                                    <p class="text-xs text-gray-500 mt-1">{{ permission.name }}</p>
                                    <div class="flex items-center gap-2 mt-2">
                                        <span :class="getLevelClass(permission.level)">
                                            {{ getLevelText(permission.level) }}
                                        </span>
                                        <span v-if="permission.is_system" class="badge bg-warning/10 text-warning text-xs">
                                            Sistem
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        <!-- Create Permission Modal -->
        <div v-show="showCreatePermissionModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-white rounded-lg p-6 w-full max-w-3xl mx-4">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-semibold">Yeni İzin Ekle</h3>
                    <button type="button" @click="showCreatePermissionModal = false" class="text-gray-400 hover:text-gray-600">
                        <IconX class="w-6 h-6" />
                    </button>
                </div>

                <!-- Mode Toggle -->
                <div class="mb-6">
                    <div class="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <label class="flex items-center">
                            <input 
                                type="radio" 
                                v-model="formMode" 
                                value="template" 
                                class="mr-2"
                            />
                            <span class="text-sm font-medium">📋 Şablon Seç (Kolay)</span>
                        </label>
                        <label class="flex items-center">
                            <input 
                                type="radio" 
                                v-model="formMode" 
                                value="manual" 
                                class="mr-2"
                            />
                            <span class="text-sm font-medium">✏️ Manuel Giriş (Gelişmiş)</span>
                        </label>
                    </div>
                </div>

                <form @submit.prevent="createPermission" class="space-y-6">
                    <!-- Template Mode -->
                    <div v-if="formMode === 'template'" class="space-y-4">
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 class="text-sm font-medium text-blue-800 mb-3">✨ Hızlı İzin Oluşturma</h4>
                            
                            <!-- Module Selection -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">1. Modül Seçin *</label>
                                    <select v-model="selectedTemplateModule" required class="form-select">
                                        <option value="">Modül seçin...</option>
                                        <option value="users">👥 Kullanıcılar</option>
                                        <option value="warehouse">📦 Depo</option>
                                        <option value="projects">🏗️ Projeler</option>
                                        <option value="reports">📊 Raporlar</option>
                                        <option value="fault_management">🔧 Arıza Yönetimi</option>
                                    </select>
                                </div>

                                <!-- Action Selection -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">2. İşlem Türü Seçin *</label>
                                    <select v-model="selectedAction" :disabled="!selectedTemplateModule" required class="form-select">
                                        <option value="">İşlem seçin...</option>
                                        <option 
                                            v-for="action in availableActions" 
                                            :key="action.action" 
                                            :value="action.action"
                                        >
                                            {{ action.display }} (Seviye {{ action.level }})
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <!-- Preview -->
                            <div v-if="permissionForm.name" class="bg-white border border-gray-200 rounded-lg p-3">
                                <h5 class="text-sm font-medium text-gray-700 mb-2">🔍 Önizleme:</h5>
                                <div class="text-xs space-y-1">
                                    <div><span class="font-medium">İzin Adı:</span> <code class="bg-gray-100 px-1">{{ permissionForm.name }}</code></div>
                                    <div><span class="font-medium">Görünen Ad:</span> {{ permissionForm.display_name }}</div>
                                    <div><span class="font-medium">Seviye:</span> {{ getLevelText(permissionForm.level) }}</div>
                                    <div><span class="font-medium">Açıklama:</span> {{ permissionForm.description }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Manual Mode -->
                    <div v-else class="space-y-4">
                        <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <h4 class="text-sm font-medium text-amber-800 mb-2">⚙️ Gelişmiş Manuel Giriş</h4>
                            <p class="text-xs text-amber-700">Özel izinler veya standart olmayan yapılar için manuel giriş yapabilirsiniz.</p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">İzin Adı *</label>
                                <input
                                    v-model="permissionForm.name"
                                    type="text"
                                    required
                                    placeholder="module.page.action"
                                    class="form-input"
                                />
                                <p class="text-xs text-gray-500 mt-1">Örnek: users.management, warehouse.view</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Görünen Ad *</label>
                                <input
                                    v-model="permissionForm.display_name"
                                    type="text"
                                    required
                                    placeholder="Kullanıcı Yönetimi"
                                    class="form-input"
                                />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Modül *</label>
                                <select v-model="permissionForm.module" required class="form-select">
                                    <option value="">Modül Seçin</option>
                                    <option value="users">Kullanıcılar</option>
                                    <option value="warehouse">Depo</option>
                                    <option value="reports">Raporlar</option>
                                    <option value="fault_management">Arıza Yönetimi</option>
                                    <option value="projects">Projeler</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Seviye</label>
                                <select v-model="permissionForm.level" class="form-select">
                                    <option :value="1">Temel (1)</option>
                                    <option :value="2">Orta (2)</option>
                                    <option :value="3">İleri (3)</option>
                                    <option :value="4">Admin (4)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Route Pattern</label>
                            <input
                                v-model="permissionForm.route_pattern"
                                type="text"
                                placeholder="/module/action"
                                class="form-input"
                            />
                            <p class="text-xs text-gray-500 mt-1">Opsiyonel: Bu izin hangi route'larda geçerli</p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                            <textarea
                                v-model="permissionForm.description"
                                rows="3"
                                placeholder="Bu iznin ne için kullanıldığını açıklayın..."
                                class="form-textarea"
                            ></textarea>
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-3 pt-4">
                        <button type="button" @click="showCreatePermissionModal = false" class="btn btn-outline-dark">
                            İptal
                        </button>
                        <button type="submit" class="btn btn-primary" :disabled="createLoading">
                            <IconLoader v-if="createLoading" class="w-5 h-5 ltr:mr-2 rtl:ml-2 animate-spin" />
                            <IconPlus v-else class="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                            İzin Ekle
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import ToggleSwitch from '@/components/ui/ToggleSwitch.vue';
import { useToast } from 'vue-toastification';

// Icon imports
import IconPlus from '@/components/icon/icon-plus.vue';
import IconRefresh from '@/components/icon/icon-refresh.vue';
import IconLock from '@/components/icon/icon-lock.vue';
import IconUsers from '@/components/icon/icon-users.vue';
import IconSettings from '@/components/icon/icon-settings.vue';
import IconUser from '@/components/icon/icon-user.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconEdit from '@/components/icon/icon-edit.vue';
import IconTrash from '@/components/icon/icon-trash.vue';
import IconSave from '@/components/icon/icon-save.vue';
import IconFolder from '@/components/icon/icon-folder.vue';
import IconX from '@/components/icon/icon-x.vue';
import IconLoader from '@/components/icon/icon-loader.vue';

// Toast helper
const toast = useToast();
const showSuccess = (message: string) => toast.success(message);
const showError = (message: string) => toast.error(message);
const showWarning = (message: string) => toast.warning(message);

// Reactive Data
const activeTab = ref('permissions');
const searchTerm = ref('');
const filterModule = ref('');
const selectedModule = ref('');
const showCreatePermissionModal = ref(false);
const createLoading = ref(false);
const dataLoading = ref(false);
const formMode = ref('template');
const selectedTemplateModule = ref('');
const selectedAction = ref('');
const permissionForm = ref({
    name: '',
    display_name: '',
    module: '',
    level: 1,
    route_pattern: null as string | null,
    description: null as string | null
});

// Watch for template selections
watch([selectedTemplateModule, selectedAction], () => {
    if (formMode.value === 'template') {
        autoFillForm();
    }
});

// Reset form when mode changes
watch(formMode, (newMode) => {
    if (newMode === 'template') {
        selectedTemplateModule.value = '';
        selectedAction.value = '';
    }
    permissionForm.value = {
        name: '',
        display_name: '',
        module: '',
        level: 1,
        route_pattern: null,
        description: null
    };
});

// CRUD Operations
const createPermission = async () => {
    if (!permissionForm.value.name || !permissionForm.value.display_name || !permissionForm.value.module) {
        return;
    }
    
    createLoading.value = true;
    try {
        // Mock API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Create new permission with mock ID
        const newId = Math.max(...permissions.value.map(p => p.id)) + 1;
        let newPermission = {
            id: newId,
            name: permissionForm.value.name,
            display_name: permissionForm.value.display_name,
            module: permissionForm.value.module,
            level: permissionForm.value.level,
            route_pattern: permissionForm.value.route_pattern ?? null,
            description: permissionForm.value.description ?? null,
            is_system: false
        };
        permissions.value.push(newPermission);
        showCreatePermissionModal.value = false;
        showSuccess('Yeni izin başarıyla oluşturuldu');
        
        // Reset form
        permissionForm.value = {
            name: '',
            display_name: '',
            module: '',
            level: 1,
            route_pattern: '',
            description: ''
        };
        
        console.log('Permission created successfully');
    } catch (error: any) {
        console.error('Error creating permission:', error);
        showError(`İzin oluşturulurken hata oluştu: ${error?.message || 'Bilinmeyen hata'}`);
    } finally {
        createLoading.value = false;
    }
};

const editPermission = (permission: any) => {
    // TODO: Implement edit functionality
    showWarning('Düzenleme özelliği henüz uygulanmadı');
    console.log('Edit permission:', permission);
};

const deletePermission = async (permission: any) => {
    if (permission.is_system) {
        showWarning('Sistem izinleri silinemez');
        return;
    }
    
    if (confirm(`"${permission.display_name}" iznini silmek istediğinize emin misiniz?`)) {
        try {
            // Mock API call delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const index = permissions.value.findIndex(p => p.id === permission.id);
            if (index > -1) {
                permissions.value.splice(index, 1);
            }
            showSuccess('İzin başarıyla silindi');
            console.log('Permission deleted successfully');
        } catch (error: any) {
            console.error('Error deleting permission:', error);
            showError(`İzin silinirken hata oluştu: ${error?.message || 'Bilinmeyen hata'}`);
        }
    }
};

const refreshData = async () => {
    dataLoading.value = true;
    try {
        // Mock API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        showSuccess('Veriler başarıyla yenilendi');
    } catch (error: any) {
        console.error('Error refreshing data:', error);
        showError(`Veriler yenilenirken hata oluştu: ${error?.message || 'Bilinmeyen hata'}`);
    } finally {
        dataLoading.value = false;
    }
};

// Role-Permission Matrix Operations
const toggleLoading = ref(new Set());
const saveAllRolePermissions = async () => {
    try {
        // Mock API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        showSuccess('Rol izinleri başarıyla kaydedildi');
    } catch (error: any) {
        console.error('Error saving role permissions:', error);
        showError(`Rol izinleri kaydedilirken hata oluştu: ${error?.message || 'Bilinmeyen hata'}`);
    }
};

const toggleRolePermission = async (roleId: string, permissionId: string, value: boolean) => {
    const key = `${roleId}-${permissionId}`;
    toggleLoading.value.add(key);
    
    try {
        // Mock API call delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Update the rolePermissions map
        const currentPermissions = rolePermissions.value.get(roleId) || new Set();
        
        if (value) {
            currentPermissions.add(permissionId);
        } else {
            currentPermissions.delete(permissionId);
        }
        
        rolePermissions.value.set(roleId, currentPermissions);
    } catch (error: any) {
        console.error('Error toggling permission:', error);
        showError(`İzin değiştirilirken hata oluştu: ${error?.message || 'Bilinmeyen hata'}`);
    } finally {
        toggleLoading.value.delete(key);
    }
};

const hasRolePermission = (roleId: string, permissionId: string): boolean => {
    const permissions = rolePermissions.value.get(roleId);
    return permissions ? permissions.has(permissionId) : false;
};

// Template Form Helpers
const availableActions = computed(() => {
    return [
        { action: 'view', display: '👁️ Görüntüleme', level: 1 },
        { action: 'create', display: '➕ Oluşturma', level: 2 },
        { action: 'edit', display: '✏️ Düzenleme', level: 2 },
        { action: 'delete', display: '🗑️ Silme', level: 3 },
        { action: 'export', display: '📤 Dışa Aktarma', level: 2 },
        { action: 'import', display: '📥 İçe Aktarma', level: 3 },
        { action: 'management', display: '⚙️ Yönetim', level: 4 }
    ];
});

const autoFillForm = () => {
    if (!selectedTemplateModule.value || !selectedAction.value) return;
    
    const module = selectedTemplateModule.value;
    const action = selectedAction.value;
    
    // Generate permission name
    permissionForm.value.name = `${module}.${action}`;
    
    // Generate display name
    const moduleDisplayName = formatModuleName(module);
    const actionObj = availableActions.value.find(a => a.action === action);
    
    if (actionObj) {
        permissionForm.value.display_name = `${moduleDisplayName} ${actionObj.display.split(' ')[1]}`;
        permissionForm.value.level = actionObj.level;
    }
    
    // Set module
    permissionForm.value.module = module;
    
    // Generate route pattern
    permissionForm.value.route_pattern = `/${module}${action === 'create' ? '/create' : action === 'edit' ? '/edit' : action === 'delete' ? '/delete' : ''}`;
    
    // Generate description
    const actionMap: Record<string, string> = {
        'view': 'görüntüleme',
        'create': 'oluşturma',
        'edit': 'düzenleme',
        'delete': 'silme',
        'export': 'dışa aktarma',
        'import': 'içe aktarma',
        'management': 'yönetim'
    };
    
    permissionForm.value.description = `${moduleDisplayName} modülü için ${actionMap[action] || action} yetkisi`;
};

// Utility Functions
const formatModuleName = (module: string): string => {
    const moduleMap: Record<string, string> = {
        'users': 'Kullanıcılar',
        'warehouse': 'Depo',
        'projects': 'Projeler',
        'reports': 'Raporlar',
        'fault_management': 'Arıza Yönetimi'
    };
    
    return moduleMap[module] || module.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const formatRoleName = (roleName: string): string => {
    return roleName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const getLevelText = (level: number): string => {
    const levelMap: Record<number, string> = {
        1: 'Temel',
        2: 'Orta',
        3: 'İleri',
        4: 'Admin'
    };
    
    return levelMap[level] || `Seviye ${level}`;
};

const getLevelClass = (level: number): string => {
    const levelClassMap: Record<number, string> = {
        1: 'badge bg-success/10 text-success',
        2: 'badge bg-info/10 text-info',
        3: 'badge bg-warning/10 text-warning',
        4: 'badge bg-danger/10 text-danger'
    };
    
    return levelClassMap[level] || 'badge bg-gray-100';
};

// Mock Data
type Permission = {
    id: number;
    name: string;
    display_name: string;
    module: string;
    level: number;
    route_pattern: string | null;
    description: string | null;
    is_system: boolean;
};

const permissions = ref<Permission[]>([
    { id: 1, name: 'users.view', display_name: 'Kullanıcıları Görüntüleme', module: 'users', level: 1, route_pattern: '/users', description: 'Kullanıcıları görüntüleme yetkisi', is_system: true },
    { id: 2, name: 'users.create', display_name: 'Kullanıcı Oluşturma', module: 'users', level: 2, route_pattern: '/users/create', description: 'Yeni kullanıcı oluşturma yetkisi', is_system: true },
    { id: 3, name: 'users.edit', display_name: 'Kullanıcı Düzenleme', module: 'users', level: 2, route_pattern: '/users/edit', description: 'Kullanıcı bilgilerini düzenleme yetkisi', is_system: true },
    { id: 4, name: 'users.delete', display_name: 'Kullanıcı Silme', module: 'users', level: 3, route_pattern: '/users/delete', description: 'Kullanıcı silme yetkisi', is_system: true },
    { id: 5, name: 'users.permissions', display_name: 'İzin Yönetimi', module: 'users', level: 4, route_pattern: '/users/permissions', description: 'Kullanıcı izinlerini yönetme yetkisi', is_system: true },
    { id: 6, name: 'warehouse.view', display_name: 'Depo Görüntüleme', module: 'warehouse', level: 1, route_pattern: '/warehouse', description: 'Depo görüntüleme yetkisi', is_system: false },
    { id: 7, name: 'warehouse.edit', display_name: 'Depo Düzenleme', module: 'warehouse', level: 2, route_pattern: '/warehouse/edit', description: 'Depo düzenleme yetkisi', is_system: false },
    { id: 8, name: 'projects.view', display_name: 'Projeleri Görüntüleme', module: 'projects', level: 1, route_pattern: '/projects', description: 'Projeleri görüntüleme yetkisi', is_system: false },
    { id: 9, name: 'reports.export', display_name: 'Rapor Dışa Aktarma', module: 'reports', level: 2, route_pattern: '/reports/export', description: 'Raporları dışa aktarma yetkisi', is_system: false },
    { id: 10, name: 'fault_management.view', display_name: 'Arıza Yönetimi Görüntüleme', module: 'fault_management', level: 1, route_pattern: '/fault_management', description: 'Arıza yönetimi görüntüleme yetkisi', is_system: false },
].map(p => ({ ...p, route_pattern: p.route_pattern ?? null, description: p.description ?? null })));

// Mock Data - Roller
const roles = ref([
    { id: 1, name: 'admin', display_name: 'Yönetici' },
    { id: 2, name: 'user', display_name: 'Kullanıcı' },
    { id: 3, name: 'warehouse', display_name: 'Depo Sorumlusu' },
]);

// Mock Data - Rol-İzin eşleşmeleri
const rolePermissions = ref(new Map([
    ['1', new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])], // admin
    ['2', new Set(['1', '6', '8', '10'])], // user
    ['3', new Set(['1', '6', '7'])], // warehouse
]));

// Modül listesi
const modules = computed(() => {
    const set = new Set(permissions.value.map(p => p.module));
    return Array.from(set);
});

// Filtrelenmiş izinler
const filteredPermissions = computed(() => {
    let list = permissions.value;
    if (filterModule.value) {
        list = list.filter(p => p.module === filterModule.value);
    }
    if (searchTerm.value) {
        list = list.filter(p =>
            p.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            p.display_name.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
    }
    return list;
});

// Toplam izin sayısı
const totalPermissions = computed(() => permissions.value.length);
const totalRoles = computed(() => roles.value.length);
const systemPermissions = computed(() => permissions.value.filter(p => p.is_system).length);
const customPermissions = computed(() => permissions.value.filter(p => !p.is_system).length);

// Hiyerarşi için modül filtreleme
const filteredModules = computed(() => {
    if (!selectedModule.value) return modules.value;
    return modules.value.filter(m => m === selectedModule.value);
});

// Modüle göre izinleri getir
const getModulePermissions = (module) => {
    return permissions.value.filter(p => p.module === module);
};
</script>