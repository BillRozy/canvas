<template lang="pug">
section.section
  .container.is-desktop.is-fullheight
    .tile.is-ancestor(v-if="!!event")
      .tile.is-vertical.is-12
        .tile
          .tile.is-parent.is-vertical.is-4
            article.tile.is-child
              figure.image.is-4by3
                img(:src='image')
            article.tile.is-child.notification.is-warning
              .content
                span Добавлено: {{date}}
          .tile.is-parent.is-8
            article.tile.notification.is-child
              .content
                p.title {{title}}
                p {{text}}
        .tile.is-parent
          article.tile.is-child.notification.is-primary
            

</template>

<script>
import {getEventById} from '@/communication/common'
export default {
  name: 'event',
  data() {
    return {
      event: null,
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
    init() {
      getEventById(this.$route.params.id)
      .then(event => {
        this.event = event;
      })
      .catch(err => {
        this.$log.error(err);
      })
    }
  },
  beforeRouteUpdate () {
    this.init();
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.init();
    })
  } 
}
  
</script>

<style lang="stylus">

</style>