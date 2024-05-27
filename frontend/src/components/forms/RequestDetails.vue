<template>
  <aside>
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
          <!-- <input type="date" class="form-control form-control-sm" id="requestDate"> -->
          <date-picker
            disabled
            v-model="requestDate"
            valueType="format"
            style="display: block; width: 100%; line-height: 20px"
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
          ></textarea>
        </div>
      </div>
    </div>
  </aside>
  <!-- /.card-body -->
</template>

<script>
import { ModelListSelect } from "vue-search-select";

export default {
  components: {
    ModelListSelect,
  },
  computed: {
    purpose: {
      get() {
        return this.$store.getters["createRfp/purpose"];
      },
      set(value) {
        this.$store.dispatch("createRfp/updatePurpose", value);
      },
    },
    referenceNumber() {
      return this.$store.getters["createRfp/referenceNumber"];
    },
    requestDate() {
      return this.$store.getters["createRfp/requestDate"];
    },
  },
  created() {
    this.getProjects();
    this.getReportingManager();
  },
  watch: {
    reportingManagerItem(newValue) {
      const rmData = {
        rmId: newValue.code,
        rmName: newValue.name,
      };
      this.$store.dispatch("createRfp/updateReportingManager", rmData);
      // console.log(newValue)
    },

    projectItem(newValue) {
      this.clientName = "";
      this.clientId = "";
      this.mainId = "";
      const prjData = {
        prjId: newValue.code,
        prjName: newValue.name,
      };
      this.$store.dispatch("createRfp/updateProject", prjData);
      this.getClient(newValue.code);
    },
    dateNeeded(newValue) {
      this.$store.dispatch("createRfp/updateDateNeeded", newValue);
    },

    clientName(newValue) {
      this.$store.dispatch("createRfp/updateClientName", newValue);
    },
    clientId(newValue) {
      this.$store.dispatch("createRfp/updateClientId", newValue);
    },
    mainId(newValue) {
      this.$store.dispatch("createRfp/updateMainId", newValue);
    },
  },
  data() {
    return {
      reportingManager: [],
      reportingManagerItem: {},

      project: [],
      projectItem: {},
      dateNeeded: "",
      clientName: "",
      clientId: "",
      mainId: "",

      // Logged User Data
      loggedUserId: localStorage.getItem("id"),
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
      // console.log(responseData);

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
      // console.log(responseData);

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
      // console.log(responseData);

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
    },
  },
};
</script>
