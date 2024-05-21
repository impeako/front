<template>
    <LogoComponent/>

    <v-row class="container" justify="space-between">
        <v-col cols="4">
            <v-card hover>
            <v-card-title class="text-left mb-5">
                    Pending Requests
                    <v-icon icon="mdi-progress-clock" size="x-small" color="blue"></v-icon>
                </v-card-title>
                <v-card-subtitle class="text-left mb-3">
                    <p>Pending requests number: {{ this.PendingCount(this.newR) }}</p>
                    <v-btn @click="show1 = !show1" icon="mdi-details" variant="plain" color="blue"></v-btn>
                </v-card-subtitle>
            <v-expansion-panels variant="accordion" v-if="show1">
            <v-expansion-panel v-for="(n, index) in newR" :key="index">
                <v-expansion-panel-title v-if="n.status === null">
                <h4 class="title">Request id: {{ n.id }}</h4>
                <p class="date mb-2"><b>Date of sending:</b> {{ n.sendingDate }}</p>
                <p class="date"><b>Sender :</b> {{ n.sender.firstname }} {{ n.sender.lastname }}</p>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="text-left">
                <p class="motion mb-8">Request content: {{ n.content }}</p>
                <v-btn @click="changeStatus(n.id, 'in progress')" color="primary">start treatment</v-btn>
                </v-expansion-panel-text>
            </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
        </v-col>
        <v-col cols="4">
            <v-card hover>
            <v-card-title class="text-left mb-5">
                    In treatment Requests
                    <v-icon icon="mdi-pencil" size="x-small" color="blue"></v-icon>
                </v-card-title>
                <v-card-subtitle class="text-left mb-3">
                    <p>In treatment requests number: {{ this.inTreatmentCount(this.newR) }}</p>
                    <v-btn @click="show2 = !show2" icon="mdi-details" variant="plain" color="blue"></v-btn>   
                </v-card-subtitle>
            <v-expansion-panels variant="accordion" v-if="show2">
            <v-expansion-panel v-for="(n, index) in newR" :key="index">
                <v-expansion-panel-title v-if="n.status">
                <h4 class="title">Request id: {{ n.id }}</h4>
                <p class="date mb-2"><b>Date of sending:</b> {{ n.sendingDate }}</p>
                <p class="date mb-2"><b>Sender :</b> {{ n.sender.firstname }} {{ n.sender.lastname }}</p>
                <p class="date"><b>status :</b> {{ n.status}}</p>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="text-left" v-if="n.status">
                <p class="motion mb-8">Request content: {{ n.content }}</p>
                <div class="buttons">
                    <v-dialog
                        v-model="dialog3"
                        max-width="400"
                        persistent
                        >
                        <template v-slot:activator="{ props: activatorProps }">
                        <v-btn color="#0a66c2" type="submit" class="me-4" v-bind="activatorProps">status</v-btn>
                        </template>
                        <v-card
                        title="Change request status:"
                        >
                        <v-card-text>
                            <v-text-field label="status" variant="underlined" v-model="newStatus" class="mt-5"></v-text-field>
                        </v-card-text>
                        <template v-slot:actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="dialog3 = false">
                        Cancel
                        </v-btn>
                        <v-btn @click="dialog3 = false; changeStatus(n.id, this.newStatus)">
                        Change
                        </v-btn>
                        </template>
                        </v-card>
                        </v-dialog>
                    <v-dialog
                        v-model="dialog2"
                        max-width="400"
                        persistent
                        >
                        <template v-slot:activator="{ props: activatorProps }">
                        <v-btn color="success" type="submit" class="me-4" v-bind="activatorProps">Approve</v-btn>
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
                            @click="GetEmployeeDocuments(n.sender.email)"
                            ></v-autocomplete>
                            <div v-if="this.docId !== ''">
                                <h5 class="mt-5 mb-2">Document information: </h5>
                                <p class="mb-2"><b>owner: </b>{{ this.docInfo.owner.firstname }} {{ this.docInfo.owner.lastname }}</p>
                                <p><b>type:</b> {{ this.docInfo.type }}</p>
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
                        title="Deny this request ?"
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
        <v-col cols="4">
            <v-card hover>
                <v-card-title class="text-left mb-5">
                    Treated Requests
                    <v-icon icon="mdi-check" size="x-small" color="green"></v-icon>
                </v-card-title>
                <v-card-subtitle class="text-left mb-3">
                    <p>Treated requests number: {{ this.treated.length }}</p>
                    <v-btn @click="show3 = !show3" icon="mdi-details" variant="plain" color="blue"></v-btn>     
                </v-card-subtitle>
            <v-expansion-panels variant="accordion" v-if="show3">
            <v-expansion-panel v-for="(request, index) in treated" :key="index">
                <v-expansion-panel-title>
                <v-icon icon="mdi-cancel" color="error" v-if="request.treat == 'DENIED'"></v-icon>
                <v-icon icon="mdi-check" color="success" v-if="request.treat == 'APPROVED'"></v-icon>
                <h4 class="title">Answer id: {{ request.id }}</h4>
                <p class="date mb-2"><b>Sender: </b>{{ request.owner.firstname }}</p>
                <p class="date"><b>Treatement date: </b>{{ request.treatmentDate }}</p>
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
    <df-messenger
    chat-icon="https:&#x2F;&#x2F;cdn-icons-png.flaticon.com&#x2F;512&#x2F;4298&#x2F;4298373.png"
    intent="WELCOME"
    chat-title="EDRMS"
    agent-id="6f206d09-b1ca-4f31-9a0e-c1fdb7a7b825"
    language-code="en"
    ></df-messenger>
    <UserNav/>
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
        watch: {
            docId(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.findDocInfo(newVal);
                }
            }
        },
        data() {
          return {
            treated : [],
            newR: [],
            dialog: false,
            dialog2: false,
            dialog3: false,
            docId:'',
            idArray:[],
            fileDataArray: [],
            documents: [],
            motion: '',
            docInfo: '',
            newStatus: '',
            show1: false,
            show2: false,
            show3: false,
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
                    const fileArray = response.data.map(doc => doc.fileData);
                    this.fileDataArray = fileArray;
                    this.documents = response.data;  
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with fetching documents')
                });
            },
            GetEmployeeDocuments(EmployeeEmail){
                axios.get('http://localhost:8081/edrms/hr/documents/AllByEmployee',{
                    params: {
                        email: EmployeeEmail
                    },
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                    const Array = response.data.map(doc => doc.doc_id);
                    this.idArray = Array;
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
                    this.getTreated();
                    this.getNew();
                    this.getDocuments();
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
                    this.getTreated();
                    this.getNew();
                    this.getDocuments();
                })
                .catch(error => {
                    console.error('Error denying request:', error);
                });
            },
            findDocInfo(doc){
                if(this.docId){
                    axios.get('http://localhost:8081/edrms/hr/documents/getDoc',{
                        params: {
                            id: doc
                        },
                        headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                        } 
                    })
                    .then(response => {
                        this.docInfo = response.data
                    })
                    .catch(error => {
                        console.error(error)
                        console.log('error with finding the document')
                    });
                }
            },
            changeStatus(reqID, azer){
                const formData = new FormData();
                    formData.append('id', reqID);
                    formData.append('status', azer);
                axios.post('http://localhost:8081/edrms/hr/request/change-status', formData, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    }
                })
                .then(response => {
                    this.getTreated();
                    this.getNew();
                    this.getDocuments();
                })
                .catch(error => {
                    console.error('Error Starting treatment:', error);
                });
            },
            PendingCount(array){
                const charray = array
                return charray.reduce((count, obj) => {
                    if (obj.status === null) {
                        count++;
                    }
                    return count;
                }, 0);
            },
            inTreatmentCount(array){
                const charray = array
                return charray.reduce((count, obj) => {
                    if (obj.status !== null) {
                        count++;
                    }
                    return count;
                }, 0);
            },
        }
    }
</script>

<style scoped>
    .container {
        width: 1200px;
        margin: auto;
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
        box-shadow: none;
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
            padding-bottom: 100px;
        }
        .v-col-4 {
            max-width: 100%;
            max-height: 300px;
            margin-bottom: 100px;
        }
    }
</style>