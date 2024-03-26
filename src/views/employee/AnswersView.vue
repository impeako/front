<template>
    <LogoComponent/>
    
    <v-container class="container">
    <v-row no-gutters justify="space-around">
    <v-col class="pa-2 ma-5" cols="4">
    <div class="text-h5 mb-5 text-left" >Approved Requests
      <v-icon icon="mdi-check" size="x-small" color="green"></v-icon>
    </div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="(Aanswer, index) in approved" :key="index">
        <v-expansion-panel-title>
        <h4 class="title">Request id: {{ Aanswer.id }}</h4>
        <p class="date">Treatement date: {{ Aanswer.treatmentDate }}</p>
        </v-expansion-panel-title>
        <v-expansion-panel-text class="text-left">
          <p class="motion mb-2">Request content: {{ Aanswer.content }}</p>
          <v-btn class="download mb-3" @click="downloadFile(Aanswer)" prepend-icon="mdi-file-download">Document</v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    </v-col>
    <v-col class="pa-2 ma-5" cols="4" offset="7">
    <div class="text-h5 mb-5 text-left">Denied Requets
      <v-icon icon="mdi-cancel" size="x-small" color="red"></v-icon>
    </div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="(answer, index) in approved" :key="index">
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
    </v-col>
    </v-row>
    
    </v-container>

    <employeeNav/>
</template>

<script>
    import LogoComponent from "../../components/LogoComponent.vue";
    import EmployeeNav from "../../components/UserNavBar.vue"
    import axios from "axios";

    export default{
        mounted(){
            this.getApproved();
            this.getDenied();
        },
        components: {
            EmployeeNav,
            LogoComponent
        },
        data() {
          return {
            approved : [],
            denied: [],
            
          }
        },
        methods: {
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
            }
          }
}
</script>

<style scoped>
    .container {
        max-width: 1200px;        
    }
    .v-expansion-panel-title{
      display: flexbox;
      flex-direction: column;
      align-items: start;
    }
    .v-expansion-panel-text{
      display: block;
    }
    .v-expansion-panels {
      max-height: 500px;
      overflow-y: scroll;
      scrollbar-width: none;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      z-index: 0;
    }
    .title {
      margin: 10px;
    }
    p {
      margin-left: 10px;
      font-size: 15px;
      font-weight: 400;
    }
    .download{
      float: right;
      background-color: #0a66c2;
      color: white;
    }
</style>