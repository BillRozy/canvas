<template lang='pug'>
.personal-cabinet(:class="{'is-plain': plain}")
  .columns.is-gapless.is-marginless.is-mobile(v-if='isSigned', style="min-width: 200px;max-height: 100%")
    .column(style="justify-content:  center;align-items: center")
      figure.is-clipped.image.is-64x64
        img(:src="avatar")
    .column
      router-link(:to="linkToProfile", style="justify-content: center") {{username}}
    .column.is-flex(style="align-items: center; justify-content: center", v-if="!plain")
      b-dropdown(position="is-bottom-left", style="height: 100%")
        button.button.dropped-button.is-shadowless.is-paddingless(slot="trigger", style="height: 100%; width: 59px")
          b-icon(icon="arrow-down-drop-circle")
        b-dropdown-item(has-link)
          router-link(:to='linkToProfile') Профиль
        b-dropdown-item(has-link)
          router-link(:to='linkToPortfolio') Портфолио
        b-dropdown-item(has-link)
          a(@click="signOut") Выйти
  .container.is-marginless(v-if='isSigned && plain')
    .navbar-item
      router-link(:to='linkToProfile') Профиль
    .navbar-item  
      router-link(:to='linkToPortfolio') Портфолио
    .navbar-item  
      a(@click="signOut") Выйти
  .columns.is-gapless.is-marginless(v-if='!isSigned', style="height: 100%")
    .column.is-6
      a(@click="openSignInPopup") Войти
    .column.is-6
      router-link(to='/sign_up') Регистрация
</template>
<script>
import Vue from '@/vue-instance';
import LoginComponent from '@/components/auth/login'
import Naming from '@/store/naming'
const LoginConstructor = Vue.component('login', LoginComponent);
const Login = new LoginConstructor();
Login.$mount();
import defaultAvatar from '@/assets/images/default-avatar-space-astronaut.png'
export default {
  props: {
    plain: {
      default: false,
    }
  },
  data: () => ({
    menuOpened: false
  }),
  computed: {
    username(){
      return this.$store.getters.currentUser.profile.name;
    },
    isSigned () {
      return this.$store.getters.isSigned;
    },
    linkToProfile() {
      return `/users/${this.$store.getters.currentUser.id}/profile`;
    },
    linkToPortfolio() {
      return `/users/${this.$store.getters.currentUser.id}/portfolio`;
    },
    avatar() {
      return this.$store.getters.currentUser.profile.avatar || defaultAvatar;
    }
  },
  methods: {
    openSignInPopup(){
      Login.$store = this.$store;
      this.showPopup(Login.$el)
    },
    signOut(){
      this.$store.commit(Naming.Mutations.REMOVE_CURRENT_USER)
      location.reload();
    }
  }
}
</script>
<style lang="stylus">
@import '~assets/css/consts'
.personal-cabinet
  float right
  display flex
  flex-direction column
  justify-content flex-end
  height 100%
  max-height 100%
  min-width 200px
  &.is-plain
    width 100%
    .columns:first-child
      min-width 200px !important
      max-width 200px !important
      padding-bottom 0.5rem
      border-bottom 1px solid lightgray
    .navbar-item
      width 100%
      text-align center
  a
    display inline-flex
    justify-content: center;
    height 100%
    align-items center

  .dropped-button
    border none
    &:hover
      span
        color pink
        transition 0.2s 

  .dropdown-content
    background white      
</style>
