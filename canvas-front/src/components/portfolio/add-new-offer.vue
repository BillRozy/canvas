<template lang="pug">
.add-offer
  form.registration-box
    .category_and_price_field
      .register_field
        .register_label  Категория
        .register_field.small_mode
          select.register_field_select(v-model="category")
            option(v-for="opt in categories") {{opt}}
      .register_field
        .register_label Цена
        .register_field.small_mode
          input.register_field_price(type="number", v-model="price")
    .register_label Авторское описание
    .register_field
      textarea.register_field_description(v-model="descr")
    .register_field
      input.btn.btn-primary(type="button", @click="send")
</template>
<script>
import Naming from '@/store/naming';
export default {
  name: "",
  props: {
    mode: {required: true},
    portfolio_id: {required: true},
    categories: [],
  },
  data: () => ({
    price: 0,
    category: this.categories[0] || '',
    descr: 'test descr',
  }),
  methods: {
    send(){
      this.$store.dispatch(Naming.Actions.POST_PHOTO_OFFER, {
        portfolioId: this.portfolio_id,
        category: this.category,
        price: parseFloat(this.price),
        description: this.descr,
      })
      .then(() => {
        this.hidePopup();
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
