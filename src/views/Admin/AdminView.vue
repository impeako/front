<template>
    <LogoComponent/>
        <v-container class="container">
            <v-row no-gutters>
                <v-col cols="6" class="form mr-10 pa-10">
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
                            placeholder="example@gmail.com"
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
                        variant="solo"
                        clearable
                        append-inner-icon="mdi-account-search"
                        @click:clear="resetSearch"
                        >
                        </v-text-field>
                    <v-expansion-panels variant="accordion">
                    <v-expansion-panel v-for="(user, index) in userData" :key="index">
                        <v-expansion-panel-title>
                            <v-row class="title-row">
                                <h4 class="title">Name : {{ user.firstname }} {{ user.lastname }}</h4>
                                <v-dialog
                                v-model="user.dialog"
                                max-width="400"
                                persistent
                                >
                                <template v-slot:activator="{ props: activatorProps }">
                                    <v-btn prepend-icon="mdi-delete" variant="plain" class="delete" v-bind="activatorProps"></v-btn>
                                </template>

                                <v-card
                                    text="this will delete the user permenatly."
                                    title="Delete User?"
                                >
                                    <template v-slot:actions>
                                    <v-spacer></v-spacer>

                                    <v-btn @click="user.dialog = false">
                                        no
                                    </v-btn>

                                    <v-btn @click="user.dialog = false; deleteUser(user.id)">
                                        yes
                                    </v-btn>
                                    </template>
                                </v-card>
                                </v-dialog>
                                <div class="text-right">
                                    <v-dialog
                                    v-model="user.dialog2"
                                    max-width="600"
                                    >
                                    <template v-slot:activator="{ props: activatorProps }">
                                        <v-btn
                                        class="text-none font-weight-regular"
                                        prepend-icon="mdi-pencil"
                                        variant="plain"
                                        v-bind="activatorProps"
                                        @click="initializeEdit(user)"
                                        ></v-btn>
                                    </template>

                                    <v-card
                                        prepend-icon="mdi-account"
                                        title="Edit Profile"
                                    >
                                        <v-card-text class="edit">
                                            <form @submit.prevent="submit">
                                            <v-row class="mt-10">
                                                <v-text-field
                                                v-model="edit_firstname"
                                                label="First Name"
                                                variant="outlined"
                                                hide-details
                                                required
                                                focused
                                                ></v-text-field>
                                                <v-text-field
                                                v-model="edit_lastname"
                                                label="Last Name"
                                                variant="outlined"
                                                hide-details
                                                required
                                                ></v-text-field>
                                            </v-row>
                                            <v-row>
                                                <v-text-field
                                                v-model="edit_position"
                                                label="Position"
                                                variant="outlined"
                                                hide-details
                                                required
                                                ></v-text-field>        
                                                <v-select
                                                    v-model="edit_departement"
                                                    :items="Departements"
                                                    label="Departement"
                                                    variant="outlined"
                                                    required
                                                    hide-details
                                                ></v-select>
                                            </v-row>
                                            <v-row>
                                                <v-text-field
                                                v-model="edit_date"
                                                label="Date of Birth"
                                                type="date"
                                                variant="outlined"
                                                hide-details
                                                required
                                                ></v-text-field>
                                                <v-select
                                                    v-model="edit_user_role"
                                                    :items="Roles"
                                                    label="User Role"
                                                    variant="outlined"
                                                    required
                                                    hide-details
                                                ></v-select>
                                            </v-row>
                                            <v-row>
                                                <v-text-field
                                                v-model="edit_email"
                                                label="Email Address"
                                                placeholder="example@gmail.com"
                                                variant="outlined"
                                                hide-details
                                                required
                                                ></v-text-field>
                                            </v-row>
                                            <v-row>
                                                <v-text-field
                                                v-model="edit_phone"
                                                label="Phone Number"
                                                variant="outlined"
                                                hide-details
                                                required
                                                ></v-text-field>
                                            </v-row>
                                        </form>
                                        </v-card-text>
                                        <v-divider></v-divider>

                                        <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn
                                            text="Close"
                                            variant="plain"
                                            @click="user.dialog2 = false"
                                        ></v-btn>

                                        <v-btn
                                            color="primary"
                                            text="Save"
                                            variant="tonal"
                                            @click="user.dialog2 = false; editUser(user.id)"
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
    <FooterComponent/>
</template>

<script>
    import axios from "axios";
    import LogoComponent from "../../components/LogoComponent.vue";
    import EmployeeNav from "../../components/UserNavBar.vue";
    import FooterComponent from "../../components/FooterComponent.vue";
    export default{
        name: "AdminView",
        mounted(){
            this.getUsers();
        },
        components: {
            EmployeeNav,
            LogoComponent,
            FooterComponent,
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
            id: '',
            firstname: '',
            lastname: '',
            position:'',
            departement:'',
            date: '',
            user_role:'',
            email: '',
            password: '',
            phone:'',
            edit_firstname: '',
            edit_lastname: '',
            edit_position:'',
            edit_departement:'',
            edit_date: '',
            edit_user_role:'',
            edit_email: '',
            edit_phone:'',
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
                        this.getUsers();
                        this.id = ''
                        this.firstname= ''
                        this.lastname= ''
                        this.position=''
                        this.departement=''
                        this.date=''
                        this.user_role=''
                        this.email=''
                        this.password=''
                        this.phone=''
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
                if (event && event.keyCode === 8) {
                    this.getUsers();
                }
                const searchQuery = this.searchedUser.toLowerCase();
                this.userData = this.userData.filter(user => {
                    const fullname = user.firstname + " " + user.lastname;
                    const reversed = user.lastname + " " + user.firstname;
                    return user.firstname.toLowerCase().includes(searchQuery) ||
                        user.lastname.toLowerCase().includes(searchQuery) ||
                        fullname.includes(searchQuery) ||
                        reversed.includes(searchQuery) ||
                        user.email.toLowerCase().includes(searchQuery) ||
                        user.id.includes(searchQuery); 
                });
            },
            resetSearch() {
            this.searchedUser = '';
            this.getUsers();
            },
            editUser(userid){
                const user = {
                    id: userid,
                    firstname: this.edit_firstname,
                    lastname: this.edit_lastname,
                    position: this.edit_position,
                    dep: this.edit_departement,
                    birthDate: this.edit_date,
                    role: this.edit_user_role,
                    email: this.edit_email,
                    password: this.edit_password,
                    phoneNumber: this.edit_phone
                };
                axios.post(`http://localhost:8081/edrms/admin/user-management/editUser`, user,
                {
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                    this.getUsers();
                    console.log(response.data)
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with editing user')
                });
            },
            initializeEdit(user){
                this.edit_firstname = user.firstname
                this.edit_lastname = user.lastname
                this.edit_position = user.position
                this.edit_departement = user.dep
                this.edit_date = user.birthDate
                this.edit_user_role = user.role
                this.edit_email = user.email
                this.edit_phone = user.phoneNumber
            },
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
        padding: 10px;
    }
    @media screen and (max-width: 612px) {
        .v-container{
            display: flex;
            flex-direction: column;
            max-height: 100%;
            width: 100%;
            overflow: visible;
            margin-top: 100px;
            padding-bottom: 100px;
        }
        .v-col-6 {
            flex: 100%;
            max-width: 100%;
        }
        .form {
            height: auto;
        }
        .ml-10 {
            margin-left: 0px !important;
        }
        .v-col-4 {
            flex: 100%;
            max-width: 100%;
            margin-top: 50px;
        }
        .mr-10 {
            margin-right: 0px !important;
        }
    }
    </style>