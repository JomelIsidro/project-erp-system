<template>
    <!-- Main Footer -->
  <footer class="main-footer">
    <!-- To the right -->
    <div class="float-right d-none d-sm-inline">
      
      <strong> {{ this.companyName }} </strong>
    </div>
    <!-- Default to the left -->
    <strong>Copyright &copy; 2022 | <a href="https://www.cylix.ph/">Cylix Technologies Inc</a>.</strong>
  </footer>
</template>

<script>
export default {
  computed: {
    getFooterCompany() {
      return this.$store.getters.selectedCompany;
    },
  },

  watch: {
    getFooterCompany(newValue) {
      this.companyName = newValue;
    },
  },

  data() {
    return {
      companyName: localStorage.getItem("companyName"),
    }
  },

}
</script>