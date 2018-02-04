<template lang="pug">
.box(style="min-width: 300px")
  b-field(label="Тип")
    b-select(v-model="type", placeholder="Выбрать категорию")
      option(v-for="option in VIDEO_TYPES", :value="option.value") {{option.title}}
  b-field(label="Ссылка")    
    b-input(type="url", v-model="url")
  b-field
    button.button.is-primary.is-middle(@click="send") Добавить 
</template>
<script>
import Naming from '@/store/naming';
export default {
  name: "",
  props: {
    category: {required: true},
  },
  data: () => ({
    type: 'youtube',
    url: null,
  }),
  computed: {
    VIDEO_TYPES() {
      return [
        {title: 'Youtube', value: 'youtube'},
        {title: 'Vimeo', value: 'vimeo'},
      ]
    }
  },
  methods: {
    send(){
      this.$store.dispatch(Naming.Actions.POST_VIDEO, {
        category: this.category,
        type: this.type,
        url: this.url,
      })
      .then(() => {
        this.hidePopup();
      })
      .catch(err => {
        this.$log.error(err)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
