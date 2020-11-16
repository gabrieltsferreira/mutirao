<template>
    <div v-resize="OnResize">
        <v-row justify="center">
            <v-img :src="require('@/assets/mutirao.png')" 
                    :max-height="mobile ? '200' :'200'"
                    :max-width="mobile ? '320' :'500'"/>
        </v-row>
        <br />
        <v-container style="background: #1E88E5;" fill-width fluid>
            <h4><p style="color: white">Para continuar, por favor conecte-se à uma conta abaixo</p></h4>
            <v-card
                class="mx-auto mt-5"
                height="300"
                width="300"
                rounded
            >  
                <v-col class="text-center" cols="12" sm="12">
                    <v-btn 
                        dark
                        block
                        rounded
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
                        rounded
                        color="#4267B2"  
                        @click="FacebookSignIn"
                    >
                        <v-icon left>fab fa-facebook</v-icon>
                        Conectar com Facebook
                    </v-btn>
                </v-col>
            </v-card>
        </v-container>
    </div>
</template>


<script>
import firebase from '../firebase/firebaseInit';

export default {
    data: () => ({
        mobile: null
    }),

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
            var provider = new firebase.auth.FacebookAuthProvider();
            
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

        OnResize() {
            if(window.innerWidth<=530)
                this.mobile = true;
            else
                this.mobile = false;           
        },
    }
}
</script>