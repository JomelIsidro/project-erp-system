<template>
  <div id="overlay" :class="isShow">
    <div class="w-100 d-flex justify-content-center align-items-center">
      <i class="fas fa-2x fa-sync fa-spin"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    isShow(){
      if (this.show === true) {
        return 'd-flex'
      } else {
        return 'd-none'
      }
    }
  },
};
</script>

<style scoped>
#overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
</style>
