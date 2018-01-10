<template lang="pug">
.hero.is-fullheight
  .container.is-fullhd
    .hero-head
      .container.is-desktop
        b-collapse.panel(open.sync="formOpened", animation="fade")
          .panel-heading(slot="trigger") ФИЛЬТРЫ
          .box(style="border-radius: 0 0 10px 10px")
            b-field(grouped, group-multiline)
              b-field(label="Цена от", expanded)
                b-input(type="number", v-model="price.min")
              b-field(label="До", expanded)
                b-input(type="number", v-model="price.max")
              b-field(label="Сортировка", expanded)
                b-select(v-model="sort", expanded)  
                  option Цена
                  option Популярность
                  option Категория
              b-field(label="Категория", expanded)
                b-select(v-model="category", expanded)
                  option(v-for="category in categories") {{category}} 
            b-field(label="Поиск по автору")
              b-field
                b-input(v-model="name", type="search", icon="magnify", placeholder="Имя или фамилия...", expanded)
                .control
                  button.button.is-primary(@click="applyFilter") ИСКАТЬ      
                .control           
                  button.button.is-outlined К ВИДЕО
            noscript This form requires that you have javascript enabled to work properly please enable javascript in your browser
    .hero-body
      .catalog-finded-items
        catalog-item(v-for="offer in offers", :offer="offer", key="offer.id")
  .pagination-block
</template>
<script>
import Consts from '@/consts';
import axios from 'axios';
import CatalogItem from '@/components/catalog/catalog-item'
export default {
  name: "",
  components: {
    CatalogItem
  },
  data: () => ({
    price: {
      max: 100,
      min: 0
    },
    name: '',
    sort: 'Цена',
    offers: [],
    category: Consts.PHOTO_CATEGORIES[0],
    categories: Consts.PHOTO_CATEGORIES,
    formOpened: true,
  }),
  mounted(){
    this.queryServer(this.objToQueryString(this.$route.query))
  },

  methods: {
    queryServer(query){
      axios.get(`/api/catalog/photo?${query}`)
      .then(response => {
        this.$log.info(response.data)
        this.offers = response.data
      })
      .catch(err => {
        this.$log.error(err)
      })
    },
    applyFilter(){
      const obj = {
        name: this.name,
        sort: this.sort,
        category: this.category,
      }
      this.queryServer(this.objToQueryString(obj))
      this.$router.push(`/catalog/photo?${this.objToQueryString(obj)}`)
    },
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/css/custom';

.catalog-finded-items
  margin 0 auto
  box-sizing border-box
  display flex
  justify-content center
  min-width 320px
  flex-wrap wrap

.search-result-item
  max-height 150px
  min-height 75px
  height 150px
  display flex
  justify-content space-around
  padding 2px
  background rgba(255,255,255,0.1)
  align-items center
  margin-top 20px

.search-result-item:nth-child(2n)
  background rgba(232,232,232, 0.1)

.avatar-photo-in-item
  display block
  height 100%
  width 100%
  border-radius 10%
  border 2px solid black

.avatar-link-in-item
  display block
  height 100%
  width 100%

.avatar-photo-in-item:hover
  filter blur(2px)
  filter drop-shadow(1px 1px 3px black)


.photo-in-item
  display inline-block
  box-sizing border-box
  height 100%
  width 33%
  transition 0.05s,ease-in

.photo-in-item:hover
  border 2px solid black

.photo-in-item img
  display block
  width auto
  height auto
  min-height 100%
  max-width 100%
  max-height 100%
  margin 0 auto

.about-author-block
  display flex
  box-sizing border-box
  align-items center
  height 100%
  text-align center
  border-radius 10px
  flex-grow 1
  flex-basis 20%

.name-of-author
  text-decoration none
  colorb black

.center-button-block
  display flex
  align-items center
  justify-content center
  width 10%
  text-align center

.photo-examples-block
  display inline-flex
  height 100%
  align-items center
  flex-grow 4
  flex-basis 40%
  justify-content space-around

.form-cells-block
  width 45%
  display inline-flex
  align-items center
  justify-content space-around
  flex-wrap wrap
  padding 20px
  box-sizing border-box

.top-filter-catalog-section
  display flex
  justify-content center
  align-items center
  width 100%
  background-color rgba(200,200,200,0.2)
  margin-bottom 20px
  box-shadow 0px 5px 10px gray

.top-filter-catalog-block
  box-sizing border-box
  height 90%
  display flex
  border 4px dotted gray
  background-color rgba(200,200,200,0.2)

.catalog-filter-form-box
  display flex
  height 150px
  align-items center
  justify-content center
  font-size 0.9em
  font-family 'Code Pro Light'
  font-weight 700
  max-width $screen-lg-min
  min-width $min_width

.catalog-section, .videocatalog-section
  background-size cover

.page-wrapper.catalog-section
  padding-top 0

#logo-div
  width 170px
  height 80px
  margin-top 10px
  background url("~assets/images/canvaslogo.png")
  background-size cover
  background-position center

.about-author-block input
  text-align center
  display inline-block

.author-info
  display inline-flex
  flex-direction column
  justify-content space-around
  align-items center
  align-content center
  margin 0 auto
  height 100%
  flex-basis 33%

.catalog-filter-form-box input
  -webkit-appearance none
  -webkit-user-select none
  -moz-appearance none
  -moz-user-select none
  outline none
  height 35px
  padding-left 5px
  border none
  border-radius 10px
  font-size 0.9em
  font-family 'Code Pro Light'
  font-weight 700
  margin-top 5px

.catalog-filter-form-box input[type='text'], .catalog-filter-form-box input[type='number']
  width 100px

.catalog-filter-form-box select
  -webkit-appearance none
  -webkit-user-select none
  -moz-appearance none
  -moz-user-select none
  outline none
  height 35px
  padding 5px
  width 100px
  font-family 'Code Pro Light'
  font-weight 700
  font-size 1em
  border none
  border-radius 10px
  margin-top 5px

.catalog-filter-form-box input[type = 'submit']
  width 90%
  border 2px solid black
  filter drop-shadow(0px 0px 2px black)
  margin 0 auto
  background-color #000000
  color #ffffff
  border-radius 10px
  height 40px
  min-width 40px

.catalog-filter-form-box input[type = 'submit']:hover
  cursor pointer
  background #d3d3d3
  color #000000
  transition 0.5s

.swap-button
  display inline-block
  position relative
  text-decoration none
  color inherit
  height 35px
  padding 5px
  margin-top 5px
  width 105px
  background white
  box-sizing border-box
  letter-spacing normal
  word-spacing normal
  text-transform none
  text-indent 0px
  text-shadow none
  text-align start
  cursor pointer
  align-items flex-start
  line-height 25px
  border-radius 10px
  filter drop-shadow(1px 1px 3px black)

.swap-button:after
  position absolute
  content ''
  height 30px
  width 30px
  background url("~assets/images/reload.png")
  background-size cover
  right 10px
  bottom 4px

.swap-button:hover
  cursor pointer
  transition 0.5s
  background lightgray

.swap-button:hover:after
  transition 1s
  transform rotate(-360deg)

@media (max-width: $screen-xsm-min)
  .search-result-item
    height 80px
    font-size 0.7em
  .search-result-item .photo-examples-block:last-child
    display none
  .search-result-item .photo-examples-block
    order 2
  .search-result-item .about-author-block
    order 1
  .catalog-filter-form-box
    height 250px
  .avatar-link-in-item
    height 50px
    width 50px

// 480 - 768
@media (min-width: $screen-xsm-min) and (max-width: $screen-sm-min)
  .search-result-item
    height 90px
    font-size 0.7em
  .search-result-item .photo-examples-block:last-child
    display none
  .search-result-item .photo-examples-block
    order 2
  .search-result-item .about-author-block
    order 1
  .catalog-filter-form-box
    height 250px
  .avatar-link-in-item
    height 50px
    width 50px

// 768 - 996
@media (min-width: $screen-sm-min) and (max-width: $screen-md-min)
  .search-result-item
    height 105px
    font-size 0.8em
  .catalog-filter-form-box
    height 250px
  .avatar-link-in-item
    height 60px
    width 60px

// 996 - 1200
@media (min-width: $screen-md-min) and (max-width: $screen-lg-min)
  .search-result-item
    height 120px
    font-size 0.9em

  .catalog-filter-form-box
    height 200px

  .avatar-link-in-item
    height 80px
    width 80px

// 1200 - 1400
@media (min-width: $screen-lg-min) and (max-width: 1400px)
  .search-result-item
    height 135px
  .avatar-link-in-item
    height 90px
    width 90px
.hero.is-fullheight
  background-color #363636
  background-image url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='72' viewBox='0 0 36 72'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23fefeff' fill-opacity='0.08'%3E%3Cpath d='M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
</style>
