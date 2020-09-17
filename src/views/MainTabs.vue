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
               <v-icon>add</v-icon>
            </v-tab>
        </v-tabs>

    </div>   
</template>

<script>
import firebase from '../firebase/firebaseInit'

export default {
    props:{
        id: {
            type: String,
            required: true,
            default: ''
        }
    },

    data: () => ({
        token: "",

        tabs: null
    }),

    created(){
        this.getData();
    },

    methods:{
        getData(){
            var docRef = firebase.firestore().collection("group").doc(this.id);

            docRef.get()           
                .then(doc=> {
                    if(doc.exists){
                        console.log(doc.data())
                    }


                }).catch(err=>{

                })

        }
    }
    
}
</script>