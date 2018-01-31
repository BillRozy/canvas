<template lang="pug">
section.hero.is-fullheight
  .hero-head
  .hero-body
    .container.is-desktop Please wait to be logged in...
</template>
<script>
import Net from '@/communication/user-actions'
export default {
  name: '',
  data: () => ({
    username: '',
    password: '',
    passwordConfirmation: '',
    operator: true
  }),
  methods: {
    signin() {
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      Net.confirmRegistration(to.params.token)
      .then(ans => {
        vm.$log.debug(ans);
      })
    })
  }
}
</script>
<style lang="stylus" scoped>
.hero.is-fullheight
  min-height calc(100vh - 4rem)
.body
  height calc(100% - 60px)
  padding 10px
</style>
