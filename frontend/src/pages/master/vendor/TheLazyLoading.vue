<template>
    <div class="col-md-12 mt-3">
      
        <div class="heading">
            <h1>Infinite Scroll</h1>
            <h4>A simple infinite scroll example using Vue.js</h4>
            </div>

            <div class="container" id="app">
            
            <div class="list-group-wrapper">
                <transition name="fade">
                <div class="loading" v-show="loading">
                    <span class="fa fa-spinner fa-spin"></span> Loading
                </div>
                </transition>
                <ul class="list-group" id="infinite-list">
                    <li class="list-group-item" v-for="item in items" v-text="item" :key="item.id"></li>
                </ul>
            </div>
        
        </div>

    </div>
  </template>
  
  <script>

  export default {
    mounted() {
        // Detect when scrolled to bottom.
        const listElm = document.querySelector('#infinite-list');
        listElm.addEventListener('scroll', e => {
            console.log(e)
            if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
                this.loadMore();
            }
        });

        // Initially load some items.
        this.loadMore();
    },
  
    data() {
      return {
        loading: false,
        nextItem: 1,
        items: [],
        counter: 0
      }
    },
  
    methods: {
        loadMore () {
      
            /** This is only for this demo, you could 
            * replace the following with code to hit 
            * an endpoint to pull in more data. **/
            this.loading = true;
            setTimeout(e => {
                console.log(e)
                this.getReportingManager(10, this.counter)
                for (var i = 0; i < 10; i++) {
                    this.items.push('Item ' + this.nextItem++);
                }
                this.loading = false;
            }, 1000);
            /**************************************/
        },

        async getReportingManager(limit, offset) {
            const response = await fetch(
                `http://127.0.0.1:8000/api/getLazyLoadingList/${limit}/${offset}`,
                {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                }
            );
            const responseData = await response.json();

            console.log(responseData)

            this.counter = this.counter + 10
            console.log(this.counter);

            // const responseData = await response.json();
            // if (!response.ok) {
            //     const error = new Error(
            //     responseData.message || "Failed to fetch Reporting Manager."
            //     );
            //     throw error;
            // }

            // const reportingManager = [];
            // for (const key in responseData) {
            //     const request = {
            //     code: responseData[key].RMID,
            //     name: responseData[key].RMName,
            //     };
            //     reportingManager.push(request);
            // }
            // this.reportingManager = reportingManager;
            // this.isLoading = false;
            },
    },

  };
  </script>
  
  <style scoped>
body {
  background-color: #5c4084;
  padding: 50px;
}

.container {
  padding: 40px 80px 15px 80px;
  background-color: #fff;
  border-radius: 8px;
  max-width: 800px;
}

.heading {
  text-align: center;
}
.heading h1 {
  background: -webkit-linear-gradient(#fff, #999);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  text-align: center;
  margin: 0 0 5px 0;
  font-weight: 900;
  font-size: 4rem;
  color: #fff;
}
.heading h4 {
  color: #a990cc;
  text-align: center;
  margin: 0 0 35px 0;
  font-weight: 400;
  font-size: 24px;
}

.list-group-wrapper {
  position: relative;
}

.list-group {
  overflow: auto;
  height: 50vh;
  border: 2px solid #dce4ec;
  border-radius: 5px;
}

.list-group-item {
  margin-top: 1px;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 2px solid #dce4ec;
}

.loading {
  text-align: center;
  position: absolute;
  color: #fff;
  z-index: 9;
  background: #5c4084;
  padding: 8px 18px;
  border-radius: 5px;
  left: calc(50% - 45px);
  top: calc(50% - 18px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
  </style>
  