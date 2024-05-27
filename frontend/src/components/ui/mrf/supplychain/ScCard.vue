<template>
  <!-- Card -->
  <div class="col main-card-wrapper mb-2 supplyCard">
    <div
      class="card myHover main-card"
      data-toggle="modal"
      data-target="#readmore-modal"
      @click="showDetails"
    >
      <img
        src="../../../../../public/dist/img/default-image.png"
        class="card-img-top embed-responsive-item"
        alt="..."
      />

      <div class="card-body">
        <div class="negative">
          <div class="text-truncate p-0">
            <b>{{ description }}</b>
          </div>
        </div>

        <div class="card-listx" style="font-size: 12px">
          <ul>
            <li class="text-truncate">
              Item Code:<span>{{ itemCode }}</span>
            </li>
            <li class="text-truncate">
              UoM:<span>{{ uomName }}</span>
            </li>
            <li class="text-truncate">
              Category: <span>{{ category }}</span>
            </li>
            <li class="text-truncate">
              Sub Category: <span>{{ subCategory }}</span>
            </li>
            <li class="text-truncate">
              Brand: <span>{{ brand }}</span>
            </li>
            <li class="text-truncate">
              On Hand: <span>{{ onhand }}</span>
            </li>
            <li class="text-truncate">
              SKU: <span>{{ sku }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- /.Card -->
</template>

<script>
export default {
  name: "ScCard",
  emits: ["toggle-details"],
  props: [
    "id",
    "itemCode",
    "uomName",
    "description",
    "specification",
    "uomId",
    "abbrev",
    "hasSerial",
    "category",
    "subCategory",
    "brand",
    "onhand",
    "sku",
    "eol",
    "replacement",
  ],

  methods: {
    showDetails() {
      const cardDetails = {
        id: this.id,
        itemCode: this.itemCode,
        uomName: this.uomName,
        description: this.description,
        specification: this.specification,
        uomId: this.uomId,
        abbrev: this.abbrev,
        hasSerial: this.hasSerial,
        category: this.category,
        subCategory: this.subCategory,
        brand: this.brand,
        onhand: this.onhand,
        sku: this.sku,
        eol: this.eol,
        replacement: this.replacement,
      };

      this.$emit("toggle-details", cardDetails);
    },
  },
};
</script>

<style scoped>
.card-listx ul {
  margin-top: 5px;
  padding-left: 0;
}

.card-listx ul > li {
  color: #a9a399 !important;
  list-style: none;
}

.card-listx ul > li > span {
  margin-left: 10px;
  color: #212529 !important;
}

.product-details ul {
  padding-left: 0px;
  color: #a9a399 !important;
}

.product-details ul > li {
  list-style: none;
}

.product-details ul > li > span {
  margin-left: 10px;
  color: #212529 !important;
}

.card-img-top {
  width: 100%;
  height: 10vw;
  object-fit: cover;

  /* min-height: 20vw; */
}

.myHover:hover {
  opacity: 0.8;
  cursor: pointer;
}
</style>
