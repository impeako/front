<template>
    <LogoComponent/>

    <v-container class="container">
      <div class="chat-box-list-container" ref="chatbox">
        <ul class="chat-box-list">
          <li
            class="message"
            v-for="(message, idx) in messages"
            :key="idx"
            :class="message.author"
          >
            <p>
              <span>{{ message.text }}</span>
            </p>
          </li>
        </ul>
      </div>
      <div class="chat-inputs">
        <v-text-field
        label="message"
        type="input"
        v-model="message"
        @keyup.enter="sendMessageToDialogflow"
        append-inner-icon="mdi-arrow-up-box"
        @click:append-inner="sendMessageToDialogflow"
        >
        </v-text-field>
      </div>
    </v-container>
    <employeeNav/>
  </template>
  
  <script>
    import LogoComponent from "../../components/LogoComponent.vue";
    import EmployeeNav from "../../components/UserNavBar.vue"
    import axios from 'axios';

  export default {
    components: {
            EmployeeNav,
            LogoComponent
        },
    name: 'ChatBox',
    data: () => ({
      message: '',
      messages: [],
      projectId: 'edrms-lysc',
      sessionId: '',
      serviceAccountKey: '',
      queryResult: '',  
    }),
    created() {
          this.sessionId = this.generateSessionId();
          this.fetchServiceAccountKey();
        },
    methods: {
      generateSessionId(length = 16) {
            const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const charactersLength = characters.length;
            let sessionId = '';
            for (let i = 0; i < length; i++) {
              sessionId += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return sessionId;
          },
          async fetchServiceAccountKey() {
              try {
                  const response = await axios.get("http://localhost:8081/api/serviceAccountKey");
                  this.serviceAccountKey = response.data;
              } catch (error) {
                  console.error("Error fetching service account key:", error);
                  throw error;
              }
          },
      async sendMessageToDialogflow() {
        try {
          // Construct the URL for the Dialogflow API endpoint
          const apiUrl = `https://dialogflow.googleapis.com/v2/projects/edrms-lysc/agent/sessions/${this.generateSessionId()}:detectIntent`;
          const userInput = this.message
          this.message = ''

          // Construct the request body
          const requestBody = {
            queryInput: {
              text: {
                text: userInput,
                languageCode: 'en'
              }
            }
          };

          // Set headers with your Dialogflow service account key
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.serviceAccountKey}`
          };

          // Send POST request to Dialogflow API
          const response = await axios.post(apiUrl, requestBody, { headers });

          // Handle response from Dialogflow
          console.log(response.data); // You can handle the response as per your application's logic
        } catch (error) {
          console.error('Error sending message to Dialogflow:', error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
    .container {
        width: 1200px;
        border-radius: 9px;
        padding: 40px;
        padding-bottom: 0;
        height: 700px;
        display: flex;
        flex-direction: column;
        justify-content: end;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        background: white;
    }
    .chat-inputs{
      display: inline-flex;
      margin-top: 40px;
    }
    li{
        display: block;
        width: fit-content;
        list-style: none;
        padding: 10px;
        margin: 10px;
        background-color: rgb(50, 129, 194);
        color: white;
        border-radius: 9px;
        max-width: 700px;
    }
    .chat-box-list-container{
    overflow-y: scroll;
    scrollbar-width: none;
    }
    @media screen and (max-width: 612px) {
      .container{
        width: 100%;
        height: 100vh;
        padding-top: 100px;
      }
    }
  </style>