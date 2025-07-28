<template>
    <div>
        <div class="panel">
            <div class="mb-5">
                <div class="mb-4 flex items-center sm:flex-row flex-col sm:justify-between justify-center">
                    <div class="sm:mb-0 mb-4">
                        <div class="text-lg font-semibold ltr:sm:text-left rtl:sm:text-right text-center">Takvim</div>
                        <div class="flex items-center mt-2 flex-wrap sm:justify-start justify-center">
                            <div class="flex items-center ltr:mr-4 rtl:ml-4">
                                <div class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-primary"></div>
                                <div>İş</div>
                            </div>
                            <div class="flex items-center ltr:mr-4 rtl:ml-4">
                                <div class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-info"></div>
                                <div>Seyahat</div>
                            </div>
                            <div class="flex items-center ltr:mr-4 rtl:ml-4">
                                <div class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-success"></div>
                                <div>Kişisel</div>
                            </div>
                            <div class="flex items-center">
                                <div class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-danger"></div>
                                <div>Önemli</div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <div v-if="isLoading" class="flex items-center text-primary">
                            <div class="animate-spin border-2 border-current border-r-transparent rounded-full w-4 h-4 mr-2"></div>
                            Excel'den veriler yükleniyor...
                        </div>
                        <button type="button" class="btn btn-primary" @click="editEvent()" :disabled="isLoading">
                            <icon-plus class="ltr:mr-2 rtl:ml-2" />
                            Etkinlik Oluştur
                        </button>
                    </div>
                </div>
                <div class="calendar-wrapper">
                    <FullCalendar ref="calendar" :options="calendarOptions">
                        <template v-slot:eventContent="arg">
                            <div class="fc-event-main-frame flex items-center px-1 py-0.5 text-white">
                                <div class="fc-event-time font-semibold px-0.5">
                                    {{ arg.timeText }}
                                </div>
                                <div class="fc-event-title-container">
                                    <div class="fc-event-title fc-sticky !font-medium px-0.5">
                                        {{ arg.event.title }}
                                    </div>
                                </div>
                            </div>
                        </template>
                    </FullCalendar>
                </div>
            </div>
        </div>
        <!-- add event modal -->
        <TransitionRoot appear :show="isAddEventModal" as="template">
            <Dialog as="div" @close="isAddEventModal = false" class="relative z-[51]">
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
                            <DialogPanel class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                <button
                                    type="button"
                                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    @click="isAddEventModal = false"
                                >
                                    <icon-x />
                                </button>
                                <div class="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                    {{ params.id ? 'Etkinlik Düzenle' : 'Etkinlik Ekle' }}
                                </div>
                                <div class="p-5">
                                    <form @submit.prevent="saveEvent">
                                        <div class="mb-5">
                                            <label for="title">Etkinlik Başlığı :</label>
                                            <input
                                                id="title"
                                                type="text"
                                                name="title"
                                                class="form-input"
                                                placeholder="Etkinlik Başlığını Girin"
                                                v-model="params.title"
                                                required
                                            />
                                            <div class="text-danger mt-2" id="titleErr"></div>
                                        </div>

                                        <div class="mb-5">
                                            <label for="dateStart">Başlangıç :</label>
                                            <input
                                                id="dateStart"
                                                type="datetime-local"
                                                name="start"
                                                class="form-input"
                                                placeholder="Etkinlik Başlangıç Tarihi"
                                                v-model="params.start"
                                                :min="minStartDate"
                                                @change="startDateChange($event)"
                                                required
                                            />
                                            <div class="text-danger mt-2" id="startDateErr"></div>
                                        </div>
                                        <div class="mb-5">
                                            <label for="dateEnd">Bitiş :</label>
                                            <input
                                                id="dateEnd"
                                                type="datetime-local"
                                                name="end"
                                                class="form-input"
                                                placeholder="Etkinlik Bitiş Tarihi"
                                                v-model="params.end"
                                                :min="minEndDate"
                                                required
                                            />
                                            <div class="text-danger mt-2" id="endDateErr"></div>
                                        </div>
                                        <div class="mb-5">
                                            <label for="description">Etkinlik Açıklaması :</label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                class="form-textarea min-h-[130px]"
                                                placeholder="Etkinlik Açıklamasını Girin"
                                                v-model="params.description"
                                            ></textarea>
                                        </div>
                                        <div class="mb-5">
                                            <label>Kategori:</label>
                                            <div class="mt-3">
                                                <label class="inline-flex cursor-pointer ltr:mr-3 rtl:ml-3">
                                                    <input type="radio" class="form-radio" name="badge" value="primary" v-model="params.type" />
                                                    <span class="ltr:pl-2 rtl:pr-2">İş</span>
                                                </label>
                                                <label class="inline-flex cursor-pointer ltr:mr-3 rtl:ml-3">
                                                    <input type="radio" class="form-radio text-info" name="badge" value="info" v-model="params.type" />
                                                    <span class="ltr:pl-2 rtl:pr-2">Seyahat</span>
                                                </label>
                                                <label class="inline-flex cursor-pointer ltr:mr-3 rtl:ml-3">
                                                    <input type="radio" class="form-radio text-success" name="badge" value="success" v-model="params.type" />
                                                    <span class="ltr:pl-2 rtl:pr-2">Kişisel</span>
                                                </label>
                                                <label class="inline-flex cursor-pointer">
                                                    <input type="radio" class="form-radio text-danger" name="badge" value="danger" v-model="params.type" />
                                                    <span class="ltr:pl-2 rtl:pr-2">Önemli</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="flex justify-end items-center mt-8">
                                            <button type="button" class="btn btn-outline-danger" @click="isAddEventModal = false" :disabled="isLoading">İptal</button>
                                            <button v-if="params.id" type="button" class="btn btn-outline-warning ltr:ml-4 rtl:mr-4" @click="deleteEvent()" :disabled="isLoading">
                                                <div v-if="isLoading" class="animate-spin border-2 border-current border-r-transparent rounded-full w-4 h-4 mr-2 inline-block"></div>
                                                Sil
                                            </button>
                                            <button type="submit" class="btn btn-primary ltr:ml-4 rtl:mr-4" :disabled="isLoading">
                                                <div v-if="isLoading" class="animate-spin border-2 border-current border-r-transparent rounded-full w-4 h-4 mr-2 inline-block"></div>
                                                {{ params.id ? 'Etkinliği Güncelle' : 'Etkinlik Oluştur' }}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>
<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import FullCalendar from '@fullcalendar/vue3';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';
    import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
    import Swal from 'sweetalert2';
    import { useMeta } from '@/composables/use-meta';
    import { useExcel, type CalendarEvent } from '@/composables/use-excel';

    // Excel composable'ını kullan
    const { getCalendarEvents, saveCalendarEvent, updateCalendarEvent, deleteCalendarEvent, initializeCalendarExcel } = useExcel();

    const defaultParams = ref({
        id: null,
        title: '',
        start: '',
        end: '',
        description: '',
        type: 'primary',
    });
    const params = ref({
        id: null,
        title: '',
        start: '',
        end: '',
        description: '',
        type: 'primary',
    });
    const isAddEventModal = ref(false);
    const minStartDate: any = ref('');
    const minEndDate: any = ref('');
    const calendar: any = ref(null);
    const now = new Date();
    const events: any = ref([]);
    const isLoading = ref(false);
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
                day: 'Gün',
                list: 'Liste'
            },
            dayHeaderFormat: { 
                weekday: 'long' // Gün isimlerini tam olarak göster
            },
            eventTimeFormat: { // Zaman formatını düzelt
                hour: '2-digit',
                minute: '2-digit',
                hour12: false // 24 saat formatı kullan
            },
            slotLabelFormat: { // Zaman slotları formatı
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            },
            // Türkçe gün isimleri
            dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
            dayNamesShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
            // Türkçe ay isimleri
            monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
            monthNamesShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
            // Türkçe UI metinleri
            allDayText: 'Tüm gün',
            moreLinkText: function(num) {
                return '+' + num + ' etkinlik';
            },
            noEventsText: 'Gösterilecek etkinlik yok',
            titleFormat: { 
                year: 'numeric', 
                month: 'long' 
            },
            // Türkçe tarih formatı
            weekText: 'Hafta',
            weekTextLong: 'Hafta',
            closeHint: 'Kapat',
            timeHint: 'Zaman',
            eventHint: 'Etkinlik',
            height: 'auto',
            editable: true,
            dayMaxEvents: true,
            selectable: true,
            droppable: true,
            eventClick: (event: any) => {
                editEvent(event);
            },
            select: (event: any) => {
                editDate(event);
            },
            events: events.value, // Bu reactive olacak çünkü computed içinde
        };
    });

    onMounted(async () => {
        await loadEvents();
    });

    // Excel'den eventleri yükle
    const loadEvents = async () => {
        try {
            isLoading.value = true;
            console.log('=== CALENDAR LOAD EVENTS BAŞLADI ===');
            console.log('Excel\'den calendar eventleri yükleniyor...');
            
            // Excel'i initialize et
            console.log('Excel initialize ediliyor...');
            await initializeCalendarExcel();
            console.log('Excel initialize edildi');
            
            // Eventleri yükle
            console.log('Calendar events yükleniyor...');
            const calendarEvents = await getCalendarEvents();
            console.log('Yüklenen calendar events:', calendarEvents);
            
            // FullCalendar formatına çevir
            events.value = calendarEvents.map(event => {
                // Tarihleri düzgün formatta parse et
                let startDate = event.start;
                let endDate = event.end;
                
                // Eğer tarih string formatında ise, doğru formata çevir
                if (typeof startDate === 'string' && startDate) {
                    // ISO 8601 formatında değilse düzelt
                    if (!startDate.includes('T')) {
                        startDate = startDate + 'T00:00:00';
                    }
                }
                
                if (typeof endDate === 'string' && endDate) {
                    // ISO 8601 formatında değilse düzelt
                    if (!endDate.includes('T')) {
                        endDate = endDate + 'T23:59:59';
                    }
                }
                
                return {
                    id: event.id,
                    title: event.title,
                    start: startDate,
                    end: endDate,
                    className: event.className,
                    description: event.description,
                    extendedProps: {
                        description: event.description,
                        createdAt: event.createdAt,
                        updatedAt: event.updatedAt
                    }
                };
            });
            
            console.log('Calendar events vue events\'e aktarıldı:', events.value.length);
            console.log('Vue events:', events.value);
            
            // Events reactive olduğu için otomatik güncellenecek, refetchEvents gerekmez
            
        } catch (error) {
            console.error('Calendar events yüklenirken hata:', error);
            showMessage('Calendar events yüklenirken hata oluştu!', 'error');
        } finally {
            isLoading.value = false;
            console.log('=== CALENDAR LOAD EVENTS BİTTİ ===');
        }
    };

    const getMonth = (dt: Date, add: number = 0) => {
        let month = dt.getMonth() + 1 + add;
        const str = (month < 10 ? '0' + month : month).toString();
        return str;
    };

    const editEvent = (data: any = null) => {
        params.value = JSON.parse(JSON.stringify(defaultParams.value));
        if (data) {
            let obj = JSON.parse(JSON.stringify(data.event));
            params.value = {
                id: obj.id ? obj.id : null,
                title: obj.title ? obj.title : null,
                start: dateFormat(obj.start),
                end: dateFormat(obj.end),
                type: obj.classNames ? obj.classNames[0] : 'primary',
                description: obj.extendedProps ? obj.extendedProps.description : '',
            };
            minStartDate.value = dateFormat(new Date());
            minEndDate.value = dateFormat(obj.start);
        } else {
            minStartDate.value = dateFormat(new Date());
            minEndDate.value = dateFormat(new Date());
        }

        isAddEventModal.value = true;
    };

    const editDate = (data: any) => {
        let obj = {
            event: {
                start: data.start,
                end: data.end,
            },
        };
        editEvent(obj);
    };

    const dateFormat = (dt: any) => {
        dt = new Date(dt);
        const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
        const date = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
        const hours = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
        const mins = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
        dt = dt.getFullYear() + '-' + month + '-' + date + 'T' + hours + ':' + mins;
        return dt;
    };

    const saveEvent = async () => {
        if (!params.value.title) {
            showMessage('Etkinlik başlığı gereklidir!', 'error');
            return;
        }
        if (!params.value.start) {
            showMessage('Başlangıç tarihi gereklidir!', 'error');
            return;
        }
        if (!params.value.end) {
            showMessage('Bitiş tarihi gereklidir!', 'error');
            return;
        }

        try {
            isLoading.value = true;
            console.log('=== SAVE EVENT BAŞLADI ===');
            console.log('Parametreler:', params.value);

            if (params.value.id) {
                // Güncelle
                console.log('Event güncelleniyor:', params.value.id);
                await updateCalendarEvent(params.value.id, {
                    title: params.value.title,
                    start: params.value.start,
                    end: params.value.end,
                    className: params.value.type,
                    description: params.value.description
                });

                showMessage('Etkinlik başarıyla güncellendi.');
            } else {
                // Yeni ekle
                console.log('Yeni event ekleniyor...');
                const eventData = {
                    title: params.value.title,
                    start: params.value.start,
                    end: params.value.end,
                    className: params.value.type,
                    description: params.value.description
                };
                console.log('API\'ye gönderilecek data:', eventData);
                
                const newEvent = await saveCalendarEvent(eventData);
                console.log('API\'den dönen sonuç:', newEvent);

                showMessage('Etkinlik başarıyla oluşturuldu.');
            }
            
            // Sayfayı yenile - tüm eventleri tekrar yükle
            await loadEvents();
            
            isAddEventModal.value = false;

        } catch (error) {
            console.error('Event kaydedilirken hata:', error);
            showMessage('Etkinlik kaydedilirken hata oluştu!', 'error');
        } finally {
            isLoading.value = false;
        }
    };

    const startDateChange = (event: any) => {
        const dateStr = event.target.value;
        if (dateStr) {
            minEndDate.value = dateStr;
            if (params.value.end && params.value.end < dateStr) {
                params.value.end = '';
            }
        }
    };

    const deleteEvent = async () => {
        if (!params.value.id) {
            return;
        }

        try {
            // Onay al
            const result = await Swal.fire({
                title: 'Emin misiniz?',
                text: 'Bu etkinliği silmek istediğinizden emin misiniz?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Evet, Sil!',
                cancelButtonText: 'İptal'
            });

            if (result.isConfirmed) {
                isLoading.value = true;

                // Excel'den sil
                await deleteCalendarEvent(params.value.id);

                showMessage('Etkinlik başarıyla silindi.');
                isAddEventModal.value = false;
                
                // Sayfayı yenile - tüm eventleri tekrar yükle
                await loadEvents();
            }

        } catch (error) {
            console.error('Event silinirken hata:', error);
            showMessage('Etkinlik silinirken hata oluştu!', 'error');
        } finally {
            isLoading.value = false;
        }
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    // Tarih formatını Türkçe locale'a çeviren fonksiyon
    const formatDateToTurkish = (dateString: string): string => {
        if (!dateString) return '';
        
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return dateString;
            
            // Türkçe locale ile formatla
            return date.toLocaleString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        } catch (error) {
            console.warn('Tarih formatlanırken hata:', error);
            return dateString;
        }
    };

    // Modal'da kullanılacak tarih format fonksiyonu
    const formatDateForInput = (dateString: string): string => {
        if (!dateString) return '';
        
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '';
            
            // HTML datetime-local input formatı: YYYY-MM-DDTHH:MM
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        } catch (error) {
            console.warn('Input tarih formatlanırken hata:', error);
            return '';
        }
    };
</script>
