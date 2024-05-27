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
          <div class="progressbar" :class="classE" v-if="isLiquidation">
            <span :class="classE">5</span>
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
                >Liquidation</span
              ></small
            >
          </div>
          <div class="textbar" :class="classD" v-if="isLiquidation">
            <small
              ><span :class="classD" class="font-weight-bold"
                >Attachments</span
              ></small
            >
          </div>
          <div class="textbar" :class="classD" v-if="isLiquidation">
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
                  v-model="dateNeeded"
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px"
                  v-if="strictInitAndLiquidation"
                ></date-picker>

                <input
                  type="text"
                  disabled
                  class="form-control py-3 form-control-sm"
                  id="dateNeeded"
                  v-model="dateNeeded"
                  v-else
                />
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
                  ><label for="reportingManager selextForm" id="selextForm"
                    >Reporting Manager</label
                  ></small
                >
                <!-- <input
                  type="text"
                  class="form-control py-3 form-control-sm"
                  disabled
                  v-model="reportingManager"
                  id="reportingManager"
                /> -->
                <model-list-select
                  :list="reportingManager"
                  v-model="reportingManagerItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px"
                  v-if="strictInitAndLiquidation"
                >
                </model-list-select>

                <input
                  v-else
                  type="text"
                  class="form-control py-3 form-control-sm"
                  disabled
                  v-model="reportingManagerItem.name"
                  id="reportingManager"
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
                <small><label for="projectName">Project Name</label></small>

                <model-list-select
                  :list="project"
                  v-model="projectItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px"
                  v-if="strictInitAndLiquidation"
                >
                </model-list-select>

                <input
                  v-else
                  type="text"
                  class="form-control py-3 form-control-sm"
                  disabled
                  v-model="projectItem.name"
                  id="projectName"
                />
                <small
                  class="text-danger p-0 m-0"
                  v-if="this.missingProjectItem && attemptNext"
                  >Project Name is required!</small
                >
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
                  v-model.trim="purpose"
                  rows="5"
                  v-if="strictInitAndLiquidation"
                ></textarea>

                <textarea
                  class="form-control"
                  name="purpose"
                  id="purpose"
                  disabled
                  v-model="purpose"
                  rows="5"
                  v-else
                ></textarea>
                <small
                  class="text-danger p-0 m-0"
                  v-if="this.missingPurpose && attemptNext"
                  >Purpose is required!</small
                >
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
                v-model.trim="payeeName"
                id="payeeName"
                v-if="strictInitAndLiquidation"
              />

              <input
                type="text"
                class="form-control form-control-sm"
                v-model="payeeName"
                disabled
                id="payeeName"
                v-else
              />
              <small
                class="text-danger p-0 m-0"
                v-if="this.missingPayeeName && attemptNextOne"
                >Payee Name is required!</small
              >
            </div>
            <div class="form-group">
              <small><label for="modeOfPayment">Mode of Payment</label></small>
              <model-list-select
                :list="modeOfPayment"
                v-model="modeOfPaymentItem"
                option-value="code"
                option-text="name"
                placeholder="select item"
                style="padding: 9px"
                v-if="strictInitAndLiquidation"
              >
              </model-list-select>

              <input
                v-else
                type="text"
                v-model="modeOfPaymentItem.name"
                disabled
                class="form-control form-control-sm"
                id="modeOfPayment"
              />
              <small
                class="text-danger p-0 m-0"
                v-if="this.missingModeOfPayment && attemptNextOne"
                >Mode of Payment is required!</small
              >
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
                    style="padding: 9px"
                    v-if="strictInitAndLiquidation"
                  >
                  </model-list-select>

                  <input
                    v-else
                    type="text"
                    disabled
                    v-model="currencyItem.name"
                    class="form-control form-control-sm"
                    id="currency"
                  />
                  <small
                    class="text-danger p-0 m-0"
                    v-if="this.missingCurrency && attemptNextOne"
                    >Currency is required!</small
                  >
                </div>
              </div>
              <div class="col-md-8">
                <div class="form-group">
                  <small><label for="amount">Amount</label></small>

                  <input
                    type="text"
                    @keyup="formatCurrency($event)"
                    @blur="formatCurrency($event, 'blur')"
                    pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                    class="form-control form-control-sm py-3"
                    id="amount"
                    v-model="amount"
                    v-if="strictInitAndLiquidation"
                  />

                  <input
                    v-else
                    type="text"
                    class="form-control form-control-sm py-3"
                    id="amount"
                    v-model="amount"
                    :disabled="true"
                  />
                  <small
                    class="text-danger p-0 m-0"
                    v-if="this.missingAmount && attemptNextOne"
                    >Amount is required!</small
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3"></div>
        </div>
        <!-- / Payment Details -->

        <!-- Liquidation -->
        <div class="row mt-4" v-if="this.counter === setLiq">
          <!-- Read only Liquidation -->
          <table class="table table-sm table-bordered table-striped mx-2">
            <thead>
              <tr>
                <th colspan="7" scope="col">
                  <aside class="d-flex align-items-center">
                    <span class="mb-1 ml-1"> Liquidation Table</span>
                  </aside>
                </th>
                <th v-if="isInitiatorAndLiquidation">
                  <aside class="text-center">
                    <button
                      class="btn btn-sm btn-success m-0"
                      data-toggle="modal"
                      data-target="#modal-liquidation"
                      @click="setButton()"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                  </aside>
                </th>
              </tr>

              <tr>
                <th scope="col" class="text-center">#</th>
                <th scope="col">Date</th>
                <th scope="col">Client Name</th>
                <th scope="col">Expense Type</th>
                <th scope="col">Description</th>
                <th scope="col">Currency</th>
                <th scope="col">Amount</th>
                <th scope="col" v-if="isInitiatorAndLiquidation">Action</th>
              </tr>
            </thead>
            <tbody style="font-size: 14px">
              <tr v-for="(item, index) in liquidation" :key="item.id">
                <td class="text-center">{{ index + 1 }}.</td>
                <td>{{ item.trans_date }}</td>
                <td>{{ item.client_name }}</td>
                <td>{{ item.expense_type }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.currency }}</td>
                <td>{{ item.Amount }}</td>
                <td class="pl-0 m-0" v-if="isInitiatorAndLiquidation">
                  <aside class="d-flex justify-content-center">
                    <button
                      class="btn btn-sm btn-info m-0"
                      @click="edit(liquidation.indexOf(item))"
                      data-toggle="modal"
                      data-target="#modal-liquidation"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-danger m-0 ml-1"
                      @click="trash(liquidation.indexOf(item))"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </aside>
                </td>
              </tr>
              <tr>
                <td colspan="6"></td>
                <td colspan="2">
                  <b>Total Amount: {{ this.totalAmount }}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- / Liquidation -->

        <!-- The Attachments -->
        <div
          v-if="this.counter === setAttach"
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
            class="pt-2 col-md-12 rounded"
            @dragover="dragover"
            @dragleave="dragleave"
            @drop="drop"
            id="uploadContainer"
          >
            <input
              v-if="isInitiator"
              type="file"
              multiple
              name="fields[assetsFieldHandle][]"
              id="assetsFieldHandle"
              class="w-25 h-25 overflow-hidden"
              @change="onFileSelected"
              ref="file"
              accept=".pdf,.jpg,.jpeg,.png"
            />

            <label
              for="assetsFieldHandle"
              style="width: 100%; cursor: pointer"
              class="block pt-3 cursor-pointer"
            >
              <span class="text-secondary" v-if="isInitiator"
                >Click here or drop file(s)</span
              >
              <span class="text-secondary" v-else
                >List of attached file(s)</span
              >
            </label>

            <ul class="pb-3 text-decoration-none ulUpload" v-cloak>
              <li
                class="text-sm mt-2"
                v-for="(file, index) in selectedFile"
                :key="file.id"
              >
                <div class="row d-flex justify-content-center">
                  <div class="col-md-4 d-flex">
                    <div class="col text-left">
                      <span><label>{{ file.filename }}</label></span>
                    </div>

                    <div>
                      <a class="btn btn-info btn-sm" :href="`http://127.0.0.1:8000/api/downloadFile?filepath=${file.fileDestination}&filename=${file.filename}`" target="_blank">Download</a>
                    </div>

                    <div class="ml-1" v-if="isInitiator">
                      <button
                        class="btn btn-danger btn-sm"
                        type="button"
                        @click="
                          removeAttachedFile(
                            index,
                            file.id,
                            file.filename,
                            file.filepath
                          )
                        "
                        title="Remove file"
                      >
                        Remove
                      </button>
                    </div>

                    <div class="ml-1">
                      <a class="btn btn-secondary btn-sm"  :href="`http://127.0.0.1:8000/${file.filepath}/${file.filename}`" target="_blank">Preview</a>
                    </div>
                  </div>
                </div>
              </li>

              <!-- Newly added file -->
              <li
                class="text-sm mt-2"
                v-for="file in selectedFileNew"
                :key="file.index"
              >
                <div class="row d-flex justify-content-center">
                  <div class="col-md-4 d-flex">
                    <div class="col text-left">
                      <span><label>{{ file.name }}</label></span>
                    </div>
                    <div>
                      <button
                        class="btn btn-danger btn-sm"
                        type="button"
                        @click="removeFileNew(selectedFileNew.indexOf(file))"
                        title="Remove file"
                      >
                        Remove
                      </button>
                    </div>
                    <div class="ml-1">
                      <button
                        class="btn btn-secondary btn-sm"
                        @click="filePreviewNew(selectedFileNew.indexOf(file))"
                      >
                        Preview
                      </button>
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
        <aside v-if="this.counter >= setReview">
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
                    <td>{{ this.reportingManagerItem.name }}</td>
                  </tr>
                  <tr>
                    <td>Project Name</td>
                    <td>{{ this.projectItem.name }}</td>
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

          <!-- Liquidation Review -->
          <div class="card card-secondary" v-if="isLiquidation">
            <div class="card-header">
              <h3 class="card-title">Liquidation</h3>

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
                    <th style="width: 15%">Expense Type</th>
                    <th style="width: 30%">Description</th>
                    <th style="width: 10%">Currency</th>
                    <th style="width: 15%">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in liquidation" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.trans_date }}</td>
                    <td>{{ item.client_name }}</td>
                    <td>{{ item.expense_type }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.currency }}</td>
                    <td>{{ item.Amount }}</td>
                  </tr>

                  <tr>
                    <td colspan="6"></td>
                    <b class="px-1">Total: {{ this.totalAmount }}</b>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.Liquidation Review -->

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
                  <tr v-for="(file, index) in selectedFile" :key="file.id">
                  <td>{{ file.filename }}</td>
                      <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                      <aside class="d-flex align-items-center justify-content-end">
                      <a class="btn btn-info btn-sm" :href="`http://127.0.0.1:8000/api/downloadFile?filepath=${file.fileDestination}&filename=${file.filename}`" target="_blank">Download</a>

                      <button
                        v-if="isInitiator"
                        class="btn btn-danger btn-sm ml-1"
                        @click="
                          removeAttachedFile(
                            index,
                            file.id,
                            file.filename,
                            file.filepath
                          )
                        "
                      >
                        Remove
                      </button>

                      <a class="btn btn-secondary btn-sm ml-1"  :href="`http://127.0.0.1:8000/${file.filepath}/${file.filename}`" target="_blank">Preview</a>
                      </aside>
                    </td>
                  </tr>

                  <tr v-for="file in selectedFileNew" :key="file.index">
                    <td>{{ file.name }}</td>
                      <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                      <aside class="d-flex align-items-center justify-content-end">

                      <button
                        @click="removeFileNew(selectedFileNew.indexOf(file))"
                        class="btn btn-danger btn-sm"
                        v-if="isInitiator"
                      >
                        Remove
                      </button>

                      <button
                        class="btn btn-secondary btn-sm ml-1"
                        @click="filePreviewNew(selectedFileNew.indexOf(file))"
                      >
                        Preview
                      </button>
                      </aside>
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
                class="btn mr-1 btn-secondary btn-sm"
              >
                Previous
              </button>
            
            <aside
           

              v-show="this.counter <= 2"
              v-if="!isLiquidation"
            >
              <!-- validation button initiator for next page if you are the initiator -->
              <button
                v-if="isInitiator"
                type="button"
                @click="next()"
                class="btn mr-1 btn-primary btn-sm"
              >
                Next
              </button>
              <!-- validation button for approver -->
              <button
                v-else
                type="button"
                @click="counter++"
                class="btn mr-1 btn-primary btn-sm"
              >
                Next
              </button>
            </aside>

            <aside v-else>
              
                <button
                v-show="this.counter <= 3"
                v-if="isInitiator"
                type="button"
                @click="next()"
                class="btn mr-1 btn-primary btn-sm"
              >
                Next
              </button>

              <button
              v-show="this.counter <= 3"
              v-else
                type="button"
                @click="counter++"
                class="btn mr-1 btn-primary btn-sm"
              >
                Next
              </button>
            </aside>

          
          </aside>

          <aside class="col-lg-6 d-flex justify-content-end align-items-center flex-nowrap">
            
              <button 
                v-if="isLiquidation"
                v-show="this.counter === 4"
                type="button"
                class="btn ml-1 btn-warning btn-sm"
                data-toggle="modal"
                data-target="#modal-default"
              >
                Reply
              </button>

              <button
                v-else
                v-show="this.counter === 3"
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
            <h6 class="modal-title"><b>Reply Message</b></h6>
            <button
              type="button"
              id="modalCloseButton"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="closeModalReply()"
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
                    v-model.trim="remarks"
                  ></textarea>
                  <small
                    class="text-danger p-0 m-0"
                    v-if="this.missingModalDefaultRemarks && attemptReply"
                    >Remarks is required!</small
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
              @click="replyValidate()"
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

    <!-- Modal Liquidation-->
    <div
      class="modal fade"
      id="modal-liquidation"
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
              <b>Liquidation</b>
            </h6>
            <button
              type="button"
              id="modalCloseButton"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="closeModalLiq()"
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
              <div class="col-md-4">
                <div class="form-group">
                  <small><label for="reference">Date</label></small>
                  <date-picker
                    valueType="format"
                    style="display: block; width: 100%; line-height: 20px"
                    v-model="modalDate"
                  ></date-picker>
                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingModalDate && attemptInsert"
                    >Date is required!</small
                  >
                </div>
              </div>
              <div class="col-md-8">
                <div class="form-group">
                  <small><label for="projectName">Project Name</label></small>
                  <!-- <input type="text" class="form-control py-3 form-control-sm" id="projectName"> -->
                  <model-list-select
                    :list="modalclient"
                    v-model="itemclientName"
                    option-value="code"
                    option-text="name"
                    placeholder="select item"
                    style="padding: 9px"
                  >
                  </model-list-select>
                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingModalProjectName && attemptInsert"
                    >Project Name is required!</small
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <small><label for="projectName">Expense Type</label></small>

                  <model-list-select
                    :list="modalExpenseType"
                    v-model="itemmodalExpenseType"
                    option-value="code"
                    option-text="name"
                    placeholder="select item"
                    style="padding: 9px"
                  >
                  </model-list-select>
                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingModalExpenseType && attemptInsert"
                    >Expense Type is required!</small
                  >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <small><label for="projectName">Currency Type</label></small>

                  <model-list-select
                    :list="modalCurrency"
                    v-model="itemmodalCurrency"
                    option-value="code"
                    option-text="name"
                    placeholder="select item"
                    style="padding: 9px"
                  >
                  </model-list-select>
                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingModalCurrencyType && attemptInsert"
                    >Currency Type is required!</small
                  >
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <small><label for="modalamount">Amount</label></small>
                  <input
                    type="text"
                    @keyup="formatModalCurrency($event)"
                    @blur="formatModalCurrency($event, 'blur')"
                    pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                    class="form-control form-control-sm py-3"
                    id="modalamount"
                    v-model="modalamount"
                  />

                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingModalAmount && attemptInsert"
                    >Amount is required!</small
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
                    v-model="modalremarks"
                    placeholder="Please input request remarks here!"
                  ></textarea>
                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingModalRemarks && attemptInsert"
                    >Remarks is required!</small
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-end">
            <!-- <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> -->

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

    setLiq() {
      if (this.isLiquidation === true) {
        return 2;
      } else {
        return false;
      }
    },

    setAttach() {
      if (this.isLiquidation === true) {
        return 3;
      } else {
        return 2;
      }
    },

    setReview() {
      if (this.isLiquidation === true) {
        return 4;
      } else {
        return 3;
      }
    },

    missingDateNeeded() {
      if (this.dateNeeded === null) {
        return true;
      } else {
        return false;
      }
    },

    missingReportingManager() {
      if (this.reportingManagerItem.code === undefined) {
        return true;
      } else {
        return false;
      }
    },

    missingProjectItem() {
      if (this.projectItem.code === undefined) {
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

    missingPayeeName() {
      if (this.payeeName.length === 0) {
        return true;
      } else {
        return false;
      }
    },

    missingModeOfPayment() {
      if (this.modeOfPaymentItem.code === undefined) {
        return true;
      } else {
        return false;
      }
    },

    missingCurrency() {
      if (this.currencyItem.code === undefined) {
        return true;
      } else {
        return false;
      }
    },

    missingAmount() {
      if (this.amount.length === 0 || parseFloat(this.amount) < 1) {
        return true;
      } else {
        return false;
      }
    },

    missingModalDefaultRemarks() {
      if (this.remarks.length === 0) {
        return true;
      } else {
        return false;
      }
    },

    // modal liquidation validation
    missingModalDate() {
      if (this.modalDate === null) {
        return true;
      } else {
        return false;
      }
    },
    missingModalProjectName() {
      if (this.itemclientName.code === undefined) {
        return true;
      } else {
        return false;
      }
    },
    missingModalExpenseType() {
      if (this.itemmodalExpenseType.code === undefined) {
        return true;
      } else {
        return false;
      }
    },
    missingModalCurrencyType() {
      if (this.itemmodalCurrency.code === undefined) {
        return true;
      } else {
        return false;
      }
    },
    missingModalAmount() {
      if (this.modalamount.length === 0) {
        return true;
      } else {
        return false;
      }
    },
    missingModalRemarks() {
      if (this.modalremarks.length === 0) {
        return true;
      } else {
        return false;
      }
    },

    // Calendaer
    todaysYear() {
      const today = new Date();
      const yyyy = today.getFullYear();
      return yyyy;
    },

    totalAmount() {
      if (this.liquidation.length > 0) {
        const total = this.liquidation
          .map((liquidation) =>
            parseFloat(liquidation.Amount.replace(/,/g, ""))
          )
          .reduce((acc, liquidation) => liquidation + acc);
        return total.toLocaleString(undefined, { minimumFractionDigits: 2 });
      } else {
        return 0;
      }
    },

    isInitiatorAndLiquidation() {
      return this.isLiquidation && this.isInitiator;
    },

    strictInitAndLiquidation() {
      let x;
      x = this.isLiquidation;
      x = !x;
      let y = this.isInitiator;
      const z = y && x;
      return z;
    },
  },
  data() {
    return {
      counter: 0,
      attemptNext: false,
      attemptNextOne: false,
      attemptNextTwo: false,
      attemptReply: false,
      attemptInsert: false,
      setIndex: "",

      // Request Details
      referenceNumber: "",
      requestDate: "",
      dateNeeded: "",
      // reportingManager: "",
      reportingManager: [],
      reportingManagerItem: {},
      project: [],
      projectItem: {},

      projectName: "",
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
      modeOfPaymentItem: {},
      payeeName: "",
      // modeOfPayment: "",
      currency: [
        { code: "PHP", name: "PHP" },
        { code: "AUD", name: "AUD" },
        { code: "CAD", name: "CAD" },
        { code: "EUR", name: "EUR" },
        { code: "USD", name: "USD" },
      ],
      currencyItem: {},
      amount: "",
      realAmount: "",

      // The Attachments
      selectedFile: [],
      // filespreview: "",
      removedAttachedFilesId: [],

      // newly added attachments
      selectedFileNew: [],

      // reply Modal
      remarks: "",

      isLoading: false,
      isLoadingModal: false,

      isInitiator: false,
      isLiquidation: false,

      // User Details
      processId: this.$route.params.id,
      form: "Request for Payment",

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

      // switch button in liquidation part
      isButton: true,

      // use in liquidation CRUD
      i: 0,

      liquidation: [],
      editliquidation: [],

      // modal insert liq
      modalDate: null,
      modalclient: [],
      itemclientName: {},
      modalCurrency: [],
      itemmodalCurrency: {},
      modalExpenseType: [],
      itemmodalExpenseType: {},
      modalamount: "",
      modalRealamount: "",
      modalremarks: "",

      // The Alert
      isAlert: false,
      header: "", // Syccess or Failed
      message: "", // added successfully
      type: "", // true or false
    };
  },

  async created() {
    this.isLoading = true;
    // use for liquidation
    await this.getRfpMain(this.$route.params.id);
    await this.getRfpDetails(this.$route.params.id);
    await this.getBusinesses(this.companyId);
    await this.getActualSign(this.$route.params.id, this.$route.params.frmName, this.companyId);
    await this.getcurrencyName();
    await this.getexpenseType();
    // this.getLiquidation(this.$route.params.id);
    await this.getReportingManager(this.loggedUserId);
    await this.getProjects();
    await this.getAttachments(this.$route.params.id, this.$route.params.frmName);
    this.isLoading = false;
  },
  watch: {
    // Request Details
    projectItem(newValue) {
      this.getClient(newValue.code);
    },

    // go to top page when changing steps
    counter() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },

        //Navigate
    async $route(newRoute) {
    this.isLoading = true;
    this.counter = 0;
    // use for liquidation
    await this.getRfpMain(this.$route.params.id);
    await this.getRfpDetails(this.$route.params.id);
    await this.getBusinesses(this.companyId);
    await this.getActualSign(this.$route.params.id, this.$route.params.frmName, this.companyId);
    await this.getcurrencyName();
    await this.getexpenseType();
    // this.getLiquidation(this.$route.params.id);
    await this.getReportingManager(this.loggedUserId);
    await this.getProjects();
    await this.getAttachments(this.$route.params.id, this.$route.params.frmName);
    this.isLoading = false;
    console.log(newRoute)
    },


  },

  methods: {
    closeModalLiq() {
      this.resetAlert();
      this.resetModal();
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
    closeModalReply() {
      this.resetAlert();
      this.remarks = "";
      this.attemptReply = false;
    },
    next() {
      if (this.counter === 0) {
        this.attemptNext = true;
      } else if (this.counter === 1) {
        this.attemptNext = false;
        this.attemptNextOne = true;
      } else if (this.counter === 2) {
        this.attemptNextOne = false;
        this.attemptNextTwo = true;
      }

      this.validateCurrentTab(this.counter);
    },

    validateCurrentTab(counter) {
      // Request Details
      if (counter === 0) {
        if (
          !this.missingDateNeeded &&
          !this.missingReportingManager &&
          !this.missingProjectItem &&
          !this.missingPurpose
        ) {
          this.counter++;
        }
        // Payment Details
      } else if (counter === 1) {
        if (
          !this.missingPayeeName &&
          !this.missingModeOfPayment &&
          !this.missingCurrency &&
          !this.missingAmount
        ) {
          this.counter++;
        }
        // Attachments
      } else if (counter === 2) {
        if (this.isLiquidation) {
          if (this.liquidation.length) {
            this.counter++;
          } else {
            this.openToast(
              "top-right",
              "warning",
              "Please provide your liquidation!"
            );
          }
        } else {
        if (this.selectedFile.length || this.selectedFileNew.length) {
          this.counter++;
        } else {
            // this.openToast(
            //   "top-right",
            //   "warning",
            //   "Please provide your attachments!"
            // );

            this.counter++;
        }
        }
      } else if (counter === 3 && this.isLiquidation) {
        if (this.selectedFile.length || this.selectedFileNew.length) {
          this.counter++;
        } else {
            this.openToast(
              "top-right",
              "warning",
              "Please provide your attachments!"
            );
        }
      }


    },

    async getRfpMain(id) {
      
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/rfp-main/${id}`
        );

        if (resp.status === 200) {
          
          this.referenceNumber = resp.data.data.REQREF;
          this.requestDate = resp.data.data.DATE;
          this.dateNeeded = resp.data.data.Deadline;
          this.amount = parseFloat(resp.data.data.AMOUNT).toLocaleString(
            undefined,
            { minimumFractionDigits: 2 }
          );
          this.uid = resp.data.data.UID;

          if (resp.data.data.UID === parseInt(this.loggedUserId)) {
            this.isInitiator = true;
          }
        }
      } catch (err) {
        
        // Handle Error Here
        console.error(err);
      }
    },

    async getRfpDetails(id) {
      // this.isLoading = true;
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/rfp-main-detail/${id}`
        );

        if (resp.status === 200) {
          // this.isLoading = false;
          this.clientName = resp.data.data.CLIENTNAME;
          this.purpose = resp.data.data.PURPOSED;
          this.payeeName = resp.data.data.PAYEE;

          const currencyItem = {
            code: resp.data.data.CURRENCY,
            name: resp.data.data.CURRENCY,
          };
          this.currencyItem = currencyItem;

          const modeOfPaymentItem = {
            code: resp.data.data.MOP,
            name: resp.data.data.MOP,
          };
          this.modeOfPaymentItem = modeOfPaymentItem;

          const projectItem = {
            code: resp.data.data.PROJECTID,
            name: resp.data.data.PROJECT,
          };
          this.projectItem = projectItem;
        }
      } catch (err) {
        // this.isLoading = false;
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
        if (resp.status === 200) {
          // this.isLoading = false;
          const reportingManagerItem = {
            code: resp.data[2].RM_ID,
            name: resp.data[2].REPORTING_MANAGER,
          };
          this.reportingManagerItem = reportingManagerItem;

          if (resp.data[2].STATUS === "Completed") {
            console.log("liquidation is true");
            this.isLiquidation = true;
            this.getLiquidation(id);
          } else {
            // alert('false')
            console.log("liquidation is false");
            // this.isLiquidation = false;
          }
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
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

    openToast(position, variant, message) {
      const toastTitle = variant.charAt(0).toUpperCase() + variant.slice(1);
      VsToast.show({
        title: `${toastTitle}`,
        message: `${message}`,
        variant,
        position,
      });
    },

    replyValidate() {
      this.attemptReply = true;
      if (!this.missingModalDefaultRemarks) {
        this.reply();
      } else {
        this.addAlert("Failed", "Please complete required fields!", "false");
      }
    },

    async reply() {
      this.isLoadingModal = true;
      const fd = new FormData();
      for (let i = 0; i < this.selectedFileNew.length; i++) {
        fd.append("file[]", this.selectedFileNew[i]);
      }

      fd.append("referenceNumber", this.referenceNumber);
      fd.append("processId", this.processId);
      fd.append("form", this.form);
      fd.append("loggedUserId", this.loggedUserId);
      fd.append("remarks", this.remarks);
      fd.append("loggedUserFullName", this.loggedUserFullName);
      fd.append("dateNeeded", this.dateNeeded);
      fd.append("amount", this.amount);
      fd.append("reportingManagerName", this.reportingManagerItem.name);
      fd.append("companyId", this.companyId);
      fd.append("projectId", this.projectItem.code);
      fd.append("clientId", this.clientId);
      fd.append("clientName", this.clientName);
      fd.append("mainId", this.mainId);
      fd.append("class", "RFP");
      fd.append("projectName", this.projectItem.name);
      fd.append("payeeName", this.payeeName);
      fd.append("modeOfPayment", this.modeOfPaymentItem.name);
      fd.append("purpose", this.purpose);
      fd.append("currency", this.currencyItem.name);
      fd.append("reportingManagerId", this.reportingManagerItem.code);
      fd.append("companyName", this.companyName);
      fd.append("removedFiles", JSON.stringify(this.removedAttachedFilesId));
      fd.append("liquidation", JSON.stringify(this.liquidation));


          try {
          const res = await axios.post(
            "http://127.0.0.1:8000/api/reply-request",
            fd
          );

          console.log(res.data);
          this.isLoadingModal = false;
          document.getElementById("modalCloseButton").click();

          if (res.status === 200) {
            this.openToast("top-right", "success", res.data.message);
            this.$router.replace("/approvals");
          }

          if (res.status === 202) {
            // console.log(res)
            this.openToast("top-right", "error", res.data.message);
            this.$router.replace("/approvals");

          }
        } catch (err) {
          // Handle Error Here
          console.error(err);
          this.isLoadingModal = false;
          this.openToast("top-right", "error", err);

        }



      // axios
      //   .post("http://127.0.0.1:8000/api/reply-request", fd)
      //   .then((res) => {
      //     // handle success
      //     console.log(res);
      //     this.isLoadingModal = false;
      //     document.getElementById("modalCloseButton").click();
      //     this.openToast("top-right", "success", res.data.message);
      //     this.$router.replace("/approvals");
      //   })
      //   .catch(function (error) {
      //     // handle error
      //     console.log(error);
      //   })
      //   .then(function () {
      //     // always executed
      //   });
    },
    close() {
      this.$router.replace("/clarifications");
    },

    // The Attachments
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

    // Add new files scripts
    onFileSelected(event) {
      let selectedFiles = event.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.selectedFileNew.push(selectedFiles[i]);
      }
      this.setFilePreviewNew();
    },

    onInputChange(event) {
      let selectedFiles = event.dataTransfer.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.selectedFileNew.push(selectedFiles[i]);
      }
      this.setFilePreviewNew();
    },

    // preview function of newly added files
    filePreviewNew(i) {
      // console.log(i)
      const url = this.filespreviewNew[i].link;
      window.open(url, "_blank", "resizable=yes");
    },

    // set a preview function for newly added files
    setFilePreviewNew() {
      let files = this.selectedFileNew;
      const fileContainer = [];
      for (let i = 0; i < files.length; i++) {
        let tmppath = URL.createObjectURL(files[i]);
        const thisFiles = {
          link: tmppath,
        };
        fileContainer.push(thisFiles);
      }
      this.filespreviewNew = fileContainer;
    },

    // remove newly added files
    removeFileNew(i) {
      this.selectedFileNew.splice(i, 1);
      this.setFilePreviewNew();
    },

    // remove existing attached files
    removeAttachedFile(index, id, filename, filepath) {
      const attachmentId = { id: id, filename: filename, filepath: filepath };
      this.removedAttachedFilesId.push(attachmentId);
      this.selectedFile.splice(index, 1);
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
    // End Attachments

    update() {
      this.isLoadingModal = true;
      this.attemptInsert = true;
      this.resetAlert();
      const validated = this.validateEmptyFields();
      if (validated) {
        // start
        this.isLoadingModal = false;

        const addData = {
          id: this.editliquidation.id,
          trans_date: this.modalDate,
          client_id: this.itemclientName.code,
          client_name: this.itemclientName.name,
          expense_type: this.itemmodalExpenseType.name,
          currency: this.itemmodalCurrency.name,
          Amount: this.modalamount,
          description: this.modalremarks,
        };
        this.liquidation.push(addData);
        this.liquidation.splice(this.setIndex, 1);

        this.editliquidation = "";
        // this.liquidation.push(this.editliquidation)
        this.liquidation.sort(function (a, b) {
          return a.id - b.id;
        });
        this.addAlert("Success", "Added Successfully!", "true");
        this.resetModal();
        // end
      } else {
        this.isLoadingModal = false;
        this.addAlert("Failed", "Please complete required fields!", "false");
      }
    },

    edit(index) {
      this.isButton = false;
      const selectedLiquidation = this.liquidation[index];
      this.editliquidation = selectedLiquidation;
      this.setIndex = index;

      console.log(selectedLiquidation);

      this.modalDate = selectedLiquidation.trans_date;
      this.itemclientName = {
        code: selectedLiquidation.client_id,
        name: selectedLiquidation.client_name,
      };
      this.itemmodalCurrency = {
        code: selectedLiquidation.currency,
        name: selectedLiquidation.currency,
      };
      this.itemmodalExpenseType = {
        code: selectedLiquidation.expense_type,
        name: selectedLiquidation.expense_type,
      };

      this.modalamount = selectedLiquidation.Amount;
      // this.modalamount = parseFloat(selectedLiquidation.Amount).toLocaleString(
      //   undefined,
      //   { minimumFractionDigits: 2 }
      // );
      this.modalremarks = selectedLiquidation.description;
    },

    setButton() {
      this.isButton = true;
    },

    trash(index) {
      this.liquidation.splice(index, 1);
    },

    insert() {
      this.isLoadingModal = true;
      this.attemptInsert = true;
      this.resetAlert();
      const validated = this.validateEmptyFields();
      if (validated) {
        // start
        this.isLoadingModal = false;

        const addData = {
          id: this.i++,
          trans_date: this.modalDate,
          client_id: this.itemclientName.code,
          client_name: this.itemclientName.name,
          expense_type: this.itemmodalExpenseType.name,
          description: this.modalremarks,
          currency: this.itemmodalCurrency.name,
          Amount: this.modalamount,
        };
        this.liquidation.push(addData);
        this.addAlert("Success", "Added Successfully!", "true");
        this.resetModal();
        // end
      } else {
        this.isLoadingModal = false;
        this.addAlert("Failed", "Please complete required fields!", "false");
      }
    },

    validateEmptyFields() {
      if (
        !this.missingModalDate &&
        !this.missingModalProjectName &&
        !this.missingModalExpenseType &&
        !this.missingModalCurrencyType &&
        !this.missingModalAmount &&
        !this.missingModalRemarks
      ) {
        return true;
      } else {
        return false;
      }
    },

    resetModal() {
      this.attemptInsert = false;
      this.modalDate = null;
      this.itemclientName = {};
      this.itemmodalCurrency = {};
      this.itemmodalExpenseType = {};
      this.modalamount = "";
      this.modalremarks = "";
      this.modalRealamount = "";
    },

    async getBusinesses(companyId) {
      const response = await fetch(
        `http://127.0.0.1:8000/api/general-businesses/${companyId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const responseData = await response.json();
      // console.log(responseData)
      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to fetch Businesses."
        );
        throw error;
      }
      const client = [];
      for (const key in responseData) {
        // console.log(key)
        const request = {
          code: responseData[key].businessNumber,
          name: responseData[key].businessName,
        };
        client.push(request);
      }
      this.modalclient = client;
    },

    async getcurrencyName() {
      const response = await fetch(
        "http://127.0.0.1:8000/api/get-currencyType",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const responseData = await response.json();
      // console.log(responseData[0])
      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to fetch Currency Type."
        );
        throw error;
      }

      const modalCurrency = [];
      for (const key in responseData[0]) {
        const request = {
          code: responseData[0][key].currencyName,
          name: responseData[0][key].currencyName,
        };
        modalCurrency.push(request);
      }
      this.modalCurrency = modalCurrency;
    },

    async getexpenseType() {
      const response = await fetch(
        "http://127.0.0.1:8000/api/get-expenseType",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const responseData = await response.json();

      // console.log(responseData);
      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to fetch modal ExpenseType Type."
        );
        throw error;
      }
      const modalExpenseType = [];
      for (const key in responseData[0]) {
        // console.log(key)
        const request = {
          code: responseData[0][key].type,
          name: responseData[0][key].type,
        };
        modalExpenseType.push(request);
      }
      this.modalExpenseType = modalExpenseType;
      // console.log(responseData[0].businessNumber)
    },

    async getLiquidation(id) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/rfp-main-liquidation/${id}`
        );
        // console.log(resp.data);
        // this.liquidation = resp.data;

        const liquidation = [];
        for (const key in resp.data) {
          const data = {
            Amount: parseFloat(resp.data[key].Amount).toLocaleString(
              undefined,
              { minimumFractionDigits: 2 }
            ),
            ISLIQUIDATED: resp.data[key].ISLIQUIDATED,
            RFPID: resp.data[key].RFPID,
            STATUS: resp.data[key].STATUS,
            amt_due_to_comp: resp.data[key].amt_due_to_comp,
            amt_due_to_emp: resp.data[key].amt_due_to_emp,
            client_id: resp.data[key].client_id,
            client_name: resp.data[key].client_name,
            currency: resp.data[key].currency,
            currency_id: resp.data[key].currency_id,
            date_: resp.data[key].date_,
            description: resp.data[key].description,
            expense_type: resp.data[key].expense_type,
            id: resp.data[key].id,
            trans_date: resp.data[key].trans_date,
            ts: resp.data[key].ts,
          };
          liquidation.push(data);
        }
        this.liquidation = liquidation;
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },
    async getProjects() {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/general-projects`
        );
        // console.log(resp.data);
        const projects = [];
        for (const key in resp.data) {
          const request = {
            code: resp.data[key].project_id,
            name: resp.data[key].project_name,
          };
          projects.push(request);
        }
        this.project = projects;
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    async getReportingManager(loggedUserId) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/reporting-manager/${loggedUserId}`
        );
        // console.log(resp.data);

        // showReportingManager - responesSix
        const reportingManager = [];
        for (const key in resp.data) {
          const request = {
            code: resp.data[key].RMID,
            name: resp.data[key].RMName,
          };
          reportingManager.push(request);
        }
        this.reportingManager = reportingManager;
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
        // console.log(resp.data);

        // showReportingManager - responesSix
        this.selectedFile = resp.data.data;
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
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
      let input_val = this.amount;

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
      this.amount = input_val;
      input.target.value = input_val;

      let realAmount = input_val;
      if (realAmount.indexOf(",") !== -1) {
        realAmount = realAmount.replace(/,/g, "");
      }
      this.realAmount = realAmount;

      // put caret back in the right position
      let updated_len = input_val.length;
      caret_pos = updated_len - original_len + caret_pos;
      input.target.setSelectionRange(caret_pos, caret_pos);
    },

    formatModalNumber(n) {
      // format number 1000000 to 1,234,567
      return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    formatModalCurrency(input, blur) {
      // appends $ to value, validates decimal side
      // and puts cursor back in right position.

      // get input value
      let input_val = this.modalamount;

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
      this.modalamount = input_val;
      input.target.value = input_val;

      let realAmount = input_val;
      if (realAmount.indexOf(",") !== -1) {
        realAmount = realAmount.replace(/,/g, "");
      }
      this.modalRealamount = realAmount;

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
