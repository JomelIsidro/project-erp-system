<template>
  <div class="action-buttons d-flex justify-content-center m-0 p-0">
    <button
      data-toggle="tooltip"
      data-placement="top"
      title="Approve"
      class="btn btn-outline-success ml-1 btn-sm"
      @click="handleAction('approve')"
    >
      <i class="fas fa-thumbs-up"></i>
    </button>
    <button
      data-toggle="tooltip"
      data-placement="top"
      title="Reject"
      class="btn btn-outline-danger ml-1 btn-sm"
      @click="handleAction('reject')"
    >
      <i class="fas fa-thumbs-down"></i>
    </button>
    <button
      data-toggle="modal"
      data-placement="top"
      title="Edit"
      class="btn btn-outline-warning ml-1 btn-sm"
      data-target="#modal-default"
      @click="editModal()"
    >
      <i class="fas fa-edit"></i>
    </button>
  </div>
</template>
<script>
import VsToast from "@vuesimple/vs-toast";

export default {
  data() {
    return {
      dtr_date: null,
      in_am: null,
      out_pm: null,
    };
  },

  name: "DtrButton",
  // inject: ["handleAction"],
  methods: {
    openToast(position, variant, message) {
      const toastTitle = variant.charAt(0).toUpperCase() + variant.slice(1);
      VsToast.show({
        title: `${toastTitle}`,
        message: `${message}`,
        variant,
        position,
      });
    },

    editModal() {
      this.$store.dispatch("dtr/editModal", this.data);
    },

    async handleAction(actionName) {
      // const id = this.data.id; // 123
      // // const name = this.data.workflow+'byId'; // inprogressbyId

      // const workflow = this.data.workflow // inprogress
      // const frmclass = this.data.frmClass // requestforpayment
      // const frmName = this.data.requestType
      // const name = frmName+'-'+this.data.workflow; // inprogressbyId

      if (actionName === "approve") {

        await this.$store.dispatch("dtr/setLoading");
        const resp = await this.$store.dispatch("dtr/set", {
          data:this.data,
          setStatus: "Active",
        });
        await this.$store.dispatch("dtr/setLoading");
        this.setToast(resp, 'Active');

      }

      if (actionName === "reject") {
        await this.$store.dispatch("dtr/setLoading");
        const resp = await this.$store.dispatch("dtr/set", {
          data:this.data,
          setStatus: "Reject",
        });
        await this.$store.dispatch("dtr/setLoading");
        this.setToast(resp, 'Reject');
      }

      if (actionName === "edit") {
        alert("edit");
      }
    },

    setToast(response,status) {
      if (response >= 200 && response <= 250) {
        this.openToast("top-right", "success", `Attendance is now ${status}`);
      } else {
        this.openToast("top-right", "error", "Please Try Again Later!");
      }
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
