// let timer;
export default {
  state() {
    return {
      user: {
        id: null,
        fullName: null,
        email: null,
        admin: null,
        employee_id: null,
        fname: null,
        lname: null,
        department: null,
        positionName: null,
        companyId: null,
        companyName: null,
        token: null,
        expiresAt: null,
        isManager: null,
        // didAutoLogout: false
        company: [],
      },
    };
  },
  mutations: {
    setUser(state, payload) {
      state.user.id = payload.id;
      state.user.fullName = payload.fullName;
      state.user.email = payload.email;
      state.user.admin = payload.admin;
      state.user.employee_id = payload.employee_id;
      state.user.fname = payload.fname;
      state.user.lname = payload.lname;
      state.user.department = payload.department;
      state.user.positionName = payload.positionName;
      state.user.companyId = payload.companyId;
      state.user.companyName = payload.companyName;
      state.user.token = payload.token;
      state.user.expiresAt = payload.expiresAt;
      state.user.company = payload.company;
      // state.user.didAutoLogout = false;
    },

    logout(state, payload) {
      state.user.id = payload.id;
      state.user.fullName = payload.fullName;
      state.user.email = payload.email;
      state.user.admin = payload.admin;
      state.user.employee_id = payload.employee_id;
      state.user.fname = payload.fname;
      state.user.lname = payload.lname;
      state.user.department = payload.department;
      state.user.positionName = payload.positionName;
      state.user.companyId = payload.companyId;
      state.user.companyName = payload.companyName;
      state.user.token = payload.token;
      state.user.expiresAt = payload.expiresAt;
      state.user.company = payload.companies;
    },

    // setAutoLogout(state) {
    //   state.didAutoLogout = true;
    // }

    switchCompany(state, payload){
      state.user.companyId = payload.companyId;
      state.user.companyName = payload.companyName;
    },


 
  },
  actions: {
    async login(context, payload) {
      // console.log(payload);
      const response = await fetch("http://127.0.0.1:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          // companyId: payload.companyId,
        }),
      });

      const responseData = await response.json();
      // console.log(responseData);

      if (!response.ok) {
        const error = new Error(
          responseData.message ||
            "Failed to authenticate. Check your login data."
        );

        // Manual Handle Auth
        //   if (api_call.status == 200) {
        //     // You can do your error handling here
        // } else {
        //     // Call the .json() method on your response to get your JSON data
        //     const data = await api_call.json();
        // }

        console.log(error.message);
        throw error;
      }

      // // + is added to make sure that this is converted to a number
      // const expiresIn = 5000;
      // // const expiresIn = +responseData.expires_at * 1000;
      // const expirationDate = new Date().getTime() + expiresIn;


      // save data user logged data to local storage
      localStorage.setItem("id", responseData.user.id);
      localStorage.setItem("fullName", responseData.user.name);
      localStorage.setItem("email", responseData.user.email);
      localStorage.setItem("admin", responseData.user.admin);
      localStorage.setItem("employee_id", responseData.user.employee_id);
      localStorage.setItem("fname", responseData.user.fname);
      localStorage.setItem("lname", responseData.user.lname);
      localStorage.setItem("department", responseData.user.department);
      localStorage.setItem("positionName", responseData.user.positionName);
      localStorage.setItem("companyId", responseData.user.companyId);
      localStorage.setItem("companyName", responseData.user.companyName);
      localStorage.setItem("token", responseData.Personal_Access_Token);
      localStorage.setItem("expiresAt", responseData.expires_at);
      localStorage.setItem("isManager", responseData.isManager);
      localStorage.setItem("company", JSON.stringify(responseData.company));



      
      // localStorage.setItem("tokenExpiration", expirationDate);

      // timer = setTimeout(function() {
      //   context.dispatch('autoLogout');
      // }, expiresIn);


      context.commit("setUser", {
        id: responseData.user.id,
        fullName: responseData.user.name,
        email: responseData.user.email,
        admin: responseData.user.admin,
        employee_id: responseData.user.employee_id,
        fname: responseData.user.fname,
        lname: responseData.user.lname,
        department: responseData.user.department,
        positionName: responseData.user.positionName,
        companyId: responseData.user.companyId,
        companyName: responseData.user.companyName,
        token: responseData.Personal_Access_Token,
        expiresAt: responseData.expires_at,
        isManager: responseData.isManager,
        company: responseData.company,
        
      });
    },



    // try to login
    tryLogin(context) {
      const id = localStorage.getItem("id");
      const fullName = localStorage.getItem("fullName");
      const email = localStorage.getItem("email");
      const admin = localStorage.getItem("admin");
      const employee_id = localStorage.getItem("employee_id");
      const fname = localStorage.getItem("fname");
      const lname = localStorage.getItem("lname");
      const department = localStorage.getItem("department");
      const positionName = localStorage.getItem("positionName");
      const companyId = localStorage.getItem("companyId");
      const companyName = localStorage.getItem("companyName");
      const token = localStorage.getItem("token");
      const expiresAt = localStorage.getItem("expiresAt");
      const isManager = localStorage.getItem("isManager");
      let company = localStorage.getItem("company");

      company = JSON.parse(company);

      // const tokenExpiration = localStorage.getItem("tokenExpiration");

      // const expiresIn = +tokenExpiration - new Date().getTime();

      // if (expiresIn < 0) {
      //   return;
      // }

      // timer = setTimeout(function() {
      //   context.dispatch('autoLogout');
      // }, expiresIn);
    

      if (token && id) {
        context.commit("setUser", {
          id: id,
          fullName: fullName,
          email: email,
          admin: admin,
          employee_id: employee_id,
          fname: fname,
          lname: lname,
          department: department,
          positionName: positionName,
          companyId: companyId,
          companyName: companyName,
          token: token,
          expiresAt: expiresAt,
          isManager: isManager,
          company: company,
        });
      }
    },

    logout(context) {
      localStorage.removeItem('id')
      localStorage.removeItem('fullName')
      localStorage.removeItem('email')
      localStorage.removeItem('admin')
      localStorage.removeItem('employee_id')
      localStorage.removeItem('fname')
      localStorage.removeItem('lname')
      localStorage.removeItem('department')
      localStorage.removeItem('positionName')
      localStorage.removeItem('companyId')
      localStorage.removeItem('companyName')
      localStorage.removeItem('token')
      localStorage.removeItem('expiresAt')
      localStorage.removeItem('isManager')
      localStorage.removeItem('company')


      // localStorage.removeItem('tokenExpiration')

      // clearTimeout(timer);

      context.commit("setUser", {
        id: null,
        fullName: null,
        email: null,
        admin: null,
        employee_id: null,
        fname: null,
        lname: null,
        department: null,
        positionName: null,
        companyId: null,
        companyName: null,
        token: null,
        expiresAt: null,
        isManager: null,
        company: null,

        
      });
    },

    switchCompany(context, payload){
      localStorage.setItem("companyId", payload.companyId);
      localStorage.setItem("companyName", payload.companyName);
      context.commit("switchCompany",payload)
    },


    // autoLogout(context){
    //   context.dispatch('logout')
    //   context.commit('setAutoLogout')
    // }
  },
  getters: {
    userLoggedIn(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return !!state.user.token;
    },
    listCompanies(state) {
      return state.user.companies;
    },

    selectedCompany(state){
      return state.user.companyName;
    }

    // auto logout remove for now
    // didAutoLogout(state) {
    //   return state.didAutoLogout;
    // }
  },
};
