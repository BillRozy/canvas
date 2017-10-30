import VueRouter from 'vue-router'
import About from '@/components/global/about.vue'
import Doorman from '@/components/global/doorman.vue'
import Catalog from '@/components/global/catalog.vue'
import Events from '@/components/global/events.vue'
import Login from '@/components/auth/login.vue'
import Signup from '@/components/auth/signup.vue'
import Profile from '@/components/global/profile.vue'

const routes = [
  { path: '/', component: Doorman },
  { path: '/about', component: About },
  { path: '/catalog', component: Catalog },
  { path: '/events', component: Events },
  { path: '/sign_in', component: Login },
  { path: '/sign_up', component: Signup },
  { path: '/users/:id/profile', component: Profile },
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
