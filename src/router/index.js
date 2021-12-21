import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';

Vue.use(VueRouter);

const routes = [
  { path: '*', component: Home },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
