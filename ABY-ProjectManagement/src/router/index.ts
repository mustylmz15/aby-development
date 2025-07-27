import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';

import HomeView from '../views/index.vue';
import S1BildirimView from '../views/s1-bildirim.vue';
import PersonelGorevView from '../views/personel-gorev.vue';
import PersonelGorevTakvimiView from '../views/personel-gorev-takvimi.vue';
import GorevOlusturView from '../views/gorev-olustur.vue';
import ProjeTakipSistemiView from '../views/proje-takip-sistemi.vue';
import ProjelerView from '../views/projects/projeler.vue';
import ProjeDetayView from '../views/projects/proje-detay.vue';
import ProjeRaporuView from '../views/projects/proje-raporu.vue';
import ProjeOzetiView from '../views/projects/proje-ozeti.vue';
import ProjeBilgileriView from '../views/projects/proje-bilgileri.vue';
import ProjeYeniProjeView from '../views/projects/proje-yeniproje.vue';
import ProjeGorevView from '../views/projects/proje-gorev.vue';
//import ProjeRehberView from '../views/projects/proje-rehber.vue';
import AltyukleniciRehberiView from '../views/alt-yuklenici/altyuklenici-rehberi.vue';
import AltyukleniciDashboardView from '../views/alt-yuklenici/altyuklenici-dashboard.vue';
import AltyukleniciRehberEkleView from '../views/alt-yuklenici/altyuklenici-rehber-ekle.vue';

// Apps
import CalendarView from '../views/apps/calendar.vue';

const routes: RouteRecordRaw[] = [
    // dashboard
    { path: '/', name: 'home', component: HomeView },
    
    // notification pages
    { path: '/s1-bildirim', name: 's1-bildirim', component: S1BildirimView },
    
    // task pages
    { path: '/personel-gorev', name: 'personel-gorev', component: PersonelGorevView },
    { path: '/personel-gorev-takvimi', name: 'personel-gorev-takvimi', component: PersonelGorevTakvimiView },
    { path: '/gorev-olustur', name: 'gorev-olustur', component: GorevOlusturView },
    
    // personnel pages
    { path: '/altyuklenici-dashboard', name: 'altyuklenici-dashboard', component: AltyukleniciDashboardView },
    { path: '/altyuklenici-rehberi', name: 'altyuklenici-rehberi', component: AltyukleniciRehberiView },
    { path: '/altyuklenici-rehber-ekle', name: 'altyuklenici-rehber-ekle', component: AltyukleniciRehberEkleView },
    
    // project pages
    { path: '/projeler', name: 'projeler', component: ProjelerView },
    { path: '/proje-takip-sistemi', name: 'proje-takip-sistemi', component: ProjeTakipSistemiView },
    { path: '/proje-detay', name: 'proje-detay', component: ProjeDetayView },
    { path: '/proje-raporu', name: 'proje-raporu', component: ProjeRaporuView },
    { path: '/proje-ozeti', name: 'proje-ozeti', component: ProjeOzetiView },
    { path: '/proje-bilgileri/:id', name: 'proje-bilgileri', component: ProjeBilgileriView },
    { path: '/yeni-proje', name: 'yeni-proje', component: ProjeYeniProjeView },
    { path: '/proje-gorev', name: 'proje-gorev', component: ProjeGorevView },
    //{ path: '/proje-rehber', name: 'proje-rehber', component: ProjeRehberView },
    
    // Apps
    { path: '/apps/calendar', name: 'apps-calendar', component: CalendarView },
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

    if (to?.meta?.layout == 'auth') {
        store.setMainLayout('auth');
    } else {
        store.setMainLayout('app');
    }
    next(true);
});
router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});
export default router;
