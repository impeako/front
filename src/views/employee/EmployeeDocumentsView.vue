<template>
  <LogoComponent/>
  <v-container>
  <!-- document request -->
  <v-row no-gutters class="first mb-10 pa-5">
  <!-- Request History -->
  <v-col cols="3 pa-0 ma-0">
    <v-card>
      <v-card-title class="text-left">
        Pending requests <v-icon icon="mdi-progress-clock" size="x-small" color="blue"></v-icon><v-icon icon="mdi-arrow-right" size="large" color="black" class="ml-10"></v-icon>
      </v-card-title>
      <v-list class="requests text-left">
        <p v-if="requests.length === 0" class="ml-5">You have no pending requests!</p>
        <v-list-item v-for="(request, idx) in requests" :key="idx">
          <v-row v-if="request.status === null">
            <v-col>
              <h5 class="requestId"> Request ID: {{ request.id }}</h5>
              <p class="content"><b>Sending Date: </b>{{ request.sendingDate }}</p>
              <p class="content"><b>Document type:</b> {{ request.docType }}</p>
              <p class="content"><b>Request motion: </b>{{ request.content }}</p>
              <v-divider inset class="mt-5"></v-divider>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-card>
  </v-col>
  <v-col cols="3 pa-0 ma-0">
    <v-card>
      <v-card-title class="text-left">
        In treatment <v-icon icon="mdi-pencil" size="x-small" color="blue"></v-icon><v-icon icon="mdi-arrow-right" size="large" color="black" class="ml-10"></v-icon>
      </v-card-title>
      <v-list class="requests text-left">
        <p v-if="requests.length === 0" class="ml-5">You have no pending requests!</p>
        <v-list-item v-for="(request, idx) in requests" :key="idx">
          <v-row v-if="request.status">  
            <v-col>
              <h5 class="requestId"> Request ID: {{ request.id }}</h5>
              <p class="content"><b>Sending Date:</b> {{ request.sendingDate }}</p>
              <p class="content"><b>Document type:</b> {{ request.docType }}</p>
              <p class="content"><b>Request motion:</b> {{ request.content }}</p>
              <p class="content">status: {{ request.status }}</p>
              <v-divider inset class="mt-5"></v-divider>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-card>
  </v-col>
  <v-col class="answers" cols="3 pa-0 ma-0">
      <v-card>
      <v-card-title class="text-left mb-3">
          Approved & Ready Requests
          <v-icon icon="mdi-check" size="x-small" color="green"></v-icon>
      </v-card-title>
      <v-card-subtitle class="text-left mb-3" v-if="approved.length === 0">
          You have no approved requests yet!     
      </v-card-subtitle>
  <v-expansion-panels variant="accordion">
    <v-expansion-panel v-for="(Aanswer, index) in approved" :key="index">
      <v-expansion-panel-title class="text-left">
      <p class="title mb-1"><b>Request id:</b></p>
      <p class="title mb-2">{{ Aanswer.id }}</p>
      <p class="date"><b>Treatement date: </b>{{ Aanswer.treatmentDate }}</p>
      </v-expansion-panel-title>
      <v-expansion-panel-text class="text-left">
        <p class="motion mb-2"><b>Document type:</b> {{ Aanswer.file.type }}</p>
        <p class="motion mb-2"><b>Request motion:</b> {{ Aanswer.content }}</p>
        <div class="d-flex">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
            >
              Download
            </v-btn>
          </template>
          <v-list>
            <v-list-item class="down">
              <v-list-item-title><v-btn class="download mb-3" @click="downloadFile(Aanswer)" prepend-icon="mdi-file-download" variant="plain">Original</v-btn></v-list-item-title>
            </v-list-item>
            <v-list-item class="down">
              <v-list-item-title><v-btn class="download mb-3" @click="PdfDownlaod(Aanswer.file.fileData.data, Aanswer.file.type)" prepend-icon="mdi-file-download" variant="plain">Pdf</v-btn></v-list-item-title>
            </v-list-item>
            <v-list-item class="down">
              <v-list-item-title><v-btn class="download mb-3" @click="imageDownlaod(Aanswer.file.fileData.data, Aanswer.file.type)" prepend-icon="mdi-file-download" variant="plain">Image</v-btn></v-list-item-title>
            </v-list-item>
            <v-list-item class="down">
              <v-list-item-title><v-btn class="download mb-3" @click="DocxDownlaod(Aanswer.file.fileData.data, Aanswer.file.type)" prepend-icon="mdi-file-download" variant="plain">Docx</v-btn></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  </v-card>
  </v-col>
  <v-col class="answers" cols="3 pa-0 ma-0">
      <v-card>
          <v-card-title class="text-left mb-3">
              Denied Requests
              <v-icon icon="mdi-cancel" size="x-small" color="red"></v-icon>
          </v-card-title>
          <v-card-subtitle class="text-left mb-3" v-if="denied.length === 0">
            You have no denied requests yet!     
          </v-card-subtitle>
      <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="(answer, index) in denied" :key="index">
          <v-expansion-panel-title>
          <p class="title mb-1"><b>Request id: </b></p>
          <p class="title mb-2">{{ answer.id }}</p>
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
<v-row class="ma-0">
<v-sheet class="doc-request">
      <v-form @submit.prevent>      
      <v-textarea
          v-model="requestSended"
          label="Your request motion"
          variant="solo"
          hide-details
          class="mb-10"
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
        width="auto"
      >
      <template v-slot:activator="{ props: activatorProps }">
      <v-btn color="#0a66c2" type="submit" class="me-4 mb-10" v-bind="activatorProps">Request</v-btn>
      </template>
      <v-card
      title="Want to send this request ?"
      max-width="400">
      <v-card-text>
        <p class="mb-2"><b>requested document:</b>{{ this.requestedType }}</p>
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
<df-messenger
  chat-icon="https:&#x2F;&#x2F;cdn-icons-png.flaticon.com&#x2F;512&#x2F;4298&#x2F;4298373.png"
  intent="WELCOME"
  chat-title="EDRMS"
  agent-id="6f206d09-b1ca-4f31-9a0e-c1fdb7a7b825"
  language-code="en"
></df-messenger>
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
              axios.get('http://localhost:8081/edrms/employee/request/pending', { 
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
              this.downloadBlob(decodedData, 'image/png', `${item.file.type}.png`);
            }
            // Check if it's a JPEG image
            else if (decodedData.startsWith('\xFF\xD8')) {
              this.downloadBlob(decodedData, 'image/jpeg', `${item.file.type}.jpg`);
            }
            // Check if it's a PDF document
            else if (decodedData.startsWith('%PDF')) {
              this.downloadBlob(decodedData, 'application/pdf', `${item.file.type}.pdf`);
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
        pdfToImage(pdf, type){
            axios.post('http://localhost:8081/edrms/employee/convert/pdf-to-images', pdf, {
                  headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                  'Content-Type': 'text/plain',
                  },
                  responseType: 'blob',
                })
              .then(response => {
                const imageUrl = URL.createObjectURL(new Blob([response.data]));
                
                // Create a link element
                const link = document.createElement('a');
                link.href = imageUrl;

                // Set the download attribute to force download
                link.setAttribute('download', `${type}.jpg`);

                // Append the link to the body
                document.body.appendChild(link);

                // Programmatically click the link to trigger download
                link.click();

                // Clean up: revoke the blob URL
                URL.revokeObjectURL(imageUrl);
              })
              .catch(error => {
                  console.error(error)
                  console.log('error with converting file')
              });
        },
        getFileTypeFromSignature(fileData) {
                const signature = this.base64ToHex(fileData.slice(0, 4).toString("hex"));
                const signatures = {
                    "ffd8ff": "image/jpeg",
                    "89504e": "image/png",
                    "255044": "application/pdf",
                    "504b03": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                };
                const lowerSignature = signature.toLowerCase();
                return signatures[lowerSignature] || "unknown";
        },
        base64ToHex(base64String) {
                const binaryString = atob(base64String);

                let hexString = '';
                for (let i = 0; i < binaryString.length; i++) {
                const hex = binaryString.charCodeAt(i).toString(16);
                hexString += ('00' + hex).slice(-2);
                }
                return hexString.toUpperCase();
            },
        imageDownlaod(data, type){
          const fileType = this.getFileTypeFromSignature(data)
          const decodedData = atob(data);
          switch (fileType) {
                    case "image/jpeg":
                      this.downloadBlob(decodedData, 'image/jpeg', `${type}.png`);
                    case "image/png":
                      this.downloadBlob(decodedData, 'image/png', `${type}.png`);
                      break;
                    case "application/pdf":
                      this.pdfToImage(data, type)
                      break;
                    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                      break;
                    default:
                    break;
                }
        },
        ImageToPdf(image, type){
              axios.post('http://localhost:8081/edrms/employee/convert/image-to-pdf', image, {
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                    'Content-Type': 'text/plain',
                    },
                    responseType: 'blob',
                  })
                .then(response => {
                  const pdfURL = URL.createObjectURL(new Blob([response.data]));
                  
                  // Create a link element
                  const link = document.createElement('a');
                  link.href = pdfURL;

                  // Set the download attribute to force download
                  link.setAttribute('download', `${type}.pdf`);

                  // Append the link to the body
                  document.body.appendChild(link);

                  // Programmatically click the link to trigger download
                  link.click();

                  // Clean up: revoke the blob URL
                  URL.revokeObjectURL(pdfURL);
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with converting file')
                });
          },
        PdfDownlaod(data, type){
          const fileType = this.getFileTypeFromSignature(data)
          const decodedData = atob(data);
          switch (fileType) {
                    case "image/jpeg":
                    case "image/png":
                      this.ImageToPdf(data, type)
                      break;
                    case "application/pdf":
                      this.downloadBlob(decodedData, 'application/pdf', `${type}.pdf`);
                      break;
                    default:
                    break;
                }
        },
        PdfToDocx(pdf, type){
              axios.post('http://localhost:8081/edrms/employee/convert/pdf-to-docx', pdf, {
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                    'Content-Type': 'text/plain',
                    },
                    responseType: 'blob',
                  })
                .then(response => {
                  const pdfURL = URL.createObjectURL(new Blob([response.data]));
                  
                  // Create a link element
                  const link = document.createElement('a');
                  link.href = pdfURL;

                  // Set the download attribute to force download
                  link.setAttribute('download', `${type}.docx`);

                  // Append the link to the body
                  document.body.appendChild(link);

                  // Programmatically click the link to trigger download
                  link.click();

                  // Clean up: revoke the blob URL
                  URL.revokeObjectURL(pdfURL);
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with converting file')
                });
          },
          ImageToDocx(image, type){
            axios.post('http://localhost:8081/edrms/employee/convert/image-to-pdf', image, {
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                    'Content-Type': 'text/plain',
                    },
                    responseType: 'blob',
                  })
                .then(response => {
                  this.blobToBase64(response.data).then(base64String => {
                      this.PdfToDocx(base64String, type)
                  })
                  .catch(error => {
                      console.error('Error converting blob to base64:', error);
                  });
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with converting file')
                });
          },
          DocxDownlaod(data, type){
          const fileType = this.getFileTypeFromSignature(data)
          const decodedData = atob(data);
          switch (fileType) {
                    case "image/jpeg":
                    case "image/png":
                      this.ImageToDocx(data, type)
                      break;
                    case "application/pdf":
                      this.PdfToDocx(data,type)
                      break;
                    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                      this.downloadBlob(decodedData, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', `${type}.DOC`);
                    default:
                    break;
                }
        },
        blobToBase64(blob) {
          return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                  const base64String = reader.result.split(',')[1];
                  resolve(base64String);
              };
              reader.onerror = reject;
              reader.readAsDataURL(blob);
          });
      },
    }
  }
</script>

<style scoped>
  .v-container{
    width: 1500px;
  }
  .v-card--variant-elevated {
    box-shadow: none;
  }
  .first{
    background: white;
    border-radius: 15px;
  }
  .v-card-title{
    font-size: 18px;
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
    background-color: rgb(245, 245, 245);
  }
  .v-expansion-panel-title{
      display: flexbox;
      flex-direction: column;
      align-items: start;
  }
  .v-expansion-panels {
    max-height: 400px;
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
  .doc-request{
    width: 50%;
  }
  @media screen and (max-width:612px) {
    .v-container {
      width: 100%;
      margin-top: 100px;
    }
    .first{
    background: none;
    border-radius: 0px;
    }
    .v-container .v-row{
      display: flex;
      flex-direction: column;
      align-content: center;
    }
    .v-card--variant-elevated {
    box-shadow: 0px 2px 1px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 3px 0px var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
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
    .ma-0 {
      margin-bottom: 50px !important;
    }
    button{
      width: 50%;
      margin-left: 20px;
    }
    .v-icon{
      transform: rotate(90deg);
    }
    .doc-request{
      width: 100%;
    }
    .v-autocomplete{
      background-color: white;
      max-width: 100%;
      width: 90%;
      margin-bottom: 20px;
    }
  }
</style>