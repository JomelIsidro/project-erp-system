<template>
  <div class="col-md-12 mt-3">
    <!-- Form Element sizes -->
    <div class="card card-secondary">
      <div
        class="overlay"
        style="background-color: white !important"
        v-show="isLoadingSpinner"
      >
        <loading-spinner></loading-spinner>
      </div>
      <div class="card-header">
        <h3 class="card-title">Sales Order</h3>
      </div>
      <div class="card-body">
        <!-- <card-spinner :show="isLoadingSpinner"></card-spinner> -->
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
          <div class="progressbar" :class="classG">
            <span :class="classG">7</span>
          </div>
        </div>

        <div class="d-flex text-center">
          <div class="textbar" :class="classA">
            <small
              ><span :class="classA" class="font-weight-bold"
                >SO Classification</span
              ></small
            >
          </div>
          <div class="textbar" :class="classB">
            <small
              ><span :class="classB" class="font-weight-bold"
                >Customer Details</span
              ></small
            >
          </div>
          <div class="textbar" :class="classC">
            <small
              ><span :class="classC" class="font-weight-bold"
                >Project Details</span
              ></small
            >
          </div>
          <div class="textbar" :class="classD">
            <small
              ><span :class="classD" class="font-weight-bold"
                >Payment & Delivery Details</span
              ></small
            >
          </div>
          <div class="textbar" :class="classE">
            <small
              ><span :class="classE" class="font-weight-bold"
                >System & Document Details</span
              ></small
            >
          </div>
          <div class="textbar" :class="classF">
            <small
              ><span :class="classF" class="font-weight-bold"
                >Attachments</span
              ></small
            >
          </div>
          <div class="textbar" :class="classG">
            <small
              ><span :class="classG" class="font-weight-bold"
                >Form Review
              </span></small
            >
          </div>
        </div>
        <!-- / Step Numbers -->

        <!-- Main Form -->

        <!-- SOF Type -->
        <aside v-if="this.counter === 0">
          <div class="row mt-3">
            <div class="col-md-3"></div>

            <div class="col-md-6">
              <div class="form-group">
                <small><label for="softype">Select SOF Type</label></small>

                <model-list-select
                  :list="sof"
                  v-model="sofType"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px; background-color: #e9ecef"
                  :isDisabled="true"
                >
                </model-list-select>

              </div>
            </div>

            <div class="col-md-3"></div>
          </div>
        </aside>
        <!-- /.SOF Type -->

        <!-- Customer Details -->
        <aside v-if="this.counter === 1">
          <div class="row mt-3">
            <div class="col-md-6">
              <div class="form-group">
                <small><label for="customername">Customer Name</label></small>
                <model-list-select
                  :list="customerName"
                  v-model="customerNameItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px; background-color: #e9ecef"
                  :isDisabled="true"
                >
                </model-list-select>

              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <small><label for="contactperson">Contact Person</label></small>
                <model-list-select
                  :list="contactPerson"
                  v-model="contactPersonItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px; background-color: #e9ecef"
                  :isDisabled="true"
                >
                </model-list-select>

              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <small
                  ><label for="projectshorttext">Contact Number</label></small
                >
                <model-list-select
                  :list="contactNumber"
                  v-model="contactNumberItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px; background-color: #e9ecef"
                  :isDisabled="true"
                >
                </model-list-select>

              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <small
                  ><label for="deliveryaddress">Delivery Address</label></small
                >
                <model-list-select
                  :list="deliveryAddress"
                  v-model="deliveryAddressItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px; background-color: #e9ecef"
                  :isDisabled="true"
                >
                </model-list-select>

              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <small
                  ><label for="billingaddress">Billing Address</label></small
                >
                <model-list-select
                  :list="billingAddress"
                  v-model="billingAddressItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px; background-color: #e9ecef"
                  :isDisabled="true"
                >
                </model-list-select>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <small><label for="softype">Account Manager</label></small>

                <input
                  type="text"
                  disabled
                  v-model.trim="accountManager"
                  class="form-control py-3 form-control-sm"
                />
 
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <small><label for="softype">Delegates</label></small>
                <input
                  type="text"
                  disabled
                  v-model.trim="delegates"
                  class="form-control py-3 form-control-sm"
                />

              </div>
            </div>
          </div>
        </aside>
        <!-- /.Customer Details -->

        <!-- Project Details -->
        <aside v-if="this.counter === 2">
          <div class="row mt-3">
            <div class="col-md-3">
              <div class="form-group">
                <small><label for="ponumber">Customer PO Number</label></small>
                <input
                  type="text"
                  class="form-control form-control-sm py-3"
                  v-model.trim="poNumber"
                  :disabled="true"
                />

              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label for="podate">Customer PO Date</label></small>
                <date-picker
                  v-model="poDate"
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px border:red;"
                  :disabled="true"
                ></date-picker>

              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <small><label for="projectstart">Project Start</label></small>
                <date-picker
                  v-if="
                    this.sofType.code === 'DMO' || this.sofType.code === 'POC'
                  "
                  v-model="projectStart"
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px border:red;"
                  disabled
                ></date-picker>

                <date-picker
                  v-else
                  v-model="projectStart"
                  :disabled="true"
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px border:red;"
                ></date-picker>

              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label for="projectend"> Project End</label></small>
                <date-picker
                  v-if="
                    this.sofType.code === 'DMO' || this.sofType.code === 'POC'
                  "
                  v-model="projectEnd"
                  valueType="format"
                  disabled
                  style="display: block; width: 100%; line-height: 20px border:red;"
                ></date-picker>

                <date-picker
                  v-else
                  v-model="projectEnd"
                  valueType="format"
                  disabled
                  style="display: block; width: 100%; line-height: 20px border:red;"
                ></date-picker>

              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <small
                  ><label for="projectshorttext"
                    >Project Short Text</label
                  ></small
                >
                <input
                  disabled
                  type="text"
                  v-model.trim="projectShortText"
                  class="form-control py-3 form-control-sm"
                />

              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <small><label for="projectname">Project Name</label></small>
                <input
                  type="text"
                  v-model.trim="projectName"
                  disabled
                  class="form-control py-3 form-control-sm"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <small><label for="softype">Coordinator</label></small>

                <model-list-select
                  :list="coordinator"
                  v-model="coordinatorItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px; background-color: #e9ecef"
                  :isDisabled="true"
                >
                </model-list-select>


              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <small><label for="projectcode">Project Code</label></small>
                <input
                  disabled
                  type="text"
                  v-model.trim="projectCode"
                  class="form-control py-3 form-control-sm"
                />

              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <small><label for="scopeofwork">Scope of Work</label></small>
                <textarea
                  class="form-control"
                  name="scopeofwork"
                  v-model.trim="scopeOfWork"
                  rows="5"
                  disabled
                ></textarea>

              </div>
            </div>
          </div>
        </aside>
        <!-- /.Project Details -->

        <!-- Payment & Delivery Details -->
        <aside v-if="this.counter === 3">
          <div class="row mt-3">
            <div class="col-md-3">
              <div class="form-group">
                <small><label for="paymentterms">Payment Terms</label></small>
                <input
                  v-model.trim="paymentTerms"
                  type="text"
                  class="form-control py-3 form-control-sm"
                  disabled
                />

              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label for="warranty">Warranty</label></small>
                <input
                  type="text"
                  class="form-control py-3 form-control-sm"
                  v-model.trim="warranty"
                  disabled
                />


              </div>
            </div>

            <div class="col-md-3">
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

            <div class="col-md-3">
              <div class="form-group">
                <small><label for="projectcost"> Project Cost</label></small>
                <input
                  type="text"
                  @keyup="formatCurrency($event)"
                  @blur="formatCurrency($event, 'blur')"
                  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                  class="form-control form-control-sm py-3"
                  id="projectCost"
                  v-model="projectCost"
                  :disabled="true"
                />

              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <small
                  ><label for="softype">Down Payment Required</label></small
                >
                <model-list-select
                  :list="downPaymentRequired"
                  v-model="downPaymentRequiredItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px; background-color: #e9ecef"
                  :isDisabled="true"
                >
                </model-list-select>

              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label>Down Payment Percentage</label></small>
                <input
                  type="number"
                  v-model.trim="downPaymentPercentage"
                  :disabled="true"
                  class="form-control py-3 form-control-sm"
                />

              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label>Down Payment Date Received</label></small>
                <date-picker
                  v-model="downPaymentDateReceived"
                  valueType="format"
                  :disabled="true"
                  style="display: block; width: 100%; line-height: 20px border:red;"
                ></date-picker>

              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label for="softype">Invoice Number</label></small>
                <input
                  type="text"
                  disabled
                  v-model="invoiceNumber"
                  class="form-control py-3 form-control-sm"
                />

              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <small><label for="softype">Invoice Required</label></small>
                <model-list-select
                  :list="invoiceRequired"
                  v-model="invoiceRequiredItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px; background-color: #e9ecef"
                  :isDisabled="true"
                >
                </model-list-select>

              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label for="softype">Invoice Date Needed</label></small>
                <date-picker
                  v-model="invoiceDateNeeded"
                  :disabled="true"
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px border:red;"
                ></date-picker>

              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small
                  ><label for="softype">Sales Invoice Released</label></small
                >
                <model-list-select
                  :list="salesInvoiceReleased"
                  v-model="salesInvoiceReleasedItem"
                  :isDisabled="true"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px; background-color: #e9ecef"
                
                >
                </model-list-select>

              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label for="softype">Date of Invoice</label></small>
                <date-picker
                  v-model="dateOfInvoice"
                  :disabled="true"
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px border:red;"
                ></date-picker>

              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <small
                  ><label for="accountingremarks"
                    >Accounting Remarks</label
                  ></small
                >
                <textarea
                  class="form-control"
                  name="accountingremarks"
                  v-model.trim="accountingRemarks"
                  disabled
                  rows="5"
                ></textarea>
  
              </div>
            </div>
          </div>
        </aside>
        <!-- /.Payment & Delivery Details -->

        <!-- System & Document Details -->
        <aside v-if="this.counter === 4">
          <div class="row mt-4">
            <div class="col-md-6">
              <div class="d-flex">
                <div class="bg-white">
                  <table
                    class="table table-fixed table-striped table-hover table-sm"
                  >
                    <thead>
                      <tr>
                        <th style="width: 10%"></th>
                        <th style="width: 80%">System Details</th>
                        <th style="width: 10%" class="text-right"></th>
                      </tr>
                    </thead>
                    <tbody style="font-size: 14px">
                      <tr v-for="item in systemDetailsSelected" :key="item.id">
                        <td style="width: 10%"></td>
                        <td style="width: 80%">{{ item.systemType }}</td>
                      </tr>
                    </tbody>
                  </table>


                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="d-flex">
                <div class="bg-white">
                  <table
                    class="table table-fixed table-striped table-hover table-sm"
                  >
                    <thead>
                      <tr>
                        <th style="width: 10%"></th>
                        <th style="width: 80%">Document Details</th>
                        <th style="width: 10%" class="text-right"></th>
                      </tr>
                    </thead>
                    <tbody style="font-size: 14px">
                      <tr
                        v-for="item in documentDetailsSelected"
                        :key="item.ID"
                      >
                        <td style="width: 10%"></td>
                        <td style="width: 80%">{{ item.DocName }}</td>
                      </tr>
                    </tbody>
                  </table>
    
                </div>
              </div>
            </div>
          </div>
        </aside>
        <!-- /.System & Document Details -->

        <!-- Attachments -->
        <aside
          v-if="this.counter === 5"
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
                      <span
                        ><label>{{ file.filename }}</label></span
                      >
                    </div>
                    <!-- New Preview and Download using laravel filepath -->
                    <div>
                      <a class="btn btn-info btn-sm" :href="`http://127.0.0.1:8000/api/downloadFile?filepath=${file.fileDestination}&filename=${file.filename}`" target="_blank">Download</a>
                    </div>
                    <div class="ml-1">
                      <a class="btn btn-secondary btn-sm"  :href="`http://127.0.0.1:8000/${file.filepath}/${file.filename}`" target="_blank">Preview</a>
                    </div>
   
                  </div>
                </div>
              </li>
            </ul>

            <!-- </aside> -->
          </div>
        </aside>
        <!-- /.Attachments -->

        <!-- Form Review -->
        <aside v-if="this.counter === 6">
          <!-- Customer Details Review -->
          <div class="card card-secondary mt-4">
            <div class="card-header">
              <h3 class="card-title">Customer Details</h3>
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
                  <tr class="d-flex">
                    <td class="col-3">SO Classification</td>
                    <td class="col-9">{{ this.sofType.name }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Reference Number</td>
                    <td class="col-9">{{ this.referenceNumber }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Request Date</td>
                    <td class="col-9">{{ this.soDate }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Customer Name</td>
                    <td class="col-9">{{ this.customerNameItem.name }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Contact Person</td>
                    <td class="col-9">{{ this.contactPersonItem.name }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Contact Number</td>
                    <td class="col-9">{{ this.contactNumberItem.name }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Delivery Address</td>
                    <td class="col-9">{{ this.deliveryAddressItem.name }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Billing Address</td>
                    <td class="col-9">{{ this.billingAddressItem.name }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Account Manager</td>
                    <td class="col-9">{{ this.accountManager }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Delegates</td>
                    <td class="col-9">{{ this.delegates }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.Customer Details Review -->

          <!-- Project Details Review -->
          <div class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">Project Details</h3>
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
                  <tr class="d-flex">
                    <td class="col-3">Customer PO Number</td>
                    <td class="col-9">{{ this.poNumber }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Customer PO Date</td>
                    <td class="col-9">{{ this.poDate }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Project Start</td>
                    <td class="col-9">{{ this.projectStart }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Project End</td>
                    <td class="col-9">{{ this.projectEnd }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Project Short Text</td>
                    <td class="col-9">{{ this.projectShortText }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Project Name</td>
                    <td class="col-9">{{ this.projectName }}</td>
                  </tr>

                  <tr class="d-flex">
                    <td class="col-3">Coordinator</td>
                    <td class="col-9">{{ this.coordinatorItem.name }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Project Code</td>
                    <td class="col-9">{{ this.projectCode }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Scope of Work</td>
                    <td class="col-9">{{ this.scopeOfWork }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.Project Details Review -->

          <!-- Payment & Delivery Details Review -->
          <div class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">Payment & Delivery Details</h3>
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
                  <tr class="d-flex">
                    <td class="col-3">Payment Terms</td>
                    <td class="col-9">{{ this.paymentTerms }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Warranty</td>
                    <td class="col-9">{{ this.warranty }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Currency</td>
                    <td class="col-9">{{ this.currencyItem.name }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Project Cost</td>
                    <td class="col-9">{{ this.projectCost }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Down Payment Required</td>
                    <td class="col-9">
                      {{ this.downPaymentRequiredItem.name }}
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Down Payment Percentage</td>
                    <td class="col-9">{{ this.downPaymentPercentage }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Down Payment Date Received</td>
                    <td class="col-9">{{ this.downPaymentDateReceived }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Invoice Number</td>
                    <td class="col-9">{{ this.invoiceNumber }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Invoice Required</td>
                    <td class="col-9">{{ this.invoiceRequiredItem.name }}</td>
                  </tr>

                  <tr class="d-flex">
                    <td class="col-3">Invoice Date Needed</td>
                    <td class="col-9">{{ this.invoiceDateNeeded }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Sales Invoice Released</td>
                    <td class="col-9">
                      {{ this.salesInvoiceReleasedItem.name }}
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Date of Invoice</td>
                    <td class="col-9">{{ this.dateOfInvoice }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Accounting Remarks</td>
                    <td class="col-9">{{ this.accountingRemarks }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.Payment & Delivery Details Review -->

          <!-- System & Document Details Review -->
          <div class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">System & Document Details</h3>
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
                  <tr class="d-flex">
                    <td class="col-3">System Details</td>
                    <td class="col-9">
                      <ul>
                        <li
                          v-for="item in systemDetailsSelected"
                          :key="item.id"
                        >
                          {{ item.systemType }}
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Document Details</td>
                    <td class="col-9">
                      <ul>
                        <li
                          v-for="item in documentDetailsSelected"
                          :key="item.ID"
                        >
                          {{ item.DocName }}
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.System & Document Details Review -->

          <!-- Attachements Review -->
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
                <tbody>
                  <tr class="d-flex">
                    <td class="col-9"><b>Filename</b></td>
                    <td class="col-3"><b>Actions</b></td>
                  </tr>
                  <tr
                    class="d-flex"
                    v-for="file in selectedFile"
                    :key="file.id"
                  >
                    <td class="col-9">{{ file.filename }}</td>
                         <td class="pl-2 pr-2 text-center col-3 d-flex justify-content-center align-items-center">

                      <a class="btn btn-info btn-sm" :href="`http://127.0.0.1:8000/api/downloadFile?filepath=${file.fileDestination}&filename=${file.filename}`" target="_blank">Download</a>
                      <a class="btn btn-secondary btn-sm ml-1"  :href="`http://127.0.0.1:8000/${file.filepath}/${file.filename}`" target="_blank">Preview</a>

                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Attachments Review -->
        </aside>
        <!-- /.Form Review -->

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

                <!-- <div class="row" v-if="isForClarity">
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
                </div> -->

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
                v-show="this.counter > -1 && this.counter < 6"
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
    this.isLoadingSpinner = true;
    await this.querySof();
    await this.queryCompany();
    await this.queryCoordinators();
    await this.querySelectedCoordinator();
    this.isLoadingSpinner = false;
  },
  watch: {
    counter() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },

    async customerNameItem(newValue) {
      if (this.customerNameItem) {
        this.isLoadingSpinner = true;
        const customerId = newValue.code;
        // console.log(newValue)
        await this.queryDelegates(customerId);

        // if condition will clear the payment terms if its dmo or prj
        if (this.sofType.code === "DLV" || this.sofType === "PRJ") {

          if (this.customerNameItem.term === undefined) {
            this.paymentTerms = null;
          } else if (
            this.customerNameItem.term === undefined &&
            this.paymentTerms.length === 0
          ) {
            this.paymentTerms = null;
          } else if (
            this.customerNameItem.term &&
            this.paymentTerms.length === 0
          ) {
            this.paymentTerms = this.customerNameItem.term;
          } else if (this.customerNameItem.term && this.paymentTerms) {
            this.paymentTerms;
          }
        }

        this.accountManager =
          this.customerNameItem.amgr === undefined
            ? null
            : this.customerNameItem.amgr;

        this.isLoadingSpinner = false;
      }
    },



    sofType(newValue) {
      if (newValue.code === "DMO" || newValue.code === "POC") {
        this.paymentTerms = "";
        this.projectStart = null;
        this.projectEnd = null;
        this.warranty = "";
        this.currencyItem = {};
        this.projectCost = "";
        this.downPaymentRequiredItem = { code: false, name: "No" };
        this.downPaymentPercentage = null;
        this.invoiceRequiredItem = { code: false, name: "No" };
        this.invoiceDateNeeded = null;
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
    classD() {
      return { active: this.counter >= 3 };
    },
    classE() {
      return { active: this.counter >= 4 };
    },
    classF() {
      return { active: this.counter >= 5 };
    },
    classG() {
      return { active: this.counter >= 6 };
    },

 



    projectNameFormula() {
      const today = new Date(this.soDate);
      // let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();
      let m = new Date(this.soDate).toLocaleString("en-us", { month: "short" });

      if (mm < 10) {
        mm = `0${mm}`;
      }

      let clientCode =
        this.customerNameItem.desc === undefined
          ? ""
          : this.customerNameItem.desc;
      let sofCode = this.sofType.code === undefined ? "" : this.sofType.code;
      let poNumber = this.poNumber.length > 0 ? this.poNumber : "";
      let projectShortText =
        this.projectShortText.length > 0 ? this.projectShortText : "";

      let todaysDateCode = `${yyyy}${mm}_${m}`;
      let projectName = `${clientCode}-${todaysDateCode}-${sofCode}-${poNumber}-${projectShortText}`;

      return projectName;
    },

    missingModalInputform() {
      return this.modalInputform.length === 0 ? true : false;
    },

    missingCoordinator() {
      return this.coordinatorItem.code === undefined ? true : false;
    }


  },
  data() {
    return {
      todaysDate: null,
      attemptModalSubmit: false,

      isLoadingSpinner: false,
      isLoadingModal: false,
      // need sa query
      // Logged User Data
      loggedUserId: localStorage.getItem("id"),
      loggedUserFirstName: localStorage.getItem("fname"),
      loggedUserLastName: localStorage.getItem("lname"),
      loggedUserFullName: localStorage.getItem("fullName"),
      loggedUserDepartment: localStorage.getItem("department"),
      loggedUserPosition: localStorage.getItem("positionName"),
      companyId: localStorage.getItem("companyId"),
      companyName: localStorage.getItem("companyName"),

      counter: 0,
      // SO Classification
      sof: [
        { code: "DLV", name: "Delivery" },
        { code: "PRJ", name: "Project" },
        { code: "DMO", name: "Demo" },
        { code: "POC", name: "POC" },
      ],
      sofType: {},

      // Customer Details
      customerName: [],
      customerNameItem: {},
      contactPerson: [],
      contactPersonItem: {},
      contactNumber: [],
      contactNumberItem: {},
      deliveryAddress: [],
      deliveryAddressItem: {},
      billingAddress: [],
      billingAddressItem: {},
      accountManager: null,
      delegates: null,

      // Project Details
      soDate: null,
      poNumber: "",
      poDate: null,
      projectStart: null,
      projectEnd: null,
      projectShortText: "",
      projectName: null,
      coordinator: [],
      coordinatorItem: {},
      projectCode: "",
      scopeOfWork: "",

      // Payment & Delivery Details
      paymentTerms: "",
      warranty: "",
      currency: [],
      currencyItem: {},
      projectCost: "",
      projectCostReal: "",
      downPaymentRequired: [
        { code: false, name: "No" },
        { code: true, name: "Yes" },
      ],
      downPaymentRequiredItem: { code: false, name: "No" },
      downPaymentPercentage: "",
      downPaymentDateReceived: null,
      invoiceNumber: "",
      invoiceRequired: [
        { code: false, name: "No" },
        { code: true, name: "Yes" },
      ],
      invoiceRequiredItem: { code: false, name: "No" },
      invoiceDateNeeded: null,
      salesInvoiceReleased: [
        { code: false, name: "No" },
        { code: true, name: "Yes" },
      ],
      salesInvoiceReleasedItem: { code: false, name: "No" },
      dateOfInvoice: null,
      accountingRemarks: "",

      // System & Document Details

      systemDetailsList: [],
      systemDetailsSelected: [],
      documentDetailsList: [],
      documentDetailsSelected: [],

      // The Attachments
      selectedFile: [],
      filespreview: [],



      isLoading: false,
      title: "",
      remarks: "",

      // The Alert
      isAlert: false,
      header: "", // Syccess or Failed
      message: "", // added successfully
      type: "", // true or false

      referenceNumber: '',
      requestDate: null,

      isCoordinatorRequired: false,
      isDmoPocComplete: false,
      isSiConfirmation: false,

    };
  },

  methods: {
    // important methods in approval modal
    setTitle(title) {
      this.title = title;
    },

    closeDefaultModal() {
      this.resetModal();
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
    resetModal() {
      this.attemptClarify = false;
      this.remarks = "";
    },

    //



    close() {
      this.$router.replace("/participants");
    },

    async querySof() {
      try {

        await this.$store.dispatch("sof/querySof", {
          processId: this.$route.params.id,
          frmName: this.$route.params.frmName,
          companyId: this.companyId,
        });

        const data = this.$store.getters["sof/getSofData"];

        // console.warn(data);

        // data[0] - setup prj
        // data[1] - sales order
        // data[2] - systm
        // data[3] - docus
        // data[4] - actual sign
        // data[5] - attachments

        const frmName = data[4]["actual_sign"][0]["FRM_NAME"];
        if (frmName === "Sales Order - Delivery") {
          this.sofType = { code: "DLV", name: "Delivery" };
        } else if (frmName === "Sales Order - Project") {
          this.sofType = { code: "PRJ", name: "Project" };
        } else if (frmName === "Sales Order - Demo") {
          this.sofType = { code: "DMO", name: "Demo" };
        } else if (frmName === "Sales Order - POC") {
          this.sofType = { code: "POC", name: "POC" };
        }

        // console.log(data[0]['setup_project'][0]['Business_Number'])
        // console.log(data[0]['setup_project'][0]['business_fullname'])
        // console.log(data[0]['setup_project'][0]['CLIENTCODE'])
        // console.log(data[0]['setup_project'][0]['term_type'])
        // console.log(data[0]['setup_project'][0]['PMName'])

        // Customer Details
        
        this.projectName = data[1]["sales_orders"][0]["project"];


        const selectedCustomerNameItem = {
          code: data[0]["setup_project"][0]["Business_Number"],
          name: data[0]["setup_project"][0]["business_fullname"],
          desc: data[0]["setup_project"][0]["CLIENTCODE"],
          term: data[0]["setup_project"][0]["term_type"],
          amgr: data[0]["setup_project"][0]["PMName"],
        };

        this.customerNameItem = selectedCustomerNameItem;

        const selectedContactPersonItem = {
          code: data[1]["sales_orders"][0]["Contactid"],
          name: data[1]["sales_orders"][0]["Contact"],
        };

        this.contactPersonItem = selectedContactPersonItem;

        const contactPerson = [];
        contactPerson.push(selectedContactPersonItem);
        this.contactPerson = contactPerson;

        const selectedContactNumberItem = {
          code: data[1]["sales_orders"][0]["ContactNum"],
          name: data[1]["sales_orders"][0]["ContactNum"],
        };

        this.contactNumberItem = selectedContactNumberItem;

        const contactNumber = [];
        contactNumber.push(selectedContactNumberItem);
        this.contactNumber = contactNumber;

        const selectedBillingAddressItem = {
          code: data[1]["sales_orders"][0]["BillTo"],
          name: data[1]["sales_orders"][0]["BillTo"],
        };

        this.billingAddressItem = selectedBillingAddressItem;

        const billingAddress = [];
        billingAddress.push(selectedBillingAddressItem);
        this.billingAddress = billingAddress;

        const selectedDeliveryAddressItem = {
          code: data[1]["sales_orders"][0]["DeliveryAddress"],
          name: data[1]["sales_orders"][0]["DeliveryAddress"],
        };

        this.referenceNumber = data[1]["sales_orders"][0]["soNum"]
        this.requestDate = data[1]["sales_orders"][0]["sodate"]

        this.deliveryAddressItem = selectedDeliveryAddressItem;

        const deliveryAddress = [];
        deliveryAddress.push(selectedDeliveryAddressItem);
        this.deliveryAddress = deliveryAddress;

        // Project Details
        this.poNumber = data[1]["sales_orders"][0]["poNum"];
        this.poDate = data[1]["sales_orders"][0]["podate"];
        this.projectStart = data[0]["setup_project"][0]["project_effectivity"];
        this.projectEnd = data[0]["setup_project"][0]["project_expiry"];
        this.projectShortText =
          data[0]["setup_project"][0]["project_shorttext"];
        this.soDate = data[1]["sales_orders"][0]["sodate"];
        this.projectCode = data[0]["setup_project"][0]["project_no"];
        this.scopeOfWork = data[0]["setup_project"][0]["project_remarks"];

        // Payment & Delivery Details
        this.paymentTerms = data[1]["sales_orders"][0]["Terms"];
        this.warranty = data[1]["sales_orders"][0]["warranty"];

        const selectedCurrencyItem = {
          code: data[1]["sales_orders"][0]["currency"],
          name: data[1]["sales_orders"][0]["currency"],
        };
        this.currencyItem = selectedCurrencyItem;

        const currency = [];
        currency.push(selectedCurrencyItem);
        this.currency = currency;

        this.projectCostReal = data[1]["sales_orders"][0]["amount"];

        this.projectCost = parseFloat(
          data[1]["sales_orders"][0]["amount"]
        ).toLocaleString(undefined, { minimumFractionDigits: 2 });

        if (data[1]["sales_orders"][0]["dp_required"]) {
          this.downPaymentRequiredItem = { code: true, name: "Yes" };
          this.downPaymentPercentage =
            data[1]["sales_orders"][0]["dp_percentage"];
        }

        if (data[1]["sales_orders"][0]["IsInvoiceRequired"]) {
          this.invoiceRequiredItem = { code: true, name: "Yes" };
          this.invoiceDateNeeded = data[1]["sales_orders"][0]["invDate"];
        }

        if (data[1]["sales_orders"][0]["IsInvoiceReleased"]) {
          this.salesInvoiceReleasedItem = { code: true, name: "Yes" };
          this.dateOfInvoice = data[1]["sales_orders"][0]["InvoiceDate"];
        }
    
        this.invoiceNumber = data[1]["sales_orders"][0]["InvoiceNumber"];
        this.accountingRemarks = data[1]["sales_orders"][0]["Remarks2"];

        // sales order docs

        const systemDetails = data[2]["sales_order_system"];
        const systemDetailsSelected = [];

        systemDetails.forEach((element) => {
          const data = {
            id: element["id"],
            imported_from_excel: element["imported_from_excel"],
            soid: element["soid"],
            sysID: element["sysID"],
            systemType: element["systemType"],
          };
          systemDetailsSelected.push(data);
        });

        this.systemDetailsSelected = systemDetailsSelected;

        const documentDetails = data[3]["sales_order_docs"];
        const documentDetailsSelected = [];

        documentDetails.forEach((element) => {
          const data = {
            DocID: element["DocID"],
            DocName: element["DocName"],
            ID: element["ID"],
            SOID: element["SOID"],
            imported_from_excel: element["imported_from_excel"],
          };
          documentDetailsSelected.push(data);
        });

        this.documentDetailsSelected = documentDetailsSelected;

        this.selectedFile = data[5]["attachments"]["data"];


      
      
      
      
      
      // select Coordinator -> check if its required
      // console.log(this.$route.params.frmName)
      if(frmName === 'Sales Order - Project') {
        if(data[4]["actual_sign"][7]['USER_GRP_IND'] === 'SI Confirmation' && data[4]["actual_sign"][7]['STATUS'] === 'In Progress') {
          this.isSiConfirmation = true
        }
      } else if (frmName === 'Sales Order - Delivery') {
        if(data[4]["actual_sign"][5]['USER_GRP_IND'] === 'SI Confirmation' && data[4]["actual_sign"][5]['STATUS'] === 'In Progress') {
          this.isSiConfirmation = true
        }
      }

      
      } catch (error) {
        this.openToast(
          "top-right",
          "error",
          "Internal Server Error! Please inform the administrator!"
        );

        console.error(error);
      }
    },

    submit(type){
      this.attemptNext = true;
      const apptype = type;
      if(this.isSiConfirmation){
        if(this.missingSalesInvoiceReleased || this.missingDateOfInvoice){
          this.openToast(
                "top-right",
                "error",
                "Sales Invoice Realeased & Date of Invoice is Required! Please Select in Step 4!"
              );
        } else {
          this.submitTwo(apptype)
        }
      } else {
        this.submitTwo(apptype)
      }
    },
    

    async submitTwo(type) {
      const fd = new FormData();

      fd.append("form", this.$route.params.frmName);
      fd.append("processId", this.$route.params.id);
      fd.append("frmClass",this.$route.params.frmClass)
      fd.append("remarks", this.remarks);
      fd.append("referenceNumber", this.referenceNumber);
      fd.append("class", "SOF");
      // fd.append("recipientId", this.itemrecipient.code);
      // fd.append("inprogressId", this.inprogressId);
      fd.append("isCoordinatorRequired", this.isCoordinatorRequired);
      fd.append("isDmoPocComplete", this.isDmoPocComplete);
      fd.append("isSiConfirmation", this.isSiConfirmation);
      fd.append("invoiceNumber", this.invoiceNumber);
      fd.append("dateOfInvoice", this.dateOfInvoice);
      fd.append("salesInvoiceReleased", this.salesInvoiceReleasedItem.code);




      if(this.isCoordinatorRequired){
        fd.append("coordinatorID", this.coordinatorItem.code);
        fd.append("coordinatorName", this.coordinatorItem.name);
      }


      fd.append("loggedUserId",this.loggedUserId);
      fd.append("loggedUserFirstName",this.loggedUserFirstName);
      fd.append("loggedUserLastName",this.loggedUserLastName);
      fd.append("loggedUserDepartment",this.loggedUserDepartment);
      fd.append("loggedUserPosition",this.loggedUserPosition);
      fd.append("companyId",this.companyId);
      fd.append("companyName",this.companyName);





      if (type === "Approve") {
        this.isLoadingModal = true;

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
            this.$router.replace("/inputs");
          }

    
        } catch (err) {
          this.isLoadingModal = false;
          if (err.response.status === 422) {
            this.openToast("top-right", "error", err.response.data);
          } else {
            this.openToast("top-right", "error", "Internal Server Error! Please inform the administrator!");
          }
        }


      } else if (type === "Reject") {
        console.log("Reject");
      } else if (type === "Clarify") {
        console.log("Clarify");
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



    async queryCompany() {
      const responseData = await this.$store.dispatch(
        "sof/queryCompany",
        this.companyId
      );
      this.customerName = responseData;
    },

    async queryCoordinators() {
      const responseData = await this.$store.dispatch("sof/queryCoordinators");
      this.coordinator = responseData

    },

    async querySelectedCoordinator() {
      const responseData = await this.$store.dispatch("sof/querySelectedCoordinator",this.$route.params.id);

      if(responseData[0]){
        this.coordinatorItem = responseData[0]
      }else{
        this.coordinatorItem = {};
      }
    },

    async queryDelegates(customerId) {
      const responseData = await this.$store.dispatch(
        "sof/queryDelegates",
        customerId
      );
      // this.delegates = responseData;
      if (responseData.length > 0) {
        this.delegates = responseData[0]["DelegatesName"];
      } else {
        this.delegates = "";
      }
    },

    setModalTitle(title) {
      this.modalTitle = title;
    },

    clearModal() {
      this.attemptModalSubmit = false;
      this.modalInputform = "";
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

    formatNumber(n) {
      // format number 1000000 to 1,234,567
      return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    formatCurrency(input, blur) {
      // appends $ to value, validates decimal side
      // and puts cursor back in right position.

      // get input value
      let input_val = this.projectCost;

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
      this.projectCost = input_val;
      input.target.value = input_val;

      let realAmount = input_val;
      if (realAmount.indexOf(",") !== -1) {
        realAmount = realAmount.replace(/,/g, "");
      }
      this.projectCostReal = realAmount;

      // put caret back in the right position
      let updated_len = input_val.length;
      caret_pos = updated_len - original_len + caret_pos;
      input.target.setSelectionRange(caret_pos, caret_pos);
    },
  },
};
</script>

<style scoped>
tbody {
  display: block;
  max-height: 300px;
  overflow-y: auto;
}
thead,
tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}
thead {
  width: calc(100% - 1em);
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
  line-height: 12px;
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
