<template>
    <div class="login">
      <img src="@/assets/VERMEG_Logo.png" alt="vermeg-logo">
      <form @submit.prevent="login">
          <h2>Sign in</h2>
          <div class="container">
            <input type="text" placeholder="Email" id="Email"  v-model="email" autofocus required>
            <input type="password" placeholder="Password" id="password" v-model="password" required>
            <button variant="contained" type="submit">Sign in</button>
          </div>
          <a href="#" class="forgot">Forgot Password?</a>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useTokenStore } from '../stores/token';
  import router from '../router/index';

  export default{
    name: "LoginCom",
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods:{
      login() {
        const requestBody = {
          email: this.email,
          password: this.password
        };
        axios.post('http://localhost:8081/edrms/auth/authenticate', requestBody)
          .then(response => {
            const { access_token, refresh_token , role} = response.data;
            const store = useTokenStore()
            store.setToken(access_token)
            store.setRole(role)
            store.authenticate()
            localStorage.setItem('authToken', access_token)
            localStorage.setItem('userRole', role)
            router.push('/employee')
          })
          .catch(error => {
            console.error(error);
            console.log('Authentication failed. Please check your credentials.');
          });
        }
      }
  };
  </script>
  
  <style scoped>
      .login {
          display: inline-block;
          background: white;
          width: 500px;
          height: 600px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
          position: relative;
          overflow: hidden;
          text-align: center;
          margin-top: 150px;
      }
      img {
        width: 300px;
      }
      .container {
        position: absolute;
        bottom:50px;
        width: 100%;
      }
      .login h2 {
          text-align: left;
          font-size: 40px;
          margin-left: 50px;
          font-weight: 400;
          color: rgb(61, 60, 60);
      }
      .login input, .login button {
          width: 80%;
          padding: 12px 20px;
          margin: 50px 0;
          display: block;
          border: 1px solid #ccc;
          box-sizing: border-box;
          margin-left: auto;
          margin-right: auto;
      }
      .login form {
          display: block;
      }
      .login button{
        background-color: #0a66c2;
        border: none;
        cursor: pointer;
        align-items: center;  
        justify-content: center;
        border: none;
        border-radius: 25px;
        color: white;
      }
      button:hover {
        opacity: 0.8;
      }
      .forgot {
        position: absolute;
        bottom: 0;
        left: 0 ;
        color: #0a66c2;
        text-align: left;
        padding: 30px;
        margin-left: 30px;
        text-decoration: none;
        font-weight: 500;
      }
  </style>