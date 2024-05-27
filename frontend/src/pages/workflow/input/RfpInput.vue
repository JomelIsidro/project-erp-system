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
        <h3 class="card-title">Request for Payment</h3>
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
          <div class="progressbar" :class="classD">
            <span :class="classD">4</span>
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
                >Payment Details</span
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
                <small><label for="requestDate">Request Date</label></small>
                <date-picker
                  disabled
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px"
                  v-model="requestDate"
                ></date-picker>
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label for="dateNeeded">Date Needed</label></small>
                <date-picker
                  disabled
                  v-model="dateNeeded"
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px"
                ></date-picker>
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <small
                  ><label for="reportingManager selextForm" id="selextForm"
                    >Reporting Manager</label
                  ></small
                >
                <input
                  type="text"
                  class="form-control py-3 form-control-sm"
                  disabled
                  v-model="reportingManager"
                  id="reportingManager"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <small><label for="projectName">Project Name</label></small>
                <input
                  type="text"
                  class="form-control py-3 form-control-sm"
                  disabled
                  v-model="projectName"
                  id="projectName"
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <small><label for="clientName">Client Name</label></small>
                <input
                  type="text"
                  disabled
                  class="form-control py-3 form-control-sm"
                  id="clientName"
                  v-model="clientName"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <small><label for="purpose">Purpose</label></small>
                <!-- <textarea class="form-control" name="purpose" id="purpose" :value="message" @input="updateMessage"  rows="5"></textarea> -->
                <textarea
                  class="form-control"
                  name="purpose"
                  id="purpose"
                  v-model="purpose"
                  disabled
                  rows="5"
                ></textarea>
              </div>
            </div>
          </div>
        </aside>
        <!-- / Request Details -->

        <!-- Payment Details -->
        <div class="row mt-4" v-else-if="this.counter === 1">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="form-group">
              <small><label for="payeeName">Payee Name</label></small>
              <input
                type="text"
                class="form-control form-control-sm"
                v-model="payeeName"
                id="payeeName"
                disabled
              />
            </div>
            <div class="form-group">
              <small><label for="modeOfPayment">Mode of Payment</label></small>
              <input
                type="text"
                v-model="modeOfPayment"
                disabled
                class="form-control form-control-sm"
                id="modeOfPayment"
              />
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <small><label for="currency">Currency</label></small>
                  <input
                    type="text"
                    disabled
                    v-model="currency"
                    class="form-control form-control-sm"
                    id="currency"
                  />
                </div>
              </div>
              <div class="col-md-8">
                <div class="form-group">
                  <small><label for="amount">Amount</label></small>
                  <input
                    disabled
                    type="text"
                    class="form-control form-control-sm py-3"
                    id="amount"
                    v-model="amount"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3"></div>
        </div>
        <!-- / Payment Details -->

        <!-- The Attachments -->
        <div
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
          <div class="pt-2 col-md-12 rounded" id="uploadContainer">
              <label
              for="assetsFieldHandle"
              style="width: 100%; cursor: pointer"
              class="block pt-3 cursor-pointer"
            >
              <span class="text-secondary">List of Attached File</span>
            </label>

            <ul class="pb-3 text-decoration-none ulUpload" v-cloak>
              <li
                class="text-sm mt-2"
                v-for="file in selectedFile"
                :key="file.newFilename"
              >
                <div class="row d-flex justify-content-center">
                  <div class="col-md-4 d-flex">
                    <div class="col text-left">
                      <span>{{ file.filename }}</span>
                    </div>
                    <!-- New Preview and Download using laravel filepath -->
                    <div>
                      <a class="btn btn-info btn-sm" :href="`http://127.0.0.1:8000/api/downloadFile?filepath=${file.fileDestination}&filename=${file.filename}`" target="_blank">Download</a>
                    </div>
                    <div class="col-2">
                      <a class="btn btn-secondary btn-sm"  :href="`http://127.0.0.1:8000/${file.filepath}/${file.filename}`" target="_blank">Preview</a>
                    </div>


                    <!-- Old Preview and Download using image bytes -->
                    <!-- <div>
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
                    </div> -->
                  </div>
                </div>
              </li>
            </ul>

            <!-- </aside> -->
          </div>
        </div>
        <!-- / The Attachments -->

        <!--  Form Review -->
        <aside v-else-if="this.counter === 3">
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
                <!-- <thead>
          <tr>
            <th>Form</th>
            <th style="width: 80%"></th>
          </tr>
        </thead> -->
                <tbody>
                  <tr>
                    <td>Reference Number</td>
                    <td style="width: 80%">{{ this.referenceNumber }}</td>
                  </tr>
                  <tr>
                    <td>Requested Date</td>
                    <td>{{ this.requestDate }}</td>
                  </tr>
                  <tr>
                    <td>Date Needed</td>
                    <td>{{ this.dateNeeded }}</td>
                  </tr>
                  <tr>
                    <td>Reporting Manager</td>
                    <td>{{ this.reportingManager }}</td>
                  </tr>
                  <tr>
                    <td>Project Name</td>
                    <td>{{ this.projectName }}</td>
                  </tr>
                  <tr>
                    <td>Client Name</td>
                    <td>{{ this.clientName }}</td>
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
          <!-- /.card -->

          <div class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">Payment Details</h3>

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
                    <td>Payee Name</td>
                    <td style="width: 80%">{{ this.payeeName }}</td>
                  </tr>
                  <tr>
                    <td>Mode of Payment</td>
                    <td>{{ this.modeOfPayment }}</td>
                  </tr>
                  <tr>
                    <td>Currency</td>
                    <td>{{ this.currency }}</td>
                  </tr>
                  <tr>
                    <td>Amount</td>
                    <td>{{ this.amount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->

          <div class="card card-secondary">
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
                <thead>
                  <tr>
                    <th style="width: 80%">Filename</th>
                    <th style="width: 20%">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="file in selectedFile" :key="file.filename">
                    <td>{{ file.filename }}</td>
                    <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                      <a class="btn btn-info btn-sm" :href="`http://127.0.0.1:8000/api/downloadFile?filepath=${file.fileDestination}&filename=${file.filename}`" target="_blank">Download</a>
                      <a class="btn btn-secondary btn-sm ml-1"  :href="`http://127.0.0.1:8000/${file.filepath}/${file.filename}`" target="_blank">Preview</a>

                      <!-- <a
                        class="btn btn-info btn-sm"
                        :download="file.filename"
                        :href="
                          'data:' + file.mimeType + ';base64,' + file.imageBytes
                        "
                        target="_blank"
                      >
                        Download
                      </a>
                      <button
                        class="btn btn-secondary btn-sm ml-1"
                        @click="preview(file.mimeType, file.imageBytes)"
                      >
                        Preview
                      </button> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
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
                class="mr-1 btn-secondary btn-sm"
              >
                Previous
              </button>
           
            
              <button
                v-if="this.counter <= 2"
                type="button"
                @click="counter++"
                class="mr-1 btn-primary btn-sm"
              >
                Next
              </button>
            
          </aside>

          <aside class="col-lg-6 d-flex justify-content-end align-items-center flex-nowrap">
            
              <button
                type="button"
                class="btn ml-1 btn-success btn-sm"
                data-toggle="modal"
                data-target="#modal-default"
                @click="setTitle('Approve')"
              >
                Approve
              </button>
            

            
              <button
                type="button"
                class="btn ml-1 btn-danger btn-sm"
                data-toggle="modal"
                data-target="#modal-default"
                @click="setTitle('Reject')"
              >
                Reject
              </button>
            

            
              <button
                type="button"
                class="btn ml-1 btn-warning btn-sm"
                data-toggle="modal"
                data-target="#modal-default"
                @click="setTitle('Clarify')"
              >
                Clarify
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
            <h6 class="modal-title">
              <b>{{ this.title }} Request</b>
            </h6>
            <button
              type="button"
              id="modalCloseButton"
              class="close"
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
                    v-model="remarks"
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
  </div>
</template>

<script>
import axios from "axios";
import VsToast from "@vuesimple/vs-toast";
import { ModelListSelect } from "vue-search-select";
export default {
  components: {
    ModelListSelect,
  },
  watch: {
    // Request Details
    projectItem(newValue) {
      this.getClient(newValue.code);
    },

    counter() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },

    //Navigate
    async $route(newRoute) {
      this.isLoading = true;
      // await this.showRfpMain(this.$route.params.id);
      // await this.showRfpDetail(this.$route.params.id);
      // await this.showRfpAttachments(this.$route.params.id, this.$route.params.frmName);
      
    await this.getRfpApproval(
      this.$route.params.id,
      this.$route.params.frmName,
      this.companyId,
      this.loggedUserId
    );
      this.counter = 0;
      this.withdrawRemarks = "";
      console.log(newRoute);
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
    classD() {
      return { active: this.counter >= 3 };
    },

    // Calendaer
    todaysYear() {
      const today = new Date();
      const yyyy = today.getFullYear();
      return yyyy;
    },

    todaysDate() {
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      const todaysDate = yyyy + "-" + mm + "-" + dd;
      return todaysDate;
    },

    missingModalRecipient() {
      if (this.itemrecipient.code === undefined) {
        return true;
      } else {
        return false;
      }
    },

    // show recipient if button clicked is clarify
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
      counter: 0,
      attemptClarify: false,
      // Request Details
      referenceNumber: "",
      requestDate: "",
      dateNeeded: "",
      reportingManager: "",
      projectName: "",
      clientName: "",
      purpose: "",

      // Payee Details
      payeeName: "",
      modeOfPayment: "",
      currency: "",
      amount: "",

      // user to be clarified
      recipent: [],
      itemrecipient: {},

      // The Attachments
      selectedFile: [],
      // filespreview: "",

      // Modal
      remarks: "",
      title: "",

      isLoading: false,
      isLoadingModal: false,

      form: "Request for Payment",

      // Check if its for liquidation
      isInitiator: false,
      isLiquidation: false,

      liquidation: [],
      inprogressId: "",

      // The Alert
      isAlert: false,
      header: "", // Syccess or Failed
      message: "", // added successfully
      type: "", // true or false

      // // approver 2
      // loggedUserId: 12,
      // loggedUserFirstName: "Carrie",
      // loggedUserLastName: "Chua Lee",
      // loggedUserFullName: "Carrie Chua Lee",
      // loggedUserDepartment: "Accounting and Finance",
      // loggedUserPosition: "Accounting and Finance Head",
      // companyId: 1,
      // companyName: "Cylix Technologies Inc.",

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

  async created() {
    // console.log(this.$route.params.id);
    // this.showRfpMain(this.$route.params.id);
    // this.showRfpDetail(this.$route.params.id);
    // this.showRfpAttachments(this.$route.params.id, "Request for Payment");
    this.isLoading = true;

    await this.getRfpApproval(
      this.$route.params.id,
      this.$route.params.frmName,
      this.companyId,
      this.loggedUserId
    );
    this.isLoading = false;
  },

  methods: {
    closeDefaultModal() {
      this.attemptClarify = false;
      this.remarks = "";
      this.itemrecipient = {};
      this.resetAlert();
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

    validateModalDefault() {
      if (!this.missingModalRecipient === true) {
        return true;
      } else {
        return false;
      }
    },

    async getRfpApproval(id, form, companyId, loggedUserId) {
      
      let showRfpMain = `http://127.0.0.1:8000/api/rfp-main/${id}`;
      let showRfpDetail = `http://127.0.0.1:8000/api/rfp-main-detail/${id}`;
      let showRfpAttachments = `http://127.0.0.1:8000/api/getRfpAttachments/${id}/${form}`;
      let showActualSign = `http://127.0.0.1:8000/api/general-actual-sign/${id}/${form}/1`;
      let showLiquidation = `http://127.0.0.1:8000/api/rfp-main-liquidation/${id}`;
      let showRecipient = `http://127.0.0.1:8000/api/getRecipient/${id}/${loggedUserId}/${companyId}/${form}`;
      let showInprogressId = `http://127.0.0.1:8000/api/get-Inprogress/${id}/${companyId}/${form}`;

      const requestOne = axios.get(showRfpMain);
      const requestTwo = axios.get(showRfpDetail);
      const requestThree = axios.get(showRfpAttachments);
      const requestFour = axios.get(showActualSign);
      const requestFive = axios.get(showLiquidation);
      const requestSix = axios.get(showRecipient);
      const requestSeven = axios.get(showInprogressId);

      await axios
        .all([
          requestOne,
          requestTwo,
          requestThree.catch(() => null),
          requestFour,
          requestFive.catch(() => null),
          requestSix,
          requestSeven.catch(() => null),
        ])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            const responesThree = responses[2];
            const responesFour = responses[3];
            const responesFive = responses[4];
            const responesSix = responses[5];
            const responesSeven = responses[6];

            // showRfpMain - responseOne
            this.referenceNumber = responseOne.data.data.REQREF;
            this.requestDate = responseOne.data.data.DATE;
            this.dateNeeded = responseOne.data.data.Deadline;
            this.reportingManager = responseOne.data.data.REPORTING_MANAGER;
            // this.amount = responseOne.data.data.AMOUNT;
            this.amount = parseFloat(
              responseOne.data.data.AMOUNT
            ).toLocaleString(undefined, { minimumFractionDigits: 2 });
            this.uid = responseOne.data.data.UID;

            if (responseOne.data.data.UID === parseInt(this.loggedUserId)) {
              this.isInitiator = true;
              this.counter = 2;
            } else {
              this.isInitiator = false;
            }

            // showRfpDetail - responseTwo
            this.projectName = responseTwo.data.data.PROJECT;
            this.clientName = responseTwo.data.data.CLIENTNAME;
            this.purpose = responseTwo.data.data.PURPOSED;
            this.payeeName = responseTwo.data.data.PAYEE;
            this.currency = responseTwo.data.data.CURRENCY;
            this.modeOfPayment = responseTwo.data.data.MOP;

            // showRfpAttachments - responesThree
            this.selectedFile = responesThree.data.data;
            // console.log(this.selectedFile);

            //showActualSign - responesFour
            if (responesFour.data[2].STATUS === "Completed") {
              console.log("liquidation is true");
              // console.log(responesFour.data)
              this.isLiquidation = true;
            } else {
              // alert('false')
              console.log("liquidation is false");
              this.isLiquidation = false;
            }
            // showLiquidation - responesFive
            console.log(responesFive);

            // showRecipient - responseSix
            const recipient = [];
            for (const key in responesSix.data) {
              const request = {
                code: responesSix.data[key].uid,
                name: responesSix.data[key].name,
              };

              recipient.push(request);
            }

            this.recipent = recipient;
            console.log(this.recipent);

            // showInprogressId - responesSeven
            this.inprogressId = responesSeven.data[0].inpId;
            // console.log(this.inprogressId)
          })
        )
        .catch((errors) => {
          // react on errors.
          console.log(errors);
        })
        .then(() => {
          
        });
    },
    // End of get rfp data

    setTitle(title) {
      this.title = title;
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

    async submit(type) {
      this.isLoadingModal = true;

      if (type === "Approve") {
        const response = await fetch(
          "http://127.0.0.1:8000/api/approve-request",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              remarks: this.remarks,
              processId: this.$route.params.id,
              companyId: this.companyId,
              form: this.form,
              loggedUserId: this.loggedUserId,
            }),
          }
        );

        const responseData = await response.json();
        console.log(responseData.message);

        this.isLoadingModal = false;
        document.getElementById("modalCloseButton").click();

        this.openToast("top-right", "success", responseData.message);
        this.$router.replace("/inputs");

        if (!response.ok) {
          const error = new Error(
            responseData.message ||
              "Failed to authenticate. Check your login data."
          );

          console.log(error.message);
          // throw error;
        }
      }

      if (type === "Reject") {
        const response = await fetch(
          "http://127.0.0.1:8000/api/reject-request",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              remarks: this.remarks,
              processId: this.$route.params.id,
              companyId: this.companyId,
              form: this.form,
              loggedUserId: this.loggedUserId,
              referenceNumber: this.referenceNumber,
            }),
          }
        );

        const responseData = await response.json();
        console.log(responseData.message);

        this.isLoadingModal = false;
        document.getElementById("modalCloseButton").click();

        this.openToast("top-right", "success", responseData.message);
        this.$router.replace("/approvals");

        if (!response.ok) {
          const error = new Error(
            responseData.message ||
              "Failed to authenticate. Check your login data."
          );
          console.log(error.message);

          this.openToast("top-right", "error", error.message);
          document.getElementById("modalCloseButton").click();
        }
      }

      if (type === "Clarify") {
        this.attemptClarify = true;
        this.resetAlert();
        const validated = this.validateModalDefault();
        if (validated) {
          const fd = new FormData();

          fd.append("form", this.form);
          fd.append("processId", this.$route.params.id);
          fd.append("loggedUserId", this.loggedUserId);
          fd.append("companyId", this.companyId);
          fd.append("recipientId", this.itemrecipient.code);
          fd.append("remarks", this.remarks);
          fd.append("inprogressId", this.inprogressId);
          fd.append("loggedUserFullname", this.loggedUserFullName);
          fd.append("reference", this.referenceNumber);

          axios
            .post("http://127.0.0.1:8000/api/inputs-clarity", fd)
            .then((res) => {
              // handle success
              document.getElementById("modalCloseButton").click();
              // console.log(res);
              this.openToast("top-right", "success", res.data.message);
              this.$router.replace("/approvals");
            })
            .catch((error) => {
              // handle error
              console.log(error);
              document.getElementById("modalCloseButton").click();
              this.openToast("top-right", "error", error);
            })
            .then(() => {
              // always executed
              this.isLoadingModal = false;
            });
        } else {
          this.isLoadingModal = false;
          this.addAlert("Failed", "Please select recipent!", "false");
        }
      }
    },
    close() {
      this.$router.replace("/inputs");
    },
  //   preview(mimeType, imageBytes) {
  //     if (mimeType === 'image/jpeg' || mimeType === 'image/png') 
  //     {
  //       var newTab = window.open();
  //       newTab.document.body.innerHTML = `<img src="data:${mimeType};base64,${imageBytes}" resizable=yes, style="max-width: 100%; height: auto; ">`;
  //     }

  //     else if (mimeType === 'application/pdf')
  //     {
  //       let pdfWindow = window.open('#')
  //       pdfWindow.document.write(`<iframe width='100%' height='100%' src='data:${mimeType};base64, ` +encodeURI(imageBytes) + "'></iframe>")
  //     }
    
  //  },

    // showRfpMain(id) {
    //   axios
    //     .get(`http://127.0.0.1:8000/api/rfp-main/${id}`)
    //     .then((response) => {
    //       // handle success
    //       this.referenceNumber = response.data.data.REQREF;
    //       this.requestDate = response.data.data.DATE;
    //       this.dateNeeded = response.data.data.Deadline;
    //       this.reportingManager = response.data.data.REPORTING_MANAGER;
    //       this.amount = response.data.data.AMOUNT;
    //     })
    //     .catch((error) => {
    //       // handle error
    //       console.log(error);
    //     })
    //     .then(() => {
    //       // always executed
    //     });
    // },
    // showRfpDetail(id) {
    //   axios
    //     .get(`http://127.0.0.1:8000/api/rfp-main-detail/${id}`)
    //     .then((response) => {
    //       // handle success
    //       this.projectName = response.data.data.PROJECT;
    //       this.clientName = response.data.data.CLIENTNAME;
    //       this.purpose = response.data.data.PURPOSED;
    //       this.payeeName = response.data.data.PAYEE;
    //       this.currency = response.data.data.CURRENCY;
    //       this.modeOfPayment = response.data.data.MOP;
    //     })
    //     .catch((error) => {
    //       // handle error
    //       console.log(error);
    //     })
    //     .then(() => {
    //       // always executed
    //     });
    // },

    // showRfpAttachments(id, form) {
    //   axios
    //     .get(`http://127.0.0.1:8000/api/getRfpAttachments/${id}/${form}`)
    //     .then((response) => {
    //       // handle success
    //       this.selectedFile = response.data.data;

    //       console.log(this.selectedFile.length);
    //     })
    //     .catch((error) => {
    //       // handle error
    //       console.log(error);
    //     })
    //     .then(() => {
    //       // always executed
    //     });
    // },
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
