// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from '@/vue-instance'
import App from './App'
/* eslint-disable no-undef */
require('@/assets/css/mystyles.scss')
require('@/assets/css/basics.styl')
require('@/assets/css/buttons.styl')
require('@/assets/css/custom.styl')
require('@/assets/css/startsection.styl');
require('@/assets/css/section-filters.styl')
require('@/assets/css/nouislider.min.css')
require('@/assets/css/dropzone.min.css')
require('@/assets/css/swiper.min.css')
require('@/assets/css/decoration.styl')
require('@/assets/css/medias.styl')
require('@/assets/css/transitions.styl')



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
