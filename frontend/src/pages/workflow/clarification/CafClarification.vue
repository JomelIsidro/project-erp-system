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
        <h3 class="card-title">Cash Advance Request

        </h3>
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
                <model-list-select
                  v-if="isInitiator"
                  :list="reportingManager"
                  v-model="reportingManagerItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  :style="isUiDisabled"
                  :isDisabled="isForEdit"
                >
                </model-list-select>

                <input
                  v-else
                  type="text"
                  class="form-control form-control-sm py-3"
                  id="reference"
                  disabled
                  v-model="reportingManagerItem.name"
                />


                <small
                  class="text-danger p-0 m-0"
                  v-if="missingReportingManager && attemptNext"
                  >Reporting Manager is required!</small
                >
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
                  :disabled="isForEdit"
                ></date-picker>
                <small
                  class="text-danger p-0 m-0"
                  v-if="missingDateNeeded && attemptNext"
                  >Date Needed is required!</small
                >
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
                  :disabled="isForEdit"
                />

                <small
                  class="text-danger p-0 m-0"
                  v-if="missingRequestedAmount && attemptNext"
                  >Requested Amount is required!</small
                >
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
                  :disabled="isForEdit"
                ></date-picker>

                <small
                  class="text-danger p-0 m-0"
                  v-if="missingPayableDateFrom && attemptNext"
                  >Payable Date From is required!</small
                >
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
                  :disabled="isForEdit"
                ></date-picker>
                <small
                  class="text-danger p-0 m-0"
                  v-if="missingPayableDateTo && attemptNext"
                  >Payable Date To is required!</small
                >
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
                  :style="isUiDisabled"
                  :isDisabled="isForEdit"
                >
                </model-list-select>
                <small
                  class="text-danger p-0 m-0"
                  v-if="missingEmployeeItem && attemptNext"
                  >Employee Name is required!</small
                >
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
                  @keyup="formatCurrencyOfInstallmentAmount($event)"
                  @blur="formatCurrencyOfInstallmentAmount($event, 'blur')"
                  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                  class="form-control form-control-sm py-3"
                  id="installmentAmount"
                  v-model="installmentAmount"
                  :disabled="isForEdit"
                />
                <small
                  class="text-danger p-0 m-0"
                  v-if="missingInstallmentAmount && attemptNext"
                  >Installment Amount is required!</small
                >
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
                  disabled
                />
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
                  :disabled="isForEdit"
                ></textarea>
                <small
                  class="text-danger p-0 m-0"
                  v-if="missingPurpose && attemptNext"
                  >Purpose is required!</small
                >
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
                  <b>Reply Request</b>
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

                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <small><label for="remarks">Remarks</label></small>

                      <textarea
                        class="form-control"
                        id="remarks"
                        rows="5"
                        v-model.trim="remarks"
                        placeholder="Please input request remarks here!"
                      ></textarea>
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingReplyRemarks && attemptReply"
                        >Reply remarks is required!</small
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
                  @click="reply()"
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

            <aside v-if="this.counter <= 0">
              <button
                type="button"
                @click="next()"
                class="btn mr-1 btn-primary btn-sm"
              >
                Next
              </button>
            </aside>
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
              v-if="this.counter"
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
    await this.getReportingManager();
    await this.getEmployees(this.companyId);
    await this.getCaf(this.processId);
    await this.getActualSign(this.processId, this.form, this.companyId);
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

    missingModalRecipient() {
      if (this.itemrecipient.code === undefined) {
        return true;
      } else {
        return false;
      }
    },

    missingReportingManager() {
      if (this.reportingManagerItem.code === undefined) {
        return true;
      } else {
        return false;
      }
    },

    missingDateNeeded() {
      if (this.dateNeeded === null) {
        return true;
      } else {
        return false;
      }
    },
    missingRequestedAmount() {
      if (
        this.requestedAmount.length === 0 ||
        parseFloat(this.requestedAmount) < 1
      ) {
        return true;
      } else {
        return false;
      }
    },
    missingPayableDateFrom() {
      if (this.payableDateFrom === null) {
        return true;
      } else {
        return false;
      }
    },
    missingPayableDateTo() {
      if (this.payableDateTo === null) {
        return true;
      } else {
        return false;
      }
    },
    missingEmployeeItem() {
      if (this.employeeItem.code === undefined) {
        return true;
      } else {
        return false;
      }
    },
    missingInstallmentAmount() {
      if (
        this.installmentAmount.length === 0 ||
        parseFloat(this.installmentAmount) < 1
      ) {
        return true;
      } else {
        return false;
      }
    },
    missingPurpose() {
      if (this.purpose.length === 0) {
        return true;
      } else {
        return false;
      }
    },

    missingReplyRemarks() {
      if (this.remarks.length === 0) {
        return true;
      } else {
        return false;
      }
    },

    isForEdit() {
      if (this.isInitiator && this.isEditable) {
        return false;
      } else {
        return true;
      }
    },

    isUiDisabled() {
      if (this.isForEdit) {
        return "padding: 9px; background-color: #e9ecef";
      } else {
        return "padding: 9px";
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
      attemptReply: false,

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

      isEditable: false,
      isForAcknowledgement: false,

      inprogressId: "",
      attemptClarify: false,

      isInitiator: false,
    };
  },

  methods: {
    async reply() {
      this.isLoadingModal = true;
      this.attemptReply = true;
      this.resetAlert();
      const validated = this.validate_reply();

      if (validated) {
        const fd = new FormData();

        fd.append("reportingManagerId", this.reportingManagerItem.code);
        fd.append("reportingManagerName", this.reportingManagerItem.name);

        fd.append("dateNeeded", this.dateNeeded);
        fd.append("requestedAmount", this.requestedAmount);
        fd.append("payableDateFrom", this.payableDateFrom);
        fd.append("payableDateTo", this.payableDateTo);
        fd.append("employeeId", this.employeeItem.code);
        fd.append("employeeName", this.employeeItem.name);
        fd.append("installmentAmount", this.installmentAmount);
        fd.append("approvedAmount", this.approvedAmount);
        fd.append("purpose", this.purpose);
        fd.append("remarks", this.remarks);

        fd.append("form", this.form);
        fd.append("processId", this.processId);

        fd.append("class", "CAF");

        fd.append("loggedUserId", this.loggedUserId);
        fd.append("loggedUserFirstName", this.loggedUserFirstName);
        fd.append("loggedUserLastName", this.loggedUserLastName);
        fd.append("loggedUserFullName", this.loggedUserFullName);
        fd.append("loggedUserDepartment", this.loggedUserDepartment);
        fd.append("loggedUserPosition", this.loggedUserPosition);
        fd.append("companyId", this.companyId);
        fd.append("companyName", this.companyName);

        try {
          const res = await axios.post(
            "http://127.0.0.1:8000/api/reply-request",
            fd
          );

          
          this.isLoadingModal = false;
          document.getElementById("modalCloseButton").click();

          if (res.status >= 200) {
            this.openToast("top-right", "success", res.data.message);
            this.$router.replace("/approvals");
          }

          
        } catch (err) {
          this.isLoadingModal = false;
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
      } else {
        this.isLoadingModal = false;
        this.addAlert("Failed", "Please complete required fields!", "false");
      }
    },

    validate_reply() {
      if (!this.missingReplyRemarks) {
        return true;
      } else {
        return false;
      }
    },

    next() {
      if (this.counter === 0) {
        this.attemptNext = true;
      }

      this.validateCurrentTab(this.counter);
    },

    validateCurrentTab(counter) {
      // Request Details
      if (counter === 0) {
        if (
          !this.missingReportingManager &&
          !this.missingDateNeeded &&
          !this.missingRequestedAmount &&
          !this.missingPayableDateFrom &&
          !this.missingPayableDateTo &&
          !this.missingEmployeeItem &&
          !this.missingPurpose
        ) {
          this.counter++;
        } else {
          this.openToast(
            "top-right",
            "warning",
            "Please Complete Required Fields!"
          );
        }
      }
    },

    async getInprogressId(id, companyId, form) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/get-Inprogress/${id}/${companyId}/${form}`
        );
        
        if (resp.status === 200) {
          this.inprogressId = resp.data[0].inpId;
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

        // Check if this is Editable by Initiator else disabled if approval of management is for clarification then editable else not editable
        this.isEditable =
          resp.data[0].STATUS === "For Clarification" ? true : false;

        // Check if request is for acknowledgement of the initiator
        this.isForAcknowledgement =
          resp.data[4].STATUS === "In Progress" ? true : false;

        if (parseInt(resp.data[0].INITID) === parseInt(this.loggedUserId)) {
          this.isInitiator = true;
          
        } else {
          this.isInitiator = false;
          this.counter = 1
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

    formatCurrencyOfInstallmentAmount(input, blur) {
      // appends $ to value, validates decimal side
      // and puts cursor back in right position.

      // get input value
      let input_val = this.installmentAmount;

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

      this.installmentAmount = input_val;
      input.target.value = input_val;

      let realAmount = input_val;
      if (realAmount.indexOf(",") !== -1) {
        realAmount = realAmount.replace(/,/g, "");
      }
      this.installmentRealAmount = realAmount;

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
