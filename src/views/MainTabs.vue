<template>
    <div>
        <v-app-bar
            color="primary"
            dense
            dark
        >
            <v-spacer>
                <h2>Leaderboards</h2>
            </v-spacer>
        </v-app-bar>

        <v-tabs
            fixed-tabs
            background-color="indigo"
            dark
        >
            <v-tab>
                <v-icon>miscellaneous_services</v-icon>
            </v-tab>
            <v-tab>
                <v-icon>trending_up</v-icon>
            </v-tab>
            <v-tab>
               <v-icon>fas fa-brush</v-icon>
            </v-tab>
        </v-tabs>

    </div>   
</template>

<script>
export default {
    data: () => ({
        token: "",

        tabs: null
    }),

    methods:{
        getData(){

        }
    }
    
}
</script>