<template>
  <tfoot style="display: 0"></tfoot>  
</template>
<script>
export default {
  name: "TableFooter",
  methods: {
    async logData() {
      // console.log(this.dataDisplayed);
      await this.$store.dispatch('dtr/dataDisplayed',this.dataDisplayed);
    }
  },
  watch: {
    dataDisplayed: {
      immediate: true,
      handler: 'logData'
    }
  },
  props: {
    data: Array,
    dataDisplayed: Array,
    dataFiltered: Array,
  }
}
</script>