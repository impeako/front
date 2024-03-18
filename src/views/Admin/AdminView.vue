<template>
    <LogoComponent/>
        <v-container class="container">
            <v-row no-gutters>
                <v-col cols="6" class="form pa-10 mr-10">
                    <form @submit.prevent="submit">
                        <h2 class="mb-5">User regestration</h2>
                        <v-row class="name mt-10">
                            <v-text-field
                            v-model="firstname"
                            label="First Name"
                            variant="outlined"
                            class="mr-5"
                            hide-details
                            ></v-text-field>
                            <v-text-field
                            v-model="firstname"
                            label="Last Name"
                            variant="outlined"
                            hide-details
                            ></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field
                            v-model="position"
                            label="Postion"
                            variant="outlined"
                            class="mr-10"
                            hide-details
                            ></v-text-field>        
                            <v-select
                                v-model="select"
                                label="Departement"
                                variant="outlined"
                                required
                                hide-details
                            ></v-select>
                        </v-row>
                        <v-row>
                            <v-text-field
                            v-model="date"
                            label="Date of Birth (DD-MM-YY)"
                            variant="outlined"
                            class="mr-10"
                            hide-details
                            ></v-text-field>
                            <v-select
                                v-model="user_role"
                                label="User Role"
                                variant="outlined"
                                required
                                hide-details
                            ></v-select>
                        </v-row>
                        <v-row>
                            <v-text-field
                            v-model="email"
                            label="Email Address"
                            variant="outlined"
                            hide-details
                            ></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field
                            v-model="phone"
                            label="Phone Number"
                            variant="outlined"
                            hide-details
                            ></v-text-field>
                            <v-btn
                            class="ml-10 regesiter-btn"
                            type="submit"
                            size="x-large"
                            color="#0a66c2"
                            >
                            Regesiter
                            </v-btn>
                        </v-row>
                    </form>
                </v-col>
                <v-col class="ml-10">
                    <v-expansion-panels variant="accordion">
                        <v-text-field 
                        v-model="user"
                        label="Search for User"
                        hide-details
                        >
                        </v-text-field>
                    <v-expansion-panel
                        v-for="i in 3"
                        :key="i">
                        <v-expansion-panel-title>
                        <v-row>
                            <v-col>
                                <h4 class="title">Name: {{ datafirstname }} {{ datalastname }}</h4>
                                <p class="id">ID: {{ dataid }}</p>
                            </v-col>
                            <v-col>
                                <v-btn prepend-icon="mdi-delete" variant="plain" class="delete">                                   
                                </v-btn>
                            </v-col>
                        </v-row>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text class="text-left">
                        <p class="info">Postion : {{ dataposition }}</p>
                        <p class="info ">Departemen t: {{ datadepartement }}</p>
                        <p class="info ">Role : {{ datarole }}</p>
                        <p class="info ">Email Address : {{ dataemail }}</p>
                        <p class="info ">Phone Number : {{ datanumber}}</p>
                        <p class="info ">Date of Birth : {{ datadate }}</p>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
        </v-container>
    <EmployeeNav/>
</template>

<script>
    import LogoComponent from "../../components/LogoComponent.vue";
    import EmployeeNav from "../../components/navbar/EmployeeNav.vue";
    export default{
        components: {
            EmployeeNav,
            LogoComponent
        }
    }

</script>

<style scoped>
    .v-container{
        max-width: 1200px;
        max-height: 700px;
        overflow: hidden;
    }
    .form{
        border-radius: 9px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        height: 500px;
    }
    .regesiter-btn {
        font-size: 10px;
    }
    .v-expansion-panel-title{
      display: flexbox;
      flex-direction: column;
      align-items: start;
    }
    .v-expansion-panels {
      max-height: 700px;
      overflow-y: scroll;
      scrollbar-width: none;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      border-radius: 9px;
      z-index: 0;
    }
    .form .v-text-field {
        margin-bottom: 20px;
    }
    .title {
      margin: 10px;
    }
    .id{
      margin-left: 10px;
      font-size: 15px;
      font-weight: 400;
    }
    .delete {
        float: rigth;
        font-size: 20px;
        color: rgb(121, 11, 11);
    }
    </style>