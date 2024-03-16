<template>
    <LogoComponent/>

    <!-- Documents section -->
    <v-container class="requests">
        <v-row no-gutters>
            
        </v-row>
    </v-container>

    <!-- document request -->
    <v-row no-gutters>
    <v-col cols="5"offset="1" width="500">
        <v-sheet class="mx-auto">
        <v-form @submit.prevent class="doc-request">
        <v-text-field
            v-model="request"
            :rules="rules"
            label="Request Document"
            variant="outlined"
        ></v-text-field>
        <v-btn color="black" type="submit" class="me-4" block>Submit</v-btn>
        </v-form>
        </v-sheet>
    </v-col>

    <!-- Request History -->
    <v-col cols="4"offset="1">
    <v-card
    class="mx-auto"
    max-width="425"
  >
    <v-list lines="two" class="requests text-left">
      <v-list-subheader>requests</v-list-subheader>

      <v-list-item
        prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
        title="Brunch this weekend?"
      >
        <template v-slot:subtitle>
          <span class="font-weight-bold">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?
        </template>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item
        prepend-avatar="https://cdn.vuetifyjs.com/images/lists/2.jpg"
      >
        <template v-slot:title>
          Summer BBQ <span class="text-grey-lighten-1">4</span>
        </template>

        <template v-slot:subtitle>
          <span class="font-weight-bold">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.
        </template>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item
        prepend-avatar="https://cdn.vuetifyjs.com/images/lists/3.jpg"
        title="Oui oui"
      >
        <template v-slot:subtitle>
          <span class="font-weight-bold">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?
        </template>
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
    import EmployeeNav from "../../components/navbar/EmployeeNav.vue"

    export default{
        components: {
            EmployeeNav,
            LogoComponent
        }
    }
</script>

<style>
    .v-list.requests{
        height:300px;/* or any height you want */
        overflow-y:auto
    }
    .doc-request {
        height: 300px;
    }
</style>