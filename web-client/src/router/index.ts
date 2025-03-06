import { createRouter, createWebHistory } from 'vue-router';
import { type RouteRecordRaw } from 'vue-router';

import Login from '@/views/Login/login-page.vue';
import Main from '@/views/Main/index-page.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'login', component: Login },
  { path: '/main', name: 'main', component: Main },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (!localStorage.getItem('token') && to.name !== 'login') {
    console.log('没有token');

    return { name: 'login', path: '/' };
  }
});

export default router;
