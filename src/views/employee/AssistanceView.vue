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
        @keyup.enter="sendMessage"
        >
        </v-text-field>
        <v-btn icon="mdi-arrow-up-box" @click="sendMessage" class="send-button ml-3" variant="plain"></v-btn>
      </div>
    </v-container>

    <employeeNav/>
  </template>
  
  <script>
    import LogoComponent from "../../components/LogoComponent.vue";
    import EmployeeNav from "../../components/UserNavBar.vue"
  export default {
    components: {
            EmployeeNav,
            LogoComponent
        },
    name: 'ChatBox',
    data: () => ({
      message: '',
      messages: []
    }),
    methods: {
      sendMessage() {
        const message = this.message
  
        this.messages.push({
          text: message,
          author: 'client'
        })
  
        this.message = ''
  
        this.$axios.get(`https://www.cleverbot.com/getreply?key=CC8uqcCcSO3VsRFvp5-uW5Nxvow&input=${message}`)
        .then(res => {
          this.messages.push({
            text: res.data.output,
            author: 'server'
          })
  
          this.$nextTick(() => {
            this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight
          })
        })
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
    }
    button {
        color: black;
        font-size: 40px;
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
  </style>