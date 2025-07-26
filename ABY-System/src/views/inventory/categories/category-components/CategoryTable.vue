<template>
  <div class="overflow-x-auto rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#23272f]">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-primary/10 dark:bg-primary/20">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider rounded-tl-xl">#</th>
          <th class="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">Kategori Adı</th>
          <th class="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">Oluşturulma</th>
          <th class="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider rounded-tr-xl">İşlemler</th>
        </tr>
        <tr class="bg-white dark:bg-[#23272f]">
          <th></th>
          <th>
            <input type="text" placeholder="Filtrele..." class="input input-xs w-full border border-primary/20 focus:border-primary rounded" @input="$emit('filter', ($event.target && ($event.target as HTMLInputElement).value) || '')" />
          </th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-[#23272f] divide-y divide-gray-100 dark:divide-gray-800">
        <slot />
      </tbody>
    </table>
  </div>
  <style scoped>
  table tr:nth-child(even) td {
    background: #f8fafc;
  }
  table tr:hover td {
    background: #e0e7ff;
    transition: background 0.2s;
  }
  </style>
</template>
<script setup lang="ts">
// Kategori satırları slot ile dışarıdan alınır
</script>
