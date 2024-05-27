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
        <h3 class="card-title">Overtime Request</h3>
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
                >Overtime Details</span
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
                  :value="'OTR-' + todaysYear"
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

        <!-- Overtime Details -->
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
                    <span class="mb-1 ml-1"> Overtime Table</span>
                  </aside>
                </th>
                <th>
                  <aside class="text-center">
                    <button
                      class="btn btn-sm btn-success m-0"
                      data-toggle="modal"
                      data-target="#modal-overtime"
                      @click="setButton()"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                  </aside>
                </th>
              </tr>
              <tr>
                <th scope="col" style="width: 5%" class="text-center">#</th>
                <th scope="col" style="width: 10%">Employee Name</th>
                <th scope="col" style="width: 15%">Project Name</th>
                <th scope="col" style="width: 10%">Ovetime Date</th>
                <th scope="col" style="width: 10%">Auth. Time Start</th>
                <th scope="col" style="width: 10%">Auth. Time End</th>
                <th scope="col" style="width: 10%">Auth. OT Hours</th>
                <th scope="col" style="width: 20%">Purpose</th>
                <th scope="col" style="width: 10%">Action</th>
              </tr>
            </thead>
            <tbody style="font-size: 14px">
              <tr v-for="(item, index) in overtime" :key="item.id">
                <td class="text-center">{{ index + 1 }}.</td>
                <td>{{ item.employee_name }}</td>
                <td>{{ item.PRJNAME }}</td>
                <td>{{ item.overtime_date }}</td>
                <td>{{ item.ot_in }}</td>
                <td>{{ item.ot_out }}</td>
                <td>{{ item.ot_totalhrs }}</td>
                <td>{{ item.purpose }}</td>
                <td class="pl-0 m-0">
                  <aside class="d-flex justify-content-center">
                    <button
                      class="btn btn-sm btn-info m-0"
                      @click="edit(overtime.indexOf(item))"
                      data-toggle="modal"
                      data-target="#modal-overtime"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-danger m-0 ml-1"
                      @click="trash(overtime.indexOf(item))"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </aside>
                </td>
              </tr>

              <tr>
                <td colspan="7"></td>
                <td colspan="2">
                  <b>Total OT Hours: {{ this.totalOTHours }}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- /.Overtime Details -->

        <!-- Attachments -->
        <!-- <div
          v-else-if="this.counter === 2"
          class="
            d-flex
            align-items-center
            justify-content-center
            text-center
            position-relative
            mt-4
          "
          id="app"
        >
          <div
            class="p-5 col-md-12 rounded"
            @dragover="dragover"
            @dragleave="dragleave"
            @drop="drop"
            id="uploadContainer"
          >
            <input
              type="file"
              multiple
              name="fields[assetsFieldHandle][]"
              id="assetsFieldHandle"
              class="w-25 h-25 overflow-hidden"
              @change="onFileSelected"
              ref="file"
              accept=".pdf,.jpg,.jpeg,.png"
            />

            <label for="assetsFieldHandle" class="block cursor-pointer">
              <span class="text-secondary">Drag and Drop files here</span>
              <br /><span class="text-secondary">or</span><br />
              <div id="uploadText" class="mt-2 btn btn-sm btn-primary">
                Select files
              </div>
            </label>
   
            <ul
              class="mt-4 text-decoration-none ulUpload"
              v-if="this.selectedFile.length"
              v-cloak
            >
              <li
                class="text-sm mt-2"
                v-for="(file, index) in selectedFile"
                :key="file.name"
              >
                <div class="row d-flex justify-content-center">
                  <div class="col-md-4 d-flex">
                    <div class="col-1">
                      <b>{{ index + 1 + "." }}</b>
                    </div>
                    <div class="col text-left">
                      <span>{{ file.name }}</span>
                    </div>
                    <div class="co-2">
                      <button
                        class="btn btn-danger btn-sm"
                        type="button"
                        @click="remove(selectedFile.indexOf(file))"
                        title="Remove file"
                      >
                        Remove
                      </button>
                    </div>
                    <div class="col-2">
                      <button
                        @click="preview(selectedFile.indexOf(file))"
                        class="btn btn-secondary btn-sm"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

     
          </div>
        </div> -->

        <!-- /.Attachments -->

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
                    <td style="width: 80%">{{ "OTR-" + todaysYear }}</td>
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

          <!-- Overtime Details Review -->
          <div class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">Overtime Details</h3>

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
                    <th style="width: 10%">Employee Name</th>
                    <th style="width: 20%">Project Name</th>
                    <th style="width: 10%">Ovetime Date</th>
                    <th style="width: 15%">Auth. Time Start</th>
                    <th style="width: 15%">Auth. Time End</th>
                    <th style="width: 5%">Auth. OT Hours</th>
                    <th style="width: 20%">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in overtime" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.employee_name }}</td>
                    <td>{{ item.PRJNAME }}</td>
                    <td>{{ item.overtime_date }}</td>
                    <td>{{ item.ot_in }}</td>
                    <td>{{ item.ot_out }}</td>
                    <td>{{ item.ot_totalhrs }}</td>
                    <td>{{ item.purpose }}</td>
                  </tr>

                  <tr>
                    <td colspan="6"></td>
                    <b class="px-1">Total OT Hours: {{ this.totalOTHours }}</b>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>

          <!-- /.Overtime Details Review -->

          <!-- Attachments form review -->
          <!-- <div class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">Attachments</h3>

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
        
            <div class="card-body p-0">
              <table
                class="table table-sm table-bordered table-hover table-striped"
              >
                <thead>
                  <tr>
                    <th style="width: 5%">#</th>
                    <th style="width: 80%">Filename</th>
                    <th style="width: 15%">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(file, index) in selectedFile" :key="file.name">
                    <td>{{ index + 1 }}</td>
                    <td>{{ file.name }}</td>
                    <td class="pl-2 pr-2 text-center">
                      <button
                        @click="remove(selectedFile.indexOf(file))"
                        class="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                      <button
                        @click="preview(selectedFile.indexOf(file))"
                        class="btn btn-secondary btn-sm ml-1"
                      >
                        Preview
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
          </div> -->
          <!-- /. Attachments form review -->
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

    <!-- Modal Overtime-->
    <div
      class="modal fade"
      id="modal-overtime"
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
              <b>Overtime Details</b>
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
                  <small><label for="projectName">Project Name</label></small>
                  <model-list-select
                    :list="projectName"
                    v-model="itemModalProjectName"
                    option-value="code"
                    option-text="name"
                    placeholder="Select Project Name"
                    style="padding: 9px"
                  >
                  </model-list-select>
                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingModalProject && attemptInsert"
                    >Project Name is required!</small
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-5">
                <div class="form-group">
                  <small><label for="overtimeDate">Overtime Date</label></small>
                  <date-picker
                    valueType="format"
                    style="display: block; width: 100%; line-height: 20px"
                    v-model="overtimeDate"
                  ></date-picker>
                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingModalOTDate && attemptInsert"
                    >Overtime Date is required!</small
                  >
                </div>
              </div>

              <div class="col-md-7">
                <div class="form-group">
                  <small><label for="employeeName">Employee Name</label></small>
                  <model-list-select
                    :list="employeeName"
                    v-model="itemEmployeeName"
                    option-value="code"
                    option-text="name"
                    placeholder="Select Employee Name"
                    style="padding: 9px"
                  >
                  </model-list-select>
                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingModalEmployee && attemptInsert"
                    >Employee Name is required!</small
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-5">
                <div class="form-group">
                  <small
                    ><label for="authTimeStart"
                      >Authorized Time Start</label
                    ></small
                  >
                  <date-picker
                    v-model="authTimeStart"
                    @change="setTime"
                    :minute-step="5"
                    format="MM/DD/YYYY hh:mm A"
                    value-type="format"
                    type="datetime"
                    style="display: block; width: 100%; line-height: 20px"
                  ></date-picker>
                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingModalAuthStart && attemptInsert"
                    >Auth. Start is required!</small
                  >
                </div>
              </div>

              <div class="col-md-5">
                <div class="form-group">
                  <small
                    ><label for="authTimeEnd">Authorized Time End</label></small
                  >
                  <date-picker
                    v-model="authTimeEnd"
                    @change="setTime"
                    :minute-step="5"
                    format="MM/DD/YYYY hh:mm A"
                    value-type="format"
                    type="datetime"
                    style="display: block; width: 100%; line-height: 20px"
                  ></date-picker>
                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingModalAuthEnd && attemptInsert"
                    >Auth. End is required!</small
                  >
                </div>
              </div>

              <div class="col-md-2">
                <div class="form-group">
                  <small><label for="authOT">Auth Hrs</label></small>
                  <input
                    type="text"
                    disabled
                    v-model="authOThrs"
                    class="form-control py-3 form-control-sm"
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
    <!-- /.modal Ovetime -->
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
    // this.getProjects();
    // this.getReportingManager();
    this.isLoading = true;
    await this.todaysDate();
    await this.otInitiate();
    this.isLoading = false;

    // this.getEmployees(this.companyId);
  },
  watch: {
    itemModalProjectName(newValue) {
      if (newValue.code > 0) {
        this.getClient(newValue.code);
      }
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

    missingOTData() {
      if (this.overtime.length < 1) {
        return true;
      } else {
        return false;
      }
    },

    // modal
    missingModalProject() {
      if (this.itemModalProjectName.code === undefined) {
        return true;
      } else {
        return false;
      }
    },
    missingModalEmployee() {
      if (this.itemEmployeeName.code === undefined) {
        return true;
      } else {
        return false;
      }
    },
    missingModalOTDate() {
      if (this.overtimeDate === null) {
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
    missingModalPurpose() {
      if (this.modalPurpose.length === 0) {
        return true;
      } else {
        return false;
      }
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

      // Overtime Details
      employeeName: [],
      itemEmployeeName: {},

      projectName: [],
      itemModalProjectName: {},
      clientName: "",
      clientId: "",
      mainId: "",

      overtimeDate: null,
      authTimeStart: null,
      authTimeEnd: null,
      authOThrs: "",
      modalPurpose: "",
      // totalOT: 0,
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
    getProjects2(){
      return axios.get(`http://127.0.0.1:8000/api/general-getprojects/${localStorage.getItem("companyId")}`);
    },

    getReportingManager2(){
      return axios.get(`http://127.0.0.1:8000/api/reporting-manager/${localStorage.getItem("id")}`);
    },

    getEmployees2(){
      return axios.get(`http://127.0.0.1:8000/api/get-employees/${localStorage.getItem("companyId")}`);
    },

    async otInitiate(){
      await Promise.all([this.getProjects2(), this.getReportingManager2(), this.getEmployees2()])
      .then((results) => {
        const projects = results[0];
        const managers = results[1];
        const employees = results[2];



      let project = [];
      for (const key in projects.data) {
        const request = {
          code: projects.data[key].project_id,
          name: projects.data[key].project_name,
        };
        project.push(request);
      }
      this.projectName = project;

      const reportingManager = [];
      for (const key in managers.data) {
        const request = {
          code: managers.data[key].RMID,
          name: managers.data[key].RMName,
        };
        reportingManager.push(request);
      }
      this.reportingManager = reportingManager;

      const employeeName = [];
      for (const key in employees.data) {
        const request = {
          code: employees.data[key].SysPK_Empl,
          name: employees.data[key].Name_Empl,
        };
        employeeName.push(request);
      }
      this.employeeName = employeeName;

      
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
        if (!this.missingOTData) {
          this.counter++;
        } else {
          this.openToast(
            "top-right",
            "warning",
            "Please add your Overtime data!"
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

    setTime() {
      const time_start = new Date(this.authTimeStart);
      const time_end = new Date(this.authTimeEnd);

      let time_total = (time_end - time_start) / 1000 / 60 / 60;

      let f = Math.floor(time_total);
      if (time_total - f < 0.5) {
        time_total = Math.floor(time_total);
        console.log(time_total);
        this.authOThrs = time_total;
        // $('#authtime_totalHrs').val(time_total);
      } else {
        time_total = f + 0.5;
        console.log(time_total);
        this.authOThrs = time_total;
        // $('#authtime_totalHrs').val(time_total);
      }
    },

    closeModal() {
      this.resetAlert();
      this.resetModal();
    },

    async submit() {
      this.isLoading = true;
      const fd = new FormData();

      for (let i = 0; i < this.selectedFile.length; i++) {
        fd.append("file[]", this.selectedFile[i]);
      }

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
      fd.append("form", "Overtime Request");
      fd.append("class", "OT");

      fd.append("overtimeData", JSON.stringify(this.overtime));

      console.log(this.overtime);

      try {
        const resp = await axios.post("http://127.0.0.1:8000/api/save-ot", fd);

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

    async getEmployees(companyId) {
      this.isLoading = true;

      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/get-employees/${companyId}`
        );

        if (resp.status === 200) {
          this.isLoading = false;

          // console.log(resp);

          const employeeName = [];
          for (const key in resp.data) {
            const request = {
              code: resp.data[key].SysPK_Empl,
              name: resp.data[key].Name_Empl,
            };
            employeeName.push(request);
          }
          this.employeeName = employeeName;
          // console.log(this.employeeName);
        }
      } catch (err) {
        this.isLoading = false;

        // Handle Error Here
        console.error(err);
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

    async getClient(id) {
      const response = await fetch(
        `http://127.0.0.1:8000/api/business-client/${id}`,
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
      const client = [];
      for (const key in responseData) {
        const request = {
          clientId: responseData[key].clientID,
          clientName: responseData[key].clientName,
          mainId: responseData[key].mainID,
        };
        client.push(request);
      }
      this.clientName = client[0].clientName;
      this.clientId = client[0].clientId;
      this.mainId = client[0].mainId;
    },

    // Overtime Details
    async getProjects() {
      this.isLoading = true;
      const response = await fetch(
        "http://127.0.0.1:8000/api/general-projects",
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
          responseData.message || "Failed to fetch Projects."
        );
        throw error;
      }
      this.isLoading = false;

      const project = [];
      for (const key in responseData) {
        const request = {
          code: responseData[key].project_id,
          name: responseData[key].project_name,
        };
        project.push(request);
      }
      this.projectName = project;
    },

    async update() {
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
          id: this.editOvertime.id,
          overtime_date: this.overtimeDate,
          ot_in: this.authTimeStart,
          ot_out: this.authTimeEnd,
          ot_totalhrs: this.authOThrs,
          employee_id: this.itemEmployeeName.code,
          employee_name: this.itemEmployeeName.name,
          purpose: this.modalPurpose,
          cust_id: this.clientId,
          cust_name: this.clientName,
          PRJID: this.itemModalProjectName.code,
          PRJNAME: this.itemModalProjectName.name,
          main_id: this.mainId,
        };
        // this.overtime.push(addData);
        // this.liquidation.push(this.editliquidation)

        const otData = [];
        otData.push(addData);

        const fd = new FormData();
        fd.append("overtimeData", JSON.stringify(otData));

        try {
          const resp = await axios.post(
            "http://127.0.0.1:8000/api/validateOT",
            fd
          );

          if (resp.status === 200) {
            this.overtime.push(addData);
            this.isLoadingModal = false;

            this.addAlert("Success", resp.data.message, "true");
            this.editOvertime = "";
            this.overtime.splice(this.setIndex, 1);
            this.resetModal();
            this.overtime.sort(function (a, b) {
              return a.id - b.id;
            });
          }

          if (resp.status === 202) {
            this.isLoadingModal = false;
            this.addAlert("Failed", resp.data.message, "false");
          }

          console.log(resp.data);
        } catch (err) {
          // Handle Error Here
          this.isLoadingModal = false;
          this.addAlert(
            "Failed",
            "Please Contact the administrator! and try again later",
            "false"
          );

          // Handle Error Here
          console.error(err);
        }
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
      const selectedOvertime = this.overtime[index];
      this.editOvertime = selectedOvertime;
      this.setIndex = index;

      console.log(selectedOvertime)

      console.log(this.editOvertime);

      this.itemEmployeeName = {
        code: selectedOvertime.employee_id,
        name: selectedOvertime.employee_name,
      };
      this.itemModalProjectName = {
        code: selectedOvertime.PRJID,
        name: selectedOvertime.PRJNAME,
      };
      this.overtimeDate = selectedOvertime.overtime_date;
      this.authTimeStart = selectedOvertime.ot_in;
      this.authTimeEnd = selectedOvertime.ot_out;
      this.authOThrs = selectedOvertime.ot_totalhrs;
      this.modalPurpose = selectedOvertime.purpose;
    },

    setButton() {
      this.isButton = true;
    },

    trash(index) {
      this.overtime.splice(index, 1);
    },

    resetAlert() {
      this.isAlert = false;
      this.header = "";
      this.message = "";
      this.type = "";
    },

    resetModal() {
      this.overtimeDate = null;
      this.authTimeStart = null;
      this.authTimeEnd = null;
      this.authOThrs = "";
      this.itemEmployeeName = {};
      this.modalPurpose = "";
      this.attemptInsert = false;
      this.itemModalProjectName = {};
    },

    // Retain Project Name and Employee Name
    resetModalTwo() {
      this.overtimeDate = null;
      this.authTimeStart = null;
      this.authTimeEnd = null;
      this.authOThrs = "";
      // this.itemEmployeeName = {};
      this.modalPurpose = "";
      this.attemptInsert = false;
      // this.itemModalProjectName = {};
    },



    addAlert(header, message, type) {
      this.isAlert = true;
      this.header = header;
      this.message = message;
      this.type = type;
    },

    async insert() {
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
        const otData = [];
        const addData = {
          id: this.i++,
          overtime_date: this.overtimeDate,
          ot_in: this.authTimeStart,
          ot_out: this.authTimeEnd,
          ot_totalhrs: this.authOThrs,
          employee_id: this.itemEmployeeName.code,
          employee_name: this.itemEmployeeName.name,
          purpose: this.modalPurpose,
          cust_id: this.clientId,
          cust_name: this.clientName,
          PRJID: this.itemModalProjectName.code,
          PRJNAME: this.itemModalProjectName.name,
          main_id: this.mainId,
        };
        // this.overtime.push(addData);
        otData.push(addData);
        console.log(addData)

        const fd = new FormData();
        fd.append("overtimeData", JSON.stringify(otData));

        try {
          const resp = await axios.post(
            "http://127.0.0.1:8000/api/validateOT",
            fd
          );

          if (resp.status === 200) {
            this.overtime.push(addData);
            this.isLoadingModal = false;

            this.addAlert("Success", resp.data.message, "true");
            this.resetModalTwo();
            
          }

          if (resp.status === 202) {
            this.isLoadingModal = false;
            this.addAlert("Failed", resp.data.message, "false");
          }
        } catch (err) {
          this.isLoadingModal = false;
          this.addAlert(
            "Failed",
            "Please Contact the administrator! and try again later",
            "false"
          );

          // Handle Error Here
          console.error(err);
        }

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

    // The Attachments
    onFileSelected(event) {
      let selectedFiles = event.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.selectedFile.push(selectedFiles[i]);
      }
      this.filePreview();
    },
    onInputChange(event) {
      let selectedFiles = event.dataTransfer.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.selectedFile.push(selectedFiles[i]);
      }
      this.filePreview();
    },
    remove(i) {
      this.selectedFile.splice(i, 1);
      this.filePreview();
    },
    preview(i) {
      // console.log(i)
      const url = this.filespreview[i].link;
      window.open(url, "_blank", "resizable=yes");
    },

    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains("bg-white")) {
        event.currentTarget.classList.remove("bg-light");
        event.currentTarget.classList.add("bg-white");
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add("bg-light");
      event.currentTarget.classList.remove("bg-white");
    },
    drop(event) {
      event.preventDefault();
      this.onInputChange(event); // Trigger the onChange event manually

      // Clean up
      event.currentTarget.classList.add("bg-light");
      event.currentTarget.classList.remove("bg-white");
    },

    filePreview() {
      let files = this.selectedFile;
      const fileContainer = [];
      for (let i = 0; i < files.length; i++) {
        let tmppath = URL.createObjectURL(files[i]);
        const thisFiles = {
          link: tmppath,
        };
        fileContainer.push(thisFiles);
      }
      this.filespreview = fileContainer;
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
