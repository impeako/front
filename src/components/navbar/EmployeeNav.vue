<template>
    <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
            class="text-left"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <router-link to="/employee">
          <v-list-item prepend-icon="mdi-account" title="Profile" value="profile" class="icons text-left"></v-list-item>
          </router-link>
          <router-link to="/employee/request">
          <v-list-item prepend-icon="mdi-send" title="Request Document" value="request" class="icons text-left"></v-list-item>
          </router-link>
          <router-link to="/employee/answers">
          <v-list-item prepend-icon="mdi-file-document-outline" title="Documents" value="documents" class="icons text-left"></v-list-item>
          </router-link>
          <router-link to="/employee/assistance">
          <v-list-item prepend-icon="mdi-progress-helper" title="Assistance" value="Assistance" class="icons text-left"></v-list-item>
          </router-link>
          <router-link to="/login">
          <v-list-item prepend-icon="mdi-logout" title="Logout" value="Logout" class="icons text-left" @click="logout"></v-list-item>
          </router-link>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<script>
  import { useTokenStore } from '../../stores/token';

  export default {
  methods: {
    logout() {
      useTokenStore().clearToken();
      console.log("you have logged out !")
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