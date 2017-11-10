import Vue from 'vue'
const EventBus = new Vue({
  data: {
    Events: {
      PHOTO_UPDATE: 'photo update',
    }
  }
});
export default EventBus;
