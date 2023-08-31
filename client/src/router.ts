import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import Dashboard from './views/Dashboard.vue'
import isAuthenticated from './helpers/authentication'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: isAuthenticated() ? '/dashboard' : '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/sign-up', name: 'SignUp', component: SignUp },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
