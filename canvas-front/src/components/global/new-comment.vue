<template lang="pug">
article.media(style="width: 80%")
  figure.media-left
    p.image.is-64x64
      img(:src="avatarsrc")
  .media-content
    b-field
      p.control
        textarea.textarea(placeholder="Ввести коммент...", v-model="commentText")
    nav.level
      .level-left
        .level-item
          button.button.is-primary(@click="sendComment") Отправить    
</template>

<script>
import Naming from '@/store/naming'
export default {
  name: 'new-comment',
  data() {
      return {
          commentText: ''
      }
  },
  props: {
      user: {default: "Guest"},
      avatarsrc: {default: "some src"},
      portfolio_id: {required: true}
  },
  methods: {
      sendComment(){
        this.$store.dispatch(Naming.Actions.POST_COMMENT, {
          body: this.commentText,
          portfolioId: this.portfolio_id
        })
        .then(res => {
          this.commentText = "";
          this.$log.debug(res);
        })
        .catch(error => {
            this.$log.error(error);
        });
    }
  }
}
</script>

<style lang="stylus" scoped>
#new_comment
    display block
    position relative
    width 80%
    background white
    height 80px
    padding 5px

#new_comment textarea
    box-sizing border-box
    position absolute
    width 100%
    height 60px
    background white
    border 1px solid black
    margin 0
    padding 20px 65px
    text-decoration none
    -moz-appearance none
    border-radius 10px

#new_comment input[type = 'button']
    position absolute
    box-sizing border-box
    width 60px
    height 60px
    right -5px
    background black
    color white
    border 1px solid black
    border-radius 0 5px 5px 0
    margin 0
    transition 0.2s
    z-index 100

#new_comment input[type = 'button']:hover
    background darkgray
    cursor pointer

.make-inline
    display inline-block

.new-comment-block
    display block
    width 60%
    background white
    height 120px
    border 1px lightgrey solid
    border-radius 10px
    padding 10px
    margin 10px
    min-width 255px

.comment-user
    position absolute
    width 60px
    height 60px
    z-index 100

.comment-avatar
    box-sizing border-box
    width 60px
    height 60px
    border 1px solid black
    border-radius 5px 0 0 5px
</style>
