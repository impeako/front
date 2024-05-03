<template>
    <LogoComponent/>

    <!-- Profile Information-->
    <v-card
    class="mx-auto pa-5"
    max-width="600"
    hover
  >
    <v-card-item>
      <v-row justify="center">
        <v-avatar color="surface-variant" size="200" class="mt-5">
          <img :src="avatarSrc" width="300px">
        </v-avatar>
      </v-row>
      <v-btn @click="$refs.fileInput.click()" class="uploadicon mb-5" rounded>
        <v-icon>mdi-camera</v-icon>
      </v-btn>
      <input type="file" id="myfile" name="myfile" ref="fileInput" @change="handleFileUpload" style="display: none;">
      <v-card-title class="mb-5">
        {{this.profile.firstname}} {{this.profile.lastname}}
      </v-card-title>
    </v-card-item>

    <v-card-text class="text-left">
      <v-row no-gutter class="info-row">
        <v-col cols="7">
          <p class="information">Employee id :</p>
          <p class="information">Department :</p>
          <p class="information">Position :</p>
          <p class="information">Email address :</p>
          <p class="information">Birth date :</p>
          <p class="information">Phone number :</p>
        </v-col>
        <v-col cols="5">
          <p class="data">{{this.profile.id}}</p>
          <p class="data">{{this.profile.dep}}</p>
          <p class="data">{{this.profile.position}}</p>
          <p class="data">{{this.profile.email}}</p>
          <p class="data">{{this.profile.birthDate}}</p>
          <p class="data">{{this.profile.phoneNumber}}</p>      
        </v-col>
    </v-row>
    <v-btn prepend-icon="mdi-pencil" class="mt-3 mb-5" @click="passwordForm = !passwordForm">Change password</v-btn>
    <form @submit.prevent="submit" v-if="passwordForm">
      <v-text-field
        label="Old password"
        type="password"
        variant="outlined"
        v-model="oldpassword"
      ></v-text-field>
      <v-text-field
        label="New password"
        type="password"
        variant="outlined"
        v-model="newpassword"
        :rules="[rules.required, rules.min, rules.noMatch]"
      ></v-text-field>
      <v-text-field
        label="New password confirmation"
        type="password"
        variant="outlined"
        v-model="passwordconfirmation"
        :rules="[rules.required, rules.passwordMatch]"
      ></v-text-field>
      <v-row class="ma-0">
        <v-btn class="mr-5" @click="submitForm" color="primary">Save changes</v-btn>
        <v-btn @click="cancel">Cancel</v-btn>
      </v-row>
      <p class="ma-0 mt-3 success" v-if="success">Password changed successfully!</p>
    </form>
    </v-card-text>
  </v-card>
  <FooterComponent/>
  <employeeNav/>
</template>

<script>
    import LogoComponent from "../../components/LogoComponent.vue";
    import EmployeeNav from "../../components/UserNavBar.vue"
    import FooterComponent from "../../components/FooterComponent.vue";
    import axios from "axios";

    export default{
        mounted(){
            this.getProfile();
        },
        components: {
            EmployeeNav,
            LogoComponent,
            FooterComponent,
        },
        computed: {
          avatarSrc() {
            if (this.profile.avatar && this.profile.avatar.data) {
              return `data:image/jpeg;base64,${this.profile.avatar.data}`;
            } else {
              return "../../assets/avatar.jpg";
            }
          }
        },
        data() {
          return {
            profile : {},
            avatar: null,
            passwordForm: false,
            oldpassword:'',
            newpassword:'',
            passwordconfirmation:'',
            success: false,
            rules: {
              required: value => !!value || 'Required.',
              min: v => v.length >= 8 || 'Min 8 characters',
              passwordMatch: value => value === this.newpassword || (`passwords you entered don't match!`),
              noMatch: value => value !== this.oldpassword || ("New password must not match the old one!"),
            },
          }
        },
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
            updateAvatar(){
              const formData = new FormData();
              formData.append('image', this.avatar)
              formData.append('id', this.profile.id)
              axios.post('http://localhost:8081/edrms/employee/profile/avatar',formData ,{ 
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                    console.log(response.data);
                    this.getProfile();
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with fetching user information')
                });
            },
            handleFileUpload(event) {
              const file = event.target.files[0];
              if (file) {
                // Set avatar variable to uploaded image data
                this.avatar = file;

                // Call method to upload avatar
                this.updateAvatar();
              }
            },
            cancel(){
              this.oldpassword = ''
              this.newpassword = ''
              this.passwordconfirmation = ''
              this.passwordForm = false
            },
            submitForm(){
              const body = {
                  "currentPassword": this.oldpassword,
                  "newPassword": this.newpassword,
                  "confirmationPassword": this.passwordconfirmation
              }
              axios.patch('http://localhost:8081/edrms/employee/changePassword', body, {
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                })
                .then(response => {
                  this.oldpassword = ''
                  this.newpassword = ''
                  this.passwordconfirmation = ''
                  this.success = true
                })
                .catch(error => {
                    console.error(error)
                    console.log('error with changing password')
                });
            },
        }
    }
</script>

<style scoped>
  .v-card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-bottom: 50px;
  }
  .information {
    font-weight: 500;
    font-size: 17px;
    margin-bottom: 10px;
  }
  .data {
    font-weight: 300;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .success{
    color: rgba(38, 122, 34, 0.678);
    font-weight: 600;
  }
  @media screen and (max-width: 612px) {
     .v-card{
      width: 90%;
      margin-top: 15vh;
     }
     .information{
      font-size: 14px;
     }
     .data{
      font-size: 12px;
      margin-bottom: 10px;
      white-space: nowrap;
     }
     .info-row{
      margin: 0;
     }
  }
</style>