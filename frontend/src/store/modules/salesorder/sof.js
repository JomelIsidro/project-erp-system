import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      sofData: [],
    };
  },

  mutations: {
    querySof(state, payload){
      state.sofData = payload;
    },
  },

  actions: {
    async queryRecipients(_, payload) {
      const form = payload.form
      const processId = payload.processId
      // const frmClass = payload.frmClass
      const loggedUserId = payload.loggedUserId
      const companyId = payload.companyId

      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/getRecipient/${processId}/${loggedUserId}/${companyId}/${form}`
        );


        if (resp.status === 200) {
          const recipient = [];
          for (const key in resp.data) {
            const request = {
              code: resp.data[key].uid,
              name: resp.data[key].name,
            };
            recipient.push(request);
          }
          this.recipent = recipient;

          // console.log(recipient);

          return recipient
        
        }

      } catch (err) {
        // Handle Error Here
        console.error(err);
        throw err
      }
    },

    async getInprogressId(_, payload) {
      const form = payload.form
      const processId = payload.processId

      const companyId = payload.companyId

      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/api/get-Inprogress/${processId}/${companyId}/${form}`
        );
        if (resp.status) {
          const inprogressId = resp.data[0].inpId;
          return inprogressId
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
      }
    },

    async queryCompany(_, payload) {
      const companyId = payload;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/customer-name/${companyId}`
        );


        const customerName = [];
        for (const key in response.data) {
          const request = {
            code: response.data[key].Business_Number,
            name: response.data[key].business_fullname,
            desc: response.data[key].CLIENTCODE,
            term: response.data[key].term_type,
            amgr: response.data[key].PMName,
          };
          customerName.push(request);
        }
        return customerName;
      } catch (error) {
        console.error(error);
        return error;
      }
    },

    async queryCoordinators(){
      
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/customer-cooridnators"
        );

        const delegates = [];
        for (const key in response.data) {
          const request = {
            code: response.data[key].id,
            name: response.data[key].UserFull_name,
          };
          delegates.push(request);
        }

        return delegates;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async querySelectedCoordinator(_, payload){
      // const test = 123;
      // console.log(payload)
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/selected-cooridnator/${payload}`
        );

        if (response.data.length) {
        const selectedCoordinator = [];
        for (const key in response.data) {
          const request = {
            code: response.data[key].CoordID,
            name: response.data[key].CoordinatorName,
          };
          selectedCoordinator.push(request);
        }

        return selectedCoordinator;

        } else {
        return response.data.length;
          
        }


        
 
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async queryCompanyAddress(_, payload) {
      const customerId = payload;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/customer-address/${customerId}`
        );

        const customerAddress = [];
        for (const key in response.data) {
          const request = {
            code: response.data[key].ADDRESS,
            name: response.data[key].ADDRESS,
            // desc: response.data[key].ADDRESS,
          };
          customerAddress.push(request);
        }

        // console.log(customerAddress)

        return customerAddress;
      } catch (error) {
        console.error(error);
        return error;
      }
    },

    async queryCompanyContacts(_, payload) {
      const customerId = payload;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/customer-contact/${customerId}`
        );

        // console.log(response.data)
        const contactPerson = [];
        const contactNumber = [];
        for (const key in response.data) {
          const cPerson = {
            code: response.data[key].ID,
            name: response.data[key].ContactName,
          };
          contactPerson.push(cPerson);

          const cNumber = {
            code: response.data[key].Number,
            name: response.data[key].Number,
          };
          contactNumber.push(cNumber);
        }

        const personData = {
          contact: contactPerson,
          number: contactNumber,
        };

        // console.log(personData)

        return personData;
      } catch (error) {
        console.error(error);
        return error;
      }
    },

    async queryCompanyCode(_, payload) {
      const customerId = payload;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/customer-projectcode/${customerId}`
        );
        return response.data;
      } catch (error) {
        console.error(error);
        return error;
      }
    },

    async queryDelegates(_, payload) {
      const customerId = payload;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/customer-delegates/${customerId}`
        );
        return response.data;
      } catch (error) {
        console.error(error);
        return error;
      }
    },

    async queryCompanySystemDetails() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/customer-system-details`
        );
        // console.error(response.data)
        return response.data;
      } catch (error) {
        console.error(error);
        return error;
      }
    },

    async queryCompanySelectedSystemDetails(_, payload) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/customer-selected-system-details/${payload}`
        );
        
        let respData = response.data;

        let convertedData = respData .map(function (item) {
          // console.error(item.selected)
          return {
            selected: item.selected === 'True',
            sysID: item.sysID,
            type_name: item.type_name
          }
        });

        // console.warn(convertedData)
        return convertedData;
        // return response.data;
      } catch (error) {
        console.error(error);
        return error;
      }
    },


    async queryCompanyDocumentDetails() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/customer-document-details`
        );

        return response.data;
      } catch (error) {
        console.error(error);
        return error;
      }
    },

    async queryCompanySelectedDocumentDetails(_, payload) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/customer-selected-document-details/${payload}`
        );
        
        let respData = response.data;
        let convertedData = respData .map(function (item) {
          return {
            selected: item.selected === 'True',
            DocID: item.DocID,
            DocumentName: item.DocumentName
          }
        });

        return convertedData;
      } catch (error) {
        console.error(error);
        return error;
      }
    },


    async insertSystemAndDocumentName(_, payload) {
      const loggedUserId = payload.id;
      const modalInputform = payload.modalInputform;
      const modalTitle = payload.modalTitle;

      const fd = new FormData();
      fd.append("loggedUserId", loggedUserId);
      fd.append("modalInputform", modalInputform);
      fd.append("modalTitle", modalTitle);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/customer-details-insert",
          fd
        );
        
        return response;
      } catch (err) {
        // Handle Error Here

        console.error(err.response.data);
        throw err;
      }
    },

    async checkIfProjectCodeExist(_, payload) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/customer-projectcode-check",
          { projectCode: payload }
        );
        const isExist = response.data[0]["isExist"];
        // console.log(isExist)
        return isExist;
      } catch (err) {
        console.error(err.message);
        throw err.message;
      }
    },

    async checkIfProjectCodeExistSoid(_, payload) {


      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/customer-projectcode-check-soid",
          { 
            projectCode: payload.projCode,
            processId: payload.processId
          }
        );
        const isExist = response.data[0]["isExist"];
        // console.log(isExist)
        return isExist;
      } catch (err) {
        console.error(err.message);
        throw err.message;
      }
    },

    async queryCurrency() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/get-currencyType"
        );
        
        const currency = [];
        for (const key in response.data[0]) {
          const cur = {
            code: response.data[0][key].currencyName,
            name: response.data[0][key].currencyName,
          };
          currency.push(cur);
        }
        return currency

      } catch (err) {
        console.error(err.message);
        throw err.message;
      }
    },

    async createSOF(_, payload){
      try {

      const fd = new FormData();
      fd.append("loggedUserId", localStorage.getItem("id"))
      fd.append("loggedUserFirstName", localStorage.getItem("fname"))
      fd.append("loggedUserLastName", localStorage.getItem("lname"))
      fd.append("loggedUserDepartment", localStorage.getItem("department"))
      fd.append("loggedUserPosition", localStorage.getItem("positionName"))
      fd.append("companyId", localStorage.getItem("companyId"))
      fd.append("companyName", localStorage.getItem("companyName"))

      
      fd.append("softype",payload.sofType.code)

      fd.append("poNumber",payload.poNumber)
      fd.append("poDate",payload.poDate)
      fd.append("scopeOfWork",payload.scopeOfWork)
      fd.append("accountingRemarks",payload.accountingRemarks)

      fd.append("clientID",payload.customerNameItem.code ) // client id
      fd.append("client",payload.customerNameItem.name ) // client name
      fd.append("projectCode",payload.projectCode)
      fd.append("projectShortText",payload.projectShortText)
      fd.append("projectName",payload.projectName)
      fd.append("contactPersonName",payload.contactPersonItem.name ) // contact id
      fd.append("contactPerson",payload.contactPersonItem.code ) // contact id
      fd.append("contactNumber",payload.contactNumberItem.code)
      fd.append("deliveryAddress",payload.deliveryAddressItem.name)
      fd.append("billingAddress",payload.billingAddressItem.name)

      fd.append("paymentTerms",payload.paymentTerms)
      fd.append("projectStart",payload.projectStart)
      fd.append("projectEnd",payload.projectEnd)
      fd.append("warranty",payload.warranty)
      fd.append("currency",payload.currencyItem) // PHP
      fd.append("projectCost",payload.projectCost)

      fd.append("systemname", JSON.stringify(payload.systemDetailsSelected));
      fd.append("documentname", JSON.stringify(payload.documentDetailsSelected));

      fd.append("accountmanager",payload.accountmanager)

      fd.append("downpaymentrequired",payload.downPaymentRequiredItem)
      fd.append("downPaymentPercentage",payload.downPaymentPercentage)

      fd.append("invoicerequired",payload.invoiceRequiredItem)
      fd.append("invoiceDateNeeded",payload.invoiceDateNeeded)

      fd.append("downPaymentDateReceived",payload.downPaymentDateReceived)
      fd.append("invoiceNumber",payload.invoiceNumber)

      fd.append("salesInvoiceReleased",payload.salesInvoiceReleasedItem)
      fd.append("dateOfInvoice",payload.dateOfInvoice)

      fd.append("accountingRemarks",payload.accountingRemarks)

      for (let i = 0; i < payload.selectedFile.length; i++) {
        fd.append("file[]", payload.selectedFile[i]);
      }
 
      const response = await axios.post("http://127.0.0.1:8000/api/save-sof", fd);
      // console.warn(response)
      return response
           
      } catch (err) {
        // Handle Error Here
        console.error(err);
        throw err;
      }
    },

    async replySof(_, payload){
      const fd = new FormData();

      // Logged User Credentials
      fd.append("loggedUserId",payload.loggedUserId)
      fd.append("loggedUserFirstName",payload.loggedUserFirstName)
      fd.append("loggedUserLastName",payload.loggedUserLastName)
      fd.append("loggedUserFullName",payload.loggedUserFullName)
      fd.append("loggedUserDepartment",payload.loggedUserDepartment)
      fd.append("loggedUserPosition",payload.loggedUserPosition)
      fd.append("companyId",payload.companyId)
      fd.append("companyName",payload.companyName)

      // SO Classification
      fd.append("class",payload.sofType.code)
      fd.append("referenceNumber",payload.referenceNumber)
      
      // // Customer Details
      fd.append("clientId",payload.customerNameItem.code ) 
      fd.append("clientName",payload.customerNameItem.name )
      fd.append("contactPerson",payload.contactPersonItem.code ) // contact id
      fd.append("contactPersonName",payload.contactPersonItem.name ) // contact id
      fd.append("contactNumber",payload.contactNumberItem.code)
      fd.append("deliveryAddress",payload.deliveryAddressItem.name)
      fd.append("billingAddress",payload.billingAddressItem.name)

      // Project Details
      fd.append("poNumber",payload.poNumber)
      fd.append("poDate",payload.poDate)
      fd.append("projectStart",payload.projectStart)
      fd.append("projectEnd",payload.projectEnd)
      fd.append("projectShortText",payload.projectShortText)
      
      fd.append("projectId",payload.projectId)
      fd.append("projectName",payload.projectName)

      // boolean
      fd.append("isCoordinatorRequired",payload.isCoordinatorRequired)
      if(payload.isCoordinatorRequired){
        fd.append("coordinatorId",payload.coordinator.code)
        fd.append("coordinatorName",payload.coordinator.name)
      }
      fd.append("projectCode",payload.projectCode)
      fd.append("scopeOfWork",payload.scopeOfWork)

      // // Payment & Delivery Details
      fd.append("paymentTerms",payload.paymentTerms)
      fd.append("warranty",payload.warranty)
      fd.append("currency",payload.currencyItem) // PHP
      fd.append("projectCost",payload.projectCost)
      fd.append("downpaymentrequired",payload.downPaymentRequiredItem)
      fd.append("downPaymentPercentage",payload.downPaymentPercentage)
      fd.append("downPaymentDateReceived",payload.downPaymentDateReceived)
      fd.append("invoiceNumber",payload.invoiceNumber)
      fd.append("invoicerequired",payload.invoiceRequiredItem)
      fd.append("invoiceDateNeeded",payload.invoiceDateNeeded)
      fd.append("salesInvoiceReleased",payload.salesInvoiceReleasedItem)
      fd.append("dateOfInvoice",payload.dateOfInvoice)
      fd.append("accountingRemarks",payload.accountingRemarks)


      // System & Document Details
      const systemDetails = payload.systemDetailsSelected;
      let systemDetailsSelected = systemDetails.filter(function (system) {
        return system.selected === true;
      });

      const documentDetails = payload.documentDetailsSelected;
      let documentDetailsSelected = documentDetails.filter(function (document) {
        return document.selected === true;
      });

      fd.append("systemname", JSON.stringify(systemDetailsSelected));
      fd.append("documentname", JSON.stringify(documentDetailsSelected));

      // Attachments
      for (let i = 0; i < payload.selectedFileNew.length; i++) {
        fd.append("file[]", payload.selectedFileNew[i]);
      }
      fd.append("removedFiles", JSON.stringify(payload.removedAttachedFilesId));



      // Mod
      fd.append("isInitiator",payload.isInitiator)
      fd.append("remarks",payload.remarks)
      fd.append("processId",payload.processId)
      fd.append("frmClass",payload.frmClass)
      fd.append("form",payload.form)
      fd.append("isCoordinatorRequired",payload.isCoordinatorRequired)




      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/reply-request",
          fd
        );
          console.log(res)

          return res;


      } catch (err) {
        this.isLoadingModal = false;
        // Handle Error Here
        console.error(err);
        throw err;
      }




 
    },

    async querySof(context, payload){
      const id = payload.processId;
      const frmName = payload.frmName;
      const companyId = payload.companyId;



      let setup_project =
        `http://127.0.0.1:8000/api/general-projects/${id}`;
      let sales_orders =
        `http://127.0.0.1:8000/api/get-salesorder/${id}`;
      let sales_order_system =
        `http://127.0.0.1:8000/api/get-salesorder-system/${id}`;
      let sales_order_docs =
        `http://127.0.0.1:8000/api/get-salesorder-document/${id}`;
      let actual_sign =
        `http://127.0.0.1:8000/api/general-actual-sign/${id}/${frmName}/${companyId}`;
      let attachments =
      `http://127.0.0.1:8000/api/getRfpAttachments/${id}/${frmName}`;
        
      
      const requestOne = await axios.get(setup_project);
      const requestTwo = await axios.get(sales_orders);
      const requestThree = await axios.get(sales_order_system);
      const requestFour = await axios.get(sales_order_docs);
      const requestFive = await axios.get(actual_sign);
      const requestSix = await axios.get(attachments);



      
      axios
        .all([requestOne, requestTwo, requestThree, requestFour, requestFive, requestSix])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            const responseThree = responses[2];
            const responseFour = responses[3];
            const responseFive = responses[4];
            const responseSix = responses[5];

            // use/access the results
            // console.log(responseOne, responseTwo, responseThree, responseFour, responseFive, responseSix);

            const data = [
              {setup_project: responseOne.data},
              {sales_orders: responseTwo.data},
              {sales_order_system: responseThree.data},
              {sales_order_docs: responseFour.data},
              {actual_sign: responseFive.data},
              {attachments: responseSix.data},
            ];

            context.commit("querySof", data);
          }
          )
          
          
          
          )
          .catch(errors => {
          // react on errors.
          console.error(errors);
          throw errors;
          
        });
      
    },
  },


  getters: {
    getSofData(state) {
      return state.sofData;
    },
  },
};
