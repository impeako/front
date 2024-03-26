<template>
    <LogoComponent/>
    <v-row class="container">

    <v-col cols="4" offset="2" class="form pa-10 mr-10">
        <form @submit.prevent="submit">
                        <h2 class="mb-5 text-left">Add a document</h2>
                        <v-row class="name mt-10">
                            <v-autocomplete
                            v-model="ownerEmail"
                            label="Owner Email"
                            :items="emails"
                            required
                            variant="outlined"
                            hide-details
                            ></v-autocomplete>
                        </v-row>
                        <v-row>
                            <v-autocomplete
                            v-model="type"
                            label="Type"
                            :items="typeList"
                            required
                            variant="outlined"
                            hide-details
                            ></v-autocomplete>     
                            <v-file-input clearable label="Add File" variant="outlined" v-model="file"></v-file-input>
                        </v-row>
                        <v-row>
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

    <v-col cols="4">
    <v-card
    class="mx-auto"
    >
        <v-list lines="two">
        <v-list-subheader>Documents</v-list-subheader>
        <v-list-item v-for="(document, index) in documents" :key="index" class="text-left">   
            <p class="doc"> Document id: {{ document.doc_id }}</p>
            <p class="doc"> Owner: {{ document.ownerEmail}}</p>
            <p class="doc"> Document type: {{ document.type }}</p>
            <div class="text-center pa-4">
                <v-btn @click="openDialog(index)">
                Open Dialog
                </v-btn>

                <v-dialog
                v-model="dialogStates[index]"
                width="auto"
                >
                <v-card>
                <template v-slot:text>
                    <img :src="getImageUrl(fileDataArray[index].data)" alt="Image" />
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

    <UserNav/>
</template>

<script>
    import LogoComponent from "../../components/LogoComponent.vue";
    import UserNav from "../../components/UserNavBar.vue"
    import axios from "axios";

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
            LogoComponent
        },
        data() {
          return {
            emails:[],
            typeList: ["Payslips", "Salary statements", "Wage summaries", "Invoices", "Purchase orders", "Receipts", "Expense reports", "Contracts", "Agreements", "Legal notices", "Terms of service", "Employment contracts", "Job descriptions", "Performance reviews", "HR policies and procedures", "Memos", "Announcements", "Newsletters", "Press releases", "Meeting agendas", "Meeting minutes", "Action items", "Presentations", "Training manuals", "Course outlines", "Training schedules", "Compliance reports", "Audit documents", "Regulatory filings", "Travel itineraries", "Travel policies", "Health and safety manuals", "Incident reports", "Emergency procedures", "Quality control reports", "Inspection checklists", "Product specifications", "Customer feedback forms", "Service level agreements", "Customer support scripts", "Project charters", "Project plans", "Status reports", "Gantt charts", "Leave requests", "Expense reimbursement forms", "Employee onboarding forms", "IT policies", "System documentation", "Software licenses", "Maintenance schedules", "Lease agreements", "Facility usage policies"],
            documents: [],
            // form data
            ownerEmail: '',
            type: '',
            file: null,
            fileDataArray: [],
            dialogStates: [],
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
                    this.documents = response.data;
                    this.fileDataArray = fileArray
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with fetching documents')
                });
            },
            addDoc() {
                const formData = new FormData();
                formData.append('ownerEmail', this.ownerEmail);
                formData.append('type', this.type);
                formData.append('fileData', this.file[0]);
                axios.post('http://localhost:8081/edrms/hr/documents/add',formData,{
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                    } 
                    })
                    .then(response => {
                    console.log(response.data);
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
                const signature = this.getFileSignature(data);
                const fileType = this.getFileTypeFromSignature(signature);
                
                switch (fileType) {
                    case "image/jpeg":
                    case "image/png":
                        return `data:${fileType};base64,${data}`;
                    case "application/pdf":
                        console.log("pdf")
                        //return `path-to-pdf-viewer?file=${data}`;
                        // or
                        window.open(`data:application/pdf;base64,${data}`, "_blank");
                        // or
                        //alert("PDF files cannot be previewed directly. Please download the file.");
                    
                    default:
                        alert("Unsupported file type!");
                    break;
                }
            },
            getFileSignature(fileData) {
            const signature = this.base64ToHex(fileData.slice(0, 4).toString("hex"));
            return signature;
            },

            getFileTypeFromSignature(signature) {
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
        },
    }
</script>

<style scoped>
    .container{
        max-height: 600px;
        overflow: hidden;
    }
    .doc{
        font-weight: 500;
    }
    .form{
        border-radius: 9px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        max-height: 500;
    }
    .form .v-text-field {
        margin-bottom: 20px;
    }
    .v-list{
        max-height: 500px;
        overflow-y: scroll;
        scrollbar-width: none;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>