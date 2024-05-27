<template>
      <!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="modal-message"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content ">
        <!-- Overlay Loading Spinner -->
          <div class="overlay" v-show="isItLoading">
            <i class="fas fa-2x fa-sync fa-spin"></i>
          </div>
          <div class="modal-header">

            <h6 class="modal-title"><b>Request Remarks</b></h6>
            <button
              type="button"
              class="close"
              id="modalCloseButton"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- start -->
     

        <!-- Timelime example  -->
        <div class="row" v-if="frmName" >
          <div class="col-md-12">
            <!-- The time line -->
            <div class="timeline">
              <!-- timeline time label -->
              <div class="time-label">
                <span class="bg-secondary">{{ frmName }}</span>
              </div>
              <!-- /.timeline-label -->


              <!-- Rosevir Perspective -->
              <!-- timeline item -->
              <div v-for="(item) in remarks" :key="item.ID">
                <i class="fas fa-comments bg-blue"></i>

                <div class="timeline-item" v-if="isInitiator">
                  <span class="time"><i class="fas fa-building"></i> {{ item.USERLEVEL }}</span>
                  
                  <span class="time"><i class="fas fa-clock"></i> {{ item.DTLogs }}</span>
        
                    <h3 class="timeline-header" v-if="item.SETTLED === 'NO' "><a href="#">{{ item.SENDERNAME }}</a> clarify your request</h3>
                    <h3 class="timeline-header" v-else><a href="#">{{(item.SENDERID === loggedUserId) ? "You" : item.SENDERNAME }}</a> replied to <a href="#">{{ item.RECEIVERNAME }}</a></h3>
                  
                  <div class="timeline-body" v-if="item.MESSAGE" >
                  {{ item.MESSAGE }}
                  </div>

                </div>


                <!-- Konrad Perspective -->
                <div class="timeline-item" v-else-if="isClarityBy">
                  <span class="time"><i class="fas fa-building"></i> {{ item.USERLEVEL }}</span>

                  <span class="time"><i class="fas fa-clock"></i> {{ item.DTLogs }}</span>
        
                  <h3 class="timeline-header" v-if="item.SETTLED === 'NO' "><a href="#">You</a> clarified the request of <a href="#">{{ item.RECEIVERNAME }}</a></h3>
                  <h3 class="timeline-header"  v-else><a href="#">{{ item.SENDERNAME }}</a> replied to <a href="#">You</a></h3>


                  <div class="timeline-body" v-if="item.MESSAGE" >
                  {{ item.MESSAGE }}
                  </div>

              </div>
                

                <!-- Carrie Perspective -->
                <div class="timeline-item" v-else>
                  <span class="time"><i class="fas fa-building"></i> {{ item.USERLEVEL }}</span>

                  <span class="time"><i class="fas fa-clock"></i> {{ item.DTLogs }}</span>
        
                  <h3 class="timeline-header" v-if="item.SETTLED === 'NO' "><a href="#">{{ item.SENDERNAME }}</a> clarified the request of <a href="#">{{ item.RECEIVERNAME }}</a></h3>
                  <h3 class="timeline-header"  v-else><a href="#">{{ item.SENDERNAME }}</a> replied to <a href="#">{{ item.RECEIVERNAME }}</a></h3>


                  <div class="timeline-body" v-if="item.MESSAGE" >
                  {{ item.MESSAGE }}
                  </div>

                </div>



              </div>
              <!-- END timeline item -->




  

            </div>
          </div>
          <!-- /.col -->
        </div>
      <!-- /.timeline -->

      <div v-else>
        <h6>No Remarks / Messages</h6>
      </div>










            <!-- /.end -->
          </div>

        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->


</template>

<script>
export default {
  data() {
    return {
      loggedUserId: localStorage.getItem("id"),
      isItLoading: true,
    }
  },

  props:{
    remarks: {
        type: Array,
        required: false,
    },
  },

  computed: {
    frmName(){
      if(this.remarks){
        if(this.remarks.length > 0){
         return this.remarks[0].FRM_NAME
        } else {
          return null
        }
      } else {
        return false
      }

    },

    // check if the requester is initiator
    isInitiator(){
      if(this.loggedUserId === this.remarks[0].INITID){
        return true;
      } else {
        return false;
      }
    },

    // check if the logged user is the one who clarifies
    isClarityBy(){
        if(this.loggedUserId === this.remarks[0].SENDERID){
          return true
        } else {
          return false
        }
    },

    // loading spinner for modal while waiting
    isItLoadingVuex(){
      return this.$store.getters["remarks/isItLoading"];
    }
  },

  watch: {
     isItLoadingVuex(newValue) {
      this.isItLoading = newValue;
    },
  },

  methods: {
    test(){
      console.log(this.remarks)
    }
  },
}
</script>