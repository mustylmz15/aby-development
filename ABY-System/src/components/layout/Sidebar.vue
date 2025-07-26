<template>
    <div :class="{ 'dark text-white-dark': store.semidark }">
        <nav class="sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300">
            <div class="bg-white dark:bg-[#0e1726] h-full">
                <div class="flex justify-between items-center px-4 py-3">
                    <router-link to="/anasayfa" class="main-logo flex items-center shrink-0">
                        <img class="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="" />
                        <span class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">  A B Y</span>
                    </router-link>
                    <a
                        href="javascript:;"
                        class="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180 hover:text-primary"
                        @click="store.toggleSidebar()"
                    >
                        <icon-carets-down class="m-auto rotate-90" />
                    </a>
                </div>
                <perfect-scrollbar
                    :options="{
                        swipeEasing: true,
                        wheelPropagation: false,
                    }"
                    class="h-[calc(100vh-80px)] relative"
                >
                    <ul class="relative font-semibold space-y-0.5 p-4 py-0">


                        <!-- Dashboard -->
                        <li class="menu nav-item">
                            <router-link to="/anasayfa" class="nav-link group" @click="toggleMobileMenu">
                                <div class="flex items-center">
                                    <icon-menu-dashboard class="group-hover:!text-primary shrink-0" />
                                    <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                        Anasayfa
                                    </span>
                                </div>
                            </router-link>
                        </li>
                        <template v-if="!utils.hasAnyRole(['ONARIM_PERSONELI'])">
                            <!-- Envanter Yönetimi -->
                            <h2 class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <icon-minus class="w-4 h-5 flex-none hidden" />
                                <span>Envanter Yönetimi</span>
                            </h2>
                            
                            <li class="menu nav-item">
                                <button
                                    type="button"
                                    class="nav-link group w-full"
                                    :class="{ active: activeDropdown === 'inventory' }"
                                    @click="activeDropdown === 'inventory' ? (activeDropdown = null) : (activeDropdown = 'inventory')"
                                >
                                    <div class="flex items-center">
                                        <icon-menu-widgets class="group-hover:!text-primary shrink-0" />
                                        <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                            ENVANTER
                                        </span>
                                    </div>
                                    <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== 'inventory' }">
                                        <icon-caret-down />
                                    </div>
                                </button>
                                <vue-collapsible :isOpen="activeDropdown === 'inventory'">
                                    <ul class="sub-menu text-gray-500">
                                        <li>
                                            <router-link to="/inventory" @click="toggleMobileMenu">Anasayfa</router-link>
                                        </li>
                                        <li v-if="utils.hasAnyRole(['ADMIN', 'PROJE_ADMINI'])">
                                            <router-link to="/inventory/products" @click="toggleMobileMenu">Ürünler</router-link>
                                        </li>
                                        <li v-if="utils.hasAnyRole(['ADMIN', 'PROJE_ADMINI'])">
                                            <router-link to="/inventory/products/subparts" @click="toggleMobileMenu">Ürün - Alt Parça İlişkilendirmesi</router-link>
                                        </li>
                                        <li v-if="utils.hasAnyRole(['ADMIN', 'PROJE_ADMINI'])">
                                            <router-link to="/inventory/products/manage" @click="toggleMobileMenu">Ürün Proje İlişkilendirmesi</router-link>
                                        </li>
                                        <li v-if="utils.hasAnyRole(['ADMIN', 'PROJE_ADMINI'])">
                                            <router-link to="/inventory/categories" @click="toggleMobileMenu">Kategoriler</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/inventory/movements" @click="toggleMobileMenu">Stok Hareketleri</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/inventory/transfer" @click="toggleMobileMenu">Stok Transferi</router-link>
                                        </li>
                                        <li v-if="utils.hasAnyRole(['ADMIN', 'PROJE_ADMINI'])">
                                            <router-link to="/inventory/center-stock/stock-list" @click="toggleMobileMenu">Ana Merkez Stok Listesi</router-link>
                                        </li>
                                    </ul>
                                </vue-collapsible>
                            </li>
                        </template>

                        <!-- Onay Merkezi -->
                        <h2 class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                            <icon-minus class="w-4 h-5 flex-none hidden" />
                            <span>Onay Merkezi</span>
                        </h2>
                        
                        <li class="menu nav-item">
                            <button
                                type="button"
                                class="nav-link group w-full"
                                :class="{ active: activeDropdown === 'approval' }"
                                @click="activeDropdown === 'approval' ? (activeDropdown = null) : (activeDropdown = 'approval')"
                            >
                                <div class="flex items-center">
                                    <svg class="group-hover:!text-primary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M9 12l2 2 4-4"></path>
                                        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                                        <path d="M3 12c1 0 3-1-3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                                        <path d="M12 21c0-1-1-3-3-3s-3 2-3 3 1 3 3 3 3-2 3-3"></path>
                                        <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"></path>
                                    </svg>
                                    <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                        ONAY MERKEZİ
                                    </span>
                                </div>
                                <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== 'approval' }">
                                    <icon-caret-down />
                                </div>
                            </button>
                            <vue-collapsible :isOpen="activeDropdown === 'approval'">
                                <ul class="sub-menu text-gray-500">
                                    <li>
                                        <router-link to="/approval" @click="toggleMobileMenu">Onay Talepleri</router-link>
                                    </li>
                                </ul>
                            </vue-collapsible>
                        </li>
                            <template  v-if="!utils.hasAnyRole(['ONARIM_PERSONELI'])"

                                <!-- Depo Yönetimi -->
                                <h2 class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                    <icon-minus class="w-4 h-5 flex-none hidden" />
                                    <span>Depo Yönetimi</span>
                                </h2>
                                
                                <li class="menu nav-item">
                                    <button
                                        type="button"
                                        class="nav-link group w-full"
                                        :class="{ active: activeDropdown === 'warehouse' }"
                                        @click="activeDropdown === 'warehouse' ? (activeDropdown = null) : (activeDropdown = 'warehouse')"
                                    >
                                        <div class="flex items-center">
                                            <svg class="group-hover:!text-primary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                                <rect x="3" y="7" width="18" height="13" rx="2" ry="2" />
                                                <path d="M16 3v4M8 3v4M3 11h18" />
                                            </svg>
                                            <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                DEPO YÖNETİMİ
                                            </span>
                                        </div>
                                        <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== 'warehouse' }">
                                            <icon-caret-down />
                                        </div>
                                    </button>
                                    <vue-collapsible :isOpen="activeDropdown === 'warehouse'">
                                        <ul class="sub-menu text-gray-500">
                                            <li v-if="utils.hasAnyRole(['ADMIN', 'PROJE_ADMINI'])">
                                                <router-link to="/warehouse/depo-yonetimi" @click="toggleMobileMenu">Depo Yönetimi</router-link>
                                            </li>
                                            <li>
                                                <router-link to="/warehouse/envanter" @click="toggleMobileMenu">Depo Envanter</router-link>
                                            </li>
                                            <li>
                                                <router-link to="/warehouse/yerinetak" @click="toggleMobileMenu">Depo Yerinetak</router-link>
                                            </li>
                                        </ul>
                                    </vue-collapsible>
                                </li>
                            </template>
                        
                        <!-- Arıza Yönetimi -->
                        <h2 class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                            <icon-minus class="w-4 h-5 flex-none hidden" />
                            <span>Arıza Yönetimi</span>
                        </h2>
                        <li class="menu nav-item" v-if="!utils.hasAnyRole(['ONARIM_PERSONELI'])">
                            <button
                                type="button"
                                class="nav-link group w-full"
                                :class="{ active: activeDropdown === 'fault-management' }"
                                @click="activeDropdown === 'fault-management' ? (activeDropdown = null) : (activeDropdown = 'fault-management')"
                            >
                                <div class="flex items-center">
                                    <icon-menu-widgets class="group-hover:!text-primary shrink-0" />
                                    <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                        ARIZA YÖNETİMİ
                                    </span>
                                </div>
                                <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== 'fault-management' }">
                                    <icon-caret-down />
                                </div>
                            </button>
                            <vue-collapsible :isOpen="activeDropdown === 'fault-management'">
                                <ul class="sub-menu text-gray-500">
                                    <li>
                                        <router-link to="/ariza-yonetimi" @click="toggleMobileMenu">Arızalı Ürün Yönetimi</router-link>
                                    </li>
                                </ul>
                            </vue-collapsible>
                        </li>

                        <!-- Onarım Merkezi -->
                        <li class="menu nav-item" v-if="utils.hasAnyRole(['ADMIN', 'PROJE_ADMINI', 'ONARIM_PERSONELI'])">
                            <button
                                type="button"
                                class="nav-link group w-full"
                                :class="{ active: activeDropdown === 'repair-center' }"
                                @click="activeDropdown === 'repair-center' ? (activeDropdown = null) : (activeDropdown = 'repair-center')"
                            >
                                <div class="flex items-center">
                                    <icon-menu-widgets class="group-hover:!text-primary shrink-0" />
                                    <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                        ONARIM MERKEZİ
                                    </span>
                                </div>
                                <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== 'repair-center' }">
                                    <icon-caret-down />
                                </div>
                            </button>
                            <vue-collapsible :isOpen="activeDropdown === 'repair-center'">
                                <ul class="sub-menu text-gray-500">
                                    <li>
                                        <router-link to="/onarim-merkezi/onarim-merkezi" @click="toggleMobileMenu">Onarım Merkezi</router-link>
                                    </li>
                                </ul>
                            </vue-collapsible>
                        </li>

                        <!-- Kullanıcı ve Sayfalar -->
                        <h2 class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                            <icon-minus class="w-4 h-5 flex-none hidden" />
                            <span>Kullanıcı ve Sayfalar</span>
                        </h2>
                        
                        <!-- Profil - Herkes görebilir -->
                        <li class="menu nav-item">
                            <button type="button" class="nav-link group w-full"
                                :class="{ active: activeDropdown === 'profile' }"
                                @click="activeDropdown === 'profile' ? (activeDropdown = null) : (activeDropdown = 'profile')">
                                <div class="flex items-center">
                                    <icon-menu-users class="group-hover:!text-primary shrink-0" />
                                    <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                        Profil
                                    </span>
                                </div>
                                <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== 'profile' }">
                                    <icon-caret-down />
                                </div>
                            </button>
                            <vue-collapsible :isOpen="activeDropdown === 'profile'">
                                <ul class="sub-menu text-gray-500">
                                    <li>
                                        <router-link to="/users/profile" @click="toggleMobileMenu">Profil</router-link>
                                    </li>
                                </ul>
                            </vue-collapsible>
                        </li>
                        
                        <!-- Yönetici Paneli (Sadece ADMIN ve MANAGER) -->
                        <li class="menu nav-item" v-if="sidebar.canViewAdminPanelMenu.value">
                            <button
                                type="button"
                                class="nav-link group w-full"
                                :class="{ active: activeDropdown === 'admin' }"
                                @click="activeDropdown === 'admin' ? (activeDropdown = null) : (activeDropdown = 'admin')">
                                <div class="flex items-center">
                                    <icon-menu-users class="group-hover:!text-primary shrink-0" />
                                    <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                        YÖNETİCİ PANELİ
                                    </span>
                                </div>
                                <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== 'admin' }">
                                    <icon-caret-down />
                                </div>
                            </button>
                            <vue-collapsible :isOpen="activeDropdown === 'admin'">
                                <ul class="sub-menu text-gray-500">
                                    <li>
                                        <router-link to="/projects/projeler" @click="toggleMobileMenu">Proje Yönetimi</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/users/kullanici-yonetimi" @click="toggleMobileMenu">Kullanıcı Yönetimi</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/users/rol-yonetimi" @click="toggleMobileMenu">Rol Yönetimi</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/users/izin-yonetimi" @click="toggleMobileMenu">İzin Yönetimi</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/reports" @click="toggleMobileMenu">Raporlar</router-link>
                                    </li>
                                    
                                </ul>
                            </vue-collapsible>
                        </li>
                        
                        <!-- Proje Yönetimi - Sadece ADMIN ve PROJE_ADMINI 
                        <li class="menu nav-item" v-if="sidebar.canViewAdminPanelMenu.value">
                            <router-link to="/projects/projeler" class="nav-link group" @click="toggleMobileMenu">
                                <div class="flex items-center">
                                    <icon-menu-widgets class="group-hover:!text-primary shrink-0" />
                                    <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                        Proje Yönetimi
                                    </span>
                                </div>
                            </router-link>
                        </li>
                        
                         Proje Yöneticisi - Sadece ADMIN ve PROJE_ADMINI
                        <li class="menu nav-item" v-if="sidebar.canViewProjectAdminMenu.value">
                            <button
                                type="button"
                                class="nav-link group w-full"
                                :class="{ active: activeDropdown === 'project-admin' }"
                                @click="activeDropdown === 'project-admin' ? (activeDropdown = null) : (activeDropdown = 'project-admin')"
                            >
                                <div class="flex items-center">
                                    <icon-menu-widgets class="group-hover:!text-primary shrink-0" />
                                    <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                        PROJE YÖNETİCİSİ
                                    </span>
                                </div>
                                <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== 'project-admin' }">
                                    <icon-caret-down />
                                </div>
                            </button>
                            <vue-collapsible :isOpen="activeDropdown === 'project-admin'">
                                <ul class="sub-menu text-gray-500">
                                    <li>
                                        <router-link to="/projects/project-admin/project-products" @click="toggleMobileMenu">Proje Ürün Yapılandırması</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/projects/project-admin/material-requests" @click="toggleMobileMenu">Malzeme Talep Onayları</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/projects/project-admin/warehouse-transfers" @click="toggleMobileMenu">Depo Transferleri</router-link>
                                    </li>
                                </ul>
                            </vue-collapsible>
                        </li>
                         -->

                    </ul>
                </perfect-scrollbar>
            </div>
        </nav>
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted } from 'vue';

    import { useAppStore } from '@/stores/index';
    import VueCollapsible from 'vue-height-collapsible/vue3';

    import IconCaretsDown from '@/components/icon/icon-carets-down.vue';
    import IconMenuDashboard from '@/components/icon/menu/icon-menu-dashboard.vue';
    import IconMinus from '@/components/icon/icon-minus.vue';
    import IconMenuChat from '@/components/icon/menu/icon-menu-chat.vue';
    import IconMenuMailbox from '@/components/icon/menu/icon-menu-mailbox.vue';
    import IconMenuTodo from '@/components/icon/menu/icon-menu-todo.vue';
    import IconMenuNotes from '@/components/icon/menu/icon-menu-notes.vue';
    import IconMenuScrumboard from '@/components/icon/menu/icon-menu-scrumboard.vue';
    import IconMenuContacts from '@/components/icon/menu/icon-menu-contacts.vue';
    import IconMenuInvoice from '@/components/icon/menu/icon-menu-invoice.vue';
    import IconCaretDown from '@/components/icon/icon-caret-down.vue';
    import IconMenuCalendar from '@/components/icon/menu/icon-menu-calendar.vue';
    import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
    import IconMenuElements from '@/components/icon/menu/icon-menu-elements.vue';
    import IconMenuCharts from '@/components/icon/menu/icon-menu-charts.vue';
    import IconMenuWidgets from '@/components/icon/menu/icon-menu-widgets.vue';
    import IconMenuFontIcons from '@/components/icon/menu/icon-menu-font-icons.vue';
    import IconMenuDragAndDrop from '@/components/icon/menu/icon-menu-drag-and-drop.vue';
    import IconMenuTables from '@/components/icon/menu/icon-menu-tables.vue';
    import IconMenuDatatables from '@/components/icon/menu/icon-menu-datatables.vue';
    import IconMenuForms from '@/components/icon/menu/icon-menu-forms.vue';
    import IconMenuUsers from '@/components/icon/menu/icon-menu-users.vue';
    import IconMenuPages from '@/components/icon/menu/icon-menu-pages.vue';
    import IconMenuAuthentication from '@/components/icon/menu/icon-menu-authentication.vue';
    import IconMenuDocumentation from '@/components/icon/menu/icon-menu-documentation.vue';
    import { useLayoutPermissions } from './useLayoutPermissions';

    const store = useAppStore();
    const activeDropdown: any = ref('');
    const subActive: any = ref('');
    
    // Yetki sistemi
    const { sidebar, utils } = useLayoutPermissions();

    onMounted(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    });

    const toggleMobileMenu = () => {
        if (window.innerWidth < 1024) {
            store.toggleSidebar();
        }
    };
</script>
