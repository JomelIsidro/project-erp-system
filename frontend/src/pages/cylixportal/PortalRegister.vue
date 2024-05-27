<template>
  <body class="hold-transition register-page">
    <div class="register-box">
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <a href="../../index2.html" class="h1"><b>Cylix</b>Portal</a>
        </div>

        <div class="overlay" v-show="isLoading">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <div class="card-body">
          <p class="login-box-msg" v-if="isHeader">Register a new membership</p>

          <form @submit.prevent="validate">

           <p class="p-3 mb-2 bg-danger text-white" v-if="errors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
          </p>

          <!-- <div class="p-3 mb-2 bg-danger text-white">.bg-danger</div> -->

          <div class="input-group mb-3">
            <model-list-select
              :list="employees"
              v-model="selectedEmployee"
              option-value="employee_fullname"
              option-text="employee_fullname"
              placeholder="Select Employee Full Name"
              style="padding: 9px"
            >
            </model-list-select>
          </div>

          <div class="input-group mb-3">
            <input
              type="email"
              class="form-control form-control-sm"
              aria-describedby="emailHelp"
              placeholder="email@cylix.ph"
              v-model="email"
            />

            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input
              type="password"
              placeholder="Password"
              class="form-control form-control-sm toggle-password"
              v-model="password"
            />

            <div class="input-group-append">
              <div
                class="input-group-text"
                @click="togglePassword"
                style="cursor: pointer"
              >
                <i class="fas fa-eye toggle-eye"></i>
              </div>
            </div>
            <br />
          </div>
          <div class="input-group mb-3">
            <input
              type="password"
              placeholder="Confirm Password"
              class="form-control form-control-sm toggle-password"
              v-model="confirmPassword"
            />
            <div class="input-group-append">
              <div
                class="input-group-text"
                @click="togglePassword"
                style="cursor: pointer"
              >
                <i class="fas fa-eye toggle-eye"></i>
              </div>
            </div>
          </div>

          <div class="input-group mb-3">
            <model-list-select
              :list="ranks"
              v-model="selectedRank"
              option-value="code"
              option-text="name"
              placeholder="Select Rank"
              style="padding: 9px"
            >
            </model-list-select>
          </div>

          <div class="input-group mb-3">
            <model-list-select
              :list="managers"
              v-model="selectedManager"
              option-value="manager_name"
              option-text="manager_name"
              placeholder="Select Reporting Manager"
              style="padding: 9px"
            >
            </model-list-select>
          </div>

          <div class="text-right">
            <button class="btn btn-primary btn-sm">
              Register
            </button>
          </div>
        </form>
        </div>
        <!-- /.form-box -->
      </div>
      <!-- /.card -->
    </div>
    <!-- /.register-box -->
  </body>
</template>

<script>
import { ModelListSelect } from "vue-search-select";
import VsToast from "@vuesimple/vs-toast";
import axios from "axios";

export default {
  components: {
    ModelListSelect,
  },
  async created() {
    this.isLoading = true;
    await this.fetchIndex();
    this.isLoading = false;
  },

  watch: {
    // Request Details
    selectedEmployee(newValue) {
      this.userId = newValue.employee_user_id
      this.email = newValue.employee_email;
      this.companyId = newValue.employee_company_id;
      this.companyName = newValue.employee_company_name;
      this.positionId = newValue.employee_position_id;
      this.positionName = newValue.employee_position_name;
      this.departmentId = newValue.employee_department_id;
      this.departmentName = newValue.employee_department_name;



      console.log(newValue)
    },
  },

  data() {
    return {
      userId: "",
      employees: [],
      selectedEmployee: {},
      email: "",
      password: "",
      confirmPassword: "",
      companyId: "",
      companyName: "",
      positionId: "",
      positionName: "",
      departmentId: "",
      departmentName: "",

      ranks: [
        { code: 0, name: "Employee" },
        { code: 1, name: "Manager" },
      ],
      selectedRank: {},
      managers: [],
      selectedManager: {},
      isLoading: false,

      errors: [],
      isHeader: true,

      // eslint-disable-next-line
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },

  methods: {
    validate() {
      this.isHeader = false
      this.errors = [];

      // name
      if (this.selectedEmployee.employee_id === undefined) {
        this.errors.push("Name is required!");
      }

      // email
      if (!this.reg.test(this.email)) {
        this.errors.push("Insert valid email!");
      }

      // password

      if (this.password && this.confirmPassword) {
        if (this.password !== this.confirmPassword) {
          this.errors.push("Password doesn't match!");
        }

        if (this.password.length < 8) {
          this.errors.push("Your password must be at least 8 characters");
        }
        if (this.password.length > 32) {
          this.errors.push("Your password must be at max 32 characters");
        }
        /* eslint-disable no-useless-escape */
        if (this.password.search(/[a-z]/) < 0) {
          this.errors.push(
            "Your password must contain at least one lower case letter."
          );
        }
        /* eslint-disable no-useless-escape */
        if (this.password.search(/[A-Z]/) < 0) {
          this.errors.push(
            "Your password must contain at least one upper case letter."
          );
        }

        /* eslint-disable no-useless-escape */
        if (this.password.search(/[0-9]/) < 0) {
          this.errors.push("Your password must contain at least one digit.");
        }
        /* eslint-disable no-useless-escape */
        // if (this.password.search(/[!@#\$%\^&\*_]/) < 0) {
        //   this.errors.push(
        //     "Your password must contain at least special char from -[ ! @ # $ % ^ & * _ ]"
        //   );
        // }
      } else {
        this.errors.push("Password & Confirm Password is required!");
      }

      // rank
      if (this.selectedRank.code === undefined) {
        this.errors.push("Rank is required!");
      }

      // manager
      if (this.selectedManager.id === undefined) {
        this.errors.push("Reporting Manager is required!");
      }

        if(!this.errors.length){
          this.register()
        }


    

  
      
    },

    async register() {
      
        this.isLoading = true;
        const userId = this.userId;
        const selectedEmployee = this.selectedEmployee.employee_fullname
        const selectedEmployeeId = this.selectedEmployee.employee_id
        const email = this.email
        const password = this.password
        const confirmPassword = this.confirmPassword
        const selectedRank = this.selectedRank.name
        const selectedManager = this.selectedManager.id

        const companyId = this.companyId;
        const companyName = this.companyName;
        const positionId = this.positionId;
        const positionName = this.positionName;
        const departmentId = this.departmentId;
        const departmentName = this.departmentName;


        

        const data = {
          userId: userId,
          username: email,
          fullname: selectedEmployee,
          employeeId: selectedEmployeeId,
          isManager: selectedRank,
          password: password,
          password_confirmation: confirmPassword,
          rank: selectedRank,
          managerId: selectedManager,
          companyId : companyId,
          companyName : companyName,
          positionId : positionId,
          positionName : positionName,
          departmentId : departmentId,
          departmentName : departmentName,
        }

        console.warn(data);
      

    try {
        const resp = await axios.post(
          "http://portal.cylix.ph/ctiportal/public/api/register",
          data
        );
        
        const obj = resp.data
        const status = Object.keys(obj)[0]
  

        this.isLoading = false;



        if (status === 'success') {
          this.openToast(
            "top-right",
            "success",
            obj.success
          );

          this.clearForm()
        } else if (status === 'exist') {
          this.openToast(
            "top-right",
            "warning",
            obj.exist
          );
        } else if (status === 'failed') {
          this.openToast(
            "top-right",
            "warning",
            "The email has already been taken."
          );
        }



    
        
      } catch (err) {
        this.isLoading = false;
        // Handle Error Here
        console.log(err)
        this.catchError(err)
       
      }




    },


    clearForm(){
      this.selectedEmployee = {}
      this.email = ""
      this.password = ""
      this.confirmPassword = ""
      this.selectedRank = {}
      this.selectedManager = {}
      this.isLoading = false
      this.isHeader = true
    },

    async fetchIndex() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/get-cp-index`
        );

        const payload = response.data;
        const employees = payload.employees;
        const managers = payload.managers;

        console.error(employees)

        const employeesArray = [];
        for (const key in employees) {
          const request = {
            employee_user_id: employees[key].user_id,
            employee_id: employees[key].employee_id,
            employee_fullname: employees[key].employee_fullname,
            employee_email: employees[key].employee_email,
            employee_company_id: employees[key].company_id,
            employee_company_name: employees[key].company_name,
            employee_position_id: employees[key].position_id,
            employee_position_name: employees[key].position_name,
            employee_department_id: employees[key].department_id,
            employee_department_name: employees[key].department_name
          };
          employeesArray.push(request);
        }
        this.employees = employeesArray;



        const managersArray = [];
        for (const key in managers) {
          const request = {
            employee_id: managers[key].employee_id,
            id: managers[key].id,
            manager_name: managers[key].manager_name,
            username: managers[key].username,
          };
          managersArray.push(request);
        }
        this.managers = managersArray;
      } catch (error) {
        this.catchError(error);
      }
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

    catchError(err) {
      if (err.response.status === 400) {
        this.openToast(
          "top-right",
          "error",
          "Bad Request! Please message the administrator!"
        );
      } else if (err.response.status === 404) {
        this.openToast(
          "top-right",
          "error",
          "Not Found! Please message the administrator!"
        );
      } else if (err.response.status === 408) {
        this.openToast(
          "top-right",
          "error",
          "Request Timeout! Please check your internet connection"
        );
      } else if (err.response.status === 429) {
        this.openToast(
          "top-right",
          "error",
          "Too Many Request! Try again later!"
        );
      } else {
        this.openToast("top-right", "error", err.message);
      }
    },
  },
};
</script>
