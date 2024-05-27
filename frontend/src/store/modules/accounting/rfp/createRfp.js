export default {
  namespaced: true,
  state() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const todaysDate = yyyy + "-" + mm + "-" + dd;

    return {
      rfp: {
        referenceNumber: "RFP-" + yyyy,
        requestDate: todaysDate,
        dateNeeded: "",
        reportingManagerId: "",
        reportingManagerName: "",
        projectId: "",
        projectName: "",
        clientId: "",
        clientName: "",
        mainId: "",
        purpose: "",
        payeeName: "",
        modeOfPaymentId: "",
        modeOfPaymentName: "",
        currencyId: "",
        currencyName: "",
        amount: "",
        fileList:[],
        filePreview:[],
      },
    };
  },

  mutations: {
    updateDateNeeded(state, payload) {
      state.rfp.dateNeeded = payload;
    },
    updatePurpose(state, payload) {
      state.rfp.purpose = payload;
    },
    updateReportingManager(state, payload) {
      state.rfp.reportingManagerId = payload.rmId;
      state.rfp.reportingManagerName = payload.rmName;
    },
    updateProject(state, payload) {
      state.rfp.projectId = payload.prjId;
      state.rfp.projectName = payload.prjName;
    },
    updatePayee(state, payload) {
      state.rfp.payeeName = payload;
    },
    updateMop(state, payload) {
      state.rfp.modeOfPaymentId = payload.mopId;
      state.rfp.modeOfPaymentName = payload.mopName;
    },
    updateCurrency(state, payload) {
      state.rfp.currencyId = payload.currencyId;
      state.rfp.currencyName = payload.currencyName;
    },
    updateAmount(state, payload) {
      state.rfp.amount = payload;
    },
    updateClientName(state, payload) {
      state.rfp.clientName = payload;
    },
    updateClientId(state, payload) {
      state.rfp.clientId = payload;
    },
    updateMainId(state, payload) {
      state.rfp.mainId = payload;
    },
    updateFileList(state,payload) {
      state.rfp.fileList = payload;
    },
    updateFilePreview(state,payload) {
      state.rfp.filePreview = payload;

    },
  },

  actions: {
    updateDateNeeded(context, payload) {
      context.commit("updateDateNeeded", payload);
    },
    updatePurpose(context, payload) {
      context.commit("updatePurpose", payload);
    },
    updateReportingManager(context, payload) {
      context.commit("updateReportingManager", payload);
    },
    updateProject(context, payload) {
      context.commit("updateProject", payload);
    },
    updatePayee(context, payload) {
      context.commit("updatePayee", payload);
    },
    updateMop(context, payload) {
      context.commit("updateMop", payload);
    },
    updateCurrency(context, payload) {
      context.commit("updateCurrency", payload);
    },
    updateAmount(context, payload) {
      context.commit("updateAmount", payload);
    },
    updateClientName(context, payload) {
      context.commit("updateClientName", payload);
    },
    updateClientId(context, payload) {
      context.commit("updateClientId", payload);
    },
    updateMainId(context, payload) {
      context.commit("updateMainId", payload);
    },
    updateFileList(context,payload){
      context.commit("updateFileList", payload);
    },
    updateFilePreview(context,payload){
      context.commit("updateFilePreview", payload);
      // console.log(payload)
    },


    async submitRfp(_, payload) {
      console.log(payload)

      const response = await fetch(
        "http://127.0.0.1:8000/api/rfp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            referenceNumber: payload.referenceNumber,
            requestDate: payload.requestDate,
            dateNeeded: payload.dateNeeded,
            reportingManagerId: payload.reportingManagerId,
            reportingManagerName: payload.reportingManagerName,
            projectId: payload.projectId,
            projectName: payload.projectName,
            clientName: payload.clientName,
            clientId: payload.clientId,
            mainId: payload.mainId,
            purpose: payload.purpose,
            payeeName: payload.payeeName,
            modeOfPaymentId: payload.modeOfPaymentId,
            modeOfPaymentName: payload.modeOfPaymentName,
            currencyId: payload.currencyId,
            currencyName: payload.currencyName,
            amount: payload.amount,
            file:payload.fileList,
          }),
        }
      );

      // const responseData = await response.json();

      if (!response.ok) {
        // error ...
        console.log('responseData')
      }
    },
  },

  getters: {
    referenceNumber(state) {
      return state.rfp.referenceNumber;
    },
    requestDate(state) {
      return state.rfp.requestDate;
    },
    amount(state) {
      return state.rfp.amount;
    },
    payeeName(state) {
      return state.rfp.payeeName;
    },
    purpose(state) {
      return state.rfp.purpose;
    },
    fileList(state) {
      return state.fileList;
    },
    filePreview(state){
      return state.filePreview;
    },
    rfp(state) {
      return state.rfp;
    },

  },
};
