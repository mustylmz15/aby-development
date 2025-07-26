<template>
    <div>
        <div class="absolute inset-0">
            <img src="/assets/images/auth/bg-gradient.png" alt="image" class="h-full w-full object-cover" />
        </div>

        <div
            class="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16"
        >
            <img src="/assets/images/auth/coming-soon-object1.png" alt="image" class="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
            <img src="/assets/images/auth/coming-soon-object2.png" alt="image" class="absolute left-24 top-0 h-40 md:left-[30%]" />
            <img src="/assets/images/auth/coming-soon-object3.png" alt="image" class="absolute right-0 top-0 h-[300px]" />
            <img src="/assets/images/auth/polygon-object.svg" alt="image" class="absolute bottom-0 end-[28%]" />
            <div
                class="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]"
            >
                <div class="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                    <div class="absolute top-6 start-6">
                        <div class="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark dark:bg-black">
                            <div>
                                <img src="/assets/images/flags/TR.svg" alt="Türkiye" class="h-5 w-5 rounded-full object-cover" />
                            </div>
                            <div class="text-base font-bold uppercase">TR</div>
                        </div>
                    </div>
                    <div class="absolute top-6 end-6">
                        <button 
                            @click="goToPortal"
                            class="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary px-3 py-1.5 text-white hover:bg-primary/80 transition-all duration-200"
                            title="ABY Portal'a Git"
                        >
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                            </svg>
                            <span class="text-sm font-medium">Portal</span>
                        </button>
                    </div>
                    <div class="mx-auto w-full max-w-[440px]">
                        <div class="mb-10">
                            <h1 class="text-5xl font-extrabold uppercase !leading-snug text-primary md:text-6xl">ABY PROJECT </h1>
                            <p class="text-base font-bold leading-normal text-white-dark">Lütfen Kullanıcı adı ve Şifrenizi giriniz</p>
                        </div>
                        <LoginForm @login-success="() => { router.push('/anasayfa') }" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { computed, reactive } from 'vue';
    import { useI18n } from 'vue-i18n';
    import appSetting from '@/app-setting';
    import { useAppStore } from '@/stores/index';
    import { useRouter } from 'vue-router';
    import { useMeta } from '@/composables/use-meta';
    

    import IconCaretDown from '@/components/icon/icon-caret-down.vue';
    import LoginForm from './authcomponents/LoginForm.vue';

    const router = useRouter();
    useMeta({ title: 'Login Boxed' });
    const store = useAppStore();
    
    // Portal'a yönlendirme fonksiyonu
    const goToPortal = () => {
        window.open('http://localhost:5173/', '_blank');
    };
    
    // multi language
    const i18n = reactive(useI18n());
    const changeLanguage = (item: any) => {
        i18n.locale = item.code;
        appSetting.toggleLanguage(item);
    };
    const currentFlag = computed(() => {
        return `/assets/images/flags/${i18n.locale.toUpperCase()}.svg`;
    });
</script>
