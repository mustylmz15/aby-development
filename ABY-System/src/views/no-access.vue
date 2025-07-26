<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <div class="max-w-md w-full mx-4">
            <div class="bg-white dark:bg-dark rounded-2xl shadow-2xl p-8 text-center">
                <!-- Icon -->
                <div class="mx-auto w-20 h-20 bg-warning/10 rounded-full flex items-center justify-center mb-6">
                    <svg class="w-10 h-10 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                </div>

                <!-- Title -->
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Erişim Yetkiniz Bulunmuyor
                </h1>

                <!-- Message -->
                <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Sisteme giriş yapabildiniz ancak henüz herhangi bir yetkiniz bulunmuyor. 
                    Sistem erişimi için lütfen yöneticinize başvurun.
                </p>

                <!-- User Info -->
                <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                    <div class="text-sm text-gray-500 dark:text-gray-400">Giriş Yapan Kullanıcı:</div>
                    <div class="font-semibold text-gray-900 dark:text-white">kullanici@ornek.com</div>
                </div>

                <!-- Actions -->
                <div class="space-y-3">
                    <button class="w-full btn btn-primary">Mock Buton</button>
                    <button class="w-full btn btn-outline-primary">Mock Buton 2</button>
                </div>

                <!-- Support Info -->
                <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        Yetki talebiniz için sistem yöneticiniz ile iletişime geçin.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
/* Custom styles if needed */
</style>
