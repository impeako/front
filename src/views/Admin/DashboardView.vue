<template>
    <LogoComponent/>
    <v-container>
        <v-row>
            <v-col cols="5">
                <h1>dashboard</h1>
            </v-col>
        </v-row>
    </v-container>
    <EmployeeNav/>
</template>

<script>
    import LogoComponent from "../../components/LogoComponent.vue";
    import EmployeeNav from "../../components/UserNavBar.vue";
    export default{
        components: {
            EmployeeNav,
            LogoComponent
        }
    }
</script>