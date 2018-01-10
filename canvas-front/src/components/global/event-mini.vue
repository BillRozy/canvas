<template lang="pug">
.card.event-mini(@click="goToFullMode")
  .card-image
    figure.image.is-4by3(style="max-width: 256px; max-height: 192px")
      img(:src='image', alt='Placeholder image')
  .card-content(style="height: 128px")
    .media
      .media-content
        p.title.is-4 {{title}}
    .content
      p {{summary}}
  .card-footer(style="height: 64px")
    .card-footer-item
      time {{date}}
    .card-footer-item {{category}}
</template>

<script>
export default {
  name: 'event-mini',
  props: {
    event: {required: true}
  },
  data() {
    return {

    }
  },
  computed: {
    image() {
      return this.event.image;
    },
    text() {
      return this.event.body;
    },
    summary() {
      return this.event.summary;
    },
    title() {
      return this.event.title;
    },
    category() {
      return this.event.category;
    },
    date() {
      return this.formatSeqDateString(this.event.updatedAt);
    }
  },
  methods: {
    goToFullMode() {
      this.$router.push(`/events/${this.event.id}`)
    }
  }
}
  
</script>

<style lang="stylus">
.event-mini
  max-width 256px
  width 256px
  height 384px
  margin 10px
  transition 0.15s
  cursor pointer
  &:hover
    transform scale(1.05)
  .card-image
    border-bottom 1px solid lightgray

</style>