<template lang="pug">
section.hero.is-fullheight
  .hero-head
  .hero-body
    .container.is-desktop
      div(style="max-width: 560px; margin: 0 auto;")
        .title Добро пожаловать на Canvas!
        .card
          .card-header 
            .card-header-title РЕГИСТРАЦИЯ
          .card-content 
            form.body
              b-field(label="E-Mail")
                b-input(type="email", v-model="username")
              b-field(label="Пароль")
                b-input(type="password", v-model="password", minlength="6")
              b-field(label="Подтверждение пароля")
                b-input(type="password", v-model="passwordConfirmation", minlength="6")
              b-field()
                b-checkbox(v-model="operator") Создать портфолио и начать предлагать услуги
              b-field
                button.button.is-primary(@click.prevent="signup") Продолжить
</template>
<script>
import Naming from '@/store/naming'
export default {
  name: '',
  data: () => ({
    username: '',
    password: '',
    passwordConfirmation: '',
    operator: true
  }),
  methods: {
    signup() {
      this.$store.dispatch(Naming.Actions.SIGN_UP, {
        username: this.username, 
        password: this.password,
        operator: this.operator,
      })
      .then(() => {
        this.$router.push('/greetings')
      })
      .catch(err => {
        this.$log.error(err);
      })
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if(vm.$store.getters.isSigned){
        vm.$router.replace({path: '/'})
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
.hero.is-fullheight
  min-height calc(100vh - 4rem)
.header
  height 60px
  background black
  color white
  width 100%
.body
  height calc(100% - 60px)
  padding 10px
.signup-form
  border 1px solid black
  max-width 400px
  margin 0 auto
  height 400px
</style>
