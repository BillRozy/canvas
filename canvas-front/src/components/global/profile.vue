<template lang="pug">
.page-wrapper
  .section 
    .container(style="max-width: 745px")
      .tile.is-ancestor
        .tile.is-4
          .card(style="width:100%;")
            .card-header
              .card-header-title
                b-field(v-if="isEditing")
                  b-input(type="text", v-model="profile.name")
                  b-input(type="text", v-model="profile.surname")
                b-field(v-else) {{`${profile.name} ${profile.surname}`}}  
            .card-image
              figure.image.is-256x256
                img(:src='avatar')
            .card-content(v-if="isEditing")
              button.button.is-primary#pick-avatar Загрузить аватар
              avatar-cropper(upload-form-name="avatar",@uploaded="updateUserAvatar", trigger="#pick-avatar",:upload-headers="{'Authorization': 'Bearer ' + $store.state.session.token}", upload-url="/api/profiles/avatar", :labels="{ submit: 'Применить', cancel: 'Отмена'}")     
        .tile.is-8
          .card(style="width:100%;")
            .card-content
              b-field(label="Пол")
                b-select(v-model="profile.sex", :readonly="!isEditing", v-if="isEditing", placeholder="Выберите пол")
                  option Мужской
                  option Женский
                span(v-else) {{sex || 'Не выбран'}}
              b-field(label="День рождения")
                b-datepicker(placeholder="Click to select...", icon="calendar-today", v-model="profile.birthday", v-if="isEditing")
                span(v-else) {{birthday}}
              b-field(label="Город")
                b-input(type="text", v-model="profile.city", :readonly="!isEditing")
              b-field(label="Номер")
                b-input(type="tel", v-model="profile.phone_number", :readonly="!isEditing")
              b-field(label="E-mail")
                b-input(type="email", v-model="profile.social_email", :readonly="!isEditing")
              button.button.is-primary(@click='edit', class="rule_button", v-if="!isEditing") {{'Изменить'}}
              button.button.is-primary(@click='save', class="rule_button",  v-if="isEditing") {{'Сохранить'}}
</template>
<script>
import Naming from '@/store/naming';
const TAG = "Profile";
import defaultAvatar from '@/assets/images/default-avatar-space-astronaut.png'
import AvatarCropper from "vue-avatar-cropper"
export default {
  name: "",
  components: {
    AvatarCropper
  },
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
      return this.profile.avatar || defaultAvatar;
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
    },
    updateUserAvatar(response) {
      this.profile = response.profile
    },
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
<style lang="stylus">
@import '~assets/css/consts'

input.input
  &:read-only
  &[readonly]
    pointer-events none  
    border none
    border-bottom 1px solid lightgray
    font-size inherit
    font-family inherit
    color inherit
    background none

</style>
