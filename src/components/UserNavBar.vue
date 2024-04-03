<template>
    <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
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
          <v-list-item prepend-icon="mdi-file-document-plus-outline" title="requests treatment" value="treatment" class="icons text-left" v-if="role === 'HR'"></v-list-item>
          </router-link>
          <v-divider></v-divider>
          <router-link to="/admin/user-managemnt">
          <v-list-item prepend-icon="mdi-account-edit w" title="users management" value="management" class="icons text-left" v-if="role === 'ADMIN'"></v-list-item>
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
</style>