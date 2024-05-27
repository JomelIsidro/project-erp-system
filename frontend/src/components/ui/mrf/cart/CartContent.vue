<template>
  <!-- Main content -->

  <div class="content">
    <cart-skeleton v-if="isCartLoading"></cart-skeleton>

    <div class="container pb-4" v-else>
      <!-- Checkout Header -->
      <div class="card">
        <div class="card-body p-2">
          <div class="checkout-header">
            <div class="checkout-seven">
              <div class="text-center">
                <input
                  type="checkbox"
                  name="check"
                  class="check-box"
                  id="checkHeader"
                  @click="massCheck($event)"
                />
              </div>
              <div class="">Product Details</div>
            </div>
            <div class="text-center">UoM</div>
            <div class="text-center">Qty</div>
            <div class="text-center">Actions</div>
          </div>
        </div>
      </div>
      <!-- /.Checkout header -->

      <!-- Checkout list -->
      <aside class="anyClass scroll-bar mb-3 p-0">
        <div class="card p-5" v-if="isCart">
          <div class="card-body text-center">
            <h3>Your cart is empty!</h3>
          </div>
        </div>

        <cart-card
          v-else
          v-for="crt in cart"
          :key="crt.cart_id"
          :cart_id="crt.cart_id"
          :cart_userid="crt.cart_userid"
          :cart_companyid="crt.cart_companyid"
          :cart_group_detail_id="crt.cart_group_detail_id"
          :cart_uom_id="crt.cart_uom_id"
          :cart_uom_name="crt.cart_uom_name"
          :cart_status="crt.cart_status"
          :cart_quantity="crt.cart_quantity"
          :created_at="crt.created_at"
          :updated_at="crt.updated_at"

          :subcategory_id="crt.subcategory_id"
          :subcategory_name="crt.subcategory_name"
          :subcategory_category_id="crt.subcategory_category_id"
          
          :selected_uom="{uom_id: crt.cart_uom_id, uom_name:crt.cart_uom_name}"
          :uom="uom"

          :specification="crt.specification"
          :description="crt.description"
          :item_code="crt.item_code"
          :category_id="crt.category_id"
          :category_name="crt.category_name"
          :brand_id="crt.brand_id"
          :brand_name="crt.brand_name"
          
          @delete-product="beforeDeleteProduct"
          @toggle-checkbox="beforeToggleCheckbox"
          @decrease-product-qty="productQtyChange"
          @increase-product-qty="productQtyChange"
          @change-uom="changeUom"
        >
        </cart-card>
      </aside>

      <!-- /.Checkout list -->

      <!-- Checkout Footer -->
      <div class="card">
        <div class="card-body p-2">
          <div class="checkout-footer">
            <div class="seven-left">
              <div class="text-center check-form">
                <input
                  type="checkbox"
                  name="check"
                  class="check-box"
                  id="checkFooter"
                  @click="massCheck($event)"
                />
              </div>
              <div class="check-form-sel">
                <span
                  >Selected: <b>{{ selectedCount }}</b
                  >pc(s)</span
                >

                <button
                  class="ml-4 btn btn-sm btn-danger"
                  @click="beforeDeleteAll"
                >
                  Delete All<i class="fas fa-trash ml-2"></i>
                </button>
              </div>
            </div>
            <div></div>
            <div class="text-center">
              <router-link to="/the-mrf" class="btn btn-sm btn-secondary">
                <i class="fas fa-arrow-left mr-2"></i>Back
              </router-link>

   


            </div>
            <div class="text-center">
              <button class="btn btn-sm btn-success" @click="next">
                Next<i class="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- /.Checkout Footer -->
    </div>
    <!-- /.container-fluid -->
  </div>
  <!-- /.content -->
</template>

<script>
import CartSkeleton from "../cart/CartSkeleton.vue";
import CartCard from "./CartCard.vue";
import VsToast from "@vuesimple/vs-toast";

export default {
  name: "CartContent",
  components: {
    CartSkeleton,
    CartCard,
  },
  computed: {
    stateCart() {
      return this.$store.getters["sc/getCart"];
    },
  },

  watch: {
    stateCart(newValue) {
      this.cart = newValue;
      this.countSelectedCart(newValue);

      // console.log(newValue)
    },
  },

  data() {
    return {
      isCartLoading: false,
      cart: [],
      isCart: false,
      selectedCount: 0,
      uom: [],
    };
  },

  async created() {
    this.isCartLoading = true;
    await this.fetchCart();
    await this.fetchUom();
    this.isCartLoading = false;
  },

  methods: {
    async fetchUom(){
      await this.$store.dispatch("sc/fetchUom");
      const uom = await this.$store.getters["sc/getUom"];
      this.uom = uom;
    },

    async fetchCart() {
      this.isCartLoading = true;
      this.isCart = false;

      const isCart = await this.$store.dispatch("sc/fetchCart");

      if (!isCart) {
        this.isCart = true;
      } else {
        this.isCart = false;
      }
      this.isCartLoading = false;


    },

    productQtyChange(object) {
      this.$store.dispatch("sc/productQtyChange", object);
    },

    async next() {
      if (this.selectedCount) {
        try {
          const updatedCart = this.$store.getters["sc/getCart"];

          const response = await this.$store.dispatch(
            "sc/updateCart",
            updatedCart
          );

          this.openToast("top-right", "success", response.data);
          this.$router.replace("/the-mr");

        } catch (err) {
          this.catchError(err);
        }
      } else {
          this.openToast("top-right", "error", "Select product to checkout!");

      }
    },

    async beforeDeleteProduct(product) {
      const arrayProduct = [];
      arrayProduct.push(product.cart_id);

      console.log(arrayProduct);

      await this.deleteProduct(arrayProduct);
    },

    countSelectedCart(object) {
      const checked = 2;
      const count = object.filter((obj) => obj.cart_status === checked).length;

      this.selectedCount = count;
    },

    async deleteProduct(product) {
      try {
        const response = await this.$store.dispatch(
          "sc/deleteProduct",
          product
        );

        if (response.status >= 200 && response.status <= 399) {
          this.openToast("top-right", "success", response.data);
          await this.fetchCart();
        }
      } catch (err) {
        this.catchError(err);
      }
    },

    massCheck(event) {
      const footercheckbox = document.querySelectorAll(".check-box");

      if (event.target.checked) {
        footercheckbox.forEach((element) => {
          element.checked = true;
          this.$store.dispatch("sc/toggleAllCheckbox", true);
        });
      } else {
        footercheckbox.forEach((element) => {
          element.checked = false;
          this.$store.dispatch("sc/toggleAllCheckbox", false);
        });
      }
    },

    async beforeDeleteAll() {
      if (this.selectedCount) {
        const cart = this.$store.getters["sc/getCart"];

        const arrayProduct = [];
        cart.forEach((element) => {
          if (element.cart_status === 2) {
            arrayProduct.push(element.cart_id);
          }
        });

        await this.deleteProduct(arrayProduct);
      } else {
        this.openToast("top-right", "error", "Select a product to delete!");
      }
    },

    changeUom(uom){
      this.$store.dispatch("sc/changeUom", uom);
    },

    beforeToggleCheckbox(cartData) {
      const arrayCart = [];
      arrayCart.push(cartData);

      this.toggleCheckbox(arrayCart);
    },

    toggleCheckbox(cartData) {
      this.$store.dispatch("sc/toggleCheckbox", cartData);
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

    openToast(position, variant, message) {
      const toastTitle = variant.charAt(0).toUpperCase() + variant.slice(1);
      VsToast.show({
        title: `${toastTitle}`,
        message: `${message}`,
        variant,
        position,
      });
    },
  },
};
</script>

<style scoped>
.checkout-header {
  display: grid;
  grid-template-columns: 7fr 2fr 2fr 1fr;
}

.checkout-header .checkout-seven {
  display: grid;
  grid-template-columns: 1fr 11fr;
}

.checkout-footer {
  display: grid;
  grid-template-columns: 7fr 3fr 1fr 1fr;
}

.checkout-footer .seven-left {
  display: grid;
  grid-template-columns: 1fr 11fr;
}

.seven-left .check-form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.seven-left .check-form-sel {
  display: flex;
  align-items: center;
}

.anyClass {
  min-height: 30px;
  max-height: 600px;

  overflow-y: scroll;
}

.scroll-bar::-webkit-scrollbar {
  width: 2px;
  background-color: #f5f5f5;
}

.scroll-bar::-webkit-scrollbar-thumb {
  background-color: #000000;
  border: 2px solid #6c757d;
}

.solid {
  border: 1px solid red;
}
</style>
