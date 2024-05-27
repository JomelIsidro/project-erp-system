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
        <h3 class="card-title">Leave Request</h3>
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
                >Leave Details</span
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
                <input
                  type="text"
                  v-model="requestedDate"
                  class="form-control form-control-sm"
                  disabled
                  id="requestedDate"
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

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <small><label for="employeeName">Employee Name</label></small>
                <input
                  type="text"
                  id="reportingManager"
                  disabled
                  class="form-control py-3 form-control-sm"
                  v-model="reportingManagerName"
                />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <small
                  ><label for="mediumOfReport">Medium of Report</label></small
                >
                <input
                  type="text"
                  id="reportingManager"
                  disabled
                  class="form-control py-3 form-control-sm"
                  v-model="reportName"
                />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <small><label for="reportDateTime">Report Time</label></small>
                <input
                  type="text"
                  id="reportingManager"
                  disabled
                  class="form-control py-3 form-control-sm"
                  v-model="reportDateTime"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <small><label for="reason">Reason</label></small>
                <textarea
                  class="form-control"
                  id="reason"
                  v-model="reason"
                  rows="5"
                  disabled
                ></textarea>
              </div>
            </div>
          </div>
        </aside>
        <!-- / Request Details -->

        <!-- Leave Details -->
        <div class="row mt-4" v-else-if="this.counter === 1">
          <table class="table table-sm table-bordered table-striped mx-2">
            <thead>
              <tr>
                <th colspan="7" scope="col">
                  <aside class="d-flex align-items-center">
                    <span class="mb-1 ml-1"> Expense Detals</span>
                  </aside>
                </th>
              </tr>
              <tr>
                <th scope="col" class="text-center">#</th>
                <th scope="col">Leave Date</th>
                <th scope="col">Leave Type</th>
                <th scope="col">Half Day</th>
                <th scope="col">AM/PM</th>
                <th scope="col">Count</th>
                <th scope="col">With Pay?</th>
              </tr>
            </thead>
            <tbody style="font-size: 14px">
              <tr v-for="(item, index) in leaveData" :key="item.id">
                <td class="text-center">{{ index + 1 }}.</td>
                <td>{{ item.leave_date }}</td>
                <td>{{ item.leave_type }}</td>
                <td>{{ item.num_days === 1 ? "No" : "Yes" }}</td>
                <td>{{ item.leave_halfday }}</td>
                <td>{{ item.num_days }}</td>
                <td>
                  {{ item.leave_paytype === "wp" ? "With Pay" : "Without Pay" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- /.Leave Details -->

        <!--  Form Review -->
        <aside v-if="this.counter === 2">
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
                  <tr>
                    <td>Employee Name</td>
                    <td>{{ this.employeeName }}</td>
                  </tr>
                  <tr>
                    <td>Medium of Report</td>
                    <td>{{ this.reportName }}</td>
                  </tr>
                  <tr>
                    <td>Report Time</td>
                    <td>{{ this.reportDateTime }}</td>
                  </tr>
                  <tr>
                    <td>Reason</td>
                    <td>{{ this.reason }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.Request Details Review -->

          <!-- Leave Details Review -->
          <div class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">Leave Details</h3>

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
                    <th style="width: 10%">Leave Date</th>
                    <th style="width: 20%">Leave Type</th>
                    <th style="width: 10%">Half Day</th>
                    <th style="width: 15%">AM / PM</th>
                    <th style="width: 15%">Count</th>
                    <th style="width: 5%">With Pay?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in leaveData" :key="item.id">
                    <td class="text-center">{{ index + 1 }}.</td>
                    <td>{{ item.leave_date }}</td>
                    <td>{{ item.leave_type }}</td>
                    <td>{{ item.num_days === 1 ? "No" : "Yes" }}</td>
                    <td>{{ item.leave_halfday }}</td>
                    <td>{{ item.num_days }}</td>
                    <td>
                      {{
                        item.leave_paytype === "wp" ? "With Pay" : "Without Pay"
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.Leave Details Review -->
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
                <h6 class="modal-title">
                  <b>{{ this.title }} Request</b>
                </h6>
                <button
                  type="button"
                  id="modalCloseButton"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="closeModalDefault()"
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
                <div class="row" v-if="isForClarity">
                  <div class="col-md-12">
                    <div class="form-group">
                      <model-list-select
                        :list="recipent"
                        v-model="itemrecipient"
                        option-value="code"
                        option-text="name"
                        placeholder="Select Recipient"
                        style="padding: 9px"
                      >
                      </model-list-select>
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingModalRecipient && attemptClarify"
                        >Recipient is required!</small
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <textarea
                        class="form-control"
                        id="remarks"
                        rows="5"
                        v-model.trim="remarks"
                        placeholder="Please input request remarks here!"
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

        <!-- Buttons -->
        <div class="row d-flex justify-content-between mt-3">
          <aside class="col-lg-6 d-flex justify-content-start align-items-center flex-nowrap">
           
              <button
               v-show="counter"
                type="button"
                @click="counter--"
                class="btn mr-2 btn-secondary btn-sm"
              >
                Previous
              </button>
     

      
              <button
                v-if="this.counter <= 1"
                type="button"
                @click="counter++"
                class="btn mr-2 btn-primary btn-sm"
              >
                Next
              </button>
      
          </aside>

          <aside class="col-lg-6 d-flex justify-content-end align-items-center flex-nowrap">
            
              <button
                type="button"
                class="btn ml-2 btn-success ml-2 btn-sm"
                data-toggle="modal"
                data-target="#modal-default"
                @click="setTitle('Approve')"
              >
                Approve
              </button>
            

            
              <button
                type="button"
                class="btn ml-2 btn-danger ml-2 btn-sm"
                data-toggle="modal"
                data-target="#modal-default"
                @click="setTitle('Reject')"
              >
                Reject
              </button>
            

            
              <button
                type="button"
                class="btn ml-2 btn-warning ml-2 btn-sm"
                data-toggle="modal"
                data-target="#modal-default"
                @click="setTitle('Clarify')"
              >
                Clarify
              </button>
            

            
              <button
                type="button"
                class="btn ml-2 btn-danger ml-2 btn-sm"
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
    await this.getLafMain(this.processId, this.companyId);
    await this.getInprogressId(this.processId, this.companyId, this.form);
    await this.getRecipients(
      this.processId,
      this.loggedUserId,
      this.companyId,
      this.form
    );
  this.isLoading = false;
  },
  watch: {
    counter() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },

    async $route(newRoute) {
      this.isLoading = true;
      await this.getLafMain(newRoute.params.id, newRoute.params.frmName);
      await this.getInprogressId(newRoute.params.id, newRoute.params.frmName, this.form);
      await this.getRecipients(
        newRoute.params.id,
        this.loggedUserId,
        newRoute.params.frmName,
        this.form
      );
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

    missingModalRecipient() {
      if (this.itemrecipient.code === undefined) {
        return true;
      } else {
        return false;
      }
    },

    isForClarity() {
      if (this.title === "Clarify") {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      counter: 2,
      attemptClarify: false,
      // Request Details
      referenceNumber: "",
      requestedDate: "",
      reportingManagerName: "",
      employeeName: "",
      reportName: "",

      // reportingManager: [],
      // reportingManagerItem: {},
      // employee: [],
      // employeeItem: {},
      // report: [],
      // reportItem: {},
      reportDateTime: "",
      reason: "",

      // Logged User Data
      loggedUserId: localStorage.getItem("id"),
      loggedUserFirstName: localStorage.getItem("fname"),
      loggedUserLastName: localStorage.getItem("lname"),
      loggedUserFullName: localStorage.getItem("fullName"),
      loggedUserDepartment: localStorage.getItem("department"),
      loggedUserPosition: localStorage.getItem("positionName"),
      companyId: localStorage.getItem("companyId"),
      companyName: localStorage.getItem("companyName"),

      // // Logged User Data // initiator
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

      leaveData: [],

      isLoading: false,
      isLoadingModal: false,

      processId: this.$route.params.id,
      form: this.$route.params.frmName,

      title: "",
      recipent: [],
      itemrecipient: {},
      remarks: "",
      inprogressId: "",

      // The Alert
      isAlert: false,
      header: "", // Syccess or Failed
      message: "", // added successfully
      type: "", // true or false
    };
  },

  methods: {
    async getInprogressId(id, companyId, form) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/get-Inprogress/${id}/${companyId}/${form}`
        );
        // console.log(resp.status);
        if (resp.status === 200) {
          // this.selectedFile = resp.data.data;
          this.inprogressId = resp.data[0].inpId;
          console.log(this.inprogressId);
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    async submit(type) {
      this.isLoadingModal = true;
      const fd = new FormData();

      fd.append("form", this.form);
      fd.append("processId", this.processId);
      fd.append("loggedUserId", this.loggedUserId);
      fd.append("companyId", this.companyId);
      fd.append("recipientId", this.itemrecipient.code);
      fd.append("remarks", this.remarks);
      fd.append("inprogressId", this.inprogressId);
      fd.append("loggedUserFullname", this.loggedUserFullName);
      fd.append("referenceNumber", this.referenceNumber);
      fd.append("class", "LAF");
      fd.append("loggedUserDepartment", this.loggedUserDepartment);

      if (type === "Approve") {
        try {
          const resp = await axios.post(
            "http://127.0.0.1:8000/api/approve-request",
            fd
          );

          this.isLoadingModal = false;
          document.getElementById("modalCloseButton").click();
          if (resp.status === 200) {
            // console.log(resp.data);
            this.openToast("top-right", "success", resp.data.message);
            this.$router.replace("/approvals");
          }

          if (resp.status === 202) {
            // console.log(resp.data);
            this.openToast("top-right", "error", resp.data.message);
          }
        } catch (err) {
          // Handle Error Here
          console.error(err);
        }
      }

      if (type === "Reject") {
        try {
          const resp = await axios.post(
            "http://127.0.0.1:8000/api/reject-request",
            fd
          );

          this.isLoadingModal = false;
          document.getElementById("modalCloseButton").click();
          if (resp.status === 200) {
            // console.log(resp.data);
            this.openToast("top-right", "success", resp.data.message);
            this.$router.replace("/approvals");
          }
        } catch (err) {
          // Handle Error Here
          console.error(err);
        }
      }

      if (type === "Clarify") {
        this.attemptClarify = true;
        this.resetAlert();
        const validated = this.validateModalDefault();
        if (validated) {
          // start
          try {
            const res = await axios.post(
              "http://127.0.0.1:8000/api/send-clarity",
              fd
            );

            document.getElementById("modalCloseButton").click();
            this.openToast("top-right", "success", res.data.message);
            if (res.status === 200) {
              this.$router.replace("/approvals");
            } else {
              document.getElementById("modalCloseButton").click();
              this.openToast("top-right", "error", "Please Try again laer");
            }
          } catch (err) {
            // Handle Error Here
            // console.error(err);

            document.getElementById("modalCloseButton").click();
            this.openToast("top-right", "error", err);
          }
          // end
        } else {
          this.isLoadingModal = false;
          this.addAlert("Failed", "Please select recipent!", "false");
        }
      }
    },

    validateModalDefault() {
      if (!this.missingModalRecipient === true) {
        return true;
      } else {
        return false;
      }
    },

    async getRecipients(id, loggedUserId, companyId, form) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/getRecipient/${id}/${loggedUserId}/${companyId}/${form}`
        );

        console.log(resp.data);

        if (resp.status === 200) {
          const recipient = [];
          for (const key in resp.data) {
            const request = {
              code: resp.data[key].uid,
              name: resp.data[key].name,
            };
            recipient.push(request);
          }
          this.recipent = recipient;
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    setTitle(title) {
      this.title = title;
    },
    async getLafMain(id, companyId) {
      // this.isLoading = true;
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/get-laf-main/${id}/${companyId}`
        );

        if (resp.status === 200) {
          // this.isLoading = false;
          this.leaveData = resp.data;
          this.referenceNumber = resp.data[0].reference;
          this.requestedDate = resp.data[0].request_date;
          this.reportingManagerName = resp.data[0].reporting_manager;
          this.employeeName = resp.data[0].employee_name;
          this.reportName = resp.data[0].medium_of_report;
          this.reportDateTime = resp.data[0].report_time;
          this.reason = resp.data[0].reason;
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    close() {
      this.$router.replace("/approvals");
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

    closeModalDefault() {
      this.attemptClarify = false;
      this.itemrecipient = {};
      this.remarks = "";
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
