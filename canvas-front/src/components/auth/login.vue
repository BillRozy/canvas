<template lang="pug">
.card(style="background: white;")
  .card-header 
    .card-header-title Войти
  .card-content  
    form.body
      b-field(label="E-Mail")
        b-input(type="text", v-model="username")
      b-field(label="Пароль")
        b-input(type="password", v-model="password")
      b-field
        button.button.is-primary(type="button", @click="login") Войти
</template>
<script>
import Naming from '@/store/naming'
export default {
  name: '',
  data: () => ({
    username: '',
    password: '',
    passwordConfirmation: ''
  }),
  methods: {
    login () {
      this.$store.dispatch(Naming.Actions.SIGN_IN, {
        username: this.username,
        password: this.password
      })
      .then(() => {
        location.reload();
      })
      .catch(err => {
        this.$log.error(err)
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

.login-form
  background white
  border 1px solid black
  max-width 400px
  margin 0 auto
  height 300px
</style>
