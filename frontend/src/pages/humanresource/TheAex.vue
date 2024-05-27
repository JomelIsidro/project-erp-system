<template>
  <div class="col-md-12 mt-3">
    <div class="row">
      <div class="col-md-3">
        <div class="card card-secondary">
          <!-- <div class="overlay" v-show="isFilterLoading">
            <loading-spinner></loading-spinner>
          </div> -->
          <div class="card-header">
            <h3 class="card-title">Filter</h3>
          </div>

          <div class="card-body pt-3 pb-3">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <small><label for="clientName">Employee Name</label></small>
                  <model-list-select
                    :list="employee"
                    v-model="selectedEmployee"
                    option-value="code"
                    option-text="name"
                    placeholder="select item"
                    :style="isDropdownRequired"
                    :isDisabled="this.isFilterLoading === true"
                  >
                  </model-list-select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <small><label for="dateNeeded">Date Range</label></small>
                  <date-picker
                    v-model="dateRange"
                    style="display: block; width: 100%; line-height: 20px border:red;"
                    range
                    :disabled="this.isFilterLoading === true"
                  ></date-picker>
                </div>
              </div>
            </div>

            <div class="text-right mt-1">
              <button
                type="button"
                :disabled="this.isFilterLoading === true"
                class="btn btn-primary btn-sm"
                @click="filter"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-9">
        <div class="card card-secondary">
          <div
            class="overlay"
            style="background-color: white !important"
            v-show="isCardLoading"
          >
            <loading-spinner></loading-spinner>
          </div>
          <div class="card-header">
            <h3 class="card-title">Attendance</h3>
          </div>

          <div class="card-body pt-0 pb-3">
            <data-table v-bind="parametersTable1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ModelListSelect } from "vue-search-select";
import axios from "axios";
import VsToast from "@vuesimple/vs-toast";

export default {
  name: "TheAex",
  components: {
    ModelListSelect,
  },

  data() {
    return {
      employee: [],
      selectedEmployee: {},
      isCardLoading: false,
      isFilterLoading: false,
      dateRange: [],
      requestArray: [],
      companyId: localStorage.getItem("companyId"),
    };
  },

  computed: {
    isDropdownRequired() {
      if (this.isFilterLoading === true) {
        return "padding: 9px; background-color: #F4F6F9; border-color: #cccccc;";
      } else {
        return "padding: 9px";
      }
    },

    parametersTable1() {
      return {
        data: this.requestArray,
        perPageSizes: [
          10,
          25,
          50,
          100,
          100 * Math.ceil(this.requestArray.length / 100),
        ],
        allowedExports: ["csv", "json", "txt"],
        tableClass:
          "table table-sm table-striped table-bordered small table-hover",
        columns: [
          {
            key: "employee_name",
            title: "Employee Name",
          },
          {
            key: "dtr_date",
            title: "Date Entry",
          },
          {
            key: "in",
            title: "In",
          },
          {
            key: "out",
            title: "Out",
          },
        ],
      };
    },
  },

  watch: {},

  async created() {
    this.isFilterLoading = true;
    await this.getEmployees(this.companyId);
    this.isFilterLoading = false;
  },

  methods: {
    perPageSizes() {
      // round `length` to the closest multiple of 100
      // for example, `length` = 743 means `fullSize` = 800
      let fullSize = 100 * Math.ceil(this.requestArray.length / 100);

      // return the result
      return [10, 20, 50, fullSize];
    },

    async getEmployees(companyId) {
      // this.isFilterLoading = true;

      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/get-employees/${companyId}`
        );

        if (resp.status === 200) {
          // this.isFilterLoading = false;

          // console.log(resp);

          const employeeName = [];
          for (const key in resp.data) {
            const request = {
              code: resp.data[key].SysPK_Empl,
              name: resp.data[key].Name_Empl,
            };
            employeeName.push(request);
          }
          this.employee = employeeName;
        }
      } catch (err) {
        // this.isFilterLoading = false;

        // Handle Error Here
        console.error(err);
        this.catchError(err);
      }
    },

    async filter() {
      this.isCardLoading = true;
      this.isFilterLoading = true;
      const bDateRange = !!this.dateRange[0];
      const bEmployee = !!this.selectedEmployee.code;

      const companyId = this.companyId;
      const dateRange = bDateRange === true ? this.dateRange : false;
      const employee = bEmployee === true ? this.selectedEmployee : false;

      const fd = {
        companyId: companyId,
        dateRange: dateRange,
        employee: employee,
      };


      try {
        const resp = await axios.post(
          "http://portal.cylix.ph/ctiportal/public/api/post-aex-filter",
          fd
        );
        this.requestArray = resp.data;
        this.isCardLoading = false;
        this.isFilterLoading = false;
      } catch (err) {
        // Handle Error Here
        console.error(err);
        this.catchError(err);
        this.isCardLoading = false;
        this.isFilterLoading = false;
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

    catchError(err) {
      if (err.response.status === 400) {
        this.openToast(
          "top-right",
          "error",
          "Bad Request! Please message the administrator!"
        );
      } else if (err.response.status === 404) {
        this.openToast(
          "top-right",
          "error",
          "Not Found! Please message the administrator!"
        );
      } else if (err.response.status === 408) {
        this.openToast(
          "top-right",
          "error",
          "Request Timeout! Please check your internet connection"
        );
      } else if (err.response.status === 429) {
        this.openToast(
          "top-right",
          "error",
          "Too Many Request! Try again later!"
        );
      } else {
        this.openToast("top-right", "error", err.message);
      }
    },
  },
};
</script>
