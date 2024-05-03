<template>
    <LogoComponent/>
    <v-container>
    <!-- document request -->
    <v-row no-gutters>
    <!-- Request History -->
    <v-col cols="3">
      <v-card>
        <v-list lines="two" class="requests text-left">
          <v-list-subheader>Pending requests</v-list-subheader>   
          <p v-if="requests.length === 0" class="ml-5">You have no pending requests!</p>
          <v-list-item v-for="(request, idx) in requests" :key="idx">
            <v-row>
              <v-col cols="1">
              <v-icon icon="mdi-progress-clock" color="blue"></v-icon>
              </v-col>
              <v-col>
              <h5 class="requestId"> Request ID: {{ request.id }}</h5>
              <p class="content">Sending Date: {{ request.sendingDate }}</p>
              <p class="content">Content: {{ request.content }}</p>
              <p class="content">status: {{ request.treated }}</p>
              <v-divider inset class="mt-5"></v-divider>
              </v-col>
            </v-row>
          </v-list-item> 
        </v-list>
      </v-card>
    </v-col>
    <v-col class="answers" cols="3">
        <v-card>
        <v-card-title class="text-left">
            Approved Requests
            <v-icon icon="mdi-check" size="x-small" color="green"></v-icon>
        </v-card-title>
        <v-card-subtitle class="text-left mb-3" v-if="approved.length === 0">
            You have no approved requests yet!     
        </v-card-subtitle>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="(Aanswer, index) in approved" :key="index">
        <v-expansion-panel-title class="text-left">
        <h4 class="title">Request id: {{ Aanswer.id }}</h4>
        <p class="date">Treatement date: {{ Aanswer.treatmentDate }}</p>
        </v-expansion-panel-title>
        <v-expansion-panel-text class="text-left">
          <p class="motion mb-2">Request content: {{ Aanswer.content }}</p>
          <div class="d-flex">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                v-bind="props"
              >
                Document
              </v-btn>
            </template>
            <v-list>
              <v-list-item class="down">
                <v-list-item-title><v-btn class="download mb-3" @click="downloadFile(Aanswer)" prepend-icon="mdi-file-download" variant="plain">Pdf</v-btn></v-list-item-title>
              </v-list-item>
            </v-list>
            <v-list>
              <v-list-item class="down">
                <v-list-item-title><v-btn class="download mb-3" @click="pdfToImage(Aanswer.file.fileData.data)" prepend-icon="mdi-file-download" variant="plain">Word</v-btn></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    </v-card>
    </v-col>
    <v-col class="answers" cols="3">
        <v-card>
            <v-card-title class="text-left">
                Denied Requests
                <v-icon icon="mdi-cancel" size="x-small" color="red"></v-icon>
            </v-card-title>
            <v-card-subtitle class="text-left mb-3" v-if="denied.length === 0">
              You have no denied requests yet!     
            </v-card-subtitle>
        <v-expansion-panels variant="accordion">
        <v-expansion-panel v-for="(answer, index) in denied" :key="index">
            <v-expansion-panel-title>
            <h4 class="title"><b>Request id: </b>{{ answer.id }}</h4>
            <p class="date"><b>Treatement date: </b>{{ answer.treatmentDate }}</p>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-left">
            <p class="motion mb-2"><b>Request content : </b> {{ answer.content }}</p>
            <p class="motion "><b>Denial motion : </b> {{ answer.motion }}</p>
            </v-expansion-panel-text>
        </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
    </v-col>
</v-row>
<v-row>
  <v-sheet class="mx-auto doc-request">
        <v-form @submit.prevent class="text-right">       
        <v-textarea
            v-model="requestSended"
            label="Your request motion"
            variant="outlined"
            hide-details
            class="mb-10 text"
            >
        </v-textarea>
        <v-row>
        <v-autocomplete
          v-model="requestedType"
          label="Document Type"
          :items="typeList"
          required
          variant="solo"
          hide-details
        ></v-autocomplete>
        <v-dialog
           v-model="dialog"
          persistent
        >
        <template v-slot:activator="{ props: activatorProps }">
        <v-btn color="#0a66c2" type="submit" class="me-4 mb-10" v-bind="activatorProps">Request</v-btn>
        </template>
        <v-card
        title="Want to send this request ?"
        max-width="400px"
        class="mx-auto"
        >
        <v-card-text>
          <p><b>requested document:</b>{{ this.requestedType }}</p>
          <p><b>request motion:</b>{{ this.requestSended }}</p>
        </v-card-text>
        <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false; ">
        no
        </v-btn>
        <v-btn @click="dialog = false; sendRequest()">
        yes
        </v-btn>
        </template>
        </v-card>
        </v-dialog>
      </v-row>
        </v-form>
        </v-sheet>
</v-row>
</v-container>
    <!-- side nav bar -->
    <EmployeeNav />
    <FooterComponent/>
</template>

<script>
    import LogoComponent from "../../components/LogoComponent.vue";
    import EmployeeNav from "../../components/UserNavBar.vue";
    import FooterComponent from "../../components/FooterComponent.vue";
    import axios from "axios";

    export default{
        mounted(){
            this.getRequests();
            this.getApproved();
            this.getDenied();
          },
        components: {
            EmployeeNav,
            LogoComponent,    
            FooterComponent,   
        },
        data: () => ({
            dialog: false,
            requestSended: '',
            requests: [],
            approved : [],
            denied: [],
            wordDoc: '',
            typeList: ["Payslips", "Salary statements", "Wage summaries", "Invoices", "Purchase orders", "Receipts", "Expense reports", "Contracts", "Agreements", "Legal notices", "Terms of service", "Employment contracts", "Job descriptions", "Performance reviews", "HR policies and procedures", "Memos", "Announcements", "Newsletters", "Press releases", "Meeting agendas", "Meeting minutes", "Action items", "Presentations", "Training manuals", "Course outlines", "Training schedules", "Compliance reports", "Audit documents", "Regulatory filings", "Travel itineraries", "Travel policies", "Health and safety manuals", "Incident reports", "Emergency procedures", "Quality control reports", "Inspection checklists", "Product specifications", "Customer feedback forms", "Service level agreements", "Customer support scripts", "Project charters", "Project plans", "Status reports", "Gantt charts", "Leave requests", "Expense reimbursement forms", "Employee onboarding forms", "IT policies", "System documentation", "Software licenses", "Maintenance schedules", "Lease agreements", "Facility usage policies"],
            requestedType: '',
        }),
        methods: {
          sendRequest(){
            const formData = new FormData();
            formData.append('content', this.requestSended);
            formData.append('type', this.requestedType);
            axios.post('http://localhost:8081/edrms/employee/request/req-doc', formData,{
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                    }})
                .then(response => {
                    this.getRequests();
                    this.requestSended = '';
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with sending request')
                });
          },
          getRequests(){
                axios.get('http://localhost:8081/edrms/employee/request/in_progress', { 
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                    this.requests = response.data
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with fetching users')
                });
            },
            getApproved(){
                axios.get('http://localhost:8081/edrms/employee/answers/approved-answers', { 
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                    this.approved = response.data
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with fetching user information')
                });
            },
            getDenied(){
                axios.get('http://localhost:8081/edrms/employee/answers/denied-answers', { 
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                    this.denied = response.data
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with fetching user information')
                });
            },
            downloadFile(item) {
              const fileData = item.file.fileData.data;
              const decodedData = atob(fileData);

              // Check if it's a PNG image
              if (decodedData.startsWith('\x89PNG')) {
                this.downloadBlob(decodedData, 'image/png', 'file.png');
              }
              // Check if it's a JPEG image
              else if (decodedData.startsWith('\xFF\xD8')) {
                this.downloadBlob(decodedData, 'image/jpeg', 'file.jpg');
              }
              // Check if it's a PDF document
              else if (decodedData.startsWith('%PDF')) {
                this.downloadBlob(decodedData, 'application/pdf', 'file.pdf');
              }
              // Handle other file types or unknown types
              else {
                console.error('Unknown file type');
                // Prompt the user to specify the file extension or provide a default
              }
            },
            downloadBlob(data, mimeType, fileName) {
              const arrayBuffer = new Uint8Array(data.length);
              for (let i = 0; i < data.length; i++) {
                arrayBuffer[i] = data.charCodeAt(i);
              }
              const blob = new Blob([arrayBuffer], { type: mimeType });

              const link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = fileName;
              link.click();
              window.URL.revokeObjectURL(link.href);
            },
            pdfToWord(base64){
              axios.post('http://localhost:8081/edrms/employee/documents/PdfToWord', {
                  base64Data: base64
                }, {
                  headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                  },
                  responseType: 'blob' // Receive response as a blob
                }).then(response => {
                // Create a blob object from the response data
                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                // Create a link element
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'converted.docx');
                // Append the link to the body
                document.body.appendChild(link);
                // Trigger the download
                link.click();
                // Cleanup
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
              }).catch(error => {
                console.error('Error downloading DOCX:', error);
              });
            },
            pdfToImage(pdf){
              const request = {
                "base64Pdf" : pdf
              }
              axios.post('http://localhost:8081/edrms/employee/convert/pdf-to-images',request ,{
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                    }})
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with converting file')
                });
            },
        }
    }
</script>

<style scoped>
    .v-container{
        width: 1500px;
    }
    .v-list.requests{
        max-height:400px;
        overflow-y: scroll;
        scrollbar-width: none;
    }
    .content {
      font-weight: 400;
      font-size: 14px;
    }
    form {
      background-color: rgb(240, 240, 240);
    }
    .text {
      background: white;
    }
    .v-col{
        margin: 20px;
    }
    .v-expansion-panel-title{
        display: flexbox;
        flex-direction: column;
        align-items: start;
    }
    .v-expansion-panels {
      max-height: 500px;
      overflow-y: scroll;
      scrollbar-width: none;
    }
    .answers.title {
      margin: 10px;
    }
    .answers p {
      font-size: 15px;
      font-weight: 400;
    }
    .answers.download{
      float: right;
      background-color: #0a66c2;
      color: white;
    }
    .v-menu > .v-overlay__content > .v-card, .v-menu > .v-overlay__content > .v-sheet, .v-menu > .v-overlay__content > .v-list {
      border-radius: 0;
    }
    .v-autocomplete{
      background-color: white;
      max-width: 400px;
      margin-bottom: 80px;
      margin-right: 20px;
      margin-left: 20px;
    }
    .v-list-subheader{
      font-weight: 500;
      font-size: 18px;
      color: black;
    }
    @media screen and (max-width:612px) {
      .v-container {
        width: 100%;
        margin-top: 100px;
      }
      .v-container .v-row{
        display: flex;
        flex-direction: column;
        align-content: center;
      }
      .v-col-3{
        max-width: 100%;
      }
      .v-card-title{
        font-size: 17px;
        font-weight: 400;
      }
      .v-card-subtitle{
        font-size: 10px;
      }
      .me-4 {
        margin-inline-end: 0;
      }
      .mb-10 {
        margin-bottom: 20px !important;
      }
      button{
        margin: 0;
      }
    }
</style>