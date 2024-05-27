<template>
  <div class="col-md-12 mt-3">
    <!-- Form Element sizes -->
    <div class="card card-secondary">
      <div
        class="overlay"
        style="background-color: white !important"
        v-show="isLoading"
      >
        <loading-spinner></loading-spinner>
      </div>
      <div class="card-header">
        <h3 class="card-title">Itinerary Request</h3>
      </div>
      <div class="card-body">
        <!-- Step Numbers -->
        <div class="d-flex progressBarWrapper text-center">
          <div class="progressbar" :class="classA">
            <span :class="classA">1</span>
          </div>
          <div class="progressbar" :class="classB">
            <span :class="classB">2</span>
          </div>
          <div class="progressbar" :class="classC">
            <span :class="classC">3</span>
          </div>
        </div>

        <div class="d-flex text-center">
          <div class="textbar" :class="classA">
            <small
              ><span :class="classA" class="font-weight-bold"
                >Request Details</span
              ></small
            >
          </div>
          <div class="textbar" :class="classB">
            <small
              ><span :class="classB" class="font-weight-bold"
                >Itinerary Details</span
              ></small
            >
          </div>
          <div class="textbar" :class="classC">
            <small
              ><span :class="classC" class="font-weight-bold"
                >Form Review</span
              ></small
            >
          </div>
        </div>
        <!-- / Step Numbers -->

        <!-- Main Form -->

        <!-- Request Details -->
        <aside v-if="this.counter === 0">
          <div class="row mt-4">
            <div class="col-md-3">
              <div class="form-group">
                <small><label for="reference">Reference Number</label></small>
                <input
                  type="text"
                  class="form-control form-control-sm py-3"
                  id="reference"
                  disabled
                  v-model="referenceNumber"
                />
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label for="requestedDate">Requested Date</label></small>
                <date-picker
                  disabled
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px"
                  v-model="requestedDate"
                ></date-picker>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <small
                  ><label for="reportingManager selextForm" id="selextForm"
                    >Reporting Manager</label
                  ></small
                >
                <input
                  type="text"
                  id="reportingManager"
                  disabled
                  class="form-control py-3 form-control-sm"
                  v-model="reportingManagerName"
                />
              </div>
            </div>
          </div>
        </aside>
        <!-- / Request Details -->

        <!-- Itinerary Details -->
        <div class="row mt-4" v-else-if="this.counter === 1">
          <table
            class="
              table table-sm table-bordered table-striped
              mx-2
              table-responsive
              text-nowrap
            "
          >
            <thead>
              <tr>
                <th :colspan="headerActual" scope="col">
                  <aside class="d-flex align-items-center">
                    <span class="mb-1 ml-1"> Itinerary Table</span>
                  </aside>
                </th>
              </tr>
              <tr>
                <th scope="col" style="width: 5%" class="text-center">#</th>
                <th scope="col" style="width: 35%">Client Name</th>
                <th scope="col" style="width: 10%">Auth. Time Start</th>
                <th scope="col" style="width: 10%">Auth. Time End</th>
                <th v-if="isActual" style="width: 10%">Actual Time Start</th>
                <th v-if="isActual" style="width: 10%">Actual Time End</th>
                <th scope="col" style="width: 35%">Purpose</th>
              </tr>
            </thead>
            <tbody style="font-size: 14px">
              <tr v-for="(item, index) in itinerary" :key="item.id">
                <td class="text-center">{{ index + 1 }}.</td>
                <td>{{ item.client_name }}</td>
                <td>{{ item.time_start }}</td>
                <td>{{ item.time_end }}</td>
                <td v-if="isActual">{{ item.actual_start }}</td>
                <td v-if="isActual">{{ item.actual_end }}</td>
                <td>{{ item.purpose }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- /.Itinerary Details -->

        <!--  Form Review -->
        <aside v-else-if="this.counter === 2">
          <!-- Request Details Review -->
          <div class="card card-secondary mt-4">
            <div class="card-header">
              <h3 class="card-title">Request Details</h3>

              <div class="card-tools">
                <button
                  type="button"
                  class="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i class="fas fa-minus"></i>
                </button>
              </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body p-0">
              <table
                class="table table-sm table-bordered table-hover table-striped"
              >
                <tbody>
                  <tr>
                    <td>Reference Number</td>
                    <td style="width: 80%">{{ this.referenceNumber }}</td>
                  </tr>
                  <tr>
                    <td>Requested Date</td>
                    <td>{{ this.requestedDate }}</td>
                  </tr>
                  <tr>
                    <td>Reporting Manager</td>
                    <td>{{ this.reportingManagerName }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.Request Details Review -->

          <!-- Itinerary Details Review -->
          <div class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">Itinerary Details</h3>

              <div class="card-tools">
                <button
                  type="button"
                  class="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i class="fas fa-minus"></i>
                </button>
              </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body p-0">
              <table
                class="
                  table
                  table-sm
                  table-bordered
                  table-hover
                  table-striped
                  table-responsive
                  text-nowrap
                "
              >
                <thead>
                  <tr>
                    <th style="width: 5%">#</th>
                    <th style="width: 25%">Client Name</th>
                    <th style="width: 10%">Auth. Time Start</th>
                    <th style="width: 10%">Auth. Time End</th>
                    <th v-if="isActual" style="width: 10%">Auth. Time Start</th>
                    <th v-if="isActual" style="width: 10%">Auth. Time End</th>
                    <th style="width: 30%">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in itinerary" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.client_name }}</td>
                    <td>{{ item.time_start }}</td>
                    <td>{{ item.time_end }}</td>
                    <td v-if="isActual">{{ item.actual_start }}</td>
                    <td v-if="isActual">{{ item.actual_end }}</td>
                    <td>{{ item.purpose }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>

          <!-- /.Itinerary Details Review -->
        </aside>
        <!-- / Form Review -->

        <!-- / Main Form -->

        <!-- Modal -->
        <div
          class="modal fade"
          id="modal-default"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <!-- Overlay Loading Spinner -->
              <div class="overlay" v-show="isLoadingModal">
                <i class="fas fa-2x fa-sync fa-spin"></i>
              </div>

              <div class="modal-header">
                <h6 class="modal-title"><b>Withdraw Request</b></h6>
                <button
                  type="button"
                  id="modalCloseButton"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <small
                        ><label for="withdrawRemarks">Remarks</label></small
                      >
                      <textarea
                        class="form-control"
                        id="withdrawRemarks"
                        rows="5"
                        v-model="withdrawRemarks"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer justify-content-end">
                <!-- <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> -->
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  @click="withdrawn()"
                >
                  Withdrawn
                </button>
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->

        <!-- Buttons -->
        <div class="row d-flex justify-content-between mt-3">
          <aside class="col-lg-6 d-flex justify-content-start align-items-center flex-nowrap">
            
              <button
                v-show="counter"
                type="button"
                @click="counter--"
                class="btn mr-1 btn-secondary btn-sm"
              >
                Previous
              </button>
      

            
              <button
                v-if="this.counter <= 1"
                type="button"
                @click="counter++"
                class="btn mr-1 btn-primary btn-sm"
              >
                Next
              </button>
       
          </aside>

          <aside class="col-lg-6 d-flex justify-content-end align-items-center flex-nowrap">

              <button
                type="button"
                class="btn ml-1 btn-danger btn-sm"
                @click="close()"
              >
                Close
              </button>
          
          </aside>
        </div>
        <!-- / Buttons -->
      </div>
    </div>
    <!-- /.card -->
  </div>
</template>

<script>
/*eslint-disable*/
import { ModelListSelect } from "vue-search-select";
import axios from "axios";
import VsToast from "@vuesimple/vs-toast";

export default {
  components: {
    ModelListSelect,
  },
  async created() {
this.isLoading = true;
    await this.getItfMain(this.$route.params.id);
    await this.getItfDetails(this.$route.params.id);
    this.isLoading = false;
  },
  watch: {
    counter() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },

    async $route(newRoute) {
      this.counter = 0
      this.isLoading = true;
      await this.getItfMain(newRoute.params.id);
      await this.getItfDetails(newRoute.params.id);
      this.isLoading = false;
    },
  },
  computed: {
    classA() {
      return { active: this.counter >= 0 };
    },
    classB() {
      return { active: this.counter >= 1 };
    },
    classC() {
      return { active: this.counter >= 2 };
    },

    headerActual() {
      if (this.isActual === true) {
        return 7;
      } else {
        return 5;
      }
    },
  },
  data() {
    return {
      counter: 0,
      // Request Details
      referenceNumber: "",
      requestedDate: "",
      reportingManagerName: "",

      // Logged User Data
      loggedUserId: localStorage.getItem("id"),
      loggedUserFirstName: localStorage.getItem("fname"),
      loggedUserLastName: localStorage.getItem("lname"),
      loggedUserFullName: localStorage.getItem("fullName"),
      loggedUserDepartment: localStorage.getItem("department"),
      loggedUserPosition: localStorage.getItem("positionName"),
      companyId: localStorage.getItem("companyId"),
      companyName: localStorage.getItem("companyName"),

      itinerary: [],
      editItinerary: "",

      isLoading: false,
      isLoadingModal: false,
      processId: this.$route.params.id,
      form: this.$route.params.frmName,

      // modal
      withdrawRemarks: "",

      isActual: false,
    };
  },

  methods: {
    async withdrawn() {
      this.isLoadingModal = true;

      const fd = new FormData();
      fd.append("loggedUserId", this.loggedUserId);
      fd.append("loggedUserFirstName", this.loggedUserFirstName);
      fd.append("loggedUserLastName", this.loggedUserLastName);
      fd.append("loggedUserFullName", this.loggedUserFullName);
      fd.append("loggedUserDepartment", this.loggedUserDepartment);
      fd.append("loggedUserPosition", this.loggedUserPosition);
      fd.append("companyId", this.companyId);
      fd.append("companyName", this.companyName);
      fd.append("form", this.form);
      fd.append("reqId", this.processId);
      fd.append("class", "ITF");
      fd.append("withdrawRemarks", this.withdrawRemarks);

      fd.append("overtimeData", JSON.stringify(this.overtime));

      console.log(this.overtime);

      try {
        const resp = await axios.post(
          "http://127.0.0.1:8000/api/withdraw-request",
          fd
        );

        if (resp.status === 200) {
          document.getElementById("modalCloseButton").click();

          this.isLoading = false;
          this.openToast("top-right", "success", resp.data.message);
          this.$router.replace("/inprogress");
        }

        console.log(resp.data);
      } catch (err) {
        // Handle Error Here
        document.getElementById("modalCloseButton").click();
        console.error(err);
      }
    },

    async getItfMain(id) {
      // this.isLoading = true;
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/itf-main/${id}`
        );
        // console.log(resp.data);
        if (resp.status === 200) {
          // console.log(resp.data)
          // this.isLoading = false;
          this.referenceNumber = resp.data.data.reference;
          this.requestedDate = resp.data.data.date_needed;
          this.reportingManagerName = resp.data.data.reporting_manager;
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
        // this.isLoading = false;
      }
    },
    async getItfDetails(id) {
      // this.isLoading = true;
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/itf-details/${id}`
        );
        // console.log(resp.data);
        if (resp.status === 200) {
          // this.isLoading = false;
          this.itinerary = resp.data.data;

          if (resp.data.data[0].actual_end === null) {
            this.isActual = false;
          } else {
            this.isActual = true;
          }
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
        // this.isLoading = false;
      }
    },
    close() {
      this.$router.replace("/rejected");
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
  },
};
</script>

<style scoped>
.progressBarWrapper {
  margin: 20px 0px;
}
.progressbar {
  display: table-row;
  width: 100%;
  line-height: 5px;
  background-color: lightgrey;
}

.progressbar.active {
  background-color: #3c8dbc;
}

.progressbar span {
  background-color: lightgrey;
  padding: 10px 16px;
  color: white;
  border-radius: 100%;
}

.progressbar span.active {
  background-color: #3c8dbc;
}

.textbar {
  display: table-row;
  width: 100%;
  line-height: 5px;
}

.textbar span {
  color: lightgray;
}

.textbar span.active {
  color: black;
}

#assetsFieldHandle {
  opacity: 0;
  position: absolute;
  overflow: hidden;
}

#uploadText {
  cursor: pointer;
}

#uploadContainer {
  background-color: #f8f9f9;
  border-width: 5px;
  border-style: dashed;
  border-color: #99badd;

  /* opacity: 1; */
}

[v-cloak] {
  display: none;
}

.ulUpload {
  list-style: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
}
</style>
