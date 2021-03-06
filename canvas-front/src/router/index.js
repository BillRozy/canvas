import VueRouter from 'vue-router'
import About from '@/components/global/about.vue'
import Doorman from '@/components/global/doorman.vue'
import Catalog from '@/components/global/catalog.vue'
import PhotoCatalog from '@/components/global/photo-catalog.vue'
import VideoCatalog from '@/components/global/video-catalog.vue'
import Events from '@/components/global/events.vue'
import Event from '@/components/global/event.vue'
import Login from '@/components/auth/login.vue'
import Signup from '@/components/auth/signup.vue'
import Greetings from '@/components/auth/greetings.vue'
import Confirmator from '@/components/auth/confirmator.vue'
import Profile from '@/components/global/profile.vue'
import Portfolio from '@/components/global/portfolio.vue'
import Upload from '@/components/global/uploader.vue'
import ErrorPage from '@/components/global/error404.vue'
import store from '@/store'

const routes = [
  { path: '/', component: Doorman },
  { path: '/about', component: About },
  {
    path: '/catalog',
    component: Catalog,
    children: [
      {
        path: 'photo',
        component: PhotoCatalog,
      },
      {
        path: 'video',
        component: VideoCatalog,
      }
    ]
  },
  { path: '/events', component: Events },
  { path: '/events/:id', component: Event },
  { path: '/sign_in', component: Login },
  { path: '/sign_up', component: Signup },
  { 
    path: '/greetings', 
    component: Greetings,
    beforeEnter(to, from, next) {
      from.path.indexOf('sign_up') === -1 ? next('/') : next();
    }
  },
  { path: '/users/:id/profile', component: Profile },
  {
    path: '/users/:id/portfolio',
    component: Portfolio,
  },
  { path: '/upload', component: Upload },
  { path: '/confirmation/:token', component: Confirmator },
  { path: '/404', component: ErrorPage },
  {
    path: '*',
    redirect: '/404'
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  function proceed() {
    if (store.getters.currentUser)
      next()
    else
      next('/')
  }

  // we must wait for the store to be initialized
  if (!store.state.session.ready) {
    store.watch(
      (state) => state.session.ready,
      (value) => {
        if (value == true)
          proceed()
      }
    )
  }
  else
    proceed()
});

export default router
