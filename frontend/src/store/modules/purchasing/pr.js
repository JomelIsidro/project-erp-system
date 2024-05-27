import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      listRequest: [],
    };
  },

  mutations: {
    getPr(state, payload) {
      state.listRequest = payload;
    },

    selectRequest(state, payload) {

      const newArr = state.listRequest.map(obj => {
        // set all list to not selected
        obj.selected = 0;
        // if matched mark as selected
        if (obj.id === payload.id) {
          return {...obj, selected: !payload.selected};
        }
        // return final updated obj
        return obj;
      });

      // mutate set the state of new obj
      state.listRequest = newArr;

    },

    
  },

  actions: {

    async getPr(context){
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/get-getRequest`
        );
        let payload = response.data;
        context.commit("getPr", payload);

      } catch (error) {
        console.error(error);
      }
    },

    selectRequest(context, payload) {
      context.commit("selectRequest", payload);
    },
  },

  getters: {
    listRequest(state) {
      console.log(state)
      return state.listRequest;
    },

    getSelectedPr(state) {
      
      const index = state.listRequest.map(object => object.selected).indexOf(true);
      const selectedObject = state.listRequest[index];
      return selectedObject;
      
    },


  },
};
