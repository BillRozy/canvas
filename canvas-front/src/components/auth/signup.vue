<template lang="pug">
.content-wrapper
  .signup-form.box-400-400.column.flex-sb-c-c
    .header РЕГИСТРАЦИЯ
    .body.flex-sa-c-c.column
      .field-with-title.column.flex-c-c-c
        label Username
        input(type="text", v-model="username")
      .field-with-title.column.flex-c-c-c
        label Password
        input(type="password", v-model="password")
      .field-with-title.column.flex-c-c-c
        label Password
        input(type="password", v-model="passwordConfirmation")
      .field-with-title.column.flex-c-c-c
        input(type="button", @click="login", value="Продолжить")
</template>
<script>
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
      this.$http({
        method: 'post',
        url: '/users',
        data: {user: { email: this.username, password: this.password, password_confirmation: this.passwordConfirmation, remember_me: true, operator: this.operator }},
        rememberMe: true
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
.signup-form
  border 1px solid black
  max-width 400px
  margin 0 auto
  height 400px
</style>
