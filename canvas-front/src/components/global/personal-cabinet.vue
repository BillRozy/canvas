<template lang='pug'>
.personal-cabinet
  .personal-cabinet-wrapper(v-if='isSigned')
    img.header-avatar(:src='current_user.profile.avatar', onerror="this.style.display='none'")
    a#name_header_link(:href='current_user.profile.link') {{current_user.profile.name}}
    #profile-block-menu-button(clicked='false', @click='menuOpened = !menuOpened')
  .personal-cabinet-wrapper(v-else='')
    router-link(to='sign_in') Войти
    router-link(to='sign_up') Регистрация
  #profile-block-menu(v-show='menuOpened')
    div(v-if='isSigned')
      a(:href='current_user.profile.link') Profile
      div(v-if='isSigned && current_user.operator')
        a(:href='current_user.portfolio.link') Portfolio
      a(:href='current_user.destroy.link') Sign out
</template>
<script>
export default {
  name: '',
  data: () => ({
    current_user: null,
    menuOpened: false
  }),
  computed: {
    isSigned () {
      return this.current_user !== null
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/css/consts';
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
</style>
