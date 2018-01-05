<template lang="pug">
.scrollable-section.level(style="min-height: calc(100vh - 4rem)")
  .level-item
    .hero.is-medium.is-dark(style="width: 100%")
      .hero-head
      transition(name="fade", mode="out-in") 
        .hero-body(v-if="onPriceTab", key="price")
          h1 - ФОТОСЪЕМКА - 
          h2 Средняя цена за час
          .container.is-desktop
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
                    button.button.is-primary.is-medium(@click='showVideo') К ВИДЕО
        .hero-body(v-else, key="filter")
          .container.is-desktop
            .level
              .level-item
                .columns.is-gapless
                  .column.is-one-third
                    .columns.is-gapless
                      .column.is-half
                        flip-button(:description="flippers.tfp.description", size="150px")
                          img(:src="flippers.tfp.icon")
                        flip-button(:description="flippers.fashion.description", size="150px")
                          img(:src="flippers.fashion.icon")  
                      .column.is-half
                        flip-button(:description="flippers.wedding.description", size="150px")
                          img(:src="flippers.wedding.icon")
                        flip-button(:description="flippers.family.description", size="150px")
                          img(:src="flippers.family.icon")
                  .column.is-one-third
                    .columns.is-gapless
                      .column.is-half
                        flip-button(:description="flippers.holidays.description", size="150px")
                          img(:src="flippers.holidays.icon")
                        flip-button(:description="flippers.party.description", size="150px")
                          img(:src="flippers.party.icon")
                      .column.is-half
                        flip-button(:description="flippers.personal.description", size="150px")
                          img(:src="flippers.personal.icon")
                        flip-button(:description="flippers.lovestory.description", size="150px")
                          img(:src="flippers.lovestory.icon")
                  .column.is-one-third
                    .columns.is-gapless
                      .column.is-half
                        flip-button(:description="flippers.commerce.description", size="150px")
                          img(:src="flippers.tfp.icon")
                        flip-button(:description="flippers.interrior.description", size="150px")
                          img(:src="flippers.interrior.icon")
                      .column.is-half
                        flip-button(:description="flippers.objective.description", size="150px")
                          img(:src="flippers.objective.icon")
                        flip-button(:description="flippers.other.description", size="150px")
                          img(:src="flippers.other.icon")       
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
  }),
  computed: {
    pricesExtent() {
      return this.$store.state.catalog.photo.priceExtent || {min: 0, max: 100};
    },
    prices(){
      return [this.pricesExtent.min, this.pricesExtent.max];
    },
    flippers() {
      return Consts.PHOTO_FILTERS;
    }
  },
  methods: {
    showVideo () {
      this.$parent.swapPage()
    },
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
  }
}
</script>
<style lang="stylus" scoped>
</style>
