<template>
  <div class="movement-form">
    <h2>Yeni Stok Hareketi</h2>
    <!-- Form alanları örnek -->
    <input type="text" placeholder="Ürün ID" v-model="form.productId" />
    <input type="text" placeholder="Seri No" v-model="form.serialNumber" />
    <input type="number" placeholder="Miktar" v-model="form.quantity" />
    <select v-model="form.status">
      <option value="GIRIS">Giriş</option>
      <option value="CIKIS">Çıkış</option>
      <option value="TRANSFER">Transfer</option>
    </select>
    <button @click="submit">Kaydet</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const form = ref({ productId: '', serialNumber: '', quantity: 1, status: 'GIRIS' });
function submit() {
  // API ile kaydetme işlemi burada olacak
}
</script>
