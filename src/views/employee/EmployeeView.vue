<template>
    <LogoComponent/>

    <!-- Profile Information-->
    <v-card
    class="mx-auto pa-5"
    max-width="600"
    hover
  >
    <v-card-item>
      <v-avatar color="surface-variant" size="200" class="mb-10">
        <img :src="image" alt="profile picture">
      </v-avatar>
      <v-card-title class="mb-5">
        Employee Name
        {{firstname}} {{ lastname }}
      </v-card-title>
    </v-card-item>

    <v-card-text class="text-left">
      <p class="information">Employee id : {{ id }}</p>
      <p class="information">Departement : {{ department }}</p>
      <p class="information">Position : {{ position }}</p>
      <p class="information">Birth date : {{ birth }}</p>
      <p class="information">Email address : {{ email }}</p>
      <p class="information">Phone number : {{ number }}</p>
    </v-card-text>
  </v-card>

    <employeeNav/>
</template>

<script>
    import LogoComponent from "../../components/LogoComponent.vue";
    import EmployeeNav from "../../components/navbar/EmployeeNav.vue"

    export default{
        components: {
            EmployeeNav,
            LogoComponent
        }
    }
</script>

<style scoped>
  .v-card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .information {
    font-size: 15px;
    padding: 5px;
    margin-bottom: 5px;
  }
</style>