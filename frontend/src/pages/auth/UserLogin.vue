<template>
<div class="main-container d-flex justify-content-center align-items-center" style="height:100vh" >
        <!-- <div class="row justify-content-center align-items-center" style="height:100vh">
            <div class="col-lg-4">
            <div class="card">
              <div class="card-body" v-if="!isLoading" >
                <form @submit.prevent="submitForm">
                    <div class="d-flex align-items-center mb-2">
                      <h4>Procurement System ERP Web App</h4>
                    </div>
            <div class="alert alert-danger alert-dismissible fade show" v-show="!!error" role="alert">
              <strong>Error!</strong> {{ error }}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
                  <div class="form-group ">
                    <label for="email">Username:</label>
                  </div>
                  <div class="form-group ">
                    <label for="password">Password</label>
                  </div>
                  <div class="form-check mb-2 ">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Remember Me</label>
                  </div>
  
                    <div class="row ">
                      <div class="col-lg d-flex align-items-center">
                    <button type="submit"  class="btn-sm text-light bg-dark">Sign in</button>
                      </div>
                      <div class="col-lg justify-content-end d-flex align-items-center">
                    <a href="#">Forgot Password?</a>

                      </div>

                    </div>
                </form>
              </div>
              <div class="card-body" v-else>
              <loading-spinner></loading-spinner>
              </div>
              
              
            </div>
            </div>
        </div> -->








<div class="login-box ">
  <div class="login-logo">
   <b>ERP</b>Web
  </div>
  <!-- /.login-logo -->
  <div class="card " >
    <div class="card-body login-card-body rounded" style="background-color: white !important;">
        <card-spinner :show="!!isLoading"></card-spinner>

      <p class="login-box-msg">Sign in to start your session</p>

      <!-- Error Message -->
      <div class="alert alert-danger alert-dismissible fade show" v-show="!!error" role="alert">
        <strong>Error!</strong> {{ error }}
        <!-- <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> -->
      </div>

      <form @submit.prevent="submitForm">
        <div class="input-group mb-3">
          <!-- <input type="email" class="form-control" placeholder="Email"> -->
                    <input type="email" class="form-control" v-model.trim="email" id="email" aria-describedby="emailHelp" placeholder="Enter email">

          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <!-- <input type="password" class="form-control" placeholder="Password"> -->
                    <input type="password" class="form-control" v-model.trim="password" id="password" placeholder="Enter password" >

          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="remember">
              <label for="remember">
                Remember Me
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-4">
            <button type="submit" class="btn btn-dark btn-block">Sign In</button>
          </div>
          <!-- /.col -->
        </div>
      </form>

    </div>
    <!-- /.login-card-body -->
  </div>
</div>
<!-- /.login-box -->









    </div>
</template>

<script>
export default {
  data(){
    return{
      email: '',
      password: '',
      formIsValid: true,
      isLoading: false,
      error: false,
      company: 0,
    }
  },

  methods: {
    async submitForm(){
      // alert('test');
      this.error = false
      this.isLoading = true;
      const actionPayload = {
        email: this.email,
        password: this.password,
        companyId: this.company,
      };
      // console.log(actionPayload)
      try {
        await this.$store.dispatch('login', actionPayload);
        this.$router.replace('/dashboard')
      } catch (err) {
        this.error = err.message || 'Failed to authenticate, try later.';
      }
      this.isLoading = false;
    },

    getStoreData(){
      const datas = this.$store.getters.isAuthenticated;
      console.log(datas)
      // return datas ;
    },
  }
}
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
  /* background-image: url('data:image/png;base64,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');
  background-repeat:no-repeat;
  background-attachment: fixed;
  background-position: center center;
  background-size: 40%;
  opacity: .9; */

background: #000000;  /* fallback for old browsers */
background: -webkit-linear-gradient(to bottom, #434343, #000000);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to bottom, #434343, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  color: white;
}

.test {
  background-color: white !important;
}

</style>