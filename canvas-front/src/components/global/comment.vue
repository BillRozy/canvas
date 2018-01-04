<template lang="pug">
article.media.box(style="width: 80%")
  figure.media-left
    p.image.is-64x64
      img(:src='avatar')
  .media-content
    .content
      p
        strong {{user}}
        br
        | {{text}}   
  .media-right {{date}}          
</template>

<script>
import defaultAvatar from '@/assets/images/default-avatar-space-astronaut.png'
export default {
  data() {
    return {

    }
  },
  computed: {
    user() {return this.comment_data.user.profile.name},
    avatarsrc() { return this.comment_data.user.profile.avatar || ''},
    text() { return this.comment_data.body},
    date() { return this.comment_data.createdAt},
    avatar(){
      return this.comment_data.user.profile.avatar || defaultAvatar;
    },
  },
  props: {
      comment_data: {required: true, default: {}}
  }
}
</script>

<style lang="stylus" scoped>
.comment-avatar
    box-sizing: border-box
    width 60px
    height 60px
    border 1px solid black
    border-radius 5px 0 0 5px

.comment-user
    position absolute
    width 60px
    height 60px
    z-index 100

.comment-block .comment-user
    position relative
    align-self flex-start

.comment-block .comment-user .comment-avatar
    border-radius 5px 5px 5px 5px

.comment-body
    display inline-flex
    width 80%
    height 80px
    justify-content center
    vertical-align middle
    padding 10px

.comment-date
    display flex
    justify-content center
    align-content center
    align-items center
    width 100px
    height 80px

.comment-block
    display flex
    justify-content space-between
    align-items center
    height 80px
    margin 10px
    border 2px lightgrey solid
    border-radius 10px
    vertical-align middle
    background white
    padding 10px
    width 80%

.comment-block:nth-of-type(2n)
    background lightcyan
</style>
