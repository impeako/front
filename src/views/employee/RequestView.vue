<template>
    <LogoComponent/>
    <!-- document request -->
    <v-row no-gutters class="container">
    <v-col cols="5" offset="1" width="500">
        <v-sheet class="mx-auto doc-request">
        <v-form @submit.prevent>
        <v-text-field
            v-model="requestContent"
            :rules="rules"
            label="Request Document"
            variant="outlined"
        ></v-text-field>
        <v-btn color="#0a66c2" type="submit" class="me-4" block>Request</v-btn>
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

      <v-list-item prepend-icon="mdi-check"  v-for="(request, idx) in requests"
            :key="idx">
        <h5 class="requestId"> Request ID: {{ id }}</h5>
        <p class="content">Date: {{ date }}</p>
        <p class="content">Content: {{ content }}</p>
      </v-list-item>

      <v-divider inset></v-divider>
    </v-list>
    </v-card>
    </v-col>
    </v-row>

    <!-- side nav bar -->
    <EmployeeNav />
</template>

<script>
    import LogoComponent from "../../components/LogoComponent.vue";
    import EmployeeNav from "../../components/navbar/EmployeeNav.vue"

    export default{
        components: {
            EmployeeNav,
            LogoComponent
        },
        data: () => ({
        request: '',
        requests: []
        }),
        methods: {
          sendrequest(){
            const content = this.requestContent
          }
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