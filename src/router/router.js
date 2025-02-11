// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../Views/Home/Home.vue';
import EditUser from '../Views/EditUser/EditUser.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/edit/:id', component: EditUser, props: true }, // Ruta dinámica para editar
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

