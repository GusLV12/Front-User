// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../Views/Home/Home.vue';
import EditUser from '../Views/EditUser/EditUser.vue';
import AddUser from '../Views/AddUser/AddUser.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/edit/:id', component: EditUser, props: true },
  {path: '/add', component: AddUser},
  {path: '/:notFound(.*)', redirect: '/'}
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

