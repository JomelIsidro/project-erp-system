<template>
  <div class="wrapper">
    <main-navbar></main-navbar>
    <main-sidebar></main-sidebar>
    <!-- <content-wrapper></content-wrapper> -->
    <div class="content-wrapper">
      <!-- <content-header></content-header> -->
      <!-- Main content -->
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <router-view></router-view>
          </div>
          <!-- /.row -->
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- /.content -->
    </div>
    <control-sidebar></control-sidebar>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainNavbar from "../../components/layout/MainNavbar.vue";
import MainSidebar from "../../components/layout/MainSidebar.vue";
// import ContentWrapper from '../../components/layout/ContentWrapper.vue';
import ControlSidebar from "../../components/layout/ControlSidebar.vue";
import MainFooter from "../../components/layout/MainFooter.vue";
export default {
  components: {
    MainNavbar,
    MainSidebar,
    // ContentWrapper,
    ControlSidebar,
    MainFooter,
  },
};
</script>
