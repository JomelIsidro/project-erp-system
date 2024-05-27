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

        <!-- Cash Advance Details -->
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
                  :value="'CAF-' + todaysYear"
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
                  :list="reportingManager"
                  v-model="reportingManagerItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px"
                >
                </model-list-select>
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
                  style="display: block; width: 100%; line-height: 20px"
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
                  style="display: block; width: 100%; line-height: 20px"
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
                  style="display: block; width: 100%; line-height: 20px"
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
                  style="padding: 9px"
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
                  @keyup="formatCurrency($event)"
                  @blur="formatCurrency($event, 'blur')"
                  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                  class="form-control form-control-sm py-3"
                  id="approvedAmount"
                  v-model="approvedAmount"
                  :disabled="true"
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
        <!-- /.Cash Advance Details -->

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
                    <td style="width: 80%">{{ "CAF-" + todaysYear }}</td>
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

        <!-- Buttons -->
        <div
          class="
            row
            d-flex
            justify-content-end
            mt-3
            align-items-center
            flex-nowrap
            m-1
          "
        >
          <button
            v-show="counter"
            type="button"
            @click="counter--"
            class="btn btn-secondary btn-sm"
          >
            Previous
          </button>

          <button
            v-if="this.counter <= 0"
            type="button"
            @click="next()"
            class="btn ml-1 btn-primary btn-sm"
          >
            Next
          </button>

          <button
            v-else
            type="button"
            class="btn ml-1 btn-success btn-sm"
            @click="submit()"
          >
            Submit
          </button>
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
    this.isLoading = true

    this.todaysDate();
    await this.cafInitiate();
    this.isLoading = false

  },

  watch: {},
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

    // Calendaer
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
      isLoading: false,
      counter: 0,
      setIndex: "",
      attemptNext: false,

      attemptInsert: false,

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

      // The Alert
      isAlert: false,
      header: "", // Syccess or Failed
      message: "", // added successfully
      type: "", // true or false

      // Overtime Details
      employeeName: [],
      itemEmployeeName: {},
    };
  },

  methods: {
    getEmployees2(){
      return axios.get(`http://127.0.0.1:8000/api/get-employees/${localStorage.getItem("companyId")}`);
    },

    getReportingManager2(){
      return axios.get(`http://127.0.0.1:8000/api/reporting-manager/${localStorage.getItem("id")}`);
    },

    async cafInitiate(){
      await Promise.all([this.getEmployees2(), this.getReportingManager2()])
      .then((results) => {
        const employees = results[0];
        const managers = results[1];

      const employeeName = [];
      for (const key in employees.data) {
        const request = {
          code: employees.data[key].SysPK_Empl,
          name: employees.data[key].Name_Empl,
        };
        employeeName.push(request);
      }
      this.employee = employeeName;


      const reportingManager = [];
      for (const key in managers.data) {
        const request = {
          code: managers.data[key].RMID,
          name: managers.data[key].RMName,
        };
        reportingManager.push(request);
      }
      this.reportingManager = reportingManager;
      })
      
      .catch(error => {
        console.error(error);
        this.openToast(
            "top-right",
            "error",
            "Please Contact the administrator! and try again later"
        );
      });
    },

    async submit() {
      this.isLoading = true;
      const fd = new FormData();

      fd.append("reportingManagerId", this.reportingManagerItem.code);
      fd.append("reportingManagerName", this.reportingManagerItem.name);
      fd.append("dateNeeded", this.dateNeeded);
      fd.append("requestedAmount", this.requestedAmount);
      fd.append("payableDateFrom", this.payableDateFrom);
      fd.append("payableDateTo", this.payableDateTo);
      fd.append("employeeName", this.employeeItem.name);
      fd.append("employeeId", this.employeeItem.code);
      fd.append("installmentAmount", this.installmentAmount);
      fd.append("purpose", this.purpose);

      fd.append("loggedUserId", this.loggedUserId);
      fd.append("loggedUserFirstName", this.loggedUserFirstName);
      fd.append("loggedUserLastName", this.loggedUserLastName);
      fd.append("loggedUserDepartment", this.loggedUserDepartment);
      fd.append("loggedUserPosition", this.loggedUserPosition);
      fd.append("companyId", this.companyId);
      fd.append("companyName", this.companyName);
      fd.append("class", "CAF");
      fd.append("form", "Cash Advance Request");

      try {
        const res = await axios.post("http://127.0.0.1:8000/api/saveCaf", fd);

        console.log(res.data);
        this.isLoading = false;

        if (res.status === 201) {
          // document.getElementById("modalCloseButton").click();
          this.openToast("top-right", "success", res.data.message);
          this.$router.replace("/inprogress");
        }
      } catch (err) {
        this.isLoading = false;
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

    validateEmptyFields() {
      if (
        !this.missingModalProject &&
        !this.missingModalEmployee &&
        !this.missingModalOTDate &&
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
    },

    async getEmployees(companyId) {
      this.isLoading = true;

      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/get-employees/${companyId}`
        );

        if (resp.status === 200) {
          this.isLoading = false;

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
        this.isLoading = false;

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
      this.isLoading = true;

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
        this.isLoading = false;

        const error = new Error(
          responseData.message || "Failed to fetch Reporting Manager."
        );
        throw error;
      }
      this.isLoading = false;

      const reportingManager = [];
      for (const key in responseData) {
        const request = {
          code: responseData[key].RMID,
          name: responseData[key].RMName,
        };
        reportingManager.push(request);
      }
      this.reportingManager = reportingManager;
      // console.log(this.reportingManager);
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
