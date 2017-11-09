<template lang="pug">
transition(name='modal')
  .modal-mask
    .modal-wrapper
      .modal-container
    .modal-default-button(@click="$emit('close')") ×
</template>
<script>
export default {
  name: 'popup',
  data: () => ({

  }),
  methods: {
    getContainer() {
      return this.$el.querySelector('.modal-container');
    },
  },
};
</script>
<style>
  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity .3s ease;
}

.modal-wrapper {
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1024px;
  max-height: 756px;
  width: 80%;
  height: 80%;
  padding: 20px 30px;
  background-color: transparent;
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-container img{
  max-height: 100%;
  max-width:100%;
  width: auto;
  height: auto;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20px;
  right:20px;
  border-radius: 50%;
  border: 2px solid lightgray;
  color: lightgray;
  width:50px;
  height:50px;
  cursor: pointer;
  font-size: 35px;
}

.modal-default-button:hover {
  filter: drop-shadow(0 0 1px lightgray);
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
