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
            background-color="indigo"
            center-active
            grow
            dark
        >
            <v-tab href="#configurations">
                <v-icon>miscellaneous_services</v-icon>
            </v-tab>
            <v-tab href="#stats">
                <v-icon>mdi-chart-bar</v-icon>
            </v-tab>
            <v-tab href="#leaderboards">
                <v-icon>mdi-podium</v-icon>
            </v-tab>
            <v-tab href="#activities">
               <v-icon>fa-broom</v-icon>
            </v-tab>
            <v-tab href="#achievements">
                <v-icon>mdi-trophy-variant</v-icon>
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab"> 
            <!-- Configurations -->
            <v-tab-item key="1" value="configurations">
                <v-card>
                    <v-card-title>
                        Configurações
                    </v-card-title>
                    <v-card-text>
                        <v-card>
                            <v-toolbar flat color="primary" dark>
                                <v-toolbar-title>Configurações</v-toolbar-title>
                            </v-toolbar>

                            <v-tabs vertical>                              
                                <v-tab>
                                    <v-icon left>fa-home</v-icon>
                                </v-tab>
                                <v-tab>
                                    <v-icon left>fa-broom</v-icon>
                                </v-tab>
                                <v-tab>
                                    <v-icon left>fa-users</v-icon>
                                </v-tab>
                                <v-tab>
                                    <v-icon left>fa-info</v-icon>
                                </v-tab>

                                <v-tab-item>
                                    <v-card flat>
                                        <v-card-text>
                                        
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>

                                <v-tab-item>
                                    <v-card flat>
                                        <v-card-text>
                                            
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>

                                <v-tab-item>
                                    <v-card flat>
                                        <v-card-text>
                                            
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-tab-item>

            <!-- Stats -->
            <v-tab-item key="2" value="stats">
                <v-card>
                    <v-card-title>Stats</v-card-title>
                </v-card>
            </v-tab-item>

            <!-- Leaderboards -->
            <v-tab-item key="3" value="leaderboards">
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
                                <tr v-for="(item,index) in players" :key="item.name">
                                    <td>
                                        <v-icon v-if="index==0">
                                            mdi-crown
                                        </v-icon>
                                        <v-avatar size="32">
                                            <img
                                                :src="item.photoURL"
                                            >
                                        </v-avatar>
                                        {{ item.name }}
                                    </td>
                                    <td>{{ item.points }}</td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-tab-item>

            <!-- Activities -->
            <v-tab-item key="4" value="activities">
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

            <!-- Achievements -->
            <v-tab-item key="5" value="achievements">
                <v-card>
                    <v-card-title>Conquistas</v-card-title>
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

        tab: 'leaderboards'
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

                        this.players = this.data.players.sort((a,b) => b.points - a.points);
                        this.activities = this.data.activities;
                        this.groupName = this.data.name;
                    }


                });

        },

        finishActivity(item){
            var currentPlayer = this.players.find(obj => obj.email==this.$store.state.store.email);

            currentPlayer.points += Number(item.points);

            var docRef = firebase.firestore().collection("group").doc(this.id);

            docRef.update({
                players: this.players
            });
        }
    }
    
}
</script>