<template>
  <body class="hold-transition sidebar-mini layout-fixed layout-navbar-fixed">
    <div class="wrapper">
      <!-- Top Navbar -->
      <nav
        class="main-header navbar navbar-expand-md navbar-light navbar-white"
      >
        <div class="container">
          <router-link to="/the-mrf" class="navbar-brand">
            <span class="brand-text font-weight-light">Material Request</span>
          </router-link>

          <div
            style="margin-left: 6rem; margin-right: 6rem"
            class="collapse navbar-collapse order-3"
            id="navbarCollapse"
          >
            <form @submit.prevent="searchMrf" class="input-group input-group-sm">
              <input
                style="height: 38px"
                class="form-control form-control-navbar"
                type="search"
                placeholder="Search"
                aria-label="Search"
                v-model.trim="keywordSearch"
                
              />
              <div class="input-group-append">
                <button class="btn btn-navbar" type="submit">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </form>
          </div>

          <!-- Responsive Burger Menu -->
          <button
            class="navbar-toggler order-2"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <!-- /.Responsive Burger Menu-->

          <!-- Right navbar links -->
          <ul class="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
            <li class="nav-item">
              <router-link to="/the-cart" class="nav-link">
                <i class="fas fa-shopping-cart"></i>
              </router-link>
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                data-widget="control-sidebar"
                data-slide="true"
                href="#"
                role="button"
              >
                <i class="fas fa-user"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <!-- /.Top Navbar -->

      <!-- Main Sidebar Container -->
      <aside
        class="main-sidebar sidebar-dark-primary elevation-4 position-fixed"
      >
        <!-- Brand Logo -->
        <router-link to="/dashboard" class="brand-link">
          <img src="../../../public/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
          <!-- <span class="brand-text font-weight-light">Filter</span> -->
                <span class="brand-text font-weight-light h6"
                  >ERP Procurement System</span
                >

          
        </router-link>

        <!-- Sidebar -->
        <div class="sidebar">
          <!-- Sidebar Menu -->
          <nav class="mt-2">
            <ul
              class="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <!-- Add icons to the links using the .nav-icon class
                    with font-awesome or any other icon font library -->

              <!-- checkbox filter nav-items   -->
              <!-- <sc-category :categories="categories"></sc-category> -->
              <!-- <sc-subcategory :subCategories="subCategories"> </sc-subcategory> -->
              <!-- <sc-brand :brands="brands"> </sc-brand> -->

              <!-- <li class="nav-header">BRAND FILTER</li> -->

              <!-- <li class="nav-header">CATEGORY FILTER</li> -->
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <!-- <i class="nav-icon fas fa-circle"></i> -->
                  <p>
                    Category
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview pl-2">
                  <li
                    class="nav-item"
                    v-for="category in categories"
                    :key="category.id"
                  >
                    <div
                      role="button"
                      class="nav-link filter-link"
                      @click="filterMrf($event,{type: 'category', category_id: category.id, category_name: category.name})"
                    >
                      <!-- <i class="far fa-circle nav-icon"></i> -->
                      <p>
                        {{ category.name }}
                        <i class="right fas fa-angle-left"></i>
                      </p>
                    </div>
                    <ul class="nav nav-treeview pl-2">
                      <li
                        class="nav-item"
                        v-for="scategory in subCategories"
                        :key="scategory.id"
                      >
                        <div
                          role="button"
                          href="#"
                          class="nav-link filter-link"
                          v-if="category.id === scategory.category_id"
                        @click="filterMrf($event,{type: 'subcategory', scategory_id: scategory.id, scategory_name: scategory.name, spcategory: scategory.category_id})"
                        >
                          <p>{{ scategory.name }}</p>
                          <!-- <i class="far fa-dot-circle nav-icon"></i> -->
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <!-- <li class="nav-header">BRAND FILTER</li> -->
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <!-- <i class="nav-icon fas fa-circle"></i> -->
                  <p>
                    Brand
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview pl-2">
                  <li class="nav-item" v-for="brand in brands" :key="brand.id">
                    <div
                      role="button"
                      class="nav-link filter-link"
                      @click="filterMrf($event,{type: 'brand', brand_id: brand.id, brand_name: brand.name})"
                    >
                      <!-- <i class="far fa-circle nav-icon"></i> -->
                      <p>
                        {{ brand.name }}
                      </p>
                    </div>
                  </li>
                </ul>
              </li>

    
   
              <button class="btn btn-sm btn-secondary mt-3" @click="clearFilterMrf">Clear All</button>

              <!-- /.checkbox filter nav-items  -->
            </ul>
          </nav>
          <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
      </aside>

      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-1"></div>
          </div>
          <!-- /.container-fluid -->
        </section>

        <!-- Main content -->
        <div class="content">
          
          <div class="container pb-3" v-if="!isSuppliesLoading">
            <div class="d-flex justify-content-between pb-4" v-if="(isSearchSubmitted) || (!!filteredBy && isFiltered)">
            <div class=" d-flex align-items-center"  v-if="isSearchSubmitted">
              <i class="fas fa-info-circle"></i>
              <div class="pl-2">Search result for '<span class="text-success">{{actualSearch}}</span>'</div>
            </div>

            <div class="d-flex align-items-center" v-if="!!filteredBy && isFiltered">
              <i class="fas fa-filter"></i>
              <div class="pl-2">Filtered by '<span class="text-success">{{filteredBy}}</span>'</div>
            </div>
            </div>


            <!-- Card Container -->
            <div class="row row-cols-1 row-cols-md-5 supplyCard-container">
              <sc-card
                v-for="supply in supplies"
                :key="supply.id"
                :id="supply.id"
                :itemCode="supply.item_code"
                :uomName="supply.uom_name"
                :description="supply.description"
                :specification="supply.specification"
                :uomId="supply.uom_id"
                :abbrev="supply.abbrev"
                :hasSerial="supply.has_serial"
                :category="supply.category"
                :subCategory="supply.sub_category"
                :brand="supply.brand"
                :onhand="supply.onhand"
                :sku="supply.sku"
                :eol="supply.eol"
                :replacement="supply.replacement"
                @toggle-details="toggleDetailsModal"
              ></sc-card>
            </div>
            <!-- /.Card Container -->

            <sc-spinner :show="this.isShow"></sc-spinner>
            <h3 class="text-center py-3" v-show="this.isLastPage">
              No More Data
            </h3>
          </div>
          <!-- /.container-fluid -->

          <skeleton-loading v-else></skeleton-loading>
        </div>
        <!-- /.Main content -->
      </div>
      <!-- /.content-wrapper -->

      <!-- Control Sidebar -->
      <control-sidebar></control-sidebar>
      <!-- /.control-sidebar -->

      <sc-modal :cardDetails="cardDetails" :uom="uom"></sc-modal>

      <!-- Main Footer -->
      <main-footer></main-footer>
    </div>
  </body>
</template>

<script>
import SkeletonLoading from "../../components/ui/mrf/supplychain/SkeletonLoading.vue";
import ScCard from "../../components/ui/mrf/supplychain/ScCard.vue";
import ScModal from "../../components/ui/mrf/supplychain/ScModal.vue";
import ScSpinner from "../../components/ui/mrf/supplychain/ScSpinner.vue";
// import ScCategory from "../../components/ui/mrf/supplychain/ScCategory.vue";
// import ScSubcategory from "../../components/ui/mrf/supplychain/ScSubcategory.vue";
// import ScBrand from "../../components/ui/mrf/supplychain/ScBrand.vue";

import ControlSidebar from "../../components/layout/ControlSidebar.vue";
import MainFooter from "../../components/layout/MainFooter.vue";

export default {
  name: "TheMrf",
  components: {
    SkeletonLoading,
    ScCard,
    ScModal,
    ScSpinner,
    // ScCategory,
    // ScSubcategory,
    // ScBrand,
    ControlSidebar,
    MainFooter,
  },

  data() {
    return {
      isSuppliesLoading: false,
      supplies: [],
      categories: [],
      subCategories: [],
      uom: [],
      brands: [],
      cardDetails: {},
      page: 1,
      isShow: false,
      isLastPage: false,

      keywordSearch: "",
      actualSearch: "",
      isSearchSubmitted: false,

      isFiltered: false,
      filteredBy:"",
      filteredData: '',

    };
  },

  async created() {
    this.isSuppliesLoading = true;
    await this.$store.dispatch("sc/deleteSupplies");
    await this.fetchCategory();
    await this.fetchSubCategory();
    await this.fetchSupplies(this.page++, false,{is_SearchSubmitted: this.isSearchSubmitted, actual_search: this.actualSearch, is_filtered: this.isFiltered, filtered_data: this.filteredData});
    await this.fetchUom();
    await this.fetchBrand();
    this.isSuppliesLoading = false;
    document.addEventListener("scroll", this.onScroll);
  },

  methods: {
    async clearFilterMrf(){
      this.isFiltered = false
      this.filteredBy = ''

      this.isSuppliesLoading = true;
      await this.fetchSupplies(1,true, {is_SearchSubmitted: this.isSearchSubmitted, actual_search: this.actualSearch, is_filtered: this.isFiltered, filtered_data: this.filteredData});
      this.isSuppliesLoading = false;

    },

    async searchMrf(){
      this.isSuppliesLoading = true;
      this.keywordSearch.length ? this.isSearchSubmitted = true : this.isSearchSubmitted = false;
      this.actualSearch = this.keywordSearch
      await this.fetchSupplies(1,true, {is_SearchSubmitted: this.isSearchSubmitted, actual_search: this.actualSearch, is_filtered: this.isFiltered, filtered_data: this.filteredData});
      this.isSuppliesLoading = false;
    },
    async filterMrf(event,data) {
      this.isFiltered = true;
      this.isSuppliesLoading = true;
      // select if 'type' is category, subcategory or brand
      if (data.type === 'category') {
        this.filteredBy = data.category_name
        this.filteredData = data
      } else if (data.type === 'subcategory'){
        this.filteredBy = data.scategory_name
        this.filteredData = data
      } else if (data.type === 'brand'){
        this.filteredBy = data.brand_name
        this.filteredData = data
      }

      // delete all node with this class
      const matches = document.querySelectorAll("i.fa-dot-circle");

      if (matches.length) {
        matches.forEach((element) => {
          element.remove();
        });
      }

      // Get the node
      const clickedElement = event.target.closest("div");

      // append to selected node
      const newNode = document.createElement("i");
      newNode.className = "far fa-dot-circle nav-icon";
      clickedElement.prepend(newNode);
      await this.fetchSupplies(1,true, {is_SearchSubmitted: this.isSearchSubmitted, actual_search: this.actualSearch, is_filtered: this.isFiltered, filtered_data: this.filteredData});
      this.isSuppliesLoading = false;



    },

    
    // reset = meaning the product list will be reset to 0 and will not just increment
    async fetchSupplies(page,firstatmpt,object) {
      // console.log(object)

      const payload = {page_number: page,first_attempt: firstatmpt, filtered_data: object}
      
      const return_data = await this.$store.dispatch("sc/fetchSupplies", payload);

      if (return_data.is_available) {
        
        if(this.$route.fullPath === '/the-mrf'){
        const supplies = await this.$store.getters["sc/getSupplies"];
        this.supplies = supplies;
        this.isLastPage = false;
        console.log(supplies);
        console.log(this.$route.fullPath)
        }

      } else {

        if (return_data.first_attempt) {
          const supplies = await this.$store.getters["sc/getSupplies"];
          this.supplies = supplies;
        } 

        this.isLastPage = true;
        // console.log("not available");
      }
    },

    async fetchUom() {
      await this.$store.dispatch("sc/fetchUom");
      const uom = await this.$store.getters["sc/getUom"];
      this.uom = uom;
    },

    toggleDetailsModal(cardDetails) {
      // console.log(cardDetails)
      this.cardDetails = cardDetails;
    },

    async onScroll() {
      const bottomOfWindow =
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        this.isLastPage = false;
        this.isShow = true;
        console.log('on scroll')
        await this.fetchSupplies(this.page++,false, {is_SearchSubmitted: this.isSearchSubmitted, actual_search: this.actualSearch, is_filtered: this.isFiltered, filtered_data: this.filteredData});
        this.isShow = false;
      }
    },

    pageup() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },

    async fetchCategory() {
      await this.$store.dispatch("sc/fetchCategory");
      const categories = await this.$store.getters["sc/getCategory"];
      console.log(categories);
      this.categories = categories;
    },

    async fetchSubCategory() {
      await this.$store.dispatch("sc/fetchSubCategory");
      const subCategories = await this.$store.getters["sc/getSubCategory"];
      console.log(subCategories);
      this.subCategories = subCategories;
    },

    async fetchBrand() {
      await this.$store.dispatch("sc/fetchBrand");
      const brands = await this.$store.getters["sc/getBrand"];
      this.brands = brands;
    },
  },
};
</script>

<style scoped>
.anyClass {
  min-height: 30px;
  max-height: 150px;

  overflow-y: scroll;
}

* {
  scroll-behavior: smooth;
}

.scroll-bar::-webkit-scrollbar {
  width: 2px;
  background-color: #343a40;
}

.scroll-bar::-webkit-scrollbar-thumb {
  background-color: #000000;
  border: 2px solid #6c757d;
}

.solid {
  border: 1px solid red;
}

.fixed-button {
  background-color: #343a40;
  color: #ffffff;
  border: none;
  outline: none;
  position: fixed;
  bottom: 0;
  right: 15px;
  height: 50px;
  width: 50px;
  margin-bottom: 20px;
  border-radius: 30px;
  box-shadow: 1px 3px 5px #888888;
  z-index: 999;
}

@keyframes wobble {
  16.65% {
    -webkit-transform: translateY(8px);
    -ms-transform: translateY(8px);
    transform: translateY(8px);
  }
  33.3% {
    -webkit-transform: translateY(-6px);
    -ms-transform: translateY(-6px);
    transform: translateY(-6px);
  }
  49.95% {
    -webkit-transform: translateY(4px);
    -ms-transform: translateY(4px);
    transform: translateY(4px);
  }
  66.6% {
    -webkit-transform: translateY(-2px);
    -ms-transform: translateY(-2px);
    transform: translateY(-2px);
  }
  83.25% {
    -webkit-transform: translateY(1px);
    -ms-transform: translateY(1px);
    transform: translateY(1px);
  }
  100% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
}

.wobble {
  -webkit-animation-name: wobble;
  animation-name: wobble;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
}
</style>
