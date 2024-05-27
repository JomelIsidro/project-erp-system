<template>
    <div class="main-container d-flex justify-content-center align-items-center" style="height:100vh" >
        <div class="login-box ">
            <div class="login-logo">
                <b>ERP</b>Web
            </div>
            <!-- /.login-logo -->
            <div class="card " >
                <div class="card-body login-card-body rounded" style="background-color: white !important;">
                    <card-spinner :show="!!isLoading"></card-spinner>

                    <p class="login-box-msg">Register a new membership</p>

                    <form>
                        <div class="input-group mb-3">
                            <model-list-select
                                :list="userList"
                                v-model="employee"
                                option-value="fullname"
                                option-text="fullname"
                                placeholder="Select employee name"
                                style="padding: 9px"
                            >
                            </model-list-select>
                            <small class="text-danger p-0 m-0" v-if="missingFullName && attemptSubmit">Employee Name is required!</small>
                        </div>

                        <div class="input-group mb-3">
                            <input type="text" class="form-control" v-model="emp_email" placeholder="Email">

                            <div class="input-group-append">
                                <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                            <small class="w-100 text-danger p-0 m-0" v-if="isEmailExist">The email has already been taken.</small>
                        </div>

                        <div class="input-group mb-3">
                            <input type="password" class="form-control toggle-password" v-model="password" placeholder="Password">

                            <div class="input-group-append">
                                <div class="input-group-text" @click="togglePassword">
                                <span class="fas fa-eye toggle-eye"></span>
                                </div>
                            </div>
                            <small class="w-100 text-danger p-0 m-0" v-if="missingPassword && attemptSubmit" >Password is required!</small>
                            <small class="w-100 text-danger p-0 m-0" v-else-if="missingPasswordLength && attemptSubmit" >Password must be at least 8 characters and max 32 characters!</small>
                            <small class="w-100 text-danger p-0 m-0" v-else-if="missingPasswordLowercase && attemptSubmit" >Password must contain at least one lower case letter.</small>
                            <small class="w-100 text-danger p-0 m-0" v-else-if="missingPasswordUppercase && attemptSubmit" >Password must contain at least one upper case letter.</small>
                            <small class="w-100 text-danger p-0 m-0" v-else-if="missingPasswordNumber && attemptSubmit" >Password must contain at least one digit.</small>
                        </div>

                        <div class="input-group mb-3">
                            <input type="password" class="form-control toggle-password" v-model="confirmPassword" placeholder="Confirm password">

                            <div class="input-group-append">
                                <div class="input-group-text" @click="togglePassword">
                                <span class="fas fa-eye toggle-eye"></span>
                                </div>
                            </div>
                            <small class="w-100 text-danger p-0 m-0" v-if="missingConfirmPassword && attemptSubmit">Password does not match!</small>
                        </div>

                        <div class="row">
                            <div class="col-8">
                            </div>
                            <!-- /.col -->
                            <div class="col-4">
                                <button type="submit" :disabled="isButtonDisabled" class="btn btn-dark btn-block" @click.prevent="register">Register</button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </form>

                </div>
                <!-- /.login-card-body -->
            </div>
        </div>

    </div>
</template>

<script>
/*eslint-disable*/
import { ModelListSelect } from "vue-search-select";
import axios from "axios";
import VsToast from "@vuesimple/vs-toast";

export default {
  components: {
    ModelListSelect,
  },
  created() {
    this.users();
  },
  watch: {
    employee(newValue) {
        this.isEmailExist = false
        this.id = newValue.id
        this.empId = newValue.empId
        this.emp_email = newValue.email
        this.emp_fullname = newValue.fullname
        this.emp_fname = newValue.fname
        this.emp_lname = newValue.lname
        this.department = newValue.department
        this.position = newValue.position
    },
  },
  computed: {
    missingFullName() {
      if (this.emp_fullname === undefined || this.emp_fullname == "") return true;
      return false;
    },
    missingPassword() {
      if (this.password === undefined || this.password == "") return true;
      return false;
    },
    missingPasswordLength() {
      if (this.password.length < 8 || this.password.length > 32) return true;
      return false;
    },
    missingPasswordLowercase() {
      if (this.password.search(/[a-z]/) < 0) return true;
      return false;
    },
    missingPasswordUppercase() {
      if (this.password.search(/[A-Z]/) < 0) return true;
      return false;
    },
    missingPasswordNumber() {
      if (this.password.search(/[0-9]/) < 0) return true;
      return false;
    },
    missingConfirmPassword() {
      if (this.password !== this.confirmPassword) return true;
      return false;
    },
  },
  data() {
    return {
      userList: [],
      employee : {},
      emp_email : "",
      emp_fullname : "",
      emp_fname : "",
      emp_lname : "",
      emp_id : "",
      id: "",
      department: "",
      position: "",
      password : "",
      confirmPassword : "",
      attemptSubmit : false,
      isEmailExist : false,
      isLoading: false,
      isButtonDisabled : false
    };
  },
  methods: {
    async users() {
      this.isLoading = true;

      const response = await fetch(
        `http://127.0.0.1:8000/api/show-user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to fetch Projects."
        );
        throw error;
      }

      const payload = [];
      for (const key in responseData) {
        const request = {
          id: responseData[key].id,
          empId: responseData[key].SysPK_Empl,
          fullname: responseData[key].UserFull_name,
          fname: responseData[key].FirstName_Empl,
          lname: responseData[key].LastName_Empl,
          email: responseData[key].UserName_User,
          department: responseData[key].DepartmentName,
          position: responseData[key].PositionName,
        };
        payload.push(request);
      }
      this.userList = payload;
      this.isLoading = false;
    },

    async register() {
        this.attemptSubmit = true
        const validated = this.validateEmptyFields()

        if(validated) {
            this.isButtonDisabled = true
            this.isLoading = true;
            const data = {
                'id' : this.id,
                'name' : this.emp_fullname,
                'email' : this.emp_email,
                'password' : this.password,
                'employee_id' : this.empId,
                'fname' : this.emp_fname,
                'lname' : this.emp_lname,
                'department' : this.department,
                'positionName' : this.position,
            }

            try {
                const resp = await axios.post("http://127.0.0.1:8000/api/register", data);

                if(resp.data.status == 'success') {
                  this.emp_email = ""
                  this.employee = {}
                  this.password = ""
                  this.confirmPassword = ""
                  this.attemptSubmit = false
                  this.openToast("top-right", "success", resp.data.message);
                  this.isButtonDisabled = false
                  this.isLoading = false
                }else {
                    this.isEmailExist = true
                    this.isButtonDisabled = false
                    this.isLoading = false
                }
            } catch (err) {
                console.error(err);
            }
        }
    },

    validateEmptyFields() {
        if(!this.missingFullName && !this.missingPassword && !this.missingPasswordLength && !this.missingPasswordLowercase && !this.missingPasswordUppercase && !this.missingPasswordNumber && !this.missingConfirmPassword) return true 
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
.card {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  background-color: #ffffff;
  opacity: .9;
  /* background-color:red ; */

}


.main-container {
    background: #000000;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #434343, #000000);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #434343, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: white;
}

.test {
  background-color: white !important;
}

</style>