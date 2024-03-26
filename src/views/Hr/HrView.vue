<template>
    <LogoComponent/>

    <v-row class="container" justify="space-between">
        <v-col cols="6">
            <div class="text-h5 mb-5 text-left" >New Requests
            <v-icon icon="mdi-progress-clock" size="x-small" color="blue"></v-icon>
            </div>
            <v-expansion-panels variant="accordion">
            <v-expansion-panel v-for="(n, index) in newR" :key="index">
                <div v-if="n.treated == 'IN_PROGRESS'">
                <v-expansion-panel-title>
                <h4 class="title">Request id: {{ n.id }}</h4>
                <p class="date mb-2">Date of sending: {{ n.sendingDate }}</p>
                <p class="date">Sender : {{ n.sender.firstname }} {{ n.sender.lastname }}</p>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="text-left">
                <p class="motion mb-8">Request content: {{ n.content }}</p>
                <div class="buttons">
                    <v-dialog
                        v-model="dialog"
                        max-width="400"
                        persistent
                        >
                        <template v-slot:activator="{ props: activatorProps }">
                        <v-btn color="success" type="submit" class="me-4" v-bind="activatorProps">Approve</v-btn>
                        </template>
                        <v-card
                        title="Approve this request ?"
                        >
                        <template v-slot:actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="dialog = false; ">
                        cancel
                        </v-btn>
                        <v-btn @click="dialog = false; approve(n.sender.id, )">
                        send
                        </v-btn>
                        </template>
                        </v-card>
                        </v-dialog>

                        <v-dialog
                        v-model="dialog"
                        max-width="400"
                        persistent
                        >
                        <template v-slot:activator="{ props: activatorProps }">
                        <v-btn color="error" type="submit" class="me-4" v-bind="activatorProps">Deny</v-btn>
                        </template>
                        <v-card
                        title="Want to send this request ?"
                        >
                        <template v-slot:actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="dialog = false; ">
                        no
                        </v-btn>
                        <v-btn @click="dialog = false; deny(motion)">
                        yes
                        </v-btn>
                        </template>
                        </v-card>
                        </v-dialog>
                </div>
                </v-expansion-panel-text>
                </div>
            </v-expansion-panel>
            </v-expansion-panels>
            
        </v-col>
        <v-col cols="4">
            <div class="text-h5 mb-5 text-left" >Treated Requests
            <v-icon icon="mdi-check" size="x-small" color="green"></v-icon>
            </div>
            <v-expansion-panels variant="accordion">
            <v-expansion-panel v-for="(request, index) in treated" :key="index">
                <v-expansion-panel-title>
                <v-icon icon="mdi-cancel" color="error" v-if="request.treat == 'DENIED'"></v-icon>
                <v-icon icon="mdi-check" color="success" v-if="request.treat == 'APPROVED'"></v-icon>
                <h4 class="title">Request id: {{ request.id }}</h4>
                <p class="date">Sender: {{ request.owner.firstname }}</p>
                <p class="date">Treatement date: {{ request.treatmentDate }}</p>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="text-left">
                <p class="motion mb-2">Request content: {{ request.content }}</p>
                <p class="motion mb-2">Request content: {{ request.sendingDate }}</p>
                <p class="motion mb-2">Request status: {{ request.treat }}</p>
                <p class="motion mb-2" v-if="request.treat == 'DENIED'">Denial motion: {{ request.motion }}</p>
                <v-btn class="download mb-3" @click="downloadFile(Aanswer)" prepend-icon="mdi-file-download" v-if="request.treat == 'APPROVED'" color="blue">Document</v-btn>
                <p class="motion mb-2">Treated by: {{ request.content }}</p>
                </v-expansion-panel-text>
                </v-expansion-panel>
                </v-expansion-panels>
        </v-col>
        
    </v-row>
    <UserNav class="navigation"/>
</template>

<script>
    import LogoComponent from "../../components/LogoComponent.vue";
    import UserNav from "../../components/UserNavBar.vue"
    import axios from "axios";

    export default{       
        mounted(){
            this.getTreated();
            this.getNew();
        },
        components: {
            UserNav,
            LogoComponent
        },
        data() {
          return {
            treated : [],
            newR: [],
            dialog: false,
            
          }
        },
        methods: {
          getTreated(){
                axios.get('http://localhost:8081/edrms/hr/answers/getAllAnswers', { 
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                    this.treated = response.data
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with fetching user information')
                });
            },
            getNew() {
                axios.get('http://localhost:8081/edrms/hr/request/getAll', {
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                    this.newR = response.data;
                })
                .catch(error => {
                    console.error('Error fetching doc requests:', error);
                });
                },

             approve(Id, doc) {
                axios.get('http://localhost:8081/edrms/hr/request/approve', {
                    params :{
                        reqId : Id,
                        docId : doc
                    },
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.error('Error fetching doc requests:', error);
                });
                },  
                approve(Id, motion) {
                axios.get('http://localhost:8081/edrms/hr/request/approve', {
                    params :{
                        reqId : Id,
                        motion : motion
                    },
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.error('Error fetching doc requests:', error);
                });
                },   
        }
    }
</script>

<style scoped>
    .container {
        width: 1200px;
        margin: auto;
    }
    .navigation{
        z-index: 2;
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
    .buttons {
        display: flex;
        justify-content: center;
    }
</style>