<template>
    <LogoComponent/>
    <!-- document request -->
    <v-row no-gutters class="container">
    <v-col cols="5" offset="1" width="500">
        <v-sheet class="mx-auto doc-request">
        <v-form @submit.prevent>
        <v-text-field
            v-model="requestSended"
            label="Request Document"
            variant="outlined"
        ></v-text-field>
        <v-dialog
           v-model="dialog"
           max-width="400"
          persistent
        >
        <template v-slot:activator="{ props: activatorProps }">
        <v-btn color="#0a66c2" type="submit" class="me-4" block v-bind="activatorProps">Request</v-btn>
        </template>
        <v-card
        title="Want to send this request ?"
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
    </v-col>

    <!-- Request History -->
    <v-col cols="4" offset="1">
    <v-card
    class="mx-auto"
    max-width="425"
  >
    <v-list lines="two" class="requests text-left">
      <v-list-subheader>requests</v-list-subheader>

      <v-list-item v-for="(request, idx) in requests" :key="idx">
        <v-row>
        <v-col cols="1">
        <v-icon icon="mdi-progress-clock" color="blue" v-if="request.treated == 'IN_PROGRESS'"></v-icon>
        <v-icon icon="mdi-cancel" color="error" v-if="request.treated == 'DENIED'"></v-icon>
        <v-icon icon="mdi-check" color="success" v-if="request.treated == 'APPROVED'"></v-icon>
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
    </v-row>

    <!-- side nav bar -->
    <EmployeeNav />
</template>

<script>
    import LogoComponent from "../../components/LogoComponent.vue";
    import EmployeeNav from "../../components/UserNavBar.vue"
    import axios from "axios";

    export default{
        mounted(){
              this.getRequests();
          },
        components: {
            EmployeeNav,
            LogoComponent
        },
        data: () => ({
          dialog: false,
          requestSended: '',
          requests: [],

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
                    console.log(response.data)
                    this.getRequests();
                    this.requestSended = '';
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with sending request', parameter)
                });
          },
          getRequests(){
                axios.get('http://localhost:8081/edrms/employee/request/history', { 
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
        }
    }
</script>

<style scoped>
    .v-list.requests{
        height:400px;
        overflow-y: scroll;
        scrollbar-width: none;
    }
    .doc-request {
      height: 100%;
      width: 100%;
    }
    .content {
      font-weight: 400;
      font-size: 14px;
    }
    .container {
      display: flex;
      flex-direction: row;
      align-items: end;
    }
</style>