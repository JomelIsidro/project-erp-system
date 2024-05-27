<template>
    <div class="action-buttons d-flex justify-content-center">
        <button class="btn btn-outline-success btn-sm"  title='Open Request' @click="handleAction('open')">
            <i class="fas fa-folder-open"></i>
        </button>
        <button class="btn btn-outline-primary ml-1 btn-sm" title='Open Request Messages' data-toggle="modal" data-target="#modal-message"  @click="handleAction('remarks')">
            <i class="fas fa-envelope"></i>
        </button>
        <button class="btn btn-outline-dark ml-1 btn-sm" title='Open Request Status' data-toggle="modal" data-target="#modal-status" @click="handleAction('status')">
            <i class="fas fa-book-reader"></i>
        </button>
        
        
              

    </div>
</template>
<script>
export default {
    data() {
        return {
            companyId: localStorage.getItem("companyId"),
        }
    },
    
    name: "ActionButtons",
    // inject: ["handleAction"],
    methods: {
        async handleAction(actionName) {

            const id = this.data.id; // 123
            // const name = this.data.workflow+'byId'; // inprogressbyId

            const workflow = this.data.workflow // inprogress
            const frmclass = this.data.frmClass // requestforpayment
            const frmName = this.data.requestType // Request for Payment
            const name = frmName+'-'+this.data.workflow; // inprogressbyId
           
           

            
            // this is use exclusively for sales order request and mrf
            const name2 = frmclass+'-'+this.data.workflow; // inprogressbyId


            const companyId = this.companyId;

            const name3 = 'supplychainmrf-'+this.data.workflow; // inprogressbyId
        
      

            if(actionName === 'open'){
                
                console.log(this.data)

                const frms = ['sales_order_frm'];
                const mrfs = ['supplychainmrf','frmarf1','frmmrf','frmsurf1'];

                if (frms.includes(frmclass)) {  
                    console.log(1)  
                    this.$router.push({name: name2, params: { id: id, workflow:workflow,frmClass:frmclass, frmName:frmName }})
                } 
                
                else if (mrfs.includes(frmclass)) {
                    console.log(2)  
                    this.$router.push({name: name3, params: { id: id, workflow:workflow,frmClass:frmclass, frmName:frmName }})
                }
                
                else {
                    console.log(3)  

                    this.$router.push({name: name, params: { id: id, workflow:workflow,frmClass:frmclass, frmName:frmName }})
                }
            }

            else if(actionName === 'remarks'){
                await this.$store.dispatch("remarks/setLoading");
                await this.$store.dispatch("remarks/notifications", {id: id, frmname: frmName});
                await this.$store.dispatch("remarks/setLoading");
            }

            else if(actionName === 'status'){
                await this.$store.dispatch("remarks/setLoading");
                await this.$store.dispatch("status/queryStatus", {id: id, frmname: frmName, companyId: companyId});
                await this.$store.dispatch("remarks/setLoading");
            }



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