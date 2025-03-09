import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaState from 'pinia-plugin-persistedstate';
import router from '@/router';
import App from './App.vue';

const pinia = createPinia();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// What the hell
pinia.use(piniaState);

const app = createApp(App);

app.use(router).use(pinia).mount('#app');
