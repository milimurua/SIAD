import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../views/Welcome.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import FormDenuncia from '../views/FormDenuncia.vue';
import Denuncias from '../views/Denuncias.vue';

const routes = [
  { path: '/', component: Welcome },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/form-denuncia', component: FormDenuncia },
  { path: '/denuncias', component: Denuncias },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
