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
        <h3 class="card-title">{{ this.isInitiator }} Request</h3>
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
                  style="padding: 9px"
                >
                </model-list-select>

                <input
                  v-else
                  type="text"
                  id="reportingManager"
                  disabled
                  class="form-control py-3 form-control-sm"
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
            <div class="col-md-6">
              <div class="form-group">
                <small><label for="employeeName">Employee Name</label></small>
                <model-list-select
                  v-if="isInitiator"
                  :list="employee"
                  v-model="employeeItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px"
                >
                </model-list-select>

                <input
                  v-else
                  type="text"
                  id="reportingManager"
                  disabled
                  class="form-control py-3 form-control-sm"
                  v-model="employeeItem.name"
                />
                <small
                  class="text-danger p-0 m-0"
                  v-if="missingEmployee && attemptNext"
                  >Employee Name is required!</small
                >
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <small
                  ><label for="mediumOfReport">Medium of Report</label></small
                >
                <model-list-select
                  v-if="isInitiator"
                  :list="report"
                  v-model="reportItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px"
                >
                </model-list-select>
                <input
                  v-else
                  type="text"
                  id="reportingManager"
                  disabled
                  class="form-control py-3 form-control-sm"
                  v-model="reportItem.name"
                />
                <small
                  class="text-danger p-0 m-0"
                  v-if="missingReport && attemptNext"
                  >Medium of Report is required!</small
                >
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <small><label for="reportDateTime">Report Time</label></small>
                <date-picker
                  v-if="isInitiator"
                  v-model="reportDateTime"
                  :minute-step="1"
                  format="MM/DD/YYYY hh:mm A"
                  value-type="format"
                  type="datetime"
                  style="display: block; width: 100%; line-height: 20px"
                ></date-picker>

                <date-picker
                  v-else
                  v-model="reportDateTime"
                  :minute-step="1"
                  format="MM/DD/YYYY hh:mm A"
                  value-type="format"
                  type="datetime"
                  disabled
                  style="display: block; width: 100%; line-height: 20px"
                ></date-picker>
                <small
                  class="text-danger p-0 m-0"
                  v-if="missingReportTime && attemptNext"
                  >Report Time is required!</small
                >
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <small><label for="reason">Reason</label></small>
                <textarea
                  class="form-control"
                  name="purpose"
                  id="purpose"
                  :disabled="isInitiator === false"
                  v-model.trim="reason"
                  rows="5"
                ></textarea>
                <small
                  class="text-danger p-0 m-0"
                  v-if="missingPurpose && attemptNext"
                  >Reason is required!</small
                >
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
                <th v-if="isInitiator">
                  <aside class="text-center">
                    <button
                      class="btn btn-sm btn-success m-0"
                      data-toggle="modal"
                      data-target="#modal-leave"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
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
                <th scope="col" v-if="isInitiator">Action</th>
              </tr>
            </thead>
            <tbody style="font-size: 14px" v-if="isInitiator">
              <tr v-for="(item, index) in leaveData" :key="item.id">
                <td class="text-center">{{ index + 1 }}.</td>
                <td>{{ item.leave_date }}</td>
                <td>{{ item.leave_type }}</td>
                <td class="text-center" style="padding-top: 10px">
                  <input type="checkbox" @click="checkHalfday($event, index)" />
                </td>
                <!-- <td>{{ item.leave_halfday }}</td> am/pm -->
                <td>
                  <select
                    v-if="item.leave_halfday === 'Wholeday'"
                    class="form-control form-control-sm m-0 p-0"
                  >
                    <option>N/A</option>
                  </select>

                  <select
                    v-else
                    @change="changeAmPm($event, index)"
                    class="form-control form-control-sm m-0 p-0"
                  >
                    <option :selected="item.leave_halfday === 'AM'">AM</option>
                    <option :selected="item.leave_halfday === 'PM'">PM</option>
                  </select>
                </td>

                <td>{{ item.num_days }}</td>
                <!-- 1 / .5 -->
                <td>
                  {{ item.leave_paytype === "wp" ? "With Pay" : "Without Pay" }}
                </td>

                <!-- withpay / withot pay -->

                <td class="pl-0 m-0">
                  <aside class="d-flex justify-content-center">
                    <button
                      class="btn btn-sm btn-danger m-0 ml-1"
                      @click="trash(index)"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </aside>
                </td>
              </tr>
            </tbody>

            <tbody style="font-size: 14px" v-else>
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
                    <td>{{ this.reportingManagerItem.name }}</td>
                  </tr>
                  <tr>
                    <td>Employee Name</td>
                    <td>{{ this.employeeItem.name }}</td>
                  </tr>
                  <tr>
                    <td>Medium of Report</td>
                    <td>{{ this.reportItem.name }}</td>
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
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.leave_date }}</td>
                    <td>{{ item.leave_type }}</td>

                    <td v-if="item.leave_halfday === 'Wholeday'">No</td>
                    <td v-else>Yes</td>

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

        <!-- Modal Expense Type -->
        <div
          class="modal fade"
          id="modal-leave"
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
                  <b>Add Leave Date</b>
                </h6>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="closeModalLeave()"
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
                      <small><label for="leaveType">Leave Type</label></small>

                      <model-list-select
                        :list="leaveType"
                        v-model="leaveTypeItem"
                        option-value="code"
                        option-text="name"
                        placeholder="select item"
                        style="padding: 9px"
                      >
                      </model-list-select>
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingModalLeaveType && attemptInsert"
                        >Leave Type is required!</small
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <small
                        ><label for="leaveFrom">Leave Date From</label></small
                      >

                      <date-picker
                        valueType="format"
                        style="display: block; width: 100%; line-height: 20px"
                        v-model="leaveFrom"
                      ></date-picker>
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingModalDateFrom && attemptInsert"
                        >Leave Date From is required!</small
                      >
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <small
                        ><label for="modalamount">Leave Date To</label></small
                      >
                      <date-picker
                        valueType="format"
                        style="display: block; width: 100%; line-height: 20px"
                        v-model="leaveTo"
                      ></date-picker>
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingModalDateTo && attemptInsert"
                        >Leave Date To is required!</small
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <small><label for="modalamount">Pay Type</label></small>
                      <model-list-select
                        :list="payType"
                        v-model="payTypeItem"
                        option-value="code"
                        option-text="name"
                        placeholder="select item"
                        style="padding: 9px"
                      >
                      </model-list-select>
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingModalPayType && attemptInsert"
                        >Pay Type is required!</small
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-footer justify-content-end">
                <button
                  type="button"
                  class="btn btn-success btn-sm"
                  @click="insert()"
                >
                  insert
                </button>
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>
        <!-- /. Modal Expense Type -->

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
                  @click="closeModalLeave()"
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
                        v-model="remarks"
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
                v-if="this.isInitiator"
                type="button"
                @click="next()"
                class="btn m-0 btn-primary btn-sm"
              >
                Next
              </button>
              <button
                v-else
                type="button"
                @click="counter++"
                class="btn m-0 btn-primary btn-sm"
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
    await this.getLafMain(this.processId, this.companyId);
    await this.getReportingManager(this.loggedUserId);
    await this.getEmployees(this.companyId);
    await this.getMediumOfReport();
    await this.getLeaveType();
    await this.todaysDate();
    this.isLoading = false;

  },
  watch: {
    counter() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },

    async $route(newRoute) {
      this.isLoading = true;
      await this.getLafMain(newRoute.params.id, this.companyId);
      await this.getReportingManager(this.loggedUserId);
      await this.getEmployees(this.companyId);
      await this.getMediumOfReport();
      await this.getLeaveType();
      await this.todaysDate();
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

    missingEmployee() {
      if (this.employeeItem.code === undefined) {
        return true;
      } else {
        return false;
      }
    },

    missingReport() {
      if (this.reportItem.code === undefined) {
        return true;
      } else {
        return false;
      }
    },

    missingReportTime() {
      if (this.reportDateTime === null) {
        return true;
      } else {
        return false;
      }
    },

    missingPurpose() {
      if (this.reason.length === 0) {
        return true;
      } else {
        return false;
      }
    },

    missingModalLeaveType() {
      if (this.leaveTypeItem.code === undefined) {
        return true;
      } else {
        return false;
      }
    },

    missingModalDateFrom() {
      if (this.leaveFrom === null) {
        return true;
      } else {
        return false;
      }
    },

    missingModalDateTo() {
      if (this.leaveTo === null) {
        return true;
      } else {
        return false;
      }
    },

    missingModalPayType() {
      if (this.payTypeItem.code === undefined) {
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

    todaysYear() {
      const today = new Date();
      // const dd = today.getDate();
      // const mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      // const todaysDate = yyyy + "-" + mm + "-" + dd;
      return yyyy;
    },
  },
  data() {
    return {
      counter: 0,
      attemptInsert: false,
      attemptNext: false,
      attemptNextOne: false,
      attemptReply: false,
      // Request Details
      referenceNumber: "",
      requestedDate: "",
      reportingManager: [],
      reportingManagerItem: {},
      employee: [],
      employeeItem: {},
      report: [],
      reportItem: {},
      reportDateTime: "",
      reason: "",

      // modal
      leaveType: [],
      leaveTypeItem: {},
      leaveFrom: null,
      leaveTo: null,
      payType: [
        { code: "wp", name: "With Pay" },
        { code: "wop", name: "Without Pay" },
      ],
      payTypeItem: {},

      leaveData: [],
      id: 0,

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

      // The Alert
      isAlert: false,
      header: "", // Syccess or Failed
      message: "", // added successfully
      type: "", // true or false

      i: 0,

      isLoading: false,
      isLoadingModal: false,
      isInitiator: false,

      processId: this.$route.params.id,
      form: this.$route.params.frmName,
      remarks: "",
      guid: "",
    };
  },

  methods: {
    async reply() {
      this.isLoadingModal = true;
      this.attemptReply = true;
      this.resetAlert();
      const validated = this.validate_reply();

      if (validated) {
      } else {
        this.isLoadingModal = false;
        this.addAlert("Failed", "Please complete required fields!", "false");
      }

      // start
      const fd = new FormData();
      fd.append("referenceNumber", this.referenceNumber);
      fd.append("requestedDate", this.requestedDate);
      fd.append("reportingManagerId", this.reportingManagerItem.code);
      fd.append("reportingManagerName", this.reportingManagerItem.name);
      fd.append("medieum_of_reportId", this.reportItem.code);
      fd.append("reportName", this.reportItem.name);
      fd.append("employeeId", this.employeeItem.code);
      fd.append("employeeName", this.employeeItem.name);
      fd.append("purpose", this.reason);
      fd.append("reason", this.reason);

      fd.append("form", this.form);
      fd.append("processId", this.processId);

      fd.append("remarks", this.remarks);

      fd.append("class", "LAF");

      fd.append("projectId", 0);
      fd.append("projectName", this.loggedUserDepartment);
      fd.append("clientId", 0);
      fd.append("clientName", this.companyName);
      fd.append("payeeName", "N/A");
      fd.append("amount", 0);
      fd.append("isInitiator", this.isInitiator);

      fd.append("loggedUserId", this.loggedUserId);
      fd.append("loggedUserFirstName", this.loggedUserFirstName);
      fd.append("loggedUserLastName", this.loggedUserLastName);
      fd.append("loggedUserFullName", this.loggedUserFullName);
      fd.append("loggedUserDepartment", this.loggedUserDepartment);
      fd.append("loggedUserPosition", this.loggedUserPosition);
      fd.append("companyId", this.companyId);
      fd.append("companyName", this.companyName);

      fd.append("guid", this.guid);
      fd.append("leaveData", JSON.stringify(this.leaveData));

      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/reply-request",
          fd
        );

        console.log(res.data);
        this.isLoading = false;
        document.getElementById("modalCloseButton").click();

        if (res.status === 200) {
          this.openToast("top-right", "success", res.data.message);
          this.$router.replace("/inprogress");
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
      // end
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
          this.guid = resp.data[0].GUID;

          this.reportDateTime = this.convertTimeAndDate(
            resp.data[0].report_time
          );
          this.reason = resp.data[0].reason;

          const reportingManagerItem = {
            code: resp.data[0].rm_id,
            name: resp.data[0].reporting_manager,
          };
          this.reportingManagerItem = reportingManagerItem;

          const employeeItem = {
            code: resp.data[0].employee_id,
            name: resp.data[0].employee_name,
          };
          this.employeeItem = employeeItem;

          const reportItem = {
            code: resp.data[0].medium_of_report_id,
            name: resp.data[0].medium_of_report,
          };
          this.reportItem = reportItem;

          if (resp.data[0].UID === parseInt(this.loggedUserId)) {
            this.isInitiator = true;
          }
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    closeModalLeave() {
      this.resetAlert();
      this.resetModalLeave();
      this.attemptReply = false;
      this.remarks = "";
    },

    resetModalLeave() {
      this.attemptInsert = false;
      this.leaveTypeItem = {};
      this.leaveFrom = null;
      this.leaveTo = null;
      this.payTypeItem = {};
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

    async insert() {
      this.isLoadingModal = true;
      this.attemptInsert = true;
      this.resetAlert();

      // returns true or false
      const validated = this.validateEmptyFields();
      const isGreaterThan = this.validateStartEndDate(
        this.leaveFrom,
        this.leaveTo
      );

      // validation if
      if (validated && isGreaterThan) {
        // start of loop insert
        let start = new Date(this.leaveFrom);
        let end = new Date(this.leaveTo);
        // While loop
        let newend = end.setDate(end.getDate() + 1);
        end = new Date(newend);

        let leaveDates = [];
        while (start < end) {
          let year = start.getFullYear();
          let month =
            start.getMonth() + 1 < 10
              ? `0${start.getMonth() + 1}`
              : start.getMonth() + 1;
          let day =
            start.getDate() < 10 ? `0${start.getDate()}` : start.getDate();

          let genDate = `${year}-${month}-${day}`;

          leaveDates.push(genDate);

          let newDate = start.setDate(start.getDate() + 1);
          start = new Date(newDate);
        }

        const fd = new FormData();
        fd.append("employeeId", this.employeeItem.code);
        fd.append("companyId", this.companyId);
        fd.append("leaveDates", JSON.stringify(leaveDates));

        try {
          const resp = await axios.post(
            "http://127.0.0.1:8000/api/validate-laf-insert",
            fd
          );

          if (resp.status === 200) {
            // exist
            if (resp.data.length) {
              this.isLoadingModal = false;
              let existDates = [];
              for (const key in resp.data) {
                existDates.push(resp.data[key].leave_date);
              }
              const stringExistDates = existDates
                .toString()
                .split(",")
                .join(",\n");
              const message = `This leave date(s)\n${stringExistDates}\nAlready exist in our records!`;
              this.addAlert("Failed", message, "false");

              // not exist
            } else {
              this.isLoadingModal = false;
              this.insertLeaveDates();
              this.resetModalLeave();
              this.addAlert(
                "Success",
                "Leave date added successfully!",
                "true"
              );
            }
          }
        } catch (err) {
          // Handle Error Here
          console.error(err);
        }

        // End of loop insert

        //   validation else
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

    validateStartEndDate(from, to) {
      const startDate = new Date(from);
      const endDate = new Date(to);

      const check = endDate >= startDate ? true : false;
      return check;
    },

    validateEmptyFields() {
      if (
        !this.missingEmployee &&
        !this.missingModalLeaveType &&
        !this.missingModalDateFrom &&
        !this.missingModalDateTo &&
        !this.missingModalPayType
      ) {
        return true;
      } else {
        return false;
      }
    },

    validate_reply() {
      if (!this.missingReplyRemarks) {
        return true;
      } else {
        return false;
      }
    },

    insertLeaveDates() {
      let startActual = new Date(this.leaveFrom);
      let endActual = new Date(this.leaveTo);
      // While loop
      let newendActual = endActual.setDate(endActual.getDate() + 1);
      endActual = new Date(newendActual);

      while (startActual < endActual) {
        let year = startActual.getFullYear();
        let month =
          startActual.getMonth() + 1 < 10
            ? `0${startActual.getMonth() + 1}`
            : startActual.getMonth() + 1;
        let day =
          startActual.getDate() < 10
            ? `0${startActual.getDate()}`
            : startActual.getDate();

        let genDate = `${year}-${month}-${day}`;

        const addData = {
          id: this.i++,
          leave_typeId: this.leaveTypeItem.code,
          leave_type: this.leaveTypeItem.name,
          leave_date: genDate,
          leave_paytype: this.payTypeItem.code, // wp / wop
          leave_paytypeName: this.payTypeItem.name, // Withpay / Withoutpay
          leave_halfday: "Wholeday", // whole day / am or pm
          num_days: 1, // count / 1 . .5
        };
        this.leaveData.push(addData);
        let newDate = startActual.setDate(startActual.getDate() + 1);
        startActual = new Date(newDate);
      }
    },

    next() {
      if (this.counter === 0) {
        this.attemptNext = true;
        if (
          !this.missingReportingManager &&
          !this.missingEmployee &&
          !this.missingReport &&
          !this.missingReportTime &&
          !this.missingPurpose
        ) {
          this.counter++;
        }
      } else if (this.counter === 1) {
        this.attemptNext = false;
        this.attemptNextOne = true;
        if (this.leaveData.length > 0) {
          this.counter++;
        } else {
          this.openToast("top-right", "warning", "Please add your Leave data!");
        }
      }
    },

    close() {
      this.$router.replace("/clarifications");
    },

    // table functions
    trash(index) {
      this.leaveData.splice(index, 1);
    },

    checkHalfday(event, index) {
      console.log(event.target.checked);
      console.log(index);

      if (event.target.checked === true) {
        this.leaveData[index].leave_halfday = "AM";
        this.leaveData[index].num_days = 0.5;
      } else {
        this.leaveData[index].leave_halfday = "Wholeday";
        this.leaveData[index].num_days = 1;
      }
    },

    changeAmPm(event, index) {
      this.leaveData[index].leave_halfday = event.target.value;
    },

    // Query
    async getReportingManager(userid) {
      // this.isLoading = true;
      const response = await fetch(
        `http://127.0.0.1:8000/api/reporting-manager/${userid}`,
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
      // this.isLoading = false;
    },

    async getEmployees(companyId) {
      // this.isLoading = true;

      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/get-employees/${companyId}`
        );

        if (resp.status === 200) {
          // this.isLoading = false;

          const employeeName = [];
          for (const key in resp.data) {
            const request = {
              code: resp.data[key].SysPK_Empl,
              name: resp.data[key].Name_Empl,
            };
            employeeName.push(request);
          }
          this.employee = employeeName;
          // console.log(this.employeeName);
        }
      } catch (err) {
        // this.isLoading = false;

        // Handle Error Here
        console.error(err);
      }
    },

    async getMediumOfReport() {
      // this.isLoading = true;

      try {
        const resp = await axios.get(`http://127.0.0.1:8000/api/get-reports`);

        if (resp.status === 200) {
          // this.isLoading = false;

          const array = [];
          for (const key in resp.data) {
            const request = {
              code: resp.data[key].id,
              name: resp.data[key].item,
            };
            array.push(request);
          }
          this.report = array;
        }
      } catch (err) {
        // this.isLoading = false;

        // Handle Error Here
        console.error(err);
      }
    },

    async getLeaveType() {
      // this.isLoading = true;

      try {
        const resp = await axios.get(`http://127.0.0.1:8000/api/get-leavetype`);

        if (resp.status === 200) {
          // this.isLoading = false;

          const array = [];
          for (const key in resp.data) {
            const request = {
              code: resp.data[key].id,
              name: resp.data[key].item,
            };
            array.push(request);
          }
          this.leaveType = array;
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
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

    // Request Details
    todaysDate() {
      const today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();

      if (mm < 10) {
        mm = `0${mm}`;
      }

      if (dd < 10) {
        dd = `0${dd}`;
      }

      const todaysDate = yyyy + "-" + mm + "-" + dd;
      this.requestedDate = todaysDate;
      // return todaysDate;
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
