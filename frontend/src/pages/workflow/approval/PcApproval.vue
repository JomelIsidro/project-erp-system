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
                <th v-if="isApproval">
                  <aside class="text-center">
                    <button
                      class="btn btn-sm btn-success m-0"
                      data-toggle="modal"
                      data-target="#modal-expenseType"
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
                <th scope="col">Remarks</th>
                <th scope="col">Amount</th>
                <th v-if="isApproval" scope="col">Action</th>
              </tr>
            </thead>

            <tbody style="font-size: 14px">
              <tr v-for="(item, index) in expenseType_Data" :key="item.id">
                <td class="text-center">{{ index + 1 }}.</td>
                <td>{{ item.date_ }}</td>
                <td>{{ item.CLIENT_NAME }}</td>
                <td>{{ item.EXPENSE_TYPE }}</td>
                <td>{{ item.DESCRIPTION }}</td>
                <td>{{ item.AMOUNT }}</td>
                <td v-if="isApproval" class="pl-0 m-0">
                  <aside class="d-flex justify-content-center">
                    <button
                      class="btn btn-sm btn-info m-0"
                      data-toggle="modal"
                      data-target="#modal-expenseType"
                      @click="edit_ExpenseType(expenseType_Data.indexOf(item))"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-danger m-0 ml-1"
                      @click="trash_ExpenseType(expenseType_Data.indexOf(item))"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </aside>
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
                <th v-if="isApproval">
                  <aside class="text-center">
                    <button
                      class="btn btn-sm btn-success m-0"
                      data-toggle="modal"
                      data-target="#modal-Transportation"
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
                <th scope="col">Destination From</th>
                <th scope="col">Destination To</th>
                <th scope="col">Mode of Transportation</th>
                <th scope="col">Remarks</th>
                <th scope="col">Amount</th>
                <th v-if="isApproval" scope="col">Action</th>
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
                <td>{{ item.AMT_SPENT }}</td>
                <td v-if="isApproval" class="pl-0 m-0">
                  <aside class="d-flex justify-content-center">
                    <button
                      class="btn btn-sm btn-info m-0"
                      data-toggle="modal"
                      data-target="#modal-Transportation"
                      @click="
                        edit_transpoSetup(transpoSetup_Data.indexOf(item))
                      "
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-danger m-0 ml-1"
                      @click="
                        trash_transpoSetup(transpoSetup_Data.indexOf(item))
                      "
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </aside>
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
          <div
            class="pt-2 col-md-12 rounded"
            @dragover="dragover"
            @dragleave="dragleave"
            @drop="drop"
            id="uploadContainer"
          >
            <input
              v-if="isApproval"
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
              <span class="text-secondary" v-if="isApproval"
                >Click here or drop file(s)</span
              >
              <span class="text-secondary" v-else
                >List of attached file(s)</span
              >
            </label>
            <small
              class="text-danger p-0 m-0"
              v-if="missingAttachments && attemptNextTwo"
              >Attachments is required!</small
            >

            <ul class="pb-3 text-decoration-none ulUpload" v-cloak>
              <li
                class="text-sm mt-2"
                v-for="(file, index) in selectedFile"
                :key="file.newFilename"
              >
                <div class="row d-flex justify-content-center">
                  <div class="col-md-4 d-flex">
                    <div class="col text-left">
                      <span
                        ><label>{{ file.filename }}</label></span
                      >
                    </div>
                    <div>
                      <a
                        class="btn btn-info btn-sm"
                        :href="`http://127.0.0.1:8000/api/downloadFile?filepath=${file.fileDestination}&filename=${file.filename}`"
                        target="_blank"
                        >Download</a
                      >
                    </div>

                    <div class="ml-1" v-if="isApproval">
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
                      <a
                        class="btn btn-secondary btn-sm"
                        :href="`http://127.0.0.1:8000/${file.filepath}/${file.filename}`"
                        target="_blank"
                        >Preview</a
                      >
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
                      <span
                        ><label>{{ file.name }}</label></span
                      >
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
                    <td>{{ item.AMOUNT }}</td>
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
                    <td>{{ item.AMT_SPENT }}</td>
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
                    <td
                      class="
                        pl-2
                        pr-2
                        text-center
                        d-flex
                        justify-content-center
                        align-items-center
                      "
                    >
                      <aside
                        class="d-flex align-items-center justify-content-end"
                      >
                        <a
                          class="btn btn-info btn-sm"
                          :href="`http://127.0.0.1:8000/api/downloadFile?filepath=${file.fileDestination}&filename=${file.filename}`"
                          target="_blank"
                          >Download</a
                        >

                        <button
                          class="btn btn-danger btn-sm ml-1"
                          v-if="isApproval"
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

                        <a
                          class="btn btn-secondary btn-sm ml-1"
                          :href="`http://127.0.0.1:8000/${file.filepath}/${file.filename}`"
                          target="_blank"
                          >Preview</a
                        >
                      </aside>
                    </td>
                  </tr>

                  <!-- Newly Added -->
                  <tr v-for="file in selectedFileNew" :key="file.index">
                    <td>{{ file.name }}</td>
                    <td
                      class="
                        pl-2
                        pr-2
                        text-center
                        d-flex
                        justify-content-center
                        align-items-center
                      "
                    >
                      <aside
                        class="d-flex align-items-center justify-content-end"
                      >
                        <button
                          class="btn btn-danger btn-sm"
                          type="button"
                          @click="removeFileNew(selectedFileNew.indexOf(file))"
                          title="Remove file"
                        >
                          Remove
                        </button>
                        <button
                          @click="filePreviewNew(selectedFileNew.indexOf(file))"
                          class="btn btn-secondary btn-sm ml-1"
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

        <!-- Modal Expense Type -->
        <div
          class="modal fade"
          id="modal-expenseType"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title">
                  <b>Expense Type</b>
                </h6>
                <button
                  type="button"
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
                  <div class="col-md-4">
                    <div class="form-group">
                      <small><label for="reference">Date</label></small>

                      <date-picker
                        valueType="format"
                        style="display: block; width: 100%; line-height: 20px"
                        v-model="expenseType_Date"
                      ></date-picker>
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingXPDateNeeded && attemptXpInsert"
                        >Date is required!</small
                      >
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <small
                        ><label for="projectName">Client Name</label></small
                      >
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
                        v-if="missingXPClientItem && attemptXpInsert"
                        >Client Name is required!</small
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <small><label for="projectName">Amount</label></small>

                      <input
                        type="text"
                        @keyup="formatCurrencyExpense($event)"
                        @blur="formatCurrencyExpense($event, 'blur')"
                        pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                        class="form-control form-control-sm py-3"
                        v-model="expenseType_Amount"
                      />

                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingXPAmount && attemptXpInsert"
                        >Amount is required!</small
                      >
                    </div>
                  </div>

                  <div class="col-md-8">
                    <div class="form-group">
                      <small
                        ><label for="modalamount">Expense Type</label></small
                      >
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
                        v-if="missingXPType && attemptXpInsert"
                        >Expense Type is required!</small
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
                        v-model="expenseType_Remarks"
                        placeholder="Please input request remarks here!"
                      ></textarea>
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingXPRemarks && attemptXpInsert"
                        >Reporting Manager is required!</small
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
                  @click="insert_ExpenseType()"
                >
                  insert
                </button>

                <button
                  v-else
                  type="button"
                  class="btn btn-success btn-sm"
                  @click="update_ExpenseType()"
                >
                  Update
                </button>
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>
        <!-- /. Modal Expense Type -->

        <!-- Modal Transporation Details  -->
        <div
          class="modal fade"
          id="modal-Transportation"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title">
                  <b>Transportation Details</b>
                </h6>
                <button
                  type="button"
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
                  <div class="col-md-4">
                    <div class="form-group">
                      <small><label for="reference">Date</label></small>

                      <date-picker
                        valueType="format"
                        style="display: block; width: 100%; line-height: 20px"
                        v-model="transpoSetup_Date"
                      ></date-picker>
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingTDDateNeeded && attemptTdInsert"
                        >Date is required!</small
                      >
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <small
                        ><label for="projectName">Client Name</label></small
                      >
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
                        v-if="missingTDClientItem && attemptTdInsert"
                        >Client name is required!</small
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <small
                        ><label for="projectName"
                          >Mode of Transportation</label
                        ></small
                      >

                      <model-list-select
                        :list="transpoSetup"
                        v-model="itemtranspoSetup"
                        option-value="code"
                        option-text="name"
                        placeholder="select item"
                        style="padding: 9px"
                      >
                      </model-list-select>
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingTDMot && attemptTdInsert"
                        >Mode of transportation is required!</small
                      >
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <small><label for="projectName">Amount</label></small>

                      <input
                        type="text"
                        @keyup="formatCurrencyTranspo($event)"
                        @blur="formatCurrencyTranspo($event, 'blur')"
                        pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                        class="form-control form-control-sm py-3"
                        v-model="transpoSetup_Amount"
                      />
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingTDAmount && attemptTdInsert"
                        >Amount is required!</small
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <small
                        ><label for="projectName"
                          >Destination From</label
                        ></small
                      >

                      <input
                        type="text"
                        class="form-control form-control-sm py-3"
                        v-model.trim="transpoSetup_From"
                      />
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingTDFrom && attemptTdInsert"
                        >Destination from is required!</small
                      >
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <small
                        ><label for="projectName">Destination To</label></small
                      >
                      <input
                        type="text"
                        class="form-control form-control-sm py-3"
                        v-model.trim="transpoSetup_to"
                      />
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingTDTo && attemptTdInsert"
                        >Destination to is required!</small
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
                        v-model.trim="transpoSetup_Remarks"
                        placeholder="Please input request remarks here!"
                      ></textarea>
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingTDRemarks && attemptTdInsert"
                        >Transportation remarks is required!</small
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
                  @click="insert_transpoSetup()"
                >
                  insert
                </button>

                <button
                  v-else
                  type="button"
                  class="btn btn-success btn-sm"
                  @click="update_transpoSetup()"
                >
                  Update
                </button>
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>
        <!-- /. Modal Transporation Details -->

        <!-- Buttons -->
        <div class="row d-flex justify-content-between mt-3">
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
              @click="previous()"
              class="btn btn-secondary mr-2 btn-sm"
            >
              Previous
            </button>

            <aside v-if="this.counter <= isAttachments">
              <button
                v-if="this.isLiquidation"
                type="button"
                @click="next()"
                class="btn btn-primary btn-sm mr-2"
              >
                Next
              </button>

              <button
                v-else
                type="button"
                @click="counter++"
                class="btn btn-primary btn-sm mr-2"
              >
                Next
              </button>
            </aside>
          </aside>

          <aside
            class="
              col-lg-6
              d-flex
              align-items-center
              justify-content-end
              flex-nowrap
            "
          >
            <button
              type="button"
              class="btn btn-success ml-2 btn-sm"
              data-toggle="modal"
              data-target="#modal-default"
              @click="setTitle('Approve')"
            >
              Approve
            </button>

            <button
              type="button"
              class="btn btn-danger ml-2 btn-sm"
              data-toggle="modal"
              data-target="#modal-default"
              @click="setTitle('Reject')"
            >
              Reject
            </button>

            <button
              type="button"
              class="btn btn-warning ml-2 btn-sm"
              data-toggle="modal"
              data-target="#modal-default"
              @click="setTitle('Clarify')"
            >
              Clarify
            </button>

            <button
              type="button"
              class="btn btn-danger ml-2 btn-sm"
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
    this.isLoading = true;

    // Request Details
    await this.getPcMain(this.processId);
    await this.getInprogressId(this.processId, this.companyId, this.form);
    await this.getActualSign(this.processId, this.form, this.companyId);
    await this.getAttachments(this.processId, this.form);
    await this.getBusinesses(this.companyId);
    await this.getPcExpense(this.processId);
    await this.getPcTranspo(this.processId);
    await this.getexpenseType();
    await this.gettranspoSetup();
    await this.getRecipients(
      this.processId,
      this.loggedUserId,
      this.companyId,
      this.form
    );
    this.isLoading = false;
  },
  watch: {
    //Navigate
    async $route(newRoute) {
      // this.todaysDate();
      this.isLoading = true;
      this.remarks = "";
      this.counter = 0;
      await this.getPcMain(this.$route.params.id);
      await this.getInprogressId(
        this.$route.params.id,
        this.companyId,
        this.$route.params.frmName
      );
      await this.getActualSign(
        this.$route.params.id,
        this.$route.params.frmName,
        this.companyId
      );
      await this.getAttachments(
        this.$route.params.id,
        this.$route.params.frmName
      );
      await this.getBusinesses(this.companyId);
      await this.getPcExpense(this.$route.params.id);
      await this.getPcTranspo(this.$route.params.id);
      await this.getexpenseType();
      await this.gettranspoSetup();
      await this.getRecipients(
        this.$route.params.id,
        this.loggedUserId,
        this.companyId,
        this.$route.params.frmName
      );
      this.isLoading = false;
      console.log(newRoute);
    },

    // Request Details
    projectItem(newValue) {
      this.getClient(newValue.code);
    },

    counter() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
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

    missingXPDateNeeded() {
      if (this.expenseType_Date === null) {
        return true;
      } else {
        return false;
      }
    },

    missingXPClientItem() {
      if (this.itemclientName.code === undefined) {
        return true;
      } else {
        return false;
      }
    },

    missingXPAmount() {
      if (
        this.expenseType_Amount.length === 0 ||
        parseFloat(this.expenseType_Amount) < 1
      ) {
        return true;
      } else {
        return false;
      }
    },

    missingXPType() {
      if (this.itemmodalExpenseType.code === undefined) {
        return true;
      } else {
        return false;
      }
    },

    missingXPRemarks() {
      if (this.expenseType_Remarks.length === 0) {
        return true;
      } else {
        return false;
      }
    },

    missingTDDateNeeded() {
      if (this.transpoSetup_Date === null) {
        return true;
      } else {
        return false;
      }
    },

    missingTDClientItem() {
      if (this.itemclientName.code === undefined) {
        return true;
      } else {
        return false;
      }
    },

    missingTDMot() {
      if (this.itemtranspoSetup.code === undefined) {
        return true;
      } else {
        return false;
      }
    },

    missingTDAmount() {
      if (
        this.transpoSetup_Amount.length === 0 ||
        parseFloat(this.transpoSetup_Amount) < 1
      ) {
        return true;
      } else {
        return false;
      }
    },

    missingTDFrom() {
      if (this.transpoSetup_From.length === 0) {
        return true;
      } else {
        return false;
      }
    },

    missingTDTo() {
      if (this.transpoSetup_to.length === 0) {
        return true;
      } else {
        return false;
      }
    },

    missingTDRemarks() {
      if (this.transpoSetup_Remarks.length === 0) {
        return true;
      } else {
        return false;
      }
    },

    missingExpenses() {
      if (
        this.expenseType_Data.length >= 1 ||
        this.transpoSetup_Data.length >= 1
      ) {
        return false;
      } else {
        return true;
      }
    },

    missingAttachments() {
      if (this.selectedFile.length >= 1 || this.selectedFileNew.length >= 1) {
        return false;
      } else {
        return true;
      }
    },

    missingModalRecipient() {
      if (this.itemrecipient.code === undefined) {
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
      setIndex: "",
      attemptNext: false,
      attemptNextTwo: false,
      attemptClarify: false,
      attemptXpInsert: false,
      attemptTdInsert: false,

      // Request Details
      reportingManager: [],
      reportingManagerItem: {},
      project: [],
      projectItem: {},
      clientId: "",
      mainId: "",

      guid: "",

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
      removedAttachedFilesId: [],

      // newly added attachments
      selectedFileNew: [],

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

      isLoading: false,
      isLoadingModal: false,
      processId: this.$route.params.id,
      form: this.$route.params.frmName,

      recipent: [],
      itemrecipient: {},

      title: "",

      remarks: "",

      inprogressId: "",
      isLiquidation: false,
      isApproval: false,

      // expense data modal
      modalclient: [],
      itemclientName: {},

      modalExpenseType: [],
      itemmodalExpenseType: {},

      expenseType_Date: null,
      expenseType_Amount: "",
      expenseType_RealAmount: "",

      expenseType_Remarks: "",

      isButton: true,

      // data for expense type
      expenseType_Data: [],
      expenseType_EditData: [],
      i: 0,

      // data for transportation
      transpoSetup: [],
      itemtranspoSetup: {},
      transpoSetup_Date: null,
      transpoSetup_Amount: "",
      transpoSetup_RealAmount: "",
      transpoSetup_From: "",
      transpoSetup_to: "",
      transpoSetup_Remarks: "",

      transpoSetup_Data: [],
      transpoSetup_EditData: [],

      // The Alert
      isAlert: false,
      header: "", // Syccess or Failed
      message: "", // added successfully
      type: "", // true or false
    };
  },

  methods: {
    async submit(type) {
      this.isLoadingModal = true;
      const fd = new FormData();
      for (let i = 0; i < this.selectedFileNew.length; i++) {
        fd.append("file[]", this.selectedFileNew[i]);
      }
      fd.append("form", this.form);
      fd.append("processId", this.$route.params.id);
      fd.append("loggedUserId", this.loggedUserId);
      fd.append("companyId", this.companyId);
      fd.append("recipientId", this.itemrecipient.code);
      fd.append("remarks", this.remarks);
      fd.append("inprogressId", this.inprogressId);
      fd.append("loggedUserFullname", this.loggedUserFullName);
      fd.append("referenceNumber", this.referenceNumber);
      fd.append("payeeName", this.payeeName);
      fd.append("class", "PC");
      fd.append("loggedUserDepartment", this.loggedUserDepartment);
      fd.append("guid", this.guid);
      fd.append("isLiquidation", this.isLiquidation);

      fd.append("removedFiles", JSON.stringify(this.removedAttachedFilesId));
      fd.append("expenseData", JSON.stringify(this.expenseType_Data));
      fd.append("transpoData", JSON.stringify(this.transpoSetup_Data));

      if (type === "Approve") {
        const validated = this.approveValidate();
        console.warn(validated);
        if (validated) {
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
            this.isLoadingModal = false;
            this.openToast(
              "top-right",
              "error",
              "Please contact the Administrator!"
            );

            console.error(err);
          }
        } else {
          this.isLoadingModal = false;
          this.openToast(
            "top-right",
            "error",
            "Please complete all required fields!"
          );
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

            document.getElementById("modalCloseButton").click();
            this.openToast("top-right", "success", res.data.message);
            if (res.status === 200) {
              this.isLoadingModal = false;
              this.$router.replace("/approvals");
            } else {
              this.isLoadingModal = false;

              document.getElementById("modalCloseButton").click();
              this.openToast("top-right", "error", "Please Try again laer");
            }
          } catch (err) {
            this.isLoadingModal = false;

            // Handle Error Here
            // console.error(err);

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

    next() {
      if (this.counter === 0 || this.counter === 1 || this.counter === 2) {
        this.counter++;
        // console.log("alert 012");
      } else if (this.counter === 3) {
        this.attemptNext = true;

        if (!this.missingExpenses) {
          this.counter++;
        } else {
          this.openToast(
            "top-right",
            "warning",
            "Please provide your expenses!"
          );
        }
      } else if (this.counter === 4) {
        this.attemptNextTwo = true;
        if (!this.missingAttachments) {
          this.counter++;
        } else {
          this.openToast("top-right", "warning", "Attachments is required!");
        }
      }
    },

    approveValidate() {
      if (this.isApproval) {
        if (this.missingAttachments || this.missingExpenses) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },

    closeDefaultModal() {
      this.resetAlert();
      this.itemrecipient = {};
      this.remarks = "";
      this.attemptClarify = false;
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

    previous() {
      this.counter--;
      this.attemptNext = false;
      this.attemptNextTwo = false;
    },

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

    close() {
      this.$router.replace("/approvals");
    },
    async getPcExpense(id) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/get-PcExpense/${id}`
        );

        if (resp.status === 200) {
          const expenseType_Data = [];
          for (const key in resp.data) {
            const data = {
              AMOUNT: parseFloat(resp.data[key].AMOUNT).toLocaleString(
                undefined,
                { minimumFractionDigits: 2 }
              ),
              CLIENT_ID: resp.data[key].CLIENT_ID,
              CLIENT_NAME: resp.data[key].CLIENT_NAME,
              DEPT: resp.data[key].DEPT,
              DESCRIPTION: resp.data[key].DESCRIPTION,
              EXPENSE_TYPE: resp.data[key].EXPENSE_TYPE,
              GUID: resp.data[key].GUID,
              ISLIQUIDATED: resp.data[key].ISLIQUIDATED,
              MAINID: resp.data[key].MAINID,
              PAYEE: resp.data[key].PAYEE,
              PCID: resp.data[key].PCID,
              PRJID: resp.data[key].PRJID,
              PROJECT: resp.data[key].PROJECT,
              RELEASEDCASH: resp.data[key].RELEASEDCASH,
              STATUS: resp.data[key].STATUS,
              TITLEID: resp.data[key].TITLEID,
              TS: resp.data[key].TS,
              date_: resp.data[key].date_,
              id: resp.data[key].id,
              payee_id: resp.data[key].payee_id,
            };
            expenseType_Data.push(data);
          }

          this.expenseType_Data = expenseType_Data;
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
        this.openToast("top-right", "warning", err);
      }
    },

    async getPcTranspo(id) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/get-PcTranspo/${id}`
        );

        if (resp.status === 200) {
          const transpoSetup_Data = [];
          for (const key in resp.data) {
            const data = {
              AMT_SPENT: parseFloat(resp.data[key].AMT_SPENT).toLocaleString(
                undefined,
                { minimumFractionDigits: 2 }
              ),
              CLIENT_ID: resp.data[key].CLIENT_ID,
              CLIENT_NAME: resp.data[key].CLIENT_NAME,
              DEPT: resp.data[key].DEPT,
              DESCRIPTION: resp.data[key].DESCRIPTION,
              DESTINATION_FRM: resp.data[key].DESTINATION_FRM,
              DESTINATION_TO: resp.data[key].DESTINATION_TO,
              GUID: resp.data[key].GUID,
              ISLIQUIDATED: resp.data[key].ISLIQUIDATED,
              MAINID: resp.data[key].MAINID,
              MOT: resp.data[key].MOT,
              PAYEE: resp.data[key].PAYEE,
              PCID: resp.data[key].PCID,
              PRJID: resp.data[key].PRJID,
              PROJECT: resp.data[key].PROJECT,
              RELEASEDCASH: resp.data[key].RELEASEDCASH,
              STATUS: resp.data[key].STATUS,
              TITLEID: resp.data[key].TITLEID,
              TS: resp.data[key].TS,
              date_: resp.data[key].date_,
              id: resp.data[key].id,
              payee_id: resp.data[key].payee_id,
            };
            transpoSetup_Data.push(data);
          }

          this.transpoSetup_Data = transpoSetup_Data;
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

          this.guid = resp.data.data.GUID;
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    async getRecipients(id, loggedUserId, companyId, form) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/getRecipient/${id}/${loggedUserId}/${companyId}/${form}`
        );

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

    async gettranspoSetup() {
      const response = await fetch(
        "http://127.0.0.1:8000/api/get-transpoSetup",
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
      const transpoSetup = [];
      for (const key in responseData[0]) {
        // console.log(key)
        const request = {
          code: responseData[0][key].MODE,
          name: responseData[0][key].MODE,
        };
        transpoSetup.push(request);
      }
      this.transpoSetup = transpoSetup;
      // console.log(responseData[0].businessNumber)
    },

    async getBusinesses(companyId) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/general-businesses/${companyId}`
        );

        if (resp.status === 200) {
          const client = [];
          for (const key in resp.data) {
            // console.log(key)
            const request = {
              code: resp.data[key].businessNumber,
              name: resp.data[key].businessName,
            };
            client.push(request);
          }
          this.modalclient = client;
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    async getActualSign(id, form, companyId) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/general-actual-sign/${id}/${form}/${companyId}`
        );

        // console.log(resp.status);
        if (resp.status === 200) {
          this.payeeName = resp.data[0].Payee;

          if (resp.data[1].STATUS === "Completed") {
            this.isLiquidation = true;
            console.log(this.isLiquidation);
          }

          if (resp.data[2].STATUS === "In Progress") {
            this.isApproval = true;
            console.log(this.isApproval);
          }

          if (
            resp.data[1].STATUS === "Completed" &&
            resp.data[2].STATUS === "In Progress"
          ) {
            this.counter = 2;
          } else {
            this.counter = 3;
          }
        }
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
          // console.log(this.inprogressId);
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

    // Expense CRUD
    insert_ExpenseType() {
      this.attemptXpInsert = true;
      const validated = this.validate_expenseType();
      this.resetAlert();
      if (validated) {
        const addData = {
          id: this.i++,
          CLIENT_NAME: this.itemclientName.name,
          DESCRIPTION: this.expenseType_Remarks,
          AMOUNT: this.expenseType_Amount,
          CLIENT_ID: this.itemclientName.code,
          EXPENSE_TYPE: this.itemmodalExpenseType.name,
          date_: this.expenseType_Date,
        };

        console.log(addData);
        this.expenseType_Data.push(addData);
        this.clear_expenseType();
        this.attemptXpInsert = false;

        this.addAlert("Success", "Expense details added successfully!", "true");
      } else {
        this.addAlert("Failed", "Please complete required fields!", "false");
      }
    },
    clear_expenseType() {
      this.expenseType_Date = null;
      this.itemclientName = {};
      this.expenseType_Amount = "";
      this.itemmodalExpenseType = {};
      this.expenseType_RealAmount = "";
      this.expenseType_Remarks = "";
    },

    clear_transpo() {
      this.transpoSetup_Date = null;
      this.itemclientName = {};
      this.itemtranspoSetup = {};
      this.transpoSetup_Amount = "";
      this.transpoSetup_RealAmount = "";
      this.transpoSetup_From = "";
      this.transpoSetup_to = "";
      this.transpoSetup_Remarks = "";
    },
    update_ExpenseType() {
      this.attemptXpInsert = true;
      const validated = this.validate_expenseType();
      this.resetAlert();
      if (validated) {
        // start
        const addData = {
          id: this.expenseType_EditData.id,
          CLIENT_NAME: this.itemclientName.name,
          DESCRIPTION: this.expenseType_Remarks,
          AMOUNT: this.expenseType_Amount,
          CLIENT_ID: this.itemclientName.code,
          EXPENSE_TYPE: this.itemmodalExpenseType.name,
          date_: this.expenseType_Date,
        };

        this.expenseType_Data.push(addData);
        this.expenseType_EditData = "";
        this.expenseType_Data.splice(this.setIndex, 1);

        // this.liquidation.push(this.editliquidation)
        this.expenseType_Data.sort(function (a, b) {
          return a.id - b.id;
        });
        this.clear_expenseType();
        this.attemptXpInsert = false;
        // end
        this.addAlert("Success", "Expense details added successfully!", "true");
      } else {
        this.addAlert("Failed", "Please complete required fields!", "false");
      }
    },

    edit_ExpenseType(index) {
      this.isButton = false;
      const expenseType_Data = this.expenseType_Data[index];
      this.expenseType_EditData = expenseType_Data;
      // this.expenseType_Data.splice(index, 1);
      this.setIndex = index;

      // console.log(expenseType_Data);

      this.itemclientName = {
        code: expenseType_Data.CLIENT_ID,
        name: expenseType_Data.CLIENT_NAME,
      };
      this.itemmodalExpenseType = {
        code: expenseType_Data.EXPENSE_TYPE,
        name: expenseType_Data.EXPENSE_TYPE,
      };

      this.expenseType_Date = expenseType_Data.date_;
      this.expenseType_Amount = expenseType_Data.AMOUNT;
      this.expenseType_Remarks = expenseType_Data.DESCRIPTION;
    },
    trash_ExpenseType(index) {
      // console.log('1'+ index)
      this.expenseType_Data.splice(index, 1);
    },

    validate_expenseType() {
      if (
        !this.missingXPDateNeeded &&
        !this.missingXPClientItem &&
        !this.missingXPAmount &&
        !this.missingXPType &&
        !this.missingXPRemarks
      ) {
        return true;
      } else {
        return false;
      }
    },

    validate_Transpo() {
      if (
        !this.missingTDDateNeeded &&
        !this.missingTDClientItem &&
        !this.missingTDMot &&
        !this.missingTDAmount &&
        !this.missingTDFrom &&
        !this.missingTDTo &&
        !this.missingTDRemarks
      ) {
        return true;
      } else {
        return false;
      }
    },

    validateModalDefault() {
      if (!this.missingModalRecipient === true) {
        return true;
      } else {
        return false;
      }
    },

    // modal td & xd
    closeModal() {
      this.clear_expenseType();
      this.clear_transpo();
      this.resetAlert();
      this.attemptXpInsert = false;
      this.attemptTdInsert = false;
    },

    // Transpo Crud
    insert_transpoSetup() {
      this.attemptTdInsert = true;
      const validated = this.validate_Transpo();
      this.resetAlert();
      if (validated) {
        const addData = {
          id: this.i++,
          CLIENT_NAME: this.itemclientName.name,
          DESTINATION_FRM: this.transpoSetup_From,
          DESTINATION_TO: this.transpoSetup_to,
          DESCRIPTION: this.transpoSetup_Remarks,
          AMT_SPENT: this.transpoSetup_Amount,
          MOT: this.itemtranspoSetup.name,
          CLIENT_ID: this.itemclientName.code,
          date_: this.transpoSetup_Date,
        };
        this.transpoSetup_Data.push(addData);
        this.clear_expenseType();
        this.clear_transpo();
        this.attemptTdInsert = false;

        this.addAlert("Success", "Expense details added successfully!", "true");
      } else {
        this.addAlert("Failed", "Please complete required fields!", "false");
      }
    },

    update_transpoSetup() {
      this.attemptTdInsert = true;
      const validated = this.validate_Transpo();
      this.resetAlert();

      if (validated) {
        const addData = {
          id: this.transpoSetup_EditData.id,
          CLIENT_NAME: this.itemclientName.name,
          DESTINATION_FRM: this.transpoSetup_From,
          DESTINATION_TO: this.transpoSetup_to,
          DESCRIPTION: this.transpoSetup_Remarks,
          AMT_SPENT: this.transpoSetup_Amount,
          MOT: this.itemtranspoSetup.name,
          CLIENT_ID: this.itemclientName.code,
          date_: this.transpoSetup_Date,
        };
        this.transpoSetup_Data.push(addData);
        this.transpoSetup_EditData = "";
        this.transpoSetup_Data.splice(this.setIndex, 1);

        this.transpoSetup_Data.sort(function (a, b) {
          return a.id - b.id;
        });

        this.clear_expenseType();
        this.clear_transpo();
        this.attemptTdInsert = false;
        this.addAlert(
          "Success",
          "Transportation details added successfully!",
          "true"
        );
      } else {
        this.addAlert("Failed", "Please complete required fields!", "false");
      }
    },

    edit_transpoSetup(index) {
      this.isButton = false;
      const transpoSetup_Data = this.transpoSetup_Data[index];
      this.transpoSetup_EditData = transpoSetup_Data;
      this.setIndex = index;

      // console.log(transpoSetup_Data);

      this.itemclientName = {
        code: transpoSetup_Data.CLIENT_ID,
        name: transpoSetup_Data.CLIENT_NAME,
      };

      this.itemtranspoSetup = {
        code: transpoSetup_Data.MOT,
        name: transpoSetup_Data.MOT,
      };

      this.transpoSetup_Amount = transpoSetup_Data.AMT_SPENT;
      this.transpoSetup_From = transpoSetup_Data.DESTINATION_FRM;
      this.transpoSetup_to = transpoSetup_Data.DESTINATION_TO;
      this.transpoSetup_Remarks = transpoSetup_Data.DESCRIPTION;
      this.transpoSetup_Date = transpoSetup_Data.date_;

      // console.log(index)
    },

    trash_transpoSetup(index) {
      this.transpoSetup_Data.splice(index, 1);
      // console.log(index)
    },

    setButton() {
      this.isButton = true;
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
      // console.log(this.realAmount);

      // put caret back in the right position
      var updated_len = input_val.length;
      caret_pos = updated_len - original_len + caret_pos;
      input[0].setSelectionRange(caret_pos, caret_pos);
    },

    // The Attachments
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

      // console.log(this.removedAttachedFilesId);
    },

    // End Attachments

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

    // Amount aldrin script

    formatNumber(n) {
      // format number 1000000 to 1,234,567
      return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    formatCurrencyExpense(input, blur) {
      // appends $ to value, validates decimal side
      // and puts cursor back in right position.

      // get input value
      let input_val = this.expenseType_Amount;

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
      this.expenseType_Amount = input_val;
      input.target.value = input_val;

      let realAmount = input_val;
      if (realAmount.indexOf(",") !== -1) {
        realAmount = realAmount.replace(/,/g, "");
      }
      this.expenseType_RealAmount = realAmount;
      // console.log(this.expenseType_RealAmount);

      // put caret back in the right position
      let updated_len = input_val.length;
      caret_pos = updated_len - original_len + caret_pos;
      input.target.setSelectionRange(caret_pos, caret_pos);
    },

    formatCurrencyTranspo(input, blur) {
      // appends $ to value, validates decimal side
      // and puts cursor back in right position.

      // get input value
      let input_val = this.transpoSetup_Amount;

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
      this.transpoSetup_Amount = input_val;
      input.target.value = input_val;

      let realAmount = input_val;
      if (realAmount.indexOf(",") !== -1) {
        realAmount = realAmount.replace(/,/g, "");
      }
      this.transpoSetup_RealAmount = realAmount;
      // console.log(this.transpoSetup_RealAmount);

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
