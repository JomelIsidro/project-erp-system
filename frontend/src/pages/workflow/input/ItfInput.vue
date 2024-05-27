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
                <th colspan="8" scope="col">
                  <aside class="d-flex align-items-center">
                    <span class="mb-1 ml-1"> Itinerary Table</span>
                  </aside>
                </th>
              </tr>
              <tr>
                <th scope="col" style="width: 5%" class="text-center">#</th>
                <th scope="col" style="width: 35%">Client Name</th>
                <th scope="col" style="width: 20%">Auth. Time Start</th>
                <th scope="col" style="width: 20%">Auth. Time End</th>
                <th scope="col" style="width: 20%">Actual Time Start</th>
                <th scope="col" style="width: 20%">Actual Time End</th>
                <th scope="col" style="width: 20%">Purpose</th>
                <th scope="col" style="width: 10%">Action</th>
              </tr>
            </thead>
            <tbody style="font-size: 14px">
              <tr v-for="(item, index) in itinerary" :key="item.id">
                <td class="text-center">{{ index + 1 }}.</td>
                <td>{{ item.client_name }}</td>
                <td>{{ item.time_start }}</td>
                <td>{{ item.time_end }}</td>
                <td>{{ item.actual_start }}</td>
                <td>{{ item.actual_end }}</td>
                <td>{{ item.purpose }}</td>
                <td class="pl-0 m-0">
                  <aside class="d-flex justify-content-center">
                    <button
                      class="btn btn-sm btn-info m-0"
                      @click="edit(itinerary.indexOf(item))"
                      data-toggle="modal"
                      data-target="#modal-itinerary"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                  </aside>
                </td>
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
                    <th style="width: 10%">Actual Time Start</th>
                    <th style="width: 10%">Actual Time End</th>
                    <th style="width: 30%">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in itinerary" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.client_name }}</td>
                    <td>{{ item.time_start }}</td>
                    <td>{{ item.time_end }}</td>
                    <td>{{ item.actual_start }}</td>
                    <td>{{ item.actual_end }}</td>
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

        <!-- Modal-->
        <div
          class="modal fade"
          id="modal-default"
          @click="closeModalDefault()"
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
                <h6 class="modal-title">
                  <b>{{ this.title }} Request</b>
                </h6>
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
                      <small><label for="remarks">Remarks</label></small>
                      <textarea
                        class="form-control"
                        id="remarks"
                        rows="5"
                        v-model="remarks"
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
                  @click="submit(title)"
                >
                  Submit
                </button>
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->

        <!-- Modal itinerary-->
        <div
          class="modal fade"
          id="modal-itinerary"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="overlay" v-show="isLoadingModal">
                <i class="fas fa-2x fa-sync fa-spin"></i>
              </div>

              <div class="modal-header">
                <h6 class="modal-title">
                  <b>Itinerary Details</b>
                </h6>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="closeModal()"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <the-alert
                  v-show="isAlert"
                  v-bind:header="this.header"
                  v-bind:message="this.message"
                  v-bind:type="this.type"
                ></the-alert>

                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <small
                        ><label for="projectName">Client Name</label></small
                      >

                      <input
                        type="text"
                        disabled
                        class="form-control py-3 form-control-sm"
                        v-model="this.itemModalClient.name"
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <small
                        ><label for="authTimeStart"
                          >Authorized Time Start</label
                        ></small
                      >
                      <input
                        type="text"
                        disabled
                        class="form-control py-3 form-control-sm"
                        v-model="this.authTimeStart"
                      />

                      <!-- <date-picker
                        v-model="authTimeStart"
                        :minute-step="5"
                        format="MM/DD/YYYY hh:mm A"
                        value-type="format"
                        type="datetime"
                        style="display: block; width: 100%; line-height: 20px"
                      ></date-picker> -->
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <small
                        ><label for="authTimeEnd"
                          >Authorized Time End</label
                        ></small
                      >

                      <input
                        type="text"
                        disabled
                        class="form-control py-3 form-control-sm"
                        v-model="this.authTimeEnd"
                      />

                      <!-- <date-picker
                        v-model="authTimeEnd"
                        :minute-step="5"
                        format="MM/DD/YYYY hh:mm A"
                        value-type="format"
                        type="datetime"
                        style="display: block; width: 100%; line-height: 20px"
                      ></date-picker> -->
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <small
                        ><label for="authTimeStart"
                          >Actual Time Start</label
                        ></small
                      >
                      <date-picker
                        v-model="actualTimeStart"
                        format="MM/DD/YYYY hh:mm A"
                        value-type="format"
                        type="datetime"
                        style="display: block; width: 100%; line-height: 20px"
                      ></date-picker>
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingModalActualStart && attemptUpdate"
                        >Actual Start is required!</small
                      >
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <small
                        ><label for="authTimeEnd">Actual Time End</label></small
                      >
                      <date-picker
                        v-model="actualTimeEnd"
                        format="MM/DD/YYYY hh:mm A"
                        value-type="format"
                        type="datetime"
                        style="display: block; width: 100%; line-height: 20px"
                      ></date-picker>
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingModalActualEnd && attemptUpdate"
                        >Actual End is required!</small
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <small><label for="purpose">Purpose</label></small>
                      <textarea
                        class="form-control"
                        id="purpose"
                        disabled
                        rows="3"
                        v-model="modalPurpose"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer justify-content-end">
                <button
                  type="button"
                  class="btn btn-success btn-sm"
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
        <!-- /.modal itinerary -->

        <!-- Buttons -->
        <div class="row d-flex justify-content-between mt-3">
          <aside
            class="
              col-lg-6
              d-flex
              justify-content-start
              align-items-center
              flex-nowrap
            "
          >
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

          <aside
            class="
              col-lg-6
              d-flex
              justify-content-end
              align-items-center
              flex-nowrap
            "
          >
            <button
              type="button"
              class="btn ml-1 btn-success btn-sm"
              data-toggle="modal"
              data-target="#modal-default"
              @click="setTitle('Approve')"
            >
              Approve
            </button>

            <button
              type="button"
              class="btn ml-1 btn-warning btn-sm"
              data-toggle="modal"
              data-target="#modal-default"
              @click="setTitle('Withdrawn')"
            >
              Withdrawn
            </button>

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
    await this.getItfActualDetails(this.$route.params.id);
    this.isLoading = false;
  },
  watch: {
    counter() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },

    async $route(newRoute) {
      this.isLoading = true;
      await this.getItfMain(newRoute.params.id);
      await this.getItfActualDetails(newRoute.params.id);
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

    missingModalActualStart() {
      if (this.actualTimeStart === null) {
        return true;
      } else {
        return false;
      }
    },
    missingModalActualEnd() {
      if (this.actualTimeEnd === null) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      counter: 0,
      attemptUpdate: false,
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

      // The Alert
      isAlert: false,
      header: "", // Syccess or Failed
      message: "", // added successfully
      type: "", // true or false

      // Title of modal
      title: "",

      // modal
      remarks: "",

      // modal itinerary
      index: "",
      id: "",
      client: [],
      itemModalClient: {},
      authTimeStart: null,
      authTimeEnd: null,
      actualTimeStart: null,
      actualTimeEnd: null,
      modalPurpose: "",
    };
  },

  methods: {
    async submit(type) {
      this.isLoadingModal = true;
      const fd = new FormData();

      fd.append("form", this.form);
      fd.append("processId", this.processId);
      fd.append("loggedUserId", this.loggedUserId);
      fd.append("companyId", this.companyId);
      fd.append("remarks", this.remarks);
      fd.append("loggedUserFullname", this.loggedUserFullName);
      fd.append("referenceNumber", this.referenceNumber);
      fd.append("class", "ITF");
      fd.append("loggedUserDepartment", this.loggedUserDepartment);
      fd.append("itineraryData", JSON.stringify(this.itinerary));
      fd.append("isActual", "true");

      if (type === "Approve") {
        try {
          const resp = await axios.post(
            "http://127.0.0.1:8000/api/approve-itf-actualinput",
            fd
          );

          this.isLoadingModal = false;
          document.getElementById("modalCloseButton").click();
          if (resp.status === 200) {
            // console.log(resp.data);
            this.openToast("top-right", "success", resp.data.message);
            this.$router.replace("/inprogress");
          }
        } catch (err) {
          // Handle Error Here
          console.error(err);
          this.openToast("top-right", "error", err);
        }
      }

      if (type === "Withdrawn") {
        fd.append("withdrawRemarks", this.remarks);
        fd.append("reqId", this.processId);

        try {
          const resp = await axios.post(
            "http://127.0.0.1:8000/api/withdraw-request",
            fd
          );
          console.log(resp.data);

          if (resp.status === 200) {
            document.getElementById("modalCloseButton").click();
            this.openToast("top-right", "success", resp.data.message);
            this.$router.replace("/inprogress");
          }
        } catch (err) {
          // Handle Error Here
          console.error(err);
        }
      }
    },

    update() {
      this.isLoadingModal = true;
      this.attemptUpdate = true;
      const validated = this.validateEmptyFields();
      const isGreaterThan = this.validateStartEndDate(
        this.actualTimeStart,
        this.actualTimeEnd
      );

      if (validated && isGreaterThan) {
        // start
        this.resetAlert();
        const addData = {
          id: this.id,
          main_id: this.processId,
          client_id: this.itemModalClient.code,
          client_name: this.itemModalClient.name,
          time_start: this.authTimeStart,
          time_end: this.authTimeEnd,
          actual_start: this.actualTimeStart,
          actual_end: this.actualTimeEnd,
          purpose: this.modalPurpose,
        };

        this.itinerary.splice(this.index, 1);
        this.itinerary.push(addData);

        this.addAlert("Success", "Record Updated Successfully!", "true");
        this.isLoadingModal = false;

        this.itinerary.sort(function (a, b) {
          return a.id - b.id;
        });
        // end
      } else if (isGreaterThan === false && validated) {
        this.isLoadingModal = false;
        this.addAlert(
          "Failed",
          "Authorize Time End must be greater than Authorize Time Start!",
          "false"
        );
      } else {
        this.isLoadingModal = false;
        this.addAlert("Failed", "Please complete required fields!", "false");
      }
    },

    validateEmptyFields() {
      if (!this.missingModalActualStart && !this.missingModalActualEnd) {
        return true;
      } else {
        return false;
      }
    },

    validateStartEndDate(from, to) {
      const startDate = new Date(from);
      const endDate = new Date(to);

      const check = endDate > startDate ? true : false;
      return check;
    },

    edit(index) {
      this.index = index;
      this.isButton = false;
      const seletectedItinerary = this.itinerary[index];
      this.editItinerary = seletectedItinerary;

      this.id = seletectedItinerary.id;
      this.itemModalClient = {
        code: seletectedItinerary.client_id,
        name: seletectedItinerary.client_name,
      };

      this.authTimeStart = seletectedItinerary.time_start;
      this.authTimeEnd = seletectedItinerary.time_end;
      this.actualTimeStart = this.convertTimeAndDate(
        seletectedItinerary.actual_start
      );
      this.actualTimeEnd = this.convertTimeAndDate(
        seletectedItinerary.actual_end
      );
      this.modalPurpose = seletectedItinerary.purpose;
    },

    addAlert(header, message, type) {
      this.isAlert = true;
      this.header = header;
      this.message = message;
      this.type = type;
    },

    resetAlert() {
      this.isAlert = false;
      this.header = "";
      this.message = "";
      this.type = "";
    },

    resetModal() {
      this.index = "";
      this.id = "";
      this.client = [];
      this.itemModalClient = {};
      this.authTimeStart = "";
      this.authTimeEnd = "";
      this.actualTimeStart = "";
      this.actualTimeEnd = "";
      this.modalPurpose = "";
    },

    closeModal() {
      this.resetAlert();
      this.resetModal();
    },

    setTitle(title) {
      this.title = title;
    },

    closeModalDefault() {
      this.remarks = "";
    },

    convertTimeAndDate(datetime) {
      const date = new Date(datetime);

      let month = date.getMonth() + 1;
      let day = date.getDate();
      const year = date.getFullYear();

      if (month < 10) {
        month = `0${month}`;
      }

      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      day = day < 10 ? "0" + day : day;
      const time = hours + ":" + minutes + " " + ampm;
      const dit = `${month}/${day}/${year}`;
      const dateTimeReal = `${dit} ${time}`;
      return dateTimeReal;
    },

    close() {
      this.$router.replace("/inputs");
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

    async getItfActualDetails(id) {
      // this.isLoading = true;
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/itf-actual-details/${id}`
        );
        // console.log(resp.data);
        if (resp.status === 200) {
          // this.isLoading = false;
          this.itinerary = resp.data.data;
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
        // this.isLoading = false;
      }
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
