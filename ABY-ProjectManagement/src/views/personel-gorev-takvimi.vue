<template>
    <div>
        <div class="panel">
            <div class="mb-5">
                <div class="mb-4 flex items-center sm:flex-row flex-col sm:justify-between justify-center">
                    <div class="sm:mb-0 mb-4">
                        <div class="text-lg font-semibold ltr:sm:text-left rtl:sm:text-right text-center">Personel Görev Takvimi</div>
                        <div class="flex items-center mt-2 flex-wrap sm:justify-start justify-center">
                            <div class="flex items-center ltr:mr-4 rtl:ml-4">
                                <div class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2" style="background-color: rgb(245, 193, 59);"></div>
                                <div>Yurt İçi Görev</div>
                            </div>
                            <div class="flex items-center ltr:mr-4 rtl:ml-4">
                                <div class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2" style="background-color: rgb(239, 68, 68);"></div>
                                <div>Yurt Dışı Görev</div>
                            </div>
                            <div class="flex items-center ltr:mr-4 rtl:ml-4">
                                <div class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2" style="background-color: rgb(34, 197, 94);"></div>
                                <div>Tamamlanan Yurt İçi Görev</div>
                            </div>
                            <div class="flex items-center">
                                <div class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2" style="background-color: rgb(59, 130, 246);"></div>
                                <div>Tamamlanan Yurt Dışı Görev</div>
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button type="button" class="btn btn-outline-primary" @click="goToPersonelGorev">
                            <icon-table class="ltr:mr-2 rtl:ml-2" />
                            Tablo Görünümü
                        </button>
                    </div>
                </div>

                <!-- Filtre Paneli -->
                <div class="panel mb-5">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label class="font-semibold text-sm mb-2 block">Görev Tipi</label>
                            <select v-model="taskTypeFilter" @change="filterEvents" class="form-select">
                                <option value="">Tümü</option>
                                <option value="Yurt İçi">Yurt İçi</option>
                                <option value="Yurt Dışı">Yurt Dışı</option>
                            </select>
                        </div>
                        <div>
                            <label class="font-semibold text-sm mb-2 block">Kategori</label>
                            <select v-model="statusFilter" @change="filterEvents" class="form-select">
                                <option value="">Tümü</option>
                                <option value="Yurt İçi Görev">Yurt İçi Görev</option>
                                <option value="Yurt Dışı Görev">Yurt Dışı Görev</option>
                                <option value="Tamamlanan Yurt İçi Görev">Tamamlanan Yurt İçi Görev</option>
                                <option value="Tamamlanan Yurt Dışı Görev">Tamamlanan Yurt Dışı Görev</option>
                            </select>
                        </div>
                        <div>
                            <label class="font-semibold text-sm mb-2 block">Bölüm</label>
                            <select v-model="departmentFilter" @change="filterEvents" class="form-select">
                                <option value="">Tümü</option>
                                <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="font-semibold text-sm mb-2 block">Personel Ara</label>
                            <input 
                                v-model="personnelSearch" 
                                @input="filterEvents"
                                type="text" 
                                placeholder="İsim veya bölüm ara..." 
                                class="form-input"
                            />
                        </div>
                    </div>
                    <div class="flex justify-between items-center mt-4">
                        <div class="text-sm text-gray-600 dark:text-gray-400">
                            Toplam <span class="font-semibold">{{ filteredTaskCount }}</span> görev gösteriliyor
                        </div>
                        <button @click="clearFilters" class="btn btn-outline-danger btn-sm">
                            <icon-x class="w-4 h-4 mr-2" />
                            Filtreleri Temizle
                        </button>
                    </div>
                </div>

                <div class="calendar-wrapper">
                    <div class="text-center p-4 mb-4">
                        <p class="text-lg font-semibold mb-2">📅 Personel Görev Takvimi</p>
                        <p class="text-gray-600">Toplam {{ allTaskData.length }} görev - {{ filteredTaskCount }} görev gösteriliyor</p>
                    </div>
                    <FullCalendar ref="calendar" :options="calendarOptions" />
                </div>
            </div>
        </div>

        <!-- Görev Detay Modal -->
        <TransitionRoot appear :show="isDetailModal" as="template">
            <Dialog as="div" @close="isDetailModal = false" class="relative z-[51]">
                <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <DialogOverlay class="fixed inset-0 bg-[black]/60" />
                </TransitionChild>

                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center px-4 py-8">
                        <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >
                            <DialogPanel class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-xl text-black dark:text-white-dark bg-white dark:bg-[#0e1726]">
                                <button
                                    type="button"
                                    class="absolute top-2 ltr:right-2 rtl:left-2 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none z-10"
                                    @click="isDetailModal = false"
                                >
                                    <icon-x class="w-4 h-4" />
                                </button>
                                <div class="text-lg font-semibold bg-gray-50 dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px] border-b border-gray-200 dark:border-gray-700">
                                    Görev Detayları
                                </div>
                                <div class="p-5">
                                    <div v-if="selectedTask" class="space-y-4">
                                        <!-- Personel -->
                                        <div class="border-l-4 border-blue-500 pl-4 py-2">
                                            <label class="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Personel</label>
                                            <p class="text-lg font-bold text-gray-900 dark:text-white">{{ selectedTask.extendedProps?.personelAdi }}</p>
                                            <p class="text-sm text-gray-600 dark:text-gray-400">{{ selectedTask.extendedProps?.bolum }}</p>
                                        </div>

                                        <!-- Görev Bilgileri -->
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <!-- Görev Tipi -->
                                            <div class="border-l-4 border-green-500 pl-4 py-2">
                                                <label class="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">Görev Tipi</label>
                                                <div class="mt-2">
                                                    <span 
                                                        class="inline-block px-3 py-1.5 rounded-md text-sm font-medium text-white"
                                                        :style="{
                                                            backgroundColor: 
                                                                selectedTask.extendedProps?.gorevTipi === 'Yurt İçi' 
                                                                    ? (selectedTask.extendedProps?.durum === 'Tamamlandı' ? 'rgb(34, 197, 94)' : 'rgb(245, 193, 59)')
                                                                    : selectedTask.extendedProps?.gorevTipi === 'Yurt Dışı'
                                                                    ? (selectedTask.extendedProps?.durum === 'Tamamlandı' ? 'rgb(59, 130, 246)' : 'rgb(239, 68, 68)')
                                                                    : 'rgb(156, 163, 175)'
                                                        }"
                                                    >
                                                        {{ selectedTask.extendedProps?.gorevTipi }}
                                                    </span>
                                                </div>
                                            </div>

                                            <!-- Durum -->
                                            <div class="border-l-4 border-orange-500 pl-4 py-2">
                                                <label class="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">Durum</label>
                                                <div class="mt-2">
                                                    <span 
                                                        class="inline-block px-3 py-1.5 rounded-md text-sm font-medium"
                                                        :class="{
                                                            'bg-emerald-500 text-white': selectedTask.extendedProps?.durum === 'Aktif',
                                                            'bg-amber-500 text-white': selectedTask.extendedProps?.durum === 'Beklemede',
                                                            'bg-slate-500 text-white': selectedTask.extendedProps?.durum === 'Tamamlandı'
                                                        }"
                                                    >
                                                        {{ selectedTask.extendedProps?.durum }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Tarih Bilgileri -->
                                        <div class="border-l-4 border-purple-500 pl-4 py-2">
                                            <label class="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">Tarih Bilgileri</label>
                                            <div class="grid grid-cols-3 gap-4 mt-2">
                                                <div>
                                                    <p class="text-xs text-gray-500 dark:text-gray-400">Başlangıç</p>
                                                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDate(selectedTask.start) }}</p>
                                                </div>
                                                <div>
                                                    <p class="text-xs text-gray-500 dark:text-gray-400">Bitiş</p>
                                                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDate(selectedTask.end) }}</p>
                                                </div>
                                                <div>
                                                    <p class="text-xs text-gray-500 dark:text-gray-400">Süre</p>
                                                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ calculateTaskDuration(selectedTask) }} Gün</p>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Görev Detayları -->
                                        <div class="border-l-4 border-gray-500 pl-4 py-2">
                                            <label class="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Görev Detayları</label>
                                            <div class="mt-2 space-y-2">
                                                <div>
                                                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">İlgili Proje:</span>
                                                    <span class="text-sm text-gray-900 dark:text-white ml-2">{{ selectedTask.extendedProps?.ilgiliProje || '-' }}</span>
                                                </div>
                                                <div>
                                                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Seyahat Nedeni:</span>
                                                    <span class="text-sm text-gray-900 dark:text-white ml-2">{{ selectedTask.extendedProps?.seyahatNedeni || '-' }}</span>
                                                </div>
                                                <div>
                                                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        {{ selectedTask.extendedProps?.gorevTipi === 'Yurt Dışı' ? 'Gidilen Ülke:' : 'Gidilen İl:' }}
                                                    </span>
                                                    <span class="text-sm text-gray-900 dark:text-white ml-2">{{ selectedTask.extendedProps?.gidilenIl || '-' }}</span>
                                                </div>
                                                <div>
                                                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Taşıt Türü:</span>
                                                    <span class="text-sm text-gray-900 dark:text-white ml-2">{{ selectedTask.extendedProps?.tasitTuru || '-' }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useMeta } from '@/composables/use-meta';
import { useExcel } from '@/composables/use-excel';

import IconTable from '@/components/icon/icon-table.vue';
import IconX from '@/components/icon/icon-x.vue';

useMeta({ title: 'Personel Görev Takvimi' });

const router = useRouter();
const { getTaskTableData } = useExcel();

// State
const calendar: any = ref(null);
const allTaskData = ref<any[]>([]);
const filteredEvents = ref<any[]>([]);
const isDetailModal = ref(false);
const selectedTask = ref<any>(null);

// Filtreler
const taskTypeFilter = ref('');
const statusFilter = ref('');
const departmentFilter = ref('');
const personnelSearch = ref('');

// Computed
const departments = computed(() => {
    const depts = new Set<string>();
    allTaskData.value.forEach(task => {
        if (task['Bölüm']) {
            depts.add(task['Bölüm']);
        }
    });
    return Array.from(depts).sort();
});

const filteredTaskCount = computed(() => filteredEvents.value.length);

    const calendarOptions = computed(() => {
        return {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
            locale: 'tr', // Türkçe dil desteği
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
            },
            buttonText: {
                today: 'Bugün',
                month: 'Ay',
                week: 'Hafta',
                day: 'Gün'
            },
            dayHeaderFormat: {
                weekday: 'long'
            },
            height: 'auto',
            editable: false,
            dayMaxEvents: 3,
            selectable: false,
            droppable: false,
            eventClick: (info: any) => {
                showTaskDetail(info.event);
            },
            events: filteredEvents.value,
            eventDisplay: 'block',
            eventTextColor: '#ffffff',
            displayEventTime: false,
            // Hafta ve gün görünümü için özel ayarlar
            slotMinTime: '08:00:00',
            slotMaxTime: '18:00:00',
            allDaySlot: true,
            allDayText: 'Tüm Gün',
            eventDidMount: (info: any) => {
                // Hafta ve gün görünümlerinde daha kısa başlık göster
                const view = info.view.type;
                if (view === 'timeGridWeek' || view === 'timeGridDay') {
                    const personelAdi = info.event.extendedProps.personelAdi;
                    const gorevTipi = info.event.extendedProps.gorevTipi;
                    info.el.querySelector('.fc-event-title').innerText = `${personelAdi} (${gorevTipi})`;
                }
            },
            eventClassNames: (arg: any) => {
                // Görünüm tipine göre class ekle
                const view = arg.view.type;
                if (view === 'timeGridWeek' || view === 'timeGridDay') {
                    return ['time-grid-event'];
                }
                return [];
            }
        };
    });

// Methods
const loadTaskData = async () => {
    try {
        console.log('🔄 Personel görev verileri yükleniyor...');
        
        // Gerçek veriyi personel-gorev.vue'dan çek
        const result = await getTaskTableData();
        allTaskData.value = result.data;
        
        console.log('✅ Gerçek veriler yüklendi:', allTaskData.value.length, 'görev');
        console.log('Örnek veri:', allTaskData.value[0]);
        
        convertTasksToEvents();
        filterEvents();
        
    } catch (error) {
        console.error('❌ Görev verileri yüklenirken hata oluştu:', error);
        console.log('📝 Test verileri kullanılıyor...');
        
        // Hata durumunda test verisi kullan
        const testData = [
            {
                'İsim': 'Ahmet Demir',
                'Bölüm': 'Yazılım Geliştirme',
                'Görev Tipi': 'Yurt İçi',
                'Durum': 'Aktif',
                'Görev Başlangıç Tarihi': '2025-07-28',
                'Görev Bitiş Tarihi': '2025-07-30',
                'PYP Tanımı': 'Sistem analizi ve geliştirme',
                'Seyahat Nedeni Tanımı': 'İş görüşmesi',
                'Gidilen İl': 'Ankara',
                'Taşıt türü Tanımı': 'Uçak'
            },
            {
                'İsim': 'Ayşe Yılmaz',
                'Bölüm': 'Pazarlama',
                'Görev Tipi': 'Yurt Dışı',
                'Durum': 'Aktif',
                'Görev Başlangıç Tarihi': '2025-08-01',
                'Görev Bitiş Tarihi': '2025-08-05',
                'PYP Tanımı': 'Uluslararası fuara katılım',
                'Seyahat Nedeni Tanımı': 'Fuar katılımı',
                'Gidilen İl': 'Berlin',
                'Taşıt türü Tanımı': 'Uçak'
            },
            {
                'İsim': 'Mehmet Öz',
                'Bölüm': 'Satış',
                'Görev Tipi': 'Yurt İçi',
                'Durum': 'Beklemede',
                'Görev Başlangıç Tarihi': '2025-08-03',
                'Görev Bitiş Tarihi': '2025-08-05',
                'PYP Tanımı': 'Müşteri ziyareti',
                'Seyahat Nedeni Tanımı': 'Satış görüşmesi',
                'Gidilen İl': 'İzmir',
                'Taşıt türü Tanımı': 'Araba'
            }
        ];
        
        allTaskData.value = testData;
        convertTasksToEvents();
        filterEvents();
    }
};

const convertTasksToEvents = () => {
    const events: any[] = [];
    
    allTaskData.value.forEach((task, index) => {
        // Tarih formatını kontrol et ve dönüştür
        const startDate = parseDate(task['Görev Başlangıç Tarihi']);
        const endDate = parseDate(task['Görev Bitiş Tarihi']);
        
        console.log(`Görev ${index}:`, {
            isim: task['İsim'],
            baslangic: task['Görev Başlangıç Tarihi'],
            bitis: task['Görev Bitiş Tarihi'],
            parsedStart: startDate,
            parsedEnd: endDate
        });
        
        if (startDate) {
            // Etkinlik Başlığı: Bölüm ve İsim
            const personelAdi = task['İsim'] || 'Bilinmiyor';
            const bolum = task['Bölüm'] || '';
            const title = bolum ? `${bolum} - ${personelAdi}` : personelAdi;
            
            // Etkinlik Açıklaması: İlgili Proje + Seyahat Nedeni Tanımı + Gidilen İl/Ülke + Taşıt türü Tanımı
            const ilgiliProje = task['İlgili Proje'] || task['Proje Adı'] || task['PYP Tanımı'] || '';
            const seyahatNedeni = task['Seyahat Nedeni Tanımı'] || '';
            // Yurt içi için 'Gidilen İl', yurt dışı için 'Gidilen Ülke' alanını kontrol et
            const gidilenIl = task['Gidilen İl'] || task['Gidilen Ülke'] || '';
            const tasitTuru = task['Taşıt türü Tanımı'] || '';
            
            const description = [ilgiliProje, seyahatNedeni, gidilenIl, tasitTuru]
                .filter(item => item && item.trim())
                .join(' + ');
            
            // Kategori: Görev Tipi (İş alanı = Yurt İçi, Kişisel alan = Yurt Dışı)
            const gorevTipi = task['Görev Tipi'] || '';
            const durum = task['Durum'] || 'Aktif';
            
            let className = '';
            let backgroundColor = '';
            let borderColor = '';
            
            if (gorevTipi === 'Yurt İçi') {
                if (durum === 'Tamamlandı') {
                    // Tamamlanan Yurt İçi Görev - Yeşil
                    className = 'completed-domestic';
                    backgroundColor = 'rgb(34, 197, 94)';
                    borderColor = 'rgb(34, 197, 94)';
                } else {
                    // Yurt İçi Görev - Sarı
                    className = 'domestic';
                    backgroundColor = 'rgb(245, 193, 59)';
                    borderColor = 'rgb(245, 193, 59)';
                }
            } else if (gorevTipi === 'Yurt Dışı') {
                if (durum === 'Tamamlandı') {
                    // Tamamlanan Yurt Dışı Görev - Mavi
                    className = 'completed-foreign';
                    backgroundColor = 'rgb(59, 130, 246)';
                    borderColor = 'rgb(59, 130, 246)';
                } else {
                    // Yurt Dışı Görev - Kırmızı
                    className = 'foreign';
                    backgroundColor = 'rgb(239, 68, 68)';
                    borderColor = 'rgb(239, 68, 68)';
                }
            } else {
                className = 'other';
                backgroundColor = 'rgb(156, 163, 175)';
                borderColor = 'rgb(156, 163, 175)';
            }
            
            const eventData = {
                id: `task-${index}`,
                title: title,
                start: startDate,
                end: endDate || startDate, // Bitiş tarihi yoksa başlangıç tarihini kullan
                allDay: true, // Tüm gün etkinliği olarak ayarla
                className: className,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                textColor: 'white',
                extendedProps: {
                    description: description,
                    gorevTipi: gorevTipi,
                    durum: durum,
                    personelAdi: personelAdi,
                    bolum: bolum,
                    ilgiliProje: ilgiliProje,
                    seyahatNedeni: seyahatNedeni,
                    gidilenIl: gidilenIl, // Bu artık hem İl hem Ülke içerebilir
                    tasitTuru: tasitTuru,
                    originalData: task
                }
            };
            
            console.log(`Event ${index} oluşturuluyor:`, {
                title,
                gorevTipi,
                durum,
                className,
                start: startDate,
                end: endDate
            });
            
            events.push(eventData);
        }
    });
    
    filteredEvents.value = events;
    console.log('Dönüştürülen event sayısı:', events.length);
    console.log('İlk 3 event örneği:', events.slice(0, 3));
};

const parseDate = (dateStr: any): string | null => {
    if (!dateStr) return null;
    
    try {
        let date: Date;
        
        if (typeof dateStr === 'number') {
            // Excel serial date (1900 tarih sistemi)
            // Excel'de 1 = 1900-01-01, ancak JavaScript'te farklı hesaplama
            if (dateStr > 25569) { // 1970-01-01'den sonrası için
                date = new Date((dateStr - 25569) * 86400 * 1000);
            } else {
                // 1900 tarih sistemi için manuel hesaplama
                const excelEpoch = new Date(1900, 0, 1); // 1900-01-01
                date = new Date(excelEpoch.getTime() + (dateStr - 1) * 86400 * 1000);
            }
        } else if (typeof dateStr === 'string') {
            // String formatında tarih
            const cleanStr = dateStr.toString().trim();
            
            if (cleanStr.includes('.')) {
                // DD.MM.YYYY formatı
                const parts = cleanStr.split('.');
                if (parts.length === 3) {
                    const day = parseInt(parts[0]);
                    const month = parseInt(parts[1]) - 1; // Ay 0-indexed
                    const year = parseInt(parts[2]);
                    if (year > 1900 && month >= 0 && month <= 11 && day >= 1 && day <= 31) {
                        date = new Date(year, month, day);
                    } else {
                        return null;
                    }
                } else {
                    date = new Date(cleanStr);
                }
            } else if (cleanStr.includes('/')) {
                // DD/MM/YYYY veya MM/DD/YYYY formatı
                const parts = cleanStr.split('/');
                if (parts.length === 3) {
                    // Türkiye formatı DD/MM/YYYY olarak kabul et
                    const day = parseInt(parts[0]);
                    const month = parseInt(parts[1]) - 1; // Ay 0-indexed
                    const year = parseInt(parts[2]);
                    if (year > 1900 && month >= 0 && month <= 11 && day >= 1 && day <= 31) {
                        date = new Date(year, month, day);
                    } else {
                        return null;
                    }
                } else {
                    date = new Date(cleanStr);
                }
            } else if (cleanStr.includes('-')) {
                // YYYY-MM-DD veya DD-MM-YYYY formatı
                const parts = cleanStr.split('-');
                if (parts.length === 3) {
                    if (parts[0].length === 4) {
                        // YYYY-MM-DD formatı
                        date = new Date(cleanStr);
                    } else {
                        // DD-MM-YYYY formatı
                        const day = parseInt(parts[0]);
                        const month = parseInt(parts[1]) - 1;
                        const year = parseInt(parts[2]);
                        if (year > 1900 && month >= 0 && month <= 11 && day >= 1 && day <= 31) {
                            date = new Date(year, month, day);
                        } else {
                            return null;
                        }
                    }
                } else {
                    date = new Date(cleanStr);
                }
            } else {
                date = new Date(cleanStr);
            }
        } else if (dateStr instanceof Date) {
            date = dateStr;
        } else {
            return null;
        }
        
        if (isNaN(date.getTime())) {
            console.warn('Geçersiz tarih:', dateStr, 'Tip:', typeof dateStr);
            return null;
        }
        
        // YYYY-MM-DD formatında döndür
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
        
    } catch (error) {
        console.error('Tarih parse hatası:', error, 'Değer:', dateStr, 'Tip:', typeof dateStr);
        return null;
    }
};

const filterEvents = () => {
    let filtered = [...allTaskData.value];
    
    // Görev tipi filtresi
    if (taskTypeFilter.value) {
        filtered = filtered.filter(task => task['Görev Tipi'] === taskTypeFilter.value);
    }
    
    // Kategori filtresi (Yeni mantık)
    if (statusFilter.value) {
        filtered = filtered.filter(task => {
            const gorevTipi = task['Görev Tipi'] || '';
            const durum = task['Durum'] || 'Aktif';
            
            if (statusFilter.value === 'Yurt İçi Görev') {
                return gorevTipi === 'Yurt İçi' && durum !== 'Tamamlandı';
            } else if (statusFilter.value === 'Yurt Dışı Görev') {
                return gorevTipi === 'Yurt Dışı' && durum !== 'Tamamlandı';
            } else if (statusFilter.value === 'Tamamlanan Yurt İçi Görev') {
                return gorevTipi === 'Yurt İçi' && durum === 'Tamamlandı';
            } else if (statusFilter.value === 'Tamamlanan Yurt Dışı Görev') {
                return gorevTipi === 'Yurt Dışı' && durum === 'Tamamlandı';
            }
            return true;
        });
    }
    
    // Bölüm filtresi
    if (departmentFilter.value) {
        filtered = filtered.filter(task => task['Bölüm'] === departmentFilter.value);
    }
    
    // Personel arama (büyük küçük harf duyarlı)
    if (personnelSearch.value) {
        const searchTerm = personnelSearch.value; // toLowerCase() kaldırıldı
        filtered = filtered.filter(task => {
            const name = task['İsim'] || '';
            const dept = task['Bölüm'] || '';
            return name.includes(searchTerm) || dept.includes(searchTerm);
        });
    }
    
    // Filtrelenmiş verileri events'e dönüştür
    const events: any[] = [];
    
    filtered.forEach((task, index) => {
        const startDate = parseDate(task['Görev Başlangıç Tarihi']);
        const endDate = parseDate(task['Görev Bitiş Tarihi']);
        
        if (startDate) {
            const personelAdi = task['İsim'] || 'Bilinmiyor';
            const bolum = task['Bölüm'] || '';
            const title = bolum ? `${bolum} - ${personelAdi}` : personelAdi;
            
            const ilgiliProje = task['İlgili Proje'] || task['Proje Adı'] || task['PYP Tanımı'] || '';
            const seyahatNedeni = task['Seyahat Nedeni Tanımı'] || '';
            // Yurt içi için 'Gidilen İl', yurt dışı için 'Gidilen Ülke' alanını kontrol et
            const gidilenIl = task['Gidilen İl'] || task['Gidilen Ülke'] || '';
            const tasitTuru = task['Taşıt türü Tanımı'] || '';
            
            const description = [ilgiliProje, seyahatNedeni, gidilenIl, tasitTuru]
                .filter(item => item && item.trim())
                .join(' + ');
            
            const gorevTipi = task['Görev Tipi'] || '';
            const durum = task['Durum'] || 'Aktif';
            
            let className = '';
            let backgroundColor = '';
            let borderColor = '';
            
            if (gorevTipi === 'Yurt İçi') {
                if (durum === 'Tamamlandı') {
                    // Tamamlanan Yurt İçi Görev - Yeşil
                    className = 'completed-domestic';
                    backgroundColor = 'rgb(34, 197, 94)';
                    borderColor = 'rgb(34, 197, 94)';
                } else {
                    // Yurt İçi Görev - Sarı
                    className = 'domestic';
                    backgroundColor = 'rgb(245, 193, 59)';
                    borderColor = 'rgb(245, 193, 59)';
                }
            } else if (gorevTipi === 'Yurt Dışı') {
                if (durum === 'Tamamlandı') {
                    // Tamamlanan Yurt Dışı Görev - Mavi
                    className = 'completed-foreign';
                    backgroundColor = 'rgb(59, 130, 246)';
                    borderColor = 'rgb(59, 130, 246)';
                } else {
                    // Yurt Dışı Görev - Kırmızı
                    className = 'foreign';
                    backgroundColor = 'rgb(239, 68, 68)';
                    borderColor = 'rgb(239, 68, 68)';
                }
            } else {
                className = 'other';
                backgroundColor = 'rgb(156, 163, 175)';
                borderColor = 'rgb(156, 163, 175)';
            }
            
            events.push({
                id: `filtered-task-${index}`,
                title: title,
                start: startDate,
                end: endDate || startDate,
                allDay: true,
                className: className,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                textColor: 'white',
                extendedProps: {
                    description: description,
                    gorevTipi: gorevTipi,
                    durum: durum,
                    personelAdi: personelAdi,
                    bolum: bolum,
                    ilgiliProje: ilgiliProje,
                    seyahatNedeni: seyahatNedeni,
                    gidilenIl: gidilenIl, // Bu artık hem İl hem Ülke içerebilir
                    tasitTuru: tasitTuru,
                    originalData: task
                }
            });
            
            console.log(`Filtered Event ${index}:`, {
                title,
                gorevTipi,
                durum,
                className
            });
        }
    });
    
    filteredEvents.value = events;
    
    // Calendar'ı güncelle
    if (calendar.value) {
        calendar.value.getApi().refetchEvents();
    }
};

const showTaskDetail = (event: any) => {
    selectedTask.value = event;
    isDetailModal.value = true;
};

const formatDate = (dateStr: string): string => {
    if (!dateStr) return '-';
    
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const calculateTaskDuration = (task: any): string => {
    if (!task || !task.start || !task.end) return '-';
    
    const startDate = new Date(task.start);
    const endDate = new Date(task.end);
    
    // Milisaniye farkını hesapla ve güne çevir
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays.toString();
};

const clearFilters = () => {
    taskTypeFilter.value = '';
    statusFilter.value = '';
    departmentFilter.value = '';
    personnelSearch.value = '';
    filterEvents();
};

const goToPersonelGorev = () => {
    router.push('/personel-gorev');
};

// Lifecycle
onMounted(async () => {
    console.log('🔄 Component mounted, veri yükleniyor...');
    try {
        await loadTaskData();
        console.log('✅ Veri yükleme tamamlandı');
    } catch (error) {
        console.error('❌ Veri yükleme hatası:', error);
    }
});
</script>

<style scoped>
/* Calendar Styles */
.calendar-wrapper .fc-view-harness {
  overflow: auto;
}

.calendar-wrapper .fc-view-harness-active > .fc-view {
  min-width: 450px;
}

.calendar-wrapper .fc-daygrid-body-balanced .fc-scrollgrid-sync-table {
  min-height: 450px;
}

.calendar-wrapper table th.fc-day {
  padding: 12px 16px;
  background-color: rgb(224 230 237 / 0.3);
}

.dark .calendar-wrapper table th.fc-day {
  background-color: #1a2941;
}

.calendar-wrapper table td .fc-daygrid-day-number {
  padding: 16px;
}

@media only screen and (max-width: 1024px) {
  .calendar-wrapper table td .fc-daygrid-day-number {
    padding: 2px 8px;
  }
}

.fc-theme-standard td,
.fc-theme-standard th,
.fc-theme-standard .fc-scrollgrid {
  border-color: rgb(224 230 237 / 0.4) !important;
}

.dark .fc-theme-standard td,
.dark .fc-theme-standard th,
.dark .fc-theme-standard .fc-scrollgrid {
  border-color: #191e3a !important;
}

.calendar-wrapper .fc-theme-standard .fc-scrollgrid {
  border-radius: 10px;
}

.calendar-wrapper .fc-button {
  text-transform: capitalize !important;
  font-weight: 500 !important;
  border-radius: 6px !important;
  padding: 8px 15px !important;
}

.calendar-wrapper .fc-button-primary,
.calendar-wrapper .fc-button-primary:disabled {
  color: #4361ee !important;
  border-color: #4361ee !important;
  background: transparent !important;
  box-shadow: none !important;
  font-weight: 600 !important;
  line-height: 20px !important;
}

.calendar-wrapper .fc-button-primary:not(:disabled):hover,
.calendar-wrapper .fc-button-primary:not(:disabled).fc-button-active {
  background-color: #4361ee !important;
  color: white !important;
}

/* Event Colors - İş/Kişisel Ayrımı */
.calendar-wrapper .fc-daygrid-event.primary,
.calendar-wrapper .fc-timegrid-event.primary {
  background-color: rgb(67 97 238 / 0.9);
  border-color: rgb(67 97 238);
}

.calendar-wrapper .fc-daygrid-event.success,
.calendar-wrapper .fc-timegrid-event.success {
  background-color: rgb(34 197 94 / 0.9);
  border-color: rgb(34 197 94);
}

.calendar-wrapper .fc-daygrid-event.warning,
.calendar-wrapper .fc-timegrid-event.warning {
  background-color: rgb(245 158 11 / 0.9);
  border-color: rgb(245 158 11);
}

.calendar-wrapper .fc-daygrid-event.secondary,
.calendar-wrapper .fc-timegrid-event.secondary {
  background-color: rgb(107 114 128 / 0.9);
  border-color: rgb(107 114 128);
}

.calendar-wrapper .fc-daygrid-event.info,
.calendar-wrapper .fc-timegrid-event.info {
  background-color: rgb(33 150 243 / 0.9);
  border-color: rgb(33 150 243);
}

/* Badge Colors */
.bg-primary {
    background-color: rgb(67 97 238);
    color: white;
}

.bg-success {
    background-color: rgb(34 197 94);
    color: white;
}

.bg-warning {
    background-color: rgb(245 158 11);
    color: white;
}

.bg-secondary {
    background-color: rgb(107 114 128);
    color: white;
}

.bg-info {
    background-color: rgb(33 150 243);
    color: white;
}

/* Navigation Buttons */
.calendar-wrapper .fc-prev-button,
.calendar-wrapper .fc-next-button {
  background-color: transparent !important;
  color: rgb(75, 85, 99) !important;
  border: 2px solid !important;
  border-color: rgb(229, 231, 235) !important;
  padding: 6px !important;
  display: flex !important;
  justify-content: center;
}

.dark .calendar-wrapper .fc-prev-button,
.dark .calendar-wrapper .fc-next-button {
  border-color: rgb(55, 65, 81) !important;
}

.calendar-wrapper .fc-toolbar-title {
  font-size: 20px;
}

.calendar-wrapper .fc-event {
  padding: 2px 4px;
  color: white;
}

.calendar-wrapper .fc-event-title.fc-sticky {
  font-weight: 700;
}

@media only screen and (max-width: 768px) {
  .calendar-wrapper .fc-toolbar {
    flex-direction: column !important;
  }

  .calendar-wrapper .fc-toolbar .fc-toolbar-chunk {
    margin-top: 16px;
  }

  .calendar-wrapper .fc-toolbar .fc-toolbar-chunk:first-child {
    margin-top: 0px !important;
  }
}

/* Hafta ve Gün Görünümü İyileştirmeleri */
.calendar-wrapper .fc-timegrid {
  background-color: #f8fafc;
}

.dark .calendar-wrapper .fc-timegrid {
  background-color: #1a2941;
}

/* All-day alanını daha belirgin yap */
.calendar-wrapper .fc-timegrid .fc-daygrid-body {
  background-color: #f1f5f9;
  border-bottom: 2px solid #e2e8f0;
}

.dark .calendar-wrapper .fc-timegrid .fc-daygrid-body {
  background-color: #2d3748;
  border-bottom: 2px solid #4a5568;
}

/* All-day etkinlikleri daha büyük yap */
.calendar-wrapper .fc-timegrid .fc-daygrid-event {
  padding: 4px 6px !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  border-radius: 4px !important;
  min-height: 28px !important;
}

/* Hafta/gün görünümünde etkinlik başlıkları */
.calendar-wrapper .time-grid-event .fc-event-title {
  font-size: 11px !important;
  font-weight: 600 !important;
  line-height: 1.2 !important;
}

/* All-day slot başlığını stilize et */
.calendar-wrapper .fc-timegrid .fc-col-header-cell {
  background-color: #e2e8f0;
  font-weight: 600;
  padding: 8px 4px;
}

.dark .calendar-wrapper .fc-timegrid .fc-col-header-cell {
  background-color: #4a5568;
}

/* All-day text */
.calendar-wrapper .fc-timegrid .fc-daygrid-day-top {
  background-color: #cbd5e0;
  font-weight: 600;
  font-size: 11px;
  text-align: center;
  padding: 4px;
}

.dark .calendar-wrapper .fc-timegrid .fc-daygrid-day-top {
  background-color: #718096;
}

/* Zaman slotlarını daha açık renk yap */
.calendar-wrapper .fc-timegrid-slot {
  height: 30px;
}

.calendar-wrapper .fc-timegrid-slot:hover {
  background-color: #f7fafc;
}

.dark .calendar-wrapper .fc-timegrid-slot:hover {
  background-color: #2d3748;
}
</style>
