<template>
    <LogoComponent/>

    <v-row class="container" justify="space-between">
        <v-col cols="6">
            <v-card>
            <v-card-title class="text-left mb-5">
                    New Requests
                    <v-icon icon="mdi-progress-clock" size="x-small" color="blue"></v-icon>
                </v-card-title>
                <v-card-subtitle v-if="newR == ''" class="text-left mb-3">
                    No new requests yet!     
                </v-card-subtitle>
            <v-expansion-panels variant="accordion">
            <v-expansion-panel v-for="(n, index) in newR" :key="index">
                <v-expansion-panel-title>
                <h4 class="title">Request id: {{ n.id }}</h4>
                <p class="date mb-2">Date of sending: {{ n.sendingDate }}</p>
                <p class="date">Sender : {{ n.sender.firstname }} {{ n.sender.lastname }}</p>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="text-left">
                <p class="motion mb-8">Request content: {{ n.content }}</p>
                <div class="buttons">
                    <v-dialog
                        v-model="dialog2"
                        max-width="400"
                        persistent
                        >
                        <template v-slot:activator="{ props: activatorProps }">
                        <v-btn color="#0a66c2" type="submit" class="me-4" v-bind="activatorProps">Approve</v-btn>
                        </template>
                        <v-card
                        title="Approve this request ?"
                        >
                        <v-card-text>
                            Send Document:
                            <v-autocomplete
                            v-model="docId"
                            label="Document id :"
                            :items="idArray"
                            required
                            variant="underlined"
                            hide-details
                            class="mt-5"
                            @click="findOwner(this.docId)"
                            ></v-autocomplete>
                            <div v-if="this.docId !== ''">
                                <h5>Owner:</h5>
                                <p v-if="this.owner">first name: {{ this.owner.firstname }} {{ this.owner.lastname }}</p>
                            </div>
                        </v-card-text>
                        <template v-slot:actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="dialog2 = false">
                        cancel
                        </v-btn>
                        <v-btn @click="dialog2 = false; approve(n.id, this.docId)">
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
                        <v-card-text>
                            <v-textarea
                            v-model="motion"
                            label="Denial Motion"
                            name="input-7-1"
                            variant="outlined"
                            auto-grow
                            ></v-textarea>
                        </v-card-text>
                        <template v-slot:actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="dialog = false; ">
                        cancel
                        </v-btn>
                        <v-btn @click="dialog = false; deny(n.id, this.motion)">
                        send
                        </v-btn>
                        </template>
                        </v-card>
                        </v-dialog>
                </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
        </v-col>
        <v-col cols="5">
            <v-card>
                <v-card-title class="text-left mb-5">
                    Treated Requests
                    <v-icon icon="mdi-check" size="x-small" color="green"></v-icon>
                </v-card-title>
                <v-card-subtitle v-if="treated == ''" class="text-left mb-3">
                    No treated requests yet!     
                </v-card-subtitle>
            <v-expansion-panels variant="accordion">
            <v-expansion-panel v-for="(request, index) in treated" :key="index">
                <v-expansion-panel-title>
                <v-icon icon="mdi-cancel" color="error" v-if="request.treat == 'DENIED'"></v-icon>
                <v-icon icon="mdi-check" color="success" v-if="request.treat == 'APPROVED'"></v-icon>
                <h4 class="title">Answer id: {{ request.id }}</h4>
                <p class="date">Sender: {{ request.owner.firstname }}</p>
                <p class="date">Treatement date: {{ request.treatmentDate }}</p>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="text-left">
                <p class="motion mb-2">Request content: {{ request.content }}</p>
                <p class="motion mb-2">Sending date: {{ request.sendingDate }}</p>
                <p class="motion mb-2">Request status: {{ request.treat }}</p>
                <p class="motion mb-2" v-if="request.treat == 'DENIED'">Denial motion: {{ request.motion }}</p>
                <p class="motion mb-2" v-if="request.treat == 'APPROVED'">Document Id: {{ request.file.doc_id }}</p>
                <p class="motion mb-2">Treated by: {{ request.hr.firstname }} {{ request.hr.lastname }}</p>
                </v-expansion-panel-text>
                </v-expansion-panel>
                </v-expansion-panels>
            </v-card>
        </v-col>
        
    </v-row>
    <UserNav class="navigation"/>
    <FooterComponent/>
</template>

<script>
    import LogoComponent from "../../components/LogoComponent.vue";
    import UserNav from "../../components/UserNavBar.vue"
    import FooterComponent from "../../components/FooterComponent.vue";
    import axios from "axios";

    export default{       
        mounted(){
            this.getTreated();
            this.getNew();
            this.getDocuments();
        },
        components: {
            UserNav,
            LogoComponent,
            FooterComponent,
        },
        data() {
          return {
            treated : [],
            newR: [],
            dialog: false,
            dialog2: false,
            docId:'',
            idArray:[],
            fileDataArray: [],
            documents: [],
            owner: {},
            motion: '',
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
                axios.get('http://localhost:8081/edrms/hr/request/new', {
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
            getDocuments(){
                axios.get('http://localhost:8081/edrms/hr/documents/getAll', { 
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                    const Array = response.data.map(doc => doc.doc_id);
                    this.idArray = Array;
                    const fileArray = response.data.map(doc => doc.fileData);
                    this.fileDataArray = fileArray;
                    this.documents = response.data;   
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with fetching documents')
                });
            },
             approve(Id, doc) {
                const formData = new FormData();
                    formData.append('reqId', Id);
                    formData.append('docId', doc);
                axios.post('http://localhost:8081/edrms/hr/request/approve', formData, {
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.error('Error approving request:', error);
                });
                },  
                deny(Id, motion) {
                    const formData = new FormData();
                    formData.append('reqId', Id);
                    formData.append('motion', motion);
                axios.post('http://localhost:8081/edrms/hr/request/deny', formData, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    }
                })
                .then(response => {
                    this.getNew();
                    this.getTreated();
                    console.log(response.data)
                })
                .catch(error => {
                    console.error('Error denying request:', error);
                });
                },
                findOwner(doc_id) {
                    const document = this.documents.find(doc => doc.doc_id === doc_id);
                    this.owner = document ? document.owner : null;
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
        justify-content: end;
    }
    .v-card{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    @media screen and (max-width: 612px) {
        .container{
            width: 100%;
            margin: 0;
            margin-top: 100px;
            display: flex;
            flex-direction: column;
        }
        .v-row + .v-row {
            margin-top: 100px;
            width: 100%;
            margin-bottom: 100px;
        }
        .v-col-6, .v-col-5 {
            max-width: 100%;
            max-height: 300px;
            margin-bottom: 100px;
        }
    }
</style>