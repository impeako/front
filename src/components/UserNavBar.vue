<template>
  <v-container class="nav">
    <v-row class="topnav">
      <v-col class="text-left">
        <img src="../assets/Logo_wh.png" alt="logo" class="logo">
      </v-col>
      <v-col class="text-right">
        <v-btn variant="plain" @click="toggleExpand" class="menu-button" style="transform: rotate(0deg);">
          <v-icon icon="mdi-menu-left" color="white" :style="{ transform: expand ? 'rotate(-90deg)' : 'rotate(0deg)' }"></v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="menu" v-if="expand">
      <nav>
        <ul>
          <router-link to="/employee">
            <li @click="toggleExpand"> <v-icon icon="mdi-account" class="mr-3"></v-icon>Profile</li>
          </router-link>
          <router-link to="/employee/Documents">
            <li @click="toggleExpand"><v-icon icon="mdi-send" class="mr-3"></v-icon>Documents</li>
          </router-link>
          <router-link to="/employee/assistance">
            <li @click="toggleExpand"><v-icon icon="mdi-progress-helper" class="mr-3"></v-icon>Assistance</li>
          </router-link>
          <router-link to="/hr/requests-treatment" v-if="role === 'HR'">
            <li @click="toggleExpand"><v-icon icon="mdi-transcribe" class="mr-3"></v-icon>Requests</li>
          </router-link>
          <router-link to="/hr/documents-management" v-if="role === 'HR'">
            <li @click="toggleExpand"><v-icon icon="mdi-file-document-plus-outline" class="mr-3"></v-icon>Documents management</li>
          </router-link>
          <router-link to="/admin/user-management" v-if="role === 'ADMIN'">
            <li @click="toggleExpand"><v-icon icon="mdi-account-edit" class="mr-3"></v-icon>User management</li>
          </router-link>
          <router-link to="/admin/dashboard" v-if="role === 'ADMIN'">
            <li @click="toggleExpand"><v-icon icon="mdi-google-analytics" class="mr-3"></v-icon>Dashboard</li>
          </router-link>
          <v-divider></v-divider>
          <router-link to="/">
            <li @click="toggleExpand"><v-icon icon="mdi-logout" class="mr-3"></v-icon>Logout</li>
          </router-link>
        </ul>
    </nav>
    </v-row>
  </v-container>
    <v-card class="bignav">
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail>
        <v-list>
          <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            class="text-left">
            <v-list-item-subtitle>{{ profile.email }}</v-list-item-subtitle>
            <v-list-item-title>{{ profile.firstname }} {{ profile.lastname }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <router-link to="/employee">
          <v-list-item prepend-icon="mdi-account" title="Profile" value="profile" class="icons text-left"></v-list-item>
          </router-link>
          <router-link to="/employee/Documents">
          <v-list-item prepend-icon="mdi-send" title="documents" value="documents" class="icons text-left"></v-list-item>
          </router-link>
          <router-link to="/employee/assistance">
          <v-list-item prepend-icon="mdi-progress-helper" title="Assistance" value="Assistance" class="icons text-left"></v-list-item>
          </router-link>
          <v-divider></v-divider>
          <router-link to="/hr/requests-treatment">
          <v-list-item prepend-icon="mdi-transcribe" title="requests treatment" value="treatment" class="icons text-left" v-if="role === 'HR'"></v-list-item>
          </router-link>
          <router-link to="/hr/documents-management">
          <v-list-item prepend-icon="mdi-file-document-plus-outline" title="Documents management" value="treatment" class="icons text-left" v-if="role === 'HR'"></v-list-item>
          </router-link>
          <v-divider></v-divider>
          <router-link to="/admin/user-management">
          <v-list-item prepend-icon="mdi-account-edit" title="users management" value="management" class="icons text-left" v-if="role === 'ADMIN'"></v-list-item>
          </router-link>
          <router-link to="/admin/dashboard">
          <v-list-item prepend-icon="mdi-google-analytics" title="dashboard" value="dashboard" class="icons text-left" v-if="role === 'ADMIN'"></v-list-item>
          </router-link>
          <v-divider></v-divider>
          <router-link to="/">
          <v-list-item prepend-icon="mdi-logout" title="Logout" value="Logout" class="icons text-left" @click="logout"></v-list-item>
          </router-link>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<script>
  import { useTokenStore } from '../stores/token';
  import axios from 'axios';

  export default {
    mounted() {
      this.getProfile();
    },
    data: () => ({
      role: localStorage.getItem("userRole"),
      profile : {},
      expand: false,
    }),
    methods: {
          getProfile(){
                axios.get('http://localhost:8081/edrms/employee/profile', { 
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                    this.profile = response.data
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with fetching user information')
                });
            },
            logout(){
                axios.post('http://localhost:8081/edrms/auth/logout', { 
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                  useTokenStore().clearToken();
                  localStorage.removeItem('authToken');
                  localStorage.removeItem('userRole');
                  console.log(response.data);
                  console.log("you have logged out !");
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with fetching user information')
                });
            },
            toggleExpand() {
              this.expand = !this.expand;
            }
    },
};
</script>

<style scoped>
  .icons {
    color: #0a66c2;
  }
  a {
    text-decoration: none;
  }
  .topnav{
    display: none;
  }
  @media screen and (max-width: 612px) {
     .bignav {
      display: none;
     }
     .topnav{
      display: flex;
      background: #3388dd;
      width: 100%;
      align-items: center;
      position: fixed;
      top: 0;
      margin: 0;
      height: 70px;
      z-index: 999;
     }
     .logo{
      width: 100px;
     }
     .v-container{
      margin: 0;
      padding: 0;
     }
     .menu{
      margin: 0;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: white;
      display: flex;
      justify-content: start;
     }
     .menu ul{
      margin-top: 100px;
      list-style: none;
      text-align: left;
      padding-left: 30px;
     }
     .menu li{
      color: #0a66c2;
      font-weight: 400;
      padding: 10px;
     }
     .menu li .v-icon{
      color: #0a66c2;
     }
     .menu-button{
      font-size: 25px;
      opacity: 100%;
     }
  }
</style>