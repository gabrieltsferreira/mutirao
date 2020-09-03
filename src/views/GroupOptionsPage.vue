<template>
    <v-app>
        <v-col class="text-center" cols="12" sm="12">
            <v-btn color="primary" @click="navCreateGroup">Criar um Grupo</v-btn>
        </v-col>
         <v-col class="text-center" cols="12" sm="12">
            <v-btn color="primary" @click="navJoinGroup">Entrar em um Grupo</v-btn>
        </v-col>
    </v-app>
</template>



<script>
export default {
    methods: {
        navCreateGroup(){
            this.$router.push('/createGroup')
        },

        navJoinGroup(){
            this.$router.push('/joinGroup')
        }
    }
}
</script>