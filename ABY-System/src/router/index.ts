import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';

import HomeView from '../views/anasayfa/index.vue';

const routes: RouteRecordRaw[] = [
       
    // Onarım Merkezi - Arızalı Ürünler
    {
        path: '/onarim-merkezi/onarim-merkezi',
        name: 'onarim-merkezi-anasayfa',
        component: () => import('@/views/repair-center/onarim-merkezi.vue'),
        meta: { layout: 'app', title: 'Onarım Merkezi' }
    },
    // Onarım Sayfası - Onarım İşlemleri
    {
        path: '/onarim-merkezi/onarim/:id',
        name: 'onarim-sayfasi',
        component: () => import('@/views/repair-center/onarim-sayfasi.vue'),
        meta: { layout: 'app', title: 'Onarım İşlemleri' }
    },
    // Onarımdan Geri Gönder - Depoya Geri Gönderim
    {
        path: '/onarim-merkezi/onarimdan-gonder/:id',
        name: 'onarimdan-gonder',
        component: () => import('@/views/repair-center/onarimdan-gonder.vue'),
        meta: { layout: 'app', title: 'Depoya Geri Gönder' }
    },
    // Depo Yönetimi (mock)
    {
        path: '/warehouse/depo-yonetimi',
        name: 'depo-yonetimi',
        component: () => import('@/views/warehouse/depo-yonetimi.vue'),
        meta: { layout: 'app', title: 'Depo Yönetimi' }
    },
    // Depo Envanter Listesi
    {
        path: '/warehouse/envanter',
        name: 'warehouse-envanter',
        component: () => import('@/views/warehouse/warehouse-envanter.vue'),
        meta: { layout: 'app', title: 'Depo Envanter Listesi' }
    },
    // Yerine Takılacak Ürünler
    {
        path: '/warehouse/yerinetak',
        name: 'warehouse-yerinetak',
        component: () => import('@/views/warehouse/yerinetak.vue'),
        meta: { layout: 'app', title: 'Yerine Takılacak Ürünler' }
    },
    // Ana Ekran (İlk karşılama sayfası - herkes erişebilir)
    {
        path: '/',
        name: 'ana-ekran',
        redirect: '/anasayfa',
        meta: { requiresAuth: false }
    },
    // Login
    {
        path: '/auth/boxed-signin',
        name: 'login',
        component: () => import('@/views/auth/boxed-signin.vue'),
        meta: { layout: 'auth', title: 'Giriş Yap', requiresAuth: false }
    },
    // Anasayfa (Dashboard - Login sonrası yönlenecek sayfa)
    {
        path: '/anasayfa',
        name: 'anasayfa',
        component: HomeView,
        meta: { layout: 'app', title: 'Anasayfa', requiresAuth: true }
    },
    // Kullanıcı Yönetimi
    {
        path: '/users/kullanici-yonetimi',
        name: 'kullanici-yonetimi',
        component: () => import('@/views/users/kullanici-yonetimi.vue'),
        meta: { layout: 'app', title: 'Kullanıcı Yönetimi' }
    },
    // Kullanıcı Profil
    {
        path: '/users/profile',
        name: 'user-profile',
        component: () => import('@/views/users/profile.vue'),
        meta: { layout: 'app', title: 'Kullanıcı Profili' }
    },
    // Rol Yönetimi
    {
        path: '/users/rol-yonetimi',
        name: 'rol-yonetimi',
        component: () => import('@/views/users/rol-yonetimi.vue'),
        meta: { layout: 'app', title: 'Rol Yönetimi' }
    },
    // İzin Yönetimi
    {
        path: '/users/izin-yonetimi',
        name: 'izin-yonetimi',
        component: () => import('@/views/users/izin-yonetimi.vue'),
        meta: { layout: 'app', title: 'İzin Yönetimi' }
    },
    // Ürünler
    {
        path: '/inventory/products',
        name: 'products',
        component: () => import('@/views/inventory/products/list.vue'),
        meta: { layout: 'app', title: 'Ürünler' }
    },
    // Ürün Yönetimi (manage.vue)
    {
        path: '/inventory/products/manage',
        name: 'products-manage',
        component: () => import('@/views/inventory/products/manage.vue'),
        meta: { layout: 'app', title: 'Ürün Yönetimi' }
    },
    {
        path: '/inventory/products/new',
        name: 'product-new',
        component: () => import('@/views/inventory/products/product-form.vue'),
        meta: { layout: 'app', title: 'Yeni Ürün Ekle' }
    },
    // Ürün - Alt Parça İlişkilendirme
    {
        path: '/inventory/products/subparts',
        name: 'product-subparts',
        component: () => import('@/views/inventory/products/urun-altparca.vue'),
        meta: { layout: 'app', title: 'Ürün - Alt Parça İlişkilendirme' }
    },
    // Merkez Stok Ekleme
    {
        path: '/inventory/center-stock/add',
        name: 'center-stock-add',
        component: () => import('@/views/inventory/center-stock/add.vue'),
        meta: { layout: 'app', title: 'Ana Merkez Stok Ekleme' }
    },
    // Kategori Yönetimi
    {
        path: '/inventory/categories',
        name: 'categories',
        component: () => import('@/views/inventory/categories/list.vue'),
        meta: { layout: 'app', title: 'Kategoriler' }
    },
    // Projeler
    {
        path: '/projects/projeler',
        name: 'projeler',
        component: () => import('@/views/projects/projeler.vue'),
        meta: { layout: 'app', title: 'Projeler' }
    },
    /* PROJE YÖNETİCİSİ - Proje Ürünleri
    {
        path: '/projects/project-admin/project-products',
        name: 'project-admin-products',
        component: () => import('@/views/projects/project-admin/project-products.vue'),
        meta: { layout: 'app', title: 'Proje Ürünleri' }
    },
    // PROJE YÖNETİCİSİ - Depo Transferleri
    {
        path: '/projects/project-admin/warehouse-transfers',
        name: 'project-admin-warehouse-transfers',
        component: () => import('@/views/projects/project-admin/warehouse-transfers.vue'),
        meta: { layout: 'app', title: 'Depo Transferleri' }
    },
    // PROJE YÖNETİCİSİ - Malzeme Talepleri
    {
        path: '/projects/project-admin/material-requests',
        name: 'project-admin-material-requests',
        component: () => import('@/views/projects/project-admin/material-requests.vue'),
        meta: { layout: 'app', title: 'Malzeme Talepleri' }
    },
    */
    // Merkez Stok Ekleme
    {
        path: '/inventory/center-stock/stock-list',
        name: 'center-stock-list-home',
        component: () => import('@/views/inventory/center-stock/stock-list.vue'),
        meta: { layout: 'app', title: 'Ana Merkez Stok Listesi' }
    },
    // Envanter Ana Sayfa
    {
        path: '/inventory',
        name: 'inventory-dashboard',
        component: () => import('@/views/inventory/dashboard.vue'),
        meta: { layout: 'app', title: 'Envanter Ana Sayfa' }
    },
    // Stok Hareketleri
    {
        path: '/inventory/movements',
        name: 'inventory-movements',
        component: () => import('@/views/inventory/movements/list.vue'),
        meta: { layout: 'app', title: 'Stok Hareketleri' }
    },
    // Stok Transferi
    {
        path: '/inventory/transfer',
        name: 'inventory-transfer',
        component: () => import('@/views/inventory/movements/transfer.vue'),
        meta: { layout: 'app', title: 'Stok Transferi' }
    },
    /* Envanter Stok Raporları
    {
        path: '/inventory/reports/index',
        name: 'inventory-reports',
        component: () => import('@/views/inventory/reports/index.vue'),
        meta: { layout: 'app', title: 'Envanter Stok Raporları' }
    },
    */
    // Onay Merkezi Routes
    {
        path: '/approval',
        name: 'approval-center',
        component: () => import('@/views/approval/approval-center.vue'),
        meta: { layout: 'app', title: 'Onay Merkezi' }
    },
    /* Envanter Stok Raporları
    {
        path: '/approval/repair',
        name: 'repair-approval-center',
        component: () => import('@/views/approval/repair-approval-center.vue'),
        meta: { layout: 'app', title: 'Arıza Onay Talepleri' }
    },
    */
    // Sistem Raporları
    {
        path: '/reports',
        name: 'system-reports',
        component: () => import('@/views/reports/index.vue'),
        meta: { layout: 'app', title: 'Sistem Raporları' }
    },
     // Arıza Yönetimi Rotaları
    {
        path: '/ariza-yonetimi',
        name: 'fault-management',
        component: () => import('@/views/fault-management/faultDashboard.vue'),
        meta: { layout: 'app', title: 'Arıza Yönetimi' }
    },
    {
        path: '/ariza-yonetimi/yeni',
        name: 'fault-create',
        component: () => import('@/views/fault-management/faultCreate.vue'),
        meta: { layout: 'app', title: 'Yeni Arıza' }
    },
    {
        path: '/ariza-yonetimi/detay/:id',
        name: 'fault-detail',
        component: () => import('@/views/fault-management/faultDetail.vue'),
        meta: { layout: 'app', title: 'Arıza Detayı' }
    },
    {
        path: '/ariza-yonetimi/guncelle/:id',
        name: 'fault-update',
        component: () => import('@/views/fault-management/faultUpdate.vue'),
        meta: { layout: 'app', title: 'Arızayı Güncelle' }
    },
    {
        path: '/ariza-yonetimi/onarim-gonder/:id',
        name: 'fault-send-repair',
        component: () => import('@/views/fault-management/faultSendRepair.vue'),
        meta: { layout: 'app', title: 'Onarıma Gönder' }
    },
];

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    const store = useAppStore();
    const token = localStorage.getItem('token');
    
    // Ana ekran - herkes erişebilir (token olmadan da)
    if (to.path === '/') {
        store.setMainLayout('auth');
        next();
        return;
    }
    
    // Login sayfası
    if (to.path === '/auth/boxed-signin') {
        store.setMainLayout('auth');
        // Eğer token varsa anasayfaya yönlendir
        if (token) {
            next({ path: '/anasayfa' });
            return;
        }
        next();
        return;
    }
    
    // Token varsa geçerliliğini kontrol et
    if (token) {
        try {
            // JWT token'ın payload kısmını çöz ve süresini kontrol et
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            
            // Token süresi dolmuşsa
            if (tokenPayload.exp && tokenPayload.exp < currentTime) {
                // Token'ı ve kullanıcı bilgilerini temizle
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                sessionStorage.clear();
                
                // Ana ekrana yönlendir
                store.setMainLayout('auth');
                next({ path: '/' });
                return;
            }
        } catch (error) {
            // Token parse edilemiyorsa temizle ve ana ekrana yönlendir
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            sessionStorage.clear();
            store.setMainLayout('auth');
            next({ path: '/' });
            return;
        }
    }

    // Token yoksa ana ekrana yönlendir
    if (!token) {
        store.setMainLayout('auth');
        next({ path: '/' });
        return;
    }

    // Token geçerliyse app layout'u ayarla ve geç
    store.setMainLayout('app');
    next();
});
router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});
export default router;
