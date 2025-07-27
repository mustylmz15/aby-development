<template>
  <div>
    <ul class="flex space-x-2 rtl:space-x-reverse">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Kullanıcılar</a>
      </li>
      <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
        <span>Profil</span>
      </li>
    </ul>
    <div class="pt-5">
      <div class="flex items-center justify-between mb-5">
        <h5 class="font-semibold text-lg dark:text-white-light">Profil</h5>
      </div>
    <div class="flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
      <button
        class="flex gap-2 p-4 border-b-2 !outline-none"
        :class="activeTab === 'profile' ? 'border-primary text-primary' : 'border-transparent hover:border-primary hover:text-primary'"
        @click="activeTab = 'profile'"
      >
        <span class="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">👤</span>
        Profil
      </button>
      <button
        class="flex gap-2 p-4 border-b-2 !outline-none"
        :class="activeTab === 'settings' ? 'border-primary text-primary' : 'border-transparent hover:border-primary hover:text-primary'"
        @click="activeTab = 'settings'"
      >
        <span class="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">⚙️</span>
        Hesap Ayarları
      </button>
    </div>
      <div v-if="activeTab === 'profile'" class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
        <div class="panel">
          <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Profil</h5>
            <button class="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full" disabled>
              ✏️
            </button>
          </div>
          <div class="mb-5">
            <div class="flex flex-col justify-center items-center">
              <img :src="user.avatar || '/assets/images/user-profile.jpeg'" alt="" class="w-24 h-24 rounded-full object-cover mb-5" />
              <p class="font-semibold text-primary text-xl">{{ user.firstName }} {{ user.lastName }}</p>
            </div>
            <ul class="mt-5 flex flex-col max-w-[240px] m-auto space-y-4 font-semibold text-white-dark">
              <li class="flex items-center gap-2">
                <span class="shrink-0">☕</span>
                <span>{{ user.assignments?.[0]?.role || 'Kullanıcı' }}</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="shrink-0">📅</span>
                <span><b>{{ user.assignments?.[0]?.resourceId || '-' }}</b></span>
              </li>
              <li class="flex items-center gap-2">
                <span class="shrink-0">📍</span>
                <div class="flex flex-wrap gap-1">
                  <span class="text-primary">{{ user.assignments?.[0]?.resourceType || '-' }}</span>
                </div>
              </li>
              <li>
                <a href="javascript:;" class="flex items-center gap-1">
                  <span class="w-5 h-5 shrink-0">✉️</span>
                  <span class="text-primary truncate">{{ user.email }}</span>
                </a>
              </li>
              <li class="flex items-center gap-2">
                <span>📞</span>
                <span class="whitespace-nowrap" dir="ltr">{{ user.phone }}</span>
              </li>
              <li class="flex items-center gap-2">
                <span>🟢</span>
                <span>{{ user.isActive ? 'Aktif' : 'Pasif' }}</span>
              </li>
              <li class="flex items-center gap-2">
                <span>⏰</span>
                <span>{{ user.lastLogin ? (new Date(user.lastLogin).toLocaleString('tr-TR')) : '-' }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="panel lg:col-span-2 xl:col-span-3">
          <div class="mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Kullanıcı Bilgileri</h5>
          </div>
          <div class="mb-5">
            <div class="table-responsive text-[#515365] dark:text-white-light font-semibold">
              <table class="whitespace-nowrap">
                <thead>
                  <tr>
                    <th>Bilgi</th>
                    <th>Değer</th>
                  </tr>
                </thead>
                <tbody class="dark:text-white-dark">
                  <tr>
                    <td>İsim Soyisim</td>
                    <td>{{ user.firstName }} {{ user.lastName }}</td>
                  </tr>
                  <tr>
                    <td>E-posta Adresi</td>
                    <td>
                      <a :href="'mailto:' + user.email" class="text-primary">{{ user.email }}</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Telefon</td>
                    <td>{{ user.phone }}</td>
                  </tr>
                  <tr>
                    <td>Aktiflik Durumu</td>
                    <td>{{ user.isActive ? 'Aktif' : 'Pasif' }}</td>
                  </tr>
                  <tr>
                    <td>Kullanıcı Rolü</td>
                    <td><span class="badge badge-outline-primary">{{ user.assignments?.[0]?.role || '-' }}</span></td>
                  </tr>
                  <tr>
                    <td>Bağlı Olduğu Kaynak Tipi</td>
                    <td><span class="badge badge-outline-primary">{{ user.assignments?.[0]?.resourceType || '-' }}</span></td>
                  </tr>
                  <tr>
                    <td>Bağlı Olduğu Kaynak ID</td>
                    <td>{{ user.assignments?.[0]?.resourceId || '-' }}</td>
                  </tr>
                  <tr>
                    <td>Son Giriş</td>
                    <td>{{ user.lastLogin ? (new Date(user.lastLogin).toLocaleString('tr-TR')) : '-' }}</td>
                  </tr>
                  <tr>
                    <td>Oluşturulma Tarihi</td>
                    <td>{{ user.createdAt ? (new Date(user.createdAt).toLocaleString('tr-TR')) : '-' }}</td>
                  </tr>
                  <tr>
                    <td>Güncellenme Tarihi</td>
                    <td>{{ user.updatedAt ? (new Date(user.updatedAt).toLocaleString('tr-TR')) : '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'settings'" class="grid grid-cols-1 gap-5">
        <div class="panel">
          <form class="space-y-5" @submit.prevent="updatePassword">
            <h5 class="font-semibold text-lg mb-4">Hesap Ayarları</h5>
            
            <!-- Kişisel Bilgiler (Read-Only) -->
            <div class="mb-6">
              <h6 class="font-semibold mb-3 text-gray-700 dark:text-gray-300">Kişisel Bilgiler</h6>
              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="view-name" class="text-sm font-medium text-gray-600 dark:text-gray-400">Ad</label>
                    <input 
                      id="view-name" 
                      type="text" 
                      class="form-input bg-gray-100 dark:bg-gray-700 cursor-not-allowed" 
                      :value="user.firstName" 
                      readonly 
                      disabled
                    />
                  </div>
                  <div>
                    <label for="view-lastname" class="text-sm font-medium text-gray-600 dark:text-gray-400">Soyad</label>
                    <input 
                      id="view-lastname" 
                      type="text" 
                      class="form-input bg-gray-100 dark:bg-gray-700 cursor-not-allowed" 
                      :value="user.lastName" 
                      readonly 
                      disabled
                    />
                  </div>
                  <div>
                    <label for="view-email" class="text-sm font-medium text-gray-600 dark:text-gray-400">E-posta</label>
                    <input 
                      id="view-email" 
                      type="email" 
                      class="form-input bg-gray-100 dark:bg-gray-700 cursor-not-allowed" 
                      :value="user.email" 
                      readonly 
                      disabled
                    />
                  </div>
                  <div>
                    <label for="view-phone" class="text-sm font-medium text-gray-600 dark:text-gray-400">Telefon</label>
                    <input 
                      id="view-phone" 
                      type="text" 
                      class="form-input bg-gray-100 dark:bg-gray-700 cursor-not-allowed" 
                      :value="user.phone || '-'" 
                      readonly 
                      disabled
                    />
                  </div>
                </div>
                <div class="mt-3 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <i class="fa fa-info-circle"></i>
                  <span>Bu bilgiler sadece yönetici tarafından değiştirilebilir.</span>
                </div>
              </div>
            </div>
            <!-- Şifre Değiştirme Bölümü -->
            <div class="border-t border-[#ebedf2] dark:border-[#191e3a] pt-6">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700 mb-4">
                <h6 class="font-semibold mb-3 text-blue-900 dark:text-blue-100 flex items-center gap-2">
                  <i class="fa fa-lock"></i>
                  Şifre Değiştir
                </h6>
                <div class="grid grid-cols-1 gap-4">
                  <div>
                    <label for="current-password" class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Mevcut Şifre <span class="text-red-500">*</span>
                    </label>
                    <input 
                      id="current-password" 
                      type="password" 
                      class="form-input" 
                      placeholder="Mevcut şifrenizi girin" 
                      v-model="passwordForm.currentPassword"
                      :class="{ 'border-red-300': errors.currentPassword }"
                      required
                    />
                    <div v-if="errors.currentPassword" class="text-red-500 text-sm mt-1">{{ errors.currentPassword }}</div>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label for="new-password" class="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Yeni Şifre <span class="text-red-500">*</span>
                      </label>
                      <input 
                        id="new-password" 
                        type="password" 
                        class="form-input" 
                        placeholder="Yeni şifrenizi girin" 
                        v-model="passwordForm.newPassword"
                        :class="{ 'border-red-300': errors.newPassword }"
                        required
                      />
                      <div v-if="errors.newPassword" class="text-red-500 text-sm mt-1">{{ errors.newPassword }}</div>
                      <div class="text-xs text-gray-500 mt-1">En az 8 karakter olmalıdır</div>
                    </div>
                    <div>
                      <label for="confirm-password" class="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Yeni Şifre Tekrar <span class="text-red-500">*</span>
                      </label>
                      <input 
                        id="confirm-password" 
                        type="password" 
                        class="form-input" 
                        placeholder="Yeni şifrenizi tekrar girin" 
                        v-model="passwordForm.confirmPassword"
                        :class="{ 'border-red-300': errors.confirmPassword }"
                        required
                      />
                      <div v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-end mt-6">
              <button 
                type="submit" 
                class="btn btn-primary flex items-center gap-2"
                :disabled="isLoading"
              >
                <i v-if="isLoading" class="fa fa-spinner fa-spin"></i>
                <i v-else class="fa fa-key"></i>
                {{ isLoading ? 'Değiştiriliyor...' : 'Şifreyi Değiştir' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { usersApi, type User, type PasswordChangeData } from './api/users-api';

const activeTab = ref<'profile' | 'settings'>('profile');
const user = reactive<any>({});
const isLoading = ref(false);

// Şifre formu için ayrı reactive object
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Form validasyon hataları
const errors = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

onMounted(async () => {
  try {
    // localStorage'dan sadece user ID'yi al
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userObj = JSON.parse(userStr);
      if (userObj.id) {
        // API'den güncel kullanıcı bilgilerini çek
        await fetchUserProfile(userObj.id);
      }
    }
  } catch (e) {
    console.error('Kullanıcı bilgisi alınamadı:', e);
  }
});

// Kullanıcı profili çekme fonksiyonu
const fetchUserProfile = async (userId: string) => {
  try {
    const userData = await usersApi.getUserProfile(userId);
    
    // Kullanıcı bilgilerini güncelle
    Object.assign(user, userData);
    
    // localStorage'daki kullanıcı bilgilerini de güncelle
    localStorage.setItem('user', JSON.stringify(userData));
    
  } catch (error) {
    console.error('Kullanıcı profili çekilirken hata:', error);
    await Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Kullanıcı profili yüklenemedi',
      padding: '2em',
    });
  }
};

// Form validasyonu
const validatePasswordForm = (): boolean => {
  // Hataları temizle
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });

  let isValid = true;

  // Mevcut şifre kontrolü
  if (!passwordForm.currentPassword) {
    errors.currentPassword = 'Mevcut şifre gereklidir';
    isValid = false;
  }

  // Yeni şifre kontrolü
  if (!passwordForm.newPassword) {
    errors.newPassword = 'Yeni şifre gereklidir';
    isValid = false;
  } else if (passwordForm.newPassword.length < 8) {
    errors.newPassword = 'Şifre en az 8 karakter olmalıdır';
    isValid = false;
  } else if (passwordForm.newPassword === passwordForm.currentPassword) {
    errors.newPassword = 'Yeni şifre mevcut şifreden farklı olmalıdır';
    isValid = false;
  }

  // Şifre tekrar kontrolü
  if (!passwordForm.confirmPassword) {
    errors.confirmPassword = 'Şifre tekrarı gereklidir';
    isValid = false;
  } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    errors.confirmPassword = 'Şifreler eşleşmiyor';
    isValid = false;
  }

  return isValid;
};

// Şifre formu temizleme
const clearPasswordForm = () => {
  passwordForm.currentPassword = '';
  passwordForm.newPassword = '';
  passwordForm.confirmPassword = '';
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};

// Şifre güncelleme API çağrısı
async function updatePassword() {
  if (!validatePasswordForm()) return;

  isLoading.value = true;

  try {
    const passwordData: PasswordChangeData = {
      oldPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword
    };

    await usersApi.changePassword(passwordData);

    // Başarılı işlem
    await Swal.fire({
      icon: 'success',
      title: 'Başarılı!',
      text: 'Şifreniz başarıyla güncellendi',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });

    // Formu temizle
    clearPasswordForm();

  } catch (error: any) {
    console.error('Şifre güncelleme hatası:', error);
    
    await Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: error.message || 'Şifre güncelleme sırasında bir hata oluştu',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });
  } finally {
    isLoading.value = false;
  }
}
</script>