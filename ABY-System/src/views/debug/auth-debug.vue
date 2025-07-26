<template>
    <div class="panel">
        <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">🔍 Auth Debug - Kullanıcı Bilgileri</h5>
        </div>        <!-- Current User Info -->
        <div class="mb-5">
            <h6 class="text-lg font-semibold mb-3">👤 Mevcut Kullanıcı</h6>
            <div class="space-y-2">
                <div><strong>Email:</strong> {{ authStore.user?.email || 'Yok' }}</div>
                <div><strong>Full Name:</strong> {{ authStore.user?.full_name || 'Yok' }}</div>
                <div><strong>Primary Role:</strong> {{ authStore.user?.primary_role || 'Yok' }}</div>
                <div><strong>Roles Array:</strong> {{ JSON.stringify(authStore.user?.roles) || 'Yok' }}</div>
                <div><strong>User ID:</strong> {{ authStore.user?.id || 'Yok' }}</div>
            </div>
        </div>

        <!-- Auth Store Getters -->
        <div class="mb-5">
            <h6 class="text-lg font-semibold mb-3">🔐 Auth Store Getter'ları</h6>
            <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                    <div class="flex items-center">
                        <span class="w-4 h-4 rounded mr-2" :class="authStore.isAdmin ? 'bg-green-500' : 'bg-red-500'"></span>
                        <strong>isAdmin:</strong> {{ authStore.isAdmin }}
                    </div>
                    <div class="flex items-center">
                        <span class="w-4 h-4 rounded mr-2" :class="authStore.isProjectAdmin ? 'bg-green-500' : 'bg-red-500'"></span>
                        <strong>isProjectAdmin:</strong> {{ authStore.isProjectAdmin }}
                    </div>
                    <div class="flex items-center">
                        <span class="w-4 h-4 rounded mr-2" :class="authStore.isWarehouseManager ? 'bg-green-500' : 'bg-red-500'"></span>
                        <strong>isWarehouseManager:</strong> {{ authStore.isWarehouseManager }}
                    </div>
                    <div class="flex items-center">
                        <span class="w-4 h-4 rounded mr-2" :class="authStore.isObserver ? 'bg-green-500' : 'bg-red-500'"></span>
                        <strong>isObserver:</strong> {{ authStore.isObserver }}
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center">
                        <span class="w-4 h-4 rounded mr-2" :class="authStore.isLoggedIn ? 'bg-green-500' : 'bg-red-500'"></span>
                        <strong>isLoggedIn:</strong> {{ authStore.isLoggedIn }}
                    </div>
                    <div class="flex items-center">
                        <span class="w-4 h-4 rounded mr-2" :class="authStore.authReady ? 'bg-green-500' : 'bg-red-500'"></span>
                        <strong>authReady:</strong> {{ authStore.authReady }}
                    </div>
                </div>
            </div>
        </div>

        <!-- User Roles Array -->
        <div class="mb-5">
            <h6 class="text-lg font-semibold mb-3">📝 Kullanıcı Rolleri</h6>
            <div class="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <strong>Roles Array:</strong> {{ authStore.user?.roles || [] }}
            </div>
        </div>

        <!-- Raw User Object -->
        <div class="mb-5">
            <h6 class="text-lg font-semibold mb-3">🗂️ Ham Kullanıcı Verisi</h6>
            <pre class="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-auto max-h-64">{{ JSON.stringify(authStore.user, null, 2) }}</pre>
        </div>        <!-- Database Check -->
        <div class="mb-5">
            <h6 class="text-lg font-semibold mb-3">🗄️ Veritabanı Kontrolü</h6>
            <div class="space-x-2 mb-3">
                <button @click="checkDatabase" class="btn btn-primary" :disabled="loading">
                    {{ loading ? 'Kontrol Ediliyor...' : 'Supabase\'den Kullanıcı Verilerini Kontrol Et' }}
                </button>
                <button @click="fixAdminRole" class="btn btn-warning" :disabled="loading">
                    🔧 Admin Rolünü Düzelt
                </button>
            </div>
            
            <div v-if="dbResult" class="bg-gray-100 dark:bg-gray-800 p-3 rounded mb-3">
                <h6 class="font-semibold mb-2">Profiles Tablosu:</h6>
                <pre class="text-sm">{{ JSON.stringify(dbResult, null, 2) }}</pre>
            </div>            
            <div v-if="fixResult" class="p-3 rounded mb-3" :class="fixResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                <h6 class="font-semibold mb-2">{{ fixResult.success ? '✅ Başarılı!' : '❌ Hata!' }}</h6>
                <p>{{ fixResult.message }}</p>
            </div>
        </div>        <!-- RBAC System -->
        <div class="mb-5">
            <h6 class="text-lg font-semibold mb-3">🛡️ RBAC Sistemi (Yeni Sistem)</h6>
              <!-- User Roles Debug Bilgisi -->
            <div class="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <h6 class="font-semibold text-yellow-800 mb-2">🔍 Debug: User Roles</h6>
                <div class="text-sm">
                    <div><strong>authStore.userRoles:</strong> {{ JSON.stringify(authStore.userRoles) }}</div>
                    <div><strong>authStore.user?.id:</strong> {{ authStore.user?.id }}</div>
                    <div><strong>authStore.userInfo?.id:</strong> {{ authStore.userInfo?.id }}</div>
                    <div class="mt-2 text-red-600"><strong>RBAC isAdmin.value:</strong> {{ isAdmin.value }}</div>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                    <div class="flex items-center">
                        <span class="w-4 h-4 rounded mr-2" :class="isAdmin.value ? 'bg-green-500' : 'bg-red-500'"></span>
                        <strong>isAdmin:</strong> {{ isAdmin.value }}
                    </div>
                    <div class="flex items-center">
                        <span class="w-4 h-4 rounded mr-2" :class="isProjectAdmin.value ? 'bg-green-500' : 'bg-red-500'"></span>
                        <strong>isProjectAdmin:</strong> {{ isProjectAdmin.value }}
                    </div>
                    <div class="flex items-center">
                        <span class="w-4 h-4 rounded mr-2" :class="isWarehouseManager.value ? 'bg-green-500' : 'bg-red-500'"></span>
                        <strong>isWarehouseManager:</strong> {{ isWarehouseManager.value }}
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center">
                        <span class="w-4 h-4 rounded mr-2" :class="canManageProjects.value ? 'bg-green-500' : 'bg-red-500'"></span>
                        <strong>canManageProjects:</strong> {{ canManageProjects.value }}
                    </div>
                    <div class="flex items-center">
                        <span class="w-4 h-4 rounded mr-2" :class="canManageUsers.value ? 'bg-green-500' : 'bg-red-500'"></span>
                        <strong>canManageUsers:</strong> {{ canManageUsers.value }}
                    </div>
                    <div class="flex items-center">
                        <span class="w-4 h-4 rounded mr-2" :class="canManageWarehouse.value ? 'bg-green-500' : 'bg-red-500'"></span>
                        <strong>canManageWarehouse:</strong> {{ canManageWarehouse.value }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Admin Test Actions -->
        <div class="mb-5" v-if="isAdmin.value">
            <h6 class="text-lg font-semibold mb-3 text-green-600">✅ Admin Fonksiyonları (RBAC ile Görünür)</h6>
            <div class="space-y-2">
                <button class="btn btn-success mr-2">Kullanıcı Yönetimi</button>
                <button class="btn btn-success mr-2">Proje Yönetimi</button>
                <button class="btn btn-success mr-2">Veritabanı Yönetimi</button>
            </div>
        </div>

        <div class="mb-5" v-else>
            <h6 class="text-lg font-semibold mb-3 text-red-600">❌ Admin Fonksiyonları (RBAC ile Gizli)</h6>
            <p class="text-red-600">Bu kullanıcı RBAC sistemine göre admin değil, admin fonksiyonları görünmüyor.</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth-store'
import { useRBAC } from '@/composables/useRBAC'
import { supabase } from '@/supabase'

const authStore = useAuthStore()
const { isAdmin, isProjectAdmin, isWarehouseManager, canManageProjects, canManageUsers, canManageWarehouse } = useRBAC()
const loading = ref(false)
const dbResult = ref(null)
const fixResult = ref(null)

const checkDatabase = async () => {
    loading.value = true
    fixResult.value = null
    try {
        if (authStore.user?.id) {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authStore.user.id)
                .single()
            
            if (error) {
                console.error('Database error:', error)
                dbResult.value = { error: error.message }
            } else {
                dbResult.value = data
            }
        }
    } catch (err) {
        console.error('Check error:', err)
        dbResult.value = { error: err.message }
    } finally {
        loading.value = false
    }
}

const fixAdminRole = async () => {
    loading.value = true
    fixResult.value = null
    try {
        if (!authStore.user?.id) {
            fixResult.value = { success: false, message: 'Kullanıcı ID bulunamadı!' }
            return
        }

        // Önce mevcut durumu kontrol et
        const { data: currentUser, error: checkError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authStore.user.id)
            .single()

        if (checkError) {
            fixResult.value = { success: false, message: `Kullanıcı bulunamadı: ${checkError.message}` }
            return
        }

        console.log('Mevcut kullanıcı durumu:', currentUser)

        // Admin rolünü ekle/güncelle
        const { data, error } = await supabase
            .from('profiles')
            .update({ 
                roles: ['admin'],
                updated_at: new Date().toISOString()
            })
            .eq('id', authStore.user.id)
            .select()

        if (error) {
            console.error('Admin rol güncelleme hatası:', error)
            fixResult.value = { success: false, message: `Rol güncellenirken hata: ${error.message}` }
        } else {
            console.log('Admin rol başarıyla güncellendi:', data)
            fixResult.value = { success: true, message: 'Admin rolü başarıyla güncellendi! Sayfayı yenileyin.' }
            
            // Auth store'u da güncelle
            if (authStore.user) {
                authStore.user.roles = ['admin']
                authStore.user.primary_role = 'admin'
                authStore.user.role = 'admin'
            }
        }
    } catch (err) {
        console.error('Fix error:', err)
        fixResult.value = { success: false, message: `Beklenmeyen hata: ${err.message}` }
    } finally {
        loading.value = false
    }
}
</script>
