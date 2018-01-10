<template lang="pug">
.form-for-new-photo
  div(style="color: white") Перетащите фаши фотографии в область загрузки или кликните на область для выбора
  .place-for-drop
</div>
</template>
<script>
import Dropzone from 'dropzone';
import EventBus from '@/eventbus'
Dropzone.autoDiscover = false;
export default {
  name: "",
  data: () => ({
    category: '',
  }),
  computed:{
    token() {
      return this.$store.state.session.token;
    }
  },
  mounted(){
    const myDropzone = new Dropzone(this.$el.querySelector('.place-for-drop'), {
      url: "/api/photos/?category=" + this.category,
      paramName: () => {
        return 'photos';
      },
      maxFilesize: 5, // MB
      maxFiles: 10,
      uploadMultiple: true,
      parallelUploads: 10,
      headers: {"Authorization": 'Bearer ' + this.token},
    });
    this.$el.querySelector(".place-for-drop").classList.add("dropzone");
    myDropzone.on('successmultiple', (file, data) => {
      EventBus.$emit(EventBus.Events.PHOTO_UPDATE, {
        photos: data
      })
      this.$log.debug(data);
    });
  }
}
</script>
<style lang="stylus" scoped>
.form-for-new-photo
  max-height 600px
  max-width 800px
</style>
