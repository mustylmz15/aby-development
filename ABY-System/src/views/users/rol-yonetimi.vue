<template>
  <div>
    <RoleHeader />
    <RoleUserTable>
      <template #userCount>{{ users.length }} kullanıcı</template>
      <template v-for="user in users" :key="user.id">
        <tr class="hover:bg-blue-50 transition-colors duration-200">
          <td class="px-6 py-4 whitespace-nowrap">
            <UserAvatarName :name="user.firstName + ' ' + user.lastName" />
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-700">{{ user.email }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex flex-wrap gap-2">
              <template v-if="user.roles && user.roles.length">
                <template v-for="role in user.roles" :key="role">
                  <RoleBadge :color="getRoleColor(role)">
                    {{ role }}
                  </RoleBadge>
                </template>
              </template>
              <template v-else>
                <span class="text-gray-400 text-xs italic">Rol yok</span>
              </template>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="text-sm text-gray-500">
              <template v-if="user.assignments && user.assignments.length">
                <template v-for="assignment in user.assignments" :key="assignment.id">
                  <span>
                    {{ assignment.resourceType }}
                    <span v-if="assignment.resourceId">
                      :
                      <span v-if="assignment.resourceType === 'PROJECT'">
                        {{ projectMap[assignment.resourceId] || assignment.resourceId }}
                      </span>
                      <span v-else-if="assignment.resourceType === 'WAREHOUSE'">
                        {{ warehouseMap[assignment.resourceId] || assignment.resourceId }}
                      </span>
                      <span v-else>
                        {{ assignment.resourceId }}
                      </span>
                    </span>
                  </span>
                  <span v-if="!isLastAssignment(user.assignments, assignment)">, </span>
                </template>
              </template>
              <template v-else>
                <span class="text-gray-400 text-xs">Proje yok</span>
              </template>
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right">
            <div class="flex flex-row gap-2 items-center justify-end">
              <RoleActions
                :canView="true"
                :canEdit="true"
                :canDelete="true"
                @edit="openEditModal(user)"
                @view="openDetailModal(user)"
                @delete="openAssignmentDeleteModal(user)"
              />
            </div>
          </td>




        </tr>
      </template>
    </RoleUserTable>

    <RoleEditModal :visible="showEditModal" :user="selectedUser as any" @close="closeEditModal" @save="saveEdit" />

<UserDetailModal 
  :visible="showDetailModal" 
  :user="selectedUserForDetail" 
  @close="closeDetailModal" 
  @deleted="onUserDeleted"
  @project-assignments-deleted="onProjectAssignmentsDeleted"
/>
<AssignmentDeleteModal 
  :visible="showDeleteModal"
  :assignments="selectedUserForDelete?.assignments || []"
  :userId="selectedUserForDelete?.id || ''"
  @close="showDeleteModal = false"
  @deleted="onAssignmentDeleted"
/>
</div>
</template>

<script setup lang="ts">
import AssignmentDeleteModal from './user_components/AssignmentDeleteModal.vue';
import Swal from 'sweetalert2';
const showDeleteModal = ref(false);
const selectedUserForDelete = ref<User | null>(null);
import UserDetailModal from './user_components/UserDetailModal.vue';
const showDetailModal = ref(false);
const selectedUserForDetail = ref<User | null>(null);

function openDetailModal(user: User) {
  selectedUserForDetail.value = user;
  showDetailModal.value = true;
}
function closeDetailModal() {
  showDetailModal.value = false;
  selectedUserForDetail.value = null;
}

function openAssignmentDeleteModal(user: User) {
  selectedUserForDelete.value = user;
  showDeleteModal.value = true;
}

async function onAssignmentDeleted(assignmentIds: string[]) {
  // Silinen assignment'ları localden çıkar
  if (selectedUserForDelete.value && selectedUserForDelete.value.assignments) {
    selectedUserForDelete.value.assignments = selectedUserForDelete.value.assignments.filter(a => a.id && !assignmentIds.includes(a.id));
  }
  showDeleteModal.value = false;
  await fetchUsers();
}
import { ref, onMounted } from 'vue';
import RoleHeader from './user_components/RoleHeader.vue';
import RoleUserTable from './user_components/RoleUserTable.vue';
import RoleBadge from './user_components/RoleBadge.vue';
import RoleActions from './user_components/RoleActions.vue';
import UserAvatarName from './user_components/UserAvatarName.vue';
import RoleEditModal from './user_components/RoleEditModal.vue';
import { RESOURCE_API_MAP } from './user_components/resourceApiMap';
import { usersApi, type User, type Assignment } from './api/users-api';

const users = ref<User[]>([]);
const showEditModal = ref(false);
const selectedUser = ref<User | null>(null);

// Proje ve depo isimleri için mapler
const projectMap = ref<Record<string, string>>({});
const warehouseMap = ref<Record<string, string>>({});

const getRoleColor = (role: string) => {
  const colorMap: Record<string, string> = {
    'ADMIN': 'inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm transition-all duration-200 hover:shadow-md bg-gradient-to-r from-red-500 to-red-600 text-white border border-red-400/30',
    'DEPO_PERSONELI': 'inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm transition-all duration-200 hover:shadow-md bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border border-indigo-400/30',
    'PROJE_ADMINI': 'inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm transition-all duration-200 hover:shadow-md bg-gradient-to-r from-purple-500 to-purple-600 text-white border border-purple-400/30',
    'SAHA_PERSONELI': 'inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm transition-all duration-200 hover:shadow-md bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border border-emerald-400/30',
    'default': 'inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm transition-all duration-200 hover:shadow-md bg-gradient-to-r from-gray-400 to-gray-500 text-white border border-gray-300/30'
  };
  return colorMap[role] || colorMap['default'];
};

const isLastAssignment = (assignments: Assignment[], assignment: Assignment) => {
  return assignments[assignments.length - 1] === assignment;
};


// Tek bir assignment'ı silen fonksiyon
async function handleDeleteAssignment(assignment: Assignment) {
  if (!assignment.id) return;
  
  const result = await Swal.fire({
    title: 'Rolü Sil',
    text: 'Bu rolü silmek istediğinize emin misiniz?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Evet, Sil!',
    cancelButtonText: 'İptal',
    padding: '2em',
    customClass: { popup: 'sweet-alerts' }
  });
  
  if (!result.isConfirmed) return;
  try {
    await usersApi.deleteAssignment(assignment.id);
    await fetchUsers();
    await Swal.fire({
      icon: 'success',
      title: 'Başarılı!',
      text: 'Rol başarıyla silindi!',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });
  } catch (e) {
    await Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Rol silinirken hata oluştu!',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });
  }
}

const fetchUsers = async () => {
  try {
    // Önce rol kontrolü yap
    if (!usersApi.hasRole('ADMIN') && !usersApi.hasRole('USER_MANAGER')) {
      console.warn('Kullanıcı yönetimi için yeterli yetki yok');
      await Swal.fire({
        icon: 'warning',
        title: 'Yetkisiz Erişim',
        text: 'Bu sayfaya erişim yetkiniz bulunmuyor.',
        padding: '2em',
        customClass: { popup: 'sweet-alerts' }
      });
      return;
    }

    // Kullanıcı bilgilerini güncelle
    await usersApi.refreshCurrentUserInfo();
    
    const data = await usersApi.getAllUsers();
    users.value = data;
    // assignments'tan unique roles array'ini güncelle
    users.value.forEach(user => {
      if (user.assignments && Array.isArray(user.assignments)) {
        const uniqueRoles = [...new Set(user.assignments.map(a => a.role))];
        user.roles = uniqueRoles;
    } else {
      user.roles = [];
    }
  });
  } catch (error) {
    await Swal.fire({
      icon: 'error',
      title: 'Hata!',
      text: 'Kullanıcılar çekilemedi!',
      padding: '2em',
      customClass: { popup: 'sweet-alerts' },
      confirmButtonText: 'Tamam'
    });
    users.value = [];
  }
};

function openEditModal(user: User) {
  selectedUser.value = user;
  showEditModal.value = true;
}
function closeEditModal() {
  showEditModal.value = false;
  selectedUser.value = null;
}
// RoleEditModal'dan hem assignments hem roles alınacak şekilde güncellendi
async function saveEdit(assignments: Assignment[], roles?: string[]) {
  if (!selectedUser.value) return;
  try {
    const safeAssignments = Array.isArray(assignments) ? assignments : [];
    const safeRoles = Array.isArray(roles) ? roles : safeAssignments.map(a => a.role);
    const payload = { userId: selectedUser.value.id, assignments: safeAssignments, roles: safeRoles };
    console.log('KAYDET ile backend\'e gönderilen veri:', payload);
    if (selectedUser.value?.id) {
      await usersApi.assignRoles(selectedUser.value.id, safeRoles);
    }
    // Modalı kapatmadan önce localdeki user'ın assignments ve roles'unu güncelle
    if (selectedUser.value) {
      selectedUser.value.assignments = safeAssignments;
      selectedUser.value.roles = safeRoles;
    }
    closeEditModal();
    fetchUsers();
  } catch (e) {
    alert('Rol güncelleme sırasında hata oluştu!');
  }
}

async function fetchResourceNames() {
  // Projeler
  try {
    const projects = await usersApi.getProjects();
    // id -> name map
    projectMap.value = Array.isArray(projects)
      ? Object.fromEntries(projects.map((p: any) => [String(p.id), p.name || p.projectName || p.title || String(p.id)]))
      : {};
  } catch {}
  // Depolar
  try {
    const warehouses = await usersApi.getWarehouses();
    warehouseMap.value = Array.isArray(warehouses)
      ? Object.fromEntries(warehouses.map((w: any) => [String(w.id), w.name || w.title || String(w.id)]))
      : {};
  } catch {}
}

// Missing handler functions for UserDetailModal emits
function handleUserUpdate() {
  // Kullanıcı güncellendiğinde verileri yenile
  fetchUsers();
}

function handleShowEditModal() {
  if (selectedUser.value) {
    showEditModal.value = true;
  }
}

// Missing event handlers
function onUserDeleted() {
  fetchUsers();
}

function onProjectAssignmentsDeleted() {
  fetchUsers();
}

onMounted(async () => {
  await Promise.all([fetchResourceNames(), fetchUsers()]);
});
</script>