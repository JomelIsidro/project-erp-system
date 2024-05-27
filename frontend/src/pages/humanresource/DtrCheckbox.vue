<template>
    <div class="action-buttons d-flex justify-content-center m-0 p-0">
        <button data-toggle="tooltip" data-placement="top" title="Add to Selected List" :class="isClick" @click="handleAction()">
            <i :class="isIcon"></i>
        </button>

        <!-- <button @click="test()">test</button> -->
    </div>


</template>
<script>


export default {

    name: "DtrCheckbox",
    computed: {
      isClick(){
        if (this.isSelected) {
          return "btn btn-info btn-sm"
        } else {
          // console.log(this.data.selected)
          return "btn btn-outline-info btn-sm"
        }
      },

      isIcon(){
        if (this.isSelected) {
          return "fas fa-check"
        } else {
          // console.log(this.data.selected)
          return "fas fa-circle"
        }
      },
      
      isSelected(){
        return this.$store.getters['dtr/findSelectedDtr'](this.data.id);
      }
    },
    // watch: {
    //   isSelected(newValue){
    //     // this.selectedData = newValue
    //     console.warn(newValue)
    //   }
    // },

    methods: {
      // test(){
      //   console.log(this.isSelected.selected)
      // },

        async handleAction() {

            // const id = this.data.id; // 123
            // // const name = this.data.workflow+'byId'; // inprogressbyId

            // const workflow = this.data.workflow // inprogress
            // const frmclass = this.data.frmClass // requestforpayment
            // const frmName = this.data.requestType
            // const name = frmName+'-'+this.data.workflow; // inprogressbyId


         
              
              if(this.isSelected){
                await this.$store.dispatch('dtr/deleteSelectedDtr', this.data);
                // this.data.selected = !this.data.selected

              } else {
                await this.$store.dispatch('dtr/addSelectedDtr', this.data);
                // this.data.selected = !this.data.selected

              }

              
                
                // getters
                // const selectedDtr = this.$store.getters['dtr/getSelectedDtr'];
                // console.log(selectedDtr)

                // actions
                // this.$store.dispatch('dtr', addSelectedDtr);

                

            

 



        },
    },
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
};
</script>