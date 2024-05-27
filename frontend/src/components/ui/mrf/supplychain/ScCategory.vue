<template>
  <li class="nav-item">
    <a href="#" class="nav-link">
      <i class="nav-icon fas fa-boxes"></i>
      <p>
        Category
        <i class="fas fa-angle-left right"></i>
      </p>
    </a>
    <ul class="nav nav-treeview">
      <li class="nav-item">
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
          v-for="category in categories"
          :key="category.id"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :value="category.id"
            v-model="selectedCategory"
            :id="'category' + category.id"
          />
          <label
            class="form-check-label text-light"
            :for="'category' + category.id"
          >
            {{ category.name }}
          </label>
        </div>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: "ScCategory",
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedCategory: [],
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
