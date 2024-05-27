<template>
  <div class="row mt-4">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <div class="form-group">
        <small><label for="payeeName">Payee Name</label></small>
        <input
          type="text"
          class="form-control form-control-sm"
          v-model="payeeName"
          id="payeeName"
        />
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
          style="padding: 9px"
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
              style="padding: 9px"
            >
            </model-list-select>
          </div>
        </div>
        <div class="col-md-8">
          <div class="form-group">
            <small><label for="amount">Amount</label></small>
            <input
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
</template>

<script>
import { ModelListSelect } from "vue-search-select";
export default {
  components: {
    ModelListSelect,
  },

  watch: {
    modeOfPaymentItem(newValue) {
      const rmData = {
        mopId: newValue.code,
        mopName: newValue.name,
      };
      this.$store.dispatch("createRfp/updateMop", rmData);
    },
    currencyItem(newValue) {
      const rmData = {
        currencyId: newValue.code,
        currencyName: newValue.name,
      };
      this.$store.dispatch("createRfp/updateCurrency", rmData);
    },
  },
  computed: {
    amount: {
      get() {
        return this.$store.getters["createRfp/amount"];
      },
      set(value) {
        this.$store.dispatch("createRfp/updateAmount", value);
      },
    },
    payeeName: {
      get() {
        return this.$store.getters["createRfp/payeeName"];
      },
      set(value) {
        this.$store.dispatch("createRfp/updatePayee", value);
      },
    },
  },
  data() {
    return {
      modeOfPayment: [
        { code: "Cash", name: "Cash" },
        { code: "Check", name: "Check" },
        { code: "Credit to Account", name: "Credit to Account" },
      ],
      modeOfPaymentItem: {},
      currency: [
        { code: "PHP", name: "PHP" },
        { code: "AUD", name: "AUD" },
        { code: "CAD", name: "CAD" },
        { code: "EUR", name: "EUR" },
        { code: "USD", name: "USD" },
      ],
      currencyItem: {},


    };

  },

  
};
</script>
