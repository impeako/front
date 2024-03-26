<template>
    <LogoComponent/>
    <h1>Dashboard</h1>
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