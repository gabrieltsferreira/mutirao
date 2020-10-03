<template>
    <v-app>
        <v-col class="text-center" cols="12" sm="12">
            <v-avatar size="64">
                <img
                    :src="source"    
                >
            </v-avatar>
            <h1> Olá, {{userName}}!</h1>

            <h4></h4>
        </v-col>

        <v-card
            class="mx-auto mt-10"
            height="300"
            width="300"
        >
            <v-col class="text-center" cols="12" sm="12">        
                <v-btn 
                    block 
                    color="primary" 
                    @click="navCreateGroup"
                >
                Criar um Novo Grupo
                </v-btn>

                <v-btn 
                    class="mt-2"
                    block 
                    color="primary" 
                    @click="navJoinGroup"
                >   
                Entrar em um Grupo
                </v-btn>         
           </v-col>
        </v-card>
    </v-app>
</template>



<script>
export default {
    data: () => ({
        source: "",
        userName:""
    }),

    created(){
        this.getData();
    },

    methods: {
        getData(){
            this.source = this.$store.state.store.photoURL;
            
            let name = this.$store.state.store.displayName;
            
            this.userName = name.split(' ')
                                .map(str => str.charAt(0).toUpperCase() + str.slice(1))
                                .join(' ');

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