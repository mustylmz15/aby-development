
<template>
  <transition name="fade-toast">
    <div v-if="show" class="fixed top-6 right-6 z-50">
      <div class="flex items-center gap-3 px-6 py-3 rounded-xl shadow-2xl bg-green-500 text-white font-semibold text-base animate-slideIn">
        <i class="fa fa-check-circle text-2xl"></i>
        <span>Kategori işlemi başarılı!</span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{ show: boolean }>();
</script>

<style scoped>
.fade-toast-enter-active, .fade-toast-leave-active {
  transition: opacity 0.4s;
}
.fade-toast-enter-from, .fade-toast-leave-to {
  opacity: 0;
}
.animate-slideIn {
  animation: slideInRight 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}
@keyframes slideInRight {
  from {
    transform: translateX(100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
