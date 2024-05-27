<template>
  <body class="hold-transition sidebar-collapse layout-top-nav layout-fixed">
    <div class="wrapper">
      <!-- Top Navbar -->
      <nav
        class="main-header navbar navbar-expand-md navbar-light navbar-white"
      >
        <div class="container">
          <!-- <a href="../../index3.html" class="navbar-brand">
            <img src="../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
            <span class="brand-text font-weight-light">Cylix Supply Chain</span>
          </a> -->

          <router-link to="/the-mrf" class="navbar-brand">
            <span class="brand-text font-weight-light">Material Request</span>
          </router-link>

          <!-- Right navbar links -->
          <ul class="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
            <li class="nav-item">
              <!-- <a class="nav-link" href="#" role="button">
                <i class="fas fa-shopping-cart"></i>
              </a> -->
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
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="../../index3.html" class="brand-link">
          <!-- <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAAB8CAMAAAAxbf5gAAAAY1BMVEXY2Njh4eEAAADd3d1gYGCqqqrR0dF2dnZ6enrU1NTFxcXNzc1jY2PAwMB9fX29vb23t7fu7u6FhYVra2svLy9QUFBVVVUUFBRbW1s4ODgcHBxDQ0OkpKQqKio9PT0jIyORkZE5aEUQAAACe0lEQVR4nO3d646qMBQF4LYbECgII5dy8TLv/5RTERRmqNHJSTzbWd8PEy0kXekdTRQf4o29dTgAAAAAAAAAAAAAAAAAAAAAgD9FkqRnvbrOD6PY/4X41dV+lNypX9jJV9f7QXLj6eBZTcgnXvL8TR6neNHTNyHef+IPxhsWtnuLG+t4FDd27i9idz7O8WRa9nt/X7bufIzjkUjK8z5NtO5ByTieiFV+bjbpd6mr+XjHG3olZZeYl6uWcXjHy4Z4ucnGeCT6z0VDco4XVI0deSTqZiwgXXXqcx6Iczzy1SYNsmTqmxTVSu/UfpaIcTwSMiuNMn0+RehPWtpz0/52Dcd4FIfjYJNBvs+jcbTp5HCeQWU4az+G8Sio1HFayWfPGxI1frgx/hSKXzzS5TGuzbeljkTVpfJygdxe249dPDs7HlOp6+NiJ0ZR0d0WP9oo//KGXbygsvOH7aBtv8hXqOz2lkTRXfonr3gkorbV9tXmOx70LZBnskUOWZihfzKKF3oR6bocW4nittJTmZ1Mvg3FoFDn9YJTvEQEtdFTfSlQ9dB+RMVs03lVnOyHrOJFx3I24Cg+9OfRGNmJ5GcIko3JiVO8qu6yxXSZmiSwO2rlr52HKGpMVmzZxNsqFSwra/vnsJt2nfaaU8ko3uHHqVVmXXPvlkrxiReuPKW2PbNw30K65zP2Vp9zylTdezafbHjHEzI3hXPwCY97vPOhNnzHB4HXgtzdP1nFc5TQXoWOIlbxSDr4ardaRsmWy7frMuySxltXHFS1WmDYrHvkb9zCMFwvWN2vseP6EuwtwgEAAAAAAAAAAAAAAAAAAADAP4Pfk3D21v8j9fEFV4Mcm4dkGBAAAAAASUVORK5CYII=" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8"> -->
          <i class="fas fa-filter"></i>
          <span class="brand-text font-weight-light pl-2">Filter</span>
        </a>

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
              <!-- nav-items checkbox filter -->
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="nav-icon far fa-envelope"></i>
                  <p>
                    Filter 1
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
                    <div class="form-check" style="padding: 0 15px 0 35px">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        class="form-check-label text-light"
                        for="flexCheckDefault"
                      >
                        Default checkbox checkbox
                      </label>
                    </div>
                  </li>
                </ul>
              </li>
              <!-- /.nav-items checkbox filter -->
            </ul>
          </nav>
          <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
      </aside>

      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
          <div class="container">
            <div class="row mb-2">
              <div class="col">
                <!-- <h1 class="m-0"> Top Navigation <small>Example 3.0</small></h1> -->
                <!-- <span>Sort By:</span> -->
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div>
          <!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->

        <cart-content></cart-content>
      </div>
      <!-- /.content-wrapper -->

      <!-- Control Sidebar -->
      <control-sidebar></control-sidebar>
      <!-- /.control-sidebar -->

      <!-- Main Footer -->
      <main-footer></main-footer>
      <!-- /.Main Footer -->

    </div>
    <!-- ./wrapper -->
  </body>
</template>

<script>
import CartContent from "../../components/ui/mrf/cart/CartContent.vue";

import ControlSidebar from "../../components/layout/ControlSidebar.vue";
import MainFooter from "../../components/layout/MainFooter.vue";
export default {
  name: "TheCart",
  components: {
    CartContent,
    ControlSidebar,
    MainFooter,
  },
};
</script>
