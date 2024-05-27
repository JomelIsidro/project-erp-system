<template>
  <aside>
    <!-- Button Plus Fixed -->
    <button
      class="fixed-button wobble"
      type="button"
      data-toggle="modal"
      data-target="#exampleModal"
    >
      <i class="fa fa-plus"></i>
    </button>
    <!-- /.Button Plus Fixed -->


    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content" style="background-color: #343a40;" >

                  <button
                  type="button"
                  class="close d-none"
                  id="modalCloseButton"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>

  <!-- start -->
  <div id="accordion">
  <div class="card m-0 p-0">
    <div class="card-header accordionheader" id="heading-1">
      <h6 class="mb-0">
        <a role="button" class="text-white" data-toggle="collapse" href="#collapse-1" aria-expanded="true" aria-controls="collapse-1">
          Accounting
        </a>
      </h6>
    </div>
    <div id="collapse-1" class="collapse" data-parent="#accordion" aria-labelledby="heading-1">
      <div class="card-body pt-3 px-3 pb-0">
        
        <div id="accordion-1">

          <div class="card">
            <div class="card-header accordionheaderOne" >
              <h6 class="mb-0">
                <a class="collapsed text-white"  @click="redirect('/the-rfp')" role="button" data-toggle="collapse" aria-expanded="false">
                  Payment
                </a>
              </h6>
            </div>

            <div class="card-header accordionheaderOne" >
              <h6 class="mb-0">
                <a class="collapsed text-white"   @click="redirect('/the-re')" role="button" data-toggle="collapse" aria-expanded="false">
                  Reimbursement
                </a>
              </h6>
            </div>

            <div class="card-header accordionheaderOne">
              <h6 class="mb-0">
                <a class="collapsed text-white"   @click="redirect('/the-pc')" role="button" data-toggle="collapse" aria-expanded="false">
                  Petty Cash
                </a>
              </h6>
            </div>

            <div class="card-header accordionheaderOne">
              <h6 class="mb-0">
                <a class="collapsed text-white"   @click="redirect('/the-caf')" role="button" data-toggle="collapse" aria-expanded="false">
                  Cash Advance
                </a>
              </h6>
            </div>



      

          </div>

          
        </div>    
        
          
      </div>
    </div>
  </div>

  <div class="card m-0 p-0">
    <div class="card-header accordionheader" id="heading-2">
      <h6 class="mb-0">
        <a role="button" class="text-white" data-toggle="collapse" href="#collapse-2" aria-expanded="true" aria-controls="collapse-2">
          Human Resource
        </a>
      </h6>
    </div>
    <div id="collapse-2" class="collapse" data-parent="#accordion" aria-labelledby="heading-2">
      <div class="card-body pt-3 px-3 pb-0">
        
        <div id="accordion-2">

          <div class="card">
            
            <div class="card-header accordionheaderOne" >
              <h6 class="mb-0">
                <a class="collapsed text-white"  @click="redirect('/the-ot')" role="button" data-toggle="collapse" aria-expanded="false">
                  Overtime
                </a>
              </h6>
            </div>

            <div class="card-header accordionheaderOne" >
              <h6 class="mb-0">
                <a class="collapsed text-white"   @click="redirect('/the-laf')" role="button" data-toggle="collapse" aria-expanded="false">
                  Leave
                </a>
              </h6>
            </div>

            <div class="card-header accordionheaderOne">
              <h6 class="mb-0">
                <a class="collapsed text-white"   @click="redirect('/the-itf')" role="button" data-toggle="collapse" aria-expanded="false">
                  Itinerary
                </a>
              </h6>
            </div>

            <div class="card-header accordionheaderOne" v-if="isManager">
              <h6 class="mb-0">
                <a class="collapsed text-white"   @click="redirect('/the-dtr')" role="button" data-toggle="collapse" aria-expanded="false">
                  Attendance Approval
                </a>
              </h6>
            </div>

            <div class="card-header accordionheaderOne">
              <h6 class="mb-0">
                <a class="collapsed text-white"   @click="redirect('/the-aex')" role="button" data-toggle="collapse" aria-expanded="false">
                  Attendance Export
                </a>
              </h6>
            </div>

          </div>

        </div>  

      </div>
    </div>
  </div>


  <div class="card m-0 p-0">
    <div class="card-header accordionheader" id="heading-3">
      <h6 class="mb-0">
        <a role="button" class="text-white" data-toggle="collapse" href="#collapse-3" aria-expanded="true" aria-controls="collapse-3">
          Sales Order
        </a>
      </h6>
    </div>
    <div id="collapse-3" class="collapse" data-parent="#accordion" aria-labelledby="heading-3">
      <div class="card-body pt-3 px-3 pb-0">
        
        <div id="accordion-2">

          <div class="card">
            
            <div class="card-header accordionheaderOne" >
              <h6 class="mb-0">
                <a class="collapsed text-white"  @click="redirect('/the-sof')"  role="button" data-toggle="collapse" aria-expanded="false">
                  Sales Order Request
                </a>
              </h6>
            </div>

            <div class="card-header accordionheaderOne" >
              <h6 class="mb-0">
                <a class="collapsed text-white"   @click="redirect('/sales-order-list')" role="button" data-toggle="collapse" aria-expanded="false">
                  Sales Order List
                </a>
              </h6>
            </div>

 

          </div>

        </div>  

      </div>
    </div>
  </div>



    <div class="card m-0 p-0">
    <div class="card-header accordionheader" id="heading-4">
      <h6 class="mb-0">
        <a role="button" class="text-white" data-toggle="collapse" href="#collapse-4" aria-expanded="true" aria-controls="collapse-4">
          Supply Chain
        </a>
      </h6>
    </div>
    <div id="collapse-4" class="collapse" data-parent="#accordion" aria-labelledby="heading-4">
      <div class="card-body pt-3 px-3 pb-0">
        
        <div id="accordion-2">

          <div class="card">
            
            <div class="card-header accordionheaderOne" >
              <h6 class="mb-0">
                <a class="collapsed text-white"  @click="redirect('/the-mrf')"  role="button" data-toggle="collapse" aria-expanded="false">
                  Materials Request
                </a>
              </h6>
            </div>



          </div>

        </div>  

      </div>
    </div>
  </div>

  <!-- <div class="card m-0 p-0">
    <div class="card-header accordionheader" id="heading-5">
      <h6 class="mb-0">
        <a role="button" class="text-white" data-toggle="collapse" href="#collapse-5" aria-expanded="true" aria-controls="collapse-5">
          Purchasing
        </a>
      </h6>
    </div>
    <div id="collapse-5" class="collapse" data-parent="#accordion" aria-labelledby="heading-5">
      <div class="card-body pt-3 px-3 pb-0">
        <div id="accordion-2">
          <div class="card">
            <div class="card-header accordionheaderOne" >
              <h6 class="mb-0">
                <a class="collapsed text-white"  @click="redirect('/the-pr')"  role="button" data-toggle="collapse" aria-expanded="false">
                  Purchase Request
                </a>
              </h6>
            </div>
          </div>
        </div>  
      </div>
    </div>
  </div> -->





</div>
          <!-- end -->

    

        </div>
      </div>
    </div>
    <!-- /.Modal -->




  </aside>
</template>

<script>
export default {
  computed:{
    isManager(){
      const isManager = localStorage.getItem("isManager");
      return (isManager === '1') ? true : false;
       
    }
  },

  methods: {
    redirect(route){
      document.getElementById("modalCloseButton").click();
      this.$router.push(route);
    },
  },
}
</script>

<style scoped>
.fixed-button {
  background-color: #343a40;
  color: #ffffff;
  border: none;
  outline: none;
  position: fixed;
  bottom: 50px;
  right: 15px;
  height: 50px;
  width: 50px;
  margin-bottom: 20px;
  border-radius: 30px;
  box-shadow: 1px 3px 5px #888888;
}

@keyframes wobble {
  16.65% {
    -webkit-transform: translateY(8px);
    -ms-transform: translateY(8px);
    transform: translateY(8px);
  }
  33.3% {
    -webkit-transform: translateY(-6px);
    -ms-transform: translateY(-6px);
    transform: translateY(-6px);
  }
  49.95% {
    -webkit-transform: translateY(4px);
    -ms-transform: translateY(4px);
    transform: translateY(4px);
  }
  66.6% {
    -webkit-transform: translateY(-2px);
    -ms-transform: translateY(-2px);
    transform: translateY(-2px);
  }
  83.25% {
    -webkit-transform: translateY(1px);
    -ms-transform: translateY(1px);
    transform: translateY(1px);
  }
  100% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
}

.wobble {
  -webkit-animation-name: wobble;
  animation-name: wobble;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
}



.mb-0 > a {
  display: block;
  position: relative;
}
.mb-0 > a:after {
  position: absolute;
  right: 0;
}




.accordionheader{
background-color: #343a40;
}
.accordionheader:hover{
background-color: #57616b;
}

.accordionheaderOne{
background-color: #57616b;
}
.accordionheaderOne:hover{
background-color: #727f8c;
}


/* #heading-2{
background-color: #343a40;
}
#heading-2:hover{
background-color: #727f8c;
} */




</style>
