import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      selectedDtr: [],
      listDtr: [],
      dataDisplayed: [],
      isItLoading: false,
      editableData: {},
    };
  },

  mutations: {
    clearSelectedData(state){
      state.selectedDtr = [];
    },

    addSelectedDtr(state, payload) {
      state.selectedDtr.push(payload);
    },

    deleteSelectedDtr(state, payload) {
      // state.selectedDtr.push(payload);
      // find the data that matches this payload id
      let index = state.selectedDtr.map((item) => item.id).indexOf(payload.id);
      // if matched delete it
      if (index > -1) {
        state.selectedDtr.splice(index, 1);
        // console.log("Result", state.selectedDtr);
      }
    },

    getDtr(state, payload) {
      state.listDtr = payload;
    },

    dataDisplayed(state, payload) {
      state.dataDisplayed = payload;
    },

    async selectAllData(state) {
      // display data of current page
      const dataDisplayed = state.dataDisplayed;
      // select all data in the current page
      await dataDisplayed.map((x) => (x.selected = 1));

      // * this is use to run a mutation inside a mutation
      // this.commit("dtr/addSelectedDtr", dataDisplayed);

      // for loop of data display
      dataDisplayed.map(
        (data) =>
          // check if selectedDtr has the same id of listDtr
          !state.selectedDtr.some((i) => i.id == data.id) &&
          state.selectedDtr.push(data)
      );
    },

    async unselectAllData(state) {
      // display data of current page
      const dataDisplayed = state.dataDisplayed;
      // select all data in the current page
      await dataDisplayed.map((x) => (x.selected = 0));

      const selectedDtr = state.selectedDtr;

      // remove all data that match in selected Dtr
      const filteredResult = selectedDtr.filter(
        (o1) => !dataDisplayed.some((o2) => o1.id === o2.id)
      );

      // replace array from state with this filtered result
      state.selectedDtr = filteredResult;
    },

    setLoading(state) {
      state.isItLoading = !state.isItLoading;
    },

    editModal(state, payload) {
      state.editableData = payload;
    },

    async updateListDtr(state, payload) {
      const listDtr = state.listDtr;

      // find then update the selected dtr when id is matched
      await listDtr.map((item) => {
        if (item.id === payload.id) {
          item.dtr_date = payload.dtr_date;
          item.in_am = payload.in_am;
          item.out_pm = payload.out_pm;
        }
        return item
      });

    },
  },

  actions: {
    clearSelectedData(context){
      context.commit("clearSelectedData");
    },
    addSelectedDtr(context, payload) {
      context.commit("addSelectedDtr", {
        DepartmentName: payload.DepartmentName,
        EmployeeName: payload.EmployeeName,
        Status: payload.Status,
        dtr_date: payload.dtr_date,
        id: payload.id,
        in_am: payload.in_am,
        out_pm: payload.out_pm,
        positionName: payload.positionName,
        selected: !payload.selected,
      });
    },

    deleteSelectedDtr(context, payload) {
      context.commit("deleteSelectedDtr", {
        DepartmentName: payload.DepartmentName,
        EmployeeName: payload.EmployeeName,
        Status: payload.Status,
        dtr_date: payload.dtr_date,
        id: payload.id,
        in_am: payload.in_am,
        out_pm: payload.out_pm,
        positionName: payload.positionName,
        selected: !payload.selected,
      });
    },

    async getDtr(context,payload) {
      
      const id = payload
      console.warn(id)
      try {
        const response = await axios.get(
          `http://portal.cylix.ph/ctiportal/public/api/get-dtr-logs/${id}`
        );
        // console.log(response);

        let payload = response.data;
        console.warn(payload)
        context.commit("getDtr", payload);

      } catch (error) {
        console.error(error);
      }
    },

    dataDisplayed(context, payload) {
      context.commit("dataDisplayed", payload);
    },

    selectAllData(context) {
      context.commit("selectAllData");
    },

    unselectAllData(context) {
      context.commit("unselectAllData");
    },

    async setSelected(context, payload) {
      const selectedDtr = context.getters.getSelectedDtr;
      const setStatus = payload.setStatus;

      const fd = new FormData();
      fd.append("setStatus", setStatus);
      fd.append("selectedData", JSON.stringify(selectedDtr));

      try {
        const resp = await axios.post(
          "http://portal.cylix.ph/ctiportal/public/api/post-dtr-logs-approve",
          fd
        );
        console.log(resp.data)

        return resp.status;
      } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
      }
    },

    async set(_, payload) {
      const fd = new FormData();
      const setdata = []
      setdata.push(payload.data)
      fd.append("setStatus", payload.setStatus);
      fd.append("selectedData", JSON.stringify(setdata));

      try {
        const resp = await axios.post(
          "http://portal.cylix.ph/ctiportal/public/api/post-dtr-logs-approve",
          fd
        );
        console.log(resp.data)
        // console.log(resp.data);
        return resp.status;
      } catch (err) {
        // Handle Error Here
        console.error(err);
        return err;
      }
    },

    setLoading(context) {
      context.commit("setLoading");
    },

    editModal(context, payload) {
      context.commit("editModal", payload);
    },

    async updateListDtr(context, payload) {
      const response = await context.commit("updateListDtr", payload);
      return response;
    },
  },

  getters: {
    getSelectedDtr(state) {
      return state.selectedDtr;
    },

    listDtr(state) {
      return state.listDtr;
    },

    findSelectedDtr: (state) => (id) => {
      return state.selectedDtr.find((todo) => todo.id === id);
    },

    getdataDisplayed(state) {
      return state.dataDisplayed;
    },

    isItLoading(state) {
      return state.isItLoading;
    },

    editableData(state) {
      return state.editableData;
    },
  },
};
