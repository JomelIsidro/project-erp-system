<template>
 <!-- Modal -->
    <div
      class="modal fade"
      id="modal-status"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Overlay Loading Spinner -->
          <div class="overlay" v-show="isItLoading">
            <i class="fas fa-2x fa-sync fa-spin"></i>
          </div>
          <!-- /.Overlay Loading Spinner -->


          <div class="modal-header">
            <h6 class="modal-title">
              <b>Request Status</b>
            </h6>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
    
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- Start -->
              <table
                class="table table-sm table-bordered table-hover table-striped"
              >
                <thead>

                  <tr style="font-size: 13px;">
                    <th >Approver</th>
                    <th >Status</th>
                    <th >Approved By</th>
                    <th >Approved Date and Time</th>
                    <th >Comments</th>
                  </tr>
                </thead>
                <tbody style="font-size: 13px;">
                  <tr v-for="item in status" :key="item.ID" >
                    <td>{{ item.USER_GRP_IND }}</td>
                    <td>{{ item.STATUS }}</td>
                    <td>{{ item.Approved_By }}</td>
                    <td>{{ item.signDateTime }}</td>
                    <td>{{ item.ApprovedRemarks }}</td>
                  </tr>
                </tbody>
              </table>


            <!-- End -->
          </div>

        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->


</template>


<script>
export default {
  data() {
    return {
      isItLoading: true,
    }
  },

  props:{
    status: {
        type: Array,
        required: false,
    },
  },

  computed: {
    isItLoadingVuex(){
      return this.$store.getters["remarks/isItLoading"];
    }
  },

  watch: {
    isItLoadingVuex(newValue) {
      this.isItLoading = newValue;
    },
  },

}
</script>