<template lang="pug">
.form-for-new-photo
  div(style="color: white") Перетащите фаши фотографии в область загрузки или кликните на область для выбора
  .place-for-drop
</div>
</template>
<script>
import Dropzone from 'dropzone';
Dropzone.autoDiscover = false;
export default {
  name: "",
  data: () => ({
    category: 'wedding',
  }),
  computed:{
    token() {
      return this.$store.state.user.token;
    }
  },
  mounted(){
    this.$log.info(this.token);
    const myDropzone = new Dropzone('.place-for-drop', {
      url: "/api/photos/" + this.category + "/upload",
      paramName: "photos",
      headers: {"Authorization": 'Bearer ' + this.token},
      uploadMultiple: true
    });
    this.$el.querySelector(".place-for-drop").classList.add("dropzone");
    myDropzone.on('success', (file, data) => {
      this.$log.debug(data);
    });
    myDropzone.on('processingmultiple', (files) => {
      this.$log.debug(files);
    })
  }
}
</script>
<style lang="stylus" scoped>
</style>
