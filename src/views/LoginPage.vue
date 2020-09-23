<template>
    <v-card
        class="mx-auto"
        height="300"
        width="300"
    >  
        <v-col class="text-center" cols="12" sm="12">
            <v-btn 
                dark
                color="#DB4437"  
                @click="GoogleSignIn"
            >
                <v-icon left>fab fa-google</v-icon>
                Conectar com Google
            </v-btn>
        </v-col>
    </v-card>
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
                    //console.log(user);

                    let obj = {
                        displayName: user.displayName,
                        email: user.email
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

        }
    }
}
</script>