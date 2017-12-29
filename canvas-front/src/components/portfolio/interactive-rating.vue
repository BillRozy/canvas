<template lang="pug">
.interactive-rating-widget
  heart-rating(:read-only="prop_state !== 'interactive' || waitingAnswer", v-model="userValue", @rating-selected="applyRating")
  ul
    li Средняя оценка: {{avg}}
    li Проголосало: {{votes}}
</template>

<script>
import UserActions from '@/communication/user-actions';
import {HeartRating} from 'vue-rate-it';
export default {
  components: {
    HeartRating,
  },
  props: {
    prop_rating: {
      required: true,
    },
    prop_portfolio_id: {
      required: true
    },
    prop_state: {
      required: true,
      default: 'interactive'
    }
  },
  data() {
    return {
      userValue: this.prop_rating.currentUserRating,
      rating: this.prop_rating,
      waitingAnswer: false,
    }
  },
  computed: {
    avg() {
      return this.rating.avg;
    },
    current(){
      return this.rating.currentUserRating;
    },
    votes() {
      return this.rating.votes;
    }
  },
  methods: {
    applyRating(rate){
      this.userValue = rate;
      this.waitingAnswer = true;
      UserActions.ratePortfolio(parseInt(this.userValue), this.prop_portfolio_id)
      .then(update => {
        this.rating = update;
        this.waitingAnswer = false;
      })
      .catch(err => {
        this.$log.error(err);
        this.waitingAnswer = true;
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
