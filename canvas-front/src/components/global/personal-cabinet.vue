<template lang='pug'>
.personal-cabinet
  .columns.is-gapless.is-marginless.is-pulled-left(v-if='isSigned', style="height: 100%; max-width: 250px; width: 100%")
    .column
      figure(style="height: 100%")
        img.is-64x64(:src="avatar", style="height: 60px; width: 60px")
    .column
      router-link(:to="linkToProfile", style="padding-left: 10px;") {{username}}
    .column.is-flex(style="align-items: center; justify-content: center")
      b-dropdown(position="is-bottom-left", style="height: 100%")
        button.button.dropped-button.is-shadowless(slot="trigger", style="height: 59px; width: 59px")
          b-icon(icon="arrow-down-drop-circle")
        b-dropdown-item(has-link)
          router-link(:to='linkToProfile') Профиль
        b-dropdown-item(has-link)
          router-link(:to='linkToPortfolio') Портфолио
        b-dropdown-item(has-link)
          a(@click="signOut") Выйти
  .columns.is-gapless.is-marginless(v-else)
    .column.is-6
      div(@click="openSignInPopup") Войти
    .column.is-6
      router-link(to='sign_up') Регистрация
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
  justify-content flex-end
  height 100%
  width 20%
  a
    display inline-flex
    height 100%
    align-items center
  @media screen and (max-width: $header-critical-size)
    width 40%
    min-width 200px

  .dropped-button
    border none
    &:hover
      span
        transition 0.2s
        transform scale(1.1)   

  .dropdown-content
    background white      
</style>
