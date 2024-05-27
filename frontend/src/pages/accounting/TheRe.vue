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
                  style="display: block; width: 100%; line-height: 20px"
                ></date-picker>
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
                <!-- <input type="text" class="form-control py-3 form-control-sm" id="reportingManager"> -->
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

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <small><label for="projectName">Project Name</label></small>
                <!-- <input type="text" class="form-control py-3 form-control-sm" id="projectName"> -->
                <model-list-select
                  :list="project"
                  v-model="projectItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px"
                >
                </model-list-select>
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
                <textarea
                  class="form-control"
                  name="purpose"
                  id="purpose"
                  v-model.trim="purpose"
                  rows="5"
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
              />
              <small
                class="text-danger p-0 m-0"
                v-if="this.missingPayeeName && attemptNextOne"
                >Payee Name is required!</small
              >
            </div>
            <div class="form-group">
              <small><label for="modeOfPayment">Mode of Payment</label></small>
              <!-- <input type="text" class="form-control form-control-sm" id="modeOfPayment"> -->

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
                  <!-- <input type="text" class="form-control form-control-sm" id="currency"> -->

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
                    @keyup="formatCurrency($event)"
                    @blur="formatCurrency($event, 'blur')"
                    pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                    class="form-control form-control-sm py-3"
                    id="amount"
                    v-model="amount"
                    :disabled="true"
                  />
                  <!-- <small
                    class="text-danger p-0 m-0"
                    v-if="this.missingAmount && attemptNextOne"
                    >Amount is required!</small
                  > -->
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
                <th>
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
                <th scope="col">Action</th>
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
                <td class="pl-0 m-0">
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
                <td colspan="5"></td>
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
                <th>
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
                <th scope="col">Action</th>
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
                <td class="pl-0 m-0">
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
                <td colspan="7"></td>
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
        `  <div
            class="pt-2 col-md-12 rounded uploadContainer"
            @dragover="dragover"
            @dragleave="dragleave"
            @drop="drop"
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

            <label
              for="assetsFieldHandle"
              style="width: 100%; cursor: pointer"
              class="block pt-3 cursor-pointer"
            >
              <span class="text-secondary">Click here or drop file(s)</span>
            </label>

              <ul class="pb-3 text-decoration-none ulUpload" v-cloak>
                <li
                  class="text-sm mt-2"
                  v-for="file in selectedDBFile"
                  :key="file.newFilename"
                >
                  <div class="row d-flex justify-content-center">
                    <div class="col-md-4 d-flex">
                      <div class="col text-left">
                        <span
                          ><label>{{ file.originalFilename ? file.originalFilename : file.filename }}</label></span
                        >
                      </div>

                      <div>
                        <button
                          class="btn btn-danger btn-sm px-13"
                          type="button"
                          @click="removeReAttachments(file.id, selectedDBFile.indexOf(file))"
                          title="Remove file"
                        >
                          Remove
                        </button>
                      </div>
                      <div class="ml-1">
                        <a class="btn btn-info btn-sm" :href="`http://127.0.0.1:8000/api/downloadFile?filepath=${file.fileDestination}&filename=${file.filename}`" target="_blank">Download</a>
                      </div>
                      <div class="ml-1">
                        <a class="btn btn-secondary btn-sm"  :href="`http://127.0.0.1:8000/${file.filepath}/${file.filename}`" target="_blank">Preview</a>
                      </div>

                    </div>
                  </div>
                </li>
              </ul>

              <ul class="pb-3 text-decoration-none ulUpload" v-cloak>
                <li
                  class="text-sm mt-2"
                  v-for="file in selectedFile"
                  :key="file.name"
                >
                  <div class="row d-flex justify-content-center">
                    <div class="col-md-4 d-flex">
                      <div class="col text-left">
                        <span><label>{{ file.name }}</label></span>
                      </div>
                      <div>
                        <button
                          class="btn btn-danger btn-sm px-13"
                          type="button"
                          @click="remove(selectedFile.indexOf(file))"
                          title="Remove file"
                        >
                          Remove
                        </button>
                      </div>
                      <div class="ml-1">
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
          </div>`
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
                    <td style="width: 80%">{{ "RE-" + todaysYear }}</td>
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
                  <tr v-for="file in selectedDBFile" :key="file.id">
                    <td>{{ file.filename }}</td>
                    <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                      <a class="btn btn-info btn-sm" :href="`http://127.0.0.1:8000/api/downloadFile?filepath=${file.fileDestination}&filename=${file.filename}`" target="_blank">Download</a>
                      <a class="btn btn-secondary btn-sm ml-1" :href="`http://127.0.0.1:8000/${file.filepath}/${file.filename}`" target="_blank">Preview</a>
                    </td>
                  </tr>
                  <tr v-for="file in selectedFile" :key="file.filename">
                    <td>{{ file.name }}</td>
                    <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                      <a class="btn btn-danger btn-sm px-13" @click="remove(selectedFile.indexOf(file))">Remove</a>
                      <a class="btn btn-secondary btn-sm ml-1"  @click="preview(selectedFile.indexOf(file))">Preview</a>
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
                        v-if="missingXPDateNeeded && attemptXpSubmit"
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
                        v-if="missingXPClientItem && attemptXpSubmit"
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
                        v-if="missingXPAmount && attemptXpSubmit"
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
                        v-if="missingXPType && attemptXpSubmit"
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
                        v-model.trim="expenseType_Remarks"
                        placeholder="Please input request remarks here!"
                      ></textarea>
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingXPRemarks && attemptXpSubmit"
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
                        v-if="missingTDDateNeeded && attemptTdSubmit"
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
                        v-if="missingTDClientItem && attemptTdSubmit"
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
                        v-if="missingTDMot && attemptTdSubmit"
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
                        v-if="missingTDAmount && attemptTdSubmit"
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
                        id="modalamount"
                        v-model.trim="transpoSetup_From"
                      />
                      <small
                        class="text-danger p-0 m-0"
                        v-if="missingTDFrom && attemptTdSubmit"
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
                        v-if="missingTDTo && attemptTdSubmit"
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
                        v-if="missingTDRemarks && attemptTdSubmit"
                        >Transportation remarks is required!</small
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

        <!-- / Main Form -->

        <!-- Modal Confirmation of saving as draft  -->
        <div
          class="modal fade"
          id="modal-save-as-draft"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div class="modal-dialog">
            <div class="modal-content">

              <div class="modal-header">
                <button
                  type="button"
                  id="modalCloseButton"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  ref="refSaveDraftCloseBtn"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="modal-body">
                <h5 class="text-center"> Are you sure you want to draft the request?</h5>
              </div>
              <div class="modal-footer justify-content-end">
                <button
                  type="button"
                  class="btn btn-secondary btn-sm"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  Close
                </button>

                <button v-show="!isSpinner" type="button" class="btn btn-success btn-sm" @click="saveDraft()">Save</button>

                <div v-show="isSpinner">
                  <button disabled type="button" class="btn btn-success btn-sm" @click="saveDraft()">
                    <div class="spinner-border spinner-border-sm" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                    Saving...
                  </button>
                </div>
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>
        <!-- end of Modal Confirmation of saving as draft  -->

        <!-- Buttons -->
        <div class="row d-flex justify-content-between mt-3 align-items-center flex-nowrap m-1">
            <div>
              <button
                type="button"
                class="btn btn-warning btn-sm"
                data-toggle="modal"
                data-target="#modal-save-as-draft"
              >
                Save as draft
              </button>
            </div>

            <div>
              <button
                v-show="counter"
                type="button"
                @click="counter--"
                class="btn btn-secondary btn-sm"
              >
                Previous
              </button>
          
              <button
                v-if="this.counter <= 4"
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
         
        </div>
        <!-- / Buttons -->
      </div>
    </div>
    <!-- /.card -->
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
  async created() {
    // Request Details
    this.isLoading = true
    await this.getREbyUserID();
    // await this.getProjects();
    // await this.getReportingManager();
    await this.todaysDate();
    // await this.getBusinesses();
    // await this.getexpenseType();
    // await this.gettranspoSetup();

    await this.reInitiate();
    this.isLoading = false

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

    expenseType_totalAmount() {
      this.re_totalAmount();
    },
    transpoSetup_totalAmount() {
      this.re_totalAmount();
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

    // Calendaer
    todaysYear() {
      const today = new Date();
      // const dd = today.getDate();
      // const mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      // const todaysDate = yyyy + "-" + mm + "-" + dd;
      return yyyy;
    },

    // Validation
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
      if (this.payeeName?.length === 0) {
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

    missingAttachments() {
      if (this.selectedFile.length === 0 && this.selectedDBFile.length === 0) {
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
        this.transpoSetup_Data.length > 0 ||
        this.expenseType_Data.length > 0
      ) {
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
  },
  data() {
    return {
      counter: 0,
      setIndex: 0,

      attemptNext: false,
      attemptNextOne: false,
      attemptNextTwo: false,
      attemptNextThree: false,

      attemptXpSubmit: false,
      attemptTdSubmit: false,

      // Request Details
      reportingManager: [],
      reportingManagerItem: {},
      referenceNumber: "",
      requestDate: "",
      project: [],
      projectItem: {},
      dateNeeded: null,
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
      realAmount: "",

      // expense data modal
      modalclient: [],
      itemclientName: {},
      modalExpenseType: [],
      itemmodalExpenseType: {},
      expenseType_Date: null,
      expenseType_Amount: "",
      expenseType_RealAmount: "",
      expenseType_Remarks: "",

      // The Attachments
      selectedFile: [],
      filespreview: [],

      isButton: true,

      // data for expense type
      expenseType_Data: [],
      expenseType_EditData: [],
      i: 0,

      // The Alert
      isAlert: false,
      header: "", // Syccess or Failed
      message: "", // added successfully
      type: "", // true or false

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
      selectedDBFile : [],
      idOfAttachmentsToDelete : [],

      // Logged User Data
      loggedUserId: localStorage.getItem("id"),
      loggedUserFirstName: localStorage.getItem("fname"),
      loggedUserLastName: localStorage.getItem("lname"),
      loggedUserDepartment: localStorage.getItem("department"),
      loggedUserPosition: localStorage.getItem("positionName"),
      companyId: localStorage.getItem("companyId"),
      companyName: localStorage.getItem("companyName"),

      isLoading: false,
      isSpinner: false,

      

    };
  },

  methods: {

    getProjects2(){
      return axios.get(`http://127.0.0.1:8000/api/general-getprojects/${localStorage.getItem("companyId")}`);
    },

    getReportingManager2(){
      return axios.get(`http://127.0.0.1:8000/api/reporting-manager/${localStorage.getItem("id")}`);
    },

    getBusinesses2(){
      return axios.get(`http://127.0.0.1:8000/api/general-businesses/${localStorage.getItem("companyId")}`);
    },

    getexpenseType2(){
      return axios.get(`http://127.0.0.1:8000/api/get-expenseType`);
    },
    gettranspoSetup2(){
      return axios.get(`http://127.0.0.1:8000/api/get-transpoSetup`);
    },

    async reInitiate() {
      await Promise.all([this.getProjects2(), this.getReportingManager2(), this.getBusinesses2(), this.getexpenseType2(), this.gettranspoSetup2()])
      .then((results) => {
        const projects = results[0];
        const managers = results[1];
        const businesses = results[2];
        const expenses = results[3];
        const transpo = results[4];

      let project = [];
      for (const key in projects.data) {
        const request = {
          code: projects.data[key].project_id,
          name: projects.data[key].project_name,
        };
        project.push(request);
      }
      this.project = project;

      const reportingManager = [];
      for (const key in managers.data) {
        const request = {
          code: managers.data[key].RMID,
          name: managers.data[key].RMName,
        };
        reportingManager.push(request);
      }
      this.reportingManager = reportingManager;


      const client = [];
      for (const key in businesses.data) {
        const request = {
          code: businesses.data[key].businessNumber,
          name: businesses.data[key].businessName,
        };
        client.push(request);
      }
      this.modalclient = client;

      const modalExpenseType = [];
      for (const key in expenses.data[0]) {
        const request = {
          code: expenses.data[0][key].type,
          name: expenses.data[0][key].type,
        };
        modalExpenseType.push(request);
      }
      this.modalExpenseType = modalExpenseType;

      const transpoSetup = [];
      for (const key in transpo.data[0]) {
        const request = {
          code: transpo.data[0][key].MODE,
          name: transpo.data[0][key].MODE,
        };
        transpoSetup.push(request);
      }
      this.transpoSetup = transpoSetup;
      



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












    re_totalAmount() {
      let xp_totalAmt = 0;
      let td_totalAmt = 0;

      if (this.expenseType_totalAmount === 0) {
        xp_totalAmt = 0;
      } else {
        xp_totalAmt = parseFloat(this.expenseType_totalAmount.replace(/,/g, ""))
      }

      if (this.transpoSetup_totalAmount === 0) {
        td_totalAmt = 0;
      } else {
        td_totalAmt = parseFloat(this.transpoSetup_totalAmount.replace(/,/g, ""))
      }

      const float_total = xp_totalAmt + td_totalAmt;

      const string_total = float_total.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      });

      this.changeAmount(string_total, float_total);
    },

    changeAmount(amount, realAmount) {
      this.amount = amount;
      this.realAmount = realAmount;
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

    // step by step validation
    next() {
      if (this.counter === 0) {
        this.attemptNext = true;
      } else if (this.counter === 1) {
        this.attemptNext = false;
        this.attemptNextOne = true;
      } else if (this.counter === 2) {
        // console.log("expense details");
      } else if (this.counter === 3) {
        this.attemptNextOne = false;
        this.attemptNextTwo = true;
        // attachments
      } else if (this.counter === 4) {
        this.attemptNextTwo = false;
        this.attemptNextThree = true;
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
          !this.missingCurrency
          // !this.missingAmount
        ) {
          this.counter++;
        }
        // Expense Details
      } else if (counter === 2) {
        this.counter++;
        // Transpo Details
      } else if (counter === 3) {
        if (this.missingExpenses) {
          this.counter++;
        } else {
          this.openToast(
            "top-right",
            "warning",
            "Please provide your expenses!"
          );
        }
      } else if (counter === 4) {
        if (!this.missingAttachments) {
          this.counter++;
        } else {
          this.openToast(
            "top-right",
            "warning",
            "Please provide an attachments!"
          );
        }
      }
    },

    setButton() {
      this.isButton = true;
    },

    closeModal() {
      this.clear_expenseType();
      this.clear_transpo();
      this.resetAlert();
      this.attemptXpInsert = false;
      this.attemptTdInsert = false;
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

    async getREbyUserID() {
      const response = await fetch(
        `http://127.0.0.1:8000/api/getREbyUserID/${this.loggedUserId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const responseData = await response.json();
      
      if(responseData.length >= 1) {
        // console.log(responseData);
        this.dateNeeded = responseData[0].TRANS_DATE
        this.purpose = responseData[0].DESCRIPTION
        this.payeeName = responseData[0].PAYEE

        const reportingManager = {
          code: responseData[0].reportingManagerID,
          name: responseData[0].REPORTING_MANAGER
        };
        const project = {
          code: responseData[0].PRJID,
          name: responseData[0].PROJECT
        };

        this.reportingManagerItem = reportingManager
        this.projectItem = project

        this.getReExpenseByREID(responseData[0]['id'])
        this.getReTranspoByREID(responseData[0]['id'])
        this.getREAttachmentsByREQID(responseData[0]['id'])
      }
    },

    async getReExpenseByREID(reid) {
      const response = await fetch(
        `http://127.0.0.1:8000/api/get-ReExpense/${reid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const responseData = await response.json();
      if(responseData.length >= 1) {
        // console.log(responseData);
        this.expenseType_Data = responseData
      }
    },

    async getReTranspoByREID(reid) {
      const response = await fetch(
        `http://127.0.0.1:8000/api/get-ReTranspo/${reid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const responseData = await response.json();
      if(responseData.length >= 1) {
        // console.log(responseData);
        this.transpoSetup_Data = responseData
      }
    },

    async getREAttachmentsByREQID(reqid) {
      const response = await fetch(
        `http://127.0.0.1:8000/api/getReGeneralAttachmentsByReqid/${reqid}/${this.loggedUserId}`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const responseData = await response.json();
      if(responseData.length >= 1) {
        // console.log(responseData);
        this.selectedDBFile = responseData
      }
    },

    removeReAttachments(id, i) {
      console.log(id);
      this.selectedDBFile.splice(i, 1);
      this.idOfAttachmentsToDelete.push(id)
      // console.log(this.idOfAttachmentsToDelete);
    },

    async saveDraft() {
      this.isLoading = true;
      this.isSpinner = true;
      this.$refs.refSaveDraftCloseBtn.click()

      const fd = new FormData();
      for (let i = 0; i < this.selectedFile.length; i++) {
        fd.append("file[]", this.selectedFile[i]);
      }

      fd.append("reportingManagerId", this.reportingManagerItem.code);
      fd.append("reportingManagerName", this.reportingManagerItem.name);
      fd.append("projectName", this.projectItem.name);
      fd.append("projectId", this.projectItem.code);
      fd.append("dateNeeded", this.dateNeeded);
      fd.append("clientName", this.clientName);
      fd.append("clientId", this.clientId);
      fd.append("mainId", this.mainId);
      fd.append("purpose", this.purpose);

      fd.append("payeeName", this.payeeName);
      fd.append("amount", this.amount);
      fd.append("MOP", this.modeOfPaymentItem.name);
      fd.append("currency", this.currencyItem.name);
      fd.append("class", "RE");
      fd.append("form", "Reimbursement Request");

      fd.append("loggedUserId", this.loggedUserId);
      fd.append("loggedUserFirstName", this.loggedUserFirstName);
      fd.append("loggedUserLastName", this.loggedUserLastName);
      fd.append("loggedUserDepartment", this.loggedUserDepartment);
      fd.append("loggedUserPosition", this.loggedUserPosition);
      fd.append("companyId", this.companyId);
      fd.append("companyName", this.companyName);

      fd.append("expenseType_Data", JSON.stringify(this.expenseType_Data));
      fd.append("transpoSetup_Data", JSON.stringify(this.transpoSetup_Data));
      fd.append("idOfAttachmentsToDelete", JSON.stringify(this.idOfAttachmentsToDelete));

      try {
        const resp = await axios.post(
          "http://127.0.0.1:8000/api/saveDraftRe",
          fd
        );

        if (resp.status >= 200) {
          this.isLoading = false;
          this.openToast("top-right", "success", resp.data.message);
          this.$router.replace("/dashboard");
        }

        // console.log(resp.data);
        this.isSpinner = false;
      } catch (err) {
        this.isSpinner = false;
        console.error(err);
          this.isLoading = false;
          this.openToast(
            "top-right",
            "error",
            "Please Contact the administrator! and try again later"
          );
      }
    },

    async submit() {
      this.isLoading = true;
      const fd = new FormData();

      for (let i = 0; i < this.selectedFile.length; i++) {
        fd.append("file[]", this.selectedFile[i]);
      }

      // console.log(this.reportingManagerItem.code)
      // console.log(this.reportingManagerItem.name)
      // // console.log(this.referenceNumber)
      // console.log(this.requestDate)
      // console.log(this.projectItem.name)
      // console.log(this.projectItem.code)
      // console.log(this.dateNeeded)
      // console.log(this.clientName)
      // console.log(this.clientId)
      // console.log(this.mainId)
      // console.log(this.purpose)

      // console.log(this.payeeName)
      // console.log(this.amount)
      // console.log(this.modeOfPaymentItem.name)
      // console.log(this.currencyItem.name)

      // console.log(loggedUserId)
      // console.log(loggedUserFirstName)
      // console.log(loggedUserLastName)
      // console.log(loggedUserDepartment)
      // console.log(loggedUserPosition)
      // console.log(companyId)
      // console.log(companyName)

      fd.append("reportingManagerId", this.reportingManagerItem.code);
      fd.append("reportingManagerName", this.reportingManagerItem.name);
      // fd.append("",this.referenceNumber)
      // fd.append("",this.requestDate)
      fd.append("projectName", this.projectItem.name);
      fd.append("projectId", this.projectItem.code);
      fd.append("dateNeeded", this.dateNeeded);
      fd.append("clientName", this.clientName);
      fd.append("clientId", this.clientId);
      fd.append("mainId", this.mainId);
      fd.append("purpose", this.purpose);

      fd.append("payeeName", this.payeeName);
      fd.append("amount", this.amount);
      fd.append("MOP", this.modeOfPaymentItem.name);
      fd.append("currency", this.currencyItem.name);
      fd.append("class", "RE");
      fd.append("form", "Reimbursement Request");


      
      

      fd.append("loggedUserId", this.loggedUserId);
      fd.append("loggedUserFirstName", this.loggedUserFirstName);
      fd.append("loggedUserLastName", this.loggedUserLastName);
      fd.append("loggedUserDepartment", this.loggedUserDepartment);
      fd.append("loggedUserPosition", this.loggedUserPosition);
      fd.append("companyId", this.companyId);
      fd.append("companyName", this.companyName);

      fd.append("expenseType_Data", JSON.stringify(this.expenseType_Data));
      fd.append("transpoSetup_Data", JSON.stringify(this.transpoSetup_Data));

      fd.append("idOfAttachmentsToDelete", JSON.stringify(this.idOfAttachmentsToDelete));



      try {
        const resp = await axios.post(
          "http://127.0.0.1:8000/api/saveRe",
          fd
        );

        if (resp.status >= 200 && resp.status <= 399) {
          this.isLoading = false;
          this.openToast("top-right", "success", resp.data.message);
          this.$router.replace("/inprogress");
        }

        console.log(resp.data);
      } catch (err) {
        // Handle Error Here
        console.error(err);
          this.isLoading = false;
          this.openToast(
            "top-right",
            "error",
            "Please Contact the administrator! and try again later"
          );
      }










      // axios
      //   .post("http://127.0.0.1:8000/api/saveRe", fd)
      //   .then((res) => {
      //     // handle success
      //     // console.log(res.data.message)
      //     this.isLoading = false;

      //     if (res.status === 200) {
      //       this.openToast("top-right", "success", res.data.message);
      //       this.$router.replace("/inprogress");
      //     }

      //     if (res.status === 202) {
      //       // console.log(res)
      //       this.openToast("top-right", "error", res.data.message);
      //     }
      //   })
      //   .catch((error) => {
      //     // handle error
      //     console.log(error.data);
      //     this.isLoading = false;
      //     this.openToast(
      //       "top-right",
      //       "error",
      //       "Please Contact the administrator! and try again later"
      //     );
      //   })
      //   .then(() => {
      //     // always executed
      //   });
    },

    insert_transpoSetup() {
      this.attemptTdSubmit = true;
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
        this.attemptTdSubmit = false;
        this.addAlert("Success", "Expense details added successfully!", "true");
      } else {
        this.addAlert("Failed", "Please complete required fields!", "false");
      }

      // console.log(this.transpoSetup_Data);
    },

    update_transpoSetup() {
      this.attemptTdSubmit = true;
      const validated = this.validate_Transpo();
      this.resetAlert();

      if (validated) {
        const addData = {
          id: this.transpoSetup_Data.id,
          CLIENT_NAME: this.itemclientName.name,
          DESTINATION_FRM: this.transpoSetup_From,
          DESTINATION_TO: this.transpoSetup_to,
          DESCRIPTION: this.transpoSetup_Remarks,
          AMT_SPENT: this.transpoSetup_Amount,
          MOT: this.itemtranspoSetup.name,
          CLIENT_ID: this.itemclientName.code,
          date_: this.transpoSetup_Date,
        };

        this.transpoSetup_Data.splice(this.setIndex, 1);
        this.transpoSetup_Data.push(addData);
        this.transpoSetup_EditData = "";

        this.transpoSetup_Data.sort(function (a, b) {
          return a.id - b.id;
        });
        this.clear_expenseType();
        this.clear_transpo();
        this.attemptTdSubmit = false;
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

      console.log(transpoSetup_Data);

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

    insert_ExpenseType() {
      // when close false
      this.attemptXpSubmit = true;
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
        this.expenseType_Data.push(addData);
        this.clear_expenseType();
        this.attemptXpSubmit = false;

        this.addAlert("Success", "Expense details added successfully!", "true");
      } else {
        this.addAlert("Failed", "Please complete required fields!", "false");
      }
    },

    update_ExpenseType() {
      // when close false
      this.attemptXpSubmit = true;
      const validated = this.validate_expenseType();
      this.resetAlert();

      if (validated) {
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
        this.attemptXpSubmit = false;

        this.addAlert("Success", "Expense details added successfully!", "true");
      } else {
        this.addAlert("Failed", "Please complete required fields!", "false");
      }
    },

    edit_ExpenseType(index) {
      this.isButton = false;
      const expenseType_Data = this.expenseType_Data[index];
      this.expenseType_EditData = expenseType_Data;
      this.setIndex = index;

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
      this.requestDate = todaysDate;
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

    async getBusinesses() {
      const response = await fetch(
        "http://127.0.0.1:8000/api/general-businesses/1",
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

    async getProjects() {
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
      this.project = project;
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

    async getReportingManager() {
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

    // The Attachments
    onFileSelected(event) {
      let selectedFiles = event.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.selectedFile.push(selectedFiles[i]);
      }
      this.filePreview();

      console.log(this.selectedFile);
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
      console.log(this.realAmount);

      // put caret back in the right position
      let updated_len = input_val.length;
      caret_pos = updated_len - original_len + caret_pos;
      input.target.setSelectionRange(caret_pos, caret_pos);
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
      console.log(this.expenseType_RealAmount);

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

.uploadContainer {
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
.px-13 {
  padding-left: 13px;
  padding-right: 13px;
}
</style>
