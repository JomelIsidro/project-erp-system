import axios from "axios";
export default {
  namespaced: true,
  state() {
    return {
      remarks: [],
      isItLoading: false,
    };
  },

  mutations: {
    notifications(state, payload){
      state.remarks = payload
    },

    setLoading(state) {
      state.isItLoading = !state.isItLoading;
    },
  },

  actions: {
    async notifications(context, payload){
      const id = payload.id
      const frmname = payload.frmname
      
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/notifications/${id}/${frmname}`
        );

        const payload = response.data;
        context.commit("notifications", payload);
        
        return response

      } catch (error) {
        console.error(error);
        return error
      }

    },

    setLoading(context) {
      context.commit("setLoading");
    },
  },

  getters: {
    getRemarks(state){
      return state.remarks;
    },

    isItLoading(state) {
      return state.isItLoading;
    },
  },
};
