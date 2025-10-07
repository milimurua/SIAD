import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import FormDenuncia from '../views/FormDenuncia.vue';
import Login from '../views/Login.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/form-denuncia', name: 'FormDenuncia', component: FormDenuncia },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
