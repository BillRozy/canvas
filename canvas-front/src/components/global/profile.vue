<template lang="pug">
.page-wrapper
  .profile-box
    .profile-box-header
      .profile-box-header-title
        input(type="text", v-model="profile.name", :readonly="!isEditing")
        span
        input(type="text", v-model="profile.surname", :readonly="!isEditing")
    .profile-box-body
      .profile-box-aside
        .profile-box-avatar
          img(:src='avatar')
        .profile-box-menu
      .profile-box-main-content
        .profile-box-field
          .profile-box-field-title Пол:
          .profile-box-field-content
            select(v-model="profile.sex", :readonly="!isEditing", v-if="isEditing")
              option(disabled='', value='') Выберите вариант
              option Мужской
              option Женский
            span(v-else) {{sex}}
        .profile-box-field
          .profile-box-field-title Дата Рождения:
          .profile-box-field-content
            input(type="date", v-model="profile.birthday", v-if="isEditing")
            span(v-else) {{birthday}}
        .profile-box-field
          .profile-box-field-title Город:
          .profile-box-field-content
            input(type="text", v-model="profile.city", :readonly="!isEditing")
        .profile-box-field
          .profile-box-field-title Номер:
          .profile-box-field-content
            input(type="tel", v-model="profile.phone_number", :readonly="!isEditing")
        .profile-box-field
          .profile-box-field-title E-mail:
          .profile-box-field-content
            input(type="email", v-model="profile.social_email", :readonly="!isEditing")
        .profile-box-field
          .profile-box-field-title Хз что:
          .profile-box-field-content
        div(@click='edit', class="rule_button", v-if="!isEditing") {{'Изменить'}}
        div(@click='save', class="rule_button",  v-if="isEditing") {{'Сохранить'}}
</template>
<script>
import Naming from '@/store/naming';
const TAG = "Profile";
export default {
  name: "",
  props: ['profile_data'],
  data: () => ({
    profile: this.profile_data || {},
    isEditing: false,
  }),
  computed: {
    name() {
      return this.profile.name;
    },
    surname() {
      return this.profile.surname;
    },
    avatar() {
      return this.profile.avatar;
    },
    sex() {
      return this.profile.sex;
    },
    birthday() {
      return this.profile.birthday;
    },
    city() {
      return this.profile.city;
    },
    phone_number() {
      return this.profile.phone_number;
    },
    social_email() {
      return this.profile.social_email;
    }
  },
  methods: {
    edit() {
      this.isEditing = !this.isEditing;
    },
    save(){
      this.$store.dispatch(Naming.Actions.POST_PROFILE, {
        profile: this.profile,
        userid: this.$route.params.id,
      })
      .then(() => {
        this.isEditing = !this.isEditing;
      })
      .catch(err => {
        this.$log.error(err);
        this.isEditing = !this.isEditing;
      })
    }
  },
  mounted() {
    this.$store.dispatch(Naming.Actions.GET_PROFILE, {userid: this.$route.params.id})
    .then(profile => {
      this.profile = profile;
    })
    .catch(err => {
      this.$log.error(TAG, err);
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/css/consts'
.profile-box
  display flex
  flex-direction column
  background-color rgba(120, 120, 120, 0.5)
  border-radius 5px
  font-family "Gilroy"
  max-width $screen-lg-min
  min-width 280px
  width 80%
  margin 20px auto
  box-sizing border-box
  min-height 450px

  input
    max-width 100%
    border-radius 5px
    padding 3px
    &:required
      border 1px blue solid
    &:read-only
      border none
      font-size inherit
      font-family inherit
      color inherit
      background none

  select
    max-width 100%
    border-radius 5px
    padding 3px

.profile-box-header
  display flex
  align-items center
  align-content center
  width 100%
  box-sizing border-box
  min-height 50px
  flex-grow 1
  font-size 1.5em
  font-weight bold
  padding 30px
  border-bottom 1px solid black

.profile-box-header-title
  line-height calc(100% - 15px)

.profile-box-body
  display flex
  box-sizing border-box
  width 100%
  flex-grow 6

.profile-box-aside
  display flex
  box-sizing border-box
  flex-grow 1
  padding 20px
  border-right 1px solid black
  min-width 140px
  max-width 250px
  min-height 300px

.profile-box-avatar
  min-width 100px
  min-height 120px
  max-width 190px
  max-height 250px
  width auto
  height auto

.profile-box-avatar img
  width 100%
  height auto

.profile-box-main-content
  display flex
  box-sizing border-box
  flex-direction column
  flex-grow 6
  padding 30px
  min-width 140px


.profile-avatar img
  border 1px solid black
  border-radius 5px

.profile-box .rule_button
  text-decoration none
  color whitesmoke
  transition-duration 200ms

.profile-box .rule_button:hover
  text-decoration underline

.profile-box-field
  display flex
  flex-direction column

.profile-box-field-title
  font-size 1.2em
  font-weight lighter

.profile-box-field-content
  margin-left 10px
  width 100%
  word-wrap break-word
</style>
