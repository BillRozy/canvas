<template lang="pug">
.page-wrapper
  .portfolio-main-section
    #switch-buttons-block
      #photocamera-button.tabs_button.tabs_button_fade.active_tab_button.active_tab_button_fade(clicked='true')
      #videocamera-button.tabs_button.tabs_button_fade(clicked='false')
      .simple_button(v-if='isOwner && inEditMode', id='done_edit_portfolio_button')
      .simple_button(v-if='isOwner && !inEditMode',id='edit_portfolio_button')
    #categories_container.tabs_container_fade
      #photo-categories-block.tab_item_fade.active_tab_fade
      #video-categories-block.tab_item_fade
    .info_and_avatar_block
      a(href='')
        img.avatar-photo(src='avatar')
      .name-surname-block
        span.name-of-author {{name}}
        span.name-of-author {{surname}}
    #rating-regards-block
      #rating-wrapper(v-if='signed_in')
      #rating-wrapper(v-else='', style='pointer-events:none;')
  #contact-and-info-buttons-block
    #contact-author-button(clicked='false')  Contact
    #show-info-author-button(clicked='false') Personal info
  #onButton-clicked-author-block.moving-block-with-information(style='display: none;')
  .tabs_container
    .tab_item.active_tab
      .container
        .spoiler-title
          h1  Photo offer
        .spoiler-body
    .tab_item
      .container
        .spoiler-title
          h1 Video Offer
        .spoiler-body
  #comments.container
    spoiler(title="Комментарии")
      comment(v-for="comment in comments", :comment_data="comment", key="comment.id")
      new-comment(:portfolio_id="portfolio.id", :user="$store.state.user.username", :avatarsrc="$store.state.user.profile.avatar")
</template>
<script>
import Naming from '@/store/naming';
import Spoiler from '@/components/global/spoiler.vue'
import Comment from '@/components/global/comment.vue'
import NewComment from '@/components/global/new-comment.vue'
const TAG = "Portfolio";
export default {
  name: "",
  data: () => ({
    portfolio: {},
    inEditMode: false,
  }),
  components: {
    Comment, Spoiler, NewComment
  },
  computed: {
    isOwner() {
      this.portfolio.id === this.$store.state.user.portfolioId;
    },
    name(){

    },
    surname(){

    },
    signed_in(){
      return true;
    },
    comments(){
      return this.portfolio.comments;
    }

  },
  created() {
    this.$store.dispatch(Naming.Actions.GET_PORTFOLIO, {userid: this.$route.params.id})
    .then(portfolio => {
      this.portfolio = portfolio;
    })
    .catch(err => {
      this.$log.error(TAG, err);
    })
  },
  mounted(){}
}
</script>
<style lang="stylus" scoped>
</style>
