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
        <h3 class="card-title">Petty Cash Request</h3>
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
          <div class="progressbar" :class="classE" v-if="isLiquidation">
            <span :class="classE">5</span>
          </div>
          <div class="progressbar" :class="classF" v-if="isLiquidation">
            <span :class="classF">5</span>
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

          <div class="textbar" :class="classC" v-if="!isLiquidation">
            <small
              ><span :class="classC" class="font-weight-bold"
                >Attachments</span
              ></small
            >
          </div>
          <div class="textbar" :class="classD" v-if="!isLiquidation">
            <small
              ><span :class="classD" class="font-weight-bold"
                >Review</span
              ></small
            >
          </div>

          <div class="textbar" :class="classC" v-if="isLiquidation">
            <small
              ><span :class="classC" class="font-weight-bold"
                >Expense Details</span
              ></small
            >
          </div>
          <div class="textbar" :class="classD" v-if="isLiquidation">
            <small
              ><span :class="classD" class="font-weight-bold"
                >Transportation Details</span
              ></small
            >
          </div>

          <div class="textbar" :class="classE" v-if="isLiquidation">
            <small
              ><span :class="classE" class="font-weight-bold"
                >Attachments</span
              ></small
            >
          </div>
          <div class="textbar" :class="classF" v-if="isLiquidation">
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
                  v-model="referenceNumber"
                />
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label for="requestDate">Request Date</label></small>
                <input
                  type="text"
                  v-model="requestDate"
                  class="form-control form-control-sm"
                  disabled
                  id="requestDate"
                />
                <!-- <date-picker
                  disabled
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px"
                  v-model="requestDate"
                ></date-picker> -->
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label for="dateNeeded">Date Needed</label></small>
                <!-- <date-picker
                  v-model="dateNeeded"
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px"
                ></date-picker> -->

                <input
                  type="text"
                  v-model="dateNeeded"
                  class="form-control form-control-sm"
                  disabled
                  id="dateNeeded"
                />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <small
                  ><label for="reportingManager selextForm"
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
                  v-model="projectName"
                  disabled
                  class="form-control py-3 form-control-sm"
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
                <!-- <textarea class="form-control" name="purpose" id="purpose" :value="message" @input="updateMessage"  rows="5"></textarea> -->
                <textarea
                  class="form-control"
                  name="purpose"
                  id="purpose"
                  v-model="purpose"
                  rows="5"
                  disabled
                ></textarea>
              </div>
            </div>
          </div>
        </aside>
        <!-- / Request Details -->

        <!-- Payment Details -->
        <div class="row mt-4" v-if="this.counter === 1">
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
                disabled
                class="form-control form-control-sm"
                id="modeOfPayment"
              />
              <!-- <model-list-select
                :list="modeOfPayment"
                v-model="modeOfPaymentItem"
                option-value="code"
                option-text="name"
                placeholder="select item"
                style="padding: 9px"
                disabled ='tr'
              >
              </model-list-select> -->
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <small><label for="currency">Currency</label></small>
                  <input
                    type="text"
                    disabled
                    class="form-control form-control-sm"
                    id="currency"
                  />
                  <!-- <model-list-select
                    :list="currency"
                    v-model="currencyItem"
                    option-value="code"
                    option-text="name"
                    placeholder="select item"
                    style="padding: 9px"
                  >
                  </model-list-select> -->
                </div>
              </div>
              <div class="col-md-8">
                <div class="form-group">
                  <small><label for="amount">Amount</label></small>
                  <!-- <input
                    type="text"
                    @keyup="formatCurrency($event)"
                    @blur="formatCurrency($event, 'blur')"
                    pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                    class="form-control form-control-sm py-3"
                    id="amount"
                    v-model="amount"
                  /> -->

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
        <div class="row mt-4" v-if="this.counter === isExpense">
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
                <td :colspan="expenseFooter"></td>
                <td colspan="2">
                  <b>Total Amount: {{ this.expenseType_totalAmount }}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- /.Expense Details -->

        <!-- Transportation Details -->
        <div class="row mt-4" v-if="this.counter === isTranspo">
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
                <td :colspan="transpoFooter"></td>
                <td colspan="2">
                  <b>Total Amount: {{ this.transpoSetup_totalAmount }}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- /.Transportation Details -->

        <!-- The Attachments -->
        <div
          v-if="this.counter === isAttachments"
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
                      <span
                        ><label>{{ file.filename }}</label></span
                      >
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
        <aside v-if="this.counter === isReview">
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
                    <td></td>
                  </tr>
                  <tr>
                    <td>Currency</td>
                    <td></td>
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

          <!-- Expense Details Review -->
          <div class="card card-secondary" v-if="isLiquidation">
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
          <div class="card card-secondary" v-if="isLiquidation">
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

          <!-- Form Review Attachments -->
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
                  <tr v-for="file in selectedFile" :key="file.name">
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
          <!-- /.Form Review Attachments -->
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
                v-if="this.counter <= isAttachments"
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
    await this.getPcMain(this.processId);
    await this.getActualSign(this.processId, this.form, this.companyId);
    await this.getAttachments(this.processId, this.form);
    await this.getPcExpense(this.processId);
    await this.getPcTranspo(this.processId);
    this.isLoading = false;
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
    console.log(newRoute)
    this.isLoading = true;
    this.counter = 0
    await this.getPcMain(this.$route.params.id);
    await this.getActualSign(this.$route.params.id, this.$route.params.frmName, this.companyId);
    await this.getAttachments(this.$route.params.id, this.$route.params.frmName);
    await this.getPcExpense(this.$route.params.id);
    await this.getPcTranspo(this.$route.params.id);
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
    classE() {
      return { active: this.counter >= 4 };
    },
    classF() {
      return { active: this.counter >= 5 };
    },

    isExpense() {
      if (this.isLiquidation === true) {
        return 2;
      } else {
        return false;
      }
    },
    isTranspo() {
      if (this.isLiquidation === true) {
        return 3;
      } else {
        return false;
      }
    },
    isAttachments() {
      if (this.isLiquidation === true) {
        return 4;
      } else {
        return 2;
      }
    },

    buttonsSet() {
      if (this.isApproval === true) {
        return 4;
      } else {
        return 2;
      }
    },
    isReview() {
      if (this.isLiquidation === true) {
        return 5;
      } else {
        return 3;
      }
    },

    expenseHeader() {
      if (this.isApproval === false) {
        return 5;
      } else {
        return 6;
      }
    },

    expenseFooter() {
      if (this.isApproval === false) {
        return 4;
      } else {
        return 5;
      }
    },

    transpoFooter() {
      if (this.isApproval === false) {
        return 6;
      } else {
        return 7;
      }
    },

    isForClarity() {
      if (this.title === "Clarify") {
        return true;
      } else {
        return false;
      }
    },

    // Sum of all amount spend in liquidation
    expenseType_totalAmount() {
      if (this.expenseType_Data.length > 0) {
        let total = this.expenseType_Data
          .map((expenseType_Data) =>
            // convert money type string to float
            parseFloat(expenseType_Data.AMOUNT.replace(/,/g, ""))
          )
          .reduce((acc, expenseType_Data) => expenseType_Data + acc);
        // convert to money type
        return total.toLocaleString(undefined, { minimumFractionDigits: 2 });
      } else {
        return 0;
      }
    },

    // sum of all amount spend in transportation
    transpoSetup_totalAmount() {
      if (this.transpoSetup_Data.length > 0) {
        let total = this.transpoSetup_Data
          .map((transpoSetup_Data) =>
            // convert money type string to float
            parseFloat(transpoSetup_Data.AMT_SPENT.replace(/,/g, ""))
          )
          .reduce((acc, transpoSetup_Data) => transpoSetup_Data + acc);
        // convert to money type
        return total.toLocaleString(undefined, { minimumFractionDigits: 2 });
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
      reportingManager: [],
      reportingManagerItem: {},
      project: [],
      projectItem: {},
      clientId: "",
      mainId: "",

      referenceNumber: "",
      requestDate: "",
      dateNeeded: "",
      reportingManagerName: "",
      projectName: "",
      clientName: "",
      purpose: "",

      payeeName: "",
      amount: "",

      realAmount: "",

      // The Attachments
      selectedFile: [],
      filespreview: [],

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
      isLoadingModal: false,
      processId: this.$route.params.id,
      form: this.$route.params.frmName,

      withdrawRemarks: "",

      isLiquidation: false,
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

    openToast(position, variant, message) {
      const toastTitle = variant.charAt(0).toUpperCase() + variant.slice(1);
      VsToast.show({
        title: `${toastTitle}`,
        message: `${message}`,
        variant,
        position,
      });
    },

    close() {
      this.$router.replace("/approved");
    },

    async getPcExpense(id) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/get-PcExpense/${id}`
        );

        if (resp.status === 200) {
          console.log(resp.data);

          this.expenseType_Data = resp.data;
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    async getPcTranspo(id) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/get-PcTranspo/${id}`
        );

        if (resp.status === 200) {
          console.log(resp.data);

          this.transpoSetup_Data = resp.data;
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    async getPcMain(id) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/get-PcMain/${id}`
        );

        if (resp.status === 200) {
          this.referenceNumber = resp.data.data.REQREF;
          this.requestDate = resp.data.data.REQUESTED_DATE;
          this.dateNeeded = resp.data.data.DEADLINE;
          this.reportingManagerName = resp.data.data.REPORTING_MANAGER;
          this.projectName = resp.data.data.PROJECT;
          this.clientName = resp.data.data.CLIENT_NAME;
          this.purpose = resp.data.data.DESCRIPTION;

          // this.amount = resp.data.data.REQUESTED_AMT;
          this.amount = parseFloat(resp.data.data.REQUESTED_AMT).toLocaleString(
            undefined,
            { minimumFractionDigits: 2 }
          );
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },
    async getActualSign(id, form, companyId) {
      // this.isLoading = true;
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/general-actual-sign/${id}/${form}/${companyId}`
        );
        // console.log(resp.status);
        if (resp.status === 200) {
          // this.isLoading = false;
          this.payeeName = resp.data[0].Payee;

          if (resp.data[1].STATUS === "Completed") {
            this.isLiquidation = true;
          }
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
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

    // Payment Details
    formatNumber(n) {
      // format number 1000000 to 1,234,567
      return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    formatCurrency(input, blur) {
      // appends $ to value, validates decimal side
      // and puts cursor back in right position.

      // get input value
      var input_val = this.amount;

      // don't validate empty input
      if (input_val === "") {
        return;
      }

      // original length
      var original_len = input_val.length;

      // initial caret position
      var caret_pos = input.target.selectionStart;

      // check for decimal
      if (input_val.indexOf(".") >= 0) {
        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimal_pos = input_val.indexOf(".");

        // split number by decimal point
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);

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
        input_val = input_val;

        // final formatting
        if (blur === "blur") {
          input_val += ".00";
        }
      }

      // send updated string to input
      this.amount = input_val;
      input.target.value = input_val;

      var realAmount = input_val;
      if (realAmount.indexOf(",") !== -1) {
        realAmount = realAmount.replace(/,/g, "");
      }
      this.realAmount = realAmount;
      console.log(this.realAmount);

      // put caret back in the right position
      var updated_len = input_val.length;
      caret_pos = updated_len - original_len + caret_pos;
      input[0].setSelectionRange(caret_pos, caret_pos);
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
