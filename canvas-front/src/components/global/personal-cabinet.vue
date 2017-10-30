<template lang='pug'>
.personal-cabinet
  .personal-cabinet-wrapper(v-if='isSigned')
    img.header-avatar(onerror="this.style.display='none'")
    a#name_header_link {{username}}
    #profile-block-menu-button(clicked='false', @click='menuOpened = !menuOpened')
  .personal-cabinet-wrapper(v-else)
    router-link(to='sign_in') Войти
    router-link(to='sign_up') Регистрация
  #profile-block-menu(v-show='menuOpened')
    div(v-if='isSigned')
      router-link(:to='linkToProfile') Profile
      router-link(:to='linkToPortfolio') Портфолио
      a Sign out
</template>
<script>
export default {
  data: () => ({
    menuOpened: false
  }),
  computed: {
    username(){
      return this.$store.state.user.username;
    },
    isSigned () {
      return this.$store.getters.isSigned;
    },
    linkToProfile() {
      return `/users/${this.$store.state.user.id}/profile`;
    },
    linkToPortfolio() {
      return `/users/${this.$store.state.user.id}/portfolio`;
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/css/consts'
#profile-block-menu-button
  display inline-block
  width 40px
  height 40px
  background url('~assets/images/arrow-down.png') no-repeat
  background-size cover

  &:hover
    cursor pointer

.personal-cabinet
  float right
  height 100%
  width 20%

  .personal-cabinet-wrapper
    display flex
    justify-content space-around
    align-content center
    align-items center
    height 100%
    width 100%

  a
    display inline-flex
    height 100%
    min-height 80px
    align-items center
  @media screen and (max-width: $header-critical-size)
    width 40%
    min-width 200px

.header-avatar
  height 100%
  width auto
  max-width $header-mini-height
  max-height $header-mini-height
#profile-block-menu
  display flex
  position absolute
  width 20%
  right: 0
  flex-direction column
  height 150px
  background rgba(100,100,100,0.98)
  transition 0.2s
  z-index 150
  top $header-mini-height

  @media screen and (max-width: $header-critical-size)
    width 40%
  a
    display flex
    align-content center
    box-sizing border-box
    padding-left 10px
    height 100%
    min-height 50px
    align-items center
    border-bottom 1px darkgray solid
    color whitesmoke
</style>
