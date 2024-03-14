<template>
    <v-container class="answers">
    <v-row no-gutters>
      <v-col v-for="n in 3" :key="n" cols="12" sm="4">
        <v-sheet class="ma-2 pa-2">
            <v-card class="mx-auto" max-width="425">
            <v-list lines="two">
            <v-list-subheader>Today</v-list-subheader>

                <v-list-item title="response 1">
                    <template v-slot:subtitle>
                    <p>the response</p>
                    </template>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item title="response 2">
                    <template v-slot:subtitle>
                    <p>the response</p>
                    </template>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item title="response 3">
                    <template v-slot:subtitle>
                    <p>the response</p>
                    </template>
                </v-list-item>
            </v-list>
            </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
    <EmployeeNav />
</template>

<script>
    import EmployeeNav from "../../components/navbar/EmployeeNav.vue"

    export default{
        components: {
            EmployeeNav
        }
    }
</script>

<style>
    .answers {
        text-align: left;
    }
    v-divider {
        float: left;
    }
</style>