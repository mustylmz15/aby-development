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
                    <button type="button" class="btn btn-primary" @click="editEvent()">
                        <icon-plus class="ltr:mr-2 rtl:ml-2" />
                        Etkinlik Oluştur
                    </button>
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
                                            <button type="button" class="btn btn-outline-danger" @click="isAddEventModal = false">İptal</button>
                                            <button v-if="params.id" type="button" class="btn btn-outline-warning ltr:ml-4 rtl:mr-4" @click="deleteEvent()">Sil</button>
                                            <button type="submit" class="btn btn-primary ltr:ml-4 rtl:mr-4">
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
<script lang="ts" setup>
    import { computed, onMounted, ref } from 'vue';
    import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
    import FullCalendar from '@fullcalendar/vue3';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';
    import Swal from 'sweetalert2';
    import { useMeta } from '@/composables/use-meta';

    import IconPlus from '@/components/icon/icon-plus.vue';
    import IconX from '@/components/icon/icon-x.vue';

    useMeta({ title: 'Takvim' });

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
    const calendarOptions = computed(() => {
        return {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
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
            events: events.value,
        };
    });

    onMounted(() => {
        getEvents();
    });

    const getEvents = () => {
        events.value = [
            {
                id: 1,
                title: 'Tüm Gün Etkinliği',
                start: now.getFullYear() + '-' + getMonth(now) + '-01T14:30:00',
                end: now.getFullYear() + '-' + getMonth(now) + '-02T14:30:00',
                className: 'danger',
                description: 'Proje toplantısı ve sunum hazırlığı için ayrılan süre.',
            },
            {
                id: 2,
                title: 'Saha Ziyareti',
                start: now.getFullYear() + '-' + getMonth(now) + '-07T19:30:00',
                end: now.getFullYear() + '-' + getMonth(now) + '-08T14:30:00',
                className: 'primary',
                description: 'Müteahhit firmanın şantiye ziyareti ve denetleme işlemleri.',
            },
            {
                id: 3,
                title: 'Ürün Lansmanı',
                start: now.getFullYear() + '-' + getMonth(now) + '-17T14:30:00',
                end: now.getFullYear() + '-' + getMonth(now) + '-18T14:30:00',
                className: 'info',
                description: 'Yeni ürün lansmanı ve tanıtım etkinliği düzenlemesi.',
            },
            {
                id: 4,
                title: 'Toplantı',
                start: now.getFullYear() + '-' + getMonth(now) + '-12T10:30:00',
                end: now.getFullYear() + '-' + getMonth(now) + '-13T10:30:00',
                className: 'danger',
                description: 'Haftalık proje değerlendirme ve planlama toplantısı.',
            },
            {
                id: 5,
                title: 'Öğle Yemeği',
                start: now.getFullYear() + '-' + getMonth(now) + '-12T15:00:00',
                end: now.getFullYear() + '-' + getMonth(now) + '-13T15:00:00',
                className: 'info',
                description: 'Müşteri ile iş yemeği ve proje görüşmeleri.',
            },
            {
                id: 6,
                title: 'Konferans',
                start: now.getFullYear() + '-' + getMonth(now) + '-12T21:30:00',
                end: now.getFullYear() + '-' + getMonth(now) + '-13T21:30:00',
                className: 'success',
                description: 'Teknik konferans ve sektörel gelişmeler sunumu.',
            },
            {
                id: 7,
                title: 'Sosyal Etkinlik',
                start: now.getFullYear() + '-' + getMonth(now) + '-12T05:30:00',
                end: now.getFullYear() + '-' + getMonth(now) + '-13T05:30:00',
                className: 'info',
                description: 'Ekip motivasyonu için düzenlenen sosyal aktivite.',
            },
            {
                id: 8,
                title: 'Akşam Yemeği',
                start: now.getFullYear() + '-' + getMonth(now) + '-12T20:00:00',
                end: now.getFullYear() + '-' + getMonth(now) + '-13T20:00:00',
                className: 'danger',
                description: 'İş ortakları ile gala yemeği ve network etkinliği.',
            },
            {
                id: 9,
                title: 'Doğum Günü Partisi',
                start: now.getFullYear() + '-' + getMonth(now) + '-27T20:00:00',
                end: now.getFullYear() + '-' + getMonth(now) + '-28T20:00:00',
                className: 'success',
                description: 'Ekip üyesinin doğum günü kutlaması ve eğlence.',
            },
            {
                id: 10,
                title: 'Yeni Yetenek Etkinliği',
                start: now.getFullYear() + '-' + getMonth(now, 1) + '-24T08:12:14',
                end: now.getFullYear() + '-' + getMonth(now, 1) + '-27T22:20:20',
                className: 'danger',
                description: 'İnsan kaynakları yeni personel değerlendirme süreci.',
            },
            {
                id: 11,
                title: 'Diğer Etkinlik',
                start: now.getFullYear() + '-' + getMonth(now, -1) + '-13T08:12:14',
                end: now.getFullYear() + '-' + getMonth(now, -1) + '-16T22:20:20',
                className: 'primary',
                description: 'Genel amaçlı çok günlük etkinlik planlaması.',
            },
            {
                id: 13,
                title: 'Gelecek Etkinlik',
                start: now.getFullYear() + '-' + getMonth(now, 1) + '-15T08:12:14',
                end: now.getFullYear() + '-' + getMonth(now, 1) + '-18T22:20:20',
                className: 'primary',
                description: 'Gelecek ay planlanmış önemli proje miladı.',
            },
        ];
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

    const saveEvent = () => {
        if (!params.value.title) {
            return true;
        }
        if (!params.value.start) {
            return true;
        }
        if (!params.value.end) {
            return true;
        }

        if (params.value.id) {
            //update event
            let event = events.value.find((d: any) => d.id == params.value.id);
            if (event) {
                event.title = params.value.title;
                event.start = params.value.start;
                event.end = params.value.end;
                event.description = params.value.description;
                event.className = params.value.type;
            }
        } else {
            //add event
            let maxEventId = 0;
            if (events.value && events.value.length > 0) {
                maxEventId = events.value.reduce((max: number, character: any) => (character.id > max ? character.id : max), events.value[0].id);
            }

            let event = {
                id: maxEventId + 1,
                title: params.value.title,
                start: params.value.start,
                end: params.value.end,
                description: params.value.description,
                className: params.value.type,
            };
            events.value.push(event);
        }
        
        // Calendar refresh
        if (calendar.value) {
            calendar.value.getApi().refetchEvents();
        }
        showMessage('Etkinlik başarıyla kaydedildi.');
        isAddEventModal.value = false;
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

    const deleteEvent = () => {
        if (params.value.id) {
            events.value = events.value.filter((event: any) => event.id !== params.value.id);
            if (calendar.value) {
                calendar.value.getApi().refetchEvents();
            }
            showMessage('Etkinlik başarıyla silindi.');
            isAddEventModal.value = false;
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
</script>
