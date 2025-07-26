<template>
    
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { useAppStore } from '@/stores/index';
    import IconSettings from '@/components/icon/icon-settings.vue';
    import IconX from '@/components/icon/icon-x.vue';
    import IconSun from '@/components/icon/icon-sun.vue';
    import IconMoon from '@/components/icon/icon-moon.vue';
    import IconLaptop from '@/components/icon/icon-laptop.vue';
    const store = useAppStore();
    const showCustomizer = ref(false);
</script>
