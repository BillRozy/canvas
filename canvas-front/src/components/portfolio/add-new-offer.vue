<template lang="pug">
.box(style="min-width: 300px")
  b-field(label="Категория")
    b-select(v-model="category", placeholder="Выбрать категорию")
      option(v-for="(opt, index) in categories", :value="index") {{opt.description}}
  b-field(label="Цена")    
    b-input(type="number", v-model="price")
  b-field(label="Авторское описание")  
    b-input(type="textarea", maxlength=200, v-model="descr")
  b-field
    button.button.is-primary.is-middle(@click="send") Сохранить  
</template>
<script>
import Naming from '@/store/naming';
export default {
  name: "",
  props: {
    mode: {required: true},
    portfolio_id: {required: true},
    portfolio_user_id: {required: true},
    categories: [],
  },
  data: () => ({
    price: 0,
    category: Object.keys(this.categories)[0] || '',
    descr: 'test descr',
  }),
  methods: {
    send(){
      this.$store.dispatch(Naming.Actions.POST_PHOTO_OFFER, {
        offer: {
          portfolioId: this.portfolio_id,
          category: this.category,
          price: parseFloat(this.price),
          description: this.descr,
        },
        userId: this.portfolio_user_id,
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
