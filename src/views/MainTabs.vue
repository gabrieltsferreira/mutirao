<template>
    <div>
        <v-app-bar
            color="#1E88E5"
            dense
            dark
        >
            <v-spacer>
                <h2>{{this.groupName}}</h2>                                       
            </v-spacer>
        </v-app-bar>

        <v-tabs
            v-model="tab"
            background-color="#1E88E5"
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
                        <v-card>
                            <v-toolbar flat color="primary" dark>
                                <v-toolbar-title>{{configTab}}</v-toolbar-title>
                            </v-toolbar>

                            <v-tabs vertical v-model="configTab">                              
                                <v-tab href="#Geral">
                                    <v-icon left>fa-home</v-icon>
                                </v-tab>
                                <v-tab href="#Atividades">
                                    <v-icon left>fa-broom</v-icon>
                                </v-tab>
                                <v-tab href="#Participantes">
                                    <v-icon left>fa-users</v-icon>
                                </v-tab>
                                <v-tab href="#Sobre">
                                    <v-icon left>fa-info</v-icon>
                                </v-tab>

                                <v-tabs-items v-model="configTab">
                                    <v-tab-item key="1" value="Geral">
                                        <v-card flat>
                                            <v-card-text>                                              
                                                <v-row justify="center">
                                                    <v-chip
                                                        class="ma-2"
                                                        color="primary"
                                                        large
                                                    >
                                                    Apelido
                                                    </v-chip>
                                                    <v-col cols="12" lg="3" md="3" sm="3">
                                                        <v-text-field
                                                        outlined
                                                        >
                                                        </v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-btn block color="primary" @click.stop="dialog.subtract=true">
                                                    Subtrair pontos
                                                </v-btn>
                                                <v-spacer/>
                                                <v-btn class="mt-1" block color="primary" @click.stop="dialog.reset=true">
                                                    Zerar pontos
                                                </v-btn>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>

                                    <v-tab-item key="2" value="Atividades">
                                        <v-card flat>
                                                <v-btn class="mt-2" color="primary" block @click.stop="dialog.addRoom=true">
                                                    Adicionar Cômodo
                                                </v-btn>  
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
                                                        v-for="(subItem) in item.activities"
                                                        :key="subItem.name"                           
                                                    >
                                                        <v-list-item-content>
                                                            <v-list-item-title>
                                                                <h5>
                                                                    {{subItem.name + ' - ' + subItem.points + ' pts'}}
                                                                </h5>
                                                                
                                                                <v-btn 
                                                                    icon 
                                                                    @click="dialog.addActivity=true, 
                                                                            dialog.editActivity=true, 
                                                                            dialog.currentActivity=subItem,
                                                                            activityConfig=subItem.name, 
                                                                            pointsConfig=subItem.points">
                                                                    <v-icon>edit</v-icon>
                                                                </v-btn>     
                                                                <v-btn 
                                                                    icon
                                                                    @click="dialog.deleteActivity=true,
                                                                            dialog.currentActivity=subItem,
                                                                            dialog.currentRoom=item,
                                                                            activityConfig=subItem.name,
                                                                            pointsConfig=subItem.points">
                                                                    <v-icon>delete</v-icon>
                                                                </v-btn>     

                                                                <v-divider />                   
                                                            </v-list-item-title>                                                       
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <v-btn 
                                                        color="primary"
                                                        @click.stop="dialog.addActivity=true, dialog.currentRoom=item"
                                                    >Adicionar Atividade
                                                    </v-btn>

                                                    </v-list-group>
                                                </v-list>
                                                <v-divider />
                                                <v-btn 
                                                    class="mb-3"
                                                    color="primary"
                                                    @click="addActivity(item)"
                                                    >Salvar Alterações
                                                </v-btn>
                                        </v-card>
                                    </v-tab-item>

                                    <v-tab-item key="3" value="Participantes">
                                        <v-card flat>
                                            <v-card-text>
                                                <h2>Convide um novo participante utilizando a token a seguir</h2>
                                                <v-row justify="center">
                                                    <v-col cols="12" lg="3" md="3" sm="3">
                                                        <v-text-field
                                                            class="mt-5"
                                                            :value="this.id"
                                                            readonly
                                                            outlined
                                                            append-icon="fa-clipboard"
                                                            @focus="copyToClipboard"
                                                        >
                                                        </v-text-field>
                                                    </v-col>
                                                </v-row>                                        
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>

                                    <v-tab-item key="4" value="Sobre">
                                        <v-card flat>
                                            <v-card-text>
                                                Sobre
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs-items>
                            </v-tabs>
                        </v-card>

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
                                <th class="text-center"></th>
                                <th class="text-left">Nome</th>
                                <th class="text-center">Pontos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in players" :key="item.name">
                                    <td>
                                        <v-icon v-if="index==0 && item.points>0">
                                            mdi-crown
                                        </v-icon>
                                    </td>
                                    <td>
                                        <v-layout align-center>                                       
                                        <v-avatar class="mr-2" size="32">
                                            <img
                                                :src="item.photoURL"
                                            >
                                        </v-avatar>
                                        {{ item.name }}
                                        </v-layout>
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
                            <v-list-item-content style="background: #CEF8F9;">
                                <v-list-item-title>
                                    <h4>{{subItem.name + ' - ' + subItem.points + ' pts'}}</h4>
                                    
                                    <v-btn class="mt-2" color="#1CD833" dark @click="finishActivity(subItem)">
                                        Concluir
                                    </v-btn> 
                                    <v-divider class="mt-5 mx-5" />                            
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


        <!---------------Dialogs-------------------------------------------------------------->

        <!----Finish Activity---->
        <v-dialog v-model="dialog.finishActivity">
            <v-card>
                <v-card-title>
                    <h4>Parabens!</h4>
                </v-card-title>
                <v-card-text>
                    <v-btn @click="closeDialog" color="primary" dark depressed>
                        <v-icon>check</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!----Subtract Points---->
        <v-dialog v-model="dialog.subtract">
            <v-card>
                <v-card-title>
                    Subtrair Pontos
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="pointsConfig" type="number" suffix="pontos" outlined>

                    </v-text-field>
                    <v-btn @click="closeDialog" color="red" outlined>
                        <v-icon color="red">close</v-icon>
                    </v-btn>
                    <v-btn @click="subtractPoints" color="primary" dark depressed>
                        <v-icon>check</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!----Reset Points---->
        <v-dialog v-model="dialog.reset">
            <v-card>
                <v-card-title>
                    <h4>Zerar Pontos de Todos os Participantes?</h4>
                </v-card-title>
                <v-card-text>
                    
                    <v-btn @click="closeDialog" color="red" outlined>
                        <v-icon color="red">close</v-icon>
                    </v-btn>
                    <v-btn @click="resetPoints" color="primary" dark depressed>
                        <v-icon>check</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!----Add Room---->
        <v-dialog v-model="dialog.addRoom">
            <v-card>
                <v-card-title>
                    Adicionar Cômodo
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="roomConfig" label="Nome" outlined>

                    </v-text-field>
                    <v-btn @click="closeDialog" color="red" outlined>
                        <v-icon color="red">close</v-icon>
                    </v-btn>
                    <v-btn @click="addRoom" color="primary" dark depressed>
                        <v-icon>check</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!----Add/Edit Activity---->
        <v-dialog v-model="dialog.addActivity">
            <v-card>
                <v-card-title>
                    {{dialog.editActivity ? 'Editar Atividade' : 'Adicionar Atividade' }} 
                </v-card-title>
                <v-card-text>
                    <v-text-field 
                        v-model="activityConfig" 
                        label="Nome" 
                        outlined>
                    </v-text-field>

                    <v-text-field v-model="pointsConfig" type="number" label="Pontos" outlined>

                    </v-text-field>
                    <v-btn @click="closeDialog" color="red" outlined>
                        <v-icon color="red">close</v-icon>
                    </v-btn>
                    <v-btn @click="dialog.editActivity ? editActivity() : addActivity()" color="primary" dark depressed>
                        <v-icon>check</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!----Delete Activity---->
        <v-dialog v-model="dialog.deleteActivity">
            <v-card>
                <v-card-title>
                    Remover Atividade? 
                </v-card-title>
                <v-card-text>
                    <br />
                    <h3>{{activityConfig + " - " + pointsConfig + "pontos" }}</h3>
                    <br/>

                    <v-btn @click="closeDialog" color="red" outlined>
                        <v-icon color="red">close</v-icon>
                    </v-btn>
                    <v-btn @click="deleteActivity" color="primary" dark depressed>
                        <v-icon>check</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>

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

        tab: 'leaderboards',

        configTab: null,

        dialog: {
            finishActivity: false,
            subtract: false,
            reset: false,
            addRoom: false,
            addActivity: false,
            editActivity: false,
            deleteActivity: false,

            currentRoom: null,
            currentActivity: null
        },

        pointsConfig: 0,

        roomConfig: '',
        activityConfig:''
        
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

            this.dialog.finishActivity = true;
        },

        subtractPoints(){
            this.players.forEach(player => player.points -= Number(this.pointsConfig))

            var docRef = firebase.firestore().collection("group").doc(this.id);

            docRef.update({
                players: this.players
            });

            this.closeDialog();
        },

        resetPoints(){
            this.players.forEach(player => player.points = Number(0))

            var docRef = firebase.firestore().collection("group").doc(this.id);

            docRef.update({
                players: this.players
            });

            this.closeDialog();
        },

        addRoom(){
            let newRoom = {
                activities: [],
                name: this.roomConfig
            }

            this.activities.push(newRoom)

            this.closeDialog()
        },

        addActivity(){
            let newActivity = {
                name: this.activityConfig,
                points: this.pointsConfig
            }

            this.dialog.currentRoom.activities.push(newActivity)

            this.closeDialog()
        },

        editActivity(){
            this.dialog.currentActivity.name = this.activityConfig
            this.dialog.currentActivity.points = this.pointsConfig

            this.closeDialog()
        },

        deleteActivity(){
            this.dialog.currentRoom.activities.splice(this.dialog.currentActivity, 1)

            this.closeDialog()
        },

        closeDialog(){
            let dialogs = this.dialog;
            Object.keys(dialogs).forEach(v => dialogs[v] = false);
            
            this.pointsConfig = 0;
            this.roomConfig = '',
            this.activityConfig = ''
        },

        copyToClipboard(){
            var copy = document.createElement('textarea');
            document.body.appendChild(copy);
            copy.value = this.id;
            copy.select();
            document.execCommand('copy');
            document.body.removeChild(copy);
            
            alert('Token copiada!');
        }
    }
    
}
</script>