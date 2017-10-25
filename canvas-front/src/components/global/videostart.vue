<template lang="pug">
.scrollable-section
  .transparent-block300
  #videoslide.whitestripe(v-show='onPriceTab')
    h1 - Video -
    h2 average per hour
    .slider-section
      input.slider-left-value(type='text')
      .slider
      input.slider-right-value(type='text')
    .two-buttons-adaptive-pane
      input.btn-search(type='submit', value='SEARCH', @click='onPriceTab = false;')
      .swap-section(@click='showPhoto')
        .swap-section-button
        div ON Photo
  #videoslide-filters.whitestripe(v-show='!onPriceTab')
    .filter-and-controls-section
      .filter-section-back-step К ЦЕНЕ
        .filter-section-back-step-button(@click='onPriceTab = true;')
      .filter-section
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#video_filter_form', '#video_category_field', 'Клипы')")
          .filter-section-item-flipper
            #videofilter-item-front-1.filter-section-item-flipper-front
            .filter-section-item-flipper-back КЛИПЫ
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#video_filter_form', '#video_category_field', 'Творческие')")
          .filter-section-item-flipper
            #videofilter-item-front-2.filter-section-item-flipper-front
            .filter-section-item-flipper-back ТВОРЧЕСКИЕ
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#video_filter_form', '#video_category_field', 'Свадьбы')")
          .filter-section-item-flipper
            #videofilter-item-front-3.filter-section-item-flipper-front
            .filter-section-item-flipper-back СВАДЬБЫ
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#video_filter_form', '#video_category_field', 'Праздники')")
          .filter-section-item-flipper
            #videofilter-item-front-4.filter-section-item-flipper-front
            .filter-section-item-flipper-back ПРАЗДНИКИ
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#video_filter_form', '#video_category_field', 'Вечеринки')")
          .filter-section-item-flipper
            #videofilter-item-front-5.filter-section-item-flipper-front
            .filter-section-item-flipper-back ВЕЧЕРИНКИ
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#video_filter_form', '#video_category_field', 'Love Story')")
          .filter-section-item-flipper
            #videofilter-item-front-6.filter-section-item-flipper-front
            .filter-section-item-flipper-back Love Story
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#video_filter_form', '#video_category_field', 'Коммерческие')")
          .filter-section-item-flipper
            #videofilter-item-front-7.filter-section-item-flipper-front
            .filter-section-item-flipper-back КОММЕРЧЕСКИЕ
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#video_filter_form', '#video_category_field', 'Другие')")
          .filter-section-item-flipper
            #videofilter-item-front-8.filter-section-item-flipper-front
            .filter-section-item-flipper-back ДРУГИЕ
        a.filter-section-item(ontouchstart="$(this).toggleClass('hover');", onclick="setAndSubmit('#video_filter_form', '#video_category_field', 'Motion Design')")
          .filter-section-item-flipper
            #videofilter-item-front-9.filter-section-item-flipper-front
            .filter-section-item-flipper-back Motion Design
      .filter-section-next-step
</template>
<script>
import noUiSlider from 'nouislider'
export default {
  data: () => ({
    onPriceTab: true
  }),
  methods: {
    showPhoto () {
      this.$parent.swapPage()
    }
  },
  mounted () {
    const slider = this.$el.querySelector('.slider')
    noUiSlider.create(slider, {
      start: [ 0, 100 ],
      step: 1,
      connect: true,
      range: {
        'min': 0,
        'max': 100
      }
    })
    const snapValues = [
      this.$el.querySelector('.slider-left-value'),
      this.$el.querySelector('.slider-right-value')
    ]

    slider.noUiSlider.on('update', function (values, handle) {
      snapValues[handle].value = Math.round(values[handle])
    })
  }
}
</script>
<style lang="stylus" scoped>
</style>
