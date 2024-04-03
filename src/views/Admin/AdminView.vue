<template>
    <LogoComponent/>
        <v-container class="container">
            <v-row no-gutters>
                <v-col cols="6" class="form pa-10 mr-10">
                    <form @submit.prevent="submit">
                        <h2 class="mb-5 text-left">Register User</h2>
                        <v-row class="name mt-10">
                            <v-text-field
                            v-model="firstname"
                            label="First Name"
                            variant="outlined"
                            class="mr-5"
                            hide-details
                            required
                            focused
                            ></v-text-field>
                            <v-text-field
                            v-model="lastname"
                            label="Last Name"
                            variant="outlined"
                            hide-details
                            required
                            ></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field
                            v-model="position"
                            label="Postion"
                            variant="outlined"
                            class="mr-10"
                            hide-details
                            required
                            ></v-text-field>        
                            <v-select
                                v-model="departement"
                                :items="Departements"
                                label="Departement"
                                variant="outlined"
                                required
                                hide-details
                            ></v-select>
                        </v-row>
                        <v-row>
                            <v-text-field
                            v-model="date"
                            label="Date of Birth"
                            type="date"
                            variant="outlined"
                            class="mr-10"
                            hide-details
                            required
                            ></v-text-field>
                            <v-select
                                v-model="user_role"
                                :items="Roles"
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
                            required
                            ></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field
                            v-model="password"
                            label="Password"
                            variant="outlined"
                            hide-details
                            required
                            ></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field
                            v-model="phone"
                            label="Phone Number"
                            variant="outlined"
                            hide-details
                            required
                            ></v-text-field>
                            <v-btn
                            class="ml-10 regesiter-btn"
                            type="submit"
                            size="x-large"
                            color="#0a66c2"
                            @click="submitForm()"
                            >
                            Regesiter
                            </v-btn>
                        </v-row>
                    </form>
                </v-col>
                <v-col class="ml-10" cols="4">
                    <v-text-field 
                        v-model="searchedUser"
                        label="Search for User"
                        hide-details
                        @input="searchUser"
                        @keydown.delete="searchUser($event)"
                        class="search"
                        variant="outlined"
                        clearable
                        @clear="resetSearch()"
                        append-inner-icon="mdi-account-search"
                        >
                        </v-text-field>
                    <v-expansion-panels variant="accordion">
                    <v-expansion-panel v-for="(user, index) in userData" :key="index">
                        <v-expansion-panel-title>
                            <v-row class="title-row">
                                <h4 class="title">Name : {{ user.firstname }} {{ user.lastname }}</h4>
                                <v-dialog
                                v-model="dialog"
                                max-width="400"
                                persistent
                                >
                                <template v-slot:activator="{ props: activatorProps }">
                                    <v-btn prepend-icon="mdi-delete" variant="plain" class="delete" v-bind="activatorProps">                                   
                                    </v-btn>
                                </template>

                                <v-card
                                    text="this will delete the user permenatly."
                                    title="Delete User?"
                                >
                                    <template v-slot:actions>
                                    <v-spacer></v-spacer>

                                    <v-btn @click="dialog = false; ">
                                        no
                                    </v-btn>

                                    <v-btn @click="dialog = false; deleteUser(user.id)">
                                        yes
                                    </v-btn>
                                    </template>
                                </v-card>
                                </v-dialog>
                                <div class="text-right">
                                    <v-dialog
                                    v-model="dialog2"
                                    max-width="600"
                                    >
                                    <template v-slot:activator="{ props: activatorProps }">
                                        <v-btn
                                        class="text-none font-weight-regular"
                                        prepend-icon="mdi-pencil"
                                        variant="plain"
                                        v-bind="activatorProps"
                                        ></v-btn>
                                    </template>

                                    <v-card
                                        prepend-icon="mdi-account"
                                        title="Edit Profile"
                                    >
                                        <v-card-text>
                                        </v-card-text>
                                        <v-divider></v-divider>

                                        <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn
                                            text="Close"
                                            variant="plain"
                                            @click="dialog2 = false"
                                        ></v-btn>

                                        <v-btn
                                            color="primary"
                                            text="Save"
                                            variant="tonal"
                                            @click="dialog2 = false"
                                        ></v-btn>
                                        </v-card-actions>
                                    </v-card>
                                    </v-dialog>
                                </div>                                  
                            </v-row>
                            <v-row>
                                <p class="id ma-0">ID : {{ user.id }}</p>
                            </v-row>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text class="text-left">
                        <p class="info">Postion : {{ user.position }}</p>
                        <p class="info ">Departement : {{ user.dep }}</p>
                        <p class="info ">Role : {{ user.role }}</p>
                        <p class="info ">Email Address : {{ user.email }}</p>
                        <p class="info ">Phone Number : {{ user.phoneNumber}}</p>
                        <p class="info ">Date of Birth : {{ user.birthDate}}</p>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
        </v-container>
    <EmployeeNav/>
</template>

<script>
    import axios from "axios";
    import LogoComponent from "../../components/LogoComponent.vue";
    import EmployeeNav from "../../components/UserNavBar.vue";
    export default{
        name: "AdminView",
        mounted(){
            this.getUsers();
        },
        components: {
            EmployeeNav,
            LogoComponent
        },
        data() {
        return {
            Departements: [
                "dep1", "dep2", "dep3"
            ],
            Roles: [
                "EMPLOYEE", "ADMIN", "HR"
            ],
            dialog2: false,
            dialog: false,
            // form data
            firstname: '',
            lastname: '',
            position:'',
            departement:'',
            date: '',
            user_role:'',
            email: '',
            password: '',
            phone:'',
            // fetched data for users list
            userData: [],
            // search Bar
            searchedUser: '',
        };
        },
        methods: {
            submitForm() {
                const formData = {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    position: this.position,
                    departement: this.departement,
                    BirthDate: this.date,
                    role: this.user_role,
                    email: this.email,
                    password: this.password,
                    phoneNumber: this.phone
                };
                axios.post('http://localhost:8081/edrms/admin/user-management/register', formData,{ 
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                    })
                    .then(response => {
                    console.log(response.data);
                    // Optionally, perform any actions after successful form submission
                    })
                    .catch(error => {
                    console.error('Error:', error);
                    // Optionally, handle errors or display error messages to the user
                    });
            },
            getUsers(){
                axios.get('http://localhost:8081/edrms/admin/user-management/getAllEmployees', { 
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                    this.userData = response.data
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with fetching users')
                });
            },
            deleteUser(userId){
                axios.delete(`http://localhost:8081/edrms/admin/user-management/delete/${userId}`,
                {
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                    console.log(response.data);
                    this.userData = this.userData.filter(user => user.id !== userId);
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with deleting user')
                });
            },
            searchUser(event) {
                const searchQuery = this.searchedUser.toLowerCase();
                if (event && event.keyCode === 8) {
                    this.getUsers();
                } else {
                this.userData = this.userData.filter(user => {
                    return user.firstname.toLowerCase().includes(searchQuery) ||
                        user.lastname.toLowerCase().includes(searchQuery) ||
                        user.email.toLowerCase().includes(searchQuery);
                });
                }
            },
            resetSearch() {
            this.searchedUser = '';
            this.getUsers();
            }
        }
    };

</script>

<style scoped>
    .v-container{
        max-width: 1300px;
        max-height: 800px;
        overflow: hidden;
    }
    .form{
        border-radius: 9px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        height: 610px;
        background: white;
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
      max-height: 550px;
      overflow-y: scroll;
      scrollbar-width: none;
      margin-top: 10px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      border-radius: 9px;
      z-index: 0;
    }
    .form .v-text-field {
        margin-bottom: 20px;
    }
    .title-row{
        width: 100%;
        justify-content: start;
        margin-top: 10px;
    }
    .title {
        width: 50%;
    }
    .id{
      margin-left: 10px;
      font-size: 15px;
      font-weight: 400;
    }
    .delete {
        font-size: 20px;
        width: 2px;
        padding: 0;
        margin: 0;
        color: rgb(184, 0, 0);
    }
    .info {
        font-weight: 500;
    }
    .search{
        background: white;
    }
    .edit{
        margin: 50px;
    }
    .edit .v-text-field {
        margin-bottom: 20px;
    }
    </style>