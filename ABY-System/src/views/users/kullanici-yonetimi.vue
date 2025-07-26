<script setup lang="ts">
// Gerekli importlar
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';
import Swal from 'sweetalert2';

// Icons
import IconUsers from '@/components/icon/icon-users.vue';
import IconUser from '@/components/icon/icon-user.vue';
import IconPlus from '@/components/icon/icon-plus.vue';
import IconEdit from '@/components/icon/icon-edit.vue';
import IconTrash from '@/components/icon/icon-trash.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconMail from '@/components/icon/icon-mail.vue';
import IconPhone from '@/components/icon/icon-phone.vue';
import IconStar from '@/components/icon/icon-star.vue'; // crown yerine
import IconCalendar from '@/components/icon/icon-calendar.vue';
import IconCheck from '@/components/icon/icon-check.vue';
import IconLock from '@/components/icon/icon-lock.vue'; // shield yerine
import IconArrowLeft from '@/components/icon/icon-arrow-left.vue'; // chevron-left yerine
import IconArrowForward from '@/components/icon/icon-arrow-forward.vue'; // chevron-right yerine
import IconUserPlus from '@/components/icon/icon-user-plus.vue';

// Toast servisini başlat
const toast = useToast();

// Kullanıcı arayüzü için gerekli tipler - genişletilmiş
interface UserProfile {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
    roles?: (number | string)[];
    role_id?: number;
    updated_at?: string;
    created_at?: string;
    email_verified_at?: string;
}

// Gerçek kullanıcı verisi
const users = ref<UserProfile[]>([]);
const allUsers = computed(() => users.value); // Tüm kullanıcılar için computed
const loading = ref(false); // Sadece burada tanımlı olacak

// API'den kullanıcıları çek
const fetchUsers = async () => {
    loading.value = true;
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/v1/users', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Kullanıcılar alınamadı');
        const data = await response.json();
        // Alan adlarını dönüştür
        users.value = (Array.isArray(data) ? data : data.data || []).map((u: any) => {
            // assignments içinden sadece rol id'lerini (veya stringlerini) çıkar
            let roleIds: (number | string)[] = [];
            if (Array.isArray(u.assignments)) {
                roleIds = [...new Set(
                    u.assignments
                        .map((a: any) => {
                            if (a.role && typeof a.role === 'object') {
                                return a.role.id ?? a.role.name ?? JSON.stringify(a.role);
                            }
                            return a.role;
                        })
                        .filter((x: any) => typeof x === 'number' || typeof x === 'string')
                )] as (number | string)[];
            }
            return {
                id: u.id,
                first_name: u.firstName,
                last_name: u.lastName,
                email: u.email,
                phone_number: u.phoneNumber || '',
                roles: roleIds,
                updated_at: u.updatedAt
            };
        });
    } catch (e: any) {
        toast.error(e.message || 'Kullanıcılar alınamadı');
    } finally {
        loading.value = false;
    }
};


onMounted(() => {
    fetchUsers();
});

// Admin erişim kontrolü
const isCurrentUserAdmin = ref(true); // Mock değer - gerçek uygulamada auth store'dan gelecek
const hasAdminAccess = computed(() => isCurrentUserAdmin.value);

// Yeni kullanıcı ekleme - Modern SweetAlert2 ile
const handleAddUser = async () => {
    const { value: formValues } = await Swal.fire({
        title: '<div class="flex items-center gap-3"><div class="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></div><span class="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Yeni Kullanıcı Ekle</span></div>',
        html: `
            <div class="p-6 space-y-6 text-left">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <div class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                Ad *
                            </div>
                        </label>
                        <input id="swal-input1" 
                               class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm" 
                               placeholder="Adınızı girin" 
                               style="margin: 0; box-shadow: none;">
                    </div>
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <div class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                Soyad *
                            </div>
                        </label>
                        <input id="swal-input2" 
                               class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm" 
                               placeholder="Soyadınızı girin" 
                               style="margin: 0; box-shadow: none;">
                    </div>
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            E-posta Adresi *
                        </div>
                    </label>
                    <input id="swal-input3" 
                           type="email" 
                           class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-sm" 
                           placeholder="ornek@sirket.com" 
                           style="margin: 0; box-shadow: none;">
                    <p class="text-xs text-gray-500 mt-1">Geçerli bir e-posta adresi girin</p>
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            Telefon Numarası
                        </div>
                    </label>
                    <input id="swal-input4" 
                           type="tel" 
                           class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-sm" 
                           placeholder="0500 000 00 00" 
                           style="margin: 0; box-shadow: none;">
                    <p class="text-xs text-gray-500 mt-1">Opsiyonel - İletişim için kullanılacak</p>
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                            Güvenli Şifre *
                        </div>
                    </label>
                    <input id="swal-input5" 
                           type="password" 
                           class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 text-sm" 
                           placeholder="En az 8 karakter, büyük/küçük harf ve rakam" 
                           style="margin: 0; box-shadow: none;">
                    <div class="mt-2 flex flex-wrap gap-2">
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Min 8 karakter
                        </span>
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Büyük/küçük harf
                        </span>
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Sayı içermeli
                        </span>
                    </div>
                </div>
                
            </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#6b7280',
        confirmButtonText: '<span class="flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>Kullanıcıyı Oluştur</span>',
        cancelButtonText: '<span class="flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>İptal</span>',
        width: '600px',
        customClass: {
            popup: 'rounded-2xl shadow-2xl',
            title: 'pb-2',
            htmlContainer: 'px-0'
        },
        preConfirm: () => {
            const firstName = (document.getElementById('swal-input1') as HTMLInputElement)?.value;
            const lastName = (document.getElementById('swal-input2') as HTMLInputElement)?.value;
            const email = (document.getElementById('swal-input3') as HTMLInputElement)?.value;
            const phone = (document.getElementById('swal-input4') as HTMLInputElement)?.value;
            const password = (document.getElementById('swal-input5') as HTMLInputElement)?.value;
            
            if (!firstName || !lastName || !email || !password) {
                Swal.showValidationMessage('<div class="flex items-center gap-2 text-red-600"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Lütfen zorunlu alanları doldurun</div>');
                return false;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                Swal.showValidationMessage('<div class="flex items-center gap-2 text-red-600"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Geçerli bir e-posta adresi girin</div>');
                return false;
            }
            
            // Password validation
            if (password.length < 8) {
                Swal.showValidationMessage('<div class="flex items-center gap-2 text-red-600"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Şifre en az 8 karakter olmalıdır</div>');
                return false;
            }
            
            return { firstName, lastName, email, phone, password };
        }
    });

    if (formValues) {
        await submitNewUser(formValues);
    }
};

// Kullanıcı ekleme API çağrısı
const submitNewUser = async (userData: any) => {
    Swal.fire({
        title: 'Kullanıcı oluşturuluyor...',
        html: `
            <div class="flex flex-col items-center space-y-4 py-4">
                <div class="relative">
                    <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </div>
                </div>
                <p class="text-gray-600">Yeni kullanıcı hesabı oluşturuluyor...</p>
                <p class="text-sm text-gray-500">Lütfen bekleyin, bu işlem birkaç saniye sürebilir</p>
            </div>
        `,
        allowOutsideClick: false,
        showConfirmButton: false,
        customClass: {
            popup: 'rounded-2xl shadow-2xl'
        }
    });

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/v1/users', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                password: userData.password,
                phone: userData.phone
            })
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.message || 'Kullanıcı eklenemedi');
        }

        await Swal.fire({
            icon: 'success',
            title: '<span class="text-green-600">Başarılı!</span>',
            html: `
                <div class="text-center space-y-3">
                    <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                        <svg class="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 class="text-lg font-semibold text-green-800 mb-2">Kullanıcı Başarıyla Oluşturuldu!</h3>
                        <p class="text-green-700 text-sm">
                            <strong>${userData.firstName} ${userData.lastName}</strong> adlı kullanıcı sisteme eklendi.
                        </p>
                        <p class="text-green-600 text-xs mt-2">
                            Kullanıcı hesabı oluşturuldu. E-posta doğrulama sistemi aktifse bildirim gönderilecektir.
                        </p>
                    </div>
                </div>
            `,
            confirmButtonColor: '#10b981',
            confirmButtonText: 'Harika!',
            customClass: {
                popup: 'rounded-2xl shadow-2xl'
            }
        });

        await fetchUsers();
    } catch (error: any) {
        await Swal.fire({
            icon: 'error',
            title: '<span class="text-red-600">Hata Oluştu!</span>',
            html: `
                <div class="text-center space-y-3">
                    <div class="bg-red-50 p-4 rounded-lg border border-red-200">
                        <svg class="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 class="text-lg font-semibold text-red-800 mb-2">Kullanıcı Oluşturulamadı</h3>
                        <p class="text-red-700 text-sm">${error.message || 'Kullanıcı eklenirken bir hata oluştu.'}</p>
                        <p class="text-red-600 text-xs mt-2">Lütfen bilgileri kontrol edip tekrar deneyin.</p>
                    </div>
                </div>
            `,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Tamam',
            customClass: {
                popup: 'rounded-2xl shadow-2xl'
            }
        });
        console.error('Kullanıcı ekleme hatası:', error);
    }
};

// Kullanıcı düzenleme - Modern SweetAlert2 ile
const openEditUserModal = async (user: UserProfile) => {
    const { value: formValues } = await Swal.fire({
        title: `<div class="flex items-center gap-3"><div class="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-full"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></div><span class="text-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Kullanıcıyı Düzenle</span></div>`,
        html: `
            <div class="p-6 space-y-6 text-left">
                <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200 mb-6">
                    <div class="flex items-center gap-3">
                        <div class="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                            ${user.first_name?.charAt(0)?.toUpperCase() || ''}${user.last_name?.charAt(0)?.toUpperCase() || ''}
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold text-green-800">${user.first_name} ${user.last_name}</h4>
                            <p class="text-sm text-green-600">ID: ${user.id}</p>
                        </div>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <div class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                Ad *
                            </div>
                        </label>
                        <input id="edit-input1" 
                               class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-sm" 
                               value="${user.first_name}" 
                               style="margin: 0; box-shadow: none;">
                    </div>
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <div class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                Soyad *
                            </div>
                        </label>
                        <input id="edit-input2" 
                               class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-sm" 
                               value="${user.last_name}" 
                               style="margin: 0; box-shadow: none;">
                    </div>
                </div>
                
                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            E-posta Adresi *
                        </div>
                    </label>
                    <input id="edit-input3" 
                           type="email" 
                           class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-sm" 
                           value="${user.email}" 
                           style="margin: 0; box-shadow: none;">
                    <p class="text-xs text-gray-500 mt-1">E-posta değişikliği yeniden doğrulama gerektirebilir</p>
                </div>
                
                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            Telefon Numarası
                        </div>
                    </label>
                    <input id="edit-input4" 
                           type="tel" 
                           class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-sm" 
                           value="${user.phone_number || ''}" 
                           style="margin: 0; box-shadow: none;">
                    <p class="text-xs text-gray-500 mt-1">İletişim için kullanılacak telefon numarası</p>
                </div>
                
                <div class="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200">
                    <div class="flex items-start gap-3">
                        <svg class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.863-.833-2.633 0L5.681 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                        <div>
                            <h4 class="text-sm font-semibold text-amber-800 mb-1">Önemli Uyarı</h4>
                            <p class="text-xs text-amber-700">Kullanıcı bilgilerini güncellerken dikkatli olun. E-posta değişikliği kullanıcının yeniden giriş yapmasını gerektirebilir.</p>
                        </div>
                    </div>
                </div>
            </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#6b7280',
        confirmButtonText: '<span class="flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Değişiklikleri Kaydet</span>',
        cancelButtonText: '<span class="flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>İptal</span>',
        width: '600px',
        customClass: {
            popup: 'rounded-2xl shadow-2xl',
            title: 'pb-2',
            htmlContainer: 'px-0'
        },
        preConfirm: () => {
            const firstName = (document.getElementById('edit-input1') as HTMLInputElement)?.value;
            const lastName = (document.getElementById('edit-input2') as HTMLInputElement)?.value;
            const email = (document.getElementById('edit-input3') as HTMLInputElement)?.value;
            const phone = (document.getElementById('edit-input4') as HTMLInputElement)?.value;
            
            if (!firstName || !lastName || !email) {
                Swal.showValidationMessage('<div class="flex items-center gap-2 text-red-600"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Lütfen zorunlu alanları doldurun</div>');
                return false;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                Swal.showValidationMessage('<div class="flex items-center gap-2 text-red-600"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Geçerli bir e-posta adresi girin</div>');
                return false;
            }
            
            return { firstName, lastName, email, phone };
        }
    });

    if (formValues && user.id) {
        await submitEditUser(user.id, formValues);
    }
};

// Kullanıcı düzenleme işlemi - SweetAlert kullanarak
const submitEditUser = async (userId: string, userData: any) => {
    // Loading göster
    Swal.fire({
        title: 'Kullanıcı güncelleniyor...',
        html: `
            <div class="flex flex-col items-center space-y-4 py-4">
                <div class="relative">
                    <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </div>
                </div>
                <p class="text-gray-600">Kullanıcı bilgileri güncelleniyor...</p>
                <p class="text-sm text-gray-500">Değişiklikler kaydediliyor</p>
            </div>
        `,
        allowOutsideClick: false,
        showConfirmButton: false,
        customClass: {
            popup: 'rounded-2xl shadow-2xl'
        }
    });

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phone: userData.phone
            })
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.message || 'Kullanıcı güncellenemedi');
        }

        await Swal.fire({
            icon: 'success',
            title: '<span class="text-green-600">Başarılı!</span>',
            html: `
                <div class="text-center space-y-3">
                    <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                        <svg class="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <h3 class="text-lg font-semibold text-green-800 mb-2">Kullanıcı Güncellendi!</h3>
                        <p class="text-green-700 text-sm">
                            <strong>${userData.firstName} ${userData.lastName}</strong> adlı kullanıcının bilgileri başarıyla güncellendi.
                        </p>
                        <p class="text-green-600 text-xs mt-2">
                            Tüm değişiklikler sisteme kaydedildi.
                        </p>
                    </div>
                </div>
            `,
            confirmButtonColor: '#10b981',
            confirmButtonText: 'Harika!',
            customClass: {
                popup: 'rounded-2xl shadow-2xl'
            }
        });

        await fetchUsers();
    } catch (error: any) {
        await Swal.fire({
            icon: 'error',
            title: '<span class="text-red-600">Güncelleme Hatası!</span>',
            html: `
                <div class="text-center space-y-3">
                    <div class="bg-red-50 p-4 rounded-lg border border-red-200">
                        <svg class="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 class="text-lg font-semibold text-red-800 mb-2">Güncelleme Başarısız</h3>
                        <p class="text-red-700 text-sm">${error.message || 'Kullanıcı güncellenirken bir hata oluştu.'}</p>
                        <p class="text-red-600 text-xs mt-2">Lütfen bilgileri kontrol edip tekrar deneyin.</p>
                    </div>
                </div>
            `,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Tamam',
            customClass: {
                popup: 'rounded-2xl shadow-2xl'
            }
        });
        console.error('Kullanıcı güncelleme hatası:', error);
    }
};

// Kullanıcı silme onay - SweetAlert kullanarak
const confirmDeleteUser = async (user: UserProfile) => {
    const result = await Swal.fire({
        title: '<span class="text-red-600">Emin misiniz?</span>',
        html: `
            <div class="text-center space-y-4">
                <div class="bg-red-50 p-4 rounded-lg border border-red-200">
                    <svg class="w-16 h-16 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.863-.833-2.633 0L5.681 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    <h3 class="text-lg font-semibold text-red-800 mb-2">Kullanıcıyı Sil</h3>
                    <p class="text-red-700 text-sm mb-3">
                        <strong>${user.first_name} ${user.last_name}</strong> adlı kullanıcıyı kalıcı olarak silmek istediğinizden emin misiniz?
                    </p>
                    <div class="bg-red-100 p-3 rounded border border-red-300">
                        <p class="text-red-800 text-xs font-medium">⚠️ Bu işlem geri alınamaz!</p>
                        <p class="text-red-700 text-xs mt-1">Kullanıcının tüm verileri ve yetkileri silinecektir.</p>
                    </div>
                </div>
            </div>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: '<span class="flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>Evet, Sil</span>',
        cancelButtonText: '<span class="flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>İptal</span>',
        customClass: {
            popup: 'rounded-2xl shadow-2xl'
        }
    });

    if (result.isConfirmed && user.id) {
        await handleDeleteUser(user.id);
    }
};

// Kullanıcı silme işlemi (API ile) - SweetAlert kullanarak
const handleDeleteUser = async (userId: string) => {
    if (!userId) {
        await Swal.fire({
            icon: 'error',
            title: '<span class="text-red-600">Hata!</span>',
            html: `
                <div class="text-center space-y-3">
                    <div class="bg-red-50 p-4 rounded-lg border border-red-200">
                        <p class="text-red-700 text-sm">Geçersiz kullanıcı ID.</p>
                    </div>
                </div>
            `,
            confirmButtonColor: '#ef4444',
            customClass: {
                popup: 'rounded-2xl shadow-2xl'
            }
        });
        return;
    }

    // Loading göster
    Swal.fire({
        title: 'Kullanıcı siliniyor...',
        html: `
            <div class="flex flex-col items-center space-y-4 py-4">
                <div class="relative">
                    <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </div>
                </div>
                <p class="text-gray-600">Kullanıcı hesabı siliniyor...</p>
                <p class="text-sm text-gray-500">Bu işlem birkaç saniye sürebilir</p>
            </div>
        `,
        allowOutsideClick: false,
        showConfirmButton: false,
        customClass: {
            popup: 'rounded-2xl shadow-2xl'
        }
    });

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.message || 'Kullanıcı silinemedi');
        }

        await Swal.fire({
            icon: 'success',
            title: '<span class="text-green-600">Başarılı!</span>',
            html: `
                <div class="text-center space-y-3">
                    <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                        <svg class="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 class="text-lg font-semibold text-green-800 mb-2">Kullanıcı Silindi!</h3>
                        <p class="text-green-700 text-sm">
                            Kullanıcı hesabı başarıyla sistemden kaldırıldı.
                        </p>
                        <p class="text-green-600 text-xs mt-2">
                            Tüm veriler güvenli bir şekilde temizlendi.
                        </p>
                    </div>
                </div>
            `,
            confirmButtonColor: '#10b981',
            confirmButtonText: 'Tamam',
            customClass: {
                popup: 'rounded-2xl shadow-2xl'
            }
        });

        await fetchUsers();
    } catch (error: any) {
        await Swal.fire({
            icon: 'error',
            title: '<span class="text-red-600">Silme Hatası!</span>',
            html: `
                <div class="text-center space-y-3">
                    <div class="bg-red-50 p-4 rounded-lg border border-red-200">
                        <svg class="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 class="text-lg font-semibold text-red-800 mb-2">Silme İşlemi Başarısız</h3>
                        <p class="text-red-700 text-sm">${error.message || 'Kullanıcı silinirken bir hata oluştu.'}</p>
                        <p class="text-red-600 text-xs mt-2">Lütfen tekrar deneyin veya sistem yöneticisi ile iletişime geçin.</p>
                    </div>
                </div>
            `,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Tamam',
            customClass: {
                popup: 'rounded-2xl shadow-2xl'
            }
        });
        console.error('Kullanıcı silme hatası:', error);
    }
};

// Tarih formatla
const formatDate = (date: string | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('tr-TR');
};

// Statik rol eşlemesi (API'den gelmiyorsa, backend ile uyumlu şekilde güncellenmeli)
const ROLE_MAP: Record<number, { name: string; color: string }> = {
    1: { name: 'admin', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
    2: { name: 'proje_yoneticisi', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
    3: { name: 'depo_sorumlusu', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
    4: { name: 'depo_kullanicisi', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' },
    8: { name: 'kullanici', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' }
};

const roleIdToName = (roleId: number): string => {
    return ROLE_MAP[roleId]?.name || `Rol ${roleId}`;
};

const getRoleColorClass = (roleId: number): string => {
    return ROLE_MAP[roleId]?.color || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
};

// Avatar ve istatistik fonksiyonları
const getUserInitials = (user: UserProfile): string => {
    const firstInitial = user.first_name ? user.first_name.charAt(0).toUpperCase() : '';
    const lastInitial = user.last_name ? user.last_name.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial || '??';
};

// İstatistik hesaplamaları
const activeUsersCount = computed(() => {
    return users.value.filter(user => user.email_verified_at).length;
});

const adminUsersCount = computed(() => {
    return users.value.filter(user => user.role_id === 1).length;
});

const rolesCount = computed(() => {
    const uniqueRoles = new Set(users.value.map(user => user.role_id));
    return uniqueRoles.size;
});

// Arama ve filtreleme
const searchTerm = ref('');
const currentPage = ref(1);
const pageSize = ref(10);

const filteredUsers = computed(() => {
    if (!searchTerm.value) return users.value;
    
    const term = searchTerm.value.toLowerCase();
    return users.value.filter(user => 
        user.first_name?.toLowerCase().includes(term) ||
        user.last_name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.phone_number?.toLowerCase().includes(term)
    );
});

const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredUsers.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(filteredUsers.value.length / pageSize.value);
});
</script>

<template>
    <div class="space-y-6">
        <!-- Dashboard Statistics Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="panel bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-2xl font-bold">{{ allUsers.length }}</div>
                        <div class="text-sm opacity-90">Toplam Kullanıcı</div>
                    </div>
                    <IconUsers class="h-12 w-12 opacity-80" />
                </div>
            </div>
            
            <div class="panel bg-gradient-to-r from-green-500 to-green-600 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-2xl font-bold">{{ activeUsersCount }}</div>
                        <div class="text-sm opacity-90">Aktif Kullanıcı</div>
                    </div>
                    <IconUser class="h-12 w-12 opacity-80" />
                </div>
            </div>
            
            <div class="panel bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-2xl font-bold">{{ adminUsersCount }}</div>
                        <div class="text-sm opacity-90">Admin Kullanıcı</div>
                    </div>
                    <IconLock class="h-12 w-12 opacity-80" />
                </div>
            </div>
            
            <div class="panel bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-2xl font-bold">{{ rolesCount }}</div>
                        <div class="text-sm opacity-90">Aktif Rol</div>
                    </div>
                    <IconStar class="h-12 w-12 opacity-80" />
                </div>
            </div>
        </div>

        <!-- Main Panel -->
        <div class="panel">
            <!-- Header Section -->
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div>
                    <h5 class="font-semibold text-xl dark:text-white-light mb-2">Kullanıcı Yönetimi</h5>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Sisteme kayıtlı kullanıcıları yönetin</p>
                </div>
                
                <div class="flex flex-col sm:flex-row gap-3">
                    <!-- Search Bar -->
                    <div class="relative">
                        <input 
                            type="text" 
                            v-model="searchTerm"
                            placeholder="Kullanıcı ara..." 
                            class="form-input w-full sm:w-64 pl-10 pr-4"
                        />
                        <IconSearch class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex gap-2">
                        <router-link to="/users/rol-yonetimi" class="btn btn-outline-primary">
                            <IconStar class="h-4 w-4 mr-2" />
                            Rol Yönetimi
                        </router-link>
                        <button type="button" class="btn btn-primary" @click="handleAddUser">
                            <IconPlus class="h-4 w-4 mr-2" />
                            Yeni Kullanıcı
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center py-16">
                <div class="flex flex-col items-center space-y-3">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p class="text-gray-500 dark:text-gray-400">Kullanıcılar yükleniyor...</p>
                </div>
            </div>

            <!-- Admin değilse -->
            <div v-else-if="!hasAdminAccess" class="text-center py-16">
                <div class="flex flex-col items-center space-y-3">
                    <IconLock class="h-16 w-16 text-red-300" />
                    <p class="text-red-500 text-lg font-medium">Bu sayfayı görüntüleme yetkiniz yok</p>
                    <p class="text-gray-500 dark:text-gray-400">Lütfen yetkili kişi ile iletişime geçin</p>
                </div>
            </div>

            <!-- Users Table -->
            <div v-else class="datatables overflow-hidden">
                <div class="table-responsive">
                    <table class="table-hover">
                        <thead>
                            <tr class="bg-gray-50 dark:bg-gray-800">
                                <th class="!py-4">
                                    <div class="flex items-center gap-2">
                                        <IconUser class="h-4 w-4" />
                                        Kullanıcı
                                    </div>
                                </th>
                                <th class="!py-4">
                                    <div class="flex items-center gap-2">
                                        <IconMail class="h-4 w-4" />
                                        E-posta
                                    </div>
                                </th>
                                <th class="!py-4">
                                    <div class="flex items-center gap-2">
                                        <IconPhone class="h-4 w-4" />
                                        Telefon
                                    </div>
                                </th>
                                <th class="!py-4">
                                    <div class="flex items-center gap-2">
                                        <IconStar class="h-4 w-4" />
                                        Roller
                                    </div>
                                </th>
                                <th class="!py-4">
                                    <div class="flex items-center gap-2">
                                        <IconCalendar class="h-4 w-4" />
                                        Son Güncelleme
                                    </div>
                                </th>
                                <th class="!py-4 text-center">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <!-- User Info with Avatar -->
                                <td class="!py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                            {{ getUserInitials(user) }}
                                        </div>
                                        <div>
                                            <p class="font-semibold text-gray-900 dark:text-white">
                                                {{ user.first_name }} {{ user.last_name }}
                                            </p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                                ID: {{ user.id }}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                
                                <!-- Email -->
                                <td class="!py-4">
                                    <div class="flex items-center gap-2">
                                        <span class="text-gray-700 dark:text-gray-300">{{ user.email }}</span>
                                        <span v-if="user.email_verified_at" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                            <IconCheck class="h-3 w-3 mr-1" />
                                            Doğrulandı
                                        </span>
                                    </div>
                                </td>
                                
                                <!-- Phone -->
                                <td class="!py-4">
                                    <span class="text-gray-700 dark:text-gray-300">
                                        {{ user.phone_number || '-' }}
                                    </span>
                                </td>
                                
                                <!-- Roles -->
                                <td class="!py-4">
                                    <div v-if="user.roles && user.roles.length" class="flex flex-wrap gap-1">
                                        <span 
                                            v-for="(role, index) in user.roles" 
                                            :key="index"
                                            class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                                            :class="getRoleColorClass(Number(role))"
                                        >
                                            {{ isNaN(Number(role)) ? role : roleIdToName(Number(role)) }}
                                        </span>
                                    </div>
                                    <span v-else class="text-gray-400 dark:text-gray-500 text-xs italic">Rol atanmamış</span>
                                </td>
                                
                                <!-- Updated Date -->
                                <td class="!py-4">
                                    <span class="text-gray-700 dark:text-gray-300">
                                        {{ formatDate(user.updated_at) }}
                                    </span>
                                </td>
                                
                                <!-- Actions -->
                                <td class="!py-4">
                                    <div class="flex items-center justify-center gap-2">
                                        <button 
                                            type="button" 
                                            class="btn btn-sm btn-outline-primary hover:bg-primary hover:text-white transition-all"
                                            @click="openEditUserModal(user)"
                                            title="Düzenle"
                                        >
                                            <IconEdit class="h-4 w-4" />
                                        </button>
                                        <button 
                                            type="button" 
                                            class="btn btn-sm btn-outline-danger hover:bg-danger hover:text-white transition-all"
                                            @click="confirmDeleteUser(user)"
                                            title="Sil"
                                        >
                                            <IconTrash class="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            
                            <!-- Empty State -->
                            <tr v-if="paginatedUsers.length === 0">
                                <td colspan="6" class="!py-16 text-center">
                                    <div class="flex flex-col items-center space-y-3">
                                        <IconUsers class="h-16 w-16 text-gray-300 dark:text-gray-600" />
                                        <p class="text-gray-500 dark:text-gray-400 text-lg">
                                            {{ searchTerm ? 'Arama kriterinize uygun kullanıcı bulunamadı' : 'Henüz kullanıcı bulunmuyor' }}
                                        </p>
                                        <button 
                                            v-if="!searchTerm" 
                                            type="button" 
                                            class="btn btn-primary"
                                            @click="handleAddUser"
                                        >
                                            <IconPlus class="h-4 w-4 mr-2" />
                                            İlk kullanıcıyı ekle
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <!-- Pagination -->
                <div v-if="paginatedUsers.length > 0" class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                        Gösterilen: {{ (currentPage - 1) * pageSize + 1 }}-{{ Math.min(currentPage * pageSize, filteredUsers.length) }} / {{ filteredUsers.length }} kullanıcı
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <button 
                            @click="currentPage = Math.max(1, currentPage - 1)" 
                            :disabled="currentPage === 1"
                            class="btn btn-sm btn-outline-primary disabled:opacity-50"
                        >
                            <IconArrowLeft class="h-4 w-4" />
                        </button>
                        
                        <span class="px-3 py-1 text-sm font-medium bg-primary text-white rounded">
                            {{ currentPage }}
                        </span>
                        
                        <button 
                            @click="currentPage = Math.min(totalPages, currentPage + 1)" 
                            :disabled="currentPage === totalPages"
                            class="btn btn-sm btn-outline-primary disabled:opacity-50"
                        >
                            <IconArrowForward class="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>