import axios from "axios";
export default {
  namespaced: true,
  state() {
    return {
      status: [],
      isItLoading: false,
      // wf: {
      //   participants: 0,
      //   inputs: 0,
      //   approval: 0,
      //   inprogress: 0,
      //   clarification: 0,
      //   approved: 0,
      //   withdrawn: 0,
      //   rejected: 0,
      // },
    };
  },

  mutations: {
    queryStatus(state, payload){
      state.status = payload
    },

    // setWorkflowCount(state, payload){
    //   console.log(payload)
    //   console.log(payload.wfCount)
    //   console.log(payload.wfName)

    //   if (payload.wfName === 'inprogress') {
    //       state.wf.inprogress = payload.wfCount;
    //   }


    // },
  },

  actions: {
    async queryStatus(context,payload){
      const id = payload.id
      const frmname = payload.frmname
      const companyId = payload.companyId
      
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/status/${id}/${frmname}/${companyId}`
        );

        const payload = response.data;
        context.commit("queryStatus", payload);
        
        return response

      } catch (error) {
        console.error(error);
        return error
      }
    },

    // setWorkflowCount(context, payload){
    //   context.commit("setWorkflowCount", payload);

    // }
  },

  getters: {
    getStatus(state){
      return state.status;
    },

    // getInprogressCount(state){
    //   return state.wf.inprogress;
    // },
  },
};
