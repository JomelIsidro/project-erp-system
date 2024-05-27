import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      supplies: [],
      categories: [],
      subCategories: [],
      uom: [],
      brands: [],
      cart: [],
    };
  },

  mutations: {
    fetchSupplies(state, payload) {
      state.supplies.push(...payload);
    },

    fetchSuppliesTwo(state, payload) {
      state.supplies = payload;
    },

    deleteSupplies(state) {
      state.supplies = [];
    },

    fetchCategory(state, payload) {
      state.categories = payload;
    },

    fetchSubCategory(state, payload) {
      state.subCategories = payload;
    },

    fetchUom(state, payload) {
      state.uom = payload;
    },

    fetchBrand(state, payload) {
      state.brands = payload;
    },

    fetchCart(state, payload) {
      state.cart = payload;
    },

    changeUom(state, payload) {
      const listCart = state.cart;

      // console.log(payload.cart_id)
      // console.log(payload.uom_id)
      // console.log(payload.uom_name)

      // find then update the selected card when id is matched
      const updatedCart = listCart.map((cartState) => {
        if (cartState.cart_id === payload.cart_id) {
          cartState.cart_uom_id = payload.uom_id;
          cartState.cart_uom_name = payload.uom_name;
          // console.log('true')
        }

        return cartState;
      });

      // console.warn(updatedCart);

      state.cart = updatedCart;
    },

    toggleCheckbox(state, payload) {
      const listCart = state.cart;

      // find then update the selected card when id is matched
      const updatedCart = listCart.map((cartState) => {
        // console.log(cartState);
        payload.forEach((cartPayload) => {
          // console.log(cartPayload);
          if (cartState.cart_id === cartPayload.cart_id) {
            if (cartPayload.cart_status) {
              cartState.cart_status = 2;
            } else {
              cartState.cart_status = 1;
            }
          }
        });
        return cartState;
      });

      // console.warn(updatedCart);

      state.cart = updatedCart;
    },

    toggleAllCheckbox(state, payload) {
      const listCart = state.cart;
      const updatedCart = listCart.map((cartState) => {
        if (payload) {
          cartState.cart_status = 2;
        } else {
          cartState.cart_status = 1;
        }

        return cartState;
      });

      state.cart = updatedCart;
    },

    productQtyChange(state, payload) {
      const listCart = state.cart;

      // find then update the selected card when id is matched
      listCart.map((cartState) => {
        if (cartState.cart_id === payload.cart_id) {
          if (payload.quanityTo) {
            cartState.cart_quantity++;
          } else {
            cartState.cart_quantity--;
          }
        }

        return cartState;
      });
    },
  },

  actions: {
    async deleteSupplies(context){
      context.commit("deleteSupplies")
    },

    async fetchSupplies(context, payload) {
      const fd = new FormData();
      const pageNumber = payload.page_number;
      // console.error(payload.first_attempt);
      const companyId = localStorage.getItem("companyId");

      fd.append("companyId", companyId);
      fd.append("filtered_data", JSON.stringify(payload.filtered_data));

      try {
        const resp = await axios.post(
          `http://127.0.0.1:8000/api/get-materials?page=${pageNumber}`,
          fd
        );

        if (resp.status >= 200 && resp.status <= 399) {
          const supplies = resp.data.data;
          if (resp.data.data.length) {
            if (payload.first_attempt) {
              context.commit("fetchSuppliesTwo", supplies);
            } else {
              context.commit("fetchSupplies", supplies);
            }
            return {
              first_attempt: payload.first_attempt,
              is_available: !!resp.data.data.length,
            };

            // return !!resp.data.data.length;
          } else {
            if (payload.first_attempt) {
              context.commit("deleteSupplies");
            }

            return {
              first_attempt: payload.first_attempt,
              is_available: !!resp.data.data.length,
            };
            // return !!resp.data.data.length;
          }
        }

        console.log(resp.data);
      } catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
      }
    },

    async updateCart(_, payload) {
      const loggedUserId = localStorage.getItem("id");
      const companyId = localStorage.getItem("companyId");
      const updatedCart = payload;

      const fd = {
        loggedUserId: loggedUserId,
        companyId: companyId,
        updatedCart: updatedCart,
      };

      try {
        const resp = await axios.post(
          `http://127.0.0.1:8000/api/cart-checkout`,
          fd
        );

        if (resp.status >= 200 && resp.status <= 399) {
          return resp;
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
      }
    },

    productQtyChange(context, payload) {
      context.commit("productQtyChange", payload);
    },

    async addToCart(_, payload) {
      const cartData = payload;
      const loggedUserId = localStorage.getItem("id");
      const companyId = localStorage.getItem("companyId");
      Object.assign(cartData, {
        loggedUserId: loggedUserId,
        companyId: companyId,
      });

      try {
        const resp = await axios.post(
          `http://127.0.0.1:8000/api/cart-store`,
          cartData
        );

        if (resp.status >= 200 && resp.status <= 399) {
          return resp;
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
      }
    },

    async fetchCart(context) {
      const loggedUserId = localStorage.getItem("id");
      const companyId = localStorage.getItem("companyId");
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/cartone-show/${loggedUserId}/${companyId}`
        );
        if (resp.status >= 200 && resp.status <= 399) {
          if (resp.data.length) {
            console.log(resp.data);
            context.commit("fetchCart", resp.data);
            return !!resp.data.length;
          } else {
            context.commit("fetchCart", resp.data);
            return !!resp.data.length;
          }
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
      }
    },

    changeUom(context, payload) {
      context.commit("changeUom", payload);
    },

    toggleCheckbox(context, payload) {
      context.commit("toggleCheckbox", payload);
    },

    toggleAllCheckbox(context, payload) {
      context.commit("toggleAllCheckbox", payload);
    },

    async deleteProduct(_, payload) {
      // ito yung mga id na i de-delete
      const loggedUserId = localStorage.getItem("id");
      const companyId = localStorage.getItem("companyId");
      const fd = {
        productId: payload,
        loggedUserId: loggedUserId,
        companyId: companyId,
      };

      try {
        const resp = await axios.post(
          `http://127.0.0.1:8000/api/cart-destroy`,
          fd
        );

        if (resp.status >= 200 && resp.status <= 399) {
          // console.log(resp.data)
          return resp;
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
      }
    },

    async fetchCategory(context) {
      try {
        const resp = await axios.get(`http://127.0.0.1:8000/api/get-category`);
        if (resp.status >= 200 && resp.status <= 399) {
          context.commit("fetchCategory", resp.data);
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
      }
    },

    async fetchUom(context) {
      try {
        const resp = await axios.get(`http://127.0.0.1:8000/api/get-uom`);
        if (resp.status >= 200 && resp.status <= 399) {
          context.commit("fetchUom", resp.data);
          console.log(resp.data);
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
      }
    },

    async fetchSubCategory(context) {
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/get-subcategory`
        );
        if (resp.status >= 200 && resp.status <= 399) {
          context.commit("fetchSubCategory", resp.data);
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
      }
    },

    async fetchBrand(context) {
      try {
        const resp = await axios.get(`http://127.0.0.1:8000/api/get-brand`);
        if (resp.status >= 200 && resp.status <= 399) {
          context.commit("fetchBrand", resp.data);
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
      }
    },
  },

  getters: {
    getSupplies(state) {
      return state.supplies;
    },

    getCategory(state) {
      return state.categories;
    },

    getSubCategory(state) {
      return state.subCategories;
    },

    getUom(state) {
      return state.uom;
    },

    getBrand(state) {
      return state.brands;
    },

    getCart(state) {
      return state.cart;
    },
  },
};
