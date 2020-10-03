<template>
    <div>
        <h2>Mutirão</h2> 
        <br />
        <h4>Para continuar por favor conecte-se à uma conta abaixo</h4>
        <v-card
            class="mx-auto mt-10"
            height="300"
            width="300"
        >  
            <v-col class="text-center" cols="12" sm="12">
                <v-btn 
                    dark
                    block
                    color="#DB4437"  
                    @click="GoogleSignIn"
                >
                    <v-icon left>fab fa-google</v-icon>
                    Conectar com Google
                </v-btn>
                
                <v-btn 
                    class="mt-2"
                    dark
                    block
                    color="primary"  
                    @click="FacebookSignIn"
                >
                    <v-icon left>fab fa-facebook</v-icon>
                    Conectar com Facebook
                </v-btn>
            </v-col>
        </v-card>
    </div>
</template>


<script>
import firebase from '../firebase/firebaseInit';

export default {
    methods: {
        GoogleSignIn(){
            var provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    var token = result.credential.accessToken;
                    var user = result.user;

                    let obj = {
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL
                    }

                    this.$store.commit('SET_USER', obj);

                    this.$router.push('/groupOptions');
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    var credential = error.credential;
                });

        },

        FacebookSignIn(){

        }
    }
}
</script>