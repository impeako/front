<template>
    <LogoComponent/>
    <v-row class="container">
    <v-col cols="3" offset="2" class="form pa-10 mr-10">
        <form @submit.prevent="submit">
            <h2 class="mb-10 text-left">Add a document</h2>  
                        <v-row> 
                            <v-file-input clearable label="Add File" variant="outlined" v-model="file" @change="console.log(this.file[0]); ocr(this.file[0])"></v-file-input>
                        </v-row>
                        <v-row class="addbtn">
                            <v-btn
                            class="addBtn"
                            type="submit"
                            size="large"
                            color="#0a66c2"
                            @click="addDoc()"
                            >
                            add file
                            </v-btn>
                        </v-row>
                    </form>
    </v-col>

    <v-col cols="4" class="pa-0 ml-10 list">
    <v-card>
            <v-text-field 
                        v-model="searchedDoc"
                        label="Search Document"
                        hide-details
                        @input="searchDoc"
                        @keyup.delete="searchDoc($event)"
                        class="search pa-2"
                        variant="outlined"
                        @click:append-inner="resetSearch"
                        append-inner-icon="mdi-file-search"
                        >
                        <template v-slot:append-inner >
                            <transition name="slide-x-reverse-transition">
                                <v-icon v-if="searchedDoc !== ''" key="clearIcon" @click="resetSearch">mdi-close-circle</v-icon>
                            </transition>
                        </template>
            </v-text-field>
        <v-list lines="two">  
        <v-list-subheader>Documents</v-list-subheader>
        <v-list-item v-for="(document, index) in documents" :key="index" class="text-left">
            <v-row>
                <v-col>
                    <p class="doc"> Document id: {{ document.doc_id }}</p>
                </v-col>
                <v-col class="text-right">
                    <v-btn icon="mdi-delete" variant="plain" color="red" @click="dialog = true"></v-btn>
                    <v-dialog
                    v-model="dialog"
                    width="auto"
                    >
                    <v-card
                        max-width="400"
                        text="this will delete the document permenatly."
                        title="Delete this Document?"
                    >
                        <template v-slot:actions>
                        <v-btn @click="dialog = false">
                            no
                        </v-btn>

                        <v-btn @click="dialog = false; deleteFile(document.doc_id)">
                            yes
                        </v-btn>
                        </template>
                    </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
            <p class="doc"> Owner: {{ document.ownerEmail}}</p>
            <p class="doc"> Document type: {{ document.type }}</p>
            <div class="text-right pa-4">
                <v-btn @click="buttonFunction(index, fileDataArray[index].data)" color="#0a66c2">
                Open file
                </v-btn>

                <v-dialog
                v-model="dialogStates[index]"
                width="auto"
                >
                <v-card>
                <template v-slot:text>
                    <img :src="getImageUrl(fileDataArray[index].data)" alt="Image"/>
                </template>
                    <template v-slot:actions>
                    <v-btn
                        class="ms-auto"
                        text="Ok"
                        @click="closeDialog(index)"
                    ></v-btn>
                    </template>
                </v-card>
                </v-dialog>
            </div>
            <v-divider class="mt-5"></v-divider>
        </v-list-item>
        </v-list>
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
    import { createWorker,PSM } from 'tesseract.js';

    export default{
        created() {
                this.dialogStates = new Array(this.documents.length).fill(false);
            },
        mounted(){
            this.getDocuments(),
            this.getUsers()
        },
        components: {
            UserNav,
            LogoComponent,
            FooterComponent,
        },
        data() {
          return {
            emails:[],
            documents: [],
            // form data
            file: null,
            fileDataArray: [],
            dialogStates: [],
            searchedDoc: '',
            dialog: false,
            OCRData: '',
            id: '',
            type:'',
          }
        },
        methods: {
            getUsers(){
                axios.get('http://localhost:8081/edrms/hr/employee-management/getAllEmployees', { 
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                    const emailArray = response.data.map(user => user.email);
                    this.emails = emailArray;
                })
                .catch(error => {
                    console.error(error);
                    console.log('error with fetching users');
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
            addDoc() {
                const formData = new FormData();
                formData.append('ownerEmail', this.OCREmail);
                formData.append('type', this.OCRType);
                formData.append('fileData', this.file[0]);
                formData.append('OCRdata', this.OCRData);
                axios.post('http://localhost:8081/edrms/hr/documents/add',formData,{
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                    } 
                    })
                    .then(response => {
                    this.getDocuments();
                    console.log("added")
                    })
                    .catch(error => {
                    console.error('Error:', error);
                    });
            },

            openDialog(index){
                this.dialogStates[index] = true;
            },
            closeDialog(index) {
                this.dialogStates[index] = false;
            },

            getImageUrl(data) {
                const fileType = this.getFileTypeFromSignature(data);
                
                switch (fileType) {
                    case "image/jpeg":
                    case "image/png":
                        return `data:${fileType};base64,${data}`;                  
                    default:
                    break;
                }
            },

            openPDF(data){
                const binaryData = atob(data);

                const arrayBuffer = new ArrayBuffer(binaryData.length);
                const uint8Array = new Uint8Array(arrayBuffer);
                for (let i = 0; i < binaryData.length; i++) {
                    uint8Array[i] = binaryData.charCodeAt(i);
                    }
                const blob = new Blob([uint8Array], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                window.open(url);
            },

            getFileTypeFromSignature(fileData) {
                const signature = this.base64ToHex(fileData.slice(0, 4).toString("hex"));
                const signatures = {
                    "ffd8ff": "image/jpeg",
                    "89504e": "image/png",
                    "255044": "application/pdf",
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
            searchDoc(event) {
                const searchQuery = this.searchedDoc.toLowerCase();
                if (event && event.keyCode === 8) {
                    this.getDocuments()
                } else {
                this.documents = this.documents.filter(doc => {
                    const ownerEmailMatch = doc.ownerEmail.toLowerCase().includes(searchQuery);
                    const docIdMatch = doc.doc_id.toLowerCase().includes(searchQuery);
                    const docTypeMatch = doc.type.toLowerCase().includes(searchQuery);
                    const docNameMatch = doc.owner.firstname.toLowerCase().includes(searchQuery);
                    return ownerEmailMatch || docIdMatch || docTypeMatch || docNameMatch;
                });
                }
            },
            resetSearch() {
            this.searchedDoc = '';
            this.getDocuments();
            },

            deleteFile(fileId){
                axios.delete('http://localhost:8081/edrms/hr/documents/delete/'+ fileId ,{ 
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                    this.getDocuments();
                    console.log(response.data)
                })
                .catch(error => {
                    console.error(error);
                    console.log('error with fetching users');
                });
            },
            buttonFunction(index, data){
                if(this.getFileTypeFromSignature(data) !== 'application/pdf'){
                    this.openDialog(index)
                }
                else {
                    this.openPDF(data)
                }
            },
            async ocr(file){
                const text = await this.extractText(file);
                this.OCRData = text
                this.id = await this.extractID(text);
                this.type = await this.extractType(text)
            }, 
            async extractText(file){
                const worker = await createWorker('fra');
                worker.setParameters({tessedit_pageseg_mode: PSM.AUTO,});
                const { data: { text } } = await worker.recognize(file);
                return text
            },
            async extractID(text){
                const patterns = [
                    /id:\s*(\d+)/i,
                    /matricule:\s*(\d+)/i,
                    /siret:\s*(\d+)/i,
                    /id\s*(\d+)/i,
                    /matricule\s*(\d+)/i,
                    /siret\s*(\d+)/i
                ];
                for (const pattern of patterns) {
                    const match = text.match(pattern);
                    if (match) {
                        const siretNumber = match[1];
                        console.log("Siret Number:", siretNumber);
                        return siretNumber
                    }
                }
                console.log("No Siret number found.");
            },
            async extractType(text){
                const documentTypes = [
                /Bulletin de paie/i,
                /Contrat de travail/i,
                /Fiches de paie/i,
                /Attestation d'emploi/i,
                /Certificat de travail/i,
                /Relevé d'heures/i,
                /Relevé d'absences/i,
                /Dossier médical/i,
                /Plan de formation/i,
                /Politique de l'entreprise/i,
                /Document sur la protection des données personnelles/i
                ];
                for (const pattern of documentTypes) {
                    const match = text.match(pattern);
                    if (match) {
                        const type = match[0];
                        console.log("Document type:", type);
                        return type
                    }
                }
                console.log("No Document type is found.");
            },
        },
    }
</script>

<style scoped>
    .container{
        max-height: 600px;
        overflow: hidden;
        padding: 20px;
    }
    .v-card--variant-elevated {
        box-shadow: none;
    }
    .doc{
        font-weight: 500;
    }
    .form{
        border-radius: 9px;
        background-color: white;
        max-height: 400px;
    }
    .form .v-text-field {
        margin-bottom: 20px;
    }
    .v-list{
        max-height: 500px;
        overflow-y: scroll;
        scrollbar-width: none;
    }
    .addbtn{
        display: flex;
        justify-content: end;
    }
    @media screen and (max-width: 612px) {
        .v-row{
            margin: 0;
        }
        .container{
            width: 100%;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: auto;
            max-height: 100%;
        }
        .v-col-3, .v-col-4{
            max-width: 90%;
            margin: 0;
            padding: 0;
        }
        .v-col-3{
        margin-top: 100px;
        }
        .offset-2 {
            margin-inline-start: 0;
        }
        .ml-10 {
            margin-left: 0px !important;
        }
        .mr-10 {
        margin-right: 0px !important;
        }
        .list{
            margin-top: 100px;
            max-height: 350px;
        }
    }
</style>