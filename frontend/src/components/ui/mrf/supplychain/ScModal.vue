<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="readmore-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="readmore-modalLabel"
    aria-hidden="true"
    data-backdrop="static"
    data-keyboard="false"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="overlay" v-show="isModalLoading">
          <i class="fas fa-2x fa-sync fa-spin"> </i>
        </div>

        <div class="modal-header">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- Default box -->

          <div class="card-body">
            <div class="row">
              <div class="col-12 col-sm-6">
                <div class="col-12">
                  <img
                    src="../../../../../public/dist/img/default-image.png"
                    class="product-image"
                    alt="Product Image"
                  />
                </div>
                <div class="col-12 product-image-thumbs">
                  <div class="product-image-thumb">
                    <img
                      @click="changeModalImage"
                      src="../../../../../public/dist/img/default-image.png"
                      alt="Product Image"
                    />
                  </div>
                  <div class="product-image-thumb">
                    <img
                      @click="changeModalImage"
                      src="../../../../../public/dist/img/default-image.png"
                      alt="Product Image"
                    />
                  </div>
                  <div class="product-image-thumb">
                    <img
                      @click="changeModalImage"
                      src="../../../../../public/dist/img/default-image.png"
                      alt="Product Image"
                    />
                  </div>
                  <div class="product-image-thumb">
                    <img
                      @click="changeModalImage"
                      src="../../../../../public/dist/img/default-image.png"
                      alt="Product Image"
                    />
                  </div>
                  <div class="product-image-thumb">
                    <img
                      @click="changeModalImage"
                      src="../../../../../public/dist/img/default-image.png"
                      alt="Product Image"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-6">
                <h3 class="my-3">
                  {{ cardDetails.description }}
                </h3>
                <hr />
                <h6><b>Product Details</b></h6>

                <div class="product-details">
                  <ul>
                    <li>
                      Item Code:
                      <span class="ml-2">{{ cardDetails.itemCode }}</span>
                    </li>
                    <!-- <li>
                      UoM: <span class="ml-2">{{ cardDetails.uomName }}</span>
                    </li> -->
                    <li>
                      Has Serial:
                      <span class="ml-2">{{ cardDetails.hasSerial }}</span>
                    </li>
                    <li>
                      Category
                      <span class="ml-2">{{ cardDetails.category }}</span>
                    </li>
                    <li>
                      Sub Category:
                      <span class="ml-2"> {{ cardDetails.subCategory }}</span>
                    </li>
                    <li>
                      Brand: <span class="ml-2">{{ cardDetails.brand }}</span>
                    </li>
                    <li>
                      Qty on Hand:
                      <span class="ml-2">{{ cardDetails.onhand }}</span>
                    </li>
                    <li>
                      Sku: <span class="ml-2">{{ cardDetails.sku }}</span>
                    </li>

                    <li class="mt-2">
                      <div class="row">
                        <div class="col-md-2 d-flex align-items-center">
                          UOM:
                        </div>

                        <div class="col-md-5">
                          <!-- <model-list-select
                            :list="uom"
                            v-model="selectedUom"
                            option-value="uom_id"
                            option-text="uom_name"
                            placeholder="select item"
                            style="padding: 9px"
                          >
                          </model-list-select> -->

                          <select
                            class="form-control form-control-sm"
                            v-model="selectedUom"
                          >
                            <option
                              :value="item"
                              v-for="item in uom"
                              :key="item.uom_id"
                            >
                              {{ item.uom_name }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </li>

                    <li class="mt-2">
                      <div class="row">
                        <div class="col-md-2 d-flex align-items-center">
                          Quantity:
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-6">
                          <div
                            class="
                              qty-wrapper
                              d-flex
                              flex-nowrap
                              justify-content-start
                              align-items-center
                            "
                          >
                            <button
                              class="btn btn-sm btn-light"
                              @click="decrement"
                              style="width: 40px"
                            >
                              -
                            </button>
                            <input
                              class="
                                form-control form-control-sm
                                p-0
                                text-center
                              "
                              type="text"
                              :value="qty"
                              style="max-width: 70px; background-color: white"
                              readonly
                            />

                            <button
                              class="btn btn-sm btn-light"
                              @click="increment"
                              style="width: 40px"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <nav class="w-100">
                <div class="nav nav-tabs" id="product-tab" role="tablist">
                  <a
                    class="nav-item nav-link active"
                    id="product-desc-tab"
                    data-toggle="tab"
                    href="#product-desc"
                    role="tab"
                    aria-controls="product-desc"
                    aria-selected="true"
                    >Description</a
                  >
                </div>
              </nav>
              <div class="tab-content p-3" id="nav-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="product-desc"
                  role="tabpanel"
                  aria-labelledby="product-desc-tab"
                >
                  {{ cardDetails.specification }}
                </div>
              </div>
            </div>
          </div>
          <!-- /.card-body -->
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success btn-sm"
            @click="addToCart"
          >
            <i class="fas fa-cart-plus mr-2"></i>Add To Cart
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- /.Modal -->
</template>

<script>
import VsToast from "@vuesimple/vs-toast";
// import { ModelListSelect } from "vue-search-select";
export default {
  // components: {
  //   ModelListSelect,
  // },
  name: "ScModal",
  props: {
    cardDetails: {
      type: Object,
      required: true,
    },
    uom: {
      type: Array,
      required: false,
    },
  },

  watch: {
    cardDetails() {
      this.selectedUom = {
        uom_id: this.$props.cardDetails.uomId,
        uom_name: this.$props.cardDetails.uomName,
      };
    },
  },

  data() {
    return {
      isModalLoading: false,
      selectedUom: {},
      qty: 1,
    };
  },

  methods: {
    decrement() {
      if (this.qty <= 1) {
        this.openToast(
          "top-right",
          "error",
          "Negative quantity is not allowed!"
        );
      } else {
        this.qty--;
      }
    },
    increment() {
      this.qty++;
    },

    changeModalImage(event) {
      // console.log(event.target.src)
      const img = document.getElementsByClassName("product-image");
      img[0].src = event.target.src;
    },

    async addToCart() {
      const uom_id = this.selectedUom.uom_id;
      const uom_name = this.selectedUom.uom_name;
      const qty = this.qty;

      Object.assign(this.cardDetails, {
        cart_uom_id: uom_id,
        cart_uom_name: uom_name,
        cart_quantity: qty,
      });

      if (uom_id) {
        try {
          this.isModalLoading = true;
          const response = await this.$store.dispatch(
            "sc/addToCart",
            this.cardDetails
          );

          if (response.status >= 200 && response.status <= 399) {
            this.openToast("top-right", "success", response.data);
          }

          this.isModalLoading = false;
        } catch (err) {
          this.isModalLoading = false;

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
        }
      } else {
        this.openToast("top-right", "error", "Please select UoM!");
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
.product-details ul {
  padding-left: 0px;
  color: #a9a399 !important;
}

.product-details ul li {
  list-style: none;
}

.product-details ul li span {
  color: #212529 !important;
}

/* Skeleton Modal */
.skeleton-img {
  background-color: #d9d9d9;
  min-height: 150px;
  position: relative;
  border-radius: 2px;
}

.skeleton-wrapper-upper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 2%;
}

.skeleton-wrapper-upper .skeleton-title {
  min-height: 28px;
  background: #d9d9d9;
  display: block;
  position: relative;
}

.skeleton-wrapper-upper .skel-sp {
  height: 16px;
  background: #d9d9d9;
  display: block;
  position: relative;
  margin-top: 10px;
  border-radius: 2px;
  overflow: hidden;
}

.skeleton-wrapper-lower .skeleton-paragraph {
  min-height: 120px;
  background: #d9d9d9;
  display: block;
  position: relative;
  border-radius: 2px;
}

.skeleton-list0 {
  width: 87%;
}

.skeleton-list1 {
  width: 82%;
}

.skeleton-list2 {
  width: 92%;
}

.skeleton-list3 {
  width: 90%;
}

.skeleton-list4 {
  width: 85%;
}

.skeleton-list5 {
  width: 94%;
}

.skeleton-list6 {
  width: 82%;
}

.skeleton-list7 {
  width: 89%;
}

.skeleton-img::before,
.skeleton-title::before,
.skeleton-paragraph::before,
.skeleton-wrapper-upper .skel-sp::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    to right,
    #d9d9d9 0%,
    rgba(0, 0, 0, 0.05) 20%,
    #d9d9d9 40%,
    #d9d9d9 100%
  );
  background-size: 450px 400px;
  background-repeat: no-repeat;
  animation: shimmer 1s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: -450px 0;
  }

  100% {
    background-position: 450px 0;
  }
}

/* Skeleton Modal */
</style>
