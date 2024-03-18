<template>
    <LogoComponent/>
    
    <v-container class="container">
    <v-row no-gutters>
    <v-col class="pa-2 ma-5">
    <div class="text-h4 mb-5 text-left">Approved</div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel
        v-for="i in 3"
        :key="i">
        <v-expansion-panel-title>
        <h4 class="title">Request id: {{ id }}</h4>
        <p class="date">Treatement date: {{ date }}</p>
        </v-expansion-panel-title>
        <v-expansion-panel-text class="text-left">
          <p class="motion mb-2">Request content: {{ content }}</p>
          <v-btn class="download mb-3" prepend-icon="mdi-file-download">Document</v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    </v-col>
    <v-col class="pa-2 ma-5">
    <div class="text-h4 mb-5 text-left">Denied</div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel
        v-for="i in 3"
        :key="i">
        <v-expansion-panel-title>
        <h4 class="title">Request id: {{ id }}</h4>
        <p class="date">Treatement date: {{ date }}</p>
        </v-expansion-panel-title>
        <v-expansion-panel-text class="text-left">
          <p class="motion mb-2">Request content: {{ content }}</p>
          <p class="motion ">motion: {{ motion }}</p>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    </v-col>
    </v-row>
    </v-container>

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
    .emplyeeNav{
      z-index: 100;
    }
    .container {
        max-width: 1200px;        
    }
    .v-expansion-panel-title{
      display: flexbox;
      flex-direction: column;
      align-items: start;
    }
    .v-expansion-panel-text{
      display: block;
    }
    .v-expansion-panels {
      max-height: 500px;
      overflow-y: scroll;
      scrollbar-width: none;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      z-index: 0;
    }
    .title {
      margin: 10px;
    }
    p {
      margin-left: 10px;
      font-size: 15px;
      font-weight: 400;
    }
    .download{
      float: right;
      background-color: #0a66c2;
      color: white;
    }
</style>