<template>
  <div class="pagination flex items-center justify-between mt-6 pt-6 border-t">
    <div class="flex items-center gap-2">
      <label class="text-sm">Sayfa başına:</label>
      <select class="form-select w-20" disabled>
        <option>10</option>
        <option>25</option>
        <option>50</option>
        <option>100</option>
      </select>
      <span class="text-sm">1-2 / 2 kayıt</span>
    </div>
    <div class="flex items-center gap-1">
      <button class="btn btn-outline-primary btn-sm px-2 py-1" disabled>İlk</button>
      <button class="btn btn-outline-primary btn-sm px-2 py-1" disabled>‹</button>
      <span class="mx-2 text-sm">1 / 1</span>
      <button class="btn btn-outline-primary btn-sm px-2 py-1" disabled>›</button>
      <button class="btn btn-outline-primary btn-sm px-2 py-1" disabled>Son</button>
    </div>
  </div>
</template>
