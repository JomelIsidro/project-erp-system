<template>
  <li class="nav-item">
    <a href="#" class="nav-link">
      <i class="nav-icon fas fa-cubes"></i>
      <p>
        Brand
        <i class="fas fa-angle-left right"></i>
      </p>
    </a>
    <ul class="nav nav-treeview">
      <li>
        <div class="nav-link">
          <input
            type="text"
            class="form-control form-control-sm m-0"
            placeholder="Search"
            name=""
            id=""
          />
        </div>
      </li>

      <li class="nav-item anyClass scroll-bar">
        <div
          class="form-check"
          style="padding: 0 15px 0 35px"
          v-for="brand in brands"
          :key="brand.id"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :value="brand.id"
            v-model="selectedbrand"
            :id="'brand'+ brand.id"
          />
          <label
            class="form-check-label text-light"
            :for="'brand'+ brand.id"
          >
            {{ brand.name }}
          </label>
        </div>
      </li>
    </ul>
  </li>
</template>
<script>
export default {
  name: "ScBrand",
  props: {
    brands: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedbrand: [],
    };
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
</style>
