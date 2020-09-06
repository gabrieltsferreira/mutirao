<template>
    <div>
        <v-app-bar
            color="primary"
            dense
            dark
        >
        <v-spacer>
            <h2>Criar Um Grupo</h2>
        </v-spacer>
        </v-app-bar>
        
        <!--Card Page 1-->
        <v-card v-if="page==1">
            <v-card-title>
                Informações
            </v-card-title>
            <v-card-text>
                <v-text-field label="Nome"></v-text-field>
                <v-text-field label="Descrição"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer>
                    <v-btn @click="page=2">
                        proximo
                    </v-btn>
                </v-spacer>
            </v-card-actions>
        </v-card>

        <!--Card Page 2-->
        <v-card v-if="page==2">
            <v-card-title>
                Atividades
            </v-card-title>
            <v-card-text>
                <v-btn @click="dialog=true">
                    Adicionar Cômodo
                </v-btn>
                <v-list>
                    <v-list-group
                        v-for="item in activities"
                        :key="item.name"
                        >
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                            </v-list-item-content>
                        </template>

                        <v-list-item
                            v-for="subItem in item.activities"
                            :key="subItem.name"                           
                        >
                            <v-list-item-content>
                                <v-list-item-title v-text="subItem.name"></v-list-item-title>
                                <v-text-field v-model="activity" label="Atividade" placeholder="Ex: Lavar Louça"></v-text-field>
                                <v-text-field v-model="points" label="Pontos" placeholder="Ex: 40" type="number"></v-text-field>
                                <v-btn @click="addActivity(subItem)">Adicionar Atividade</v-btn>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </v-list>
            </v-card-text>
            <v-card-actions>
                <v-spacer>
                    <v-btn @click="page=1">
                        anterior
                    </v-btn>
                </v-spacer>
            </v-card-actions>
        </v-card>

        <!--Add Room Modal-->
        <v-dialog
            v-model="dialog"
        >
            <v-card>
                <v-card-title>
                    Adicionar Cômodo
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="room" placeholder="Ex: Cozinha"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer>
                        <v-btn @click="addRoom">
                            Adicionar
                        </v-btn>
                    </v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!--Add Activity Modal-->
    
    </div>  
</template>


<script>
export default {
    data: () => ({
        page: 1,

        dialog: false,

        activities: [],

        room: "",
        activity: "",
        points: 0

        
    }),

    methods: {
        addRoom() {
            let room = {
                name: this.room,
                activities: []
            };

            let activity = {
                name: "",
                points: null
            }
            
            room.activities.push(activity)
            this.activities.push(room)
            this.dialog=false;
        },

        addActivity(item){
            item.name = this.activity;
            item.points = this.points;
            

        }
    }
}
</script>