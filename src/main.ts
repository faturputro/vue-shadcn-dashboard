import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueFeather from 'vue-feather';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component(VueFeather.name, VueFeather);
app.use(createPinia())
app.use(router)

app.mount('#app')
