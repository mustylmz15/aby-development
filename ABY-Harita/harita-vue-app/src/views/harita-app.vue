<template>
  <div class="smart-harita-app">
    <SmartMapComponent />
  </div>
</template>

<script>
import SmartMapComponent from '@/components/SmartMapComponent.vue'

export default {
  name: 'HaritaApp',
  components: {
    SmartMapComponent
  }
}
</script>

<style scoped>
.smart-harita-app {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
