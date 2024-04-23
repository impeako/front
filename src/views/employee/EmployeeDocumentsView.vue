<template>
    <LogoComponent/>
    <v-container>
    <!-- document request -->
    <v-row no-gutters>
    <!-- Request History -->
    <v-col>
        <v-sheet class="mx-auto doc-request">
        <v-form @submit.prevent class="text-right">       
        <v-textarea
            v-model="requestSended"
            label="Request Document"
            variant="outlined"
            hide-details
            class="mb-10 text"
            >
        </v-textarea>
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
        </v-form>
        </v-sheet>
    <v-card>
    <v-list lines="two" class="requests text-left">
      <v-list-subheader>Pending requests</v-list-subheader>

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
        <v-card-subtitle class="text-left mb-3">
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
                <v-list-item-title><v-btn class="download mb-3" @click="downloadFile(Aanswer)" prepend-icon="mdi-file-download" variant="plain">Word</v-btn></v-list-item-title>
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
            <v-card-subtitle class="text-left mb-3">
              You have no denied requests yet!     
            </v-card-subtitle>
        <v-expansion-panels variant="accordion">
        <v-expansion-panel v-for="(answer, index) in denied" :key="index">
            <v-expansion-panel-title>
            <h4 class="title">Request id: {{ answer.id }}</h4>
            <p class="date">Treatement date: {{ answer.treatmentDate }}</p>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-left">
            <p class="motion mb-2">Request content: {{ answer.content }}</p>
            <p class="motion ">motion: {{ answer.motion }}</p>
            </v-expansion-panel-text>
        </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
    </v-col>
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

        }),
        methods: {
          sendRequest(){
            const parameter = this.requestSended;
            axios.post('http://localhost:8081/edrms/employee/request/req-doc', 
                  {
                      content: parameter
                  },
                  { 
                    headers: {'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                              'Content-Type': 'application/json'
                            } 
                    })
                .then(response => {
                    this.getRequests();
                    this.requestSended = '';
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with sending request', parameter)
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