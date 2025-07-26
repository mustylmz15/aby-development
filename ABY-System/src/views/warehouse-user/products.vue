<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link to="/warehouse-user/dashboard" class="text-primary hover:underline">Depo Yönetimi</router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Depo Ürünleri</span>
            </li>
        </ul>

        <div class="pt-5">
            <div class="panel mb-5">
                <div class="flex items-center justify-between mb-5">
                    <h5 class="font-semibold text-lg dark:text-white-light">Depo Ürünleri: Örnek Depo</h5>
                    <div class="flex items-center">
                        <button type="button" class="btn btn-primary ltr:mr-2 rtl:ml-2">
                            <span class="ltr:mr-2 rtl:ml-2">＋</span>
                            Merkez Depodan Ürün Talep Et
                        </button>
                    </div>
                </div>

                <div class="mb-5 flex flex-wrap items-center">
                    <div class="flex items-center flex-1">
                        <div class="flex-1">
                            <input type="text" placeholder="Ürün Ara..." class="form-input" disabled />
                        </div>
                    </div>
                    <div class="flex">
                        <select class="form-select" disabled>
                            <option value="">Tüm Kategoriler</option>
                            <option>Elektronik</option>
                            <option>Kırtasiye</option>
                        </select>
                    </div>
                </div>

                <!-- Ürün Tablosu (Mock) -->
                <div class="table-responsive">
                    <table class="table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ürün Adı</th>
                                <th>Kategori</th>
                                <th>Miktar</th>
                                <th>Birim</th>
                                <th class="text-center">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Barkod Okuyucu</td>
                                <td>Elektronik</td>
                                <td>5</td>
                                <td>adet</td>
                                <td class="text-center">
                                    <div class="flex items-center justify-center gap-2">
                                        <button type="button" class="btn btn-sm btn-outline-primary">Seri Numaraları</button>
                                        <button type="button" class="btn btn-sm btn-outline-danger">Arıza Kaydı</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>USB Bellek</td>
                                <td>Elektronik</td>
                                <td>10</td>
                                <td>adet</td>
                                <td class="text-center">
                                    <div class="flex items-center justify-center gap-2">
                                        <button type="button" class="btn btn-sm btn-outline-primary">Seri Numaraları</button>
                                        <button type="button" class="btn btn-sm btn-outline-danger">Arıza Kaydı</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Defter</td>
                                <td>Kırtasiye</td>
                                <td>20</td>
                                <td>adet</td>
                                <td class="text-center">
                                    <div class="flex items-center justify-center gap-2">
                                        <button type="button" class="btn btn-sm btn-outline-primary">Seri Numaraları</button>
                                        <button type="button" class="btn btn-sm btn-outline-danger">Arıza Kaydı</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Seri Numaraları Modal (Mock) -->
        <div class="fixed inset-0 bg-[black]/60 z-[999] flex items-center justify-center px-4" style="display:none">
            <div class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-4xl">
                <div class="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                    <h5 class="font-bold text-lg">Barkod Okuyucu - Seri Numaraları</h5>
                    <button type="button" class="text-white-dark hover:text-dark">✕</button>
                </div>
                <div class="p-5 max-h-[80vh] overflow-y-auto">
                    <div class="table-responsive">
                        <table class="table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Seri Numarası</th>
                                    <th>Durum</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>SN-001</td>
                                    <td><span class="badge bg-success">Aktif</span></td>
                                    <td>
                                        <div class="flex items-center gap-2">
                                            <button type="button" class="btn btn-sm btn-outline-danger">Arıza Bildir</button>
                                            <button type="button" class="btn btn-sm btn-outline-secondary">Konsinye Olarak İşaretle</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>SN-002</td>
                                    <td><span class="badge bg-danger">Arızalı</span></td>
                                    <td>
                                        <div class="flex items-center gap-2">
                                            <button type="button" class="btn btn-sm btn-outline-warning">Onarıma Gönder</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Merkez Depo Ürün Talep Modal (Mock) -->
        <div class="fixed inset-0 bg-[black]/60 z-[999] flex items-center justify-center px-4" style="display:none">
            <div class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-4xl">
                <div class="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                    <h5 class="font-bold text-lg">Merkez Depodan Ürün Talebi</h5>
                    <button type="button" class="text-white-dark hover:text-dark">✕</button>
                </div>
                <div class="p-5 max-h-[80vh] overflow-y-auto">
                    <form>
                        <div class="mb-5">
                            <label for="targetWarehouseId" class="form-label">Hedef Depo</label>
                            <select id="targetWarehouseId" class="form-select" disabled>
                                <option>Örnek Depo</option>
                            </select>
                            <p class="text-xs text-gray-500 mt-1">Bu depoya malzeme talep edilecektir.</p>
                        </div>

                        <div class="mb-5">
                            <label class="form-label">Merkez Depo Stok Durumu</label>
                            <div class="table-responsive">
                                <table class="table-striped">
                                    <thead>
                                        <tr>
                                            <th>Ürün</th>
                                            <th>Miktar</th>
                                            <th>İşlem</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Barkod Okuyucu</td>
                                            <td>50</td>
                                            <td><button type="button" class="btn btn-sm btn-outline-primary">Ekle</button></td>
                                        </tr>
                                        <tr>
                                            <td>USB Bellek</td>
                                            <td>100</td>
                                            <td><button type="button" class="btn btn-sm btn-outline-primary">Ekle</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="mb-5">
                            <label class="form-label">Talep Edilecek Ürünler</label>
                            <div class="table-responsive">
                                <table class="table-striped">
                                    <thead>
                                        <tr>
                                            <th>Ürün</th>
                                            <th>Miktar</th>
                                            <th>İşlem</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Barkod Okuyucu</td>
                                            <td><input type="number" class="form-input w-20" value="5" min="1" disabled /></td>
                                            <td><button type="button" class="btn btn-sm btn-outline-danger">Kaldır</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="mb-5">
                            <label for="requestNotes" class="form-label">Notlar</label>
                            <textarea id="requestNotes" class="form-textarea" rows="3" placeholder="Talep için notlar..." disabled>Örnek not</textarea>
                        </div>

                        <div class="flex justify-end items-center">
                            <button type="button" class="btn btn-outline-danger ltr:mr-2 rtl:ml-2">İptal</button>
                            <button type="button" class="btn btn-primary" disabled>Talebi Gönder</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Arızalı Ürün Kayıt Modal (Mock) -->
        <div class="fixed inset-0 bg-[black]/60 z-[999] flex items-center justify-center px-4" style="display:none">
            <div class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-4xl">
                <div class="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                    <h5 class="font-bold text-lg">Arızalı Ürün Kaydı</h5>
                    <button type="button" class="text-white-dark hover:text-dark">✕</button>
                </div>
                <div class="p-5 max-h-[80vh] overflow-y-auto">
                    <form>
                        <div class="mb-5">
                            <label for="productId" class="form-label">Ürün</label>
                            <select id="productId" class="form-select" disabled>
                                <option>Barkod Okuyucu</option>
                            </select>
                        </div>

                        <div class="mb-5">
                            <label for="serialNumber" class="form-label">Seri Numarası</label>
                            <select id="serialNumber" class="form-select">
                                <option>Seri Numarası Seçin (Opsiyonel)</option>
                                <option>SN-001</option>
                                <option>SN-002</option>
                            </select>
                        </div>

                        <div class="mb-5">
                            <label for="quantity" class="form-label">Miktar</label>
                            <input id="quantity" type="number" class="form-input" value="1" min="1" max="5" disabled />
                            <p class="text-xs text-gray-500 mt-1">Seri numarası seçilirse miktar otomatik 1 olacaktır.</p>
                        </div>

                        <div class="mb-5">
                            <label for="faultType" class="form-label">Arıza Tipi</label>
                            <select id="faultType" class="form-select" required>
                                <option>Arıza Tipi Seçin</option>
                                <option>Elektriksel</option>
                                <option>Mekanik</option>
                            </select>
                        </div>

                        <div class="mb-5">
                            <label for="faultDescription" class="form-label">Arıza Açıklaması</label>
                            <textarea id="faultDescription" class="form-textarea" rows="3" placeholder="Arıza detayları...">Örnek açıklama</textarea>
                        </div>

                        <div class="flex justify-end items-center">
                            <button type="button" class="btn btn-outline-danger ltr:mr-2 rtl:ml-2">İptal</button>
                            <button type="button" class="btn btn-primary" disabled>Arıza Kaydı Oluştur</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>



