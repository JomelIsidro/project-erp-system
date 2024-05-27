<template>
  <aside>
    <!-- SELECT2 EXAMPLE -->
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
        <table class="table table-sm table-bordered table-hover table-striped">
          <!-- <thead>
          <tr>
            <th>Form</th>
            <th style="width: 80%"></th>
          </tr>
        </thead> -->
          <tbody>
            <tr>
              <td>Reference Number</td>
              <td style="width: 80%">{{ referenceNumber }}</td>
            </tr>
            <tr>
              <td>Requested Date</td>
              <td>{{ requestDate }}</td>
            </tr>
            <tr>
              <td>Date Needed</td>
              <td>{{ dateNeeded }}</td>
            </tr>
            <tr>
              <td>Reporting Manager</td>
              <td>{{ reportingManagerName }}</td>
            </tr>
            <tr>
              <td>Project Name</td>
              <td>{{ projectName }}</td>
            </tr>
            <tr>
              <td>Client Name</td>
              <td>{{ clientName }}</td>
            </tr>
            <tr>
              <td>Purpose</td>
              <td>{{ purpose }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- /.card-body -->
    </div>
    <!-- /.card -->

    <!-- SELECT2 EXAMPLE -->
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
        <table class="table table-sm table-bordered table-hover table-striped">
          <!-- <thead>
          <tr>
            <th>Form</th>
            <th style="width: 80%"></th>
          </tr>
        </thead> -->
          <tbody>
            <tr>
              <td>Payee Name</td>
              <td style="width: 80%">{{ payeeName }}</td>
            </tr>
            <tr>
              <td>Mode of Payment</td>
              <td>{{ modeOfPaymentName }}</td>
            </tr>
            <tr>
              <td>Currency</td>
              <td>{{ currencyName }}</td>
            </tr>
            <tr>
              <td>Amount</td>
              <td>{{ amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- /.card-body -->
    </div>
    <!-- /.card -->

    <!-- SELECT2 EXAMPLE -->
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
        <table class="table table-sm table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th style="width: 5%">#</th>
              <th style="width: 80%">Filename</th>
              <th style="width: 15%">Actions</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(file, index) in filePreview" :key="file.link">
              <td>{{index+1}}</td>
              <td>
                  {{ file.link }}
              </td>
              <td class="pl-3 pr-2">
                  <button class="btn btn-danger btn-sm ml-1" @click="getFileList()">alert</button>
                  <a :href="file.link" class='btn btn-secondary btn-sm m-0 ml-1' target='_blank' >Preview</a>
              </td>
            </tr>

            <button class="btn btn-danger btn-sm ml-1" @click="getFileList()">alert</button>
          

          </tbody>
        </table>
      </div>
      <!-- /.card-body -->
    </div>
    <!-- /.card -->
  </aside>
</template>

<script>
export default {
  data(){
    return{
      fileList : '',
      filePreview : '',

    }
  },

  computed: {
    referenceNumber() {
      return this.$store.getters["createRfp/rfp"].referenceNumber;
    },
    requestDate() {
      return this.$store.getters["createRfp/rfp"].requestDate;
    },
    dateNeeded() {
      return this.$store.getters["createRfp/rfp"].dateNeeded;
    },
    reportingManagerName() {
      return this.$store.getters["createRfp/rfp"].reportingManagerName;
    },
    projectName() {
      return this.$store.getters["createRfp/rfp"].projectName;
    },
    clientName() {
      return this.$store.getters["createRfp/rfp"].clientName;
    },
    purpose() {
      return this.$store.getters["createRfp/rfp"].purpose;
    },
    payeeName() {
      return this.$store.getters["createRfp/rfp"].payeeName;
    },
    modeOfPaymentName() {
      return this.$store.getters["createRfp/rfp"].modeOfPaymentName;
    },
    currencyName() {
      return this.$store.getters["createRfp/rfp"].currencyName;
    },
    amount() {
      return this.$store.getters["createRfp/rfp"].amount;
    },

  },

  
  methods:{
    getFileList(){
       this.fileList = this.$store.getters["createRfp/rfp"].fileList 
       this.filePreview = this.$store.getters["createRfp/rfp"].filePreview 

      // console.log(this.filePreview[0].link)
    },
  }


};
</script>
