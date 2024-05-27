<template>
  <!-- Container -->
  <div class="col-md-12 mt-3">
    <div class="card card-secondary chrome">
      <div
        class="overlay"
        style="background-color: white !important"
        v-show="isLoading"
      >
        <loading-spinner></loading-spinner>
      </div>

      <div class="card-header">
        <h3 class="card-title">Materials Request</h3>
      </div>
      <div class="card-body">
        <!-- Progress Bar -->
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
          <div class="progressbar" :class="classD">
            <span :class="classD">4</span>
          </div>
        </div>
        <div class="d-flex text-center mb-4">
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
                >Request Form</span
              ></small
            >
          </div>
          <div class="textbar" :class="classC">
            <small
              ><span :class="classC" class="font-weight-bold"
                >Attachments</span
              ></small
            >
          </div>
          <div class="textbar" :class="classD">
            <small
              ><span :class="classD" class="font-weight-bold"
                >Form Review</span
              ></small
            >
          </div>
        </div>
        <!-- /. Progress Bar -->

        <!-- #2 request details-->
        <section v-show="counter === 1">
          <div class="row mt-4">
            <div class="col-md-6">
              <div class="form-group">
                <small><label for="class-name">Class</label></small>
                <input
                  type="text"
                  class="form-control form-control-sm py-3"
                  disabled
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <small><label for="type-name">Type</label></small>
                <input
                  type="text"
                  class="form-control form-control-sm py-3"
                  disabled
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div class="form-group">
                <small
                  ><label for="class-type"
                    >Type of Supplies Request Internal</label
                  ></small
                >
                <input
                  type="text"
                  class="form-control form-control-sm py-3"
                  disabled
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <small><label for="surf-number">SURF Number</label></small>
                <input
                  type="text"
                  class="form-control form-control-sm py-3"
                  disabled
                />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <small
                  ><label for="requested-date">Requested Date</label></small
                >
                <input
                  type="text"
                  class="form-control form-control-sm py-3"
                  disabled
                />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <small
                  ><label for="actual-delivery-date"
                    >Actual Delivery Date</label
                  ></small
                >
                <input
                  type="text"
                  class="form-control form-control-sm py-3"
                  disabled
                />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <small
                  ><label for="planned-delivery-date"
                    >Planned Delivery Date</label
                  ></small
                >
                <input
                  type="text"
                  class="form-control form-control-sm py-3"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <small
                  ><label for="mrf-short-text">MRF Short Text</label></small
                >
                <input
                  type="text"
                  class="form-control form-control-sm py-3"
                  disabled
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <small
                  ><label for="reporting-manager"
                    >Reporting Manager</label
                  ></small
                >
                <input
                  type="text"
                  class="form-control form-control-sm py-3"
                  disabled
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <small><label for="cost-center">Cost Center</label></small>
                <input
                  type="text"
                  class="form-control form-control-sm py-3"
                  disabled
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <small><label for="client-name">Client Name</label></small>
                <input
                  type="text"
                  class="form-control form-control-sm py-3"
                  disabled
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div class="form-group">
                <small><label for="purpose">Purpose</label></small>
                <!-- <textarea class="form-control" name="purpose" id="purpose" :value="message" @input="updateMessage"  rows="5"></textarea> -->
                <textarea class="form-control" disabled rows="5"></textarea>
              </div>
            </div>
          </div>
        </section>

        <!-- #3 attach-->
        <section class="mb-4" v-show="counter === 2">
          <div class="row mt-4">
            <div class="pt-2 col-md-12 rounded" id="uploadContainer">
              <label
                for="assetsFieldHandle"
                style="width: 100%; text-align: center; cursor: pointer"
                class="block pt-3 cursor-pointer"
              >
                <span class="text-secondary">List of Attached File</span>
              </label>
            </div>
          </div>
        </section>

        <!-- #4 request details review (current active)-->
        <section class="card card-secondary" v-show="counter === 3">
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
                <tr class="row p-0 m-0">
                  <td class="col-md-3 px-3">MRF Number</td>
                  <td class="col-md-9 px-3">{{ mrf_number }}</td>
                </tr>
                <tr class="row p-0 m-0">
                  <td class="col-md-3 px-3">Department</td>
                  <td class="col-md-9 px-3">{{ department }}</td>
                </tr>
                <tr class="row p-0 m-0">
                  <td class="col-md-3 px-3">Full Name</td>
                  <td class="col-md-9 px-3">{{ full_name }}</td>
                </tr>
                <tr class="row p-0 m-0">
                  <td class="col-md-3 px-3">Reporting Manager</td>
                  <td class="col-md-9 px-3">{{ reporting_manager }}</td>
                </tr>
                <tr class="row p-0 m-0">
                  <td class="col-md-3 px-3">MRF Short Text</td>
                  <td class="col-md-9 px-3">{{ mrf_short_text }}</td>
                </tr>
                <tr class="row p-0 m-0">
                  <td class="col-md-3 px-3">Date Requested</td>
                  <td class="col-md-9 px-3">{{ date_requested }}</td>
                </tr>
                <tr class="row p-0 m-0">
                  <td class="col-md-3 px-3">Planned Delivery Date</td>
                  <td class="col-md-9 px-3">{{ planned_delivery_date }}</td>
                </tr>
                <tr class="row p-0 m-0">
                  <td class="col-md-3 px-3">Actual Delivery Date</td>
                  <td class="col-md-9 px-3">{{ actual_delivery_date }}</td>
                </tr>
                <tr class="row p-0 m-0">
                  <td class="col-md-3 px-3">Cost Center</td>
                  <td class="col-md-9 px-3">{{ cost_center }}</td>
                </tr>
                <tr class="row p-0 m-0">
                  <td class="col-md-3 px-3">Client Name</td>
                  <td class="col-md-9 px-3">{{ client_name }}</td>
                </tr>
                <tr class="row p-0 m-0">
                  <td class="col-md-3 px-3">Materials Request Class</td>
                  <td class="col-md-9 px-3">{{ materials_request_class }}</td>
                </tr>
                <tr class="row p-0 m-0">
                  <td class="col-md-3 px-3">Materials Request Type</td>
                  <td class="col-md-9 px-3">{{ materials_request_type }}</td>
                </tr>
                <tr class="row p-0 m-0">
                  <td class="col-md-3 px-3">Remarks</td>
                  <td class="col-md-9 px-3">{{ remarks }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </section>

        <!-- #4 attachments review (current active)-->
        <section class="card card-secondary" v-show="counter === 3">
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
          <!-- /.card-header -->
          <div class="card-body p-0">
            <table
              class="table table-sm table-bordered table-hover table-striped"
            >
              <thead class="p-0 m-0">
                <tr class="row p-0 m-0">
                  <th class="col-md-9 px-3">Filename</th>
                  <th class="col-md-3 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="row p-0 m-0"
                  v-for="file in selectedFileSOF"
                  :key="file.id"
                >
                  <td class="col-md-9 px-3">{{ file.filename }}</td>
                  <td
                    class="
                      col-md-3
                      pl-2
                      pr-2
                      text-center
                      d-flex
                      justify-content-center
                      align-items-center
                    "
                  >
                    <a
                      class="btn btn-info btn-sm"
                      :href="`http://127.0.0.1:8000/api/downloadFile?filepath=${file.fileDestination}&filename=${file.filename}`"
                      target="_blank"
                      >Download</a
                    >
                    <a
                      class="btn btn-secondary btn-sm ml-1"
                      :href="`http://127.0.0.1:8000/${file.filepath}/${file.filename}`"
                      target="_blank"
                      >Preview</a
                    >
                  </td>
                </tr>
                <tr
                  class="row p-0 m-0"
                  v-for="file in selectedFileMRF"
                  :key="file.id"
                >
                  <td class="col-md-9 px-3">{{ file.filename }}</td>
                  <td
                    class="
                      col-md-3
                      pl-2
                      pr-2
                      text-center
                      d-flex
                      justify-content-center
                      align-items-center
                    "
                  >
                    <a
                      class="btn btn-info btn-sm"
                      :href="`http://127.0.0.1:8000/api/downloadFile?filepath=${file.fileDestination}&filename=${file.filename}`"
                      target="_blank"
                      >Download</a
                    >
                    <a
                      class="btn btn-secondary btn-sm ml-1"
                      :href="`http://127.0.0.1:8000/${file.filepath}/${file.filename}`"
                      target="_blank"
                      >Preview</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </section>

        <!-- Requested Items (current active)-->
        <section
          class="card card-secondary"
          v-show="counter === 0 || counter === 3"
        >
          <div class="card-header">
            <h3 class="card-title">Requested Items</h3>

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
          <div class="card-body anyClass scroll-bar">
            <!-- Checkout list -->
            <!-- Request Details -->
            <!-- Checkout loop -->

            <div
              class="card py-0"
              v-for="item in requested_items"
              :key="item.req_dtls_id"
            >
              <div class="row py-2">
                <div
                  class="
                    col-md-3
                    p-0
                    m-0
                    d-flex
                    align-items-center
                    justify-content-center
                  "
                >
                  <img
                    src="https://www.mouti.net/wp-content/plugins/tutor/assets/images/placeholder.svg"
                    style="
                      height: 180px;
                      display: block;
                      width: auto;
                      object-fit: contain;
                    "
                    alt=""
                    srcset=""
                    class=""
                  />
                </div>

                <div class="col-md-9 p-3">
                  <strong class="ellipsis">{{ item.description }}</strong>
                  <p class="card--description ellipsis">
                    {{ item.specification }}
                  </p>
                  <ul class="card--details">
                    <li>
                      <span class="light">Item Code:</span
                      ><span class="dark">{{ item.item_code }}</span>
                    </li>
                    <li>
                      <span class="light">UoM:</span><span class="dark"></span
                      >{{ item.uom }}
                    </li>
                    <li>
                      <span class="light">Category:</span
                      ><span class="dark">{{ item.category_name }}</span>
                    </li>
                    <li>
                      <span class="light">SKU:</span
                      ><span class="dark">{{ item.sku }}</span>
                    </li>
                    <li>
                      <span class="light">Sub Category:</span
                      ><span class="dark">{{ item.sub_category_name }}</span>
                    </li>
                    <li>
                      <span class="light">Order Qty:</span
                      ><span class="dark">{{ item.order_qty }}</span>
                    </li>
                    <li>
                      <span class="light">Brand:</span
                      ><span class="dark">{{ item.brand_name }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- /.Checkout loop -->
            <!-- /.Request Details -->
            <!-- /.Checkout list -->
          </div>
          <!-- /.card-body -->
        </section>

        <!-- Buttons -->
        <div class="row">
          <div class="col-md-6">
            <button
              class="btn mr-1 btn-secondary btn-sm"
              v-show="counter"
              @click="counter--"
              disabled
            >
              Previous
            </button>
            <button
              class="btn mr-1 btn-primary btn-sm"
              v-show="counter <= 2"
              @click="counter++"
            >
              Next
            </button>
          </div>

          <div class="col-md-6 text-right">
            <button
              type="button"
              class="btn btn-success ml-1 btn-sm"
              data-toggle="modal"
              data-target="#modal-default"
              @click="setTitle('Approve')"
            >
              Approve
            </button>

            <button
              type="button"
              class="btn btn-danger ml-1 btn-sm"
              data-toggle="modal"
              data-target="#modal-default"
              @click="setTitle('Reject')"
            >
              Reject
            </button>

            <button
              type="button"
              class="btn btn-warning ml-1 btn-sm"
              data-toggle="modal"
              data-target="#modal-default"
              disabled
              @click="setTitle('Clarify')"
            >
              Clarify
            </button>

            <button class="btn ml-1 btn-danger btn-sm" @click="close()">
              Close
            </button>
          </div>
          <!-- /. Buttons -->
        </div>
      </div>
    </div>

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
            <h6 class="modal-title"><b>{{ title }} Request</b></h6>
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
                  <small><label for="withdrawRemarks">Remarks</label></small>
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
              @click="submit()"
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
  </div>
  <!-- /. Container -->
</template>

<script>
import axios from "axios";
import VsToast from "@vuesimple/vs-toast";
export default {
  created() {
    this.getMrf(this.$route.params.id, localStorage.getItem("companyId"), this.$route.params.frmName);
  },
  watch: {
    counter() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },

    async $route(newRoute) {
      this.getMrf(newRoute.params.id, localStorage.getItem("companyId"), newRoute.params.id);
    },
  },
  data() {
    return {
      counter: 3,
      isLoading: false,
      isLoadingModal: false,
      done_approving: false,
      isAcknowledgeByMM: false,

      title: '',
      withdrawRemarks: "",

      // Request Details Card
      mrf_number: "",
      department: "",
      full_name: "",
      reporting_manager: "",
      mrf_short_text: "",
      date_requested: "",
      planned_delivery_date: "",
      actual_delivery_date: "",
      cost_center: "",
      client_name: "",
      materials_request_class: "",
      materials_request_type: "",
      remarks: "",

      // Attachments Card
      selectedFileSOF: [],
      selectedFileMRF: [],

      // Requested Items Card
      requested_items: [],

      // Logged User Data
      loggedUserId: localStorage.getItem("id"),
      loggedUserFirstName: localStorage.getItem("fname"),
      loggedUserLastName: localStorage.getItem("lname"),
      loggedUserFullName: localStorage.getItem("fullName"),
      loggedUserDepartment: localStorage.getItem("department"),
      loggedUserPosition: localStorage.getItem("positionName"),
      companyId: localStorage.getItem("companyId"),
      companyName: localStorage.getItem("companyName"),
    };
  },

  methods: {
    async getMrf(id, companyId, frmname) {
      this.isLoading = true;
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/get-mrf/${id}/${companyId}/${frmname}`
        );
        
        console.log(resp.data)

        this.isLoading = false;

        // Request Details Card
        this.mrf_number = resp.data.request.mrf_number;
        this.department = resp.data.user.department;
        this.full_name = resp.data.user.fullname;
        this.reporting_manager = resp.data.user.rm_name;
        this.mrf_short_text = resp.data.request.mrf_short_text;
        this.date_requested = resp.data.request.date_requested;
        this.planned_delivery_date = resp.data.request.planned_delivery_date;
        this.actual_delivery_date = resp.data.request.planned_delivery_date;
        this.cost_center = resp.data.request.project_name;
        this.client_name = resp.data.request.client_name;
        this.materials_request_class =
          resp.data.request.materials_request_class;
        this.materials_request_type = resp.data.request.materials_request_type;
        this.remarks = resp.data.request.remarks;

        this.done_approving = resp.data.request.done_approving;
        this.isAcknowledgeByMM = resp.data.request.isAcknowledgeByMM;

        // Attachments Card
        this.selectedFileSOF = resp.data.attachmentsSOF;
        this.selectedFileMRF = resp.data.attachmentsMRF;

        // Requested Items Card
        this.requested_items = resp.data.request.requisition_details;
      } catch (err) {
        // Handle Error Here
        console.error(err);
        this.isLoading = false;
      }
    },

    close() {
      this.$router.replace("/approvals");
    },

    async submit() {
      // this.isLoadingModal = true;
      const fd = new FormData();
      const frmClass = this.$route.params.frmClass;
      const reqId = this.$route.params.id;
      const form = this.$route.params.frmName;

      fd.append("loggedUserId", localStorage.getItem("id"));
      fd.append("loggedUserFirstName", localStorage.getItem("fname"));
      fd.append("loggedUserLastName", localStorage.getItem("lname"));
      fd.append("loggedUserDepartment", localStorage.getItem("department"));
      fd.append("loggedUserPosition", localStorage.getItem("positionName"));
      fd.append("companyId", localStorage.getItem("companyId"));
      fd.append("companyName", localStorage.getItem("companyName"));

      let frmstatus = null;
      if (this.title === 'Approve') {
        frmstatus = 'approved'
      } else if (this.title === 'Reject') {
        frmstatus = 'rejected'
      } else if(this.title === 'Clarify') {
        frmstatus = 'clarify'
      }

      fd.append("frmstatus",frmstatus)
      fd.append("frmClass", frmClass);
      fd.append("processId", reqId);
      fd.append("frmName", form);
      fd.append("withdrawRemarks", this.withdrawRemarks);
      fd.append("done_approving", this.done_approving);
      fd.append("isAcknowledgeByMM", this.isAcknowledgeByMM);



      try {
        const resp = await axios.post(
          "http://127.0.0.1:8000/api/mrf-change-status",
          fd
        );

        this.isLoadingModal = false;
        this.openToast("top-right", "success", resp.data.message);
        document.getElementById("modalCloseButton").click();
        this.$router.replace("/approvals");
      } catch (err) {
        // Handle Error Here
        console.error(err);
        this.isLoadingModal = false;
        this.openToast(
          "top-right",
          "error",
          "Internal Server Error! Please inform the administrator!"
        );
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

    setTitle(title){
      this.title = title
    }
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
    classD() {
      return { active: this.counter >= 3 };
    },
  },
};
</script>

<style scoped>
.anyClass {
  min-height: 30px;
  max-height: 500px;

  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  gap: 7px;
}

.scroll-bar::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.scroll-bar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.scroll-bar::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.scroll-bar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

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

.formInvalid {
  background-color: #fff6f6;
  border-color: #e0b4b4;
}

.glowing-border {
  /* border: 2px solid #e0b4b4; */
  outline: none;
  box-shadow: 0 0 13px #e0b4b4;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card--details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  list-style: none;
  padding: 0;
  line-height: 1.3;
}

.card--details li .light {
  color: #9ca3af;
}

.card--details li .dark {
  color: #050505;
  margin-left: 5px;
}

.overlay__card-body {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;
  text-align: center;
  position: absolute;

  z-index: 999;

  top: 0; /* Position Y halfway in */
  left: 0; /* Position X halfway in */

  width: 100%;
  height: 100%;
}

.overlay__card-body-con {
  position: relative;
}
</style>
