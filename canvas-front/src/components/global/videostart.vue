<template lang="pug">
.scrollable-section.level(style="min-height: calc(100vh - 4rem)")
  .level-item
    .hero.is-medium.is-dark(style="width: 100%")
      .hero-head
      transition(name="fade", mode="out-in") 
        .hero-body(v-if="onPriceTab", key="price")
          h1 - ВИДЕОСЪЕМКА - 
          h2 Средняя цена за час
          .container.is-desktop.flippers-holder
            .level
              .level-item
                vue-slider(v-model="modelPrices", :min="prices[0]", :max="prices[1]", width="100%", height="8", 
                :dotSize="32", tooltip="always",formatter="RUB {value}", :tooltipStyle="{backgroundColor: '#8c67ef', borderColor: '#666'}",
                :processStyle="{backgroundColor: '#999'}")
            .level
              .level-item
                .field.has-addons
                  .control
                    button.button.is-light.is-medium(@click='onPriceTab = false;') ИСКАТЬ
                  .control  
                    button.button.is-primary.is-medium(@click='showVideo') К ФОТО
        .hero-body(v-else, key="filter")
          .container.is-desktop.flippers-holder(style="max-width: 100vw")
            .level
              .level-item(style="max-width: 80%; flex-wrap: wrap; margin: 0 auto")
                flip-button(v-for="(flipper, index) in flippers", :key="index", :description="flipper.description", :size="flipperSize")
                  img(:src="flipper.icon")      
            .level
              .level-item
                  .control
                    button.button.is-primary.is-medium(@click='onPriceTab = true;') НАЗАД К ЦЕНЕ

      .hero-foot
</template>
<script>
import VueSlider from 'vue-slider-component'
import FlipButton from '@/components/global/flip-button';
import Consts from '@/consts'
export default {
  components: {
    VueSlider, FlipButton
  },
  data: () => ({
    onPriceTab: true,
    modelPrices: [0, 100],
    flipperSize: 150,
    onMobile: false,
  }),
  computed: {
    pricesExtent() {
      return this.$store.state.catalog.video.priceExtent || {min: 0, max: 100};
    },
    prices(){
      return [this.pricesExtent.min, this.pricesExtent.max];
    },
    flippers() {
      return Consts.VIDEO_FILTERS;
    }
  },
  methods: {
    showVideo () {
      this.$parent.swapPage()
    },
    checkMobile(){
      this.isMobile = window.innerWidth <= 768
    },
    flipperCalc(){
      return this.$el.querySelector('.flippers-holder').clientWidth * 0.8/6
    }
  },
  watch: {
    prices: {
      handler: function () {
        this.modelPrices = this.prices;
      },
      deep: true
    }
  },
  mounted () {
    this.checkMobile();
    this.flipperSize = this.flipperCalc();
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.checkMobile();
        this.flipperSize = this.flipperCalc();
      } , 250);
    });
  }
}
</script>
<style lang="stylus" scoped>
</style>
