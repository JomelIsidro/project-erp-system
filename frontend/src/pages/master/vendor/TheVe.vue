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
          <h3 class="card-title">Supplier Details</h3>
        </div>
        <div class="card-body">
          <!-- Buttons -->
          <div class="row d-flex justify-content-end align-items-center flex-nowrap m-1">
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
                v-if="(this.counter <= 8)"
                type="button"
                @click="next()"
                class="btn ml-1 btn-primary btn-sm"
              >
                Next
              </button>
          
              <button
                :disabled="isSpinner"
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
            <div class="progressbar" :class="classH">
              <span :class="classH">8</span>
            </div>
            <div class="progressbar" :class="classI">
              <span :class="classI">9</span>
            </div>
            <div class="progressbar" :class="classZ">
              <span :class="classZ">10</span>
            </div>
          </div>
  
          <div class="d-flex text-center">
            <div class="textbar" :class="classA">
              <small
                ><span :class="classA" class="font-weight-bold"
                  >General</span
                ></small
              >
            </div>
            <div class="textbar" :class="classB">
              <small
                ><span :class="classB" class="font-weight-bold"
                  >Business</span
                ></small
              >
            </div>
            <div class="textbar" :class="classC">
              <small
                ><span :class="classC" class="font-weight-bold"
                  >Contact and Address</span
                ></small
              >
            </div>
            <div class="textbar" :class="classD">
              <small
                ><span :class="classD" class="font-weight-bold"
                  >Purchasing</span
                ></small
              >
            </div>
            <div class="textbar" :class="classE">
              <small
                ><span :class="classE" class="font-weight-bold"
                  >Accounting</span
                ></small
              >
            </div>
            <div class="textbar" :class="classF">
              <small
                ><span :class="classF" class="font-weight-bold"
                  >Technical and Support</span
                ></small
              >
            </div>
            <div class="textbar" :class="classG">
              <small
                ><span :class="classG" class="font-weight-bold"
                  >Related To</span
                ></small
              >
            </div>
            <div class="textbar" :class="classH">
              <small
                ><span :class="classH" class="font-weight-bold"
                  >Attachments</span
                ></small
              >
            </div>
            <div class="textbar" :class="classI">
              <small
                ><span :class="classI" class="font-weight-bold"
                  >Distribution and Agreement</span
                ></small
              >
            </div>
            <div class="textbar" :class="classZ">
              <small
                ><span :class="classZ" class="font-weight-bold"
                  >Review</span
                ></small
              >
            </div>
          </div>
          <!-- / Step Numbers -->
  
          <!-- Main Form -->
  
          <!-- General -->
          <div v-if="this.counter === 0">
            <div class="row mt-4">
              <div class="col-md-6">
                <div class="form-group">
                  <small><label for="reference">Business Name</label></small>
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    v-model="general.businessName"
                  />
                  <small class="text-danger p-0 m-0" v-if="this.missingBusinessName && attemptNext">Business Name is required!</small>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <small><label for="reference">Website</label></small>
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    v-model="general.website"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <small
                    ><label for="reportingManager selextForm" id="selextForm"
                      >Vendor Type</label
                    ></small
                  >
                  <model-list-select
                    :list="vendorList"
                    v-model="vendorSelected"
                    option-value="code"
                    option-text="name"
                    placeholder="select item"
                    style="padding: 9px"
                  >
                  </model-list-select>
                  <small class="text-danger p-0 m-0" v-if="this.missingGeneralVendorType && attemptNext">Please select type of vendor</small>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <small><label for="reference">In Business Since</label></small>
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    v-model="general.inBusinessSince"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <small><label for="reference">Credit Limit</label></small>
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    @keyup="formatCurrencyCreditLimit($event)"
                    @blur="formatCurrencyCreditLimit($event, 'blur')"
                    pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                    v-model="general.creditLimit"
                  />
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group">
                  <small
                    ><label for="reportingManager selextForm" id="selextForm"
                      >Currency</label
                    ></small
                  >
                  <model-list-select
                    :list="currenciesList"
                    v-model="currenciesSelected"
                    option-value="code"
                    option-text="name"
                    placeholder="select item"
                    style="padding: 9px"
                  >
                  </model-list-select>
                  <small class="text-danger p-0 m-0" v-if="this.missingGeneralCurrency && attemptNext">Please select a currency</small>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <small
                    ><label for="reportingManager selextForm" id="selextForm"
                      >Payment Terms</label
                    ></small
                  >
                  <model-list-select
                    :list="paymentTermsList"
                    v-model="paymentTermsSelected"
                    option-value="code"
                    option-text="name"
                    placeholder="select item"
                    style="padding: 9px"
                  >
                  </model-list-select>
                  <small class="text-danger p-0 m-0" v-if="this.missingGeneralPaymentTerms && attemptNext">Please select terms of payment</small>
                </div>
              </div>
            </div>

            <div class="row"> 
              <div class="col-md-3">
                <div class="form-group">
                  <small
                    ><label for="reportingManager selextForm" id="selextForm"
                      >VAT Status</label
                    ></small
                  >
                  <model-list-select
                    :list="businessTaxStatusList"
                    v-model="businessTaxStatusSelected"
                    option-value="code"
                    option-text="name"
                    placeholder="select item"
                    style="padding: 9px"
                  >
                  </model-list-select>
                  <small class="text-danger p-0 m-0" v-if="this.missingGeneralVATStatus && attemptNext">Please select VAT Status</small>
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group">
                  <small><label for="reference">TIN Number</label></small>
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    v-model="general.tinNumber"
                  />
                  <small class="text-danger p-0 m-0" v-if="this.missingGeneralTinNumber && attemptNext">TIN Number is required!</small>
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group">
                  <small><label for="reference">2303#</label></small>
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    v-model="general.twentyThreeZeroThree"
                  />
                </div>
              </div>

              <div class="col-md-3">
                <div class="form-group">
                  <small><label for="reference">Sec#</label></small>
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    v-model="general.secNumber"
                  />
                </div>
              </div>
            </div>
  
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <small><label for="purpose">Notes</label></small>
                  <textarea
                    class="form-control"
                    v-model.trim="general.notes"
                    rows="5"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <!-- / General -->
  
          <!-- Business -->
          <div class="mt-4" v-else-if="this.counter === 1">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <small
                    ><label for="reportingManager selextForm" id="selextForm"
                      >Type of Business</label
                    ></small
                  >
                  <model-list-select
                    :list="businessTypeList"
                    v-model="businessTypeSelected"
                    option-value="code"
                    option-text="name"
                    placeholder="select item"
                    style="padding: 9px"
                  >
                  </model-list-select>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <small
                    ><label for="reportingManager selextForm" id="selextForm"
                      >Nature of Business</label
                    ></small
                  >
                  <model-list-select
                    :list="businessNatureList"
                    v-model="businessNatureSelected"
                    option-value="code"
                    option-text="name"
                    placeholder="select item"
                    style="padding: 9px"
                  >
                  </model-list-select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <small><label for="reference">Authorized Capital Stock</label></small>
                  <input
                    type="text"
                    @keyup="formatCurrencyACS($event)"
                    @blur="formatCurrencyACS($event, 'blur')"
                    pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                    class="form-control form-control-sm py-3"
                    v-model="business.authorizedCapitalStock"
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <small><label for="reference">Paid-Up Capital Stock</label></small>
                  <input
                    type="text"
                    @keyup="formatCurrencyPCS($event)"
                    @blur="formatCurrencyPCS($event, 'blur')"
                    pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                    class="form-control form-control-sm py-3"
                    v-model="business.paidUpCapitalStock"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <small><label for="purpose">Description of Line of Business</label></small>
                  <textarea
                    class="form-control"
                    v-model.trim="business.notes"
                    rows="5"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="row mt-5">
              <table class="table table-sm table-bordered table-striped mx-2">
                <thead>
                  <tr>
                    <th colspan="6" scope="col">
                      <aside class="d-flex align-items-center">
                        <span class="mb-1 ml-1"> Corporate Officers</span>
                      </aside>
                    </th>
                    <th>
                      <aside class="text-center">
                        <button
                          class="btn btn-sm btn-success m-0"
                          data-toggle="modal"
                          data-target="#modal-corporate-officer"
                          @click="setButton()"
                        >
                          <i class="fas fa-plus"></i>
                        </button>
                      </aside>
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" class="text-center">#</th>
                    <th scope="col">Prefix</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Sufix</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
    
                <tbody style="font-size: 14px">
                  <tr v-for="(item, index) in businessData" :key="item.id">
                    <td class="text-center">{{ index + 1 }}.</td>
                    <td>{{ item.prefix_name }}</td>
                    <td>{{ item.firstName }}</td>
                    <td>{{ item.lastName }}</td>
                    <td>{{ item.suffix }}</td>
                    <td>{{ item.designation }}</td>
                    <td class="pl-0 m-0">
                      <aside class="d-flex justify-content-center">
                        <button
                          class="btn btn-sm btn-info m-0"
                          data-toggle="modal"
                          data-target="#modal-corporate-officer"
                          @click="editCorporateOfficers(businessData.indexOf(item))"
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                        <button
                          class="btn btn-sm btn-danger m-0 ml-1"
                          @click="trashCorporateOfficers(businessData.indexOf(item))"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </aside>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- / Business -->
  
          <!-- Contact and Address -->
          <div class="row mt-4" v-else-if="this.counter === 2">
            <table class="table table-sm table-bordered table-striped mx-2 ">
              <thead>
                <tr>
                  <th colspan="5" scope="col">
                    <aside class="d-flex align-items-center">
                      <span class="mb-1 ml-1"> Address</span>
                    </aside>
                  </th>
                  <th>
                    <aside class="text-center">
                      <button
                        class="btn btn-sm btn-success m-0"
                        data-toggle="modal"
                        data-target="#modal-address"
                        @click="setButton()"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </aside>
                  </th>
                </tr>
                <tr>
                  <th scope="col" class="text-center">#</th>
                  <th scope="col">Address Type</th>
                  <th scope="col">Address Line</th>
                  <th scope="col">City</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
  
              <tbody style="font-size: 14px">
                <tr v-for="(item, index) in addressData" :key="item.ID">
                  <td class="text-center">{{ index + 1 }}.</td>
                  <td>{{ item.TypeOfAddress }}</td>
                  <td>{{ item.address_line }}</td>
                  <td>{{ item.city }}</td>
                  <td>{{ item.Status }}</td>
                  <td class="pl-0 m-0">
                    <aside class="d-flex justify-content-center">
                      <button
                        class="btn btn-sm btn-info m-0"
                        data-toggle="modal"
                        data-target="#modal-address"
                        @click="editAddress(addressData.indexOf(item))"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-danger m-0 ml-1"
                        @click="trashAddress(addressData.indexOf(item), item.ID)"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </aside>
                  </td>
                </tr>
              </tbody>
            </table>

            <table class="table table-sm table-bordered table-striped mt-5 mx-2">
              <thead>
                <tr>
                  <th colspan="11" scope="col">
                    <aside class="d-flex align-items-center">
                      <span class="mb-1 ml-1"> Contact</span>
                    </aside>
                  </th>
                  <th>
                    <aside class="text-center">
                      <button
                        class="btn btn-sm btn-success m-0"
                        data-toggle="modal"
                        data-target="#modal-contact"
                        @click="setButton()"
                        :disabled="this.addressData.length == 0"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </aside>
                  </th>
                </tr>
                <tr>
                  <th scope="col" class="text-center">#</th>
                  <th scope="col">Prefix</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Suffix</th>
                  <th scope="col">Designation</th>
                  <th scope="col">Department</th>
                  <th scope="col">Mobile No.</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">Work From</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
  
              <tbody style="font-size: 14px">
                <tr v-for="(item, index) in contactData" :key="item.ID">
                  <td class="text-center">{{ index + 1 }}.</td>
                  <td>{{ item.Prefix }}</td>
                  <td>{{ item.FirstName }}</td>
                  <td>{{ item.LastName }}</td>
                  <td>{{ item.Suffix }}</td>
                  <td>{{ item.Position }} </td>
                  <td>{{ item.Department }}</td>
                  <td>{{ item.Number }}</td>
                  <td>{{ item.EmailAdd }}</td>
                  <td>{{ item.WorksFrom }}</td>
                  <td>{{ item.Status }}</td>
                  <td class="pl-0 m-0">
                    <aside class="d-flex justify-content-center">
                      <button
                        class="btn btn-sm btn-info m-0"
                        data-toggle="modal"
                        data-target="#modal-contact"
                        @click="editContact(contactData.indexOf(item))"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-danger m-0 ml-1"
                        @click="trashContact(contactData.indexOf(item), item.ID)"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </aside>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /. Contact and Address -->
  
          <!-- Purchasing -->
          <div class="mt-4" v-else-if="this.counter === 3">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <small><label for="reference">Brand</label></small>
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    v-model="purchasing.brand"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <small><label for="reference">Product Line</label></small>
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    v-model="purchasing.productLine"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <small><label for="reference">Services</label></small>
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    v-model="purchasing.services"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <small
                    ><label for="reportingManager selextForm" id="selextForm"
                      >Contact Person</label
                    ></small
                  >
                  <model-list-select
                    :list="contactPersonData"
                    v-model="contactPersonSelected"
                    option-value="code"
                    option-text="name"
                    placeholder="select item"
                    style="padding: 9px"
                  >
                  </model-list-select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <small
                    ><label for="reportingManager selextForm" id="selextForm"
                      >PO to be sent via</label
                    ></small
                  >
                  <model-list-select
                    :list="poToBeSentList"
                    v-model="poToBeSentSelected"
                    option-value="code"
                    option-text="name"
                    placeholder="select item"
                    style="padding: 9px"
                  >
                  </model-list-select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <small><label for="reference">Contact Details</label></small>
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    v-model="purchasing.contactDetails"
                    readonly
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <small><label for="reference">Ordering Preferences</label></small>
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    v-model="purchasing.ordering"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <small><label for="reference">Delivery/Shipping Preferences</label></small>
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    v-model="purchasing.shipping"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <small><label for="reference">Documentation Preferences</label></small>
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    v-model="purchasing.documentation"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <small><label for="reference">Payment Preferences</label></small>
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    v-model="purchasing.payment"
                  />
                </div>
              </div>
            </div>

            <div class="row mt-4">
              <div class="col-md-12">
                <small><label for="purpose">Attachments</label></small>
                <div 
                  class="
                    d-flex
                    align-items-center
                    justify-content-center
                    text-center
                    position-relative
                  "
                  id="app"
                >
                  <div
                    class="pt-2 col-md-12 rounded uploadContainer"
                    @dragover="dragover"
                    @dragleave="dragleave"
                    @drop="purchasingFileDrop"
                  >
                    <input
                      type="file"
                      multiple
                      name="fields[assetsFieldHandle][]"
                      id="assetsFieldHandle"
                      class="w-25 h-25 overflow-hidden"
                      @change="purchasingFileOnFileSelected"
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
                        v-for="file in purchasingSelectedFile"
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
                                @click="purchasingFileRemove(purchasingSelectedFile.indexOf(file))"
                                title="Remove file"
                              >
                                Remove
                              </button>
                            </div>
                            <div class="ml-1">
                              <button
                                @click="purchasingFilePreview(purchasingSelectedFile.indexOf(file))"
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
                </div>
              </div>
            </div>
          </div>
          <!-- /. Purchasing -->
  
          <!-- Accounting -->
          <div class="mt-4" v-else-if="this.counter === 4">
            <div class="row">
              <div class="col-md-3">
                <div class="form-group">
                  <small
                    ><label for="reportingManager selextForm" id="selextForm"
                      >ATC</label
                    ></small
                  >
                  <model-list-select
                    :list="AccountATCList"
                    v-model="AccountATCSelected"
                    option-value="code"
                    option-text="atc"
                    placeholder="select item"
                    style="padding: 9px"
                  >
                  </model-list-select>
                  <small class="text-danger p-0 m-0" v-if="this.missingAccountingATC && attemptNextFour">Please select an ATC</small>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <small><label for="reference">Tax Rate</label></small>
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    v-model="AccountRateSelected"
                    readonly
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <small><label for="reference">Nature of Income Payment</label></small>
                  <input
                    type="text"
                    class="form-control form-control-sm py-3"
                    v-model="AccountDescSelected"
                    readonly
                  />
                </div>
              </div>
            </div>

            <div class="row mt-5">
              <table class="table table-sm table-bordered table-striped mx-2">
                <thead>
                  <tr>
                    <th colspan="7" scope="col">
                      <aside class="d-flex align-items-center">
                        <span class="mb-1 ml-1"> Banking Information</span>
                      </aside>
                    </th>
                    <th>
                      <aside class="text-center">
                        <button
                          class="btn btn-sm btn-success m-0"
                          data-toggle="modal"
                          data-target="#modal-banking-info"
                          @click="setButton()"
                        >
                          <i class="fas fa-plus"></i>
                        </button>
                      </aside>
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" class="text-center">#</th>
                    <th scope="col">Bank Name</th>
                    <th scope="col">Bank Account Number</th>
                    <th scope="col">Bank Branch</th>
                    <th scope="col">Account Currency</th>
                    <th scope="col">Swift Code</th>
                    <th scope="col">Preferred Bank Account</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
    
                <tbody style="font-size: 14px">
                  <tr v-for="(item, index) in accountingData" :key="item.id">
                    <td class="text-center">{{ index + 1 }}.</td>
                    <td>{{ item.bankName }}</td>
                    <td>{{ item.bankAcctNumber }}</td>
                    <td>{{ item.bankBranch }}</td>
                    <td>{{ item.bank_currency_name }}</td>
                    <td>{{ item.bankSwiftCode }}</td>
                    <td class="text-center">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" :checked="item.bankPreferred" disabled/>
                      </div>
                    </td>
                    <td class="pl-0 m-0">
                      <aside class="d-flex justify-content-center">
                        <button
                          class="btn btn-sm btn-info m-0"
                          data-toggle="modal"
                          data-target="#modal-banking-info"
                          @click="editBankInfo(accountingData.indexOf(item))"
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                        <button
                          class="btn btn-sm btn-danger m-0 ml-1"
                          @click="trashBankInfo(accountingData.indexOf(item))"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </aside>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- / Accounting -->

          <!-- Technical and Support -->
          <div class="mt-4" v-else-if="(this.counter === 5)">
            <div class="row mt-4">
              <div class="col-md-6">
                <div class="form-group">
                  <small><label for="purpose">Warranty Information</label></small>
                  <textarea
                    class="form-control"
                    name="purpose"
                    id="purpose"
                    v-model.trim="technical.warrantyNote"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <small><label for="purpose">RMA Policy and Note</label></small>
                  <textarea
                    class="form-control"
                    name="purpose"
                    id="purpose"
                    v-model.trim="technical.policyNote"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="row mt-4">
              <div class="col-md-12">
                <small><label for="purpose">Attachments</label></small>
                <div 
                  class="
                    d-flex
                    align-items-center
                    justify-content-center
                    text-center
                    position-relative
                  "
                  id="app"
                >
                  <div
                    class="pt-2 col-md-12 rounded uploadContainer"
                    @dragover="dragover"
                    @dragleave="dragleave"
                    @drop="technicalFileDrop"
                  >
                    <input
                      type="file"
                      multiple
                      name="fields[assetsFieldHandle][]"
                      id="assetsFieldHandle"
                      class="w-25 h-25 overflow-hidden"
                      @change="technicalFileOnFileSelected"
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
                        v-for="file in technicalSelectedFile"
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
                                @click="technicalFileRemove(technicalSelectedFile.indexOf(file))"
                                title="Remove file"
                              >
                                Remove
                              </button>
                            </div>
                            <div class="ml-1">
                              <button
                                @click="technicalFilePreview(technicalSelectedFile.indexOf(file))"
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
                </div>
              </div>
            </div>

          </div>
          <!-- / Technical and Support -->

          <!-- Related To -->
          <div class="row mt-4" v-else-if="(this.counter === 6)">
            <table class="table table-sm table-bordered table-striped mx-2">
              <thead>
                <tr>
                  <th colspan="4" scope="col">
                    <aside class="d-flex align-items-center">
                      <span class="mb-1 ml-1"> Related Vendors</span>
                    </aside>
                  </th>
                  <th>
                    <aside class="text-center">
                      <button
                        class="btn btn-sm btn-success m-0"
                        data-toggle="modal"
                        data-target="#modal-related-vendor"
                        @click="setButton()"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </aside>
                  </th>
                </tr>
                <tr>
                  <th scope="col" class="text-center">#</th>
                  <th scope="col">Relationship</th>
                  <th scope="col">Vendor Code</th>
                  <th scope="col">Vendor Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
  
              <tbody style="font-size: 14px">
                <tr v-for="(item, index) in relatedVendorData" :key="item.id">
                  <td class="text-center">{{ index + 1 }}.</td>
                  <td>{{ item.vendor_relationship_name }}</td>
                  <td>{{ item.vendor_code }}</td>
                  <td>{{ item.vendor_name }}</td>
                  <td class="pl-0 m-0">
                    <aside class="d-flex justify-content-center">
                      <button
                        class="btn btn-sm btn-info m-0"
                        data-toggle="modal"
                        data-target="#modal-related-vendor"
                        @click="editRelatedVendor(relatedVendorData.indexOf(item))"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-danger m-0 ml-1"
                        @click="trashRelatedVendor(relatedVendorData.indexOf(item))"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </aside>
                  </td>
                </tr>
              </tbody>
            </table>

            <table class="table table-sm table-bordered table-striped mx-2 mt-5">
              <thead>
                <tr>
                  <th colspan="4" scope="col">
                    <aside class="d-flex align-items-center">
                      <span class="mb-1 ml-1"> Related Customers</span>
                    </aside>
                  </th>
                  <th>
                    <aside class="text-center">
                      <button
                        class="btn btn-sm btn-success m-0"
                        data-toggle="modal"
                        data-target="#modal-related-customer"
                        @click="setButton()"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </aside>
                  </th>
                </tr>
                <tr>
                  <th scope="col" class="text-center">#</th>
                  <th scope="col">Relationship</th>
                  <th scope="col">Customer Code</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
  
              <tbody style="font-size: 14px">
                <tr v-for="(item, index) in relatedCustomerData" :key="item.id">
                  <td class="text-center">{{ index + 1 }}.</td>
                  <td>{{ item.customer_relationship_name }}</td>
                  <td>{{ item.customer_code }}</td>
                  <td>{{ item.customer_name }}</td>
                  <td class="pl-0 m-0">
                    <aside class="d-flex justify-content-center">
                      <button
                        class="btn btn-sm btn-info m-0"
                        data-toggle="modal"
                        data-target="#modal-related-customer"
                        @click="editRelatedCustomer(relatedCustomerData.indexOf(item))"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-danger m-0 ml-1"
                        @click="trashRelatedCustomer(relatedCustomerData.indexOf(item))"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </aside>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /. Related To -->

          <!-- Attachments  -->
          <div class="mt-4" v-else-if="(this.counter === 7)">
            <div class="row mt-4">
              <div class="col-md-12">
                <small><label for="purpose">Accomplished Vendor Information Sheet</label></small>
                <div 
                  class="
                    d-flex
                    align-items-center
                    justify-content-center
                    text-center
                    position-relative
                  "
                  id="app"
                >
                  <div
                    class="pt-2 col-md-12 rounded uploadContainer"
                    @dragover="dragover"
                    @dragleave="dragleave"
                    @drop="attachmentOneFileDrop"
                  >
                    <input
                      type="file"
                      multiple
                      name="fields[assetsFieldHandle][]"
                      id="assetsFieldHandle1"
                      class="w-25 h-25 overflow-hidden"
                      @change="attachmentOneFileOnFileSelected"
                      ref="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
        
                    <label
                      for="assetsFieldHandle1"
                      style="width: 100%; cursor: pointer"
                      class="block pt-3 cursor-pointer"
                    >
                      <span class="text-secondary">Click here or drop file(s)</span>
                    </label>
      
                    <ul class="pb-3 text-decoration-none ulUpload" v-cloak>
                      <li
                        class="text-sm mt-2"
                        v-for="file in attachmentOneSelectedFile"
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
                                @click="attachmentOneFileRemove(attachmentOneSelectedFile.indexOf(file))"
                                title="Remove file"
                              >
                                Remove
                              </button>
                            </div>
                            <div class="ml-1">
                              <button
                                @click="attachmentOneFilePreview(attachmentOneSelectedFile.indexOf(file))"
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
                </div>
              </div>
            </div>

            <div class="row mt-4">
              <div class="col-md-12">
                <small><label for="purpose">Business Registration</label></small>
                <div 
                  class="
                    d-flex
                    align-items-center
                    justify-content-center
                    text-center
                    position-relative
                  "
                  id="app"
                >
                  <div
                    class="pt-2 col-md-12 rounded uploadContainer"
                    @dragover="dragover"
                    @dragleave="dragleave"
                    @drop="attachmentTwoFileDrop"
                  >
                    <input
                      type="file"
                      multiple
                      name="fields[assetsFieldHandle][]"
                      id="assetsFieldHandle2"
                      class="w-25 h-25 overflow-hidden"
                      @change="attachmentTwoFileOnFileSelected"
                      ref="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
        
                    <label
                      for="assetsFieldHandle2"
                      style="width: 100%; cursor: pointer"
                      class="block pt-3 cursor-pointer"
                    >
                      <span class="text-secondary">Click here or drop file(s)</span>
                    </label>
      
                    <ul class="pb-3 text-decoration-none ulUpload" v-cloak>
                      <li
                        class="text-sm mt-2"
                        v-for="file in attachmentTwoSelectedFile"
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
                                @click="attachmentTwoFileRemove(attachmentTwoSelectedFile.indexOf(file))"
                                title="Remove file"
                              >
                                Remove
                              </button>
                            </div>
                            <div class="ml-1">
                              <button
                                @click="attachmentTwoFilePreview(attachmentTwoSelectedFile.indexOf(file))"
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
                </div>
              </div>
            </div>

            <div class="row mt-4">
              <div class="col-md-12">
                <small><label for="purpose">Updated Business Permit</label></small>
                <div 
                  class="
                    d-flex
                    align-items-center
                    justify-content-center
                    text-center
                    position-relative
                  "
                  id="app"
                >
                  <div
                    class="pt-2 col-md-12 rounded uploadContainer"
                    @dragover="dragover"
                    @dragleave="dragleave"
                    @drop="attachmentThreeFileDrop"
                  >
                    <input
                      type="file"
                      multiple
                      name="fields[assetsFieldHandle][]"
                      id="assetsFieldHandle3"
                      class="w-25 h-25 overflow-hidden"
                      @change="attachmentThreeFileOnFileSelected"
                      ref="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
        
                    <label
                      for="assetsFieldHandle3"
                      style="width: 100%; cursor: pointer"
                      class="block pt-3 cursor-pointer"
                    >
                      <span class="text-secondary">Click here or drop file(s)</span>
                    </label>
      
                    <ul class="pb-3 text-decoration-none ulUpload" v-cloak>
                      <li
                        class="text-sm mt-2"
                        v-for="file in attachmentThreeSelectedFile"
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
                                @click="attachmentThreeFileRemove(attachmentThreeSelectedFile.indexOf(file))"
                                title="Remove file"
                              >
                                Remove
                              </button>
                            </div>
                            <div class="ml-1">
                              <button
                                @click="attachmentThreeFilePreview(attachmentThreeSelectedFile.indexOf(file))"
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
                </div>
              </div>
            </div>

            <div class="row mt-4">
              <div class="col-md-12">
                <small><label for="purpose">BIR Certificate of Registration: BIR 2303 form</label></small>
                <div 
                  class="
                    d-flex
                    align-items-center
                    justify-content-center
                    text-center
                    position-relative
                  "
                  id="app"
                >
                  <div
                    class="pt-2 col-md-12 rounded uploadContainer"
                    @dragover="dragover"
                    @dragleave="dragleave"
                    @drop="attachmentFourFileDrop"
                  >
                    <input
                      type="file"
                      multiple
                      name="fields[assetsFieldHandle][]"
                      id="assetsFieldHandle4"
                      class="w-25 h-25 overflow-hidden"
                      @change="attachmentFourFileOnFileSelected"
                      ref="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
        
                    <label
                      for="assetsFieldHandle4"
                      style="width: 100%; cursor: pointer"
                      class="block pt-3 cursor-pointer"
                    >
                      <span class="text-secondary">Click here or drop file(s)</span>
                    </label>
      
                    <ul class="pb-3 text-decoration-none ulUpload" v-cloak>
                      <li
                        class="text-sm mt-2"
                        v-for="file in attachmentFourSelectedFile"
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
                                @click="attachmentFourFileRemove(attachmentFourSelectedFile.indexOf(file))"
                                title="Remove file"
                              >
                                Remove
                              </button>
                            </div>
                            <div class="ml-1">
                              <button
                                @click="attachmentFourFilePreview(attachmentFourSelectedFile.indexOf(file))"
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
                </div>
              </div>
            </div>

            <div class="row mt-4">
              <div class="col-md-12">
                <small><label for="purpose">Sample of Delivery Receipt, Sales Invoice, Official Receipt</label></small>
                <div 
                  class="
                    d-flex
                    align-items-center
                    justify-content-center
                    text-center
                    position-relative
                  "
                  id="app"
                >
                  <div
                    class="pt-2 col-md-12 rounded uploadContainer"
                    @dragover="dragover"
                    @dragleave="dragleave"
                    @drop="attachmentFiveFileDrop"
                  >
                    <input
                      type="file"
                      multiple
                      name="fields[assetsFieldHandle][]"
                      id="assetsFieldHandle5"
                      class="w-25 h-25 overflow-hidden"
                      @change="attachmentFiveFileOnFileSelected"
                      ref="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
        
                    <label
                      for="assetsFieldHandle5"
                      style="width: 100%; cursor: pointer"
                      class="block pt-3 cursor-pointer"
                    >
                      <span class="text-secondary">Click here or drop file(s)</span>
                    </label>
      
                    <ul class="pb-3 text-decoration-none ulUpload" v-cloak>
                      <li
                        class="text-sm mt-2"
                        v-for="file in attachmentFiveSelectedFile"
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
                                @click="attachmentFiveFileRemove(attachmentFiveSelectedFile.indexOf(file))"
                                title="Remove file"
                              >
                                Remove
                              </button>
                            </div>
                            <div class="ml-1">
                              <button
                                @click="attachmentFiveFilePreview(attachmentFiveSelectedFile.indexOf(file))"
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
                </div>
              </div>
            </div>

            <div class="row mt-4">
              <div class="col-md-12">
                <small><label for="purpose">Company/Business Profile</label></small>
                <div 
                  class="
                    d-flex
                    align-items-center
                    justify-content-center
                    text-center
                    position-relative
                  "
                  id="app"
                >
                  <div
                    class="pt-2 col-md-12 rounded uploadContainer"
                    @dragover="dragover"
                    @dragleave="dragleave"
                    @drop="attachmentSixFileDrop"
                  >
                    <input
                      type="file"
                      multiple
                      name="fields[assetsFieldHandle][]"
                      id="assetsFieldHandle6"
                      class="w-25 h-25 overflow-hidden"
                      @change="attachmentSixFileOnFileSelected"
                      ref="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
        
                    <label
                      for="assetsFieldHandle6"
                      style="width: 100%; cursor: pointer"
                      class="block pt-3 cursor-pointer"
                    >
                      <span class="text-secondary">Click here or drop file(s)</span>
                    </label>
      
                    <ul class="pb-3 text-decoration-none ulUpload" v-cloak>
                      <li
                        class="text-sm mt-2"
                        v-for="file in attachmentSixSelectedFile"
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
                                @click="attachmentSixFileRemove(attachmentSixSelectedFile.indexOf(file))"
                                title="Remove file"
                              >
                                Remove
                              </button>
                            </div>
                            <div class="ml-1">
                              <button
                                @click="attachmentSixFilePreview(attachmentSixSelectedFile.indexOf(file))"
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
                </div>
              </div>
            </div>

            <div class="row mt-4">
              <div class="col-md-12">
                <small><label for="purpose">Latest Audited Financial Statements</label></small>
                <div 
                  class="
                    d-flex
                    align-items-center
                    justify-content-center
                    text-center
                    position-relative
                  "
                  id="app"
                >
                  <div
                    class="pt-2 col-md-12 rounded uploadContainer"
                    @dragover="dragover"
                    @dragleave="dragleave"
                    @drop="attachmentSevenFileDrop"
                  >
                    <input
                      type="file"
                      multiple
                      name="fields[assetsFieldHandle][]"
                      id="assetsFieldHandle7"
                      class="w-25 h-25 overflow-hidden"
                      @change="attachmentSevenFileOnFileSelected"
                      ref="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
        
                    <label
                      for="assetsFieldHandle7"
                      style="width: 100%; cursor: pointer"
                      class="block pt-3 cursor-pointer"
                    >
                      <span class="text-secondary">Click here or drop file(s)</span>
                    </label>
      
                    <ul class="pb-3 text-decoration-none ulUpload" v-cloak>
                      <li
                        class="text-sm mt-2"
                        v-for="file in attachmentSevenSelectedFile"
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
                                @click="attachmentSevenFileRemove(attachmentSevenSelectedFile.indexOf(file))"
                                title="Remove file"
                              >
                                Remove
                              </button>
                            </div>
                            <div class="ml-1">
                              <button
                                @click="attachmentSevenFilePreview(attachmentSevenSelectedFile.indexOf(file))"
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
                </div>
              </div>
            </div>

          </div>
          <!-- / Attachments -->

          <!-- Distribution and Agreement -->
          <div class="mt-4" v-else-if="(this.counter === 8)">
            <div class="row">
              <table class="table table-sm table-bordered table-striped mx-2">
                <thead>
                  <tr>
                    <th colspan="6" scope="col">
                      <aside class="d-flex align-items-center">
                        <span class="mb-1 ml-1"> Sales Target</span>
                      </aside>
                    </th>
                    <th>
                      <aside class="text-center">
                        <button
                          class="btn btn-sm btn-success m-0"
                          data-toggle="modal"
                          data-target="#modal-distribution-agreement"
                          @click="setButton()"
                        >
                          <i class="fas fa-plus"></i>
                        </button>
                      </aside>
                    </th>
                  </tr>

                  <tr>
                    <th class="text-center" colspan="3">Fiscal Year</th>
                  </tr>

                  <tr>
                    <th scope="col" class="text-center">#</th>
                    <th scope="col">Month Start</th>
                    <th scope="col">Month End</th>
                    <th scope="col">Annual Target</th>
                    <th scope="col">Currency</th>
                    <th scope="col">Total Order</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
    
                <tbody style="font-size: 14px">
                  <tr v-for="(item, index) in distributionAgreementData" :key="item.id">
                    <td class="text-center">{{ index + 1 }}.</td>
                    <td>{{ item.monthStart }}</td>
                    <td>{{ item.monthEnd }}</td>
                    <td>{{ item.annualTarget }}</td>
                    <td>{{ item.currency_name }}</td>
                    <td>{{ item.totalOrder }}</td>
                    <td class="pl-0 m-0">
                      <aside class="d-flex justify-content-center">
                        <button
                          class="btn btn-sm btn-info m-0"
                          data-toggle="modal"
                          data-target="#modal-distribution-agreement"
                          @click="editDistributionAgreement(distributionAgreementData.indexOf(item))"
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                        <button
                          class="btn btn-sm btn-danger m-0 ml-1"
                          @click="trashDistributionAgreement(distributionAgreementData.indexOf(item))"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </aside>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 class="mt-5 text-center font-weight-bold">Specific Attachments</h4>
            <div class="row">
              <div class="col-md-12">
                <small><label for="purpose">Agreement</label></small>
                <div 
                  class="
                    d-flex
                    align-items-center
                    justify-content-center
                    text-center
                    position-relative
                  "
                  id="app"
                >
                  <div
                    class="pt-2 col-md-12 rounded uploadContainer"
                    @dragover="dragover"
                    @dragleave="dragleave"
                    @drop="distributionOneFileDrop"
                  >
                    <input
                      type="file"
                      multiple
                      name="fields[assetsFieldHandle][]"
                      id="assetsFieldHandle1"
                      class="w-25 h-25 overflow-hidden"
                      @change="distributionOneFileOnFileSelected"
                      ref="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
        
                    <label
                      for="assetsFieldHandle1"
                      style="width: 100%; cursor: pointer"
                      class="block pt-3 cursor-pointer"
                    >
                      <span class="text-secondary">Click here or drop file(s)</span>
                    </label>
      
                    <ul class="pb-3 text-decoration-none ulUpload" v-cloak>
                      <li
                        class="text-sm mt-2"
                        v-for="file in distributionOneSelectedFile"
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
                                @click="distributionOneFileRemove(distributionOneSelectedFile.indexOf(file))"
                                title="Remove file"
                              >
                                Remove
                              </button>
                            </div>
                            <div class="ml-1">
                              <button
                                @click="distributionOneFilePreview(distributionOneSelectedFile.indexOf(file))"
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
                </div>
              </div>
            </div>

            <div class="row mt-5">
              <div class="col-md-12">
                <small><label for="purpose">NDA</label></small>
                <div 
                  class="
                    d-flex
                    align-items-center
                    justify-content-center
                    text-center
                    position-relative
                  "
                  id="app"
                >
                  <div
                    class="pt-2 col-md-12 rounded uploadContainer"
                    @dragover="dragover"
                    @dragleave="dragleave"
                    @drop="distributionTwoFileDrop"
                  >
                    <input
                      type="file"
                      multiple
                      name="fields[assetsFieldHandle][]"
                      id="assetsFieldHandle2"
                      class="w-25 h-25 overflow-hidden"
                      @change="distributionTwoFileOnFileSelected"
                      ref="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
        
                    <label
                      for="assetsFieldHandle2"
                      style="width: 100%; cursor: pointer"
                      class="block pt-3 cursor-pointer"
                    >
                      <span class="text-secondary">Click here or drop file(s)</span>
                    </label>
      
                    <ul class="pb-3 text-decoration-none ulUpload" v-cloak>
                      <li
                        class="text-sm mt-2"
                        v-for="file in distributionTwoSelectedFile"
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
                                @click="distributionTwoFileRemove(distributionTwoSelectedFile.indexOf(file))"
                                title="Remove file"
                              >
                                Remove
                              </button>
                            </div>
                            <div class="ml-1">
                              <button
                                @click="distributionTwoFilePreview(distributionTwoSelectedFile.indexOf(file))"
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
                </div>
              </div>
            </div>

            <div class="row mt-5">
              <div class="col-md-12">
                <small><label for="purpose">Distributor Certificate</label></small>
                <div 
                  class="
                    d-flex
                    align-items-center
                    justify-content-center
                    text-center
                    position-relative
                  "
                  id="app"
                >
                  <div
                    class="pt-2 col-md-12 rounded uploadContainer"
                    @dragover="dragover"
                    @dragleave="dragleave"
                    @drop="distributionThreeFileDrop"
                  >
                    <input
                      type="file"
                      multiple
                      name="fields[assetsFieldHandle][]"
                      id="assetsFieldHandle3"
                      class="w-25 h-25 overflow-hidden"
                      @change="distributionThreeFileOnFileSelected"
                      ref="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
        
                    <label
                      for="assetsFieldHandle3"
                      style="width: 100%; cursor: pointer"
                      class="block pt-3 cursor-pointer"
                    >
                      <span class="text-secondary">Click here or drop file(s)</span>
                    </label>
      
                    <ul class="pb-3 text-decoration-none ulUpload" v-cloak>
                      <li
                        class="text-sm mt-2"
                        v-for="file in distributionThreeSelectedFile"
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
                                @click="distributionThreeFileRemove(distributionThreeSelectedFile.indexOf(file))"
                                title="Remove file"
                              >
                                Remove
                              </button>
                            </div>
                            <div class="ml-1">
                              <button
                                @click="distributionThreeFilePreview(distributionThreeSelectedFile.indexOf(file))"
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
                </div>
              </div>
            </div>

            <h4 class="mt-5 text-center font-weight-bold">Other Attachments</h4>
            <div class="row">
              <div class="col-md-12">
                <div 
                  class="
                    d-flex
                    align-items-center
                    justify-content-center
                    text-center
                    position-relative
                  "
                  id="app"
                >
                  <div
                    class="pt-2 col-md-12 rounded uploadContainer"
                    @dragover="dragover"
                    @dragleave="dragleave"
                    @drop="distributionFourFileDrop"
                  >
                    <input
                      type="file"
                      multiple
                      name="fields[assetsFieldHandle][]"
                      id="assetsFieldHandle4"
                      class="w-25 h-25 overflow-hidden"
                      @change="distributionFourFileOnFileSelected"
                      ref="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
        
                    <label
                      for="assetsFieldHandle4"
                      style="width: 100%; cursor: pointer"
                      class="block pt-3 cursor-pointer"
                    >
                      <span class="text-secondary">Click here or drop file(s)</span>
                    </label>
      
                    <ul class="pb-3 text-decoration-none ulUpload" v-cloak>
                      <li
                        class="text-sm mt-2"
                        v-for="file in distributionFourSelectedFile"
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
                                @click="distributionFourFileRemove(distributionFourSelectedFile.indexOf(file))"
                                title="Remove file"
                              >
                                Remove
                              </button>
                            </div>
                            <div class="ml-1">
                              <button
                                @click="distributionFourFilePreview(distributionFourSelectedFile.indexOf(file))"
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
                </div>
              </div>
            </div>

          </div>
          <!-- Distribution and Agreement -->
  
          <!--  Form Review -->
          <aside v-else-if="(this.counter === 9)">
            <div class="custom-modal" v-show="isSpinner">
              <div class="custom-modal-content">
                <loading-spinner></loading-spinner>
              </div>
            </div>
            
            <!-- General Review -->
            <div class="card card-secondary mt-4">
              <div class="card-header">
                <h3 class="card-title">General</h3>
  
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
                      <td>Business Name</td>
                      <td style="width: 80%">{{ general.businessName }}</td>
                    </tr>
                    <tr>
                      <td>Website</td>
                      <td style="width: 80%">{{ general.website }}</td>
                    </tr>
                    <tr>
                      <td>Vendor Type</td>
                      <td>{{ general.vendorTypeSelected }}</td>
                    </tr>
                    <tr>
                      <td>In Business Since</td>
                      <td>{{ general.inBusinessSince }}</td>
                    </tr>
                    <tr>
                      <td>Payment Terms</td>
                      <td>{{ paymentTermsSelected.name }}</td>
                    </tr>
                    <tr>
                      <td>Credit Limit</td>
                      <td>{{ general.creditLimit }}</td>
                    </tr>
                    <tr>
                      <td>Currency</td>
                      <td>{{ currenciesSelected.name }}</td>
                    </tr>
                    <tr>
                      <td>Last Update Date</td>
                      <td>{{ requestDate }}</td>
                    </tr>
                    <tr>
                      <td>Last Update By</td>
                      <td>{{ general.lastUpdateBy }}</td>
                    </tr>
                    <tr>
                      <td>VAT Status</td>
                      <td>{{ businessTaxStatusSelected.name }}</td>
                    </tr>
                    <tr>
                      <td>TIN Number</td>
                      <td>{{ general.tinNumber }}</td>
                    </tr>
                    <tr>
                      <td>2303#</td>
                      <td>{{ general.twentyThreeZeroThree }}</td>
                    </tr>
                    <tr>
                      <td>Sec#</td>
                      <td>{{ general.secNumber }}</td>
                    </tr>
                    <tr>
                      <td>Notes</td>
                      <td>{{ general.notes }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
              <!-- /.card -->
            </div>
            <!-- /.General Review -->

            <!-- Business Review -->
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title">Business</h3>
  
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
                      <td>Type of Business</td>
                      <td style="width: 80%">{{ businessTypeSelected.name }}</td>
                    </tr>
                    <tr>
                      <td>Nature of Business</td>
                      <td>{{ businessNatureSelected.name }}</td>
                    </tr>
                    <tr>
                      <td>Authorized Capital Stock</td>
                      <td>{{ business.authorizedCapitalStock }}</td>
                    </tr>
                    <tr>
                      <td>Paid-Up Capital Stock</td>
                      <td>{{ business.paidUpCapitalStock }}</td>
                    </tr>
                    <tr>
                      <td>Description of Line of Business</td>
                      <td>{{ business.notes }}</td>
                    </tr>
                  </tbody>
                </table>

                <table class="table table-sm mt-5 table-bordered table-striped">
                  <thead>
                    <tr>
                      <th colspan="7" scope="col">
                        <aside class="d-flex align-items-center">
                          <span class="mb-1">Corporate Officers</span>
                        </aside>
                      </th>
                    </tr>
                    <tr>
                      <th scope="col" class="text-center">#</th>
                      <th scope="col">Prefix</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Sufix</th>
                      <th scope="col">Designation</th>
                    </tr>
                  </thead>
      
                  <tbody style="font-size: 14px">
                    <tr v-for="(item, index) in businessData" :key="item.id">
                      <td class="text-center">{{ index + 1 }}.</td>
                      <td>{{ item.prefix_name }}</td>
                      <td>{{ item.firstName }}</td>
                      <td>{{ item.lastName }}</td>
                      <td>{{ item.suffix }}</td>
                      <td>{{ item.designation }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
            <!-- /.Business Review -->
  
            <!-- Contact and Address Review -->
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title">Contact and Address</h3>
  
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
                <table class="table table-sm table-bordered table-striped">
                  <thead>
                    <tr>
                      <th colspan="8" scope="col">
                        <aside class="d-flex align-items-center">
                          <span class="mb-1">Address</span>
                        </aside>
                      </th>
                    </tr>
                    <tr>
                      <th scope="col" class="text-center">#</th>
                      <th scope="col">Address Type</th>
                      <th scope="col">Address Line</th>
                      <th scope="col">City</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
      
                  <tbody style="font-size: 14px">
                    <tr v-for="(item, index) in addressData" :key="item.ID">
                      <td class="text-center">{{ index + 1 }}.</td>
                      <td>{{ item.TypeOfAddress }}</td>
                      <td>{{ item.address_line }}</td>
                      <td>{{ item.city }}</td>
                      <td>{{ item.Status }}</td>
                    </tr>
                  </tbody>
                </table>

                <table class="table table-sm table-bordered table-striped">
                  <thead>
                    <tr>
                      <th colspan="11" scope="col">
                        <aside class="d-flex align-items-center">
                          <span class="mb-1">Contact</span>
                        </aside>
                      </th>
                    </tr>
                    <tr>
                      <th scope="col" class="text-center">#</th>
                      <th scope="col">Prefix</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Suffix</th>
                      <th scope="col">Designation</th>
                      <th scope="col">Department</th>
                      <th scope="col">Mobile No.</th>
                      <th scope="col">Email Address</th>
                      <th scope="col">Work From</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
      
                  <tbody style="font-size: 14px">
                    <tr v-for="(item, index) in contactData" :key="item.ID">
                      <td class="text-center">{{ index + 1 }}.</td>
                      <td>{{ item.Prefix }}</td>
                      <td>{{ item.FirstName }}</td>
                      <td>{{ item.LastName }}</td>
                      <td>{{ item.Suffix }}</td>
                      <td>{{ item.Position }} </td>
                      <td>{{ item.Department }}</td>
                      <td>{{ item.Number }}</td>
                      <td>{{ item.EmailAdd }}</td>
                      <td>{{ item.WorksFrom }}</td>
                      <td>{{ item.Status }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.Contact and Address Review -->
  
            <!-- Purchasing Review -->
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title">Purchasing</h3>
  
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
                      <td>Brand</td>
                      <td style="width: 80%">{{ purchasing.brand }}</td>
                    </tr>
                    <tr>
                      <td>Product Line</td>
                      <td>{{ purchasing.productLine }}</td>
                    </tr>
                    <tr>
                      <td>Services</td>
                      <td>{{ purchasing.services }}</td>
                    </tr>
                    <tr>
                      <td>Contact Person</td>
                      <td>{{ contactPersonSelected.name }}</td>
                    </tr>
                    <tr>
                      <td>PO to be sent via</td>
                      <td>{{ poToBeSentSelected.name }}</td>
                    </tr>
                    <tr>
                      <td>Contact Details</td>
                      <td>{{ purchasing.contactDetails }}</td>
                    </tr>
                    <tr>
                      <td>Ordering Preferences</td>
                      <td>{{ purchasing.ordering }}</td>
                    </tr>
                    <tr>
                      <td>Delivery/Shipping Preferences</td>
                      <td>{{ purchasing.shipping }}</td>
                    </tr>
                    <tr>
                      <td>Documentation Preferences</td>
                      <td>{{ purchasing.documentation }}</td>
                    </tr>
                    <tr>
                      <td>Payment Preferences</td>
                      <td>{{ purchasing.payment }}</td>
                    </tr>
                  </tbody>
                </table>

                <h6 class="mt-5 ml-3 font-weight-bold">Attachments</h6>
                <table
                  class="table table-sm table-bordered table-hover table-striped"
                >
                  <thead>
                    <tr>
                      <th style="width: 20%">Filename</th>
                      <th style="width: 20%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="file in purchasingSelectedFile" :key="file.filename">
                      <td>{{ file.name }}</td>
                      <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                        <a class="btn btn-danger btn-sm px-13" @click="purchasingFileRemove(purchasingSelectedFile.indexOf(file))">Remove</a>
                        <a class="btn btn-secondary btn-sm ml-1"  @click="purchasingFilePreview(purchasingSelectedFile.indexOf(file))">Preview</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.Purchasing Review -->
            
            <!-- Accounting Review -->
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title">Accounting</h3>
  
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
                      <td>ATC</td>
                      <td style="width: 80%">{{ AccountATCSelected.atc }}</td>
                    </tr>
                    <tr>
                      <td>Nature of Income Payment</td>
                      <td>{{ AccountDescSelected }}</td>
                    </tr>
                    <tr>
                      <td>Tax Rate</td>
                      <td>{{ AccountRateSelected }}</td>
                    </tr>
                  </tbody>
                </table>

                <table class="table table-sm mt-5 table-bordered table-striped">
                  <thead>
                    <tr>
                      <th colspan="8" scope="col">
                        <aside class="d-flex align-items-center">
                          <span class="mb-1">Banking Information</span>
                        </aside>
                      </th>
                    </tr>
                    <tr>
                      <th scope="col" class="text-center">#</th>
                      <th scope="col">Bank Name</th>
                      <th scope="col">Bank Account Number</th>
                      <th scope="col">Bank Branch</th>
                      <th scope="col">Account Currency</th>
                      <th scope="col">Swift Code</th>
                      <th scope="col">Preferred Bank Account</th>
                      <th scope="col">Active</th>
                    </tr>
                  </thead>
      
                  <tbody style="font-size: 14px">
                    <tr v-for="(item, index) in accountingData" :key="item.id">
                      <td class="text-center">{{ index + 1 }}.</td>
                      <td>{{ item.bankName }}</td>
                      <td>{{ item.bankAcctNumber }}</td>
                      <td>{{ item.bankBranch }}</td>
                      <td>{{ item.bank_currency_name }}</td>
                      <td>{{ item.bankSwiftCode }}</td>
                      <td>{{ item.bankPreferred }}</td>
                      <td>checkbox here</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.Accounting Review -->

            <!-- Technical and Support Review -->
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title">Technical and Support</h3>
  
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
                      <td>Warranty Information</td>
                      <td style="width: 80%">{{ technical.warrantyNote }}</td>
                    </tr>
                    <tr>
                      <td>RMA Policy and Note</td>
                      <td style="width: 80%">{{ technical.policyNote }}</td>
                    </tr>
                  </tbody>
                </table>

                <h6 class="mt-5 ml-3 font-weight-bold">Attachments</h6>
                <table
                  class="table table-sm table-bordered table-hover table-striped"
                >
                  <thead>
                    <tr>
                      <th style="width: 20%">Filename</th>
                      <th style="width: 20%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="file in technicalSelectedFile" :key="file.filename">
                      <td>{{ file.name }}</td>
                      <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                        <a class="btn btn-danger btn-sm px-13" @click="technicalFileRemove(technicalSelectedFile.indexOf(file))">Remove</a>
                        <a class="btn btn-secondary btn-sm ml-1"  @click="technicalFilePreview(technicalSelectedFile.indexOf(file))">Preview</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.Technical and Support Review -->

            <!-- Related To Review -->
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title">Related To</h3>
  
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
                <table class="table table-sm table-bordered table-striped">
                  <thead>
                    <tr>
                      <th colspan="7" scope="col">
                        <aside class="d-flex align-items-center">
                          <span class="mb-1">Related Vendors</span>
                        </aside>
                      </th>
                    </tr>
                    <tr>
                      <th scope="col" class="text-center">#</th>
                      <th scope="col">Relationship</th>
                      <th scope="col">Vendor Code</th>
                      <th scope="col">Vendor Name</th>
                    </tr>
                  </thead>
      
                  <tbody style="font-size: 14px">
                    <tr v-for="(item, index) in relatedVendorData" :key="item.id">
                      <td class="text-center">{{ index + 1 }}.</td>
                      <td>{{ item.vendor_relationship_name }}</td>
                      <td>{{ item.vendor_code }}</td>
                      <td>{{ item.vendor_name }}</td>
                    </tr>
                  </tbody>
                </table>

                <table class="table table-sm mt-5 table-bordered table-striped">
                  <thead>
                    <tr>
                      <th colspan="7" scope="col">
                        <aside class="d-flex align-items-center">
                          <span class="mb-1">Related Customers</span>
                        </aside>
                      </th>
                    </tr>
                    <tr>
                      <th scope="col" class="text-center">#</th>
                      <th scope="col">Relationship</th>
                      <th scope="col">Customer Code</th>
                      <th scope="col">Customer Name</th>
                    </tr>
                  </thead>
      
                  <tbody style="font-size: 14px">
                    <tr v-for="(item, index) in relatedCustomerData" :key="item.id">
                      <td class="text-center">{{ index + 1 }}.</td>
                      <td>{{ item.customer_relationship_name }}</td>
                      <td>{{ item.customer_code }}</td>
                      <td>{{ item.customer_name }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.Related To Review -->
            
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
                <h6 class="mt-2 ml-3 font-weight-bold">Accomplished Vendor Information Sheet</h6>
                <table
                  class="table table-sm table-bordered table-hover table-striped"
                >
                  <thead>
                    <tr>
                      <th style="width: 20%">Filename</th>
                      <th style="width: 20%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="file in attachmentOneSelectedFile" :key="file.filename">
                      <td>{{ file.name }}</td>
                      <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                        <a class="btn btn-danger btn-sm px-13" @click="attachmentOneFileRemove(attachmentOneSelectedFile.indexOf(file))">Remove</a>
                        <a class="btn btn-secondary btn-sm ml-1"  @click="attachmentOneFilePreview(attachmentOneSelectedFile.indexOf(file))">Preview</a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h6 class="mt-5 ml-3 font-weight-bold">Business Registration</h6>
                <table
                  class="table table-sm table-bordered table-hover table-striped"
                >
                  <thead>
                    <tr>
                      <th style="width: 20%">Filename</th>
                      <th style="width: 20%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="file in attachmentTwoSelectedFile" :key="file.filename">
                      <td>{{ file.name }}</td>
                      <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                        <a class="btn btn-danger btn-sm px-13" @click="attachmentTwoFileRemove(attachmentTwoSelectedFile.indexOf(file))">Remove</a>
                        <a class="btn btn-secondary btn-sm ml-1"  @click="attachmentTwoFilePreview(attachmentTwoSelectedFile.indexOf(file))">Preview</a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h6 class="mt-5 ml-3 font-weight-bold">Updated Business Permit</h6>
                <table
                  class="table table-sm table-bordered table-hover table-striped"
                >
                  <thead>
                    <tr>
                      <th style="width: 20%">Filename</th>
                      <th style="width: 20%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="file in attachmentThreeSelectedFile" :key="file.filename">
                      <td>{{ file.name }}</td>
                      <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                        <a class="btn btn-danger btn-sm px-13" @click="attachmentThreeFileRemove(attachmentThreeSelectedFile.indexOf(file))">Remove</a>
                        <a class="btn btn-secondary btn-sm ml-1"  @click="attachmentThreeFilePreview(attachmentThreeSelectedFile.indexOf(file))">Preview</a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h6 class="mt-5 ml-3 font-weight-bold">BIR Certificate of Registration: BIR 2303 form</h6>
                <table
                  class="table table-sm table-bordered table-hover table-striped"
                >
                  <thead>
                    <tr>
                      <th style="width: 20%">Filename</th>
                      <th style="width: 20%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="file in attachmentFourSelectedFile" :key="file.filename">
                      <td>{{ file.name }}</td>
                      <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                        <a class="btn btn-danger btn-sm px-13" @click="attachmentFourFileRemove(attachmentFourSelectedFile.indexOf(file))">Remove</a>
                        <a class="btn btn-secondary btn-sm ml-1"  @click="attachmentFourFilePreview(attachmentFourSelectedFile.indexOf(file))">Preview</a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h6 class="mt-5 ml-3 font-weight-bold">Sample of Delivery Receipt, Sales Invoice, Official Receipt</h6>
                <table
                  class="table table-sm table-bordered table-hover table-striped"
                >
                  <thead>
                    <tr>
                      <th style="width: 20%">Filename</th>
                      <th style="width: 20%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="file in attachmentFiveSelectedFile" :key="file.filename">
                      <td>{{ file.name }}</td>
                      <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                        <a class="btn btn-danger btn-sm px-13" @click="attachmentFiveFileRemove(attachmentFiveSelectedFile.indexOf(file))">Remove</a>
                        <a class="btn btn-secondary btn-sm ml-1"  @click="attachmentFiveFilePreview(attachmentFiveSelectedFile.indexOf(file))">Preview</a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h6 class="mt-5 ml-3 font-weight-bold">Company/Business Profile</h6>
                <table
                  class="table table-sm table-bordered table-hover table-striped"
                >
                  <thead>
                    <tr>
                      <th style="width: 20%">Filename</th>
                      <th style="width: 20%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="file in attachmentSixSelectedFile" :key="file.filename">
                      <td>{{ file.name }}</td>
                      <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                        <a class="btn btn-danger btn-sm px-13" @click="attachmentSixFileRemove(attachmentSixSelectedFile.indexOf(file))">Remove</a>
                        <a class="btn btn-secondary btn-sm ml-1"  @click="attachmentSixFilePreview(attachmentSixSelectedFile.indexOf(file))">Preview</a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h6 class="mt-5 ml-3 font-weight-bold">Latest Audited Financial Statements</h6>
                <table
                  class="table table-sm table-bordered table-hover table-striped"
                >
                  <thead>
                    <tr>
                      <th style="width: 20%">Filename</th>
                      <th style="width: 20%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="file in attachmentSevenSelectedFile" :key="file.filename">
                      <td>{{ file.name }}</td>
                      <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                        <a class="btn btn-danger btn-sm px-13" @click="attachmentSevenFileRemove(attachmentSevenSelectedFile.indexOf(file))">Remove</a>
                        <a class="btn btn-secondary btn-sm ml-1"  @click="attachmentSevenFilePreview(attachmentSevenSelectedFile.indexOf(file))">Preview</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- ./Attachments Review -->

            <!-- Distribution and Agreement Review -->
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title">Distribution and Agreement</h3>
  
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
                <table class="table table-sm table-bordered table-striped">
                  <thead>
                    <tr>
                      <th colspan="6" scope="col">
                        <aside class="d-flex align-items-center">
                          <span class="mb-1">Sales Target</span>
                        </aside>
                      </th>
                    </tr>
                    <tr>
                      <th scope="col" class="text-center">#</th>
                      <th scope="col">Month Start</th>
                      <th scope="col">Month End</th>
                      <th scope="col">Annual Target</th>
                      <th scope="col">Currency</th>
                      <th scope="col">Total Order</th>
                    </tr>
                  </thead>
      
                  <tbody style="font-size: 14px">
                    <tr v-for="(item, index) in distributionAgreementData" :key="item.id">
                      <td class="text-center">{{ index + 1 }}.</td>
                      <td>{{ item.monthStart }}</td>
                      <td>{{ item.monthEnd }}</td>
                      <td>{{ item.annualTarget }}</td>
                      <td>{{ item.currency_name }}</td>
                      <td>{{ item.totalOrder }}</td>
                    </tr>
                  </tbody>
                </table>

                <h6 class="mt-5 ml-3 font-weight-bold">Agreement</h6>
                <table
                  class="table table-sm table-bordered table-hover table-striped"
                >
                  <thead>
                    <tr>
                      <th style="width: 20%">Filename</th>
                      <th style="width: 20%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="file in distributionOneSelectedFile" :key="file.filename">
                      <td>{{ file.name }}</td>
                      <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                        <a class="btn btn-danger btn-sm px-13" @click="distributionOneFileRemove(distributionOneSelectedFile.indexOf(file))">Remove</a>
                        <a class="btn btn-secondary btn-sm ml-1"  @click="distributionOneFilePreview(distributionOneSelectedFile.indexOf(file))">Preview</a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h6 class="mt-5 ml-3 font-weight-bold">NDA</h6>
                <table
                  class="table table-sm table-bordered table-hover table-striped"
                >
                  <thead>
                    <tr>
                      <th style="width: 20%">Filename</th>
                      <th style="width: 20%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="file in distributionTwoSelectedFile" :key="file.filename">
                      <td>{{ file.name }}</td>
                      <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                        <a class="btn btn-danger btn-sm px-13" @click="distributionTwoFileRemove(distributionTwoSelectedFile.indexOf(file))">Remove</a>
                        <a class="btn btn-secondary btn-sm ml-1"  @click="distributionTwoFilePreview(distributionTwoSelectedFile.indexOf(file))">Preview</a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h6 class="mt-5 ml-3 font-weight-bold">Distributor Certificate</h6>
                <table
                  class="table table-sm table-bordered table-hover table-striped"
                >
                  <thead>
                    <tr>
                      <th style="width: 20%">Filename</th>
                      <th style="width: 20%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="file in distributionThreeSelectedFile" :key="file.filename">
                      <td>{{ file.name }}</td>
                      <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                        <a class="btn btn-danger btn-sm px-13" @click="distributionThreeFileRemove(distributionThreeSelectedFile.indexOf(file))">Remove</a>
                        <a class="btn btn-secondary btn-sm ml-1"  @click="distributionThreeFilePreview(distributionThreeSelectedFile.indexOf(file))">Preview</a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h6 class="mt-5 ml-3 font-weight-bold">Other Attachments</h6>
                <table
                  class="table table-sm table-bordered table-hover table-striped"
                >
                  <thead>
                    <tr>
                      <th style="width: 20%">Filename</th>
                      <th style="width: 20%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="file in distributionFourSelectedFile" :key="file.filename">
                      <td>{{ file.name }}</td>
                      <td class="pl-2 pr-2 text-center d-flex justify-content-center align-items-center">
                        <a class="btn btn-danger btn-sm px-13" @click="distributionFourFileRemove(distributionFourSelectedFile.indexOf(file))">Remove</a>
                        <a class="btn btn-secondary btn-sm ml-1"  @click="distributionFourFilePreview(distributionFourSelectedFile.indexOf(file))">Preview</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.Distribution and Agreement Review -->
          </aside>
          <!-- / Form Review -->
  
          <!-- Modal Corporate Officer -->
          <div
            class="modal fade"
            id="modal-corporate-officer"
            data-backdrop="static"
            data-keyboard="false"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h6 class="modal-title">
                    <b>Corporate Officers</b>
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
                    <div class="col-md-6">
                      <div class="form-group">
                        <small><label for="reference">Prefix</label></small>
  
                        <model-list-select
                          :list="prefixesList"
                          v-model="prefixesSelected"
                          option-value="name"
                          option-text="name"
                          placeholder="select item"
                          style="padding: 9px"
                        >
                        </model-list-select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">First Name</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="business.firstName"
                        />
                      </div>
                    </div>
                  </div>
  
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Last Name</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="business.lastName"
                        />
                      </div>
                    </div>
  
                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Suffix</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="business.suffix"
                        />
                      </div>
                    </div>
                  </div>
  
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Designation</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="business.designation"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer justify-content-end">
                  <button
                    v-if="isButton"
                    type="button"
                    class="btn btn-success btn-sm"
                    @click="insertCorporateOfficers()"
                  >
                    insert
                  </button>
  
                  <button
                    v-else
                    type="button"
                    class="btn btn-success btn-sm"
                    @click="updateCorporateOfficers()"
                  >
                    Update
                  </button>
                </div>
              </div>
              <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
          </div>
          <!-- /. Modal Corporate Officer -->

          <!-- Modal Address -->
          <div
            class="modal fade"
            id="modal-address"
            data-backdrop="static"
            data-keyboard="false"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h6 class="modal-title">
                    <b>Address</b>
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
                    <div class="col-md-6">
                      <div class="form-group">
                        <small><label for="reference">Address Type</label></small>
  
                        <model-list-select
                          :list="addressTypeList"
                          v-model="addressTypeSelected"
                          option-value="name"
                          option-text="name"
                          placeholder="select item"
                          style="padding: 9px"
                        >
                        </model-list-select>
                        <small class="text-danger p-0 m-0" v-if="this.missingAddressType && attemptAddressModal">Please select type of address</small>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Business Hours</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="address.businessHours"
                        />
                        <small class="text-danger p-0 m-0" v-if="this.missingAddressBusinessHours && attemptAddressModal">Business Hours is required</small>
                      </div>
                    </div>
                  </div>
  
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Address Line</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="address.line1"
                        />
                        <small class="text-danger p-0 m-0" v-if="this.missingAddressLine1 && attemptAddressModal">Address Line is required</small>
                      </div>
                    </div>
                  </div>
  
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Address Line 2</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="address.line2"
                        />
                        <small class="text-danger p-0 m-0" v-if="this.missingAddressLine2 && attemptAddressModal">Address Line 2 is required</small>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">City</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="address.city"
                        />
                        <small class="text-danger p-0 m-0" v-if="this.missingAddressCity && attemptAddressModal">City is required</small>
                      </div>
                    </div>
  
                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Region/Province</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="address.province"
                        />
                        <small class="text-danger p-0 m-0" v-if="this.missingAddressProvince && attemptAddressModal">Region/Province is required</small>
                      </div>
                    </div>
                  </div>
  
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Zip Code</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="address.zipcode"
                        />
                        <small class="text-danger p-0 m-0" v-if="this.missingAddressZipCode && attemptAddressModal">Zip Code is required</small>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Country</label></small
                        >
                        <model-list-select
                          :list="countriesList"
                          v-model="countriesSelected"
                          option-value="name"
                          option-text="name"
                          placeholder="select item"
                          style="padding: 9px"
                        >
                        </model-list-select>
                        <small class="text-danger p-0 m-0" v-if="this.missingAddressCountry && attemptAddressModal">Please select a country</small>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="billingAddressCheckbox" v-model="address.preferredBilling">
                        <label class="form-check-label" for="billingAddressCheckbox">
                          Preferred Billing Address
                        </label>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="billingShippingCheckbox" v-model="address.preferredShipping">
                        <label class="form-check-label" for="billingShippingCheckbox">
                          Preferred Shipping Address
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <small><label for="purpose">Notes</label></small>
                        <textarea
                          class="form-control"
                          name="purpose"
                          id="purpose"
                          v-model.trim="address.notes"
                          rows="5"
                        ></textarea>
                        <small class="text-danger p-0 m-0" v-if="this.missingAddressNotes && attemptAddressModal">Notes is required</small>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="modal-footer justify-content-end">
                  <div v-if="isButton">
                    <button v-if="addressModalSpinner" class="btn-sm btn-success" type="button" disabled>
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span class="sr-only"></span> Inserting...
                    </button>

                    <button v-else type="button" class="btn btn-success btn-sm" @click="insertAddress()">Insert</button>
                  </div>

                  <div v-else>
                    <button v-if="addressModalSpinner" class="btn-sm btn-success" type="button" disabled>
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span class="sr-only"></span> Updating...
                    </button>

                    <button v-else type="button" class="btn btn-success btn-sm" @click="updateAddress()">Update</button>
                  </div>
                </div>
              </div>
              <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
          </div>
          <!-- /. Modal Address -->

           <!-- Modal Contact -->
           <div
            class="modal fade"
            id="modal-contact"
            data-backdrop="static"
            data-keyboard="false"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h6 class="modal-title">
                    <b>Contact</b>
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
                    <div class="col-md-6">
                      <div class="form-group">
                        <small><label for="reference">Prefix</label></small>
                        <model-list-select
                          :list="prefixesList"
                          v-model="contactPrefixesSelected"
                          option-value="name"
                          option-text="name"
                          placeholder="select item"
                          style="padding: 9px"
                        >
                        </model-list-select>
                        <small class="text-danger p-0 m-0" v-if="this.missingContactPrefix && attemptContactModal">Please select a prefix</small>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">First Name</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="contact.firstName"
                        />
                        <small class="text-danger p-0 m-0" v-if="this.missingContactFirstName && attemptContactModal">First name is required.</small>
                      </div>
                    </div>
                  </div>
  
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Last Name</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="contact.lastName"
                        />
                        <small class="text-danger p-0 m-0" v-if="this.missingContactLastName && attemptContactModal">Last name is required.</small>
                      </div>
                    </div>
  
                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Suffix</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="contact.suffix"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Nickname</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="contact.nickName"
                        />
                      </div>
                    </div>
  
                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Designation</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="contact.designation"
                        />
                        <small class="text-danger p-0 m-0" v-if="this.missingContactDesignation && attemptContactModal">Designation is required.</small>
                      </div>
                    </div>
                  </div>
  
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Department</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="contact.department"
                        />
                        <small class="text-danger p-0 m-0" v-if="this.missingContactDepartment && attemptContactModal">Department is required.</small>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Link to</label></small
                        >
                        <model-list-select
                          :list="contactLinkToList"
                          v-model="contactLinkToSelected"
                          option-value="code"
                          option-text="name"
                          placeholder="select item"
                          style="padding: 9px"
                        >
                        </model-list-select>
                        <small class="text-danger p-0 m-0" v-if="this.missingContactLinkTo && attemptContactModal">Please select a list.</small>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Work From</label></small
                        >
                        <model-list-select
                          :list="addressWorkFromList"
                          v-model="addressWorkFromSelected"
                          option-value="code"
                          option-text="name"
                          placeholder="select item"
                          style="padding: 9px"
                        >
                        </model-list-select>
                        <small class="text-danger p-0 m-0" v-if="this.missingContactWorkFrom && attemptContactModal">Please select a list.</small>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Mobile No.</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="contact.mobileNumber"
                        />
                        <small class="text-danger p-0 m-0" v-if="this.missingContactMobileNumber && attemptContactModal">Mobile Number is required.</small>
                      </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check" style="margin-top: 2.3rem;">
                          <input class="form-check-input" type="checkbox" value="" id="mobileNumberSubscribedCheckbox" v-model="contact.mobileNumberCheckbox">
                          <label class="form-check-label" for="mobileNumberSubscribedCheckbox">
                            Mobile No. Subscribed
                          </label>
                        </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Email Address</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="contact.email"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-check" style="margin-top: 2.3rem;">
                          <input class="form-check-input" type="checkbox" value="" id="emailAddressSubscribedCheckbox" v-model="contact.emailCheckbox">
                          <label class="form-check-label" for="emailAddressSubscribedCheckbox">
                            Email Address Subscribed
                          </label>
                        </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <small><label for="purpose">Notes</label></small>
                        <textarea
                          class="form-control"
                          name="purpose"
                          id="purpose"
                          v-model.trim="contact.notes"
                          rows="5"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="modal-footer justify-content-end">
                  <div v-if="isButton">
                    <button v-if="contactModalSpinner" class="btn-sm btn-success" type="button" disabled>
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span class="sr-only"></span> Inserting...
                    </button>

                    <button v-else type="button" class="btn btn-success btn-sm" @click="insertContact()">insert</button>
                  </div>

                  <div v-else>
                    <button v-if="contactModalSpinner" class="btn-sm btn-success" type="button" disabled>
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span class="sr-only"></span> Updating...
                    </button>

                    <button v-else type="button" class="btn btn-success btn-sm" @click="updateContact()">Update</button>
                  </div>
  
                </div>
              </div>
              <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
          </div>
          <!-- /. Modal Contact -->

          <!-- Modal Banking Information -->
          <div
            class="modal fade"
            id="modal-banking-info"
            data-backdrop="static"
            data-keyboard="false"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h6 class="modal-title">
                    <b>Banking Information</b>
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
                          ><label for="projectName">Bank Account Number</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="accounting.bankAcctNumber"
                        />
                      </div>
                    </div>
                  </div>
  
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <small><label for="reference">Bank Name</label></small>
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="accounting.bankName"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Bank Branch</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="accounting.bankBranch"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Account Currency</label></small
                        >
                        <model-list-select
                          :list="currenciesList"
                          v-model="AccountCurrenciesSelected"
                          option-value="code"
                          option-text="name"
                          placeholder="select item"
                          style="padding: 9px"
                        >
                        </model-list-select>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Swift Code</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="accounting.bankSwiftCode"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="bankPreferredCheckbox" v-model="accounting.bankPreferred">
                        <label class="form-check-label" for="bankPreferredCheckbox">
                          Preferred Bank Account
                        </label>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="modal-footer justify-content-end">
                  <button
                    v-if="isButton"
                    type="button"
                    class="btn btn-success btn-sm"
                    @click="insertBankInfo()"
                  >
                    insert
                  </button>
  
                  <button
                    v-else
                    type="button"
                    class="btn btn-success btn-sm"
                    @click="updateBankInfo()"
                  >
                    Update
                  </button>
                </div>
              </div>
              <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
          </div>
          <!-- /. Modal Banking Information -->

          <!-- Modal Related Vendors -->
          <div
            class="modal fade"
            id="modal-related-vendor"
            data-backdrop="static"
            data-keyboard="false"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h6 class="modal-title">
                    <b>Related Vendors</b>
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
                          ><label for="projectName">Relationship</label></small
                        >
                        <model-list-select
                          :list="relationshipList"
                          v-model="vendorRelationshipSelected"
                          option-value="code"
                          option-text="name"
                          placeholder="select item"
                          style="padding: 9px"
                        >
                        </model-list-select>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Vendor Code</label></small
                        >
                        <model-list-select
                          :list="relatedSupplierList"
                          v-model="relatedSupplierCodeSelected"
                          option-value="code"
                          option-text="code"
                          placeholder="select item"
                          style="padding: 9px"
                        >
                        </model-list-select>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Vendor Name</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="relatedSupplierNameSelected"
                          readonly
                        />
                        <input type="hidden" v-model="relatedSupplierIDSelected">
                      </div>
                    </div>
                  </div>

                </div>
                <div class="modal-footer justify-content-end">
                  <button
                    v-if="isButton"
                    type="button"
                    class="btn btn-success btn-sm"
                    @click="insertRelatedVendor()"
                  >
                    insert
                  </button>
  
                  <button
                    v-else
                    type="button"
                    class="btn btn-success btn-sm"
                    @click="updateRelatedVendor()"
                  >
                    Update
                  </button>
                </div>
              </div>
              <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
          </div>
          <!-- /. Modal Related Vendors -->

          <!-- Modal Related Customers -->
          <div
            class="modal fade"
            id="modal-related-customer"
            data-backdrop="static"
            data-keyboard="false"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h6 class="modal-title">
                    <b>Related Customers</b>
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
                          ><label for="projectName">Relationship</label></small
                        >
                        <model-list-select
                          :list="relationshipList"
                          v-model="customerRelationshipSelected"
                          option-value="code"
                          option-text="name"
                          placeholder="select item"
                          style="padding: 9px"
                        >
                        </model-list-select>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Customer Code</label></small
                        >
                        <model-list-select
                          :list="relatedCustomerList"
                          v-model="relatedCustomerCodeSelected"
                          option-value="code"
                          option-text="code"
                          placeholder="select item"
                          style="padding: 9px"
                        >
                        </model-list-select>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Customer Name</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="relatedCustomerNameSelected"
                          readonly
                        />
                        <input type="hidden" v-model="relatedCustomerIDSelected">
                      </div>
                    </div>
                  </div>

                </div>
                <div class="modal-footer justify-content-end">
                  <button
                    v-if="isButton"
                    type="button"
                    class="btn btn-success btn-sm"
                    @click="insertRelatedCustomer()"
                  >
                    insert
                  </button>
  
                  <button
                    v-else
                    type="button"
                    class="btn btn-success btn-sm"
                    @click="updateRelatedCustomer()"
                  >
                    Update
                  </button>
                </div>
              </div>
              <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
          </div>
          <!-- /. Modal Related Customers -->

          <!-- Modal Distribution and Agreement -->
          <div
            class="modal fade"
            id="modal-distribution-agreement"
            data-backdrop="static"
            data-keyboard="false"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h6 class="modal-title">
                    <b>Distribution and Agreement</b>
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
                          ><label for="projectName">Month Start</label></small
                        >
                        <date-picker
                          valueType="format"
                          style="display: block; width: 100%; line-height: 20px"
                          v-model="distribution.monthStart"
                        ></date-picker>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Month End</label></small
                        >
                        <date-picker
                          valueType="format"
                          style="display: block; width: 100%; line-height: 20px"
                          v-model="distribution.monthEnd"
                        ></date-picker>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Annual Target</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="distribution.annualTarget"
                        />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Currency</label></small
                        >
                        <model-list-select
                          :list="currenciesList"
                          v-model="distributionCurrenciesSelected"
                          option-value="code"
                          option-text="name"
                          placeholder="select item"
                          style="padding: 9px"
                        >
                        </model-list-select>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <small
                          ><label for="projectName">Total Order</label></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="distribution.totalOrder"
                        />
                      </div>
                    </div>
                  </div>

                </div>
                <div class="modal-footer justify-content-end">
                  <button
                    v-if="isButton"
                    type="button"
                    class="btn btn-success btn-sm"
                    @click="insertDistributionAgreement()"
                  >
                    insert
                  </button>
  
                  <button
                    v-else
                    type="button"
                    class="btn btn-success btn-sm"
                    @click="updateDistributionAgreement()"
                  >
                    Update
                  </button>
                </div>
              </div>
              <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
          </div>
          <!-- /. Modal Distribution and Agreement -->
  
          <!-- / Main Form -->
  
        
          
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
      this.isLoading = true

      await this.todaysDate();
      await this.veInitiate();
      this.isLoading = false
  
    },
    watch: {
      AccountATCSelected(newValue) {
        this.AccountDescSelected = newValue.description
        this.AccountRateSelected = newValue.rate
      },
      relatedSupplierCodeSelected(newValue) {
        this.relatedSupplierIDSelected = newValue.id
        this.relatedSupplierNameSelected = newValue.name
      },
      relatedCustomerCodeSelected(newValue) {
        this.relatedCustomerIDSelected = newValue.id
        this.relatedCustomerNameSelected = newValue.name
      },
      vendorSelected(newValue) {
        this.general.vendorTypeSelected = newValue.name
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
      classG() {
        return { active: this.counter >= 6 };
      },
      classH() {
        return { active: this.counter >= 7 };
      },
      classI() {
        return { active: this.counter >= 8 };
      },
      classZ() {
        return { active: this.counter >= 9 };
      },
  
      // Validation of General
      missingBusinessName() {
        if (this.general.businessName.length === 0) return true
        return false
      },
      missingGeneralVendorType() {
        if (this.vendorSelected.code === undefined) return true
        return false
      },
      missingGeneralPaymentTerms() {
        if (this.paymentTermsSelected.code === undefined) return true
        return false
      },
      missingGeneralCurrency() {
        if (this.currenciesSelected.code === undefined) return true
        return false
      },
      missingGeneralVATStatus() {
        if (this.businessTaxStatusSelected.code === undefined) return true
        return false
      },
      missingGeneralTinNumber() {
        if (this.general.tinNumber.length === 0) return true
        return false
      },

      //Validation of Address
      missingAddress() {
        if (this.addressData.length > 0) return true
        return false
      },
      missingContact() {
        if (this.contactData.length > 0) return true
        return false
      },
      missingAddressType() {
        if (this.addressTypeSelected.name === undefined) return true
        return false
      },
      missingAddressLine1() {
        if (this.address.line1.length === 0) return true
        return false
      },
      missingAddressLine2() {
        if (this.address.line2.length === 0) return true
        return false
      },
      missingAddressCity() {
        if (this.address.city.length === 0) return true
        return false
      },
      missingAddressProvince() {
        if (this.address.province.length === 0) return true
        return false
      },
      missingAddressZipCode() {
        if (this.address.zipcode.length === 0) return true
        return false
      },
      missingAddressCountry() {
        if (this.countriesSelected.name === undefined) return true
        return false
      },
      missingAddressBusinessHours() {
        if (this.address.businessHours.length === 0) return true
        return false
      },
      missingAddressNotes() {
        if (this.address.notes.length === 0) return true
        return false
      },

      //Validation of Contact
      missingContactPrefix() {
        if (this.contactPrefixesSelected.name === undefined) return true
        return false
      },
      missingContactFirstName() {
        if (this.contact.firstName.length === 0) return true
        return false
      },
      missingContactLastName() {
        if (this.contact.lastName.length === 0) return true
        return false
      },
      missingContactDesignation() {
        if (this.contact.designation.length === 0) return true
        return false
      },
      missingContactDepartment() {
        if (this.contact.department.length === 0) return true
        return false
      },
      missingContactLinkTo() {
        if (this.contactLinkToSelected.code === undefined) return true
        return false
      },
      missingContactWorkFrom() {
        if (this.addressWorkFromSelected.code === undefined) return true
        return false
      },
      missingContactMobileNumber() {
        if (this.contact.mobileNumber.length === 0) return true
        return false
      },
      
      //Validation of Accounting
      missingAccountingATC() {
        if (this.AccountATCSelected.code === undefined) return true
        return false
      },
      
    },
    data() {
      return {
        counter: 0,
        setIndex: 0,
        i: 0,
        isButton: true,
        requestDate: "",
        isLoading: false,
        isSpinner: false,

        draftID: "",
  
        attemptNext: false,
        attemptNextOne: false,
        attemptNextTwo: false,
        attemptNextThree: false,
        attemptNextFour: false,
        attemptNextFive: false,
        attemptNextSix: false,
        attemptNextSeven: false,
        attemptNextEight: false,
        
        attemptBusinessModal: false,
        attemptAddressModal: false,
        attemptContactModal: false,
        attemptAccountingModal: false,
        attemptRelatedVendorModal: false,
        attemptRelatedCustomerModal: false,
        attemptDistributionModal: false,

        addressModalSpinner: false,
        contactModalSpinner: false,
        
  
        // The Alert
        isAlert: false,
        header: "", // Syccess or Failed
        message: "", // added successfully
        type: "", // true or false
  
        // Logged User Data
        loggedUserId: localStorage.getItem("id"),
        loggedUserFirstName: localStorage.getItem("fname"),
        loggedUserLastName: localStorage.getItem("lname"),
        loggedUserDepartment: localStorage.getItem("department"),
        loggedUserPosition: localStorage.getItem("positionName"),
        companyId: localStorage.getItem("companyId"),
        companyName: localStorage.getItem("companyName"),

        // general
        vendorSelected: {},
        vendorList: [
          { code: 1, name: "Local" },
          { code: 2, name: "Foreign" }
        ],
        paymentTermsList : [],
        paymentTermsSelected : {},
        currenciesList : [],
        currenciesSelected : {},
        businessTaxStatusList : [],
        businessTaxStatusSelected : {},
        general: {
          businessName: '',
          website: '',
          inBusinessSince: '',
          creditLimit: '',
          lastUpdateBy: 'System Administrator',
          tinNumber: '',
          twentyThreeZeroThree: '',
          secNumber: '',
          notes: '',
          vendorTypeSelected: '',
        },

        // business 
        business: {
          authorizedCapitalStock : '',
          paidUpCapitalStock : '',
          notes : '',
          firstName : '',
          lastName : '',
          suffix : '',
          designation : '',
        },
        businessData : [],
        businessEditData : [],
        businessTypeList : [],
        businessTypeSelected : {},
        businessNatureList : [],
        businessNatureSelected : {},
        prefixesList : [],
        prefixesSelected : {},
        

        // Contact and Address 
        addressTypeSelected: {},
        addressTypeList: [
          { code: 1, name: "Home" },
          { code: 2, name: "Business" },
          { code: 3, name: "Billing" },
          { code: 4, name: "Shipping" },
          { code: 5, name: "Contract" },
          { code: 6, name: "AP Address" },
          { code: 7, name: "Recipient" },
        ],

        addressStatusSelected: {},
        addressStatusList: [
          { code: 1, name: "Active" },
          { code: 2, name: "Inactive" }
        ],

        addressWorkFromList : [],
        addressWorkFromSelected : {},

        countriesList : [],
        countriesSelected : {},

        address: {
          shortName : '',
          line1 : '',
          line2 : '',
          city : '',
          province : '',
          zipcode : '',
          country : '',
          businessHours : '',
          preferredBilling : '',
          preferredShipping : '',
          notes : '',
        },

        addressData : [],
        addressEditData : [],

        contactLinkToSelected: {},
        contactLinkToList: [
          { code: 1, name: "Sales" },
          { code: 2, name: "Technical" },
          { code: 3, name: "Accounting" },
          { code: 4, name: "Management" }
        ],

        contactStatusSelected: {},
        contactStatusList: [
          { code: 1, name: "Active" },
          { code: 2, name: "Inactive" }
        ],

        contactPrefixesSelected : {},
        contact: {
          firstName : '',
          lastName : '',
          suffix : '',
          nickName : '',
          designation : '',
          department : '',
          mobileNumber : '',
          email : '',
          mobileNumberCheckbox : '',
          emailCheckbox : '',
          notes : '',
        },

        contactData : [],
        contactEditData : [],

        //purchasing
        purchasing: {
          brand: '',
          productLine: '',
          services: '',
          sentVia: '',
          contactDetails: '',
          ordering: '',
          shipping: '',
          documentation: '',
          payment: '',
          notes: '',
        },
        poToBeSentSelected: {},
        poToBeSentList: [
          { code: 1, name: "Email" },
          { code: 2, name: "Fax" },
          { code: 3, name: "Viber" },
          { code: 4, name: "WhatsApp" },
          { code: 5, name: "WeChat" },
          { code: 6, name: "Others" }
        ],
        purchasingSelectedFile: [],
        purchasingFilespreview: [],

        contactPersonData : [],
        contactPersonSelected : {},

        // accounting
        AccountATCList : [],
        AccountATCSelected : {},
        AccountDescSelected : '',
        AccountRateSelected : '',
        AccountCurrenciesSelected : {},
        accountingData : [],
        accountingEditData : [],
        accounting: {
          bank : '',
          branch : '',
          contactPerson : '',
          telephoneNumber : '',
          bankName : '',
          bankAcctNumber : '',
          bankBranch : '',
          bankSwiftCode : '',
          bankPreferred : false,
        },

        //Technical and Support
        technical: {
          warrantyNote: '',
          policyNote: '',
          attachmentNote: '',
        },
        technicalSelectedFile: [],
        technicalFilespreview: [],
        
        // Related To
        relatedVendorData : [],
        relatedVendorEditData : [],

        relatedCustomerData : [],
        relatedCustomerEditData : [],

        relationshipList : [],
        vendorRelationshipSelected : {},
        customerRelationshipSelected : {},

        relatedSupplierList : [],
        relatedSupplierCodeSelected : {},
        relatedSupplierIDSelected : '',
        relatedSupplierNameSelected : '',

        relatedCustomerList : [],
        relatedCustomerCodeSelected : {},
        relatedCustomerIDSelected : '',
        relatedCustomerNameSelected : '',

        // Attachments
        attachmentOneSelectedFile: [],
        attachmentOneFilespreview: [],
        attachmentTwoSelectedFile: [],
        attachmentTwoFilespreview: [],
        attachmentThreeSelectedFile: [],
        attachmentThreeFilespreview: [],
        attachmentFourSelectedFile: [],
        attachmentFourFilespreview: [],
        attachmentFiveSelectedFile: [],
        attachmentFiveFilespreview: [],
        attachmentSixSelectedFile: [],
        attachmentSixFilespreview: [],
        attachmentSevenSelectedFile: [],
        attachmentSevenFilespreview: [],

        // Distribution and Agreement
        distribution: {
          monthStart : null,
          monthEnd : null,
          annualTarget : '',
          totalOrder : '',
          notes : '',
        },
        distributionCurrenciesSelected : {},
        distributionAgreementData : [],         
        distributionAgreementEditData : [],

        distributionOneSelectedFile: [],
        distributionOneFilespreview: [],
        distributionTwoSelectedFile: [],
        distributionTwoFilespreview: [],
        distributionThreeSelectedFile: [],
        distributionThreeFilespreview: [],
        distributionFourSelectedFile: [],
        distributionFourFilespreview: [],

      };
    },
  
    methods: {
      getPaymentTerms(){
        return axios.get(`http://127.0.0.1:8000/api/getBusinessTerms`);
      },
      getCurrencies(){
        return axios.get(`http://127.0.0.1:8000/api/getCurrencies`);
      },
      getBusinessTaxStatus(){
        return axios.get(`http://127.0.0.1:8000/api/getBusinessTaxStatus`);
      },
      getBusinessType(){
        return axios.get(`http://127.0.0.1:8000/api/getBusinessType`);
      },
      getBusinessNature(){
        return axios.get(`http://127.0.0.1:8000/api/getBusinessNature`);
      },
      getPrefixes(){
        return axios.get(`http://127.0.0.1:8000/api/getPrefixes`);
      },
      getCountries(){
        return axios.get(`http://127.0.0.1:8000/api/getCountries`);
      },
      getATC(){
        return axios.get(`http://127.0.0.1:8000/api/getATC`);
      },
      getRelationship(){
        return axios.get(`http://127.0.0.1:8000/api/getRelationship`);
      },
      getRelatedSupplier(){
        return axios.get(`http://127.0.0.1:8000/api/getRelatedSupplier`);
      },
      getRelatedCustomer(){
        return axios.get(`http://127.0.0.1:8000/api/getRelatedCustomer`);
      },
      getDraftVendorByUserID(){
        return axios.get(`http://127.0.0.1:8000/api/getDraftVendorByUserID/${this.loggedUserId}`);
      },

      async veInitiate() {
        await Promise.all([
          this.getPaymentTerms(), this.getCurrencies(), this.getBusinessTaxStatus(), this.getBusinessType(), this.getBusinessNature(), this.getPrefixes(), this.getCountries(), this.getATC(), this.getRelationship(), this.getRelatedSupplier(), this.getRelatedCustomer(), this.getDraftVendorByUserID()
        ])
        .then((results) => {
          const paymentTerms = results[0]
          const currencies = results[1]
          const businessTax = results[2]
          const businessType = results[3]
          const businessNature = results[4]
          const prefixes = results[5]
          const countries = results[6]
          const atc = results[7]
          const relationship = results[8]
          const relatedSupplier = results[9]
          const relatedCustomer = results[10]
          const draftVendor = results[11]

          let paymentTermsData = []
          for (const key in paymentTerms.data) {
            const request = {
              code: paymentTerms.data[key].id,
              name: paymentTerms.data[key].description,
            };
            paymentTermsData.push(request)
          }
          this.paymentTermsList = paymentTermsData

          let currenciesData = [];
          for (const key in currencies.data) {
            const request = {
              code: currencies.data[key].id,
              name: currencies.data[key].item,
            };
            currenciesData.push(request);
          }
          this.currenciesList = currenciesData

          let businessTaxStatusData = [];
          for (const key in businessTax.data) {
            const request = {
              code: businessTax.data[key].id,
              name: businessTax.data[key].vatcode,
            };
            businessTaxStatusData.push(request);
          }
          this.businessTaxStatusList = businessTaxStatusData

          let businessTypeData = [];
          for (const key in businessType.data) {
            const request = {
              code: businessType.data[key].ID,
              name: businessType.data[key].BusinessType,
            };
            businessTypeData.push(request);
          }
          this.businessTypeList = businessTypeData

          let businessNatureData = [];
          for (const key in businessNature.data) {
            const request = {
              code: businessNature.data[key].ID,
              name: businessNature.data[key].Nature,
            };
            businessNatureData.push(request);
          }
          this.businessNatureList = businessNatureData

          let prefixesData = [];
          for (const key in prefixes.data) {
            const request = {
              code: prefixes.data[key].item,
              name: prefixes.data[key].item,
            };
            prefixesData.push(request);
          }
          this.prefixesList = prefixesData

          let countriesData = [];
          for (const key in countries.data) {
            const request = {
              code: countries.data[key].id,
              name: countries.data[key].Description,
            };
            countriesData.push(request);
          }
          this.countriesList = countriesData

          let atcData = [];
          for (const key in atc.data) {
            const request = {
              code: atc.data[key].ID,
              description: atc.data[key].DESCRIPTION,
              atc: atc.data[key].ATC,
              rate: atc.data[key].RATE,
            };
            atcData.push(request);
          }
          this.AccountATCList = atcData

          let relationshipData = [];
          for (const key in relationship.data) {
            const request = {
              code: relationship.data[key].type,
              name: relationship.data[key].type
            };
            relationshipData.push(request);
          }
          this.relationshipList = relationshipData

          let relatedSupplierData = [];
          for (const key in relatedSupplier.data) {
            const request = {
              id: relatedSupplier.data[key].Business_Number,
              code: relatedSupplier.data[key].ACCOUNTNUMBER,
              name: relatedSupplier.data[key].business_fullname
            };
            relatedSupplierData.push(request);
          }
          this.relatedSupplierList = relatedSupplierData

          let relatedCustomerData = [];
          for (const key in relatedCustomer.data) {
            const request = {
              id: relatedCustomer.data[key].Business_Number,
              code: relatedCustomer.data[key].ACCOUNTNUMBER,
              name: relatedCustomer.data[key].business_fullname
            };
            relatedCustomerData.push(request);
          }
          this.relatedCustomerList = relatedCustomerData

          this.draftID = draftVendor.data.draftID

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

      // Step 2
      editCorporateOfficers(index) {
          this.isButton = false;
          const businessEditData = this.businessData[index];
          this.businessEditData = businessEditData;
          this.setIndex = index;

          this.business.firstName = businessEditData.firstName
          this.business.lastName = businessEditData.lastName
          this.business.suffix = businessEditData.suffix
          this.business.designation = businessEditData.designation
  
          this.prefixesSelected = {
              code: businessEditData.prefix_id,
              name: businessEditData.prefix_name,
          };
      },
      trashCorporateOfficers(index) {
          this.businessData.splice(index, 1);
      },
      updateCorporateOfficers() {
        this.resetAlert();

        const updateData = {
            id: this.businessEditData.id,
            prefix_name: this.prefixesSelected.name,
            prefix_id: this.prefixesSelected.code,
            firstName: this.business.firstName,
            lastName: this.business.lastName,
            suffix: this.business.suffix,
            designation: this.business.designation
        };

        this.businessData.push(updateData);
        this.businessEditData = "";
        this.businessData.splice(this.setIndex, 1);

        this.businessData.sort(function (a, b) {
            return a.id - b.id;
        });
        this.openToast("top-right", "success", "Corporate Officer has been updated!");
      },
      insertCorporateOfficers() {
        this.resetAlert();
        const addData = {
          id: this.i++,
          prefix_name: this.prefixesSelected.name,
          prefix_id: this.prefixesSelected.code,
          firstName: this.business.firstName,
          lastName: this.business.lastName,
          suffix: this.business.suffix,
          designation: this.business.designation
        };
        this.businessData.push(addData);
        this.clearCorporateOfficers()
        this.openToast("top-right", "success", "Corporate Officer has been added!");
      },
      clearCorporateOfficers() {
        this.prefixesSelected = {};
        this.business.firstName = "";
        this.business.lastName = "";
        this.business.suffix = "";
        this.business.designation = "";
      },
      //EO Step 2

      //Step3 
      async insertAddress() {
        this.attemptAddressModal = true
        this.addressModalSpinner = true
        this.resetAlert();

        const validated = this.validate_addressModal()
        if(validated) {
          this.attemptAddressModal = false
          const addData = {
            line1: this.address.line1,
            line2: this.address.line2,
            city: this.address.city,
            province: this.address.province,
            zipcode: this.address.zipcode,
            businessHours: this.address.businessHours,
            preferredBilling: this.address.preferredBilling == '' ? 'False' : 'True',
            preferredShipping: this.address.preferredShipping == '' ? 'False' : 'True',
            notes: this.address.notes,

            addressType_id: this.addressTypeSelected.code,
            addressType_name: this.addressTypeSelected.name,
            // addressStatus_id: this.addressStatusSelected.code,
            // addressStatus_name: this.addressStatusSelected.name,
            countries_id: this.countriesSelected.code,
            countries_name: this.countriesSelected.name,
            draftID: this.draftID,
            businessName: this.general.businessName,
          };

          try {
            const resp = await axios.post("http://127.0.0.1:8000/api/saveBusinessListDetail", addData);
            console.log(resp.data);
            this.getAddressByBusinessNumber(this.draftID)
            this.getAddressWorkFromByBusinessNumber(this.draftID)
            this.openToast("top-right", "success", "Address has been added!");
            this.addressModalSpinner = false
            this.clearAddress()
          } 
          catch (err) {
            console.error(err);
            this.openToast("top-right","error","Please Contact the administrator! and try again later");
            this.clearAddress()
          }
        }
        else {
          this.addAlert("Failed", "Please complete required fields!", "false");
          this.addressModalSpinner = false
        }
      },
      async trashAddress(index, id) {
        this.addressData.splice(index, 1);
        try {
          const resp = await axios.post("http://127.0.0.1:8000/api/deleteAddressByID", {id : id});
          console.log(resp.data);
          // this.openToast("top-right", "success", resp.data.message);
          
        } catch (err) {
          console.error(err);
          this.openToast("top-right","error","Please Contact the administrator! and try again later");
        }
      },
      editAddress(index) {
          this.isButton = false;
          const addressEditData = this.addressData[index];
          this.addressEditData = addressEditData;
          this.setIndex = index;

          this.address.line1 = addressEditData.address_line
          this.address.line2 = addressEditData.address_line2
          this.address.city = addressEditData.city
          this.address.province = addressEditData.province
          this.address.zipcode = addressEditData.zip
          this.address.country = addressEditData.country
          this.address.businessHours = addressEditData.business_hours
          this.address.preferredBilling = addressEditData.Preferred_Billing
          this.address.preferredShipping = addressEditData.Preferred_Shippping
          this.address.notes = addressEditData.Notes

          this.addressTypeSelected = {
              name: addressEditData.TypeOfAddress,
          };
          this.countriesSelected = {
              name: addressEditData.country,
          };
      },
      clearAddress() {
        this.address.shortName = '',
        this.address.line1 = '',
        this.address.line2 = '',
        this.address.city = '',
        this.address.province = '',
        this.address.zipcode = '',
        this.address.country = '',
        this.address.phoneNumber = '',
        this.address.email = '',
        this.address.fax = '',
        this.address.businessHours = '',
        this.address.preferredBilling = '',
        this.address.preferredShipping = '',
        this.address.notes = ''
        this.addressTypeSelected = {},
        this.addressStatusSelected = {},
        this.countriesSelected = {}
      },
      async updateAddress() {
        this.resetAlert();
        this.attemptAddressModal = true
        this.addressModalSpinner = true

        const validated = this.validate_addressModal()
        if(validated) {
          this.attemptAddressModal = false
          const updateData = {
            id: this.addressEditData.ID,
            line1: this.address.line1,
            line2: this.address.line2,
            city: this.address.city,
            province: this.address.province,
            zipcode: this.address.zipcode,
            businessHours: this.address.businessHours,
            preferredBilling: this.address.preferredBilling == '' ? 'False' : 'True',
            preferredShipping: this.address.preferredShipping == '' ? 'False' : 'True',
            notes: this.address.notes,

            addressType_id: this.addressTypeSelected.code,
            addressType_name: this.addressTypeSelected.name,
            countries_id: this.countriesSelected.code,
            countries_name: this.countriesSelected.name,
            draftID: this.draftID,
          };

          try {
            const resp = await axios.post("http://127.0.0.1:8000/api/updateBusinessListDetail", updateData);
            console.log(resp.data);
            this.addressModalSpinner = false
            this.getAddressByBusinessNumber(this.draftID)
            this.openToast("top-right", "success", "Address has been updated!");
          } catch (err) {
            console.error(err);
            this.openToast("top-right","error","Please Contact the administrator! and try again later");
          }
        }
        else {
          this.addAlert("Failed", "Please complete required fields!", "false");
          this.addressModalSpinner = false
        }
      },  
      validate_addressModal() {
        if (!this.missingAddressType && !this.missingAddressLine1 && !this.missingAddressLine2 &&
          !this.missingAddressCity && !this.missingAddressProvince && !this.missingAddressZipCode && !this.missingAddressCountry &&
          !this.missingAddressBusinessHours && !this.missingAddressNotes
        ) { 
          return true
        }
        return false
      },

      async insertContact() {
        this.attemptContactModal = true
        this.contactModalSpinner = true
        this.resetAlert();

        const validated = this.validate_contactModal()
        if(validated) {
          this.attemptContactModal = false
          const addData = {
            firstName: this.contact.firstName,
            lastName: this.contact.lastName,
            suffix: this.contact.suffix,
            nickName: this.contact.nickName,
            designation: this.contact.designation,
            department: this.contact.department,
            mobileNumber: this.contact.mobileNumber,
            email: this.contact.email,
            mobileNumberCheckbox: this.contact.mobileNumberCheckbox == '' ? 'False' : 'True',
            emailCheckbox: this.contact.emailCheckbox == '' ? 'False' : 'True',
            notes: this.contact.notes,
            prefix_name: this.contactPrefixesSelected.name,
            linkTo_id: this.contactLinkToSelected.code,
            linkTo_name: this.contactLinkToSelected.name,
            worksFromID: this.addressWorkFromSelected.code,
            worksFromName: this.addressWorkFromSelected.name,
            draftID: this.draftID,
          };
          // console.log(addData);
          try {
            const resp = await axios.post("http://127.0.0.1:8000/api/saveBusinessContacts", addData);
            console.log(resp.data);
            this.getContactsByBusinessNumber(this.draftID)
            this.clearContact()
            this.contactModalSpinner = false
            this.openToast("top-right", "success", "Contact has been added!");
          } 
          catch (err) {
            console.error(err);
            this.openToast("top-right","error","Please Contact the administrator! and try again later");
          }
        }
        else {
          this.addAlert("Failed", "Please complete required fields!", "false");
          this.contactModalSpinner = false
        }
      },
      clearContact() {
        this.contact.firstName = ''
        this.contact.lastName = ''
        this.contact.suffix = ''
        this.contact.nickName = ''
        this.contact.designation = ''
        this.contact.department = ''
        this.contact.mobileNumber = ''
        this.contact.email = ''
        this.contact.mobileNumberCheckbox = ''
        this.contact.emailCheckbox = ''
        this.contact.notes = ''
        this.contactPrefixesSelected = {}
        this.contactStatusSelected = {}
        this.contactLinkToSelected = {}
      },
      async trashContact(index, id) {
        this.contactData.splice(index, 1);
        console.log(id);
        try {
          const resp = await axios.post("http://127.0.0.1:8000/api/deleteContactByID", {id : id});
          console.log(resp.data);
          // this.openToast("top-right", "success", resp.data.message);
          
        } catch (err) {
          console.error(err);
          this.openToast("top-right","error","Please Contact the administrator! and try again later");
        }
      },
      editContact(index) {
          this.isButton = false
          const contactEditData = this.contactData[index]
          this.contactEditData = contactEditData
          this.setIndex = index

          console.log(this.contactEditData)

          this.contact.firstName = this.contactEditData.FirstName
          this.contact.lastName = this.contactEditData.LastName
          this.contact.suffix = this.contactEditData.Suffix
          this.contact.nickName = this.contactEditData.nickname
          this.contact.designation = this.contactEditData.Position
          this.contact.department = this.contactEditData.Department
          this.contact.mobileNumber = this.contactEditData.Number
          this.contact.email = this.contactEditData.EmailAdd
          this.contact.mobileNumberCheckbox = this.contactEditData.MobileNoSubs
          this.contact.emailCheckbox = this.contactEditData.EmailAddsSubs
          this.contact.notes = this.contactEditData.Remarks

          this.contactPrefixesSelected = {
            name: this.contactEditData.Prefix
          };
      },
      async updateContact() {
        this.attemptContactModal = true
        this.contactModalSpinner = true
        this.resetAlert();

        const validated = this.validate_contactModal()
        if(validated) {
          this.attemptContactModal = false
          const updateData = {
            id: this.contactEditData.ID,
            firstName: this.contact.firstName,
            lastName: this.contact.lastName,
            suffix: this.contact.suffix,
            nickName: this.contact.nickName,
            designation: this.contact.designation,
            department: this.contact.department,
            mobileNumber: this.contact.mobileNumber,
            email: this.contact.email,
            mobileNumberCheckbox: this.contact.mobileNumberCheckbox == '' ? 'False' : 'True',
            emailCheckbox: this.contact.emailCheckbox == '' ? 'False' : 'True',
            notes: this.contact.notes,
            // prefix_id: this.contactPrefixesSelected.code,
            prefix_name: this.contactPrefixesSelected.name,
            linkTo_id: this.contactLinkToSelected.code,
            linkTo_name: this.contactLinkToSelected.name,
            // status_id: this.contactStatusSelected.code,
            // status_name: this.contactStatusSelected.name,
            worksFromID: this.addressWorkFromSelected.code,
            worksFromName: this.addressWorkFromSelected.name,
            draftID: this.draftID,
          };

          try {
            const resp = await axios.post("http://127.0.0.1:8000/api/updateContact", updateData);
            console.log(resp.data);
            this.getContactsByBusinessNumber(this.draftID)
            this.contactModalSpinner = false
            this.openToast("top-right", "success", "Contact has been updated.");
          } catch (err) {
            console.error(err);
            this.openToast("top-right","error","Please Contact the administrator! and try again later");
          }
        }
        else {
          this.addAlert("Failed", "Please complete required fields!", "false");
          this.contactModalSpinner = false
        }
      },
      validate_contactModal() {
        if (!this.missingContactPrefix && !this.missingContactFirstName && !this.missingContactLastName && !this.missingContactDesignation &&
         !this.missingContactDepartment && !this.missingContactLinkTo && !this.missingContactWorkFrom && !this.missingContactMobileNumber
        ) { 
          return true
        }
        return false
      },
      //EO Step3

      //Step 4 
      purchasingFileOnFileSelected(event) {
        let selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.purchasingSelectedFile.push(selectedFiles[i]);
        }
        this.purchasingFilePreviews();
      },
      purchasingFileOnInputChange(event) {
        let selectedFiles = event.dataTransfer.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.purchasingSelectedFile.push(selectedFiles[i]);
        }
        this.purchasingFilePreviews();
      },
      purchasingFileRemove(i) {
        this.purchasingSelectedFile.splice(i, 1);
        this.purchasingFilePreviews();
      },
      purchasingFilePreview(i) {
        const url = this.purchasingFilespreview[i].link;
        window.open(url, "_blank", "resizable=yes");
      },
      purchasingFileDrop(event) {
        event.preventDefault();
        this.onInputChange(event); // Trigger the onChange event manually

        // Clean up
        event.currentTarget.classList.add("bg-light");
        event.currentTarget.classList.remove("bg-white");
      },
      purchasingFilePreviews() {
        let files = this.purchasingSelectedFile;
        const fileContainer = [];
        for (let i = 0; i < files.length; i++) {
          let tmppath = URL.createObjectURL(files[i]);
          const thisFiles = {
            link: tmppath,
          };
          fileContainer.push(thisFiles);
        }
        this.purchasingFilespreview = fileContainer;
      },
      //EO Step 4

      //Step 5
      insertBankInfo() { 
        this.resetAlert();
        const addData = {
          id: this.i++,
          bankName: this.accounting.bankName,
          bankAcctNumber: this.accounting.bankAcctNumber,
          bankBranch: this.accounting.bankBranch,
          bankSwiftCode: this.accounting.bankSwiftCode,
          bankPreferred: this.accounting.bankPreferred,
          bank_currency_code: this.AccountCurrenciesSelected.code,
          bank_currency_name: this.AccountCurrenciesSelected.name,
        };
        this.accountingData.push(addData);
        this.openToast("top-right", "success", "bank has been added!");
        this.clearBankInfo()
      },
      editBankInfo(index) {
          this.isButton = false;
          const accountingEditData = this.accountingData[index];
          this.accountingEditData = accountingEditData;
          this.setIndex = index;

          this.accounting.bankName = accountingEditData.bankName
          this.accounting.bankAcctNumber = accountingEditData.bankAcctNumber
          this.accounting.bankBranch = accountingEditData.bankBranch
          this.accounting.bankSwiftCode = accountingEditData.bankSwiftCode
          this.accounting.bankPreferred = accountingEditData.bankPreferred
  
          this.AccountCurrenciesSelected = {
              code: accountingEditData.bank_currency_code,
              name: accountingEditData.bank_currency_name,
          };
      },
      clearBankInfo() {
        this.AccountCurrenciesSelected = {};
        this.accounting.bankName = "";
        this.accounting.bankAcctNumber = "";
        this.accounting.bankBranch = "";
        this.accounting.bankSwiftCode = "";
        this.accounting.bankPreferred = false;
      },
      trashBankInfo(index) {
          this.accountingData.splice(index, 1);
      },
      updateBankInfo() {
        this.resetAlert();

        const updateData = {
          id: this.accountingEditData.id,
          bankName: this.accounting.bankName,
          bankAcctNumber: this.accounting.bankAcctNumber,
          bankBranch: this.accounting.bankBranch,
          bankSwiftCode: this.accounting.bankSwiftCode,
          bankPreferred: this.accounting.bankPreferred,
          bank_currency_code: this.AccountCurrenciesSelected.code,
          bank_currency_name: this.AccountCurrenciesSelected.name,
        };

        this.accountingData.push(updateData);
        this.accountingEditData = "";
        this.accountingData.splice(this.setIndex, 1);

        this.accountingData.sort(function (a, b) {
            return a.id - b.id;
        });
        this.openToast("top-right", "success", "bank has been updated!");
      },
      // EO Step 5

      //Step 6
      technicalFileOnFileSelected(event) {
        let selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.technicalSelectedFile.push(selectedFiles[i]);
        }
        this.technicalFilePreviews();
      },
      technicalFileOnInputChange(event) {
        let selectedFiles = event.dataTransfer.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.technicalSelectedFile.push(selectedFiles[i]);
        }
        this.technicalFilePreviews();
      },
      technicalFileRemove(i) {
        this.technicalSelectedFile.splice(i, 1);
        this.technicalFilePreviews();
      },
      technicalFilePreview(i) {
        const url = this.technicalFilespreview[i].link;
        window.open(url, "_blank", "resizable=yes");
      },
      technicalFileDrop(event) {
        event.preventDefault();
        this.onInputChange(event); // Trigger the onChange event manually

        // Clean up
        event.currentTarget.classList.add("bg-light");
        event.currentTarget.classList.remove("bg-white");
      },
      technicalFilePreviews() {
        let files = this.technicalSelectedFile;
        const fileContainer = [];
        for (let i = 0; i < files.length; i++) {
          let tmppath = URL.createObjectURL(files[i]);
          const thisFiles = {
            link: tmppath,
          };
          fileContainer.push(thisFiles);
        }
        this.technicalFilespreview = fileContainer;
      },
      //EO Step 6

      //Step 7
      insertRelatedVendor() {
        this.resetAlert();
        const addData = {
            id: this.i++,
            vendor_relationship_code: this.vendorRelationshipSelected.code,
            vendor_relationship_name: this.vendorRelationshipSelected.name,
            vendor_code: this.relatedSupplierCodeSelected.code,
            vendor_id: this.relatedSupplierCodeSelected.id, //id is came from the vendor_code
            vendor_name: this.relatedSupplierCodeSelected.name,
        };
        this.openToast("top-right", "success", "Vendor has been added!");
        this.relatedVendorData.push(addData);
        this.clearRelatedVendor()
      },
      editRelatedVendor(index) {
          this.isButton = false;
          const relatedVendorEditData = this.relatedVendorData[index];
          this.relatedVendorEditData = relatedVendorEditData;
          this.setIndex = index;
  
          this.vendorRelationshipSelected = {
              code: relatedVendorEditData.vendor_relationship_code,
              name: relatedVendorEditData.vendor_relationship_name,
          };
          this.relatedSupplierCodeSelected = {
              code: relatedVendorEditData.vendor_code,
              name: relatedVendorEditData.vendor_name,
          };
      },
      updateRelatedVendor() {
          this.resetAlert();

          const updateData = {
              id: this.relatedVendorEditData.id,
              vendor_relationship_code: this.vendorRelationshipSelected.code,
              vendor_relationship_name: this.vendorRelationshipSelected.name,
              vendor_code: this.relatedSupplierCodeSelected.code,
              vendor_name: this.relatedSupplierCodeSelected.name,
          };

          this.relatedVendorData.push(updateData);
          this.relatedVendorEditData = "";
          this.relatedVendorData.splice(this.setIndex, 1);

          this.relatedVendorData.sort(function (a, b) {
              return a.id - b.id;
          });
          this.openToast("top-right", "success", "Vendor has been updated!");
      },
      clearRelatedVendor() {
        this.vendorRelationshipSelected = {};
        this.relatedSupplierCodeSelected = {};
      },
      trashRelatedVendor(index) {
          this.relatedVendorData.splice(index, 1);
      },

      insertRelatedCustomer() {
        this.resetAlert();
        const addData = {
            id: this.i++,
            customer_relationship_code: this.customerRelationshipSelected.code,
            customer_relationship_name: this.customerRelationshipSelected.name,
            customer_code: this.relatedCustomerCodeSelected.code,
            customer_id: this.relatedCustomerCodeSelected.id,
            customer_name: this.relatedCustomerCodeSelected.name,
        };
        this.openToast("top-right", "success", "Customer has been added!");
        this.relatedCustomerData.push(addData);
        this.clearRelatedCustomer()
      },
      updateRelatedCustomer() {
          this.resetAlert();
          const updateData = {
              id: this.relatedCustomerEditData.id,
              customer_relationship_code: this.customerRelationshipSelected.code,
              customer_relationship_name: this.customerRelationshipSelected.name,
              customer_code: this.relatedCustomerCodeSelected.code,
              customer_name: this.relatedCustomerCodeSelected.name,
          };

          this.relatedCustomerData.push(updateData);
          this.relatedCustomerEditData = "";
          this.relatedCustomerData.splice(this.setIndex, 1);

          this.relatedCustomerData.sort(function (a, b) {
              return a.id - b.id;
          });
          this.clearRelatedVendor()
          this.openToast("top-right", "success", "Customer has been updated!");
      },
      clearRelatedCustomer() {
        this.customerRelationshipSelected = {};
        this.relatedCustomerCodeSelected = {};
      },
      trashRelatedCustomer(index) {
          this.relatedCustomerData.splice(index, 1);
      },
      editRelatedCustomer(index) {
          this.isButton = false;
          const relatedCustomerEditData = this.relatedCustomerData[index];
          this.relatedCustomerEditData = relatedCustomerEditData;
          this.setIndex = index;
  
          this.customerRelationshipSelected = {
              code: relatedCustomerEditData.customer_relationship_code,
              name: relatedCustomerEditData.customer_relationship_name,
          };
          this.relatedCustomerCodeSelected = {
              code: relatedCustomerEditData.customer_code,
              name: relatedCustomerEditData.customer_name,
          };
      },
      //EO Step 7

      // Step8 
      // 1. Accomplished Vendor Information Sheet
      attachmentOneFileOnFileSelected(event) {
        let selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.attachmentOneSelectedFile.push(selectedFiles[i]);
        }
        this.attachmentOneFilePreviews();
      },
      attachmentOneFileOnInputChange(event) {
        let selectedFiles = event.dataTransfer.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.attachmentOneSelectedFile.push(selectedFiles[i]);
        }
        this.attachmentOneFilePreviews();
      },
      attachmentOneFileRemove(i) {
        this.attachmentOneSelectedFile.splice(i, 1);
        this.attachmentOneFilePreviews();
      },
      attachmentOneFilePreview(i) {
        const url = this.attachmentOneFilespreview[i].link;
        window.open(url, "_blank", "resizable=yes");
      },
      attachmentOneFileDrop(event) {
        event.preventDefault();
        this.onInputChange(event); // Trigger the onChange event manually

        // Clean up
        event.currentTarget.classList.add("bg-light");
        event.currentTarget.classList.remove("bg-white");
      },
      attachmentOneFilePreviews() {
        let files = this.attachmentOneSelectedFile;
        const fileContainer = [];
        for (let i = 0; i < files.length; i++) {
          let tmppath = URL.createObjectURL(files[i]);
          const thisFiles = {
            link: tmppath,
          };
          fileContainer.push(thisFiles);
        }
        this.attachmentOneFilespreview = fileContainer;
      },

      // 2. Business Registration
      attachmentTwoFileOnFileSelected(event) {
        let selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.attachmentTwoSelectedFile.push(selectedFiles[i]);
        }
        this.attachmentTwoFilePreviews();
      },
      attachmentTwoFileOnInputChange(event) {
        let selectedFiles = event.dataTransfer.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.attachmentTwoSelectedFile.push(selectedFiles[i]);
        }
        this.attachmentTwoFilePreviews();
      },
      attachmentTwoFileRemove(i) {
        this.attachmentTwoSelectedFile.splice(i, 1);
        this.attachmentTwoFilePreviews();
      },
      attachmentTwoFilePreview(i) {
        const url = this.attachmentTwoFilespreview[i].link;
        window.open(url, "_blank", "resizable=yes");
      },
      attachmentTwoFileDrop(event) {
        event.preventDefault();
        this.onInputChange(event); // Trigger the onChange event manually

        // Clean up
        event.currentTarget.classList.add("bg-light");
        event.currentTarget.classList.remove("bg-white");
      },
      attachmentTwoFilePreviews() {
        let files = this.attachmentTwoSelectedFile;
        const fileContainer = [];
        for (let i = 0; i < files.length; i++) {
          let tmppath = URL.createObjectURL(files[i]);
          const thisFiles = {
            link: tmppath,
          };
          fileContainer.push(thisFiles);
        }
        this.attachmentTwoFilespreview = fileContainer;
      },

      // 3. Updated Business Permit
      attachmentThreeFileOnFileSelected(event) {
        let selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.attachmentThreeSelectedFile.push(selectedFiles[i]);
        }
        this.attachmentThreeFilePreviews();
      },
      attachmentThreeFileOnInputChange(event) {
        let selectedFiles = event.dataTransfer.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.attachmentThreeSelectedFile.push(selectedFiles[i]);
        }
        this.attachmentThreeFilePreviews();
      },
      attachmentThreeFileRemove(i) {
        this.attachmentThreeSelectedFile.splice(i, 1);
        this.attachmentThreeFilePreviews();
      },
      attachmentThreeFilePreview(i) {
        const url = this.attachmentThreeFilespreview[i].link;
        window.open(url, "_blank", "resizable=yes");
      },
      attachmentThreeFileDrop(event) {
        event.preventDefault();
        this.onInputChange(event); // Trigger the onChange event manually

        // Clean up
        event.currentTarget.classList.add("bg-light");
        event.currentTarget.classList.remove("bg-white");
      },
      attachmentThreeFilePreviews() {
        let files = this.attachmentThreeSelectedFile;
        const fileContainer = [];
        for (let i = 0; i < files.length; i++) {
          let tmppath = URL.createObjectURL(files[i]);
          const thisFiles = {
            link: tmppath,
          };
          fileContainer.push(thisFiles);
        }
        this.attachmentThreeFilespreview = fileContainer;
      },

      // 4. BIR Certificate of Registration: BIR 2303 form
      attachmentFourFileOnFileSelected(event) {
        let selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.attachmentFourSelectedFile.push(selectedFiles[i]);
        }
        this.attachmentFourFilePreviews();
      },
      attachmentFourFileOnInputChange(event) {
        let selectedFiles = event.dataTransfer.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.attachmentFourSelectedFile.push(selectedFiles[i]);
        }
        this.attachmentFourFilePreviews();
      },
      attachmentFourFileRemove(i) {
        this.attachmentFourSelectedFile.splice(i, 1);
        this.attachmentFourFilePreviews();
      },
      attachmentFourFilePreview(i) {
        const url = this.attachmentFourFilespreview[i].link;
        window.open(url, "_blank", "resizable=yes");
      },
      attachmentFourFileDrop(event) {
        event.preventDefault();
        this.onInputChange(event); // Trigger the onChange event manually

        // Clean up
        event.currentTarget.classList.add("bg-light");
        event.currentTarget.classList.remove("bg-white");
      },
      attachmentFourFilePreviews() {
        let files = this.attachmentFourSelectedFile;
        const fileContainer = [];
        for (let i = 0; i < files.length; i++) {
          let tmppath = URL.createObjectURL(files[i]);
          const thisFiles = {
            link: tmppath,
          };
          fileContainer.push(thisFiles);
        }
        this.attachmentFourFilespreview = fileContainer;
      },

      // 5. Sample of Delivery Receipt, Sales Invoice, Official Receipt
      attachmentFiveFileOnFileSelected(event) {
        let selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.attachmentFiveSelectedFile.push(selectedFiles[i]);
        }
        this.attachmentFiveFilePreviews();
      },
      attachmentFiveFileOnInputChange(event) {
        let selectedFiles = event.dataTransfer.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.attachmentFiveSelectedFile.push(selectedFiles[i]);
        }
        this.attachmentFiveFilePreviews();
      },
      attachmentFiveFileRemove(i) {
        this.attachmentFiveSelectedFile.splice(i, 1);
        this.attachmentFiveFilePreviews();
      },
      attachmentFiveFilePreview(i) {
        const url = this.attachmentFiveFilespreview[i].link;
        window.open(url, "_blank", "resizable=yes");
      },
      attachmentFiveFileDrop(event) {
        event.preventDefault();
        this.onInputChange(event); // Trigger the onChange event manually

        // Clean up
        event.currentTarget.classList.add("bg-light");
        event.currentTarget.classList.remove("bg-white");
      },
      attachmentFiveFilePreviews() {
        let files = this.attachmentFiveSelectedFile;
        const fileContainer = [];
        for (let i = 0; i < files.length; i++) {
          let tmppath = URL.createObjectURL(files[i]);
          const thisFiles = {
            link: tmppath,
          };
          fileContainer.push(thisFiles);
        }
        this.attachmentFiveFilespreview = fileContainer;
      },

      // 6. Company/Business Profile
      attachmentSixFileOnFileSelected(event) {
        let selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.attachmentSixSelectedFile.push(selectedFiles[i]);
        }
        this.attachmentSixFilePreviews();
      },
      attachmentSixFileOnInputChange(event) {
        let selectedFiles = event.dataTransfer.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.attachmentSixSelectedFile.push(selectedFiles[i]);
        }
        this.attachmentSixFilePreviews();
      },
      attachmentSixFileRemove(i) {
        this.attachmentSixSelectedFile.splice(i, 1);
        this.attachmentSixFilePreviews();
      },
      attachmentSixFilePreview(i) {
        const url = this.attachmentSixFilespreview[i].link;
        window.open(url, "_blank", "resizable=yes");
      },
      attachmentSixFileDrop(event) {
        event.preventDefault();
        this.onInputChange(event); // Trigger the onChange event manually

        // Clean up
        event.currentTarget.classList.add("bg-light");
        event.currentTarget.classList.remove("bg-white");
      },
      attachmentSixFilePreviews() {
        let files = this.attachmentSixSelectedFile;
        const fileContainer = [];
        for (let i = 0; i < files.length; i++) {
          let tmppath = URL.createObjectURL(files[i]);
          const thisFiles = {
            link: tmppath,
          };
          fileContainer.push(thisFiles);
        }
        this.attachmentSixFilespreview = fileContainer;
      },

      // 7. Latest Audited Financial Statements
      attachmentSevenFileOnFileSelected(event) {
        let selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.attachmentSevenSelectedFile.push(selectedFiles[i]);
        }
        this.attachmentSevenFilePreviews();
      },
      attachmentSevenFileOnInputChange(event) {
        let selectedFiles = event.dataTransfer.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.attachmentSevenSelectedFile.push(selectedFiles[i]);
        }
        this.attachmentSevenFilePreviews();
      },
      attachmentSevenFileRemove(i) {
        this.attachmentSevenSelectedFile.splice(i, 1);
        this.attachmentSevenFilePreviews();
      },
      attachmentSevenFilePreview(i) {
        const url = this.attachmentSevenFilespreview[i].link;
        window.open(url, "_blank", "resizable=yes");
      },
      attachmentSevenFileDrop(event) {
        event.preventDefault();
        this.onInputChange(event); // Trigger the onChange event manually

        // Clean up
        event.currentTarget.classList.add("bg-light");
        event.currentTarget.classList.remove("bg-white");
      },
      attachmentSevenFilePreviews() {
        let files = this.attachmentSevenSelectedFile;
        const fileContainer = [];
        for (let i = 0; i < files.length; i++) {
          let tmppath = URL.createObjectURL(files[i]);
          const thisFiles = {
            link: tmppath,
          };
          fileContainer.push(thisFiles);
        }
        this.attachmentSevenFilespreview = fileContainer;
      },
      // EO Step8

      // Step 9
      insertDistributionAgreement() {
        this.resetAlert();
        this.attemptDistributionModal = true

        this.attemptDistributionModal = false
        const addData = {
            id: this.i++,
            monthStart: this.distribution.monthStart,
            monthEnd: this.distribution.monthEnd,
            annualTarget: this.distribution.annualTarget,
            totalOrder: this.distribution.totalOrder,
            currency_code: this.distributionCurrenciesSelected.code,
            currency_name: this.distributionCurrenciesSelected.name,
        };
        this.openToast("top-right", "success", "Data has been added!");
        this.distributionAgreementData.push(addData);
        this.clearDistributionAgreement()
      },
      updateDistributionAgreement() {
        this.resetAlert();

        this.attemptDistributionModal = true

        this.attemptDistributionModal = false

        const updateData = {
            id: this.distributionAgreementEditData.id,
            monthStart: this.distribution.monthStart,
            monthEnd: this.distribution.monthEnd,
            annualTarget: this.distribution.annualTarget,
            totalOrder: this.distribution.totalOrder,
            currency_code: this.distributionCurrenciesSelected.code,
            currency_name: this.distributionCurrenciesSelected.name,
        };

        this.distributionAgreementData.push(updateData);
        this.distributionAgreementEditData = "";
        this.distributionAgreementData.splice(this.setIndex, 1);

        this.distributionAgreementData.sort(function (a, b) {
            return a.id - b.id;
        });
        this.openToast("top-right", "success", "Data has been added!");
      },
      editDistributionAgreement(index) {
          this.isButton = false;
          const distributionAgreementEditData = this.distributionAgreementData[index];
          this.distributionAgreementEditData = distributionAgreementEditData;
          this.setIndex = index;
  
          this.distributionCurrenciesSelected = {
              code: distributionAgreementEditData.currency_code,
              name: distributionAgreementEditData.currency_name,
          };
          this.distribution.monthStart = distributionAgreementEditData.monthStart
          this.distribution.monthEnd = distributionAgreementEditData.monthEnd
          this.distribution.annualTarget = distributionAgreementEditData.annualTarget
          this.distribution.totalOrder = distributionAgreementEditData.totalOrder
      },
      trashDistributionAgreement(index) {
          this.distributionAgreementData.splice(index, 1);
      },
      clearDistributionAgreement() {
        this.distributionCurrenciesSelected = {};
        this.distribution.monthStart = '';
        this.distribution.monthEnd = '';
        this.distribution.annualTarget = '';
        this.distribution.totalOrder = '';
      },

      // 1. Agreement
      distributionOneFileOnFileSelected(event) {
        let selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.distributionOneSelectedFile.push(selectedFiles[i]);
        }
        this.distributionOneFilePreviews();
      },
      distributionOneFileOnInputChange(event) {
        let selectedFiles = event.dataTransfer.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.distributionOneSelectedFile.push(selectedFiles[i]);
        }
        this.distributionOneFilePreviews();
      },
      distributionOneFileRemove(i) {
        this.distributionOneSelectedFile.splice(i, 1);
        this.distributionOneFilePreviews();
      },
      distributionOneFilePreview(i) {
        const url = this.distributionOneFilespreview[i].link;
        window.open(url, "_blank", "resizable=yes");
      },
      distributionOneFileDrop(event) {
        event.preventDefault();
        this.onInputChange(event); // Trigger the onChange event manually

        // Clean up
        event.currentTarget.classList.add("bg-light");
        event.currentTarget.classList.remove("bg-white");
      },
      distributionOneFilePreviews() {
        let files = this.distributionOneSelectedFile;
        const fileContainer = [];
        for (let i = 0; i < files.length; i++) {
          let tmppath = URL.createObjectURL(files[i]);
          const thisFiles = {
            link: tmppath,
          };
          fileContainer.push(thisFiles);
        }
        this.distributionOneFilespreview = fileContainer;
      },

      // 2. NDA
      distributionTwoFileOnFileSelected(event) {
        let selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.distributionTwoSelectedFile.push(selectedFiles[i]);
        }
        this.distributionTwoFilePreviews();
      },
      distributionTwoFileOnInputChange(event) {
        let selectedFiles = event.dataTransfer.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.distributionTwoSelectedFile.push(selectedFiles[i]);
        }
        this.distributionTwoFilePreviews();
      },
      distributionTwoFileRemove(i) {
        this.distributionTwoSelectedFile.splice(i, 1);
        this.distributionTwoFilePreviews();
      },
      distributionTwoFilePreview(i) {
        const url = this.distributionTwoFilespreview[i].link;
        window.open(url, "_blank", "resizable=yes");
      },
      distributionTwoFileDrop(event) {
        event.preventDefault();
        this.onInputChange(event); // Trigger the onChange event manually

        // Clean up
        event.currentTarget.classList.add("bg-light");
        event.currentTarget.classList.remove("bg-white");
      },
      distributionTwoFilePreviews() {
        let files = this.distributionTwoSelectedFile;
        const fileContainer = [];
        for (let i = 0; i < files.length; i++) {
          let tmppath = URL.createObjectURL(files[i]);
          const thisFiles = {
            link: tmppath,
          };
          fileContainer.push(thisFiles);
        }
        this.distributionTwoFilespreview = fileContainer;
      },

      // 3. Distributor Certificate
      distributionThreeFileOnFileSelected(event) {
        let selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.distributionThreeSelectedFile.push(selectedFiles[i]);
        }
        this.distributionThreeFilePreviews();
      },
      distributionThreeFileOnInputChange(event) {
        let selectedFiles = event.dataTransfer.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.distributionThreeSelectedFile.push(selectedFiles[i]);
        }
        this.distributionThreeFilePreviews();
      },
      distributionThreeFileRemove(i) {
        this.distributionThreeSelectedFile.splice(i, 1);
        this.distributionThreeFilePreviews();
      },
      distributionThreeFilePreview(i) {
        const url = this.distributionThreeFilespreview[i].link;
        window.open(url, "_blank", "resizable=yes");
      },
      distributionThreeFileDrop(event) {
        event.preventDefault();
        this.onInputChange(event); // Trigger the onChange event manually

        // Clean up
        event.currentTarget.classList.add("bg-light");
        event.currentTarget.classList.remove("bg-white");
      },
      distributionThreeFilePreviews() {
        let files = this.distributionThreeSelectedFile;
        const fileContainer = [];
        for (let i = 0; i < files.length; i++) {
          let tmppath = URL.createObjectURL(files[i]);
          const thisFiles = {
            link: tmppath,
          };
          fileContainer.push(thisFiles);
        }
        this.distributionThreeFilespreview = fileContainer;
      },

      // 4. Attachments
      distributionFourFileOnFileSelected(event) {
        let selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.distributionFourSelectedFile.push(selectedFiles[i]);
        }
        this.distributionFourFilePreviews();
      },
      distributionFourFileOnInputChange(event) {
        let selectedFiles = event.dataTransfer.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.distributionFourSelectedFile.push(selectedFiles[i]);
        }
        this.distributionFourFilePreviews();
      },
      distributionFourFileRemove(i) {
        this.distributionFourSelectedFile.splice(i, 1);
        this.distributionFourFilePreviews();
      },
      distributionFourFilePreview(i) {
        const url = this.distributionFourFilespreview[i].link;
        window.open(url, "_blank", "resizable=yes");
      },
      distributionFourFileDrop(event) {
        event.preventDefault();
        this.onInputChange(event); // Trigger the onChange event manually

        // Clean up
        event.currentTarget.classList.add("bg-light");
        event.currentTarget.classList.remove("bg-white");
      },
      distributionFourFilePreviews() {
        let files = this.distributionFourSelectedFile;
        const fileContainer = [];
        for (let i = 0; i < files.length; i++) {
          let tmppath = URL.createObjectURL(files[i]);
          const thisFiles = {
            link: tmppath,
          };
          fileContainer.push(thisFiles);
        }
        this.distributionFourFilespreview = fileContainer;
      },
      // EO Step 9 

    


      async getAddressByBusinessNumber(draftID) {
        const response = await fetch(
          `http://127.0.0.1:8000/api/getAddressByBusinessNumber/${draftID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const responseData = await response.json();
        this.addressData = responseData
      }, 
      async getAddressWorkFromByBusinessNumber(draftID) {
        const response = await fetch(
          `http://127.0.0.1:8000/api/getAddressWorkFromByBusinessNumber/${draftID}`,
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
          let workFromData = [];
          for (const key in responseData) {
            const request = {
              code: responseData[key].ID,
              name: responseData[key].workfrom
            };
            workFromData.push(request);
          }
          this.addressWorkFromList = workFromData
        }
      }, 
      async getContactsByBusinessNumber(draftID) {
        const response = await fetch(
          `http://127.0.0.1:8000/api/getContactsByBusinessNumber/${draftID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const responseData = await response.json();
        this.contactData = responseData
        this.purchasing.contactDetails = this.contactData[0].Number

        let contactName = [];
        for (const key in responseData) {
          const request = {
            code: responseData[key].ID,
            name: responseData[key].ContactName
          };
          contactName.push(request);
        }
        this.contactPersonData = contactName
      }, 

      // The Attachments 
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

      async submit() {
        this.isSpinner = true
        const businessListData = {
          draftID: this.draftID, //business number
          loggedUserId: this.loggedUserId, //user id
          companyId: this.companyId, //company id

          //table general.business_list
          //step 1
          businessName: this.general.businessName,
          website: this.general.website,
          vendorType: this.general.vendorTypeSelected,
          inBusinessSince: this.general.inBusinessSince,
          paymentTerms: this.paymentTermsSelected.name,
          creditLimit: this.general.creditLimit,
          currency: this.currenciesSelected.name,
          vatStatus: this.businessTaxStatusSelected.name,
          tinNumber: this.general.tinNumber,
          twentyThreeZeroThree: this.general.twentyThreeZeroThree,
          secNumber: this.general.secNumber,
          notes: this.general.notes,
          //step 2
          businessType: this.businessTypeSelected.name,
          businessNature: this.businessNatureSelected.name,
          authorizedCapitalStock: this.business.authorizedCapitalStock,
          paidCapitalStock: this.business.paidUpCapitalStock,
          descriptionLineOfBusiness: this.business.notes,
          //step 4
          contactPersonID: this.contactPersonSelected.code,
          contactPersonName: this.contactPersonSelected.name,
          poSentVia: this.poToBeSentSelected.name,
          orderingPreferences: this.purchasing.ordering,
          shippingPreferences: this.purchasing.shipping,
          documentationPreferences: this.purchasing.documentation,
          paymentPreferences: this.purchasing.payment,
          //step 5
          atc: this.AccountATCSelected.atc,
          //step 6
          warrantyInformation: this.technical.warrantyNote,
          rmaPolicy: this.technical.policyNote,

          //table general.business_officer - step 2
          businessOfficer: JSON.stringify(this.businessData),

          //table general.business_product_offered- step 4
          brand: this.purchasing.brand,
          productLine: this.purchasing.productLine,
          services: this.purchasing.services,

          // table general.business_bankinfo - step 5
          businessBankInfo: JSON.stringify(this.accountingData),
          
          //table general.business_ralated_vendor - step 7
          relatedVendor: JSON.stringify(this.relatedVendorData),

          //table general.business_ralated_customer - step 7
          relatedCustomer: JSON.stringify(this.relatedCustomerData),

          //table general.business_sales_target - step 9
          salesTarget: JSON.stringify(this.distributionAgreementData),

        };
        // console.log(businessListData);

        try {
          const resp = await axios.post("http://127.0.0.1:8000/api/saveBusinessList", businessListData);
          // console.log(resp.data);
          
          if(resp.data.status == "success") {
            this.insertVendorAttachments()
          }
          else {
            this.openToast("top-right","error","Please Contact the administrator! and try again later");
            this.isSpinner = false
          }
        } 
        catch (err) {
          console.error(err);
          this.openToast("top-right","error","Please Contact the administrator! and try again later");
          this.isSpinner = false
        }
      },

      // next() {
      //   this.counter++
      // },
      async insertVendorAttachments() {
        //save Purchasing attachment
        await this.saveVendorAttachments(this.purchasingSelectedFile, "purchasing")

        //save Technical and Support attachment
        await this.saveVendorAttachments(this.technicalSelectedFile, "technical_and_support")
        
        //save Accomplished Vendor Information Sheet attachment
        await this.saveVendorAttachments(this.attachmentOneSelectedFile, "accomplished_vendor_information_sheet")

        // save Business Registration attachment
        await this.saveVendorAttachments(this.attachmentTwoSelectedFile, "business_registration")
        
        //save Updated Business Permit attachment
        await this.saveVendorAttachments(this.attachmentThreeSelectedFile, "updated_business_permit")

        //save BIR Certificate of Registration: BIR 2303 form attachment
        await this.saveVendorAttachments(this.attachmentFourSelectedFile, "bir_certificate_of_registration")
        
        //save Sample of Delivery Receipt, Sales Invoice, Official Receipt attachment
        await this.saveVendorAttachments(this.attachmentFiveSelectedFile, "sample_of_delivery_receipt_sales_invoice_official_receipt")
        
        //save Company/Business Profile attachment
        await this.saveVendorAttachments(this.attachmentSixSelectedFile, "company_business_profile")
        
        //save Latest Audited Financial Statements attachment
        await this.saveVendorAttachments(this.attachmentSevenSelectedFile, "latest_audited_financial_statements")
        
        // save Agreement attachment
        await this.saveVendorAttachments(this.distributionOneSelectedFile, "agreement")
        
        // save NDA attachment
        await this.saveVendorAttachments(this.distributionTwoSelectedFile, "nda")
        
        // save Distributor Certificate attachment
        await this.saveVendorAttachments(this.distributionThreeSelectedFile, "distributor_certificate")
        
        // save Other Attachments attachment
        await this.saveVendorAttachments(this.distributionFourSelectedFile, "other_attachment")

        this.isSpinner = false
        this.openToast("top-right", "success", "Data has been saved");
        this.$router.push('/inprogress')
      },

      // saveAttachments
      async saveVendorAttachments(selectedFiles, category) {
        const fd = new FormData();

        for (let i = 0; i < selectedFiles.length; i++) {
          fd.append("file[]", selectedFiles[i]);
        }
        fd.append("draftID", this.draftID);
        fd.append("loggedUserId", this.loggedUserId);
        fd.append("companyId", this.companyId);
        fd.append("category", category);
        fd.append("formName", 'Vendor Master');

        try {
          const res = await axios.post("http://127.0.0.1:8000/api/saveVendorAttachment", fd);
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      },
      
      next() {
        if (this.counter === 0) {
          this.attemptNext = true;
        } else if (this.counter === 1) {
          // Step 2 is not required
        } else if (this.counter === 2) {
          // step 3
        } else if (this.counter === 3) {
          // step 4 is not required
        } else if (this.counter === 4) {
          this.attemptNext = false;
          this.attemptNextFour = true;
        } else if (this.counter === 5) {
          this.attemptNextFour = false
          // step 6 is not required
        } else if (this.counter === 6) {
          // step 7
        } else if (this.counter === 7) {
          // step 8 is not required
        } else if (this.counter === 8) {
          //Step 9 is not required
        }  else if (this.counter === 9) {
          //Step 10 form review
        }
        this.validateCurrentTab(this.counter);
      },
      validateCurrentTab(counter) {
        // General
        if (counter === 0) {
          if (
            !this.missingBusinessName && !this.missingGeneralVendorType && !this.missingGeneralPaymentTerms && !this.missingGeneralCurrency && !this.missingGeneralVATStatus && !this.missingGeneralTinNumber
          ) {
            this.counter++;
          }
        } 
        else if (counter === 1) {
          this.counter++;
          // Step 2 Business is Not Required
        } 
        else if (counter === 2) {
          if(!this.missingAddress || !this.missingContact) {
            this.openToast(
              "top-right",
              "warning",
              "Please add an address and contact"
            );
          }
          else {
            this.counter++
          }
        } 
        else if (counter === 3) { 
          this.counter++;
          // Step 4 Purchasing is Not Required
        }
        else if (counter === 4) {
          if ( !this.missingAccountingATC) {
              this.counter++
          }
        }
        else if (counter === 5) {
          this.counter++
          // Step 6 Technical and Support is not required
        }
        else if (counter === 6) {
          this.counter++
          // Step 7 Related To is not required
        }
        else if (counter === 7) {
          this.counter++
          // Step 8 Attachments is not required
        }
        else if (counter === 8) {
          this.counter++
          // Step 9 Distribution and Agreement is not required
        }
      },
      setButton() {
        this.isButton = true;
      },
      closeModal() {
        this.resetAlert();
        this.clearCorporateOfficers()
        this.clearAddress()
        this.clearContact()
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
      openToast(position, variant, message) {
        const toastTitle = variant.charAt(0).toUpperCase() + variant.slice(1);
        VsToast.show({
          title: `${toastTitle}`,
          message: `${message}`,
          variant,
          position,
        });
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
        this.requestDate = todaysDate;
      },
      
      formatNumber(n) {
      // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      formatCurrencyCreditLimit(input, blur) {
        let input_val = this.general.creditLimit;
        if (input_val === "") return
        let original_len = input_val.length;
        let caret_pos = input.target.selectionStart;

        if (input_val.indexOf(".") >= 0) {
          let decimal_pos = input_val.indexOf(".");
          let left_side = input_val.substring(0, decimal_pos);
          let right_side = input_val.substring(decimal_pos);
          left_side = this.formatNumber(left_side);
          right_side = this.formatNumber(right_side);
          if (blur === "blur") right_side += "00"
          right_side = right_side.substring(0, 2);
          input_val = left_side + "." + right_side;
        } 
        else {
          input_val = this.formatNumber(input_val);
          if (blur === "blur") input_val += ".00"
        }

        this.general.creditLimit = input_val;
        input.target.value = input_val;
        let realAmount = input_val;
        if (realAmount.indexOf(",") !== -1) {
          realAmount = realAmount.replace(/,/g, "");
        }
        console.log(realAmount);

        let updated_len = input_val.length;
        caret_pos = updated_len - original_len + caret_pos;
        input.target.setSelectionRange(caret_pos, caret_pos);
      },
      formatCurrencyACS(input, blur) {
        let input_val = this.business.authorizedCapitalStock;
        if (input_val === "") return
        let original_len = input_val.length;
        let caret_pos = input.target.selectionStart;

        if (input_val.indexOf(".") >= 0) {
          let decimal_pos = input_val.indexOf(".");
          let left_side = input_val.substring(0, decimal_pos);
          let right_side = input_val.substring(decimal_pos);
          left_side = this.formatNumber(left_side);
          right_side = this.formatNumber(right_side);
          if (blur === "blur") right_side += "00"
          right_side = right_side.substring(0, 2);
          input_val = left_side + "." + right_side;
        } 
        else {
          input_val = this.formatNumber(input_val);
          if (blur === "blur") input_val += ".00"
        }

        this.business.authorizedCapitalStock = input_val;
        input.target.value = input_val;
        let realAmount = input_val;
        if (realAmount.indexOf(",") !== -1) {
          realAmount = realAmount.replace(/,/g, "");
        }
        console.log(realAmount);

        let updated_len = input_val.length;
        caret_pos = updated_len - original_len + caret_pos;
        input.target.setSelectionRange(caret_pos, caret_pos);
      },
      formatCurrencyPCS(input, blur) {
        let input_val = this.business.paidUpCapitalStock;
        if (input_val === "") return
        let original_len = input_val.length;
        let caret_pos = input.target.selectionStart;

        if (input_val.indexOf(".") >= 0) {
          let decimal_pos = input_val.indexOf(".");
          let left_side = input_val.substring(0, decimal_pos);
          let right_side = input_val.substring(decimal_pos);
          left_side = this.formatNumber(left_side);
          right_side = this.formatNumber(right_side);
          if (blur === "blur") right_side += "00"
          right_side = right_side.substring(0, 2);
          input_val = left_side + "." + right_side;
        } 
        else {
          input_val = this.formatNumber(input_val);
          if (blur === "blur") input_val += ".00"
        }

        this.business.paidUpCapitalStock = input_val;
        input.target.value = input_val;
        let realAmount = input_val;
        if (realAmount.indexOf(",") !== -1) {
          realAmount = realAmount.replace(/,/g, "");
        }
        console.log(realAmount);

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
  
  #assetsFieldHandle, #assetsFieldHandle1, #assetsFieldHandle2, #assetsFieldHandle3, #assetsFieldHandle4, #assetsFieldHandle5, #assetsFieldHandle6, #assetsFieldHandle7 {
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
  .custom-modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
  }
  .custom-modal-content {
    margin: 20% auto;
    padding-left: 15px;
    padding-right: 15px;
    width: 25%;
    width: 100px;
    height: 100px;
  }
  </style>
  