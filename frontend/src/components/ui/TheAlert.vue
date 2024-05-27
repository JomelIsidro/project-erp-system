<template>
  <aside>
    <div v-if="type === 'true'" class="alert alert-success alert-dismissible">
      <h5><i class="icon fas fa-check"></i> {{ header }}!</h5>
      {{ message }}
    </div>

    <div v-else class="alert alert-danger alert-dismissible">
      <h5><i class="icon fas fa-ban"></i> {{ header }}!</h5>
      {{ message }}
    </div>
  </aside>
</template>

<script>
export default {
  props: ["header", "message", "type"],
};
</script>
