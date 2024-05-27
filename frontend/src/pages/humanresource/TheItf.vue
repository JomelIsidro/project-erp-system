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
                  :value="'ITF-' + todaysYear"
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
                <th colspan="5" scope="col">
                  <aside class="d-flex align-items-center">
                    <span class="mb-1 ml-1"> Itinerary Table</span>
                  </aside>
                </th>
                <th>
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
                <th scope="col" style="width: 20%">Auth. Time Start</th>
                <th scope="col" style="width: 20%">Auth. Time End</th>
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
                    <td style="width: 80%">{{ "ITF-" + todaysYear }}</td>
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
                    <th style="width: 30%">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in itinerary" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.client_name }}</td>
                    <td>{{ item.time_start }}</td>
                    <td>{{ item.time_end }}</td>
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
        <div class="row d-flex justify-content-end mt-3 align-items-center flex-nowrap m-1">
          
            <button
               v-show="counter"
              type="button"
              @click="counter--"
              class="btn  btn-secondary btn-sm"
            >
              Previous
            </button>
  
            <button
              v-if="this.counter <= 1"
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
              id="modalCloseButton"
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
                    v-if="missingModalStart && attemptInsert"
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
                    v-if="missingModalEnd && attemptInsert"
                    >Authorized Time End is required!</small
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
    // await this.getBusinessList(this.companyId);
    // await this.getReportingManager(this.loggedUserId);
    await this.todaysDate();
    await this.itfInitiate();
    this.isLoading = false;
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

    totalOTHours() {
      if (this.overtime.length > 0) {
        const total = this.overtime
          .map((overtime) => parseFloat(overtime.ot_totalhrs))
          .reduce((acc, overtime) => overtime + acc);
        return total;
      } else {
        return 0;
      }
    },

    missingReportingManager() {
      if (this.reportingManagerItem.code === undefined) {
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

    missingModalStart() {
      if (this.authTimeStart === null) {
        return true;
      } else {
        return false;
      }
    },

    missingModalEnd() {
      if (this.authTimeEnd === null) {
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
      counter: 0,
      setIndex: "",
      attemptNext: false,
      attemptNextOne: false,
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

      // The Alert
      isAlert: false,
      header: "", // Syccess or Failed
      message: "", // added successfully
      type: "", // true or false

      // itinerary Details
      client: [],
      itemModalClient: {},
      authTimeStart: null,
      authTimeEnd: null,
      modalPurpose: "",

      itinerary: [],
      editItinerary: "",

      isLoading: false,
      isLoadingModal: false,
      isButton: true,
      overtime: [],
      editOvertime: [],
      i: 0,

      // The Attachments
      selectedFile: [],
      filespreview: [],
    };
  },

  methods: {
    getBusinesses2(){
      return axios.get(`http://127.0.0.1:8000/api/general-businesses/${localStorage.getItem("companyId")}`);
    },

    getReportingManager2(){
      return axios.get(`http://127.0.0.1:8000/api/reporting-manager/${localStorage.getItem("id")}`);
    },

    async itfInitiate() {
      await Promise.all([this.getBusinesses2(), this.getReportingManager2()])
      .then((results) => {
        const businesses = results[0];
        const managers = results[1];

      const client = [];
      for (const key in businesses.data) {
        const request = {
          code: businesses.data[key].businessNumber,
          name: businesses.data[key].businessName,
        };
        client.push(request);
      }
      this.client = client;

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

    next() {
      if (this.counter === 0) {
        this.attemptNext = true;
      } else if (this.counter === 1) {
        this.attemptNext = false;
        this.attemptNextOne = true;
      }

      this.validateCurrentTab(this.counter);
    },

    validateCurrentTab(counter) {
      // Request Details
      if (counter === 0) {
        if (!this.missingReportingManager) {
          this.counter++;
        }
        // Payment Details
      } else if (counter === 1) {
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

    openToast(position, variant, message) {
      const toastTitle = variant.charAt(0).toUpperCase() + variant.slice(1);
      VsToast.show({
        title: `${toastTitle}`,
        message: `${message}`,
        variant,
        position,
      });
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

    async getReportingManager(rmid) {
      const response = await fetch(
        `http://127.0.0.1:8000/api/reporting-manager/${rmid}`,
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
      // console.log(this.reportingManager);
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

      const validated = this.validateEmptyFields();
      const isGreaterThan = this.validateStartEndDate(
        this.authTimeStart,
        this.authTimeEnd
      );

      if (validated && isGreaterThan) {
        // start
        const addData = {
          id: this.editItinerary.id,
          client_id: this.itemModalClient.code,
          client_name: this.itemModalClient.name,
          time_start: this.authTimeStart,
          time_end: this.authTimeEnd,
          purpose: this.modalPurpose,
        };
        this.itinerary.push(addData);
        this.itinerary.splice(this.setIndex, 1);
        this.itinerary.sort(function (a, b) {
          return a.id - b.id;
        });
        this.addAlert("Success", "Added Successfully!", "true");
        this.resetModal();
        this.isLoadingModal = false;
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

    edit(index) {
      this.isButton = false;
      const seletectedItinerary = this.itinerary[index];
      this.editItinerary = seletectedItinerary;
      this.setIndex = index;
      this.itemModalClient = {
        code: seletectedItinerary.client_id,
        name: seletectedItinerary.client_name,
      };

      this.authTimeStart = seletectedItinerary.time_start;
      this.authTimeEnd = seletectedItinerary.time_end;
      this.modalPurpose = seletectedItinerary.purpose;
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

    resetModal() {
      this.overtimeDate = "";
      this.authTimeStart = "";
      this.authTimeEnd = "";
      this.authOThrs = "";
      this.itemEmployeeName = {};
      this.modalPurpose = "";
      // this.itemModalProjectName = {}
      // this.clientId = "";
      // this.clientName = "";
      // this.mainId = "";
    },

    addAlert(header, message, type) {
      this.isAlert = true;
      this.header = header;
      this.message = message;
      this.type = type;
    },

    insert() {
      this.isLoadingModal = true;
      this.attemptInsert = true;
      this.resetAlert();
      const validated = this.validateEmptyFields();
      const isGreaterThan = this.validateStartEndDate(
        this.authTimeStart,
        this.authTimeEnd
      );

      if (validated && isGreaterThan) {
        // start
        const addData = {
          id: this.i++,
          client_id: this.itemModalClient.code,
          client_name: this.itemModalClient.name,
          time_start: this.authTimeStart,
          time_end: this.authTimeEnd,
          purpose: this.modalPurpose,
        };
        this.isLoadingModal = false;
        this.itinerary.push(addData);
        this.addAlert("Success", "Added Successfully!", "true");
        this.resetModal();
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

    resetModal() {
      this.attemptInsert = false;
      this.itemModalClient = {};
      this.authTimeStart = null;
      this.authTimeEnd = null;
      this.modalPurpose = "";
    },

    validateEmptyFields() {
      if (
        !this.missingModalClient &&
        !this.missingModalStart &&
        !this.missingModalEnd &&
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
