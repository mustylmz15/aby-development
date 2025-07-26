<template>
  <div class="table-responsive">
    <table class="table-hover">
      <thead>
        <tr>
          <th>Ad Soyad</th>
          <th>E-posta</th>
          <th>Telefon</th>
          <th>Roller</th>
          <th>Son Güncelleme</th>
          <th class="!text-center">İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="users.length === 0 && !loading">
          <td colspan="6" class="text-center py-8 text-gray-500">
            Henüz kullanıcı bulunmamaktadır.
          </td>
        </tr>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.first_name }} {{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone_number }}</td>
          <td>
            <div v-if="user.roles && user.roles.length" class="flex flex-wrap gap-1">
              <span 
                v-for="(role, index) in user.roles" 
                :key="index"
                class="px-2 py-1 text-xs rounded-full"
                :class="getRoleColorClass(role)"
              >
                {{ roleIdToName(role) }}
              </span>
            </div>
            <span v-else class="text-gray-400 dark:text-gray-500 text-xs">Rol atanmamış</span>
          </td>
          <td>{{ formatDate(user.updated_at) }}</td>
          <td class="!text-center">
            <button type="button" class="btn btn-sm btn-outline-primary" @click="$emit('edit', user)">
              Düzenle
            </button>
            <button type="button" class="btn btn-sm btn-outline-danger" @click="$emit('delete', user)">
              Sil
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface UserProfile {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  roles?: number[];
  updated_at?: string;
}

defineProps<{
  users: UserProfile[];
  loading: boolean;
  getRoleColorClass: (roleId: number) => string;
  roleIdToName: (roleId: number) => string;
  formatDate: (date: string | undefined) => string;
}>();
defineEmits(['edit', 'delete']);
</script>
