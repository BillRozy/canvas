<template lang="pug">
.scrollable-section
  .transparent-block300
  #photoslide.whitestripe(v-show='onPriceTab')
    h1 - Photo -
    h2 average per hour
    .slider-section
      input.slider-left-value(type='text')
      .slider
      input.slider-right-value(type='text')
    .two-buttons-adaptive-pane
      input.btn-search(type='submit', value='SEARCH', @click='onPriceTab = false;')
      .swap-section(@click='showVideo')
        .swap-section-button
        div ON VIDEO
  #photoslide-filters.whitestripe(v-show='!onPriceTab')
    .filter-and-controls-section
      .filter-section-back-step ON PRICE
        .filter-section-back-step-button(@click='onPriceTab = true;')
      .filter-section
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#photo_filter_form', '#photo_category_field', 'TFP')")
          .filter-section-item-flipper
            #filter-item-front-1.filter-section-item-flipper-front
            .filter-section-item-flipper-back TFP
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#photo_filter_form', '#photo_category_field', 'Fashion')")
          .filter-section-item-flipper
            #filter-item-front-2.filter-section-item-flipper-front
            .filter-section-item-flipper-back FASHION
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#photo_filter_form', '#photo_category_field', 'Wedding')")
          .filter-section-item-flipper
            #filter-item-front-3.filter-section-item-flipper-front
            .filter-section-item-flipper-back WEDDING
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#photo_filter_form', '#photo_category_field', 'Children and Family')")
          .filter-section-item-flipper
            #filter-item-front-4.filter-section-item-flipper-front
            .filter-section-item-flipper-back CHILDREN AND FAMILY
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#photo_filter_form', '#photo_category_field', 'Holidays')")
          .filter-section-item-flipper
            #filter-item-front-5.filter-section-item-flipper-front
            .filter-section-item-flipper-back HOLIDAYS
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#photo_filter_form', '#photo_category_field', 'Party')")
          .filter-section-item-flipper
            #filter-item-front-6.filter-section-item-flipper-front
            .filter-section-item-flipper-back PARTY
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#photo_filter_form', '#photo_category_field', 'Personal')")
          .filter-section-item-flipper
            #filter-item-front-7.filter-section-item-flipper-front
            .filter-section-item-flipper-back PERSONAL
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#photo_filter_form', '#photo_category_field', 'Love Story')")
          .filter-section-item-flipper
            #filter-item-front-8.filter-section-item-flipper-front
            .filter-section-item-flipper-back LOVE STORY
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#photo_filter_form', '#photo_category_field', 'Commerce')")
          .filter-section-item-flipper
            #filter-item-front-9.filter-section-item-flipper-front
            .filter-section-item-flipper-back COMMERCE
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#photo_filter_form', '#photo_category_field', 'Interior')")
          .filter-section-item-flipper
            #filter-item-front-10.filter-section-item-flipper-front
            .filter-section-item-flipper-back INTERIOR
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#photo_filter_form', '#photo_category_field', 'Objective')")
          .filter-section-item-flipper
            #filter-item-front-11.filter-section-item-flipper-front
            .filter-section-item-flipper-back OBJECTIVE
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#photo_filter_form', '#photo_category_field', 'Others')")
          .filter-section-item-flipper
            #filter-item-front-12.filter-section-item-flipper-front
            .filter-section-item-flipper-back OTHERS
      .filter-section-next-step
</template>
<script>
import noUiSlider from 'nouislider'
export default {
  data: () => ({
    onPriceTab: true,
    slider: null,
  }),
  computed: {
    prices(){
      return this.$store.state.catalog.photo.priceExtent;
    }
  },
  methods: {
    showVideo () {
      this.$parent.swapPage()
    },
    createSlider(){
      noUiSlider.create(this.slider, {
        start: [ this.prices.min, this.prices.max ],
        step: 1,
        connect: true,
        range: {
          'min': this.prices.min,
          'max': this.prices.max
        }
      })
      const snapValues = [
        this.$el.querySelector('.slider-left-value'),
        this.$el.querySelector('.slider-right-value')
      ]

      this.slider.noUiSlider.on('update', function (values, handle) {
        snapValues[handle].value = Math.round(values[handle])
      })
    }
  },
  watch: {
    prices() {
      this.createSlider();
    }
  },
  mounted () {
    this.slider = this.$el.querySelector('.slider')
  }
}
</script>
<style lang="stylus" scoped>
</style>
