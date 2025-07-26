<template>
  <div>
    <div class="panel">
      <div class="flex mb-5 justify-between">
        <div class="flex items-center">
          <h5 class="font-semibold text-lg dark:text-white-light mr-2">Proje Yönetimi</h5>
        </div>
        <div class="flex gap-2">
          <ProjectAddButton @add="onAddProject" />
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded shadow p-4 mb-5">
        <ProjectTable
          :projects="projects"
          @detail="onDetailProject"
          @edit="onEditProject"
          @delete="onDeleteProject"
        />
      </div>
    </div>
    <ProjectEditModal
      :visible="editModalVisible"
      :project="selectedProject"
      @save="onSaveProject"
      @close="onCloseEditModal"
    />
    <ProjectDetailModal
      :visible="detailModalVisible"
      :project="selectedProject"
      @close="onCloseDetailModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProjectAddButton from './project-companents/ProjectAddButton.vue';
import ProjectTable from './project-companents/ProjectTable.vue';
import ProjectEditModal from './project-companents/ProjectEditModal.vue';
import ProjectDetailModal from './project-companents/ProjectDetailModal.vue';

const projects = ref<any[]>([]);

// .env dosyasından VITE_API_BASE_URL alınır
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/projects`;
// Token localStorage'dan dinamik alınır
function getToken() {
  return localStorage.getItem('token') || '';
}
async function fetchProjects() {
  try {
    const res = await fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Projeler alınamadı');
    const data = await res.json();
    // API'den gelen status'u Türkçeleştir
    projects.value = data.map((p: any) => ({
      ...p,
      status: p.status === 'ACTIVE' ? 'Aktif' : 'Pasif',
      createdAt: p.createdAt ? new Date(p.createdAt).toLocaleString('tr-TR') : '',
      updatedAt: p.updatedAt ? new Date(p.updatedAt).toLocaleString('tr-TR') : '',
    }));
  } catch (err) {
    console.error(err);
  }
}

onMounted(fetchProjects);

const editModalVisible = ref(false);
const detailModalVisible = ref(false);
const selectedProject = ref<any>(null);

function onAddProject() {
  selectedProject.value = { name: '', description: '', status: 'Aktif', sla: 0 };
  editModalVisible.value = true;
}

function onEditProject(project: any) {
  selectedProject.value = { ...project };
  editModalVisible.value = true;
}

function onDetailProject(project: any) {
  selectedProject.value = { ...project };
  detailModalVisible.value = true;
}

function onCloseDetailModal() {
  detailModalVisible.value = false;
}

async function onDeleteProject(project: any) {
  if (confirm(`${project.name} silinsin mi?`)) {
    try {
      const res = await fetch(`${API_URL}/${project.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Silme işlemi başarısız');
      projects.value = projects.value.filter((p) => p.id !== project.id);
    } catch (err) {
      alert('Silme işlemi başarısız!');
      console.error(err);
    }
  }
}

async function onSaveProject(project: any) {
  if (project.id) {
    // Düzenleme
    try {
      const payload = {
        code: project.code,
        name: project.name,
        description: project.description,
        status: project.status === 'Aktif' ? 'ACTIVE' : 'PLANNING',
        organizationId: project.organizationId,
        startDate: project.startDate ? new Date(project.startDate).toISOString() : null,
        endDate: project.endDate ? new Date(project.endDate).toISOString() : null,
        sla: typeof project.sla === 'number' ? project.sla : 0
      };
      const res = await fetch(`${API_URL}/${project.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Proje güncellenemedi');
      await fetchProjects();
    } catch (err) {
      alert('Proje güncellenemedi!');
      console.error(err);
    }
  } else {
    // Yeni ekleme
    try {
      const payload = {
        code: project.code,
        name: project.name,
        description: project.description,
        status: project.status === 'Aktif' ? 'ACTIVE' : 'PASSIVE',
        organizationId: project.organizationId,
        startDate: project.startDate ? new Date(project.startDate).toISOString() : null,
        endDate: project.endDate ? new Date(project.endDate).toISOString() : null,
        sla: typeof project.sla === 'number' ? project.sla : 0
      };
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Proje eklenemedi');
      await fetchProjects(); // Listeyi güncelle
    } catch (err) {
      alert('Proje eklenemedi!');
      console.error(err);
    }
  }
  editModalVisible.value = false;
}

function onCloseEditModal() {
  editModalVisible.value = false;
}
</script>
<style scoped>
.panel {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

:global(.dark) .panel {
  background-color: #1b2e4b;
}

.badge-outline-success {
  color: #16a34a;
  border: 1px solid #16a34a;
  background: #f0fdf4;
  border-radius: 0.25rem;
  padding: 0.25em 0.5em;
}
.badge-outline-danger {
  color: #dc2626;
  border: 1px solid #dc2626;
  background: #fef2f2;
  border-radius: 0.25rem;
  padding: 0.25em 0.5em;
}
</style>