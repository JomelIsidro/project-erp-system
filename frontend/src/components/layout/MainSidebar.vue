<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <router-link to="/dashboard" class="brand-link">
      <img
        src="dist/img/AdminLTELogo.png"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: 0.8"
      />
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
          <li class="nav-header">WORKFLOW CONTROLLER</li>
          <li class="nav-item">
            <router-link to="/participants" class="nav-link">
              <i class="nav-icon far fa-circle text-light"></i>
              <p class="text">Participants
                <!-- <span class="badge badge-info right">2</span> -->
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/inputs" class="nav-link">
              <i
                class="nav-icon far fa-circle text-warning"
                style="color: yellow !important"
              ></i>
              <p>Inputs</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/approvals" class="nav-link">
              <i class="nav-icon far fa-circle text-info"></i>
              <p>Approval</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/inprogress" class="nav-link">
              <i class="nav-icon far fa-circle text-primary"></i>
              <p>In Progress
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/clarifications" class="nav-link">
              <i class="nav-icon far fa-circle text-warning"></i>
              <p>Clarification</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/approved" class="nav-link">
              <i class="nav-icon far fa-circle text-success"></i>
              <p>Approved</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/withdrawn" class="nav-link">
              <i class="nav-icon far fa-circle text-secondary"></i>
              <p>Withdrawn</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/rejected" class="nav-link">
              <i class="nav-icon far fa-circle text-danger"></i>
              <p>Rejected</p>
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {
  // data(){
  //   return {
  //     inprogressC: 0,
  //   }
  // },

  // computed: {
  //   getInprogressCount() {
  //     return this.$store.getters["status/getInprogressCount"];
  //   },
  // },

  // watch: {
  //   getInprogressCount(newValue){
  //     this.inprogressC = newValue
  //   }
  // },


}
</script>

<style scoped>
a.router-link-active{
  background: #494e53;
  color: #fff;
}
</style>


