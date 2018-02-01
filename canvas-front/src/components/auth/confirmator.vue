<template lang="pug">
section.hero.is-fullheight(:class="dynamicClass")
  .hero-body
    .container.is-desktop
      .level
        .level-item
          img(v-if="loading", src="~assets/images/animated/loader.svg")
          .title(v-if="status === 500") {{message}}
</template>
<script>
import Net from '@/communication/user-actions'
export default {
  name: '',
  data: () => ({
    username: '',
    password: '',
    passwordConfirmation: '',
    operator: true,
    loading: true,
    status: 0,
    message: '',
  }),
  computed: {
    dynamicClass() {
      return {
        'is-danger': this.status === 500,
        'is-success': this.status === 200,
        'is-dark': this.status === 0,
      }
    }
  },
  methods: {
    signin() {
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.loading = true;
      Net.confirmRegistration(to.params.token)
      .then(ans => {
        vm.status = 200;
        vm.$log.debug(ans);
        setTimeout(() => {
          vm.$router.push('/sign_in');
        }, 500);
        
      })
      .catch(err => {
        vm.loading = false;
        vm.status = 500;
        vm.message = err.response.data.message;
        vm.$toast.open({
          duration: 5000,
          message: `${err}`,
          position: 'is-bottom',
          type: 'is-danger'
        })
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
