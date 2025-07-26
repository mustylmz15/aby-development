<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-5">
      <label for="firstName">Ad</label>
      <input id="firstName" type="text" class="form-input" v-model="form.first_name" placeholder="Ad" />
    </div>
    <div class="mb-5">
      <label for="lastName">Soyad</label>
      <input id="lastName" type="text" class="form-input" v-model="form.last_name" placeholder="Soyad" />
    </div>
    <div class="mb-5">
      <label for="email">E-posta</label>
      <input id="email" type="email" class="form-input" v-model="form.email" placeholder="E-posta" />
    </div>
    <div class="mb-5">
      <label for="phone">Telefon</label>
      <input id="phone" type="tel" class="form-input" v-model="form.phone_number" placeholder="Telefon" />
    </div>
    <div class="mb-5" v-if="showPassword">
      <label for="password">Şifre</label>
      <input id="password" type="password" class="form-input" v-model="form.password" placeholder="Şifre" required />
    </div>
    <div class="flex justify-end items-center mt-8">
      <button type="button" class="btn btn-outline-danger" @click="$emit('cancel')">İptal</button>
      <button type="submit" class="btn btn-primary ltr:ml-4 rtl:mr-4">Kaydet</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

interface UserProfile {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password?: string;
}

const props = defineProps<{
  user?: UserProfile;
  showPassword?: boolean;
}>();
const emit = defineEmits(['submit', 'cancel']);

const form = ref<UserProfile>({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  password: ''
});

watch(
  () => props.user,
  (val) => {
    if (val) {
      form.value = { ...val };
    } else {
      form.value = { first_name: '', last_name: '', email: '', phone_number: '', password: '' };
    }
  },
  { immediate: true }
);

const onSubmit = () => {
  emit('submit', { ...form.value });
};
</script>
