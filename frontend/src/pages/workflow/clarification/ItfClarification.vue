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
                  v-model="this.referenceNumber"
                />
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label for="requestedDate">Requested Date</label></small>
                <!-- <date-picker
                  disabled
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px"
                  v-model="requestedDate"
                ></date-picker> -->

                <input
                  type="text"
                  class="form-control form-control-sm py-3"
                  id="reference"
                  disabled
                  v-model="requestedDate"
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <small
                  ><label for="reportingManager selextForm" id="selextForm"
                    >Reporting Manager</label
                  ></small
                >
                <model-list-select
                  :list="reportingManager"
                  v-model="reportingManagerItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px"
                  v-if="this.isInitiator"
                >
                </model-list-select>
                <input
                  v-else
                  type="text"
                  id="reportingManager"
                  disabled
                  class="form-control py-3 form-control-sm"
                  v-model="this.reportingManagerItem.name"
                />
                <small
                  class="text-danger p-0 m-0"
                  v-if="missingReportingManager && attemptNext"
                  >Reporting Manager is required!</small
                >
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
                <th v-if="isInitiator">
                  <aside class="text-center">
                    <button
                      class="btn btn-sm btn-success m-0"
                      data-toggle="modal"
                      data-target="#modal-itinerary"
                      @click="setButton()"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
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
                <th v-if="isInitiator" scope="col" style="width: 10%">
                  Action
                </th>
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

                <td class="pl-0 m-0" v-if="isInitiator">
                  <aside class="d-flex justify-content-center">
                    <button
                      class="btn btn-sm btn-info m-0"
                      @click="edit(itinerary.indexOf(item))"
                      data-toggle="modal"
                      data-target="#modal-itinerary"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-danger m-0 ml-1"
                      @click="trash(itinerary.indexOf(item))"
                    >
                      <i class="fas fa-trash"></i>
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
                    <td>{{ this.reportingManagerItem.name }}</td>
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
                    <th v-if="isActual" style="width: 10%">
                      Actual Time Start
                    </th>
                    <th v-if="isActual" style="width: 10%">Actual Time End</th>
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
         

            <aside  v-if="this.counter <= 1">
              <button
                v-if="isInitiator"
                type="button"
                @click="next()"
                class="btn mr-1 btn-primary btn-sm"
              >
                NextInit
              </button>
              <button
                v-else
                type="button"
                @click="counter++"
                class="btn mr-1 btn-primary btn-sm"
              >
                Next
              </button>
            </aside>
          </aside>

          <aside class="col-lg-6 d-flex justify-content-end align-items-center flex-nowrap">
            
              <button
                type="button"
                class="btn ml-1 btn-warning btn-sm"
                data-toggle="modal"
                data-target="#modal-default"
              >
                Reply
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
            <h6 class="modal-title"><b>Reply Request</b></h6>
            <button
              type="button"
              class="close"
              id="modalCloseButton"
              data-dismiss="modal"
              aria-label="Close"
              @click="closeDefaultModal()"
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
                  <small><label for="remarks">Remarks</label></small>
                  <textarea
                    class="form-control"
                    id="remarks"
                    rows="5"
                    v-model.trim="remarks"
                  ></textarea>
                  <small
                    class="text-danger p-0 m-0"
                    v-if="this.missingModalDefaultRemarks && attemptReply"
                    >Remarks is required!</small
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-end">
            <!-- <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> -->
            <button
              type="button"
              class="btn btn-primary btn-sm"
              @click="replyValidate()"
            >
              Reply
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
                  <small><label for="projectName">Client Name</label></small>
                  <model-list-select
                    :list="client"
                    v-model="itemModalClient"
                    option-value="code"
                    option-text="name"
                    placeholder="Select Project Name"
                    style="padding: 9px"
                  >
                  </model-list-select>
                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingModalClient && attemptInsert"
                    >Client Name is required!</small
                  >
                </div>
              </div>
            </div>
            <!-- Auth time start -->
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <small
                    ><label for="authTimeStart"
                      >Authorized Time Start</label
                    ></small
                  >
                  <date-picker
                    v-model="authTimeStart"
                    format="MM/DD/YYYY hh:mm A"
                    value-type="format"
                    type="datetime"
                    style="display: block; width: 100%; line-height: 20px"
                  ></date-picker>
                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingModalAuthStart && attemptInsert"
                    >Authorized Time Start is required!</small
                  >
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <small
                    ><label for="authTimeEnd">Authorized Time End</label></small
                  >
                  <date-picker
                    v-model="authTimeEnd"
                    format="MM/DD/YYYY hh:mm A"
                    value-type="format"
                    type="datetime"
                    style="display: block; width: 100%; line-height: 20px"
                  ></date-picker>
                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingModalAuthEnd && attemptInsert"
                    >Authorized Time End is required!</small
                  >
                </div>
              </div>
            </div>
            <!-- /. auth time end -->

            <!-- Actual time start -->
            <div class="row" v-if="isActual">
              <div class="col-md-6">
                <div class="form-group">
                  <small
                    ><label for="actualTimeStart"
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
                    v-if="missingModalActualStart && attemptInsert"
                    >Actual Time End is required!</small
                  >
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <small
                    ><label for="actualTimeEnd">Actual Time End</label></small
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
                    v-if="missingModalActualEnd && attemptInsert"
                    >Actual Time End is required!</small
                  >
                </div>
              </div>
            </div>
            <!-- /. Actual time end -->

            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <small><label for="purpose">Purpose</label></small>
                  <textarea
                    class="form-control"
                    id="purpose"
                    rows="3"
                    v-model.trim="modalPurpose"
                  ></textarea>
                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingModalPurpose && attemptInsert"
                    >Purpose is required!</small
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-end">
            <button
              v-if="isButton"
              type="button"
              class="btn btn-success btn-sm"
              @click="insert()"
            >
              Insert
            </button>

            <button
              v-else
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
    // Request Details
this.isLoading = true;
    await this.getItfMain(this.processId);
    await this.getItfDetails(this.processId);
    await this.getBusinessList(this.companyId);
    await this.getReportingManager(this.loggedUserId);
    await this.getActualSign(this.processId, this.form, this.companyId);
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
      await this.getItfDetails(newRoute.params.id);
      await this.getBusinessList(this.companyId);
      await this.getReportingManager(this.loggedUserId);
      await this.getActualSign(newRoute.params.id, newRoute.params.frmName, this.companyId);
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

    missingReportingManager() {
      if (this.reportingManagerItem.code === undefined) {
        return true;
      } else {
        return false;
      }
    },

    missingModalDefaultRemarks() {
      if (this.remarks.length === 0) {
        return true;
      } else {
        return false;
      }
    },

    missingModalClient() {
      if (this.itemModalClient.code === undefined) {
        return true;
      } else {
        return false;
      }
    },

    missingModalAuthStart() {
      if (this.authTimeStart === null) {
        return true;
      } else {
        return false;
      }
    },

    missingModalAuthEnd() {
      if (this.authTimeEnd === null) {
        return true;
      } else {
        return false;
      }
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

    missingModalPurpose() {
      if (this.modalPurpose.length === 0) {
        return true;
      } else {
        return false;
      }
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
      attemptNext: false,
      attemptNextOne: false,
      attemptReply: false,
      attemptInsert: false,
      // Request Details
      referenceNumber: "",
      requestedDate: "",
      reportingManager: [],
      reportingManagerItem: {},
      // purpose: "",

      // Logged User Data
      loggedUserId: localStorage.getItem("id"),
      loggedUserFirstName: localStorage.getItem("fname"),
      loggedUserLastName: localStorage.getItem("lname"),
      loggedUserFullName: localStorage.getItem("fullName"),
      loggedUserDepartment: localStorage.getItem("department"),
      loggedUserPosition: localStorage.getItem("positionName"),
      companyId: localStorage.getItem("companyId"),
      companyName: localStorage.getItem("companyName"),

      // // Logged User Data
      // loggedUserId: 136,
      // loggedUserFirstName: "Rosevir",
      // loggedUserLastName: "Ceballos",
      // loggedUserFullName: "Rosevir Ceballos Jr.",
      // loggedUserDepartment: "Information Technology",
      // loggedUserPosition: "Senior Developer",
      // companyId: 1,
      // companyName: "Cylix Technologies Inc.",

      // // approver
      // loggedUserId: 11,
      // loggedUserFirstName: "Konrad",
      // loggedUserLastName: "Chua",
      // loggedUserFullName: "Konrad Chua",
      // loggedUserDepartment: "Management",
      // loggedUserPosition: "Managing Director",
      // companyId: 1,
      // companyName: "Cylix Technologies Inc.",

      // // approver 2
      // loggedUserId: 12,
      // loggedUserFirstName: "Carrie",
      // loggedUserLastName: "Chua Lee",
      // loggedUserFullName: "Carrie Chua Lee",
      // loggedUserDepartment: "Accounting and Finance",
      // loggedUserPosition: "Accounting and Finance Head",
      // companyId: 1,
      // companyName: "Cylix Technologies Inc.",

      // The Alert
      isAlert: false,
      header: "", // Syccess or Failed
      message: "", // added successfully
      type: "", // true or false

      // itinerary Modal Details
      client: [],
      itemModalClient: {},
      authTimeStart: null,
      authTimeEnd: null,
      actualTimeStart: null,
      actualTimeEnd: null,
      modalPurpose: "",

      index: "",

      itinerary: [],
      editItinerary: "",

      isActual: false,
      isLoading: false,
      isLoadingModal: false,
      form: this.$route.params.frmName,
      processId: this.$route.params.id,
      isButton: true,
      overtime: [],
      editOvertime: [],
      i: 0,

      isInitiator: false,

      remarks: "",
    };
  },

  methods: {
    async reply() {
      this.isLoadingModal = true;
      const fd = new FormData();
      fd.append("reportingManagerId", this.reportingManagerItem.code);
      fd.append("reportingManagerName", this.reportingManagerItem.name);

      fd.append("form", this.form);
      fd.append("processId", this.processId);

      fd.append("remarks", this.remarks);

      fd.append("class", "ITF");
      fd.append("referenceNumber", this.referenceNumber);

      fd.append("requestedDate", this.requestedDate);

      fd.append("projectId", 0);
      fd.append("projectName", this.loggedUserDepartment);
      fd.append("clientId", 0);
      fd.append("clientName", this.companyName);
      fd.append("payeeName", "N/A");
      fd.append("amount", 0);

      fd.append("isActual", this.isActual);

      fd.append("loggedUserId", this.loggedUserId);
      fd.append("loggedUserFirstName", this.loggedUserFirstName);
      fd.append("loggedUserLastName", this.loggedUserLastName);
      fd.append("loggedUserFullName", this.loggedUserFullName);
      fd.append("loggedUserDepartment", this.loggedUserDepartment);
      fd.append("loggedUserPosition", this.loggedUserPosition);
      fd.append("companyId", this.companyId);
      fd.append("companyName", this.companyName);

      fd.append("itineraryData", JSON.stringify(this.itinerary));

      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/reply-request",
          fd
        );

        document.getElementById("modalCloseButton").click();

        if (res.status === 200) {
          this.isLoading = false;

          this.openToast("top-right", "success", res.data.message);
          this.$router.replace("/approvals");
        }

        if (res.status === 202) {
          this.isLoading = false;

          // console.log(res)
          this.openToast("top-right", "error", res.data.message);
        }
      } catch (err) {
        this.isLoading = false;

        // Handle Error Here
        console.error(err);
        this.openToast("top-right", "error", err);
      }
    },

    replyValidate() {
      this.attemptReply = true;
      if (!this.missingModalDefaultRemarks) {
        this.resetAlert();
        this.reply();
      } else {
        this.addAlert("Failed", "Please complete required fields!", "false");
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

          if (resp.data.data.UID === parseInt(this.loggedUserId)) {
            this.isInitiator = true;
          } else {
            this.isInitiator = false;
          }
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

    async getActualSign(id, form, companyId) {
      // this.isLoading = true;
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/general-actual-sign/${id}/${form}/${companyId}`
        );

        if (resp.status === 200) {
          // this.isLoading = false;

          const reportingManagerItem = {
            code: resp.data[0].RM_ID,
            name: resp.data[0].REPORTING_MANAGER,
          };
          this.reportingManagerItem = reportingManagerItem;
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
        // this.isLoading = false;
      }
    },

    async getReportingManager(rmid) {
      // this.isLoading = true;
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/reporting-manager/${rmid}`
        );

        if (resp.status === 200) {
          // this.isLoading = false;

          const reportingManager = [];
          for (const key in resp.data) {
            const request = {
              code: resp.data[key].RMID,
              name: resp.data[key].RMName,
            };
            reportingManager.push(request);
          }
          this.reportingManager = reportingManager;
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
        // this.isLoading = false;
      }
    },
    close() {
      this.$router.replace("/clarifications");
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

    closeDefaultModal() {
      this.remarks = "";
      this.attemptReply = false;
      this.resetAlert();
    },

    next() {
      if (this.counter === 0) {
        this.attemptNext = true;
        if (!this.missingReportingManager) {
          this.counter++;
        }
      } else if (this.counter === 1) {
        this.attemptNext = false;
        this.attemptNextOne = true;
        if (this.itinerary.length > 0) {
          this.counter++;
        } else {
          this.openToast(
            "top-right",
            "warning",
            "Please add your Itineray data!"
          );
        }
      }
    },

    closeModal() {
      this.resetAlert();
      this.resetModal();
    },

    async submit() {
      this.isLoading = true;
      const fd = new FormData();

      fd.append("requestedDate", this.requestedDate);

      fd.append("reportingManagerId", this.reportingManagerItem.code);
      fd.append("reportingManagerName", this.reportingManagerItem.name);

      fd.append("loggedUserId", this.loggedUserId);
      fd.append("loggedUserFirstName", this.loggedUserFirstName);
      fd.append("loggedUserLastName", this.loggedUserLastName);
      fd.append("loggedUserFullName", this.loggedUserFullName);
      fd.append("loggedUserDepartment", this.loggedUserDepartment);
      fd.append("loggedUserPosition", this.loggedUserPosition);
      fd.append("companyId", this.companyId);
      fd.append("companyName", this.companyName);
      fd.append("form", "Itinerary Request");
      fd.append("class", "ITF");

      fd.append("itineraryData", JSON.stringify(this.itinerary));

      try {
        const resp = await axios.post("http://127.0.0.1:8000/api/save-itf", fd);

        if (resp.status === 200) {
          this.isLoading = false;
          this.openToast("top-right", "success", resp.data.message);
          this.$router.replace("/inprogress");
        }
        console.log(resp.data);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    // Request Details
    todaysDate() {
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      const todaysDate = yyyy + "-" + mm + "-" + dd;
      this.requestedDate = todaysDate;
      // return todaysDate;
    },

    // Overtime Details
    async getBusinessList(companyId) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/business-list/${companyId}`
        );
        if (resp.status === 200) {
          const client = [];
          for (const key in resp.data) {
            const request = {
              code: resp.data[key].Business_Number,
              name: resp.data[key].business_fullname,
            };
            client.push(request);
          }
          this.client = client;
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    update() {
      this.isLoadingModal = true;
      this.attemptInsert = true;
      this.resetAlert();

      const isGreaterThanAuth = this.validateStartEndDate(
        this.authTimeStart,
        this.authTimeEnd
      );
      // shell
      if (this.isActual === true) {
        const validated = this.validateActualEmptyFields();
        const isGreaterThanActual = this.validateStartEndDate(
          this.actualTimeStart,
          this.actualTimeEnd
        );

        if (validated && isGreaterThanAuth && isGreaterThanActual) {
          this.updateItfData();
        } else if (
          isGreaterThanAuth === false &&
          isGreaterThanActual === false &&
          validated
        ) {
          this.isLoadingModal = false;
          this.addAlert(
            "Failed",
            "Time End must be greater than Time Start!",
            "false"
          );
        } else if (isGreaterThanAuth === false && validated) {
          this.isLoadingModal = false;
          this.addAlert(
            "Failed",
            "Authorize Time End must be greater than Authorize Time Start!",
            "false"
          );
        } else if (isGreaterThanActual === false && validated) {
          this.isLoadingModal = false;
          this.addAlert(
            "Failed",
            "Actual Time End must be greater than Actual Time Start!",
            "false"
          );
        } else {
          this.isLoadingModal = false;
          this.addAlert("Failed", "Please complete required fields!", "false");
        }
      } else {
        const validated = this.validateAuthEmptyFields();
        if (validated && isGreaterThanAuth) {
          this.updateItfData();
        } else if (isGreaterThanAuth === false && validated) {
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
      }
      // back shell
    },

    updateItfData() {
      const addData = {
        id: this.editItinerary.id,
        main_id: this.processId,
        client_id: this.itemModalClient.code,
        client_name: this.itemModalClient.name,
        time_start: this.authTimeStart,
        time_end: this.authTimeEnd,
        actual_start: this.authTimeStart,
        actual_end: this.authTimeEnd,
        purpose: this.modalPurpose,
      };
      this.itinerary.push(addData);
      this.addAlert("Success", "Added Successfully!", "true");
      this.itinerary.splice(this.index, 1);
      this.itinerary.sort(function (a, b) {
        return a.id - b.id;
      });
      this.resetModal();
      this.isLoadingModal = false;
    },

    edit(index) {
      this.isButton = false;
      this.index = index;
      const seletectedItinerary = this.itinerary[index];
      this.editItinerary = seletectedItinerary;

      this.itemModalClient = {
        code: seletectedItinerary.client_id,
        name: seletectedItinerary.client_name,
      };

      this.authTimeStart = this.convertTimeAndDate(
        seletectedItinerary.time_start
      );
      this.authTimeEnd = this.convertTimeAndDate(seletectedItinerary.time_end);
      this.modalPurpose = seletectedItinerary.purpose;

      if (this.isActual === true) {
        this.actualTimeStart = this.convertTimeAndDate(
          seletectedItinerary.actual_start
        );
        this.actualTimeEnd = this.convertTimeAndDate(
          seletectedItinerary.actual_end
        );
      }
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

    setButton() {
      this.isButton = true;
    },

    trash(index) {
      this.itinerary.splice(index, 1);
    },

    resetAlert() {
      this.isAlert = false;
      this.header = "";
      this.message = "";
      this.type = "";
    },

    addAlert(header, message, type) {
      this.isAlert = true;
      this.header = header;
      this.message = message;
      this.type = type;
    },

    validateAuthEmptyFields() {
      if (
        !this.missingModalClient &&
        !this.missingModalAuthStart &&
        !this.missingModalAuthEnd &&
        !this.missingModalPurpose
      ) {
        return true;
      } else {
        return false;
      }
    },

    validateActualEmptyFields() {
      if (
        !this.missingModalActualStart &&
        !this.missingModalActualEnd &&
        !this.missingModalClient &&
        !this.missingModalAuthStart &&
        !this.missingModalAuthEnd &&
        !this.missingModalPurpose
      ) {
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

    insert() {
      this.attemptInsert = true;
      this.isLoadingModal = true;
      this.resetAlert();
      const isGreaterThanAuth = this.validateStartEndDate(
        this.authTimeStart,
        this.authTimeEnd
      );

      // shell
      if (this.isActual === true) {
        const validated = this.validateActualEmptyFields();
        const isGreaterThanActual = this.validateStartEndDate(
          this.actualTimeStart,
          this.actualTimeEnd
        );

        if (validated && isGreaterThanAuth && isGreaterThanActual) {
          this.insertItfData();
        } else if (
          isGreaterThanAuth === false &&
          isGreaterThanActual === false &&
          validated
        ) {
          this.isLoadingModal = false;
          this.addAlert(
            "Failed",
            "Time End must be greater than Time Start!",
            "false"
          );
        } else if (isGreaterThanAuth === false && validated) {
          this.isLoadingModal = false;
          this.addAlert(
            "Failed",
            "Authorize Time End must be greater than Authorize Time Start!",
            "false"
          );
        } else if (isGreaterThanActual === false && validated) {
          this.isLoadingModal = false;
          this.addAlert(
            "Failed",
            "Actual Time End must be greater than Actual Time Start!",
            "false"
          );
        } else {
          this.isLoadingModal = false;
          this.addAlert("Failed", "Please complete required fields!", "false");
        }
      } else {
        const validated = this.validateAuthEmptyFields();
        if (validated && isGreaterThanAuth) {
          this.insertItfData();
        } else if (isGreaterThanAuth === false && validated) {
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
      }
      // unshell
    },

    insertItfData() {
      const addData = {
        id: this.i++,
        main_id: this.processId,
        client_id: this.itemModalClient.code,
        client_name: this.itemModalClient.name,
        time_start: this.authTimeStart,
        time_end: this.authTimeEnd,
        actual_start: this.actualTimeStart,
        actual_end: this.actualTimeEnd,
        purpose: this.modalPurpose,
      };

      this.itinerary.push(addData);
      this.addAlert("Success", "Added Successfully!", "true");
      this.resetModal();
      this.isLoadingModal = false;
    },

    resetModal() {
      this.attemptInsert = false;
      this.authTimeStart = null;
      this.authTimeEnd = null;
      this.actualTimeStart = null;
      this.actualTimeEnd = null;
      this.modalPurpose = "";
      this.itemModalClient = {};
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
