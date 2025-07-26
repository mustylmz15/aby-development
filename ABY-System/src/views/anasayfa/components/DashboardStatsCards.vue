<template>
  <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    <!-- Toplam Stok -->
    <div class="panel bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
      <div class="flex justify-between items-center">
        <div class="ltr:mr-1 rtl:ml-1">
          <p class="text-white/70 mb-2">Toplam Stok</p>
          <p class="text-3xl font-bold">{{ stats.totalStock }}</p>
          <p class="text-sm opacity-70">Ürün sayısı</p>
        </div>
        <div class="w-20 h-20 opacity-20">
          <svg viewBox="0 0 24 24" class="w-full h-full" fill="currentColor">
            <path d="M4 4h2v2H4zm0 4h2v2H4zm0 4h2v2H4zm0 4h2v2H4zm4-12h12v2H8zm0 4h12v2H8zm0 4h12v2H8zm0 4h12v2H8z"/>
          </svg>
        </div>
      </div>
    </div>
    <!-- Mevcut Arızadaki Ürünler -->
    <div class="panel bg-gradient-to-r from-red-500 to-red-600 text-white">
      <div class="flex justify-between items-center">
        <div class="ltr:mr-1 rtl:ml-1">
          <p class="text-white/70 mb-2">Kritik Stok Uyarıları</p>
          <p class="text-3xl font-bold">{{ stats.criticalItems }}</p>
          <p class="text-sm opacity-70">Arızalı Ürün</p>
        </div>
        <div class="w-20 h-20 opacity-20">
          <svg viewBox="0 0 24 24" class="w-full h-full" fill="currentColor">
            <path d="M12 2L1 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-11-5z"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
        </div>
      </div>
    </div>
    <!-- Bugün Hareketler -->
    <div class="panel bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
      <div class="flex justify-between items-center">
        <div class="ltr:mr-1 rtl:ml-1">
          <p class="text-white/70 mb-2">Bugün Hareketler</p>
          <p class="text-3xl font-bold">{{ stats.todayMovements }}</p>
          <p class="text-sm opacity-70">Stok Girişi/Stok Çıkışı</p>
        </div>
        <div class="w-20 h-20 opacity-20">
          <svg viewBox="0 0 24 24" class="w-full h-full" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM8.5 16L12 13.5 15.5 16 12 18.5 8.5 16z"/>
          </svg>
        </div>
      </div>
    </div>
    <!-- Aktif Depolar -->
    <div class="panel bg-gradient-to-r from-violet-500 to-violet-600 text-white">
      <div class="flex justify-between items-center">
        <div class="ltr:mr-1 rtl:ml-1">
          <p class="text-white/70 mb-2">Aktif Depolar</p>
          <p class="text-3xl font-bold">{{ stats.activeWarehouses }}</p>
          <p class="text-sm opacity-70">Depo sayısı</p>
        </div>
        <div class="w-20 h-20 opacity-20">
          <svg viewBox="0 0 24 24" class="w-full h-full" fill="currentColor">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-11-5z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// stats: { totalStock, criticalItems, todayMovements, activeWarehouses }
defineProps<{ stats: { totalStock: number, criticalItems: number, todayMovements: number, activeWarehouses: number } }>()
</script>
