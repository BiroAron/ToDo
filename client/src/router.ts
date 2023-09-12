import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import Dashboard from './views/Dashboard.vue'
import { isAuthenticated } from './helpers/authentication'

const routes: RouteRecordRaw[] = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/sign-up', name: 'SignUp', component: SignUp },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach(async (to, from) => {
  if (!isAuthenticated() && to.name === 'Dashboard') {
    return { name: 'Login' }
  } else if (isAuthenticated() && to.name !== 'Dashboard') {
    return { name: 'Dashboard' }
  }
})

export default router
