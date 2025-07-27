<template>
  <form class="space-y-5 dark:text-white" @submit.prevent="handleSubmit">
    <div>
      <label for="Email">E-Posta</label>
      <div class="relative text-white-dark">
        <input id="Email" type="email" v-model="formData.email" placeholder="E-Postanızı Giriniz" class="form-input ps-10 placeholder:text-white-dark" />
        <span class="absolute start-4 top-1/2 -translate-y-1/2">
          <IconMail :fill="true" />
        </span>
        <p v-if="errors.email" class="text-red-500">{{ errors.email }}</p>
      </div>
    </div>
    <div>
      <label for="Password">Şifre</label>
      <div class="relative text-white-dark">
        <input id="Password" type="password" v-model="formData.password" placeholder="Şifrenizi Giriniz" class="form-input ps-10 placeholder:text-white-dark" />
        <span class="absolute start-4 top-1/2 -translate-y-1/2">
          <IconLockDots :fill="true" />
        </span>
        <p v-if="errors.password" class="text-red-500">{{ errors.password }}</p>
      </div>
    </div>
    <div>
      <label class="flex cursor-pointer items-center">
        <input type="checkbox" v-model="rememberMe" class="form-checkbox bg-white dark:bg-black" />
        <span class="text-white-dark">Beni Hatırla</span>
      </label>
    </div>
    <button type="submit" class="btn btn-gradient mx-auto !mt-7 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
      Giriş Yap
    </button>
  </form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import IconMail from '@/components/icon/icon-mail.vue';
import IconLockDots from '@/components/icon/icon-lock-dots.vue';
import { loginUser, authHelpers } from '../api/auth-api';

const emit = defineEmits(['login-success']);

const formData = reactive({
  email: '',
  password: ''
});
const rememberMe = ref(false);
const errors = ref({
  email: '',
  password: ''
});

onMounted(() => {
  const savedCredentials = localStorage.getItem('credentials');
  if (savedCredentials) {
    const { savedEmail, savedPassword } = JSON.parse(savedCredentials);
    formData.email = savedEmail;
    formData.password = savedPassword;
    rememberMe.value = true;
  }
});

const clearErrors = () => {
  setTimeout(() => {
    errors.value = {
      email: '',
      password: ''
    };
  }, 5000);
};

const handleSubmit = async () => {
  errors.value = {
    email: '',
    password: ''
  };
  try {
    if (!formData.email.trim()) {
      errors.value.email = 'Email alanı zorunludur';
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.value.email = 'Geçerli bir email adresi giriniz';
      return;
    }
    if (!formData.password.trim()) {
      errors.value.password = 'Şifre alanı zorunludur';
      return;
    }
    if (formData.password.length < 6) {
      errors.value.password = 'Şifre en az 6 karakter olmalıdır';
      return;
    }

    // Yeni auth API kullanımı
    const data = await loginUser(formData.email, formData.password);
    
    // Token ve kullanıcı bilgisi kaydet
    authHelpers.setToken(data.token);
    authHelpers.setUser(data.user);
    
    if (rememberMe.value) {
      localStorage.setItem('credentials', JSON.stringify({
        savedEmail: formData.email,
        savedPassword: formData.password
      }));
    } else {
      localStorage.removeItem('credentials');
    }
    emit('login-success');
  } catch (error: any) {
    const errorMessage = error?.message || 'Giriş işlemi başarısız';
    if (errorMessage.includes('İnternet bağlantısı yok') || 
      errorMessage.includes('Supabase erişilemiyor') ||
      errorMessage.includes('Connection timeout') ||
      errorMessage.includes('Database connection failed')) {
      errors.value.email = 'İnternet bağlantısı yok veya sunucuya erişilemiyor. Lütfen bağlantınızı kontrol edin.';
    } else if (errorMessage.includes('Email veya şifre hatalı') || 
      errorMessage.includes('Invalid login credentials') ||
      errorMessage.includes('Kullanıcı bulunamadı') || 
      errorMessage.includes('Hatalı şifre')) {
      errors.value.password = 'E-posta veya şifre hatalı';
    } else if (errorMessage.includes('Email not confirmed')) {
      errors.value.email = 'E-posta adresinizi doğrulamanız gerekiyor';
    } else if (errorMessage.includes('devre dışı')) {
      errors.value.email = 'Bu hesap devre dışı bırakılmış';
    } else if (errorMessage.includes('Profil bilgileri alınamadı')) {
      errors.value.email = 'Kullanıcı profili bulunamadı. Yöneticinizle iletişime geçin.';
    } else {
      errors.value.email = errorMessage;
    }
    clearErrors();
  }
};
</script>
