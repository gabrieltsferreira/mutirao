<template>
    <v-app>
        <v-col class="text-center" cols="12" sm="12">
            <v-avatar size="62">
                <img
                    :src="source"    
                >
            </v-avatar>
        </v-col>
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
    data: () => ({
        source: ""
    }),

    created(){
        this.getData();
    },

    methods: {
        getData(){
            this.source = this.$store.state.store.photoURL
        },
        
        navCreateGroup(){
            this.$router.push('/createGroup')
        },

        navJoinGroup(){
            this.$router.push('/joinGroup')
        }
    }
}
</script>