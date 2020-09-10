<template>
    <v-card>
        <v-col class="text-center" cols="12" sm="12">
            <v-btn color="primary" @click="GoogleSignIn">Conectar com Google</v-btn>
        </v-col>
    </v-card>
</template>



<script>
export default {
    methods: {
        GoogleSignIn(){
            this.$router.push('/groupOptions')
        }
    }
}
</script>