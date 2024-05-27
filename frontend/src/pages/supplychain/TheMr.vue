<template>
  <body class="hold-transition sidebar-collapse layout-top-nav layout-fixed layout-navbar-fixed">
    <div class="wrapper">
      <!-- Top Navbar -->
      <nav
        class="main-header navbar navbar-expand-md navbar-light navbar-white"
      >
        <div class="container">
          <router-link to="/the-mrf" class="navbar-brand">
            <span class="brand-text font-weight-light">Material Request</span>
          </router-link>
          <!-- Right navbar links -->
          <ul class="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
            <li class="nav-item">
              <router-link to="/the-cart" class="nav-link">
                <i class="fas fa-shopping-cart"></i>
              </router-link>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-widget="control-sidebar"
                data-slide="true"
                href="#"
                role="button"
              >
                <i class="fas fa-user"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <!-- /.Top Navbar -->

      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
          <div class="container">
            <div class="row mb-2">
              <div class="col">
                <!-- <h1 class="m-0"> Top Navigation <small>Example 3.0</small></h1> -->
                <!-- <span>Sort By:</span> -->
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div>
          <!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        <div class="content">
          <div class="container pb-4">
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
                    >Request Form</span
                  ></small
                >
              </div>
              <div class="textbar" :class="classC">
                <small
                  ><span :class="classC" class="font-weight-bold"
                    >Attachments</span
                  ></small
                >
              </div>
              <div class="textbar" :class="classD">
                <small
                  ><span :class="classD" class="font-weight-bold"
                    >Form Review</span
                  ></small
                >
              </div>
            </div>
            <!-- / Step Numbers -->

            <!-- Checkout list -->
            <div class="card mt-4" v-if="counter === 0">
              <div class="card-header">
                <h3 class="card-title font-weight-bold">Requested Items</h3>

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
              <div class="card-body anyClass scroll-bar">
                <div
                  class="overlay"
                  style="background-color: white !important"
                  v-show="isLoading"
                >
                  <loading-spinner></loading-spinner>
                </div>
                
                <div class="card" v-for="cart in carts" :key="cart.id">
                  <div class="card-body card-split p2">
                    <div
                      class="d-flex justify-content-center align-items-center"
                    >
                      <img
                        src="./../../../public/dist/img/default-image.png"
                        style="
                          height: 150px;
                          width: 120px;
                          object-fit: contain;
                        " alt="" srcset="" class="p-0 m-0"
                      />
                    </div>

                    <div class="card-details-holder">
                      <h6>
                        <b>{{ cart.item_code }}</b>
                      </h6>
                      <p>{{ cart.specification }}</p>
                      <div class="card-detail-list">
                        <ul>
                          <li>
                            Item Code:<span>{{ cart.item_code }}</span>
                          </li>
                          <li>Category:<span>{{ cart.type }}</span></li>
                          <li>Sub Category:<span>{{ cart.group_description }}</span></li>
                          <li>
                            Brand:<span>{{ cart.brand }}</span>
                          </li>
                        </ul>

                        <ul>
                          <li>
                            UoM<span>{{ cart.cart_uom_name }}</span>
                          </li>
                          <li>
                            SKU<span>{{ cart.SKU }}</span>
                          </li>
                          <!-- <li>
                            PR Qty:<span>{{ cart.cart_quantity }}</span>
                          </li> -->
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.Checkout list -->

            <div class="card mt-4" v-if="counter === 1">
              <div class="card-header">
                <h3 class="card-title font-weight-bold">Request Form</h3>
              </div>
              <div class="card-body">
                <!-- Request Form -->
                <aside v-if="counter === 1">
                
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <small><label for="projectName">Class</label></small>
                        <model-list-select
                          :list="classList"
                          v-model="classSelected"
                          option-value="code"
                          option-text="name"
                          placeholder="select item"
                          style="padding: 9px"
                        >
                        </model-list-select>
                        <small
                          class="text-danger p-0 m-0"
                          v-if="missingClass && attemptNext"
                          >Class is required!</small
                        >
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <small><label for="clientName">Type </label></small>
                        <model-list-select
                          :list="TypeList"
                          v-model="TypeSelected"
                          option-value="code"
                          option-text="name"
                          placeholder="select item"
                          :style="isTypeDisabled"
                          :isDisabled="isTypeSelected === false"
                        >
                        </model-list-select>
                        <small
                          class="text-danger p-0 m-0"
                          v-if="missingType && attemptNext"
                          >Type is required!</small
                        >
                      </div>
                    </div>
                  </div>

                  <div class="row" v-if="isSuppliesRequestInternal">
                    <div class="col-md-12">
                      <div class="form-group">
                        <small><label for="clientName">Type of Supplies Request Internal </label></small>
                        <model-list-select
                          :list="processTypeList"
                          v-model="processType"
                          option-value="code"
                          option-text="name"
                          placeholder="select item"
                        >
                        </model-list-select>
                        <small
                          class="text-danger p-0 m-0"
                          v-if="missingProcessType && attemptNext"
                          >This field is required!</small
                        >
                      </div>
                    </div>
                  </div>

                  <div class="row">

                    <!-- if selected class is MRF  -->
                    <div class="col-md-3" >
                      <div class="form-group">
                        <small><label for="reference">{{ referenceNumber }} Number</label></small>
                        <input type="text" class="form-control form-control-sm py-3" id="reference" disabled :value="referenceNumber+ '-' +todaysYear"/>
                      </div>
                    </div>

                    <div class="col-md-3">
                      <div class="form-group">
                        <small
                          ><label for="requestedDate"
                            >Requested Date</label
                          ></small
                        >
                        <date-picker
                          disabled
                          valueType="format"
                          style="display: block; width: 100%; line-height: 20px"
                          v-model="requestedDate"
                        ></date-picker>
                      </div>
                    </div>

                    <div class="col-md-3">
                      <div class="form-group">
                        <small
                          ><label for="reportDateTime"
                            >Actual Delivery Date</label
                          ></small
                        >
                        <date-picker
                          v-model="actualDeliveryDate"
                          value-type="format"
                          style="display: block; width: 100%; line-height: 20px"
                        ></date-picker>
                        <small
                          class="text-danger p-0 m-0"
                          v-if="missingActualDeliveryDate && attemptNext"
                          >Actual Delivery Date is required!</small
                        >
                      </div>
                    </div>

                    <div class="col-md-3">
                      <div class="form-group">
                        <small
                          ><label for="reportDateTime"
                            >Planned Delivery Date</label
                          ></small
                        >
                        <date-picker
                          v-model="plannedDeliveryDate"
                          value-type="format"
                          style="display: block; width: 100%; line-height: 20px"
                        ></date-picker>
                        <small
                          class="text-danger p-0 m-0"
                          v-if="missingPlannedDeliveryDate && attemptNext"
                          >Planned Delivery Date is required!</small
                        >
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="employeeName"
                            >MRF Short Text</label
                          ></small
                        >
                        <input
                          type="text"
                          class="form-control form-control-sm py-3"
                          v-model="mrfShortText"
                        />
                        <small
                          class="text-danger p-0 m-0"
                          v-if="missingMrfShortText && attemptNext"
                          >MRF Short Text is required!</small
                        >
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label
                            for="reportingManager selextForm"
                            id="selextForm"
                            >Reporting Manager</label
                          ></small
                        >
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
                        <small
                          ><label for="projectName">Cost Center</label></small
                        >
                        <model-list-select
                          :list="project"
                          v-model="costCenter"
                          option-value="code"
                          option-text="name"
                          placeholder="select item"
                          style="padding: 9px"
                        >
                        </model-list-select>
                        <small
                          class="text-danger p-0 m-0"
                          v-if="missingCostCenter && attemptNext"
                          >Cost Center is required!</small
                        >
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <small
                          ><label for="clientName">Client Name</label></small
                        >
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
                        <small><label for="reason">Remarks</label></small>
                        <textarea
                          class="form-control"
                          name="purpose"
                          id="purpose"
                          v-model="remarks"
                          rows="5"
                        ></textarea>
                        <small
                          class="text-danger p-0 m-0"
                          v-if="missingRemarks && attemptNext"
                          >Remarks is required!</small
                        >
                      </div>
                    </div>
                  </div>
                </aside>
                <!-- / Request Form -->
              </div>
            </div>

            <!-- The Attachments -->
            <div v-if="this.counter === 2"
              class="
                position-relative
                mt-4
                text-center
              "
              id="app"
            >
            
                <div
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

                    <ul class="text-decoration-none ulUpload" v-cloak>
                      <li
                        class="text-sm mt-2"
                        v-for="file in selectedDBFile"
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
                </div>
            
            
            </div>
            <!-- / The Attachments -->

            <!-- Request Details Review -->
            <div v-if="counter === 3">
              <div class="custom-modal" v-show="isSpinner">
                <div class="custom-modal-content">
                  <loading-spinner></loading-spinner>
                </div>
              </div>

              <div class="card mt-4">
                <div class="card-header">
                  <h3 class="card-title font-weight-bold">Request Details</h3>

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
                  <table class="table table-sm table-hover">
                    <tbody>
                      <tr>
                        <td>MRF Number</td>
                        <td style="width: 70%">{{ referenceNumber+ '-' + todaysYear }}</td>
                      </tr>
                      <tr>
                        <td>Department</td>
                        <td>{{ loggedUserDepartment }}</td>
                      </tr>
                      <tr>
                        <td>Full Name</td>
                        <td>{{ loggedUserFullName }}</td>
                      </tr>
                      <tr>
                        <td>Reporting Manager</td>
                        <td>{{ reportingManagerItem.name }}</td>
                      </tr>
                      <tr>
                        <td>MRF Short Text</td>
                        <td>{{ mrfShortText }}</td>
                      </tr>
                      <tr>
                        <td>Date Requested</td>
                        <td>{{ requestedDate }}</td>
                      </tr>
                      <tr>
                        <td>Planned Delivery Date</td>
                        <td>{{ plannedDeliveryDate }}</td>
                      </tr>
                      <tr>
                        <td>Actual Delivery Date</td>
                        <td>{{ actualDeliveryDate }}</td>
                      </tr>
                      <tr>
                        <td>Cost Center</td>
                        <td>{{ costCenter.name }}</td>
                      </tr>
                      <tr>
                        <td>Client Name</td>
                        <td>{{ clientName }}</td>
                      </tr>
                      <tr>
                        <td>Materials Request Class</td>
                        <td>{{ classSelected.name }}</td>
                      </tr>
                      <tr>
                        <td>Materials Request Type</td>
                        <td>{{ TypeSelected.name }}</td>
                      </tr>
                      <tr>
                        <td>Remarks</td>
                        <td>{{ remarks }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>

              <!-- Request Form Review -->
              <div class="card mt-4">
                <div class="card-header">
                  <h3 class="card-title font-weight-bold">Requested Items</h3>

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
                <div class="card-body anyClass scroll-bar">
                  <!-- Checkout list -->
                  <!-- Request Details -->
                  <!-- Checkout loop -->
                  <div class="card" v-for="cart in carts" :key="cart.id">
                    <div class="card-body card-split p2">
                      <div
                        class="d-flex justify-content-center align-items-center"
                      >
                        <img
                          src="./../../../public/dist/img/default-image.png"
                          style="
                            height: 150px;
                            width: 120px;
                            object-fit: contain;
                          " alt="" srcset="" class="p-0 m-0"
                        />
                      </div>

                      <div class="card-details-holder">
                        <h6>
                          <b>{{ cart.item_code }}</b>
                        </h6>
                        <p>{{ cart.specification }}</p>
                        <div class="card-detail-list">
                          <ul>
                            <li>
                              Item Code:<span>{{ cart.item_code }}</span>
                            </li>
                            <li>Category:<span>{{ cart.type }}</span></li>
                            <li>Sub Category:<span>{{ cart.group_description }}</span></li>
                            <li>
                              Brand:<span>{{ cart.brand }}</span>
                            </li>
                          </ul>

                          <ul>
                            <li>
                              UoM<span>{{ cart.cart_uom_name }}</span>
                            </li>
                            <li>
                              SKU<span>{{ cart.SKU }}</span>
                            </li>
                            <li>
                              PR Qty:<span>{{ cart.cart_quantity }}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /.Checkout loop -->
                  <!-- /.Request Details -->
                  <!-- /.Checkout list -->
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.Request Form Review -->

              <!-- Attachments Review -->
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title font-weight-bold">Attachments</h3>

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
                      <tr v-for="file in selectedDBFile" :key="file.newFilename">
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
              <!-- /. Attachments Review -->
            </div>

            <!-- /.Request Details Review -->

            <!-- Checkout Footer -->
            <!-- Buttons -->
            <div
              class="
                row
                d-flex
                justify-content-between
                mt-3
                align-items-center
                flex-nowrap
                m-1
              "
            >
              <!-- go to cart or other page -->
              <button
                :disabled="isLoading"
                v-if="counter == 0"
                type="button"
                class="btn btn-secondary btn-sm"
                @click="back()"
              >
                <i class="fas fa-arrow-left mr-2"></i>
                Back
              </button>
              <button
                v-show="counter"
                type="button"
                @click="counter--"
                class="btn btn-secondary btn-sm"
              >
                <i class="fas fa-arrow-left mr-2"></i>
                Back
              </button>

              <button
                :disabled="isLoading"
                v-if="counter <= 2"
                type="button"
                @click="next()"
                class="btn ml-1 btn-primary btn-sm"
              >
                Next
                <i class="fas fa-arrow-right ml-2"></i>
              </button>

              <button
                :disabled="isSpinner"
                v-else
                type="button"
                class="btn ml-1 btn-primary btn-sm"
                @click="purchase()"
              >
                Submit
              </button>
            </div>
            <!-- / Buttons -->

            <!-- /.Checkout Footer -->
          </div>
        </div>
      </div>
      <!-- Control Sidebar -->
      <control-sidebar></control-sidebar>
      <!-- /.control-sidebar -->

      <!-- Main Footer -->
      <main-footer></main-footer>
      <!-- /.Main Footer -->
    </div>
  </body>
</template>

<script>
/*eslint-disable*/
import { ModelListSelect } from "vue-search-select";
import axios from "axios";
import VsToast from "@vuesimple/vs-toast";
import ControlSidebar from "../../components/layout/ControlSidebar.vue";
import MainFooter from "../../components/layout/MainFooter.vue";

export default {
  components: {
    ModelListSelect,
    ControlSidebar,
    MainFooter,
  },
  created() {
    this.carts();
    this.getReportingManager(this.loggedUserId);
    this.todaysDate();
    this.getProjects();
  },
  watch: {
    TypeSelected(newValue) {
      if(newValue.name == 'Supplies Request - Internal') return this.isSuppliesRequestInternal = true
      this.isSuppliesRequestInternal = false
    },
    classSelected(newValue) {
      if (!!newValue.code) {
        if (newValue.code >= 0 && newValue.code <= 3) {
          this.isTypeSelected = true;
          this.TypeSelected = {};

          if (newValue.code === 1) {
            this.TypeList = [
              { code: 1, name: "Material Request - Project", type: "Project", process_type: "Sales Order" },
              { code: 2, name: "Material Request - Delivery", type: "Delivery", process_type: "Sales Order" },
              { code: 3, name: "Material Request - Demo", type: "Demo", process_type: "Sales Order" },
              { code: 4, name: "Material Request - POC", type: "POC", process_type: "Sales Order" },
            ];
            this.referenceNumber = 'MRF'
          } else if (newValue.code === 2) {
            this.TypeList = [
              { code: 5, name: "Asset Request - Project", type: "Project", process_type: "Sales Order" },
              { code: 6, name: "Asset Request - Delivery", type: "Deliver", process_type: "Sales Order" },
              { code: 7, name: "Asset Request - Demo", type: "Demo", process_type: "Sales Order" },
              { code: 8, name: "Asset Request - POC", type: "POC", process_type: "Sales Order" },
              { code: 9, name: "Asset Request - Internal", type: "Stocking", process_type: "Internal Process" },
            ];
            this.referenceNumber = 'ARF'
          } else if (newValue.code === 3) {
            this.TypeList = [
              { code: 10, name: "Supplies Request - Project", type: "Project", process_type: "Sales Order" },
              { code: 11, name: "Supplies Request - Internal", type: "Stocking", process_type: "" },
            ];
            this.referenceNumber = 'SURF'
          }
        } else {
          this.TypeSelected = {};
          this.isTypeSelected = false;
          this.referenceNumber = 'RMA'
        }
      } else {
        this.TypeSelected = {};
        this.isTypeSelected = false;
      }
    },
    costCenter(newValue) {
      this.getClient(newValue.code);
      // this.getAttachments(1760);
      this.getAttachments(newValue.soid);
    },
  },
  computed: {
    isTypeDisabled() {
      if (this.classSelected.code >= 0 && this.classSelected.code <= 3) {
        return "padding: 9px";
      } else {
        return "padding: 9px; background-color: #e9ecef";
      }
    },
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
    missingMrfShortText() {
      if (this.mrfShortText === undefined || this.mrfShortText == "")
        return true;
      return false;
    },
    missingReportingManager() {
      if (this.reportingManagerItem.code === undefined) {
        return true;
      } else {
        return false;
      }
    },
    missingPlannedDeliveryDate() {
      if (
        this.plannedDeliveryDate === undefined ||
        this.plannedDeliveryDate == ""
      )
        return true;
      return false;
    },
    missingActualDeliveryDate() {
      if (
        this.actualDeliveryDate === undefined ||
        this.actualDeliveryDate == ""
      )
        return true;
      return false;
    },
    missingCostCenter() {
      if (this.costCenter.code === undefined || this.costCenter.code == "")
        return true;
      return false;
    },
    missingClientName() {
      if (this.clientName === undefined || this.clientName == "") return true;
      return false;
    },
    missingClass() {
      if (
        this.classSelected.code === undefined ||
        this.classSelected.code == ""
      )
        return true;
      return false;
    },
    missingType() {
      if (this.isTypeSelected === false) return false;
      else if (
        this.TypeSelected.code === undefined ||
        this.TypeSelected.code == ""
      )
        return true;
      return false;
    },
    missingRemarks() {
      if (this.remarks === undefined || this.remarks == "") return true;
      return false;
    },
    missingProcessType() {
      // if (this.remarks === undefined || this.remarks == "") return true;
      // return false;
      if(this.isSuppliesRequestInternal == true && this.processType == "" ) return true
      return false
    },
    todaysYear() {
      const today = new Date();
      const yyyy = today.getFullYear();
      return yyyy;
    },
  },
  data() {
    return {
      isSpinner : false,
      reportingManager: [],
      reportingManagerItem: {},
      mrfShortText: "",
      requestedDate: "",
      plannedDeliveryDate: "",
      actualDeliveryDate: "",
      costCenter: "",
      clientName: "",
      remarks: "",
      project: [],
      costCenter: {},
      classSelected: {},
      isSuppliesRequestInternal : false,
      TypeSelected: {},
      TypeList: [],
      isTypeSelected: false,
      // processType: '',
      processType: {},
      counter: 0,
      attemptNext: false,
      isLoading: false,
      cartList: [],
      selectedFile: [],
      selectedDBFile: [],
      referenceNumber : 'MRF',
      classList: [
        { code: 1, name: "Material Request" },
        { code: 2, name: "Asset Request" },
        { code: 3, name: "Supplies Request" },
        // { code: 4, name: "RMA Request" },
      ],
      processTypeList : [
        { code: 1, name: "Warehouse Supplies"},
        { code: 2, name: "Office Supplies"},
      ],

      // Logged User Data
      loggedUserId: localStorage.getItem("id"),
      employeeId: localStorage.getItem("employee_id"),
      loggedUserFirstName: localStorage.getItem("fname"),
      loggedUserLastName: localStorage.getItem("lname"),
      loggedUserFullName: localStorage.getItem("fullName"),
      loggedUserDepartment: localStorage.getItem("department"),
      loggedUserPosition: localStorage.getItem("positionName"),
      companyId: localStorage.getItem("companyId"),
      companyName: localStorage.getItem("companyName"),
    };
  },

  methods: {
    back() {
      this.$router.replace("/the-cart");
    },
    next() {
      if (this.counter === 1 || this.counter === 2) {
        this.attemptNext = true;
      }

      this.validateCurrentTab(this.counter);
    },
    validateCurrentTab(counter) {
      if (counter === 0) {
        this.counter++;
      } else if (counter === 1) {
        if (
          !this.missingReportingManager &&
          !this.missingMrfShortText &&
          !this.missingPlannedDeliveryDate &&
          !this.missingActualDeliveryDate &&
          !this.missingCostCenter &&
          !this.missingClass &&
          !this.missingType &&
          !this.missingRemarks &&
          !this.missingProcessType 
        ) {
          this.counter++;
        }
      }
      else if (counter === 2) {
        this.counter++;
      }
    },

    // Query
    async getReportingManager(userid) {
      this.isLoading = true;
      const response = await fetch(
        `http://127.0.0.1:8000/api/reporting-manager/${userid}`,
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
      this.isLoading = false;
    },

    async getProjects() {
      this.isLoading = true;

      const compid = this.companyId;

      const response = await fetch(
        `http://127.0.0.1:8000/api/general-getprojects/${compid}`,

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

      this.isLoading = false;
      console.warn(responseData)

      const project = [];
      for (const key in responseData) {
        const request = {
          code: responseData[key].project_id,
          name: responseData[key].project_name,
          soid: responseData[key].SOID,
        };
        project.push(request);
      }
      this.project = project;
    },

    async getAttachments(soid) {
      this.isLoading = true;
      console.log(soid )
      console.log('getAttachments')

      const response = await fetch(
        `http://127.0.0.1:8000/api/get-attachments-by-soid/${soid}`,

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

      // console.log(responseData);
      this.selectedDBFile = responseData
      console.log(responseData)

      this.isLoading = false;
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

    async carts() {
      this.isLoading = true;

      const response = await fetch(
        `http://127.0.0.1:8000/api/cart-show/${this.loggedUserId}/${this.companyId}/2`,
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

      this.isLoading = false;

      this.carts = responseData;
    },

    async purchase() {
      this.isSpinner = true
      const fd = new FormData();
      let requisition_no = this.referenceNumber+ '/' +this.todaysYear
      let procss_type = this.TypeSelected.process_type == "" ? this.processType.name : this.TypeSelected.process_type

      for (let i = 0; i < this.selectedFile.length; i++) {
        fd.append("file[]", this.selectedFile[i]);
      }

      fd.append("trans_type", this.referenceNumber);
      fd.append("companyId", this.companyId);
      fd.append("userid", this.loggedUserId);
      fd.append("requisition_no", requisition_no);
      fd.append("delivery_date", this.actualDeliveryDate);
      fd.append("planned_delivery_date", this.plannedDeliveryDate);
      fd.append("requested_date", this.requestedDate);
      fd.append("remarks", this.remarks);
      fd.append("user_fname", this.loggedUserFirstName);
      fd.append("user_lname", this.loggedUserLastName);
      fd.append("user_department", this.loggedUserDepartment);
      fd.append("user_company", this.companyName);
      fd.append("clientid", this.clientId);
      fd.append("costid", this.costCenter.code);
      fd.append("costname", this.costCenter.name);
      fd.append("clientname", this.clientName);
      fd.append("short_text", this.mrfShortText);
      fd.append("req_person_id", this.employeeId);
      fd.append("rmid", this.reportingManagerItem.code);
      fd.append("reporting_manager", this.reportingManagerItem.name);
      fd.append("type", this.TypeSelected.type);
      fd.append("type_category", this.TypeSelected.name);
      fd.append("procss_type", procss_type);

      try {
        const res = await axios.post("http://127.0.0.1:8000/api/cart-purchase", fd);
        this.openToast("top-right", "success", res.data);

        this.actualDeliveryDate = "",
        this.plannedDeliveryDate = "",
        this.mrfShortText = "",
        this.reportingManagerItem = {},
        this.costCenter = {},
        this.clientName = "",
        this.classSelected = {},
        this.TypeSelected = {}
        this.remarks = ""

        this.$router.push('/inprogress')
        this.isSpinner = false
      } catch (err) {
        console.log(err);
        this.openToast("top-right", "error", err);
        this.isSpinner = false
      }
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
      this.requestedDate = todaysDate;
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

.px-13 {
  padding-left: 13px;
  padding-right: 13px;
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

.checkout-header .input-form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkout-list {
  display: flex;
}

.checkout-list .input-form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.solid {
  border: 1px solid red;
}

.product-details h6 {
  font-weight: 900;
}

.product-details ul {
  margin: 0;
  padding: 0;
}

.product-details li {
  text-decoration: none;
  list-style: none;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
}

.product-details li span {
  color: black;
  padding-left: 8px;
}

.checkout-footer {
  display: grid;
  grid-template-columns: 1fr 5fr 2fr 2fr 2fr;
}

.checkout-footer .input-form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.underline {
  border-bottom: 1px solid #f5f5f5;
}

.anyClass {
  min-height: 30px;
  max-height: 630px;

  overflow-y: scroll;
}

.scroll-bar::-webkit-scrollbar {
  width: 2px;
  background-color: #f5f5f5;
}

.scroll-bar::-webkit-scrollbar-thumb {
  background-color: #000000;
  border: 2px solid #6c757d;
}
.card-split {
  display: grid;
  grid-template-columns: 3fr 9fr;
}

.card-detail-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.card-detail-list ul {
  margin: 0;
  padding: 0;
}

.card-detail-list li {
  text-decoration: none;
  list-style: none;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
}

.card-detail-list li span {
  color: black;
  padding-left: 8px;
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
