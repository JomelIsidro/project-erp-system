<template>
  <aside class="col-md-12">
    <router-view></router-view>
    <div class="col-md-12 mt-3">
      <div class="card card-secondary">
                      <div
        class="overlay"
        style="background-color: white !important"
        v-show="isLoadingSpinner"
      >
        <loading-spinner></loading-spinner>
      </div>
        <div class="card-header">
          <h3 class="card-title">Sales Order List</h3>
        </div>
        <div class="card-body pt-0 pb-3">
          <data-table v-bind="parametersTable1" />
        </div>
      </div>
    </div>

  <modal-remarks :remarks="remarks"></modal-remarks>
  <modal-status :status="status"></modal-status>





  </aside>
</template>
<script>
import ActionButtons from "../ActionButtons.vue";
export default {
  name: "App",

  data() {
    return {
      isLoadingSpinner: false,
      requestArray: [],
      remarks: [],
      status: [],
    };
  },

  computed: {
    parametersTable1() {
      return {
        data: this.requestArray,
        
        tableClass:
          "table table-sm table-striped table-bordered small table-hover",
        columns: [
          {
            key: "reference",
            title: "Reference",
          },
          {
            key: "requestType",
            title: "Request Type",
          },
          {
            key: "date",
            title: "Request Date",
          },
          {
            key: "client",
            title: "Client Name",
          },
          {
            key: "project",
            title: "Project Name",
          },
          {
            key: "payee",
            title: "Payee",
          },
          {
            key: "initiator",
            title: "Initiator",
          },
          {
            key: "amount",
            title: "Amount",
          },
          {
            key: "Action Button",
            sortable: false,
            component: ActionButtons,
          },
        ],
      };
    },

    getRemarks(){
      return this.$store.getters["remarks/getRemarks"];
    },

    getStatus(){
      return this.$store.getters["status/getStatus"];
    },
    
  },

  watch: {
    //Navigate
    $route(newRoute) {
      if(newRoute.name === undefined) {
        this.getApprovals();
        console.log(newRoute)
      }
    },

    getRemarks(newValue) {
      this.remarks = newValue
    },

    getStatus(newValue) {
      this.status = newValue
    },


  },
  methods: {
    async getApprovals() {
      this.isLoadingSpinner = true    

      const companyId = localStorage.getItem("companyId");


      const response = await fetch(
        `http://127.0.0.1:8000/api/getLists/${companyId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const responseData = await response.json();

      
      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to fetch Apprval Requests."
        );
        throw error;
      }

      this.requestArray = responseData.data;
      this.isLoadingSpinner = false   


    },
  },

  created() {
   this.getApprovals();

  },
};
</script>
