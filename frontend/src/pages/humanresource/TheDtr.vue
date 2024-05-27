<template>
  <div class="col-md-12">
    <!-- button -->
    <div class="row d-flex justify-content-end p-2">
      <div class="col-md-1">
        <button
          type="button"
          @click="setSelected(true)"
          class="btn btn-block btn-success btn-sm"
        >
          Approve
        </button>
      </div>

      <div class="col-md-1">
        <button
          type="button"
          @click="setSelected(false)"
          class="btn btn-block btn-danger btn-sm"
        >
          Reject
        </button>
      </div>
    </div>
    <!-- button -->

    <router-view></router-view>
    <div class="col-md-12">
      <div class="card card-secondary">
        <!-- Spinner -->
        <div
          class="overlay"
          style="background-color: white !important"
          v-show="loading"
        >
          <loading-spinner></loading-spinner>
        </div>
        <!-- /.Spinner -->

        <div class="card-header">
          <h3 class="card-title">Attendance Approval</h3>

          <div class="card-tools">
            <button
              type="button"
              class="btn btn-tool btn-outline-secondary"
              @click="selectAll()"
            >
              <i class="fas fa-check"></i> Select all
            </button>

            <button
              type="button"
              class="btn btn-tool btn-outline-secondary"
              @click="unselectAll()"
            >
              <i class="fas fa-times"></i> Unselect all
            </button>
          </div>
        </div>
        <div class="card-body pt-0 pb-3">
          <data-table v-bind.sync="parametersTable1" />
          <tfoot style="display: 0"></tfoot>
        </div>
      </div>
    </div>

    <!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="modal-default"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <div class="overlay" v-show="isLoadingModal">
              <i class="fas fa-2x fa-sync fa-spin"></i>
            </div>
            <h6 class="modal-title"><b>Update Attendance</b></h6>
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
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <small><label for="dateNeeded">Date</label></small>
                  <date-picker
                    v-model="dtr_date"
                    valueType="format"
                    style="display: block; width: 100%; line-height: 20px border:red;"
                  ></date-picker>
                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingDate && attemptUpdate"
                    >Date is required!</small
                  >
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group">
                  <small><label for="dateNeeded">In</label></small>
                  <!-- <date-picker
                    v-model="in_am"
                    :minute-step="1"
                    format="hh:mm A"
                    value-type="format"
                    type="time"
                    style="display: block; width: 100%; line-height: 20px"
                  ></date-picker> -->
                  <date-picker
                    v-model="in_am"
                    :minute-step="1"
                    format="YYYY-MM-DD hh:mm A"
                    value-type="format"
                    type="datetime"
                    style="display: block; width: 100%; line-height: 20px"
                  ></date-picker>


                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingIn && attemptUpdate"
                    >In is required!</small
                  >
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group">
                  <small><label for="dateNeeded">Out</label></small>
                  <!-- <date-picker
                    v-model="out_pm"
                    :minute-step="1"
                    format="hh:mm A"
                    value-type="format"
                    type="time"
                    style="display: block; width: 100%; line-height: 20px"
                  ></date-picker> -->
                  <!-- 2022-08-17 12:03 AM -->
                  <date-picker
                    v-model="out_pm"
                    :minute-step="1"
                    format="YYYY-MM-DD hh:mm A"
                    value-type="format"
                    type="datetime"
                    style="display: block; width: 100%; line-height: 20px"
                  ></date-picker>

                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingOut && attemptUpdate"
                    >Out is required!</small
                  >
                </div>
              </div>
            </div>
            <!-- /.end -->
          </div>
          <div class="modal-footer justify-content-end">
            <!-- <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> -->
            <button
              type="button"
              class="btn btn-primary btn-sm"
              @click="update()"
            >
              Update
            </button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
  </div>
</template>
<script>
import DtrButton from "./DtrButton.vue";
import DtrCheckbox from "./DtrCheckbox.vue";
import TableFooter from "./TableFooter.vue";
import VsToast from "@vuesimple/vs-toast";

export default {
  name: "App",

  data() {
    return {
      requestArray: [],
      selectedData: [],
      isLoading: false,
      isItLoading: false,
      isLoadingModal: false,
      dtr_date: null,
      in_am: null,
      out_pm: null,
      modalData: {
        DepartmentName: null,
        EmployeeName: null,
        status: null,
        dtr_date: null,
        id: null,
        in_am: null,
        out_pm: null,
        positionName: null,
        selected: null,
      },
      attemptUpdate: false,
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
            key: "Select",
            sortable: false,
            component: DtrCheckbox,
          },
          {
            key: "EmployeeName",
            title: "Employee Name",
          },
          {
            key: "positionName",
            title: "Position Name",
          },
          {
            key: "DepartmentName",
            title: "Department",
          },
          {
            key: "dtr_date",
            title: "Date",
          },
          {
            key: "in_am",
            title: "In",
          },
          {
            key: "out_pm",
            title: "Out",
          },

          {
            key: "Action Button",
            sortable: false,
            component: DtrButton,
          },
        ],
        footerComponent: TableFooter,
      };
    },

    getUsersList() {
      return this.$store.getters["dtr/getSelectedDtr"];
    },

    listDtr() {
      return this.$store.getters["dtr/listDtr"];
    },

    isItLoadingVuex() {
      return this.$store.getters["dtr/isItLoading"];
    },

    loading() {
      if (this.isLoading || this.isItLoading) {
        return true;
      } else {
        return false;
      }
    },

    numberOfSelected() {
      if (this.selectedData) {
        return this.selectedData.length;
      } else {
        return 0;
      }
    },

    editableData() {
      return this.$store.getters["dtr/editableData"];
    },

    missingDate() {
      return this.dtr_date === null ? true : false;
    },
    missingIn() {
      return this.in_am === null ? true : false;
    },
    missingOut() {
      return this.out_pm === null ? true : false;
    },
  },

  watch: {
    //Navigate
    $route(newRoute) {
      this.getDtr();

      console.log(newRoute);
    },

    getUsersList(newValue) {
      this.selectedData = newValue;
    },

    listDtr(newValue) {
      this.requestArray = newValue;
    },

    isItLoadingVuex(newValue) {
      this.isItLoading = newValue;
      this.getDtr();
    },

    editableData(newValue) {
      this.dtr_date = newValue.dtr_date;
      this.in_am = newValue.in_am;
      this.out_pm = newValue.out_pm;
      this.modalData = newValue;
    },
  },

  methods: {
    async update() {
      this.attemptUpdate = true;
      this.isLoadingModal = true;
      const editedData = {
        id: this.modalData.id,
        dtr_date: this.dtr_date,
        in_am: this.in_am,
        out_pm: this.out_pm,
      };

      if (
        this.attemptUpdate === true &&
        !this.missingDate &&
        !this.missingIn &&
        !this.missingOut
      ) {
        await this.$store.dispatch("dtr/updateListDtr", editedData);
        this.openToast(
          "top-right",
          "success",
          "Attendance updated successfully"
        );
        document.getElementById("modalCloseButton").click();
        this.attemptUpdate = false;
      } else {
        this.openToast(
          "top-right",
          "error",
          "Please complete required fields!"
        );
      }

      this.isLoadingModal = false;
    },

    openToast(position, variant, message) {
      const toastTitle = variant.charAt(0).toUpperCase() + variant.slice(1);
      VsToast.show({
        title: `${toastTitle}`,
        message: `${message}`,
        variant,
        position,
      });
    },

    setToast(response, status) {
      if (response >= 200 && response <= 250) {
        this.openToast("top-right", "success", `Attendance is now ${status}`);
      } else {
        this.openToast("top-right", "error", "Please Try Again Later!");
      }
    },

    async setSelected(status) {
      const selectedData = this.$store.getters["dtr/getSelectedDtr"];

      if (selectedData.length) {
        this.isLoading = true;
        const statusArgs = status === true ? "Active" : "Reject";

        const response = await this.$store.dispatch("dtr/setSelected", {
          setStatus: statusArgs,
        });
        this.isLoading = false;
        this.setToast(response, statusArgs);
        await this.getDtr();
        this.clearSelectedData();
      } else {
        this.openToast("top-right", "error", "Attendance is not Selected!");
      }
    },

    clearSelectedData() {
      this.$store.dispatch("dtr/clearSelectedData");
    },

    async getDtr() {
      this.isLoading = true;
      const id = localStorage.getItem("id");
      await this.$store.dispatch("dtr/getDtr", id);
      this.isLoading = false;
    },

    async deleteSelectedDtr(rowData) {
      await this.$store.dispatch("dtr/deleteSelectedDtr", rowData);
    },

    selectAll() {
      // console.log(this.dataDisplayed);
      // const data = this.$store.getters['dtr/getdataDisplayed'];
      this.$store.dispatch("dtr/selectAllData");

      // console.warn(data)
    },

    unselectAll() {
      // console.log(this.dataDisplayed);

      this.$store.dispatch("dtr/unselectAllData");

      // const data = this.$store.getters['dtr/getdataDisplayed'];
      // console.warn(data)
    },
  },

  created() {
    this.getDtr();
  },
};
</script>

<style scoped>
*,
::before,
::after {
  box-sizing: border-box;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

caption {
  padding: 0.5em;
  text-align: left;
}

th,
td {
  padding: 0.5em;
  text-align: left;
  vertical-align: top;
}

.scrollable thead,
.scrollable tfoot,
.scrollable tbody,
.scrollable th,
.scrollable td {
  display: block;
  width: 100%;
}

.scrollable thead,
.scrollable tfoot,
.scrollable tbody {
  overflow-y: scroll;
}

.scrollable thead,
.scrollable tfoot {
  -ms-overflow-style: none;
}

.scrollable thead::-webkit-scrollbar,
.scrollable tfoot::-webkit-scrollbar {
  visibility: hidden;
}

.scrollable tbody {
  max-height: 20em;
  position: relative;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

.scrollable tr {
  display: flex;
}

.scrollable tbody th,
.scrollable tbody td {
  border-top: none;
}

.scrollable th:not(:last-child),
.scrollable td:not(:last-child) {
  border-right: none;
}
</style>
