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
                >Review</span
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
                <th :colspan="headerActual" scope="col">
                  <aside class="d-flex align-items-center">
                    <span class="mb-1 ml-1"> Overtime Table</span>
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
                <th v-if="isActual" scope="col" style="width: 10%">
                  Actual Time Start
                </th>
                <th v-if="isActual" scope="col" style="width: 10%">
                  Actual Time End
                </th>
                <th v-if="isActual" scope="col" style="width: 10%">
                  Actual OT Hours
                </th>
                <th scope="col" style="width: 20%">Purpose</th>
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
                <td v-if="isActual">{{ item.ot_in_actual }}</td>
                <td v-if="isActual">{{ item.ot_out_actual }}</td>
                <td v-if="isActual">{{ item.ot_totalhrs_actual }}</td>
                <td>{{ item.purpose }}</td>
              </tr>

              <tr>
                <td :colspan="numberActual"></td>
                <td colspan="2">
                  <b>Total OT Hours: {{ this.totalOTHours }}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- /.Overtime Details -->

        <!-- The Attachments -->
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
          <div class="p-5 col-md-12 rounded" id="uploadContainer">
            <label for="assetsFieldHandle" class="block cursor-pointer">
              <span class="text-secondary">List of Attached File</span>
            </label>

            <ul class="mt-4 text-decoration-none ulUpload" v-cloak>
              <li
                class="text-sm mt-2"
                v-for="(file, index) in selectedFile"
                :key="file.newFilename"
              >
                <div class="row d-flex justify-content-center">
                  <div class="col-md-4 d-flex">
                    <div class="col-1">
                      <b>{{ index + 1 + "." }}</b>
                    </div>
                    <div class="col text-left">
                      <span>{{ file.filename }}</span>
                    </div>
                    <div>
                      <button class="btn btn-info btn-sm" type="button">
                        <a
                          :download="file.filename"
                          style="color: white"
                          :href="
                            'data:' +
                            file.mimeType +
                            ';base64,' +
                            file.imageBytes
                          "
                          target="_blank"
                          >Download</a
                        >
                      </button>
                    </div>
                    <div class="col-2">
                      <button
                        class="btn btn-secondary btn-sm"
                        @click="preview(file.mimeType, file.imageBytes)"
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
        <!-- / The Attachments -->

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
                    <th v-if="isActual" style="width: 15%">
                      Actual Time Start
                    </th>
                    <th v-if="isActual" style="width: 15%">Actual Time End</th>
                    <th v-if="isActual" style="width: 5%">Actual OT Hours</th>
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
                    <td v-if="isActual">{{ item.ot_in_actual }}</td>
                    <td v-if="isActual">{{ item.ot_out_actual }}</td>
                    <td v-if="isActual">{{ item.ot_totalhrs_actual }}</td>
                    <td>{{ item.purpose }}</td>
                  </tr>

                  <tr>
                    <td :colspan="numberActual"></td>
                    <b class="px-1">Total OT Hours: {{ totalOTHours }}</b>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.Overtime Details Review -->

          <!-- Form Review Attachments -->
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
                    <td>{{ file.filename }}</td>
                    <td class="pl-2 pr-2 text-center">
                      <button
                        @click="preview(file.mimeType, file.imageBytes)"
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
          <!-- /.Form Review Attachments -->
        </aside>
        <!-- / Form Review -->

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
                @click="close()"
                class="btn ml-1 btn-danger btn-sm"
              >
                Close
              </button>
    
          </aside>
        </div>
        <!-- / Buttons -->

        <!-- / Main Form -->
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
    await this.getOtMain(this.$route.params.id);
    await this.getAttachments(this.$route.params.id, this.$route.params.frmName);
    this.isLoading = false; 
  },
  watch: {
    counter() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },

    async $route(newRoute) {
      
      this.isLoading = true;  
      this.counter = 0
      await this.getOtMain(newRoute.params.id);
      await this.getAttachments(newRoute.params.id, newRoute.params.frmName);
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

    numberActual() {
      if (this.isActual === true) {
        return 9;
      } else {
        return 6;
      }
    },

    headerActual() {
      if (this.isActual === true) {
        return 11;
      } else {
        return 8;
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
      // Request Details
      referenceNumber: "",
      requestedDate: "",
      reportingManagerName: "",

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

      // totalOT: 0,
      isLoading: false,
      isLoadingModal: false,
      processId: this.$route.params.id,
      form: this.$route.params.frmName,
      withdrawRemarks: "",

      overtime: [],

      // The Attachments
      selectedFile: [],

      isActual: false,
    };
  },

  methods: {
    async withdrawn() {
      this.isLoadingModal = true;
      const fd = new FormData();

      fd.append("withdrawRemarks", this.withdrawRemarks);
      fd.append("reqId", this.processId);
      fd.append("form", this.form);
      fd.append("companyId", this.companyId);
      fd.append("loggedUserId", this.loggedUserId);

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
    },

    close() {
      this.$router.replace("/approved");
    },

    preview(mimeType, imageBytes) {
      if (mimeType === 'image/jpeg' || mimeType === 'image/png') 
      {
        var newTab = window.open();
        newTab.document.body.innerHTML = `<img src="data:${mimeType};base64,${imageBytes}" resizable=yes, style="max-width: 100%; height: auto; ">`;
      }

      else if (mimeType === 'application/pdf')
      {
        let pdfWindow = window.open('#')
        pdfWindow.document.write(`<iframe width='100%' height='100%' src='data:${mimeType};base64, ` +encodeURI(imageBytes) + "'></iframe>")
      }
    
    },

    async getAttachments(id, form) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/getRfpAttachments/${id}/${form}`
        );
        // console.log(resp.status);
        if (resp.status === 200) {
          this.selectedFile = resp.data.data;
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    async getOtMain(id) {
      // this.isLoading = true;
      try {
        const resp = await axios.get(`http://127.0.0.1:8000/api/ot-main/${id}`);
        // console.log(resp.data);
        if (resp.status === 200) {
          // this.isLoading = false;
          this.referenceNumber = resp.data[0].reference;
          this.requestedDate = resp.data[0].request_date;
          this.reportingManagerName = resp.data[0].reporting_manager;

          this.overtime = resp.data;

          if (resp.data[0].ot_totalhrs_actual === null) {
            this.isActual = false;
          } else {
            this.isActual = true;
          }
          // console.log(this.isActual)
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
