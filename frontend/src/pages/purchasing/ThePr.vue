<template>
  <div class="col-md-12 mt-3">
    <!-- Form Element sizes -->
    <div class="card card-secondary">
      <!-- Spinner -->
      <div
        class="overlay"
        style="background-color: white !important"
        v-show="isLoading"
      >
        <loading-spinner></loading-spinner>
      </div>
      <!-- /.Spinner -->
      <div class="card-header">
        <h3 class="card-title">Purchase Request</h3>
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
        </div>

        <div class="d-flex text-center">
          <div class="textbar" :class="classA">
            <small
              ><span :class="classA" class="font-weight-bold"
                >Select Request</span
              ></small
            >
          </div>
          <div class="textbar" :class="classB">
            <small
              ><span :class="classB" class="font-weight-bold"
                >Item Details</span
              ></small
            >
          </div>
          <div class="textbar" :class="classC">
            <small
              ><span :class="classC" class="font-weight-bold"
                >Request Details</span
              ></small
            >
          </div>
          <div class="textbar" :class="classD">
            <small
              ><span :class="classD" class="font-weight-bold"
                >Review</span
              ></small
            >
          </div>
        </div>
        <!-- / Step Numbers -->

        <!-- Main Form -->

        <!-- Buttons -->
        <div class="row d-flex justify-content-between mb-0 mt-3">
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
              class="btn mr-1 btn-secondary btn-sm"
              @click="counter--"
            >
              Previous
            </button>

            <button
              type="button"
              class="btn mr-1 btn-primary btn-sm"
              @click="next()"
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
            <button type="button" class="btn ml-1 btn-danger btn-sm">
              Close
            </button>
          </aside>
        </div>
        <!-- / Buttons -->

        <!-- Select Request -->
        <aside class="container-fluid mt-0 px-0" v-if="this.counter === 0">
          <data-table v-bind="parametersTable1" />
        </aside>
        <!-- /.Select Request -->

        <!-- Item Details -->
        <aside class="container-fluid mt-3 px-0" v-if="this.counter === 1">
          <div class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">Items Table</h3>
            </div>
            <!-- /.card-header -->
            <div class="card-body table-responsive p-0" style="height: 500px">
              <table
                class="
                  table table-sm table-bordered table-head-fixed
                  text-nowrap
                  table-hover
                "
              >
                <thead style="position: sticky; top: 0; background-color: #fff">
                  <tr>
                    <th colspan="1"></th>
                    <th colspan="6">Item Details</th>
                    <th colspan="3">PR Details</th>
                    <th colspan="3">Request Details</th>
                    <th colspan="2">Reserved Details</th>
                    <th colspan="2">Available Details</th>
                    <!-- <th colspan="2"></th> -->
                    <th colspan="3"></th>
                  </tr>
                  <tr>
                    <th class="text-center"><small>#</small></th>
                    <th class="text-center"><small>Images</small></th>
                    <th class="text-center"><small>Item Code</small></th>
                    <th class="text-center"><small>Brand</small></th>
                    <th class="text-center"><small>Model</small></th>
                    <th class="text-center"><small>SKU</small></th>
                    <th class="text-center"><small>Description</small></th>
                    <th class="text-center"><small>For PR Qty.</small></th>
                    <th class="text-center"><small>UOM</small></th>
                    <th class="text-center"><small>Total PR Qty.</small></th>
                    <th class="text-center"><small>Request Qty.</small></th>
                    <th class="text-center"><small>For PR Qty.</small></th>
                    <th class="text-center"><small>UOM</small></th>
                    <th class="text-center"><small>Qty.</small></th>
                    <th class="text-center"><small>UOM</small></th>
                    <th class="text-center"><small>Qty.</small></th>
                    <th class="text-center"><small>UOM</small></th>
                    <th class="text-center"><small>Date</small></th>
                    <th><small>Notes</small></th>
                    <th class="text-center"><small>Action Button</small></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Lorem ipsum dolor sit, amet consectetur adipisicing</td>
                    <td>Lorem, ipsum.</td>
                    <td>Samsung</td>
                    <td>M21-T70 Series</td>
                    <td>SDA1213</td>
                    <td>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Fugiat, voluptatibus!
                    </td>
                    <td>23</td>
                    <td>Meter</td>
                    <td>24</td>
                    <td>23</td>
                    <td>24</td>
                    <td>Meter</td>
                    <td>25</td>
                    <td>Meter</td>
                    <td>26</td>
                    <td>Meter</td>
                    <td>November 17, 2022</td>
                    <td>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Nam dolor numquam magni ut alias asperiores adipisci quod
                      accusamus eos enim?
                    </td>
                    <td class="text-center">
                      <button class="btn btn-danger btn-sm">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- /.card-body -->
            <!-- <div class="card-footer clearfix">
              <ul class="pagination pagination-sm m-0 float-right">
                <li class="page-item">
                  <a class="page-link" href="#">&laquo;</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#">&raquo;</a>
                </li>
              </ul>
            </div> -->
          </div>
        </aside>
        <!-- /.Item Details -->

        <!-- Request Details -->
        <aside class="container-fluid mt-3 px-0" v-if="this.counter === 2">
          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <small><label for="reference">PR Number</label></small>
                <input
                  type="text"
                  class="form-control form-control-sm py-3"
                  disabled
                  :value="'PR-' + todaysYear"
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
                  :value="requestDate"
                ></date-picker>
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <small><label for="requestDate">Delivery Date</label></small>
                <date-picker
                  v-model="deliverDate"
                  valueType="format"
                  style="display: block; width: 100%; line-height: 20px"
                ></date-picker>
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <small><label for="reference">Request Type</label></small>
                <model-list-select
                  :list="requestType"
                  v-model="requestTypeItem"
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
                <small><label for="projectName">Cost Center</label></small>
                <model-list-select
                  :list="costCenter"
                  v-model="costCenterItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="
                    padding: 9px;
                    background-color: #e9ecef;
                    outline-style: solid;
                    outline-color: #ced4da;
                    outline-width: thin;
                  "
                  :isDisabled="true"
                >
                </model-list-select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <small><label for="projectName">Client Name</label></small>
                <model-list-select
                  :list="client"
                  v-model="clientItem"
                  option-value="code"
                  option-text="name"
                  placeholder="select item"
                  style="
                    padding: 9px;
                    background-color: #e9ecef;
                    outline-style: solid;
                    outline-color: #ced4da;
                    outline-width: thin;
                  "
                  :isDisabled="true"
                >
                </model-list-select>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <small><label for="remarks">Remarks</label></small>
                <textarea
                  class="form-control"
                  name="remarks"
                  id="remarks"
                  v-model.trim="remarks"
                  rows="5"
                ></textarea>
              </div>
            </div>
          </div>
        </aside>
        <!-- /.Request Details -->

        <!-- Form Review -->
        <aside class="container-fluid mt-3 px-0" v-if="this.counter === 3">
          <!-- Request Details - Form Review -->
          <div class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">Selected Request</h3>

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
                    <td>Request</td>
                    <td style="width: 80%">Information Technology</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>

          <!-- Items Details - Form Review -->
          <div class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">Items Details</h3>
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
            <div class="card-body table-responsive p-0" style="height: 150px">
              <table
                class="
                  table table-sm table-bordered table-head-fixed
                  text-nowrap
                  table-hover
                "
              >
                <thead style="position: sticky; top: 0; background-color: #fff">
                  <tr>
                    <th colspan="1"></th>
                    <th colspan="6">Item Details</th>
                    <th colspan="3">PR Details</th>
                    <th colspan="3">Request Details</th>
                    <th colspan="2">Reserved Details</th>
                    <th colspan="2">Available Details</th>
                    <!-- <th colspan="2"></th> -->
                    <th colspan="3"></th>
                  </tr>
                  <tr>
                    <th class="text-center"><small>#</small></th>
                    <th class="text-center"><small>Images</small></th>
                    <th class="text-center"><small>Item Code</small></th>
                    <th class="text-center"><small>Brand</small></th>
                    <th class="text-center"><small>SKU</small></th>
                    <th class="text-center"><small>Model</small></th>
                    <th class="text-center"><small>Description</small></th>
                    <th class="text-center"><small>For PR Qty.</small></th>
                    <th class="text-center"><small>UOM</small></th>
                    <th class="text-center"><small>Total PR Qty.</small></th>
                    <th class="text-center"><small>Request Qty.</small></th>
                    <th class="text-center"><small>For PR Qty.</small></th>
                    <th class="text-center"><small>UOM</small></th>
                    <th class="text-center"><small>Qty.</small></th>
                    <th class="text-center"><small>UOM</small></th>
                    <th class="text-center"><small>Qty.</small></th>
                    <th class="text-center"><small>UOM</small></th>
                    <th class="text-center"><small>Date</small></th>
                    <th><small>Notes</small></th>
                    <th class="text-center"><small>Action Button</small></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Lorem ipsum dolor sit, amet consectetur adipisicing</td>
                    <td>Lorem, ipsum.</td>
                    <td>Samsung</td>
                    <td>123891484</td>
                    <td>M21-T70 Series</td>
                    <td>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Fugiat, voluptatibus!
                    </td>
                    <td>23</td>
                    <td>Meter</td>
                    <td>24</td>
                    <td>23</td>
                    <td>24</td>
                    <td>Meter</td>
                    <td>25</td>
                    <td>Meter</td>
                    <td>26</td>
                    <td>Meter</td>
                    <td>November 17, 2022</td>
                    <td>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Nam dolor numquam magni ut alias asperiores adipisci quod
                      accusamus eos enim?
                    </td>
                    <td class="text-center">
                      <button class="btn btn-danger btn-sm">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Request Details - Form Review -->
          <div class="card card-secondary">
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
                    <td>PR Number</td>
                    <td style="width: 80%">PR-2022</td>
                  </tr>
                  <tr>
                    <td>Requested Date</td>
                    <td>2022-11-27</td>
                  </tr>
                  <tr>
                    <td>Delivery Date</td>
                    <td>2022-11-27</td>
                  </tr>
                  <tr>
                    <td>Request Type</td>
                    <td>PR Testing</td>
                  </tr>
                  <tr>
                    <td>Cost Center</td>
                    <td>Cylix Technologies Inc.</td>
                  </tr>
                  <tr>
                    <td>Client Name</td>
                    <td>Okada Manila - Universal Entertainment Corporation</td>
                  </tr>
                  <tr>
                    <td>Remarks</td>
                    <td>Lorem ipsum dolor sit amet.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>

          <!-- Related Attachemnts = Form Review -->
          <div class="card card-secondary">
            <div class="card-header">
              <h3 class="card-title">Related Attachments</h3>

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
                  <tr>
                    <td>Lorem ipsum dolor sit.</td>
                    <td class="pl-2 pr-2 text-center">
                      <button class="btn btn-danger btn-sm">Remove</button>
                      <button class="btn btn-secondary btn-sm ml-1">
                        Preview
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
        </aside>
        <!-- /.Form Review -->

        <!-- / Main Form -->

      </div>
    </div>
    <!-- /.card -->

    <!-- End -->
  </div>
</template>

<script>
import { ModelListSelect } from "../../../node_modules/vue-search-select";
// import axios from "axios";
// import VsToast from "@vuesimple/vs-toast";
import PrCheckbox from "./PrCheckbox.vue";
export default {
  components: {
    ModelListSelect,
  },

  watch: {
    counter() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },

    listRequest(newValue) {
      this.requestArray = newValue;
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

    // Calendaer
    todaysYear() {
      const today = new Date();
      const yyyy = today.getFullYear();
      return yyyy;
    },

    parametersTable1() {
      return {
        data: this.requestArray,
        perPageSizes: [
          10,
          25,
          50,
          100 * Math.ceil(this.requestArray.length / 100),
        ],
        tableClass:
          "table table-sm table-striped table-bordered small table-hover",

        columns: [
          {
            key: "Select",
            sortable: false,
            component: PrCheckbox,
          },
          {
            key: "reference",
            title: "Reference",
          },
          {
            key: "requestDate",
            title: "Request Date",
          },
          {
            key: "soNum",
            title: "SO Number ",
          },
          {
            key: "requestor",
            title: "Requestor",
          },
          {
            key: "type",
            title: "Type",
          },
          {
            key: "projectName",
            title: "Customer Name",
          },
          {
            key: "clientName",
            title: "Client Name",
          },
        ],
      };
    },

    listRequest() {
      return this.$store.getters["pr/listRequest"];
    },
  },
  data() {
    return {
      counter: 1,
      isLoading: false,
      requestArray: [],

      requestDate: null,
      deliverDate: null,
      requestType: [],
      requestTypeItem: {},
      costCenter: [],
      costCenterItem: {},
      client: [],
      clientItem: {},
      remarks: "",
    };
  },

  async created() {
    await this.todaysDate();
    this.getRequest();
  },

  methods: {
    next() {
      const selectedPrRequest = this.$store.getters["pr/getSelectedPr"];
      console.log(selectedPrRequest);

    },

    async getRequest() {
      this.isLoading = true;
      await this.$store.dispatch("pr/getPr");
      this.isLoading = false;
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
