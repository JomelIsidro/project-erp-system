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
        <!-- Buttons -->
        <div class="row d-flex justify-content-between">
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

            <button
              v-if="this.counter <= 1"
              type="button"
              @click="validateNext()"
              class="btn mr-1 btn-primary btn-sm"
            >
              Next
            </button>
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
              v-if="this.counter === 2"
              type="button"
              class="btn btn-success btn-sm ml-1"
              data-toggle="modal"
              data-target="#modal-default"
              @click="setTitle('Approve')"
            >
              Approve
            </button>

            <button
              type="button"
              class="btn btn-danger btn-sm ml-1"
              data-toggle="modal"
              data-target="#modal-default"
              @click="setTitle('Reject')"
            >
              Reject
            </button>

            <button
              type="button"
              class="btn btn-warning btn-sm ml-1"
              data-toggle="modal"
              data-target="#modal-default"
              @click="setTitle('Clarify')"
            >
              Clarify
            </button>

            <button
              type="button"
              class="btn btn-danger btn-sm ml-1"
              @click="close()"
            >
              Close
            </button>
          </aside>
        </div>
        <!-- / Buttons -->

        <!-- Step Numbers -->
        <div class="d-flex progressBarWrapper text-center mt-5">
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
        <aside class="container-fluid mt-0 px-0" v-if="this.counter === 0">
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
                <!-- <th colspan="8" scope="col"> -->
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
                <th
                  class="text-center"
                  v-if="isRmApprovalBool"
                  scope="col"
                  style="width: 10%"
                >
                  Action
                </th>
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
                <td v-if="isRmApprovalBool" class="m-0">
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
                      @click="totrash(overtime.indexOf(item), item.id)"
                      data-toggle="modal"
                      data-target="#modal-confirm"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </aside>
                </td>
              </tr>

              <tr>
                <!-- <td colspan="6"></td> -->
                <td :colspan="numberActual"></td>

                <td colspan="3">
                  <b>Total OT Hours: {{ this.totalOTHours }}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- /.Overtime Details -->

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
                    <!-- <td colspan="6"></td> -->
                    <td :colspan="numberActual"></td>

                    <b class="px-1">Total OT Hours: {{ this.totalOTHours }}</b>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>

          <!-- /.Overtime Details Review -->
        </aside>
        <!-- / Form Review -->

                <!-- Modal confirm-->
        <div
          class="modal fade"
          id="modal-confirm"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title">Delete Item</h6>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  id="modal-confirm--close-btn"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Are you sure want to delete this item?
              </div>
              <div class="modal-footer justify-content-end">
                <button type="button" @click="trash()" class="btn btn-success btn-sm">Yes</button>
                <button type="button" class="btn btn-danger btn-sm ml-0" data-dismiss="modal">No</button>
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>
        <!-- /.modal confirm -->

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
                        v-model.trim="remarks"
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
                      <small
                        ><label for="projectName">Project Name</label></small
                      >

                      <!-- <input
                        type="text"
                        disabled
                        class="form-control py-3 form-control-sm"
                        v-model="itemModalProjectName.name"
                      /> -->

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
                        v-if="missingModalProject && attemptUpdate"
                        >Auth Start is required!</small
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-5">
                    <div class="form-group">
                      <small
                        ><label for="overtimeDate">Overtime Date</label></small
                      >
                      <input
                        type="text"
                        disabled
                        class="form-control py-3 form-control-sm"
                        v-model="overtimeDate"
                      />
                      <!-- <date-picker
                        valueType="format"
                        style="display: block; width: 100%; line-height: 20px"
                        v-model="overtimeDate"
                      ></date-picker> -->
                    </div>
                  </div>

                  <div class="col-md-7">
                    <div class="form-group">
                      <small
                        ><label for="employeeName">Employee Name</label></small
                      >
                      <input
                        type="text"
                        disabled
                        class="form-control py-3 form-control-sm"
                        v-model="itemEmployeeName.name"
                      />

                      <!-- <model-list-select
                        :list="employeeName"
                        v-model="itemEmployeeName"
                        option-value="code"
                        option-text="name"
                        placeholder="Select Employee Name"
                        style="padding: 9px"
                      >
                      </model-list-select> -->
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
                        @change="setTimeAuth"
                        :minute-step="5"
                        format="MM/DD/YYYY hh:mm A"
                        value-type="format"
                        type="datetime"
                        style="display: block; width: 100%; line-height: 20px"
                      ></date-picker>
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingModalAuthStart && attemptUpdate"
                        >Auth Start is required!</small
                      >
                    </div>
                  </div>

                  <div class="col-md-5">
                    <div class="form-group">
                      <small
                        ><label for="authTimeEnd"
                          >Authorized Time End</label
                        ></small
                      >
                      <date-picker
                        v-model="authTimeEnd"
                        @change="setTimeAuth"
                        :minute-step="5"
                        format="MM/DD/YYYY hh:mm A"
                        value-type="format"
                        type="datetime"
                        style="display: block; width: 100%; line-height: 20px"
                      ></date-picker>
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingModalAuthEnd && attemptUpdate"
                        >Auth End is required!</small
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
                  <div class="col-md-5">
                    <div class="form-group">
                      <small
                        ><label for="actualTimeStart"
                          >Actual Time Start</label
                        ></small
                      >
                      <date-picker
                        v-model="actualTimeStart"
                        @change="setTime"
                        :minute-step="5"
                        format="MM/DD/YYYY hh:mm A"
                        value-type="format"
                        type="datetime"
                        style="display: block; width: 100%; line-height: 20px"
                      ></date-picker>
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingModalActualStart && attemptUpdate"
                        >Actual Start is required!</small
                      >
                    </div>
                  </div>

                  <div class="col-md-5">
                    <div class="form-group">
                      <small
                        ><label for="actualTimeEnd"
                          >Actual Time End</label
                        ></small
                      >
                      <date-picker
                        v-model="actualTimeEnd"
                        @change="setTime"
                        :minute-step="5"
                        format="MM/DD/YYYY hh:mm A"
                        value-type="format"
                        type="datetime"
                        style="display: block; width: 100%; line-height: 20px"
                      ></date-picker>
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingModalActualEnd && attemptUpdate"
                        >Actual Start is required!</small
                      >
                    </div>
                  </div>

                  <div class="col-md-2">
                    <div class="form-group">
                      <small><label for="actualOthrs">Actual Hrs</label></small>
                      <input
                        type="text"
                        disabled
                        v-model="actualOthrs"
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
                        v-model="modalPurpose"
                      ></textarea>

                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingModalPurpose && attemptUpdate"
                        >Auth Start is required!</small
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer justify-content-end">
                <button
                  type="button"
                  @click="update()"
                  class="btn btn-success btn-sm"
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
    await this.getAttachments(
      this.$route.params.id,
      this.$route.params.frmName
    );
    await this.getInprogressId(
      this.$route.params.id,
      this.$route.params.frmName
    );
    await this.getRecipients(
      this.$route.params.id,
      this.loggedUserId,
      this.companyId,
      this.form
    );
    await this.isRmApproval(this.$route.params.id, this.companyId);
    await this.getProjects();
    this.isLoading = false;
  },
  watch: {
    counter() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },

    async $route(newRoute) {
      console.warn(newRoute);
      this.isLoading = true;
      this.counter = 0;
      this.withdrawRemarks = "";
      this.remarks = "";
      await this.getOtMain(newRoute.params.id);
      await this.getAttachments(newRoute.params.id, newRoute.params.frmName);
      await this.getInprogressId(
        newRoute.params.id,
        this.companyId,
        newRoute.params.frmName
      );
      await this.getRecipients(
        newRoute.params.id,
        this.loggedUserId,
        this.companyId,
        newRoute.params.frmName
      );
      await this.isRmApproval(newRoute.params.id, this.companyId);
      await this.getProjects();
      this.isLoading = false;
    },

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

    numberActual() {
      if (this.isActual === true && this.isRmApprovalBool === 0) {
        return 8;
      } else if (this.isActual === true && this.isRmApprovalBool === 1) {
        return 9;
      } else {
        return 6;
      }
    },

    headerActual() {
      if (this.isActual === true && this.isRmApprovalBool === 0) {
        return 11;
      } else if (this.isActual === true && this.isRmApprovalBool === 1) {
        return 12;
      } else {
        return 8;
      }
    },

    isForClarity() {
      if (this.title === "Clarify") {
        return true;
      } else {
        return false;
      }
    },

    missingModalProject() {
      if (this.itemModalProjectName.code === undefined) {
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

    missingModalActualStart() {
      if (this.actualTimeStart === null) {
        return true;
      } else {
        return false;
      }
    },
    missingModalActualEnd() {
      if (this.actualTimeEnd === null) {
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

    missingModalRecipient() {
      if (this.itemrecipient.code === undefined) {
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
      counter: 1,
      attemptUpdate: false,
      attemptClarify: false,
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

      // totalOT: 0,
      isLoading: false,
      isLoadingModal: false,
      processId: this.$route.params.id,
      form: this.$route.params.frmName,
      withdrawRemarks: "",

      overtime: [],

      // The Attachments
      selectedFile: [],

      title: "",

      recipent: [],
      itemrecipient: {},
      remarks: "",
      inprogressId: "",

      isActual: false,

      // The Alert
      isAlert: false,
      header: "", // Syccess or Failed
      message: "", // added successfully
      type: "", // true or false

      isRmApprovalBool: 0, // Check if this is 3rd approval

      // MODAL UPDATE
      // Overtime Modal Details - cust name / cust id
      id: "", // primary key in hr.ot
      projectName: [],
      itemModalProjectName: {},
      employeeName: [],
      itemEmployeeName: {},
      clientName: "",
      clientId: "",
      mainId: "",

      overtimeDate: "",
      authTimeStart: null,
      authTimeEnd: null,
      authOThrs: "",
      modalPurpose: "",
      actualTimeStart: null,
      actualTimeEnd: null,
      actualOthrs: "",

      index: null,

      // soft delete ot row by id
      otId: [],

      // to trash
      totrashIndex: null,
      totrashotId: null,
    };
  },

  methods: {
    validateNext() {
      if (this.counter === 0) {
        this.counter++;
      } else {
        if (this.overtime.length) {
          this.counter++;
        } else {
          this.openToast("top-right", "warning", "Overtime table is required!");
        }
      }
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

    trash() {
      this.overtime.splice(this.totrashIndex, 1);
      this.otId.push(this.totrashotId);
      document.getElementById("modal-confirm--close-btn").click();
      this.openToast(
        "top-right",
        "success",
        "Overtime item deleted successfully!"
      );
      this.totrashIndex = null;
      this.totrashotId = null;
    },

    totrash(index, id) {
      this.totrashIndex = index;
      this.totrashotId = id;
    },

    async update() {
      this.isLoadingModal = true;
      this.attemptUpdate = true;
      this.resetAlert();
      const validated = this.validateEmptyFields();
      const isGreaterThan = this.validateStartEndDate(
        this.actualTimeStart,
        this.actualTimeEnd
      );

      const isGreaterThanAuth = this.validateStartEndDate(
        this.authTimeStart,
        this.authTimeEnd
      );

      if (validated && isGreaterThan && isGreaterThanAuth) {
        const addData = {
          id: this.id,
          overtime_date: this.overtimeDate,
          ot_in: this.authTimeStart,
          ot_out: this.authTimeEnd,
          ot_totalhrs: this.authOThrs,
          ot_in_actual: this.actualTimeStart,
          ot_out_actual: this.actualTimeEnd,
          ot_totalhrs_actual: this.actualOthrs,
          employee_id: this.itemEmployeeName.code,
          employee_name: this.itemEmployeeName.name,
          purpose: this.modalPurpose,
          cust_id: this.clientId,
          cust_name: this.clientName,
          main_Id: this.mainId,
          PRJID: this.itemModalProjectName.code,
          PRJNAME: this.itemModalProjectName.name,
        };
        const otData = [];
        otData.push(addData);
        console.log(otData);
        const fd = new FormData();
        fd.append("overtimeData", JSON.stringify(otData));
        try {
          const resp = await axios.post(
            "http://127.0.0.1:8000/api/validateActualOT",
            fd
          );
          if (resp.status === 200) {
            this.overtime.splice(this.index, 1);
            this.overtime.push(addData);
            this.isLoadingModal = false;
            this.addAlert("Success", resp.data.message, "true");
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
          this.isLoadingModal = false;
          this.addAlert("Failed", err, "false");
          // Handle Error Here
          console.error(err);
        }
      } else {
        if (isGreaterThanAuth === false && validated) {
          this.isLoadingModal = false;
          this.addAlert(
            "Failed",
            "Auth Time End must be greater than Auth Time Start!",
            "false"
          );
        } else if (isGreaterThan === false && validated) {
          this.isLoadingModal = false;
          this.addAlert(
            "Failed",
            "Actual Time End must be greater than Actual Time Start!",
            "false"
          );
        } else {
          this.isLoadingModal = false;
          this.addAlert("Failed", "Please complete required fields!", "false");
        }
      }
    },

    edit(index) {
      console.warn(index);
      // this.isButton = false;
      const selectedOvertime = this.overtime[index];
      this.editOvertime = selectedOvertime;
      this.index = index;

      this.itemEmployeeName = {
        code: selectedOvertime.employee_id,
        name: selectedOvertime.employee_name,
      };

      this.itemModalProjectName = {
        code: selectedOvertime.PRJID,
        name: selectedOvertime.PRJNAME,
      };

      console.log(selectedOvertime);

      this.id = selectedOvertime.id; // primary key in hr.ot
      this.overtimeDate = selectedOvertime.overtime_date;
      this.authTimeStart = this.convertTimeAndDate(selectedOvertime.ot_in);
      this.authTimeEnd = this.convertTimeAndDate(selectedOvertime.ot_out);
      this.authOThrs = selectedOvertime.ot_totalhrs;
      this.actualTimeStart = this.convertTimeAndDate(selectedOvertime.ot_in_actual);
      this.actualTimeEnd = this.convertTimeAndDate(selectedOvertime.ot_out_actual);
      this.actualOthrs = selectedOvertime.ot_totalhrs_actual;
      this.modalPurpose = selectedOvertime.purpose;
      this.clientName = selectedOvertime.cust_id;
      this.clientId = selectedOvertime.cust_name;
    },

    validateEmptyFields() {
      if (
        !this.missingModalProject &&
        !this.missingModalAuthStart &&
        !this.missingModalAuthEnd &&
        !this.missingModalActualStart &&
        !this.missingModalActualEnd &&
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
      this.clientId = "";
      this.clientName = "";
      this.mainId = "";
    },

    addAlert(header, message, type) {
      this.isAlert = true;
      this.header = header;
      this.message = message;
      this.type = type;
    },

    closeModal() {
      this.resetAlert();
      this.resetModal();
    },

    setTimeAuth() {
      const time_start = new Date(this.authTimeStart);
      const time_end = new Date(this.authTimeEnd);

      let time_total = (time_end - time_start) / 1000 / 60 / 60;

      let f = Math.floor(time_total);
      if (time_total - f < 0.5) {
        time_total = Math.floor(time_total);
        // console.log(time_total);
        this.authOThrs = time_total;
        // $('#authtime_totalHrs').val(time_total);
      } else {
        time_total = f + 0.5;
        // console.log(time_total);
        this.authOThrs = time_total;
        // $('#authtime_totalHrs').val(time_total);
      }
    },

    setTime() {
      const time_start = new Date(this.actualTimeStart);
      const time_end = new Date(this.actualTimeEnd);

      let time_total = (time_end - time_start) / 1000 / 60 / 60;

      let f = Math.floor(time_total);
      if (time_total - f < 0.5) {
        time_total = Math.floor(time_total);
        // console.log(time_total);
        this.actualOthrs = time_total;
        // $('#authtime_totalHrs').val(time_total);
      } else {
        time_total = f + 0.5;
        // console.log(time_total);
        this.actualOthrs = time_total;
        // $('#authtime_totalHrs').val(time_total);
      }
    },

    async getProjects() {
      const response = await fetch(
        `http://127.0.0.1:8000/api/general-getprojects/${localStorage.getItem(
          "companyId"
        )}`,
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
          responseData.message || "Failed to fetch Projects."
        );
        throw error;
      }
      const project = [];
      for (const key in responseData) {
        const request = {
          code: responseData[key].project_id,
          name: responseData[key].project_name,
        };
        project.push(request);
      }
      this.projectName = project;

      // console.warn(project)
    },

    async isRmApproval(id, companyId) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/get-isRmApproval-ot/${id}/${companyId}`
        );

        console.warn(resp.data.data[0].isRmApproval);

        this.isRmApprovalBool = resp.data.data[0].isRmApproval;
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    async getInprogressId(id, companyId, form) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/get-Inprogress/${id}/${companyId}/${form}`
        );
        // console.log(resp.status);
        if (resp.status === 200) {
          // this.selectedFile = resp.data.data;
          this.inprogressId = resp.data[0].inpId;
          console.log(this.inprogressId);
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    async submit(type) {
      this.isLoadingModal = true;
      const fd = new FormData();

      fd.append("form", this.form);
      fd.append("processId", this.$route.params.id);
      fd.append("loggedUserId", this.loggedUserId);
      fd.append("companyId", this.companyId);
      fd.append("recipientId", this.itemrecipient.code);
      fd.append("remarks", this.remarks);
      fd.append("inprogressId", this.inprogressId);
      fd.append("loggedUserFullname", this.loggedUserFullName);
      fd.append("referenceNumber", this.referenceNumber);
      fd.append("class", "OT");
      fd.append("loggedUserDepartment", this.loggedUserDepartment);
      fd.append("isRmApproval", this.isRmApprovalBool);
      fd.append("overtimeData", JSON.stringify(this.overtime));
      fd.append("otId", JSON.stringify(this.otId));

      if (type === "Approve") {
        try {
          const resp = await axios.post(
            "http://127.0.0.1:8000/api/approve-request",
            fd
          );

          this.isLoadingModal = false;
          document.getElementById("modalCloseButton").click();
          if (resp.status === 200) {
            // console.log(resp.data);
            this.openToast("top-right", "success", resp.data.message);
            this.$router.replace("/approvals");
          }

          if (resp.status === 202) {
            // console.log(resp.data);
            this.openToast("top-right", "error", resp.data.message);
          }
        } catch (err) {
          // Handle Error Here
          console.error(err);
        }
      }

      if (type === "Reject") {
        try {
          const resp = await axios.post(
            "http://127.0.0.1:8000/api/reject-request",
            fd
          );

          this.isLoadingModal = false;
          document.getElementById("modalCloseButton").click();
          if (resp.status === 200) {
            // console.log(resp.data);
            this.openToast("top-right", "success", resp.data.message);
            this.$router.replace("/approvals");
          }
        } catch (err) {
          // Handle Error Here
          console.error(err);
        }
      }

      if (type === "Clarify") {
        this.attemptClarify = true;
        this.resetAlert();
        const validated = this.validateModalDefault();
        if (validated) {
          // start
          try {
            const res = await axios.post(
              "http://127.0.0.1:8000/api/send-clarity",
              fd
            );

            if (res.status === 200) {
              this.isLoadingModal = false;
              document.getElementById("modalCloseButton").click();
              this.openToast("top-right", "success", res.data.message);
              this.resetAlert();
              this.remarks = "";
              this.$router.replace("/approvals");
            } else {
              this.isLoadingModal = false;
              document.getElementById("modalCloseButton").click();
              this.openToast("top-right", "error", "Please Try again laer");
            }
          } catch (err) {
            this.isLoadingModal = false;
            document.getElementById("modalCloseButton").click();
            this.openToast("top-right", "error", err);
          }
          // end
        } else {
          this.isLoadingModal = false;
          this.addAlert("Failed", "Please select recipent!", "false");
        }
      }
    },

    validateModalDefault() {
      if (!this.missingModalRecipient === true) {
        return true;
      } else {
        return false;
      }
    },

    closeModalDefault() {
      this.resetAlert();
      this.attemptClarify = false;
      this.remarks = "";
    },

    async getRecipients(id, loggedUserId, companyId, form) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/getRecipient/${id}/${loggedUserId}/${companyId}/${form}`
        );

        console.log(resp.data);

        if (resp.status === 200) {
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
        // Handle Error Here
        console.error(err);
      }
    },

    setTitle(title) {
      this.title = title;
    },
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
      this.$router.replace("/approvals");
    },

    preview(mimeType, imageBytes) {
      if (mimeType === "image/jpeg" || mimeType === "image/png") {
        var newTab = window.open();
        newTab.document.body.innerHTML = `<img src="data:${mimeType};base64,${imageBytes}" resizable=yes, style="max-width: 100%; height: auto; ">`;
      } else if (mimeType === "application/pdf") {
        let pdfWindow = window.open("#");
        pdfWindow.document.write(
          `<iframe width='100%' height='100%' src='data:${mimeType};base64, ` +
            encodeURI(imageBytes) +
            "'></iframe>"
        );
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
      try {
        const resp = await axios.get(`http://127.0.0.1:8000/api/ot-main/${id}`);
        // console.log(resp.data);
        if (resp.status === 200) {
          this.referenceNumber = resp.data[0].reference;
          this.requestedDate = resp.data[0].request_date;
          this.reportingManagerName = resp.data[0].reporting_manager;

          this.overtime = resp.data;

          if (resp.data[0].ot_totalhrs_actual === null) {
            this.isActual = false;
          } else {
            this.isActual = true;
          }
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
