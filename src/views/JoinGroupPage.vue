<template>
    <div>
        <v-app-bar
                color="primary"
                dense
                dark
            >
            <v-spacer>
                <h2>Entrar em um Grupo</h2>
            </v-spacer>
        </v-app-bar>

        <v-card
            class="mx-auto mt-5"
            height="300"
            width="300"
        >
            <v-card-text>
                <v-text-field 
                    class="mx-5" 
                    label="Inserir Token" 
                    v-model="token" 
                    outlined>
                </v-text-field>
                <v-btn @click="joinGroup">
                    Entrar
                </v-btn>
            </v-card-text>
        
        </v-card>
    </div>
</template>


<script>
import firebase from '../firebase/firebaseInit'

export default {
    data: () => ({
        token: ""
    }),

    methods: {
        joinGroup() {
            var docRef = firebase.firestore().collection("group").doc(this.token);

            docRef.get()
                .then(doc=>{
                    if(doc.exists){
                        console.log(doc.data())
                        this.$router.push('/leaderboard');
                    }                       
                    else
                        console.log("Não existe")

            }).catch(err=>{
                console.log(err)
            })
            
        }
    }
}
</script>