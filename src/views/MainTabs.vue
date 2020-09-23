<template>
    <div>
        <v-app-bar
            color="primary"
            dense
            dark
        >
            <v-spacer>
                <h2>{{this.groupName}}</h2>                                       
            </v-spacer>
        </v-app-bar>

        <v-tabs
            v-model="tab"
            fixed-tabs
            background-color="indigo"
            dark
        >
            <v-tab href="#configurations">
                <v-icon>miscellaneous_services</v-icon>
            </v-tab>
            <v-tab href="#leaderboards">
                <v-icon>trending_up</v-icon>
            </v-tab>
            <v-tab href="#activities">
               <v-icon>add</v-icon>
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab"> 
            <!-- Configurations -->
            <v-tab-item key="1" value="configurations">
                <v-card>
                    <v-card-title>Configurações</v-card-title>
                </v-card>
            </v-tab-item>

            <!-- Leaderboards -->
            <v-tab-item key="2" value="leaderboards">
                <v-card>
                    <v-card-title>Classificação</v-card-title>
                    <v-card-text>
                        <v-simple-table>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                <th class="text-center">Nome</th>
                                <th class="text-center">Pontos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in players" :key="item.name">
                                <td>{{ item.name }}</td>
                                <td>{{ item.points }}</td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-tab-item>

            <!-- Activities -->
            <v-tab-item key="3" value="activities">
                <v-card>
                    <v-card-title>Atividades</v-card-title>
                    <v-list>
                        <v-list-group
                            v-for="item in activities"
                            :key="item.name"
                        >
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.name"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item-content>
                        </template>
                        <v-list-item
                            v-for="subItem in item.activities"
                            :key="subItem.name"                           
                        >
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{subItem.name + ' - ' + subItem.points + ' pts'}}
                                    
                                    <v-btn @click="finishActivity(subItem)">
                                        Concluir
                                    </v-btn>                             
                                </v-list-item-title>                                                       
                            </v-list-item-content>
                        </v-list-item>

                        </v-list-group>
                    </v-list>
                </v-card>
            </v-tab-item>

        </v-tabs-items>

    </div>   
</template>

<script>
import firebase from '../firebase/firebaseInit'

export default {
    props:{
        id: {
            type: String,
            required: true,
            default: ''
        }
    },

    data: () => ({
        data: [],

        players: [],

        activities: [],

        groupName: "",

        tab: null
    }),

    created(){
        this.getData();
    },

    methods:{
        getData(){
            var docRef = firebase.firestore().collection("group").doc(this.id);

            docRef.onSnapshot(doc=> {
                    if(doc.exists){
                        this.data = doc.data()

                        this.players = this.data.players;
                        this.activities = this.data.activities;
                        this.groupName = this.data.name;
                    }


                });

        },

        finishActivity(item){
            var currentPlayer = this.players.find(obj => obj.email==this.$store.state.store.email);

            currentPlayer.points += item.points;


            var docRef = firebase.firestore().collection("group").doc(this.id);

            docRef.update({
                players: this.players
            });
        }
    }
    
}
</script>