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
        <h3 class="card-title">Reimbursement Request</h3>
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
          <div class="progressbar" :class="classE">
            <span :class="classE">5</span>
          </div>
          <div class="progressbar" :class="classF">
            <span :class="classF">6</span>
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
                >Expense Details</span
              ></small
            >
          </div>
          <div class="textbar" :class="classD">
            <small
              ><span :class="classD" class="font-weight-bold"
                >Transportation Details</span
              ></small
            >
          </div>
          <div class="textbar" :class="classE">
            <small
              ><span :class="classE" class="font-weight-bold"
                >Attachments</span
              ></small
            >
          </div>
          <div class="textbar" :class="classF">
            <small
              ><span :class="classF" class="font-weight-bold"
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
                  :value="'RE-' + todaysYear"
                />
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label for="requestDate">Request Date</label></small>
                <!-- <input type="date" class="form-control form-control-sm" id="requestDate"> -->
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
                  v-model="dateNeeded"
                  valueType="format"
                  disabled
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
                  disabled
                  v-model="reportingManagerName"
                  class="form-control py-3 form-control-sm"
                  id="reportingManager"
                />
                <!-- <model-list-select
                  :list="reportingManager"
                  v-model="reportingManagerItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px"
                >
                </model-list-select> -->
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
                <!-- <model-list-select
                  :list="project"
                  v-model="projectItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px"
                >
                </model-list-select> -->
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
                disabled
                id="payeeName"
              />
            </div>
            <div class="form-group">
              <small><label for="modeOfPayment">Mode of Payment</label></small>
                <model-list-select
                :list="modeOfPayment"
                v-model="modeOfPaymentItem"
                option-value="code"
                option-text="name"
                placeholder="select item"
                style="padding: 9px; background-color: #e9ecef"
                :isDisabled="true"
              >
              </model-list-select>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <small><label for="currency">Currency</label></small>
                  <model-list-select
          
                    :list="currency"
                    v-model="currencyItem"
                    option-value="code"
                    option-text="name"
                    placeholder="select item"
                    style="padding: 9px; background-color: #e9ecef"
                    :isDisabled="true"
                  >
                  </model-list-select>
                </div>
              </div>
              <div class="col-md-8">
                <div class="form-group">
                  <!-- <label for="amount">Amount</label> -->
                  <!-- <input type="text" class="form-control" name="amount" id="currency-field" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency" placeholder="0.00">  -->
                  <small><label for="amount">Amount</label></small>
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    id="amount"
                    v-model="amount"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3"></div>
        </div>
        <!-- / Payment Details -->

        <!-- Expense Details -->
        <div class="row mt-4" v-if="this.counter === 2">
          <table class="table table-sm table-bordered table-striped mx-2">
            <thead>
              <tr>
                <th colspan="6" scope="col">
                  <aside class="d-flex align-items-center">
                    <span class="mb-1 ml-1"> Expense Detals</span>
                  </aside>
                </th>
              </tr>
              <tr>
                <th scope="col" class="text-center">#</th>
                <th scope="col">Date</th>
                <th scope="col">Client Name</th>
                <th scope="col">Expense Type</th>
                <th scope="col">Remarks</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>

            <tbody style="font-size: 14px">
              <tr v-for="(item, index) in expenseType_Data" :key="item.id">
                <td class="text-center">{{ index + 1 }}.</td>
                <td>{{ item.date_ }}</td>
                <td>{{ item.CLIENT_NAME }}</td>
                <td>{{ item.EXPENSE_TYPE }}</td>
                <td>{{ item.DESCRIPTION }}</td>
                <td>
                  {{
                    parseFloat(item.AMOUNT).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })
                  }}
                </td>
              </tr>

              <tr>
                <td colspan="4"></td>
                <td colspan="2">
                  <b>Total Amount: {{ this.expenseType_totalAmount }}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- /. Expense Details -->

        <!-- Transportation Details -->
        <div class="row mt-4" v-if="this.counter === 3">
          <table class="table table-sm table-bordered table-striped mx-2">
            <thead>
              <tr>
                <th colspan="8" scope="col">
                  <aside class="d-flex align-items-center">
                    <span class="mb-1 ml-1"> Transportation Detals</span>
                  </aside>
                </th>
              </tr>
              <tr>
                <th scope="col" class="text-center">#</th>
                <th scope="col">Date</th>
                <th scope="col">Client Name</th>
                <th scope="col">Destination From</th>
                <th scope="col">Destination To</th>
                <th scope="col">Mode of Transportation</th>
                <th scope="col">Remarks</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>

            <tbody style="font-size: 14px">
              <tr v-for="(item, index) in transpoSetup_Data" :key="item.id">
                <td class="text-center">{{ index + 1 }}.</td>
                <td>{{ item.date_ }}</td>
                <td>{{ item.CLIENT_NAME }}</td>
                <td>{{ item.DESTINATION_FRM }}</td>
                <td>{{ item.DESTINATION_TO }}</td>
                <td>{{ item.MOT }}</td>
                <td>{{ item.DESCRIPTION }}</td>
                <td>
                  {{
                    parseFloat(item.AMT_SPENT).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })
                  }}
                </td>
              </tr>

              <tr>
                <td colspan="6"></td>
                <td colspan="2">
                  <b>Total Amount: {{ this.transpoSetup_totalAmount }}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- /. Transportation Details -->

        <!-- The Attachments -->
        <div
          v-else-if="this.counter === 4"
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
                :key="file.id"
              >
                <div class="row d-flex justify-content-center">
                  <div class="col-md-4 d-flex">

                    <div class="col text-left">
                      <span><label>{{ file.filename }}</label></span>
                    </div>

                    <!-- New Preview and Download using laravel filepath -->
                    <div>
                      <a class="btn btn-info btn-sm" :href="`http://127.0.0.1:8000/api/downloadFile?filepath=${file.fileDestination}&filename=${file.filename}`" target="_blank">Download</a>
                    </div>
                    <div class="col-2">
                      <a class="btn btn-secondary btn-sm"  :href="`http://127.0.0.1:8000/${file.filepath}/${file.filename}`" target="_blank">Preview</a>
                    </div>
                    
                  </div>
                </div>
              </li>
            </ul>

            <!-- </aside> -->
          </div>
        </div>
        <!-- / The Attachments -->

        <!--  Form Review -->
        <aside v-else-if="this.counter === 5">
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
                    <td>{{ this.requestDate }}</td>
                  </tr>
                  <tr>
                    <td>Date Needed</td>
                    <td>{{ this.dateNeeded }}</td>
                  </tr>
                  <tr>
                    <td>Reporting Manager</td>
                    <td>{{ this.reportingManagerName }}</td>
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

          <!-- Payment Details -->
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
                    <td>{{ this.modeOfPaymentItem.name }}</td>
                  </tr>
                  <tr>
                    <td>Currency</td>
                    <td>{{ this.currencyItem.name }}</td>
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
          <!-- /.Payment Details -->

          <!-- Expense Details Review -->
          <div class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">Expense Table</h3>

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
                    <th style="width: 5%">#</th>
                    <th style="width: 10%">Date</th>
                    <th style="width: 20%">Client Name</th>
                    <th style="width: 20%">Expense Type</th>
                    <th style="width: 30%">Remarks</th>
                    <th style="width: 10%">Amount</th>

                    <!-- <th style="width: 10%">Action</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in expenseType_Data" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.date_ }}</td>
                    <td>{{ item.CLIENT_NAME }}</td>
                    <td>{{ item.EXPENSE_TYPE }}</td>
                    <td>{{ item.DESCRIPTION }}</td>
                    <td>
                      {{
                        parseFloat(item.AMOUNT).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })
                      }}
                    </td>
                  </tr>

                  <tr>
                    <td colspan="5"></td>
                    <b class="px-1"
                      >Total: {{ this.expenseType_totalAmount }}</b
                    >
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.Expense Details Review -->

          <!-- Transportation Details Review -->
          <div class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">Transporation Expense Table</h3>

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
                    <th style="width: 5%">#</th>
                    <th style="width: 10%">Date</th>
                    <th style="width: 15%">Client Name</th>
                    <th style="width: 10%">Destination From</th>
                    <th style="width: 10%">Destination To</th>
                    <th style="width: 20%">Mode of Transportation</th>
                    <th style="width: 10%">Remarks</th>
                    <th style="width: 10%">Amount</th>
                    <!-- <th style="width: 10%">Action</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in transpoSetup_Data" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.date_ }}</td>
                    <td>{{ item.CLIENT_NAME }}</td>
                    <td>{{ item.DESTINATION_FRM }}</td>
                    <td>{{ item.DESTINATION_TO }}</td>
                    <td>{{ item.MOT }}</td>
                    <td>{{ item.DESCRIPTION }}</td>
                    <td>
                      {{
                        parseFloat(item.AMT_SPENT).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })
                      }}
                    </td>
                  </tr>

                  <tr>
                    <td colspan="7"></td>
                    <b class="px-1"
                      >Total: {{ this.transpoSetup_totalAmount }}</b
                    >
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.Transportation Details Review -->

          <!-- Attachments Review -->
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
                  <tr v-for="file in selectedFile" :key="file.id">
                    <td>{{ file.filename }}</td>
                    <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                      <a class="btn btn-info btn-sm" :href="`http://127.0.0.1:8000/api/downloadFile?filepath=${file.fileDestination}&filename=${file.filename}`" target="_blank">Download</a>
                      <a class="btn btn-secondary btn-sm ml-1"  :href="`http://127.0.0.1:8000/${file.filepath}/${file.filename}`" target="_blank">Preview</a>

                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </aside>
        <!-- ./Attachments Review -->
        <!-- / Form Review -->
        <!-- / Main Form -->

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
                v-if="this.counter <= 4"
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
          <div class="overlay" v-show="isLoading">
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

    <!-- End -->
  </div>
</template>

<script>
import { ModelListSelect } from "vue-search-select";
import axios from "axios";
import VsToast from "@vuesimple/vs-toast";
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

    async $route(newRoute) {
      this.isLoading = true;
      this.counter = 0
      this.todaysDate();
      await this.getReInprogress(
        this.$route.params.id,
        this.$route.params.frmName,
        this.companyId,
        this.loggedUserId
      );
      console.log(newRoute)
      this.isLoading = false;
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
    classE() {
      return { active: this.counter >= 4 };
    },
    classF() {
      return { active: this.counter >= 5 };
    },

    // Calendaer
    todaysYear() {
      const today = new Date();
      const yyyy = today.getFullYear();
      return yyyy;
    },

    // Sum of all amount spend in liquidation
    expenseType_totalAmount() {
      if (this.expenseType_Data.length > 0) {
        const total = this.expenseType_Data
          .map((expenseType_Data) =>
            parseFloat(expenseType_Data.AMOUNT.replace(/,/g, ""))
          )
          .reduce((acc, expenseType_Data) => expenseType_Data + acc);
        return total.toLocaleString(undefined, { minimumFractionDigits: 2 });
      } else {
        return 0;
      }
    },

    // sum of all amount spend in transportation
    transpoSetup_totalAmount() {
      if (this.transpoSetup_Data.length > 0) {
        const total = this.transpoSetup_Data
          .map((transpoSetup_Data) =>
            parseFloat(transpoSetup_Data.AMT_SPENT.replace(/,/g, ""))
          )
          .reduce((acc, transpoSetup_Data) => transpoSetup_Data + acc);
        return total.toLocaleString(undefined, { minimumFractionDigits: 2 });
      } else {
        return 0;
      }
    },
  },
  data() {
    return {
      counter: 0,
      // Request Details
      referenceNumber: "",
      requestDate: "",
      dateNeeded: "",
      reportingManagerName: "",
      reportingManagerId: "",
      projectName: "",
      projectId: "",
      clientName: "",
      clientId: "",
      mainId: "",
      purpose: "",

      // Payment Details
      modeOfPayment: [
        { code: "Cash", name: "Cash" },
        { code: "Check", name: "Check" },
        { code: "Credit to Account", name: "Credit to Account" },
      ],
      modeOfPaymentItem: {code: "Cash", name: "Cash"},
      currency: [
        { code: "PHP", name: "PHP" },
        { code: "AUD", name: "AUD" },
        { code: "CAD", name: "CAD" },
        { code: "EUR", name: "EUR" },
        { code: "USD", name: "USD" },
      ],
      currencyItem: { code: "PHP", name: "PHP" },
      payeeName: "",
      amount: "",

      modalclient: [],
      itemclientName: {},

      modalExpenseType: [],
      itemmodalExpenseType: {},

      expenseType_Date: "",
      expenseType_Amount: "",
      expenseType_Remarks: "",

      // The Attachments
      selectedFile: [],
      filespreview: [],

      isButton: true,

      // data for expense type
      expenseType_Data: [],
      expenseType_EditData: [],
      i: 0,

      // data for transportation
      transpoSetup: [],
      itemtranspoSetup: {},
      transpoSetup_Date: "",
      transpoSetup_Amount: "",
      transpoSetup_From: "",
      transpoSetup_to: "",
      transpoSetup_Remarks: "",

      transpoSetup_Data: [],
      transpoSetup_EditData: [],
      form: this.$route.params.frmName,

      // Logged User Data
      loggedUserId: localStorage.getItem("id"),
      loggedUserFirstName: localStorage.getItem("fname"),
      loggedUserLastName: localStorage.getItem("lname"),
      loggedUserFullName: localStorage.getItem("fullName"),
      loggedUserDepartment: localStorage.getItem("department"),
      loggedUserPosition: localStorage.getItem("positionName"),
      companyId: localStorage.getItem("companyId"),
      companyName: localStorage.getItem("companyName"),

      isLoading: false,

      withdrawRemarks: "",

      processId: this.$route.params.id,
    };
  },

  async created() {
    this.isLoading = true;
    this.todaysDate();
    await this.getReInprogress(
      this.$route.params.id,
      this.$route.params.frmName,
      this.companyId,
      this.loggedUserId
    );
    this.isLoading = false;
  },

  methods: {
    async withdrawn() {
      this.isLoading = true;
      console.log(this.withdrawRemarks);

      const response = await fetch(
        "http://127.0.0.1:8000/api/withdraw-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            withdrawRemarks: this.withdrawRemarks,
            reqId: this.processId,
            form: this.form,
            companyId: this.companyId,
            loggedUserId: this.loggedUserId,
          }),
        }
      );

      const responseData = await response.json();
      console.log(responseData.message);

      this.isLoading = false;
      document.getElementById("modalCloseButton").click();

      this.openToast("top-right", "success", responseData.message);
      this.$router.replace("/inprogress");

      if (!response.ok) {
        const error = new Error(
          responseData.message ||
            "Failed to authenticate. Check your login data."
        );

        // Manual Handle Auth
        //   if (api_call.status == 200) {
        //     // You can do your error handling here
        // } else {
        //     // Call the .json() method on your response to get your JSON data
        //     const data = await api_call.json();
        // }

        console.log(error.message);
      }
    },

    setButton() {
      this.isButton = true;
    },
    close() {
      this.$router.replace("/participants");
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
      this.requestDate = todaysDate;
      // return todaysDate;
    },

    async getReInprogress(id, form, companyId, loggedUserId) {
      // this.isLoading = true;
      console.log(loggedUserId);
      console.log(companyId);
      let showMain = `http://127.0.0.1:8000/api/getRE/${id}`;
      let showExpense = `http://127.0.0.1:8000/api/get-ReExpense/${id}`;
      let showTranspo = `http://127.0.0.1:8000/api/get-ReTranspo/${id}`;
      let showAttachments = `http://127.0.0.1:8000/api/getRfpAttachments/${id}/${form}`;
      // let showActualSign = `http://127.0.0.1:8000/api/general-actual-sign/${id}/${form}/${companyId}`;

      const requestOne = axios.get(showMain);
      const requestTwo = axios.get(showExpense);
      const requestThree = axios.get(showTranspo);
      const requestFour = axios.get(showAttachments);
      // const requestFive = axios.get(showActualSign);

      await axios
        .all([
          requestOne.catch(() => null),
          requestTwo.catch(() => null),
          requestThree.catch(() => null),
          requestFour.catch(() => null),
          // requestFive.catch(() => null),
        ])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            const responesThree = responses[2];
            const responesFour = responses[3];
            // const responesFive = responses[4];

            // showMain - responseOne
            this.referenceNumber = responseOne.data.data.REQREF;
            this.requestDate = responseOne.data.data.REQUESTED_DATE;
            this.dateNeeded = responseOne.data.data.TRANS_DATE;
            this.reportingManagerName = responseOne.data.data.REPORTING_MANAGER;
            this.reportingManagerId = responseOne.data.data.REPORTING_MANAGER; // wala pa
            this.projectName = responseOne.data.data.PROJECT;
            this.projectId = responseOne.data.data.PRJID;
            this.clientName = responseOne.data.data.CLIENT_NAME;
            this.clientId = responseOne.data.data.CLIENTID;
            this.mainId = responseOne.data.data.MAINID;
            this.purpose = responseOne.data.data.DESCRIPTION;
            this.payeeName = responseOne.data.data.PAYEE;

            this.amount = parseFloat(
              responseOne.data.data.TOTAL_AMT_SPENT
            ).toLocaleString(undefined, { minimumFractionDigits: 2 });
            this.uid = responseOne.data.data.UID;

            if (responseOne.data.data.UID === parseInt(this.loggedUserId)) {
              this.isInitiator = true;
              this.counter = 0;
            } else {
              this.isInitiator = false;
            }

            // showExpense - responseTwo
            this.expenseType_Data = responseTwo.data;

            // showTranspo - responesThree
            this.transpoSetup_Data = responesThree.data;

            // showAttachments - responesThree
            this.selectedFile = responesFour.data.data;

            // typeof(responesFour.data.data)
            // console.warn(this.selectedFile)
            // console.log(responesFour.data.data[0].filename)

            // showLiquidation - responesFive
            // console.log(responesFive);
          })
        )
        .catch((errors) => {
          // react on errors.
          console.log(errors);
        })
        .then(() => {
          // this.isLoading = false;
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
