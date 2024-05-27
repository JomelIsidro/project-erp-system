<template>
  <div class="col-md-12 mt-3">
    <!-- Form Element sizes -->
    <div class="card card-secondary">
      <div class="card-header">
        <h3 class="card-title">{{this.paymentTerms}}</h3>
      </div>
      <div class="card-body">
        <card-spinner :show="isLoadingSpinner"></card-spinner>

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
                  style="padding: 9px"
                >
                </model-list-select>
                <small
                  class="text-danger p-0 m-0"
                  v-show="missingSOFType && attemptNext"
                  >SOF Type is required!</small
                >
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
                  style="padding: 9px"
                >
                </model-list-select>
                <small
                  class="text-danger p-0 m-0"
                  v-show="missingCustomerName && attemptNextOne"
                  >Customer Name is required!</small
                >
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
                  style="padding: 9px"
                >
                </model-list-select>
                <small
                  class="text-danger p-0 m-0"
                  v-show="missingContactPerson && attemptNextOne"
                  >Contact Person is required!</small
                >
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
                  style="padding: 9px"
                >
                </model-list-select>
                <small
                  class="text-danger p-0 m-0"
                  v-show="missingContactNumber && attemptNextOne"
                  >Contact Number is required!</small
                >
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
                  style="padding: 9px"
                >
                </model-list-select>
                <small
                  class="text-danger p-0 m-0"
                  v-show="missingDeliveryAddress && attemptNextOne"
                  >Delivery Address is required!</small
                >
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
                  style="padding: 9px"
                >
                </model-list-select>
                <small
                  class="text-danger p-0 m-0"
                  v-show="missingBillingAddress && attemptNextOne"
                  >Billing Address is required!</small
                >
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
                <!-- <small class="text-danger p-0 m-0" v-show="true"
                  >Account Manager is required!</small
                > -->
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <small><label for="softype">Delegates</label></small>
                <input
                  type="number"
                  disabled
                  v-model.trim="delegates"
                  class="form-control py-3 form-control-sm"
                />
                <!-- <small class="text-danger p-0 m-0" v-show="true"
                  >Delegates is required!</small
                > -->
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
                />
                <small
                  class="text-danger p-0 m-0"
                  v-show="attemptNextTwo && missingPONumber"
                  >Customer PO Number is required!</small
                >
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label for="podate">Customer PO Date</label></small>
                <date-picker
                  v-model="poDate"
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px border:red;"
                ></date-picker>
                <small
                  class="text-danger p-0 m-0"
                  v-show="attemptNextTwo && missingPODate"
                  >Customer PO Date is required!</small
                >
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
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px border:red;"
                ></date-picker>
                <small
                  class="text-danger p-0 m-0"
                  v-show="attemptNextTwo && missingProjectStart"
                  >Project Start is required!</small
                >
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
                  style="display: block; width: 100%; line-height: 20px border:red;"
                ></date-picker>
                <small
                  class="text-danger p-0 m-0"
                  v-show="attemptNextTwo && missingProjectEnd"
                  >Project End is required!</small
                >
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
                  type="text"
                  v-model.trim="projectShortText"
                  class="form-control py-3 form-control-sm"
                />
                <small
                  class="text-danger p-0 m-0"
                  v-show="attemptNextTwo && missingProjectShortText"
                  >Project Short Text is required!</small
                >
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <small><label for="projectname">Project Name</label></small>
                <input
                  type="text"
                  v-model.trim="projectNameFormula"
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
                  disabled="true"
                  :isDisabled="true"
                >
                </model-list-select>

                <!-- <small class="text-danger p-0 m-0" v-show="true"
                  >Coordinator is required!</small
                > -->
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <small><label for="projectcode">Project Code</label></small>
                <input
                  list="suggestions"
                  type="text"
                  v-model.trim="projectCode"
                  class="form-control py-3 form-control-sm"
                />
                <datalist id="suggestions">
                  <option
                    v-for="item in projectCodeDataList"
                    :key="item.project_no"
                  >
                    {{ item.project_no }}
                  </option>
                </datalist>

                <small
                  class="text-danger p-0 m-0"
                  v-show="attemptNextTwo && missingProjectCode"
                  >Project Code is required!</small
                >
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
                ></textarea>
                <small
                  class="text-danger p-0 m-0"
                  v-show="attemptNextTwo && missingScopeOfWork"
                  >Scope of Work is required!</small
                >
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
                  :disabled="
                    this.sofType.code === 'DMO' || this.sofType.code === 'POC'
                  "
                />
                <small
                  class="text-danger p-0 m-0"
                  v-show="attemptNextThree && missingPaymentTerms"
                  >Payment Terms is required!</small
                >
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label for="warranty">Warranty</label></small>
                <input
                  type="text"
                  class="form-control py-3 form-control-sm"
                  v-model.trim="warranty"
                  :disabled="
                    this.sofType.code === 'DMO' || this.sofType.code === 'POC'
                  "
                />

                <small
                  class="text-danger p-0 m-0"
                  v-show="attemptNextThree && missingWarranty"
                  >Warranty is required!</small
                >
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
                  :style="isDropdownRequired"
                  :isDisabled="
                    this.sofType.code === 'DMO' || this.sofType.code === 'POC'
                  "
                >
                </model-list-select>
                <small
                  class="text-danger p-0 m-0"
                  v-show="attemptNextThree && missingCurrency"
                  >Currency is required!</small
                >
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
                  :disabled="
                    this.sofType.code === 'DMO' || this.sofType.code === 'POC'
                  "
                />
                <small
                  class="text-danger p-0 m-0"
                  v-show="attemptNextThree && missingProjectCost"
                  >Project Cost is required!</small
                >
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
                  :style="isDropdownRequired"
                  :isDisabled="
                    this.sofType.code === 'DMO' || this.sofType.code === 'POC'
                  "
                >
                </model-list-select>
                <small
                  class="text-danger p-0 m-0"
                  v-show="attemptNextThree && missingDownPaymentRequired"
                  >Down Payment is required!</small
                >
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label>Down Payment Percentage</label></small>
                <input
                  type="number"
                  v-model.trim="downPaymentPercentage"
                  :disabled="this.downPaymentRequiredItem.code === false"
                  class="form-control py-3 form-control-sm"
                />
                <div class="d-flex flex-column">
                  <small
                    class="text-danger p-0 m-0"
                    v-show="attemptNextThree && missingDownPaymentPercentage"
                    >Down Payment Percentage is required!
                  </small>

                  <small
                    class="text-danger p-0 m-0"
                    v-show="attemptNextThree && dpValitade"
                    >Down Payment Percentage must be 1% - 100%
                  </small>
                </div>
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
                <!-- <small class="text-danger p-0 m-0" v-show="attemptNextThree && "
                  >Down Payment Date Received is required!</small
                > -->
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label for="softype">Invoice Number</label></small>
                <input
                  type="text"
                  v-model="invoiceNumber"
                  disabled
                  class="form-control py-3 form-control-sm"
                />
                <!-- <small class="text-danger p-0 m-0" v-show="attemptNextThree && "
                  >Invouce Number is required!</small
                > -->
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
                  :style="isDropdownRequired"
                  :isDisabled="
                    this.sofType.code === 'DMO' || this.sofType.code === 'POC'
                  "
                >
                </model-list-select>
                <small
                  class="text-danger p-0 m-0"
                  v-show="attemptNextThree && missingInvoiceRequired"
                  >Invoice Required is required!</small
                >
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <small><label for="softype">Invoice Date Needed</label></small>
                <date-picker
                  v-model="invoiceDateNeeded"
                  :disabled="this.invoiceRequiredItem.code === false"
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px border:red;"
                ></date-picker>
                <small
                  class="text-danger p-0 m-0"
                  v-show="attemptNextThree && missingInvoiceDateNeeded"
                  >Invoice Date Needed is required!</small
                >
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
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="padding: 9px; background-color: #e9ecef"
                  disabled="true"
                  :isDisabled="true"
                >
                </model-list-select>
                <!-- <small class="text-danger p-0 m-0" v-show="true"
                  >Sales Invoice Released is required!</small
                > -->
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
                <!-- <small class="text-danger p-0 m-0" v-show="true"
                  >Date of Invoice is required!</small
                > -->
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
                  rows="5"
                ></textarea>
                <!-- <small class="text-danger p-0 m-0" v-show="true"
                  >Accounting Remarks is required!</small
                > -->
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
                        <th style="width: 10%" class="text-right">
                          <button
                            class="btn btn-success btn-sm"
                            data-toggle="modal"
                            data-target="#modal-default"
                            @click="setModalTitle('System')"
                          >
                            <i class="fas fa-plus"></i>
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody style="font-size: 14px">
                      <tr v-for="item in systemDetailsList" :key="item.id">
                        <td style="width: 10%">
                          <input
                            type="checkbox"
                            :value="item"
                            class="ml-3 mr-0"
                            v-model="systemDetailsSelected"
                          />
                        </td>
                        <td style="width: 80%">{{ item.type_name }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <small
                    class="text-danger p-0 m-0"
                    v-show="attemptNextFour && missingSystemDetails"
                    >System Details is required!</small
                  >
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
                        <th style="width: 10%" class="text-right">
                          <button
                            class="btn btn-success btn-sm"
                            data-toggle="modal"
                            data-target="#modal-default"
                            @click="setModalTitle('Document')"
                          >
                            <i class="fas fa-plus"></i>
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody style="font-size: 14px">
                      <tr v-for="item in documentDetailsList" :key="item.id">
                        <td style="width: 10%">
                          <input
                            type="checkbox"
                            :value="item"
                            class="ml-3 mr-0"
                            v-model="documentDetailsSelected"
                          />
                        </td>
                        <td style="width: 80%">{{ item.DocumentName }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <small
                    class="text-danger p-0 m-0"
                    v-show="attemptNextFour && missingDocumentDetails"
                    >Document Details is required!</small
                  >
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
            />

            <label
              for="assetsFieldHandle"
              style="width: 100%; cursor: pointer"
              class="block pt-3 cursor-pointer"
            >
              <span class="text-secondary">Click here or drop file(s)</span>
            </label>
            <small
              class="text-danger p-0 m-0"
              v-show="missingAttachments && attemptNextFive"
              >Attachments is required!</small
            >

            <ul class="pb-3 text-decoration-none ulUpload" v-cloak>
              <li
                class="text-sm mt-2"
                v-for="file in selectedFile"
                :key="file.name"
              >
                <div class="row d-flex justify-content-center">
                  <div class="col-md-4 d-flex">
                    <div class="col text-left">
                      <span>{{ file.name }}</span>
                    </div>
                    <div class="co-2">
                      <button
                        class="btn btn-danger btn-sm"
                        type="button"
                        @click="remove(selectedFile.indexOf(file))"
                        title="Remove file"
                      >
                        Remove
                      </button>
                    </div>
                    <div class="col-2">
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
                    <td class="col-9">{{ `SOF-${this.todaysYear}` }}</td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Request Date</td>
                    <td class="col-9">{{ this.todaysDate }}</td>
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
                    <td class="col-9">{{ this.projectNameFormula }}</td>
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
                          {{ item.type_name }}
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
                          {{ item.DocumentName }}
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
                    <td class="col-9"><b>Filename</b></td>
                    <td class="col-3"><b>Actions</b></td>
                  </tr>
                  <tr
                    class="d-flex"
                    v-for="file in selectedFile"
                    :key="file.name"
                  >
                    <td class="col-9">{{ file.name }}</td>
                    <td class="pl-2 pr-2 text-center col-3">
                      <button
                        @click="remove(selectedFile.indexOf(file))"
                        class="btn btn-danger btn-sm"
                      >
                        Remove
                      </button>
                      <button
                        @click="preview(selectedFile.indexOf(file))"
                        class="btn btn-secondary btn-sm ml-1"
                      >
                        Preview
                      </button>
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

        <!-- Modal default-->
        <div
          class="modal fade"
          id="modal-default"
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
                  <b>Add {{ this.modalTitle }} Details</b>
                </h6>
                <button
                  type="button"
                  id="modalCloseButton"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="clearModal()"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <!-- Start -->

                <div class="form-group">
                  <small
                    ><label for="accountingremarks"
                      >{{ this.modalTitle }} Name</label
                    ></small
                  >
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    v-model.trim="modalInputform"
                  />

                  <small
                    class="text-danger p-0 m-0"
                    v-show="attemptModalSubmit && missingModalInputform"
                    >{{ this.modalTitle }} Name is required!</small
                  >
                </div>
                <!-- End -->
              </div>
              <div class="modal-footer justify-content-end">
                <button
                  type="button"
                  class="btn btn-success btn-sm"
                  @click="validateModal()"
                >
                  Submit
                </button>
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>
        <!-- /.modal default -->

        <!-- Button -->
        <div class="row d-flex justify-content-end mt-3">
          <div class="col-md-1" v-show="counter">
            <button
              type="button"
              @click="counter--"
              class="btn btn-block btn-secondary btn-sm"
            >
              Previous
            </button>
          </div>
          <div class="col-md-1" v-if="this.counter > -1 && this.counter < 6">
            <button
              type="button"
              @click="next()"
              class="btn btn-block btn-primary btn-sm"
            >
              Next
            </button>
            <button @click="test()">test</button>

          </div>

          <div class="col-md-1" v-else>
            <button
              type="button"
              @click="submit()"
              class="btn btn-block btn-success btn-sm"
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
    await this.queryCompanySystemDetails();
    await this.queryCompanyDocumentDetails();
    await this.queryCurrency();
    this.isLoadingSpinner = false;
  },
  watch: {
    async customerNameItem(newValue) {
      if (this.customerNameItem) {
        this.isLoadingSpinner = true;
        const customerId = newValue.code;
        // console.log(newValue)
        await this.queryCompanyAddress(customerId);
        await this.queryCompanyContacts(customerId);
        await this.queryCompanyCode(customerId);

        // if condition will clear the payment terms if its dmo or prj
        if (this.sofType.code === "DLV" || this.sofType === "PRJ") {
          // this.paymentTerms =
          //   this.customerNameItem.term === undefined
          //     ? null
          //     : this.customerNameItem.term;

            if(this.customerNameItem.term === undefined){
              this.paymentTerms = null
            } else if (this.customerNameItem.term === undefined && this.paymentTerms.length === 0) {
              this.paymentTerms = null
            } else if (this.customerNameItem.term && this.paymentTerms.length === 0) {
              this.paymentTerms = this.customerNameItem.term
            } else if (this.customerNameItem.term && this.paymentTerms) {
              this.paymentTerms
            }

            






        }

        this.accountManager =
          this.customerNameItem.amgr === undefined
            ? null
            : this.customerNameItem.amgr;

        this.isLoadingSpinner = false;
      }
    },

    downPaymentRequiredItem(newValue) {
      this.downPaymentPercentage = "";
      // (this.downPaymentRequiredItem) ? this.downPaymentDateReceived = null : this.downPaymentDateReceived = null;
    },
    invoiceRequiredItem(newValue) {
      this.invoiceDateNeeded = null;
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

    todaysYear() {
      const today = new Date();
      const yyyy = today.getFullYear();
      return yyyy;
    },

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
      return todaysDate;
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

    isDropdownRequired() {
      if (this.sofType.code === "DMO" || this.sofType.code === "POC") {
        return "padding: 9px; background-color: #e9ecef";
      } else {
        return "padding: 9px";
      }
    },

    missingSOFType() {
      return this.sofType.code === undefined ? true : false;
    },

    // Customer Details

    missingCustomerName() {
      return this.customerNameItem.code === undefined ? true : false;
    },

    missingContactPerson() {
      return this.contactPersonItem.code === undefined ? true : false;
    },

    missingContactNumber() {
      return this.contactNumberItem.code === undefined ? true : false;
    },

    missingDeliveryAddress() {
      return this.deliveryAddressItem.code === undefined ? true : false;
    },

    missingBillingAddress() {
      return this.billingAddressItem.code === undefined ? true : false;
    },

    // Project Details

    missingPONumber() {
      return this.poNumber.length === 0 ? true : false;
    },

    missingPODate() {
      return this.poDate === null ? true : false;
    },

    missingProjectStart() {
      if (this.sofType.code === "DLV" || this.sofType === "PRJ") {
        return this.projectStart === null ? true : false;
      } else {
        return false;
      }
    },

    missingProjectEnd() {
      if (this.sofType.code === "DLV" || this.sofType === "PRJ") {
        return this.projectEnd === null ? true : false;
      }
    },

    missingProjectShortText() {
      return this.projectShortText.length === 0 ? true : false;
    },

    missingProjectCode() {
      return this.projectCode.length === 0 ? true : false;
    },

    missingScopeOfWork() {
      return this.scopeOfWork.length === 0 ? true : false;
    },

    // Payment & Delivery Details

    missingPaymentTerms() {
      if (this.sofType.code === "DLV" || this.sofType === "PRJ") {
        return this.paymentTerms.length === 0 ? true : false;
      }
    },

    missingWarranty() {
      if (this.sofType.code === "DLV" || this.sofType === "PRJ") {
        return this.warranty.length === 0 ? true : false;
      }
    },

    missingCurrency() {
      if (this.sofType.code === "DLV" || this.sofType === "PRJ") {
        return this.currencyItem.code === undefined ? true : false;
      }
    },

    missingProjectCost() {
      if (this.sofType.code === "DLV" || this.sofType === "PRJ") {
        return this.projectCost.length === 0 || parseFloat(this.projectCost) < 1
          ? true
          : false;
      }
    },

    missingDownPaymentRequired() {
      return this.downPaymentRequiredItem.code === undefined ? true : false;
    },

    missingDownPaymentPercentage() {
      if (this.downPaymentRequiredItem.code === true) {
        return this.downPaymentPercentage.length < 1 ||
          parseFloat(this.downPaymentPercentage) < 1
          ? true
          : false;
      } else {
        return false;
      }
    },
    dpValitade() {
      if (this.downPaymentRequiredItem.code === true) {
        return parseInt(this.downPaymentPercentage) >= 1 &&
          parseInt(this.downPaymentPercentage) <= 100
          ? false
          : true;
      } else {
        return false;
      }
    },
    missingInvoiceRequired() {
      return this.invoiceRequiredItem.code === undefined ? true : false;
    },

    missingInvoiceDateNeeded() {
      if (this.invoiceRequiredItem.code === true) {
        return this.invoiceDateNeeded === null ? true : false;
      } else {
        return false;
      }
    },

    // System & Document Details

    missingSystemDetails() {
      return this.systemDetailsSelected.length < 1 ? true : false;
    },

    missingDocumentDetails() {
      return this.documentDetailsSelected.length < 1 ? true : false;
    },

    // Attachments
    missingAttachments() {
      return this.selectedFile.length === 0 ? true : false;
    },

    missingModalInputform() {
      return this.modalInputform.length === 0 ? true : false;
    },
  },
  data() {
    return {
      attemptNext: false,
      attemptNextOne: false,
      attemptNextTwo: false,
      attemptNextThree: false,
      attemptNextFour: false,
      attemptNextFive: false,
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
      coordinator: [
        { code: "PRJ", name: "Project" },
        { code: "DLV", name: "Delivery" },
        { code: "DMO", name: "Demo" },
        { code: "POC", name: "POC" },
      ],
      coordinatorItem: {},
      projectCode: "",
      projectCodeDataList: [],
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

      modalTitle: null,
      modalInputform: "",
    };
  },

  methods: {

    test(){
      console.log(this.contactNumberItem.code)
    },

    async querySof() {
      try {
        await this.$store.dispatch("sof/querySof",{
        processId: this.$route.params.id,
        frmName: this.$route.params.frmName,
        companyId: this.companyId,
      });

      const data = this.$store.getters['sof/getSofData'];

      console.warn(data)

      // data[0] - setup prj
      // data[1] - sales order
      // data[2] - systm
      // data[3] - docus
      // data[4] - actual sign
      // data[5] - attachments

      const frmClass = data[4]['actual_sign'][0]['FRM_NAME'];
      if(frmClass === 'Sales Order - Delivery'){
        this.sofType = { code: "DLV", name: "Delivery" }
      } else if (frmClass === 'Sales Order - Project'){
        this.sofType = { code: "PRJ", name: "Project" }
      } else if (frmClass === 'Sales Order - Demo'){
        this.sofType = { code: "DMO", name: "Demo" }
      } else if (frmClass === 'Sales Order - POC'){
        this.sofType = { code: "POC", name: "POC" }
      }

      // console.log(data[0]['setup_project'][0]['Business_Number'])
      // console.log(data[0]['setup_project'][0]['business_fullname'])
      // console.log(data[0]['setup_project'][0]['CLIENTCODE'])
      // console.log(data[0]['setup_project'][0]['term_type'])
      // console.log(data[0]['setup_project'][0]['PMName'])


      // Customer Details
      const selectedCustomerNameItem = {
        code: data[0]['setup_project'][0]['Business_Number'],
        name: data[0]['setup_project'][0]['business_fullname'],
        desc: data[0]['setup_project'][0]['CLIENTCODE'],
        term: data[0]['setup_project'][0]['term_type'],
        amgr: data[0]['setup_project'][0]['PMName'],
      }

      this.customerNameItem = selectedCustomerNameItem;

      const selectedContactPersonItem = {
        code: data[1]['sales_orders'][0]['Contactid'],
        name: data[1]['sales_orders'][0]['Contact'],
      }

      this.contactPersonItem = selectedContactPersonItem

      const selectedContactNumberItem = {
        code: data[1]['sales_orders'][0]['ContactNum'],
        name: data[1]['sales_orders'][0]['ContactNum'],
      }

      this.contactNumberItem = selectedContactNumberItem;

      

      const selectedBillingAddressItem = {
        code: data[1]['sales_orders'][0]['BillTo'],
        name: data[1]['sales_orders'][0]['BillTo'],
      }

      this.billingAddressItem = selectedBillingAddressItem;


      const selectedDeliveryAddressItem = {
        code: data[1]['sales_orders'][0]['DeliveryAddress'],
        name: data[1]['sales_orders'][0]['DeliveryAddress'],
      }

      this.deliveryAddressItem = selectedDeliveryAddressItem;


      // Project Details
      this.poNumber = data[1]['sales_orders'][0]['poNum']
      this.poDate = data[1]['sales_orders'][0]['podate']
      this.projectStart = data[0]['setup_project'][0]['project_effectivity']
      this.projectEnd = data[0]['setup_project'][0]['project_expiry']
      this.projectShortText = data[0]['setup_project'][0]['project_shorttext']
      this.soDate = data[1]['sales_orders'][0]['sodate']
      this.projectCode = data[0]['setup_project'][0]['project_no']
      this.scopeOfWork = data[0]['setup_project'][0]['project_remarks']

      // Payment & Delivery Details
      this.paymentTerms = data[1]['sales_orders'][0]['Terms']

        
        

        
        
        
        


      } catch (error) {

        this.openToast(
          "top-right",
          "error",
          "Internal Server Error! Please inform the administrator!"
        );
      
        console.error(error);
      }


    },

    async submit() {
      this.isLoadingSpinner = true;

      try {
        const payload = {
          // So CLassification
          sofType: this.sofType,

          // Customer Details
          customerNameItem: this.customerNameItem,
          contactPersonItem: this.contactPersonItem,
          contactNumberItem: this.contactNumberItem,
          deliveryAddressItem: this.deliveryAddressItem,
          billingAddressItem: this.billingAddressItem,

          // Project Details
          poNumber: this.poNumber,
          poDate: this.poDate,
          projectStart: this.projectStart,
          projectEnd: this.projectEnd,
          projectShortText: this.projectShortText,
          projectName: this.projectNameFormula,
          coordinatorItem: this.coordinatorItem.code,
          projectCode: this.projectCode,
          scopeOfWork: this.scopeOfWork,

          // Payment & Delivery Details
          paymentTerms: this.paymentTerms,
          warranty: this.warranty,
          currencyItem: this.currencyItem.name,
          projectCost: this.projectCost,
          downPaymentRequiredItem: this.downPaymentRequiredItem.code,
          downPaymentPercentage: this.downPaymentPercentage,
          downPaymentDateReceived: this.downPaymentDateReceived,
          invoiceNumber: this.invoiceNumber,

          invoiceRequiredItem: this.invoiceRequiredItem.code,
          invoiceDateNeeded: this.invoiceDateNeeded,
          salesInvoiceReleasedItem: this.salesInvoiceReleasedItem.code,
          dateOfInvoice: this.dateOfInvoice,

          accountingRemarks: this.accountingRemarks,

          // System & Document Details
          systemDetailsSelected: this.systemDetailsSelected,
          documentDetailsSelected: this.documentDetailsSelected,

          accountManager: this.accountManager,

          // The Attachments
          selectedFile: this.selectedFile,
        };

        const response = await this.$store.dispatch("sof/createSOF", payload);

        if (response.status === 201) {
          this.openToast(
            "top-right",
            "success",
            "Your Sales Order Request was successfully submitted."
          );
        }

        this.isLoadingSpinner = false;
        this.$router.replace("/inprogress");
      } catch (error) {
        this.isLoadingSpinner = false;

        if (error.response.status === 422) {
          this.openToast("top-right", "error", error.response.data);
        } else {
          this.openToast(
            "top-right",
            "error",
            "Internal Server Error! Please inform the administrator!"
          );
        }

        console.info(error);
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

    async next() {
      if (this.counter === 0) {
        this.attemptNext = true;
        if (!this.missingSOFType) {
          this.counter++;
        }
      } else if (this.counter === 1) {
        this.attemptNextOne = true;
        if (
          !this.missingCustomerName &&
          !this.missingContactPerson &&
          !this.missingContactNumber &&
          !this.missingDeliveryAddress &&
          !this.missingBillingAddress
        ) {
          this.counter++;
        }
      } else if (this.counter === 2) {
        this.attemptNextTwo = true;

        try {
          this.isLoadingSpinner = true;
          const isExist = await this.$store.dispatch(
            "sof/checkIfProjectCodeExist",
            this.projectCode
          );

          if (
            !this.missingPONumber &&
            !this.missingPODate &&
            !this.missingProjectStart &&
            !this.missingProjectEnd &&
            !this.missingProjectShortText &&
            !this.missingProjectCode &&
            !this.missingScopeOfWork &&
            isExist === 0
          ) {
            this.counter++;
          } else if (
            !this.missingPONumber &&
            !this.missingPODate &&
            !this.missingProjectStart &&
            !this.missingProjectEnd &&
            !this.missingProjectShortText &&
            !this.missingProjectCode &&
            !this.missingScopeOfWork &&
            isExist === 1
          ) {
            this.openToast(
              "top-right",
              "error",
              "Project Code must be unique!"
            );
          } else if (isExist === 1) {
            this.openToast(
              "top-right",
              "error",
              "Project Code must be unique!"
            );
          }
          this.isLoadingSpinner = false;
        } catch (error) {
          // Handle Error Here
          alert("error");
          console.log(error.status);
        }
      } else if (this.counter === 3) {
        this.attemptNextThree = true;

        if (
          !this.missingPaymentTerms &&
          !this.missingWarranty &&
          !this.missingCurrency &&
          !this.missingProjectCost &&
          !this.missingDownPaymentRequired &&
          !this.missingDownPaymentPercentage &&
          !this.missingInvoiceRequired &&
          !this.missingInvoiceDateNeeded &&
          !this.dpValitade
        ) {
          this.counter++;
        }
      } else if (this.counter === 4) {
        this.attemptNextFour = true;
        if (!this.missingSystemDetails && !this.missingDocumentDetails) {
          this.counter++;
        }
      } else if (this.counter === 5) {
        this.attemptNextFive = true;
        if (!this.missingAttachments) {
          this.counter++;
        }
      }
    },

    async queryCompany() {
      const responseData = await this.$store.dispatch(
        "sof/queryCompany",
        this.companyId
      );
      this.customerName = responseData;
    },

    async queryCompanyAddress(customerId) {
      const responseData = await this.$store.dispatch(
        "sof/queryCompanyAddress",
        customerId
      );
      this.deliveryAddress = responseData;
      this.billingAddress = responseData;
    },

    async queryCompanyContacts(customerId) {
      const responseData = await this.$store.dispatch(
        "sof/queryCompanyContacts",
        customerId
      );
      this.contactPerson = responseData.contact;
      this.contactNumber = responseData.number;

    },

    async queryCompanyCode(customerId) {
      const responseData = await this.$store.dispatch(
        "sof/queryCompanyCode",
        customerId
      );
      this.projectCodeDataList = responseData;
    },

    async queryCompanySystemDetails() {
      const responseData = await this.$store.dispatch(
        "sof/queryCompanySystemDetails"
      );
      this.systemDetailsList = responseData;
    },
    async queryCompanyDocumentDetails() {
      const responseData = await this.$store.dispatch(
        "sof/queryCompanyDocumentDetails"
      );
      this.documentDetailsList = responseData;
    },

    async queryCurrency() {
      const responseData = await this.$store.dispatch("sof/queryCurrency");
      this.currency = responseData;
    },

    setModalTitle(title) {
      this.modalTitle = title;
    },

    clearModal() {
      this.attemptModalSubmit = false;
      this.modalInputform = "";
    },

    validateModal() {
      this.attemptModalSubmit = true;
      if (!this.missingModalInputform) {
        this.insertSystemAndDocumentName();
      }
    },

    async insertSystemAndDocumentName() {
      this.isLoadingModal = true;
      try {
        const response = await this.$store.dispatch(
          "sof/insertSystemAndDocumentName",
          {
            id: this.loggedUserId,
            modalTitle: this.modalTitle,
            modalInputform: this.modalInputform,
          }
        );
        await this.queryCompanySystemDetails();
        await this.queryCompanyDocumentDetails();
        this.isLoadingModal = false;
        this.clearModal();
        // Open Toast
        if (response.status === 201) {
          this.openToast("top-right", "success", "Added Successfully!");
        }
      } catch (error) {
        this.isLoadingModal = false;

        // console.warn(error.response.status)
        if (error.response.status === 422) {
          this.openToast("top-right", "error", error.response.data);
        } else {
          this.openToast("top-right", "error", "Please inform the admin!");
        }
      }
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
