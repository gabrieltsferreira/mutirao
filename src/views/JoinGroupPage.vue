<template>
    <div>
        <v-card height="90" flat>
            <h2 class="mt-10">Entrar em um Grupo</h2>
        </v-card>
        <v-container style="background: #1E88E5;" fill-width fluid>
            <h4><p style="color: white">Insira uma token válida abaixo para participar de um grupo já existente</p></h4>
            <v-card
                class="mx-auto mt-5"
                height="300"
                width="300"
            >
                <v-card-text>
                    <v-text-field 
                        class="mx-5" 
                        label="Token" 
                        v-model="token" 
                        outlined>
                    </v-text-field>
                    <v-btn color="primary" @click="joinGroup">
                        Entrar
                    </v-btn>
                </v-card-text>
            
            </v-card>
        </v-container>
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
                        let newPlayer = {
                            name: this.$store.state.store.displayName,
                            email: this.$store.state.store.email,
                            photoURL: this.$store.state.store.photoURL,
                            points: 0
                        }
                        if(!doc.data().players.find(obj => obj.email==newPlayer.email)){
                            docRef.update({
                                players: firebase.firestore.FieldValue.arrayUnion(newPlayer)
                            });
                        }
                        
                        this.$router.push({name: 'MainTabs', params: {id: this.token}});
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