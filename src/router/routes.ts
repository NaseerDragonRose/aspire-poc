import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/Home.vue'),
  },
  {
    path: '/my-cards',
    component: () => import('pages/MyCards.vue'),
  }
];

export default routes;
