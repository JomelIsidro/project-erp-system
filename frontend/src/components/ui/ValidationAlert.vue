<template>
  <div class="alert alert-danger alert-dismissible" v-if="isVisible">
    <h6><i class="icon fas fa-ban"></i>Please Complete Required Fields</h6>
    <ul>
      <li v-for="name in fields" :key="name">{{ name }} is Required!</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["fields"],
  computed: {
    isVisible() {
      if (this.fields.length > 1) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
