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
        <h3 class="card-title">Cash Advance Request</h3>
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
        </div>

        <div class="d-flex text-center">
          <div class="textbar" :class="classA">
            <small
              ><span :class="classA" class="font-weight-bold"
                >Cash Advance Details</span
              ></small
            >
          </div>
          <div class="textbar" :class="classB">
            <small
              ><span :class="classB" class="font-weight-bold"
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
                  :value="this.referenceNumber"
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
                <!-- <model-list-select
                  :list="reportingManager"
                  v-model="reportingManagerItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px; background-color: #e9ecef"
                  :isDisabled="true"
                >
                </model-list-select> -->

                <input
                  type="text"
                  class="form-control form-control-sm py-3"
                  id="reference"
                  disabled
                  :value="this.reportingManagerItem.name"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <small><label for="dateNeeded">Date Needed</label></small>
                <date-picker
                  v-model="dateNeeded"
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px border:red;"
                  :disabled="true"
                ></date-picker>
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small
                  ><label for="requestedAmount">Requested Amount</label></small
                >
                <input
                  type="text"
                  @keyup="formatCurrency($event)"
                  @blur="formatCurrency($event, 'blur')"
                  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                  class="form-control form-control-sm py-3"
                  id="requestedAmount"
                  v-model="requestedAmount"
                  :disabled="true"
                />
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small
                  ><label for="payableDateFrom">Payable Date From</label></small
                >
                <date-picker
                  v-model="payableDateFrom"
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px border:red;"
                  :disabled="true"
                ></date-picker>
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small
                  ><label for="payableDateTo">Payable Date To</label></small
                >
                <date-picker
                  v-model="payableDateTo"
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px border:red;"
                  :disabled="true"
                ></date-picker>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <small><label for="dateNeeded">Employee Name</label></small>
                <model-list-select
                  :list="employee"
                  v-model="employeeItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px; background-color: #e9ecef"
                  :isDisabled="true"
                >
                </model-list-select>
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small
                  ><label for="installmentAmount"
                    >Installment Amount</label
                  ></small
                >
                <input
                  type="text"
                  @keyup="formatCurrency($event)"
                  @blur="formatCurrency($event, 'blur')"
                  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                  class="form-control form-control-sm py-3"
                  id="installmentAmount"
                  v-model="installmentAmount"
                  :disabled="true"
                />
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small
                  ><label for="approvedAmount">Approved Amount</label></small
                >
                <input
                  type="text"
                  @keyup="formatCurrencyofApprovedAmount($event)"
                  @blur="formatCurrencyofApprovedAmount($event, 'blur')"
                  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                  class="form-control form-control-sm py-3"
                  id="approvedAmount"
                  v-model="approvedAmount"
                  :disabled="isFirstApprover === false"
                />

                <small
                  class="text-danger p-0 m-0"
                  v-if="missingApprovedAmount && attemptSubmitApprove"
                  >Approved Amount is required!</small
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
                  name="purpose"
                  id="purpose"
                  v-model.trim="purpose"
                  rows="5"
                  disabled
                ></textarea>
              </div>
            </div>
          </div>
        </aside>
        <!-- / Request Details -->

        <!--  Form Review -->
        <aside v-else-if="this.counter === 1">
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

          <!-- Cash Advance Details Review -->
          <div class="card card-secondary mt-4">
            <div class="card-header">
              <h3 class="card-title">Cash Advance Details</h3>

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
                    <td>Date Needed</td>
                    <td style="width: 80%">{{ this.dateNeeded }}</td>
                  </tr>

                  <tr>
                    <td>Requested Amount</td>
                    <td>{{ this.requestedAmount }}</td>
                  </tr>

                  <tr>
                    <td>Payable Date From</td>
                    <td>{{ this.payableDateFrom }}</td>
                  </tr>

                  <tr>
                    <td>Payable Date To</td>
                    <td>{{ this.payableDateTo }}</td>
                  </tr>

                  <tr>
                    <td>Employee Name</td>
                    <td>{{ this.employeeItem.name }}</td>
                  </tr>

                  <tr>
                    <td>Installment Amount</td>
                    <td>{{ this.installmentAmount }}</td>
                  </tr>

                  <tr>
                    <td>Approved Amount</td>
                    <td>{{ this.approvedAmount }}</td>
                  </tr>

                  <tr>
                    <td>Purpose</td>
                    <td>{{ this.purpose }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.Cash Advance Details Review -->
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
              class="btn mr-2 btn-secondary btn-sm"
            >
              Previous
            </button>

            <button
              v-if="this.counter <= 0"
              type="button"
              @click="counter++"
              class="btn mr-2 btn-primary btn-sm"
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
              class="btn btn-success btn-sm ml-2"
              data-toggle="modal"
              data-target="#modal-default"
              @click="setTitle('Approve')"
            >
              Approve
            </button>

            <button
              type="button"
              class="btn btn-danger btn-sm ml-2"
              data-toggle="modal"
              data-target="#modal-default"
              @click="setTitle('Reject')"
            >
              Reject
            </button>

            <button
              type="button"
              class="btn btn-warning btn-sm ml-2"
              data-toggle="modal"
              data-target="#modal-default"
              @click="setTitle('Clarify')"
            >
              Clarify
            </button>

            <button
              type="button"
              class="btn btn-danger btn-sm ml-2"
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
    // Request Details
    this.isLoading = true;
    await this.getReportingManager();
    await this.getEmployees(this.companyId);
    await this.getCaf(this.processId);
    await this.getInprogressId(this.processId, this.companyId, this.form);
    await this.getActualSign(this.processId, this.form, this.companyId);
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
      await this.getReportingManager();
      await this.getEmployees(this.companyId);
      await this.getCaf(newRoute.params.id);
      await this.getInprogressId(
        newRoute.params.id,
        this.companyId,
        newRoute.params.frmName
      );
      await this.getActualSign(
        newRoute.params.id,
        newRoute.params.frmName,
        this.companyId
      );
      await this.getRecipients(
        newRoute.params.id,
        this.loggedUserId,
        this.companyId,
        newRoute.params.frmName
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

    isForClarity() {
      if (this.title === "Clarify") {
        return true;
      } else {
        return false;
      }
    },

    missingApprovedAmount() {
      if (
        this.approvedAmount.length === 0 ||
        parseFloat(this.approvedAmount) < 1
      ) {
        return true;
      } else {
        return false;
      }
    },

    missingModalRecipient() {
      if (this.itemrecipient.code === undefined) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      isLoading: false,
      isLoadingModal: false,
      counter: 0,
      setIndex: "",
      attemptNext: false,
      attemptNextOne: false,
      attemptInsert: false,
      attemptSubmitApprove: false,

      // Request Details
      referenceNumber: "",
      requestedDate: "",
      reportingManager: [],
      reportingManagerItem: {},
      dateNeeded: null,
      requestedAmount: "",
      requestedRealamount: "",
      payableDateFrom: null,
      payableDateTo: null,
      employee: [],
      employeeItem: {},
      installmentAmount: "",
      installmentRealAmount: "",
      approvedAmount: "",
      approvedtRealAmount: "",
      purpose: "",

      // Logged User Data
      loggedUserId: localStorage.getItem("id"),
      loggedUserFirstName: localStorage.getItem("fname"),
      loggedUserLastName: localStorage.getItem("lname"),
      loggedUserFullName: localStorage.getItem("fullName"),
      loggedUserDepartment: localStorage.getItem("department"),
      loggedUserPosition: localStorage.getItem("positionName"),
      companyId: localStorage.getItem("companyId"),
      companyName: localStorage.getItem("companyName"),

      form: this.$route.params.frmName,
      processId: this.$route.params.id,

      title: "",
      remarks: "",

      recipent: [],
      itemrecipient: {},

      // The Alert
      isAlert: false,
      header: "", // Syccess or Failed
      message: "", // added successfully
      type: "", // true or false

      isFirstApprover: false,

      inprogressId: "",
      attemptClarify: false,
    };
  },

  methods: {
    async submit(type) {
      this.isLoadingModal = true;

      const fd = new FormData();

      fd.append("form", this.form);
      fd.append("processId", this.$route.params.id);
      fd.append("loggedUserId", this.loggedUserId);
      fd.append("companyId", this.companyId);
      fd.append("recipientId", this.itemrecipient.code);
      fd.append("remarks", this.remarks);
      fd.append("inprogressId", this.inprogressId);
      fd.append("loggedUserFullname", this.loggedUserFullName);
      fd.append("referenceNumber", this.referenceNumber);
      fd.append("class", "CAF");
      fd.append("loggedUserDepartment", this.loggedUserDepartment);
      fd.append("isFirstApprover", this.isFirstApprover);
      fd.append("isForAcknowledgement", this.isForAcknowledgement);
      fd.append("approvedAmount", this.approvedAmount);

      if (type === "Approve") {
        this.attemptSubmitApprove = true;
        this.sendRequest(fd);
      } else if (type === "Reject") {
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
          if (err.response.status === 400) {
            this.openToast(
              "top-right",
              "error",
              "Bad Request! Please message the administrator!"
            );
          } else if (err.response.status === 404) {
            this.openToast(
              "top-right",
              "error",
              "Not Found! Please message the administrator!"
            );
          } else if (err.response.status === 408) {
            this.openToast(
              "top-right",
              "error",
              "Request Timeout! Please check your internet connection"
            );
          } else if (err.response.status === 429) {
            this.openToast(
              "top-right",
              "error",
              "Too Many Request! Try again later!"
            );
          } else {
            this.openToast("top-right", "error", err.message);
          }
        }
      } else if (type === "Clarify") {
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
            if (res.status === 200) {
              this.isLoadingModal = false;
              document.getElementById("modalCloseButton").click();
              this.openToast("top-right", "success", res.data.message);
              this.resetAlert();
              this.remarks = "";
              this.$router.replace("/inputs");
            } else {
              this.isLoadingModal = false;
              document.getElementById("modalCloseButton").click();
              this.openToast("top-right", "error", "Please Try again laer");
            }
          } catch (err) {
            this.isLoadingModal = false;
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

    async sendRequest(fd) {
      try {
        const resp = await axios.post(
          "http://127.0.0.1:8000/api/approveCafInput",
          fd
        );

        this.isLoadingModal = false;
        document.getElementById("modalCloseButton").click();
        if (resp.status === 200) {
          console.log(resp.data);
          this.openToast("top-right", "success", resp.data.message);
          this.$router.replace("/approvals");
        }

        if (resp.status === 202) {
          // console.log(resp.data);
          this.openToast("top-right", "error", resp.data.message);
        }
      } catch (err) {
        if (err.response.status === 400) {
          this.openToast(
            "top-right",
            "error",
            "Bad Request! Please message the administrator!"
          );
        } else if (err.response.status === 404) {
          this.openToast(
            "top-right",
            "error",
            "Not Found! Please message the administrator!"
          );
        } else if (err.response.status === 408) {
          this.openToast(
            "top-right",
            "error",
            "Request Timeout! Please check your internet connection"
          );
        } else if (err.response.status === 422) {
          this.openToast(
            "top-right",
            "error",
            "Unprocessable Request! Please message the administrator!"
          );
        } else if (err.response.status === 429) {
          this.openToast(
            "top-right",
            "error",
            "Too Many Request! Try again later!"
          );
        } else {
          this.openToast("top-right", "error", err.message);
        }
      }
    },

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

    async getRecipients(id, loggedUserId, companyId, form) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/getRecipient/${id}/${loggedUserId}/${companyId}/${form}`
        );

        if (resp.status >= 200 && resp.status <= 300) {
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
        if (err.response.status === 400) {
          this.openToast(
            "top-right",
            "error",
            "Bad Request! Please message the administrator!"
          );
        } else if (err.response.status === 404) {
          this.openToast(
            "top-right",
            "error",
            "Not Found! Please message the administrator!"
          );
        } else if (err.response.status === 408) {
          this.openToast(
            "top-right",
            "error",
            "Request Timeout! Please check your internet connection"
          );
        } else if (err.response.status === 429) {
          this.openToast(
            "top-right",
            "error",
            "Too Many Request! Try again later!"
          );
        } else {
          this.openToast("top-right", "error", err.message);
        }
      }
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
      this.resetAlert();
      this.attemptClarify = false;
      this.remarks = "";
    },

    setTitle(title) {
      this.title = title;
    },

    async getActualSign(id, form, companyId) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/general-actual-sign/${id}/${form}/${companyId}`
        );
        this.referenceNumber = resp.data[0].REFERENCE;
        this.requestedDate = resp.data[0].TS.slice(0, 10);
        this.reportingManagerItem = {
          code: resp.data[0].RM_ID,
          name: resp.data[0].REPORTING_MANAGER,
        };

        this.dateNeeded = resp.data[0].PODATE;
        // this.dateNeeded = resp.data[0].PODATE

        // Check if first approver if yes he needs to fill in the approved amount
        this.isFirstApprover =
          resp.data[0].STATUS === "In Progress" ? true : false;
      } catch (err) {
        if (err.response.status === 400) {
          this.openToast(
            "top-right",
            "error",
            "Bad Request! Please message the administrator!"
          );
        } else if (err.response.status === 404) {
          this.openToast(
            "top-right",
            "error",
            "Not Found! Please message the administrator!"
          );
        } else if (err.response.status === 408) {
          this.openToast(
            "top-right",
            "error",
            "Request Timeout! Please check your internet connection"
          );
        } else if (err.response.status === 429) {
          this.openToast(
            "top-right",
            "error",
            "Too Many Request! Try again later!"
          );
        } else {
          this.openToast("top-right", "error", err.message);
        }
      }
    },

    async getCaf(id) {
      try {
        const resp = await axios.get(`http://127.0.0.1:8000/api/getCaf/${id}`);

        this.requestedAmount = parseFloat(
          resp.data.requested_amount
        ).toLocaleString(undefined, { minimumFractionDigits: 2 });

        this.installmentAmount = parseFloat(
          resp.data.installment_amount
        ).toLocaleString(undefined, { minimumFractionDigits: 2 });

        if (parseInt(resp.data.approved_amount)) {
          this.approvedAmount = parseFloat(
            resp.data.approved_amount
          ).toLocaleString(undefined, { minimumFractionDigits: 2 });
        }

        this.payableDateFrom = resp.data.date_from.slice(0, 10);
        this.payableDateTo = resp.data.date_to.slice(0, 10);

        this.employee_id = resp.data.employee_id;
        this.employee_name = resp.data.employee_name;

        this.employeeItem = {
          code: resp.data.employee_id,
          name: resp.data.employee_name,
        };

        this.purpose = resp.data.purpose;
      } catch (err) {
        if (err.response.status === 400) {
          this.openToast(
            "top-right",
            "error",
            "Bad Request! Please message the administrator!"
          );
        } else if (err.response.status === 404) {
          this.openToast(
            "top-right",
            "error",
            "Not Found! Please message the administrator!"
          );
        } else if (err.response.status === 408) {
          this.openToast(
            "top-right",
            "error",
            "Request Timeout! Please check your internet connection"
          );
        } else if (err.response.status === 429) {
          this.openToast(
            "top-right",
            "error",
            "Too Many Request! Try again later!"
          );
        } else {
          this.openToast("top-right", "error", err.message);
        }
      }
    },

    close() {
      this.$router.replace("/inputs");
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

    async getEmployees(companyId) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/get-employees/${companyId}`
        );

        if (resp.status === 200) {
          const employeeName = [];
          for (const key in resp.data) {
            const request = {
              code: resp.data[key].SysPK_Empl,
              name: resp.data[key].Name_Empl,
            };
            employeeName.push(request);
          }

          this.employee = employeeName;
        }
      } catch (err) {
        if (err.response.status === 400) {
          this.openToast(
            "top-right",
            "error",
            "Bad Request! Please message the administrator!"
          );
        } else if (err.response.status === 404) {
          this.openToast(
            "top-right",
            "error",
            "Not Found! Please message the administrator!"
          );
        } else if (err.response.status === 408) {
          this.openToast(
            "top-right",
            "error",
            "Request Timeout! Please check your internet connection"
          );
        } else if (err.response.status === 429) {
          this.openToast(
            "top-right",
            "error",
            "Too Many Request! Try again later!"
          );
        } else {
          this.openToast("top-right", "error", err.message);
        }
      }
    },

    async getReportingManager() {
      const response = await fetch(
        `http://127.0.0.1:8000/api/reporting-manager/${this.loggedUserId}`,
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
          responseData.message || "Failed to fetch Reporting Manager."
        );
        throw error;
      }

      const reportingManager = [];
      for (const key in responseData) {
        const request = {
          code: responseData[key].RMID,
          name: responseData[key].RMName,
        };
        reportingManager.push(request);
      }
      this.reportingManager = reportingManager;
      console.log(this.reportingManager);
    },

    // Amount aldrin script

    formatNumber(n) {
      // format number 1000000 to 1,234,567
      return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    formatCurrency(input, blur) {
      // appends $ to value, validates decimal side
      // and puts cursor back in right position.

      // get input value
      let input_val = this.requestedAmount;

      // don't validate empty input
      if (input_val === "") {
        return;
      }

      // original length
      let original_len = input_val.length;

      // initial caret position
      let caret_pos = input.target.selectionStart;

      // check for decimal
      if (input_val.indexOf(".") >= 0) {
        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        let decimal_pos = input_val.indexOf(".");

        // split number by decimal point
        let left_side = input_val.substring(0, decimal_pos);
        let right_side = input_val.substring(decimal_pos);

        // add commas to left side of number
        left_side = this.formatNumber(left_side);

        // validate right side
        right_side = this.formatNumber(right_side);

        // On blur make sure 2 numbers after decimal
        if (blur === "blur") {
          right_side += "00";
        }

        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        input_val = left_side + "." + right_side;
      } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = this.formatNumber(input_val);
        // input_val = input_val;

        // final formatting
        if (blur === "blur") {
          input_val += ".00";
        }
      }

      // send updated string to input

      this.requestedAmount = input_val;
      input.target.value = input_val;

      let realAmount = input_val;
      if (realAmount.indexOf(",") !== -1) {
        realAmount = realAmount.replace(/,/g, "");
      }
      this.requestedRealAmount = realAmount;

      // put caret back in the right position
      let updated_len = input_val.length;
      caret_pos = updated_len - original_len + caret_pos;
      input.target.setSelectionRange(caret_pos, caret_pos);
    },

    formatCurrencyofApprovedAmount(input, blur) {
      // appends $ to value, validates decimal side
      // and puts cursor back in right position.

      // get input value
      let input_val = this.approvedAmount;

      // don't validate empty input
      if (input_val === "") {
        return;
      }

      // original length
      let original_len = input_val.length;

      // initial caret position
      let caret_pos = input.target.selectionStart;

      // check for decimal
      if (input_val.indexOf(".") >= 0) {
        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        let decimal_pos = input_val.indexOf(".");

        // split number by decimal point
        let left_side = input_val.substring(0, decimal_pos);
        let right_side = input_val.substring(decimal_pos);

        // add commas to left side of number
        left_side = this.formatNumber(left_side);

        // validate right side
        right_side = this.formatNumber(right_side);

        // On blur make sure 2 numbers after decimal
        if (blur === "blur") {
          right_side += "00";
        }

        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        input_val = left_side + "." + right_side;
      } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = this.formatNumber(input_val);
        // input_val = input_val;

        // final formatting
        if (blur === "blur") {
          input_val += ".00";
        }
      }

      // send updated string to input

      this.approvedAmount = input_val;
      input.target.value = input_val;

      let realAmount = input_val;
      if (realAmount.indexOf(",") !== -1) {
        realAmount = realAmount.replace(/,/g, "");
      }
      this.approvedtRealAmount = realAmount;

      // put caret back in the right position
      let updated_len = input_val.length;
      caret_pos = updated_len - original_len + caret_pos;
      input.target.setSelectionRange(caret_pos, caret_pos);
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
