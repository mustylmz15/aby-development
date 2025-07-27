declare module '@headlessui/vue' {
  import { Component } from 'vue'
  export const TransitionRoot: Component
  export const TransitionChild: Component
  export const Dialog: Component
  export const DialogPanel: Component
  export const DialogOverlay: Component
  export const Menu: Component
  export const MenuButton: Component
  export const MenuItem: Component
  export const MenuItems: Component
  export const Listbox: Component
  export const ListboxButton: Component
  export const ListboxOption: Component
  export const ListboxOptions: Component
  export const Switch: Component
}

declare module '@fullcalendar/vue3' {
  import { Component } from 'vue'
  const FullCalendar: Component
  export default FullCalendar
}

declare module '@fullcalendar/daygrid' {
  const dayGridPlugin: any
  export default dayGridPlugin
}

declare module '@fullcalendar/timegrid' {
  const timeGridPlugin: any
  export default timeGridPlugin
}

declare module '@fullcalendar/interaction' {
  const interactionPlugin: any
  export default interactionPlugin
}

declare module 'sweetalert2' {
  const Swal: any
  export default Swal
}
