import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Toasity, {
    autoClose: 3000,
    draggable: true,
    draggablePercent: 0.6,
    newestOnTop: true,
    position: 'top-right',
    transition: 'slide',
} as ToastContainerOptions)
app.mount('#app')
