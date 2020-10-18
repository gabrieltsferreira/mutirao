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
                <v-text-field v-model="name" label="Nome"></v-text-field>
                <v-text-field v-model="description" label="Descrição"></v-text-field>
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
                            v-for="(subItem, index) in item.activities"
                            :key="subItem.name"                           
                        >
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{subItem.name + ' - ' + subItem.points + ' pts'}}
                                    <v-btn icon @click="removeActivity(item, index)">
                                        <v-icon>delete</v-icon>
                                    </v-btn>                             
                                </v-list-item-title>                                                       
                            </v-list-item-content>
                        </v-list-item>
                        <v-row justify="center">
                                    <v-col cols="12" sm="6" md="3">
                                        <v-text-field 
                                            v-model="activity" 
                                            label="Atividade" 
                                            placeholder="Ex: Lavar Louça"
                                            outlined>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="1" sm="1" md="1">
                                        <v-text-field 
                                            v-model="points" 
                                            label="Pontos" 
                                            placeholder="Ex: 40" 
                                            type="number"
                                            outlined>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3">
                                        <v-btn 
                                            @click="addActivity(item)"
                                        >Adicionar Atividade
                                        </v-btn>
                                    </v-col>
                                </v-row>             
                    </v-list-group>
                </v-list>
            </v-card-text>
            <v-card-actions>
                <v-spacer>
                    <v-btn @click="page=1">
                        anterior
                    </v-btn>
                    <v-btn @click="createGroup">
                        Criar Grupo
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
    
    </div>  
</template>


<script>
import firebase from '../firebase/firebaseInit'

export default {
    data: () => ({
        page: 1,

        dialog: false,

        name: "",
        description: "",
        activities: [],     


        room: "",
        activity: "",
        points: 0,
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
            if(item.activities[0].name=="") {
                item.activities[0].name = this.activity;
                item.activities[0].points = this.points;
            }
            else {
                let activity = {
                    name: this.activity,
                    points: this.points
                }

                item.activities.push(activity);
            }
                
        },

        removeActivity(item, index){
            item.activities.splice(index, 1)
        },


        createGroup(){
            let player = {
                name: this.$store.state.store.displayName,
                email: this.$store.state.store.email,
                points: 0
            }

            let players = [];
            players.push(player);       

            firebase.firestore().collection('group').add({
                name: this.name,
                description: this.description,
                activities: this.activities,
                players: players,
                logs: []
            })
        }
    }
}
</script>