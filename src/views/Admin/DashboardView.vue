<template>
    <LogoComponent/>
    <v-container>
        <v-row>
            <v-col cols="5" class="text-left">
                    <h2 class="pb-5">Total requests number: {{ this.requestNumber }}</h2>
                    <canvas id="RequestFrequency"></canvas>
            </v-col>
            <v-col cols="5" class="text-left">
                    <h2 class="pb-5">Average response time: {{ this.averageResponseTime }} m</h2>
                    <canvas id="responseTimeChart"></canvas>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="5">
                <h2 class="pb-5 text-left">Most requested documents:</h2>
                <canvas ref="doughnutChart"></canvas>
            </v-col>
            <v-col cols="5">
                <h2 class="pb-5 text-left">Most requested documents:</h2>
                <canvas ref="polarAreaChart"></canvas>
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
    import Chart from 'chart.js/auto';
    import axios from "axios";
    export default{
        components: {
            EmployeeNav,
            LogoComponent,
            FooterComponent,
        },
        data: () => ({
            requestNumber: 0,
            averageResponseTime: null,
            typesArray: [],
        }),
        mounted() {
            this.getRequestData();
            this.getAnswersData();
            this.fetchDataAndCreateChart();
        },
        methods: {
            // first chart
            async getRequestData() {
            try {
                const response = await axios.get('http://localhost:8081/edrms/admin/dashboard/requests', { 
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                });
                const data = response.data; 
                this.requestNumber = data.length
                const formattedData = this.requestformatData(data);
                this.createBarChart(formattedData);
                data.forEach(doc => {
                        this.typesArray.push(doc.docType);
                    });
                console.log(this.typesArray)
                this.createPolarChart();
            } catch (error) {
                console.error('Error fetching data from MongoDB:', error);
            }
            },
            requestformatData(data) {
                const monthCounts = {}; 
                data.forEach(doc => {
                    const date = new Date(doc.sendingDate);
                    const monthKey = date.toLocaleString('en-US', { month: 'long' });

                    // Increment the count for the current month
                    if (monthCounts[monthKey]) {
                    monthCounts[monthKey]++;
                    } else {
                    monthCounts[monthKey] = 1; // Initialize count for the month
                    }
                });

                // Extract months and counts from the monthCounts object
                const months = Object.keys(monthCounts);
                const requestCounts = Object.values(monthCounts);

                return { months, requestCounts };
            },
            createBarChart({ months, requestCounts }) {
                const ctx = document.getElementById('RequestFrequency').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                    labels: months,
                    datasets: [{
                        label: 'Number of Requests',
                        data: requestCounts,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                    },
                    options: {
                    scales: {
                        y: {
                        beginAtZero: true
                        }
                    }
                    }
                });
            },

            //second chart
            async getAnswersData() {
                try {
                    const response = await axios.get('http://localhost:8081/edrms/admin/dashboard/answers', { 
                    headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    } 
                });
                    const data = response.data;
                    const formattedData = this.responseformatData(data);
                    this.averageResponseTime = this.calculateAverageResponseTime(formattedData);
                    this.createLineChart(formattedData);
                } catch (error) {
                    console.error('Error fetching data from MongoDB:', error);
                }
                },
            responseformatData(data) {
                const monthResponseTimes = {};
                data.forEach(doc => {
                    const month = new Date(doc.treatmentDate).toLocaleString('en-US', { month: 'long' });
                    const responseTime = this.calculateResponseTime(doc.sendingDate, doc.treatmentDate);
                    if (!monthResponseTimes[month]) {
                    monthResponseTimes[month] = [responseTime];
                    } else {
                    monthResponseTimes[month].push(responseTime);
                    }
                });
                return monthResponseTimes;
            },
            calculateResponseTime(sendingDate, treatmentDate) {
                const sendingTime = new Date(sendingDate).getTime();
                const treatmentTime = new Date(treatmentDate).getTime();
                return (treatmentTime - sendingTime) / (1000 * 60); // Convert milliseconds to minutes
                },
                calculateAverageResponseTime(data) {
                const totalResponseTime = Object.values(data)
                    .reduce((acc, responseTimes) => acc + responseTimes.reduce((sum, time) => sum + time, 0), 0);
                const totalResponses = Object.values(data)
                    .reduce((total, responseTimes) => total + responseTimes.length, 0);
                return totalResponseTime / totalResponses;
                },
                createLineChart(data) {
                const ctx = document.getElementById('responseTimeChart').getContext('2d');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                    labels: Object.keys(data),
                    datasets: [{
                        label: 'Response Time (minutes)',
                        data: Object.values(data).map(responseTimes => {
                        const sum = responseTimes.reduce((acc, time) => acc + time, 0);
                        return sum / responseTimes.length;
                        }),
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderWidth: 1,
                        fill: true
                    }]
                    },
                    options: {
                    scales: {
                        y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Response Time (minutes)'
                        }
                        },
                        x: {
                        title: {
                            display: true,
                            text: 'Month'
                        }
                        }
                    }
                }
            });
        },

        //third chart
        async fetchDataAndCreateChart() {
            try {
                const response = await axios.get('http://localhost:8081/edrms/admin/dashboard/answers', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                }
                });
                const answers = response.data; // Assuming the data returned is an array of answers
                const treatedCounts = this.calculateTreatedCounts(answers);
                this.createDoughnutChart(treatedCounts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            },
            calculateTreatedCounts(answers) {
            let approvedCount = 0;
            let deniedCount = 0;
            answers.forEach(answer => {
                if (answer.treat === 'APPROVED') {
                approvedCount++;
                } else if (answer.treat === 'DENIED') {
                deniedCount++;
                }
            });
            return { approved: approvedCount, denied: deniedCount };
        },
        createDoughnutChart(treatedCounts) {
            const ctx = this.$refs.doughnutChart.getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                labels: ['Approved', 'Denied'],
                datasets: [{
                    label: 'Treatments',
                    data: [treatedCounts.approved, treatedCounts.denied],
                    backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                    borderWidth: 1
                }]
                },
                options: {
                responsive: true,
                aspectRatio: 1.5,
                plugins: {
                    legend: {
                    position: 'top'
                    }
                }
                }
            });
        },

        //fourth chart
        createPolarChart() {

            const data = this.countTypes(this.typesArray)
            // Extract labels and data values from the provided array
            const labels = data.map(item => item.word);
            const counts = data.map(item => item.count);
            console.log(data)

            // Create the Chart.js configuration object
            const chartData = {
            labels: labels,
            datasets: [{
                data: counts,
                backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                // Add more colors if needed
                ],
                borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                // Add more colors if needed
                ],
                borderWidth: 1
            }]
            };

            // Get the canvas element using the ref attribute
            const canvas = this.$refs.polarAreaChart;

            // Ensure canvas exists before attempting to get context
            if (canvas) {
            const ctx = canvas.getContext('2d');

            // Create the polar area chart
            new Chart(ctx, {
                type: 'polarArea',
                data: chartData,
                options: {
                    aspectRatio: 1.5,
                }
            });
            } else {
            console.error('Canvas element not found');
            }
        },
        countTypes(words) {
            const wordCounts = {};
            
            // Count occurrences of each word
            words.forEach(word => {
                wordCounts[word] = (wordCounts[word] || 0) + 1;
            });
            
            // Convert wordCounts object to an array of { word, count }
            const wordCountArray = Object.keys(wordCounts).map(word => ({ word, count: wordCounts[word] }));

            return wordCountArray;
        },
  },
}
</script>
<style scoped>
    .v-container{
        width: 1600px;
        margin-bottom: 150px;
    }
    .v-row{
        justify-content: space-between;
    }
</style>