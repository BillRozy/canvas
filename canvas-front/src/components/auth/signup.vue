<template lang="pug">
.content-wrapper
  .card
    .card-header 
      .card-header-title РЕГИСТРАЦИЯ
    .card-content 
      form.body
        b-field(label="E-Mail")
          b-input(type="email", v-model="username")
        b-field(label="Password")
          b-input(type="password", v-model="password", minlength="6")
        b-field(label="Password confirmation")
          b-input(type="password", v-model="passwordConfirmation", minlength="6")
        b-field()
          b-checkbox(v-model="operator") Создать портфолио и начать предлагать услуги
        b-field
          button.button.is-primary(@click="login") Продолжить
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
    login () {
      this.$store.dispatch(Naming.Actions.SIGN_UP, {
        username: this.username, 
        password: this.password,
        operator: this.operator,
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
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
