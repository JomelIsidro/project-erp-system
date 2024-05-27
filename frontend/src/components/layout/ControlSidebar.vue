<template>
  <!-- Control Sidebar -->
  <div>
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
    <div class="p-3">
      <h5>{{ this.fullName }}</h5>
      <div class="list-group">
        <!-- <a href="#" class="list-group-item list-group-item-action active">
          Cras justo odio
        </a>
        <a href="#" class="list-group-item list-group-item-action"
          >Dapibus ac facilisis in</a
        >
        <a href="#" class="list-group-item list-group-item-action"
          >Morbi leo risus</a
        > -->

  <button class="py-1 list-group-item list-group-item-action" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">{{ companyName }}</button>

    <div class="collapse multi-collapse" id="multiCollapseExample2">
      <button v-for="item in company" @click="switchCompany(item.companyID, item.companyName)" :key="item.id" class="py-1 list-group-item list-group-item-action" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">{{ item.companyName }}</button>
    </div>


        
        <button class="py-1 list-group-item list-group-item-action" data-toggle="modal" data-target="#changePassword">Change Password</button>
        <button @click="logout()"  class="py-1 list-group-item list-group-item-action">Logout</button>

        <!-- show details of logged user -->
        <!-- <button @click="show()"  class="py-1 list-group-item list-group-item-action"
          >show</button
        > -->
      </div>
    </div>
    
  </aside>


  <!-- Modal -->
    <div class="modal fade" id="changePassword" tabindex="-1" role="dialog" aria-labelledby="changePasswordLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="changePasswordLabel">Change Password</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">

              <div class="col-md-12" >
                <div class="form-group">
                  <small><label for="current_password">Current Password</label></small>
                  <input v-model="currentPassword" type="text" class="form-control form-control-sm py-3" id="current_password"/>
                  <small
                    class="text-danger p-0 m-0"
                    v-if="missingCurrentPassword && attemptSubmit"
                    >Current password is required!</small
                  >
                </div>
              </div>

              <div class="col-md-12" >
                <small><label for="new_password">New Password</label></small>
                <div class="input-group">
                  <input v-model="newPassword" type="password" class="form-control form-control-sm py-3 toggle-password" id="new_password"/>

                  <div class="input-group-append">
                      <div class="input-group-text" @click="togglePassword">
                        <span class="fas fa-eye toggle-eye"></span>
                      </div>
                  </div>
                </div>
                <small class="text-danger p-0 m-0" v-if="missingNewPassword && attemptSubmit">New password is required!</small>
                <small class="text-danger p-0 m-0" v-else-if="missingPasswordLength && attemptSubmit" >Password must be at least 8 characters and max 32 characters!</small>
                <small class="text-danger p-0 m-0" v-else-if="missingPasswordLowercase && attemptSubmit" >Password must contain at least one lower case letter.</small>
                <small class="text-danger p-0 m-0" v-else-if="missingPasswordUppercase && attemptSubmit" >Password must contain at least one upper case letter.</small>
                <small class="text-danger p-0 m-0" v-else-if="missingPasswordNumber && attemptSubmit" >Password must contain at least one digit.</small>
              </div>

              <div class="col-md-12" >
                <small><label for="confirm_password">Confirm Password</label></small>
                <div class="input-group">
                  <input v-model="confirmPassword" type="password" class="form-control form-control-sm py-3 toggle-password" id="confirm_password"/>
                  <div class="input-group-append">
                    <div class="input-group-text" @click="togglePassword">
                      <span class="fas fa-eye toggle-eye"></span>
                    </div>
                  </div>
                </div>
                <small class="text-danger p-0 m-0" v-if="missingConfirmPassword && attemptSubmit">Password does not match!</small>
              </div>

            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="changePassword" type="button" class="btn btn-primary" :disabled="isChangePasswordClick">Update</button>
          </div>
        </div>
      </div>
    </div>


  </div>
  
  <!-- /.control-sidebar -->
</template>

<script>
import VsToast from "@vuesimple/vs-toast";
import axios from "axios";
export default {
  data(){
    return {
      fullName: '',
      company: [],
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      attemptSubmit: false,
      isChangePasswordClick : false
    }
  },

  created() {
    this.show();
  },

  computed: {
    companyName(){
      return this.$store.getters.userLoggedIn.companyName;
    },
    missingCurrentPassword() {
      if (this.currentPassword === undefined || this.currentPassword === "") return true
      return false
    },
    missingNewPassword() {
      if (this.newPassword === undefined || this.newPassword === "") return true
      return false
    },
    missingPasswordLength() {
      if (this.newPassword.length < 8 || this.newPassword.length > 32) return true;
      return false;
    },
    missingPasswordLowercase() {
      if (this.newPassword.search(/[a-z]/) < 0) return true;
      return false;
    },
    missingPasswordUppercase() {
      if (this.newPassword.search(/[A-Z]/) < 0) return true;
      return false;
    },
    missingPasswordNumber() {
      if (this.newPassword.search(/[0-9]/) < 0) return true;
      return false;
    },
    missingConfirmPassword() {
      if (this.newPassword !== this.confirmPassword) return true
      return false
    },
  },

  watch: {
    companyName(newValue){
      console.log(newValue)
    }
  },


  methods:{
    openToast(position, variant, message) {
      const toastTitle = variant.charAt(0).toUpperCase() + variant.slice(1);
      VsToast.show({
        title: `${toastTitle}`,
        message: `${message}`,
        variant,
        position,
      });
    },

    show(){
      const data = this.$store.getters.userLoggedIn;
      this.fullName = data.fullName

      this.company = data.company;      
    },

    validateEmptyFields() {
      if (!this.missingCurrentPassword && !this.missingNewPassword && !this.missingConfirmPassword && !this.missingPasswordLength && !this.missingPasswordLowercase && !this.missingPasswordUppercase && !this.missingPasswordNumber) return true
      return false
    },

    togglePassword() {
      const icon = document.querySelectorAll(".toggle-eye");
      const password = document.querySelectorAll(".toggle-password");

      if (password[0].type === "password") {
        password.forEach((element) => {
          element.setAttribute("type", "text");
        });

        icon.forEach((element) => {
          element.classList.add("fa-eye-slash");
        });
      } else {
        password.forEach((element) => {
          element.setAttribute("type", "password");
        });

        icon.forEach((element) => {
          element.classList.remove("fa-eye-slash");
        });
      }
    },

    logout(){
      this.$store.dispatch('logout');
      this.openToast("top-right", "success", 'Logged out Successfully!');

      this.$router.replace('/')
    },

    async changePassword() {
      // this.closeModal()
      // this.$refs.closeTheModal.click()
      this.isChangePasswordClick = true
      let id = localStorage.getItem('id')
      const data = {
        current_password : this.currentPassword,
        new_password : this.newPassword,
        id : id,
      }
      this.attemptSubmit = true
      const validated = this.validateEmptyFields();

      if(validated) {
        try {
          const res = await axios.post("http://127.0.0.1:8000/api/changePassword", data);
          if(res.data.status == 'success') {
            this.openToast("top-right", "success", res.data.message);
            this.currentPassword = ""
            this.newPassword = ""
            this.isChangePasswordClick = false
          }
          else {
            this.openToast("top-right", "error", res.data.message);
            this.isChangePasswordClick = false
          }
          this.attemptSubmit = false
        } catch (err) {
          this.openToast("top-right", "error", err.message);
          this.isChangePasswordClick = false
        }
      }
      else {
        this.isChangePasswordClick = false
      }
      
    },

    closeModal() {
      document.getElementById('close').click();
      // document.getElementById('close').hide();
    },

    switchCompany(companyId, companyName){
      const selectedCompany = {
        'companyId': companyId,
        'companyName': companyName,
      }
      this.$store.dispatch('switchCompany',selectedCompany);

      if (this.$router.currentRoute.path !== '/dashboard') {
        this.$router.push('/dashboard')
      }


      this.openToast("top-right", "success", 'Switch company completed!');
          // this.openToast("top-right", "error", error.message);


      

    },
    
  }
}
</script>
