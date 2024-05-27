<template>
  <div class="action-buttons d-flex justify-content-center m-0 p-0">
    <button
      data-toggle="tooltip"
      data-placement="top"
      :class="isClick"
      title="Add to Selected List"
      @click="handleAction()"
    >
      <i :class="isIcon"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "PrCheckbox",
  computed: {
    isClick() {
      if (this.data.selected) {
        return "btn btn-info btn-sm";
      } else {
        // console.log(this.data.selected)
        return "btn btn-outline-info btn-sm";
      }
    },

    isIcon() {
      if (this.data.selected) {
        return "fas fa-check";
      } else {
        return "fas fa-circle";
      }
    },

    // data.selected() {
        
    //     return this.$store.getters['pr/findSelectedPr'];
    // },
  },
  data() {
    return {
      test: 0,
    };
  },

  methods: {
    handleAction() {
      this.$store.dispatch("pr/selectRequest", this.data);
    },
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>