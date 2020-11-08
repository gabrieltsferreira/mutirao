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
                                                <v-text-field
                                                    label="Apelido"
                                                    v-model="nick"
                                                    outlined
                                                    @blur="setNickName"
                                                >
                                                </v-text-field>
                                                <v-text-field
                                                    label="Meta de Pontos"
                                                    type="number"
                                                    v-model="goal"
                                                    outlined
                                                    @blur="setGoal"
                                                >
                                                </v-text-field>
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
                                                        v-for="(subItem, index) in item.activities"
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
                                                                            dialog.currentRoom=item,
                                                                            activityConfig=subItem.name, 
                                                                            pointsConfig=subItem.points">
                                                                    <v-icon>edit</v-icon>
                                                                </v-btn>     
                                                                <v-btn 
                                                                    icon
                                                                    @click="dialog.deleteActivity=true,
                                                                            dialog.currentActivity=index,
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
                                                            @click="copyToClipboard"
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
                    <v-card-title>Dados</v-card-title>
                    <v-card-text>
                        <h3>Últimos 7 dias</h3>             
                            <h4>Atividades por Cômodo</h4>
                            <li v-for="item in activitiesOcurrByRoom" :key="item">
                                {{item}}
                            </li>
                            <v-row>
                                <v-col>
                                    <h4>Atividade Mais Realizada</h4>
                                    {{mostOcurrActivity}}
                                </v-col>
                                <v-col>
                                    <h4>Atividade Menos Realizada</h4>
                                    {{leastOcurrActivity}}
                                </v-col>
                            </v-row>                       
                    </v-card-text>
                </v-card>
                <v-card class="mt-2">
                    <v-card-text>
                        <div style="background: #1E88E5;">
                        <h4 style="color: white">Registros</h4>
                        </div>
                        <v-virtual-scroll
                            :items="logs"
                            height="200"
                            item-height="64"
                        >
                            <template v-slot="{ item }">
                                <v-list-item :key="item.index">
                                    <v-list-item-content>
                                        <v-row align="center">
                                            <v-col cols="4">
                                                <p style="font-size:13px">{{item.date}}</p>
                                            </v-col>
                                            <v-col>
                                                <p 
                                                :style="
                                                    item.log.includes('completou') ? 'font-size:13px;color:green;'
                                                    : item.log.includes('subtraiu')
                                                        ||item.log.includes('zerou')
                                                        ? 'font-size:13px;color:orange;'
                                                    : item.log.includes('adicionou')
                                                        ||item.log.includes('editou') 
                                                        ? 'font-size:13px;color:blue;'
                                                    : item.log.includes('deletou') ? 'font-size:13px;color:red;' : 'font-size:13px;'
                                                ">              
                                                    {{item.log}}
                                                </p>
                                            </v-col>
                                        </v-row>
                                    </v-list-item-content>                                   
                                </v-list-item>
                            </template>
                        </v-virtual-scroll>
                    </v-card-text>
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
                                        {{ item.nick ? item.nick : item.name }}
                                        </v-layout>
                                    </td>
                                    <td>
                                        <v-progress-circular
                                            v-if="item.points/goal<1"
                                            :size="20"
                                            :value="item.points/goal*100"
                                            :color="item.points/goal*100<=25 ? 'red': 
                                                    item.points/goal*100>25&&item.points/goal*100<50 ? 'orange':
                                                    item.points/goal*100>=50&&item.points/goal*100<65 ? 'yellow':
                                                    item.points/goal*100>=65? 'green':''">
                                        </v-progress-circular>
                                        <v-icon v-if="item.points/goal>=1" color="green">
                                            done
                                        </v-icon>
                                        {{ item.points }}
                                    </td>
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
                                    
                                    <v-btn class="mt-2" color="#1CD833" dark depressed @click="finishActivity(subItem, item.name)">
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
                    <v-card-text>
                        <v-card color="#3FD2E9">                                                  
                            <v-row>
                                <v-col class="ml-1" cols="4">
                                    <v-chip large label color="#EFF21C">
                                        <v-icon large>fa-broom</v-icon>
                                    </v-chip>
                                </v-col>
                                <v-col>
                                    <h2><p style="color:white;text-shadow:#000 0px 0px 3px;">Limpador Nvl 1</p></h2>
                                    <h5><p style="color:white;text-shadow:#000 0px 0px 3px;">Complete 10 atividades</p></h5>
                                </v-col> 
                            </v-row>                       
                            <v-progress-linear striped height="10" color="purple" value="15"></v-progress-linear>                          
                        </v-card>
                    </v-card-text>
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

        logs: [],

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
        activityConfig:'',

        nick: '',
        goal: 0,
        previousGoal: 0,

        mostOcurrActivity: '',
        leastOcurrActivity: '',
        activitiesOcurrByRoom: []
        
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
                        this.logs = this.data.logs.reverse();
                        this.goal = this.data.goal;
                        this.previousGoal = this.data.goal;

                        var currentPlayer = this.players.find(obj => obj.email==this.$store.state.store.email);
                        this.nick = currentPlayer.nick;
                    }

                    //Remove rooms without activities
                    this.data.activities.forEach((item, index) => {
                        if(item.activities.length===0)
                            this.data.activities.splice(index, 1)
                    });

                    docRef.update({
                        activities: this.activities
                    });
                    //-----//------//------//-------//


                    //Get last 7 days stats
                        //Suport Functions
                        Date.prototype.addDays = function(days) {
                            var date = new Date(this.valueOf());
                            date.setDate(date.getDate() + days);
                            return date;
                        }

                        function mostOcurrences(arr){
                            return arr.sort((a,b) =>
                                arr.filter(v => v===a).length
                                - arr.filter(v => v===b).length
                            ).pop();
                        }

                        function leastOcurrences(arr){
                            return arr.sort((a,b) =>
                                arr.filter(v => v===b).length
                                - arr.filter(v => v===a).length
                            ).pop();
                        }

                        function countOcurrences(arr1, arr2){
                            let arr3 = [];
                            for(var i=0; i<arr1.length; i++){
                                let count = 0;
                                arr2.forEach(item => {
                                    if(item.includes(arr1[i]))
                                        count++;
                                })
                                arr3.push(arr1[i].concat('('+count+')'));                             
                            }
                            return arr3;
                        }
                        //-----//------//------//-------//

                    let last7Days = [];
                    let dateNow = new Date();
                    for(var i=0; i<7; i++){
                        last7Days.push(dateNow.addDays(-i).toLocaleDateString());
                    }
                    let statsLog = this.logs.filter(x=>x.log.includes("completou")&&last7Days.some(y=>y.includes(x.date.split(' ')[0])));
                    
                    let statsActivities = [];
                    statsLog.forEach(item => {
                        statsActivities.push(item.log.split("completou ")[1]);
                    })

                    let rooms = this.activities.map(x=>x.name);
                
                    this.mostOcurrActivity = mostOcurrences(statsActivities);
                    this.leastOcurrActivity = leastOcurrences(statsActivities);
                    this.activitiesOcurrByRoom = countOcurrences(rooms, statsActivities)
                     //-----//------//------//-------//


                    
                });

        },

        getLocalDate(){
            var date = new Date();

            var options = {
                year: "numeric",
                month: "2-digit",
                day: "numeric",
                hour: "numeric",
                minute: "numeric"
            };

            return date.toLocaleDateString("pt", options)
        },

        finishActivity(item, roomName){
            var currentPlayer = this.players.find(obj => obj.email==this.$store.state.store.email);

            currentPlayer.points += Number(item.points);

            var docRef = firebase.firestore().collection("group").doc(this.id);

            docRef.update({
                players: this.players
            });
            
            //----Log Activity----//
            let log = {
                log: currentPlayer.name + " completou " + item.name + " - " + item.points + "pts (" + roomName + ")",
                date: this.getLocalDate()
            }

            docRef.update({
                logs: firebase.firestore.FieldValue.arrayUnion(log)
            });
            //--------//---------//

            this.dialog.finishActivity = true;
        },

        subtractPoints(){
            this.players.forEach(player => player.points -= Number(this.pointsConfig))

            var docRef = firebase.firestore().collection("group").doc(this.id);

            docRef.update({
                players: this.players
            });

            //----Log Activity----//
            let log = {
                log: this.$store.state.store.displayName + " subtraiu " + this.pointsConfig + " pontos do grupo",
                date: this.getLocalDate()
            }

            docRef.update({
                logs: firebase.firestore.FieldValue.arrayUnion(log)
            });
            //--------//---------//

            this.closeDialog();
        },

        resetPoints(){
            this.players.forEach(player => player.points = Number(0))

            var docRef = firebase.firestore().collection("group").doc(this.id);

            docRef.update({
                players: this.players
            });
            
            //----Log Activity----//

            let log = {
                log: this.$store.state.store.displayName + " zerou os pontos do grupo",
                date: this.getLocalDate()
            }

            docRef.update({
                logs: firebase.firestore.FieldValue.arrayUnion(log)
            });
            //--------//---------//


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

            var docRef = firebase.firestore().collection("group").doc(this.id);

            docRef.update({
                activities: this.activities
            });

            //----Log Activity----//
            let log = {
                log: this.$store.state.store.displayName + " adicionou " + newActivity.name + " - " + newActivity.points + "pts (" + this.dialog.currentRoom.name + ")",
                date: this.getLocalDate()
            }

            docRef.update({
                logs: firebase.firestore.FieldValue.arrayUnion(log)
            });
            //--------//---------//
            

            this.closeDialog()
        },

        editActivity(){
            this.dialog.currentActivity.name = this.activityConfig
            this.dialog.currentActivity.points = this.pointsConfig

            var docRef = firebase.firestore().collection("group").doc(this.id);

            docRef.update({
                activities: this.activities
            });

            //----Log Activity----//
            let log = {
                log: this.$store.state.store.displayName + " editou " + this.dialog.currentActivity.name + " (" + this.dialog.currentRoom.name + ")",
                date: this.getLocalDate()
            }

            docRef.update({
                logs: firebase.firestore.FieldValue.arrayUnion(log)
            });
            //--------//---------//

            this.closeDialog()
        },

        deleteActivity(){
            this.dialog.currentRoom.activities.splice(this.dialog.currentActivity, 1)

            var docRef = firebase.firestore().collection("group").doc(this.id);

            docRef.update({
                activities: this.activities
            });

            //----Log Activity----//
            let log = {
                log: this.$store.state.store.displayName + " deletou " + this.activityConfig + " - " + this.pointsConfig + "pts (" + this.dialog.currentRoom.name + ")",
                date: this.getLocalDate()
            }

            docRef.update({
                logs: firebase.firestore.FieldValue.arrayUnion(log)
            });
            //--------//---------//

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
        },

        setNickName(){
            var currentPlayer = this.players.find(obj => obj.email==this.$store.state.store.email);

            if(this.nick!=currentPlayer.nick){
                currentPlayer.nick = this.nick;

                var docRef = firebase.firestore().collection("group").doc(this.id);

                docRef.update({
                    players: this.players
                });

            }
        },

        setGoal(){
            if(this.goal != this.previousGoal){
                var docRef = firebase.firestore().collection("group").doc(this.id);

                docRef.update({
                    goal: this.goal
                });
            }     

        }

        
    }
    
}
</script>