<template>
    <LogoComponent/>
    <v-container>
        <v-row>
            <v-col cols="5">
                <div>
                    <line-chart :chart-data="data"></line-chart>
                </div>
            </v-col>
        </v-row>
    </v-container>
    <EmployeeNav/>
    <FooterComponent/>
</template>

<script>
    import LogoComponent from "../../components/LogoComponent.vue";
    import EmployeeNav from "../../components/UserNavBar.vue";
    import FooterComponent from "../../components/FooterComponent.vue";
    import { Line } from 'vue-chartjs';
    export default{
        components: {
            EmployeeNav,
            LogoComponent,
            FooterComponent,
        },
        mounted() {
            this.renderChart(this.data);
        },
        data() {
            return {
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    data: [65, 59, 80, 81, 56, 55, 40],
                }
                ]
            }
            };
        },
    }
</script>