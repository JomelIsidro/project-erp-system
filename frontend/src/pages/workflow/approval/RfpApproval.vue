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
        <!-- /. Step Numbers -->

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

        <!-- Liquidation -->
        <div class="row mt-4" v-if="this.counter === setLiq">
          <!-- Editable / CRUD Liquidation -->
          <table
            class="table table-sm table-bordered table-striped mx-2"
            v-if="isInitiator"
          >
            <thead>
              <tr>
                <th colspan="7" scope="col">
                  <aside class="d-flex align-items-center">
                    <span class="mb-1 ml-1"> Liquidation Table</span>
                  </aside>
                </th>
                <th>
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
                <th scope="col">Action</th>
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
                <td class="pl-0 m-0">
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
                  <b>Total Amousnt: {{ this.totalAmount }}</b>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Read only Liquidation -->
          <table
            class="table table-sm table-bordered table-striped mx-2"
            v-else
          >
            <thead>
              <tr>
                <th colspan="7" scope="col">
                  <aside class="d-flex align-items-center">
                    <span class="mb-1 ml-1"> Liquidation Table</span>
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
                <td>
                  {{
                    parseFloat(item.Amount).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })
                  }}
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
              type="file"
              multiple
              name="fields[assetsFieldHandle][]"
              id="assetsFieldHandle"
              class="w-25 h-25 overflow-hidden"
              @change="onFileSelected"
              ref="file"
              accept=".pdf,.jpg,.jpeg,.png"
              v-if="isInitiator"
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
                  <div class="row d-flex justify-content-center ">
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
                  v-for="file in selectedFileLiquidation"
                  :key="file.index"
                >
                  <div class="row d-flex justify-content-center">
                    <div class="col-md-4 d-flex">
                      <div class="col text-left">
                        <span><label>{{ file.name }}</label></span>
                      </div>
                      <div v-if="isInitiator">
                        <button
                          class="btn btn-danger btn-sm"
                          type="button"
                          @click="
                            removeFileLiquidation(
                              selectedFileLiquidation.indexOf(file)
                            )
                          "
                          title="Remove file"
                        >
                          Remove
                        </button>
                      </div>
                      <div class="ml-1">
                        <button
                          class="btn btn-secondary btn-sm"
                          @click="
                            filePreviewLiquidation(
                              selectedFileLiquidation.indexOf(file)
                            )
                          "
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
                    <!-- <th style="width: 10%">Action</th> -->
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
                    <td>
                      {{
                        parseFloat(item.Amount).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })
                      }}
                    </td>
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
                    <th style="width: 15%">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(file, index) in selectedFile" :key="file.id">
                    <td>{{ file.filename }}</td>
                    <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                      <aside class="d-flex align-items-center justify-content-end">
                      <a class="btn btn-info btn-sm" :href="`http://127.0.0.1:8000/api/downloadFile?filepath=${file.fileDestination}&filename=${file.filename}`" target="_blank">Download</a>
                      
                      <button class="btn btn-danger btn-sm ml-1" v-if="isInitiator"
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


                      <!-- <button
                        class="btn btn-secondary btn-sm ml-1"
                        @click="preview(file.mimeType, file.imageBytes)"
                      >
                        Previews
                      </button> -->
                    </td>
                  </tr>

                  <tr v-for="file in selectedFileLiquidation" :key="file.index">
                    <td>{{ file.name }}</td>
                    <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                      <aside class="d-flex align-items-center justify-content-end">
                      
              
                      
                      <button
                        @click="
                          removeFileLiquidation(
                            selectedFileLiquidation.indexOf(file)
                          )
                        "
                        class="btn btn-danger btn-sm"
                      >
                        Remove
                      </button>

                      

                      <button
                        class="btn btn-secondary btn-sm ml-1"
                        @click="
                          filePreviewLiquidation(
                            selectedFileLiquidation.indexOf(file)
                          )
                        "
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
          <aside class="col-lg-6 d-flex justify-content-start align-items-center flex-nowrap ">

        
              <button
              v-show="counter"
                type="button"
                @click="counter--"
                class="btn mr-2 btn-secondary btn-sm"
              >
                Previous
              </button>

            <!-- liquidation is false -->
  
              <button
              v-show="!isLiquidation"
              v-if="this.counter <= 2"
                type="button"
                @click="counter++"
                class="btn mr-2 btn-primary btn-sm"
              >
                Next
              </button>
        

            <!-- liquidation is true -->
   
              <button
                v-show="isLiquidation"
                v-if="this.counter <= 3"
                type="button"
                @click="next()"
                class="btn mr-2 btn-primary btn-sm"
              >
                Next
              </button>



          </aside>

          <aside class="col-lg-6 d-flex justify-content-end align-items-center flex-nowrap">
         
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
              v-if="!isInitiator"
                type="button"
                class="btn  btn-danger ml-2 btn-sm"
                data-toggle="modal"
                data-target="#modal-default"
                @click="setTitle('Reject')"
              >
                Reject
              </button>
  

         
              <button
              v-if="!isInitiator"
                type="button"
                class="btn  btn-warning ml-2 btn-sm"
                data-toggle="modal"
                data-target="#modal-default"
                @click="setTitle('Clarify')"
              >
                Clarify
              </button>
       


              <button
                type="button"
                class="btn  btn-danger ml-2 btn-sm"
                @click="close()"
              >
                Close
              </button>
     

            <!-- <button @click="test()">test</button> -->
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
              v-show="!isInitiator"
            >
              Submit
            </button>

              <!-- Submit button for initiator in liquidation -->
            <button
              type="button"
              v-show="isInitiator === true && isLiquidation === true"
              class="btn btn-primary btn-sm"
              @click="submit('SubmitInitiator')"
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

    <!-- Modal Liquidation-->
    <div
      class="modal fade"
      id="modal-liquidation"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
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
                    @keyup="formatCurrency($event)"
                    @blur="formatCurrency($event, 'blur')"
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
                    v-model.trim="modalremarks"
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

    // show recipient if button clicked is clarify
    isForClarity() {
      if (this.title === "Clarify") {
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

    missingModalRecipient() {
      if (this.itemrecipient.code === undefined) {
        return true;
      } else {
        return false;
      }
    },

    // Sum of all amount spend in liquidation
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
  },
  data() {
    return {
      counter: 0,
      setIndex: "",
      attemptInsert: false,
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

      // The Attachments
      selectedFile: [],
      filespreview: "",

      // Modal
      remarks: "",
      title: "",

      // The Alert
      isAlert: false,
      header: "", // Syccess or Failed
      message: "", // added successfully
      type: "", // true or false

      isLoading: false,
      isLoadingModal: false,
      processId: this.$route.params.id,
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

      // Check if its for liquidation
      isInitiator: false,
      isLiquidation: false,


      // newly attached files in liquidation
      selectedFileLiquidation: [],
      filespreviewLiquidation: "",

      removedAttachedFilesId: [],

      // use for client
      i: 0,

      liquidation: [],
      editliquidation: [],
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

      isButton: true,

      // dropdown for recipient of clarity
      recipent: [],
      itemrecipient: {},

      // Liquidation total amount
      totalAmt: 0,

      // Inprogress Id use for clarification
      inprogressId: "",
    };
  },

  async created() {
    this.isLoading = true
    await this.getActualSign(this.processId, this.form, this.companyId);
    await this.getRfpMain(this.processId);
    await this.getRfpDetails(this.processId);
    await this.getAttachments(this.processId, this.form);
    await this.getRecipient(
      this.processId,
      this.loggedUserId,
      this.companyId,
      this.form
    );
    await this.getInprogressId(this.processId, this.companyId, this.form);
    await this.getBusinesses(this.companyId);
    await this.getcurrencyName();
    await this.getexpenseType();
    this.isLoading = false

  },

  watch: {
    // Liquidation total amount
    liquidation(newValue) {
      let x = 0;
      for (const key in newValue) {
        x += parseInt(newValue[key].amount);
      }
      this.totalAmt = x;
    },

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
      // this.getRfpApproval(this.$route.params.id, this.form);
      this.isLoading = true

      this.counter = 0;
      this.withdrawRemarks = "";
      console.warn(newRoute);

      // this.$route.params.id
      // this.$route.params.frmName
      // this.$route.params.frmClass
      // this.$route.params.workflow


      await this.getActualSign(this.$route.params.id, this.$route.params.frmName, this.companyId);
      await this.getRfpMain(this.$route.params.id);
      await this.getRfpDetails(this.$route.params.id);
      await this.getAttachments(this.$route.params.id, this.$route.params.frmName);
      await this.getRecipient(
        this.$route.params.id,
        this.loggedUserId,
        this.companyId,
        this.$route.params.frmName
      );
      await this.getInprogressId(this.$route.params.id, this.companyId, this.$route.params.frmName);
      await this.getBusinesses(this.companyId);
      await this.getcurrencyName();
      await this.getexpenseType();
            this.isLoading = false
    },
  },

  methods: {
    // test(){
    //   console.log(this.liquidation)
    // },

    closeDefaultModal() {
      this.attemptClarify = false;
      this.remarks = "";
      this.itemrecipient = {};
      this.resetAlert();
    },
    next() {
      if (this.isInitiator) {
        if (this.counter <= 1) {
          this.counter++;
        } else if (this.counter === 2) {
          if (this.liquidation.length > 0) {
            this.counter++;
          } else {
            this.openToast(
              "top-right",
              "warning",
              "Please provide your liquidation!"
            );
          }
        } else if (this.counter === 3) {
          if (this.selectedFile.length || this.selectedFileLiquidation.length) {
            this.counter++;
          } else {
            this.openToast(
              "top-right",
              "warning",
              "Please provide an attachments!"
            );
          }
        }
      } else {
        this.counter++;
      }
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
          // start
          const fd = new FormData();

          fd.append("form", this.form);
          fd.append("processId", this.$route.params.id);
          fd.append("loggedUserId", this.loggedUserId);
          fd.append("companyId", this.companyId);
          fd.append("recipientId", this.itemrecipient.code);
          fd.append("remarks", this.remarks);
          fd.append("inprogressId", this.inprogressId);
          fd.append("loggedUserFullname", this.loggedUserFullName);

          axios
            .post("http://127.0.0.1:8000/api/send-clarity", fd)
            .then((res) => {
              // handle success
              document.getElementById("modalCloseButton").click();
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

          // end
        } else {
          this.isLoadingModal = false;
          this.addAlert("Failed", "Please select recipent!", "false");
        }
      }

      // liqudidation
      if (type === "SubmitInitiator") {

        
        console.log(this.selectedFile.length );
        console.log(this.selectedFileLiquidation.length);
        console.log(this.liquidation.length);

        if ((this.selectedFile.length || this.selectedFileLiquidation.length) && this.liquidation.length) {
        const fd = new FormData();

        for (let i = 0; i < this.selectedFileLiquidation.length; i++) {
          fd.append("file[]", this.selectedFileLiquidation[i]);
        }

        fd.append("processId", this.$route.params.id);
        fd.append("companyId", this.companyId);
        fd.append("loggedUserId", this.loggedUserId);
        fd.append("remarks", this.remarks);
        fd.append("reference", this.referenceNumber);
        fd.append("form", this.form);

        fd.append("liquidation", JSON.stringify(this.liquidation));
        fd.append("removedFiles", JSON.stringify(this.removedAttachedFilesId));
        fd.append("class", "RFP");


          try {
          const res = await axios.post(
            "http://127.0.0.1:8000/api/rfpLiquidation",
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
          }
        } catch (err) {
          // Handle Error Here
          console.error(err);
          this.isLoadingModal = false;
          this.openToast("top-right", "error", err);

        }

        } else {
        this.isLoadingModal = false;
        this.addAlert("Failed", "Please complete required fields!", "false");
        }



        // console.log(this.$route.params.id)




        // axios
        //   .post("http://127.0.0.1:8000/api/rfpLiquidation", fd)
        //   .then((res) => {
        //     // handle success

        //     this.isLoadingModal = false;
        //     document.getElementById("modalCloseButton").click();

        //     console.log(res);
        //     this.openToast("top-right", "success", res.data.message);
        //     this.$router.replace("/approvals");
        //   })
        //   .catch((error) => {
        //     // handle error
        //     console.log(error);
        //     this.isLoadingModal = false;
        //     document.getElementById("modalCloseButton").click();
        //     this.openToast("top-right", "error", error);
        //   })
        //   .then(function () {
        //     // always executed
        //   });
      }
    },
    close() {
      this.$router.replace("/approvals");
    },

    validateModalDefault() {
      if (!this.missingModalRecipient === true) {
        return true;
      } else {
        return false;
      }
    },

    // getRfpApproval(id, form, companyId, loggedUserId) {
    //   this.isLoading = true;
    //   let showRfpMain = `http://127.0.0.1:8000/api/rfp-main/${id}`;
    //   let showRfpDetail = `http://127.0.0.1:8000/api/rfp-main-detail/${id}`;
    //   let showRfpAttachments = `http://127.0.0.1:8000/api/getRfpAttachments/${id}/${form}`;
    //   let showActualSign = `http://127.0.0.1:8000/api/general-actual-sign/${id}/${form}/${companyId}`;
    //   let showLiquidation = `http://127.0.0.1:8000/api/rfp-main-liquidation/${id}`;
    //   let showRecipient = `http://127.0.0.1:8000/api/getRecipient/${id}/${loggedUserId}/${companyId}/${form}`;
    //   let showInprogressId = `http://127.0.0.1:8000/api/get-Inprogress/${id}/${companyId}/${form}`;

    //   const requestOne = axios.get(showRfpMain);
    //   const requestTwo = axios.get(showRfpDetail);
    //   const requestThree = axios.get(showRfpAttachments);
    //   const requestFour = axios.get(showActualSign);
    //   const requestFive = axios.get(showLiquidation);
    //   const requestSix = axios.get(showRecipient);
    //   const requestSeven = axios.get(showInprogressId);

    //   axios
    //     .all([
    //       requestOne,
    //       requestTwo,
    //       requestThree.catch(() => null),
    //       requestFour,
    //       requestFive.catch(() => null),
    //       requestSix,
    //       requestSeven.catch(() => null),
    //     ])

    //     .then(
    //       axios.spread((...responses) => {
    //         const responseOne = responses[0];
    //         const responseTwo = responses[1];
    //         const responesThree = responses[2];
    //         const responesFour = responses[3];
    //         const responesFive = responses[4];
    //         const responesSix = responses[5];
    //         const responesSeven = responses[6];

    //         // showRfpMain - responseOne
    //         this.referenceNumber = responseOne.data.data.REQREF;
    //         this.requestDate = responseOne.data.data.DATE;
    //         this.dateNeeded = responseOne.data.data.Deadline;
    //         this.reportingManager = responseOne.data.data.REPORTING_MANAGER;
    //         // this.amount = responseOne.data.data.AMOUNT;
    //         this.amount = parseFloat(
    //           responseOne.data.data.AMOUNT
    //         ).toLocaleString(undefined, { minimumFractionDigits: 2 });

    //         this.uid = responseOne.data.data.UID;

    //         if (responseOne.data.data.UID === this.loggedUserId) {
    //           this.isInitiator = true;
    //           this.counter = 2;
    //         } else {
    //           this.isInitiator = false;
    //         }

    //         // showRfpDetail - responseTwo
    //         this.projectName = responseTwo.data.data.PROJECT;
    //         this.clientName = responseTwo.data.data.CLIENTNAME;
    //         this.purpose = responseTwo.data.data.PURPOSED;
    //         this.payeeName = responseTwo.data.data.PAYEE;
    //         this.currency = responseTwo.data.data.CURRENCY;
    //         this.modeOfPayment = responseTwo.data.data.MOP;

    //         // showRfpAttachments - responesThree
    //         this.selectedFile = responesThree.data.data;
    //         // console.log(this.selectedFile);

    //         //showActualSign - responesFour
    //         if (responesFour.data[2].STATUS === "Completed") {
    //           console.log("liquidation is true");
    //           // console.log(responesFour.data)
    //           this.isLiquidation = true;
    //         } else {
    //           // alert('false')
    //           console.log("liquidation is false");
    //           this.isLiquidation = false;
    //         }
    //         // showLiquidation - responesFive
    //         // console.log(responesFive.data.length);
    //         if (responesFive) {
    //           this.liquidation = responesFive.data;
    //         }

    //         // showRecipient - responseSix
    //         const recipient = [];
    //         for (const key in responesSix.data) {
    //           const request = {
    //             code: responesSix.data[key].uid,
    //             name: responesSix.data[key].name,
    //           };

    //           recipient.push(request);
    //         }

    //         this.recipent = recipient;

    //         // showInprogressId - responesSeven
    //         this.inprogressId = responesSeven.data[0].inpId;
    //       })
    //     )
    //     .catch((errors) => {
    //       // react on errors.
    //       console.log(errors);
    //     })
    //     .then(() => {
    //       this.isLoading = false;
    //     });
    // },

    async getRfpMain(id) {
      // this.isLoading = true;
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/rfp-main/${id}`
        );

        if (resp.status === 200) {
          // this.isLoading = false;
          this.reportingManager = resp.data.data.REPORTING_MANAGER;

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
            this.counter = 2;
          }
        }
      } catch (err) {
        // this.isLoading = false;
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

          // const currencyItem = {
          //   code: resp.data.data.CURRENCY,
          //   name: resp.data.data.CURRENCY,
          // };
          // this.currencyItem = currencyItem;

          // const modeOfPaymentItem = {
          //   code: resp.data.data.MOP,
          //   name: resp.data.data.MOP,
          // };
          // this.modeOfPaymentItem = modeOfPaymentItem;

          // const projectItem = {
          //   code: resp.data.data.PROJECTID,
          //   name: resp.data.data.PROJECT,
          // };
          // this.projectItem = projectItem;

          this.currency = resp.data.data.CURRENCY;
          this.modeOfPayment = resp.data.data.MOP;
          this.projectName = resp.data.data.PROJECT;
        }
      } catch (err) {
        // this.isLoading = false;
        // Handle Error Here
        console.error(err);
      }
    },

    async getAttachments(id, form) {
      // this.isLoading = true;

      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/getRfpAttachments/${id}/${form}`
        );
        // console.log(resp.data);

        // showReportingManager - responesSix
        this.selectedFile = resp.data.data;
      } catch (err) {
        // this.isLoading = false;

        // Handle Error Here
        console.error(err);
      }
    },

    async getActualSign(id, form, companyId) {
      // this.isLoading = true;
      let apiRes = null;
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/general-actual-sign/${id}/${form}/${companyId}`
        );

        console.log(resp.status);
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
            this.isLiquidation = false;

            // when not yet liquidated form review will show
            this.counter = 3
          }
        }
      } catch (err) {
        // this.isLoading = false;
        apiRes = err.response;
        // Handle Error Here
        console.error(err);
      } finally {
        console.log(apiRes); // Could be success or error
      }
    },

    async getLiquidation(id) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/rfp-main-liquidation/${id}`
        );
        // console.log(resp.data);
        this.liquidation = resp.data;
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    async getRecipient(id, loggedUserId, companyId, form) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/getRecipient/${id}/${loggedUserId}/${companyId}/${form}`
        );
        // console.log(resp.data);
        // this.liquidation = resp.data;
        const recipient = [];
        for (const key in resp.data) {
          const request = {
            code: resp.data[key].uid,
            name: resp.data[key].name,
          };
          recipient.push(request);
        }
        this.recipent = recipient;
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
        // this.liquidation = resp.data;
        this.inprogressId = resp.data[0].inpId;
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
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

    update() {
      this.isLoadingModal = true;
      this.attemptInsert = true;
      this.resetAlert();
      const validated = this.validateEmptyFields();
      if (validated) {
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
      this.modalremarks = selectedLiquidation.description;
    },

    setButton() {
      this.isButton = true;
    },

    trash(index) {
      this.liquidation.splice(index, 1);
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

    insert() {
      this.isLoadingModal = true;
      this.attemptInsert = true;
      this.resetAlert();
      const validated = this.validateEmptyFields();

      if (validated) {
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
      } else {
        this.isLoadingModal = false;
        this.addAlert("Failed", "Please complete required fields!", "false");
      }
    },

    closeModal() {
      this.resetModal();
      this.resetAlert();
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

    // The Attachments
    // preview(mimeType, imageBytes) {
    //   if (mimeType === 'image/jpeg' || mimeType === 'image/png') 
    //   {
    //     var newTab = window.open();
    //     newTab.document.body.innerHTML = `<img src="data:${mimeType};base64,${imageBytes}" resizable=yes, style="max-width: 100%; height: auto; ">`;
    //   }

    //   else if (mimeType === 'application/pdf')
    //   {
    //     let pdfWindow = window.open('#')
    //     pdfWindow.document.write(`<iframe width='100%' height='100%' src='data:${mimeType};base64, ` +encodeURI(imageBytes) + "'></iframe>")
    //   }
    
    // },

    onFileSelected(event) {
      let selectedFiles = event.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.selectedFileLiquidation.push(selectedFiles[i]);
      }
      this.setFilePreviewLiquidation();
    },

    onInputChange(event) {
      let selectedFiles = event.dataTransfer.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.selectedFileLiquidation.push(selectedFiles[i]);
      }
      this.setFilePreviewLiquidation();
    },

    filePreviewLiquidation(i) {
      // console.log(i)
      const url = this.filespreviewLiquidation[i].link;
      window.open(url, "_blank", "resizable=yes");
    },

    setFilePreviewLiquidation() {
      let files = this.selectedFileLiquidation;
      const fileContainer = [];
      for (let i = 0; i < files.length; i++) {
        let tmppath = URL.createObjectURL(files[i]);
        const thisFiles = {
          link: tmppath,
        };
        fileContainer.push(thisFiles);
      }
      this.filespreviewLiquidation = fileContainer;
    },

    removeFileLiquidation(i) {
      this.selectedFileLiquidation.splice(i, 1);
      this.setFilePreviewLiquidation();
    },

    removeAttachedFile(index, id, filename, filepath) {
      const attachmentId = { id: id, filename: filename, filepath: filepath };
      this.removedAttachedFilesId.push(attachmentId);
      this.selectedFile.splice(index, 1);
      this.setFilePreviewLiquidation();

      console.log(this.removedAttachedFilesId);
      console.log(this.selectedFile);
      console.log(this.filespreviewLiquidation);
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

    formatNumber(n) {
      // format number 1000000 to 1,234,567
      return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    formatCurrency(input, blur) {
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
      console.log(this.modalRealamount);

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
