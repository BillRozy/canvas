<template lang="pug">
.content-wrapper
  .login-form.box-400-200.column.flex-sb-c-c
    .header Log In
    .body.flex-sa-c-c.column
      .field-with-title.column.flex-c-c-c
        label Username
        input(type="text", v-model="username")
      .field-with-title.column.flex-c-c-c
        label Password
        input(type="password", v-model="password")
      .field-with-title.column.flex-c-c-c
        input(type="button", @click="login", value="Войти")
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
