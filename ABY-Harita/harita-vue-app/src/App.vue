<script setup>
import HaritaApp from './views/harita-app.vue'
</script>

<template>
  <div id="app">
    <HaritaApp />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
}

html, body {
  height: 100%;
  width: 100%;
}

#app {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
