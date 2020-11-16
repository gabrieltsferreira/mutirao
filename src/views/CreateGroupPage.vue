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
                <v-text-field v-model="name" label="Nome" outlined></v-text-field>
                <v-text-field v-model="description" label="Descrição" outlined></v-text-field>
            </v-card-text>
        </v-card>
        <v-card flat v-if="page==1" class="mt-5">
            <v-card-actions>
                <v-spacer>
                    <v-btn @click="page=2" color="primary">
                        <v-icon>fa-arrow-right</v-icon>
                    </v-btn>
                </v-spacer>
            </v-card-actions>
        </v-card>

        <!--Card Page 2-->
            <v-card v-if="page==2">
                <v-btn class="mx-auto mt-2" color="primary" block @click.stop="dialog.addRoom=true">
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
                        class="mt-2"
                        color="primary"
                        @click.stop="dialog.addActivity=true, dialog.currentRoom=item"
                    >Adicionar Atividade
                    </v-btn>

                    </v-list-group>
                </v-list>             
            </v-card>
            <v-card flat v-if="page==2" class="mt-5">
                    <v-btn @click="page=1" color="primary">
                        <v-icon>fa-arrow-left</v-icon>
                    </v-btn>
                    <v-btn @click="createGroup" color="primary">
                        Criar Grupo
                    </v-btn>
            </v-card>

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
    data: () => ({
        page: 1,

        name: "",
        description: "",
        activities: [],   
        
        dialog: {
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
    }),

    methods: {
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
            if(this.dialog.currentRoom.activities.length<1)
                this.activities.splice(this.dialog.currentRoom, 1);
            this.closeDialog()
        },

        closeDialog(){
            let dialogs = this.dialog;
            Object.keys(dialogs).forEach(v => dialogs[v] = false);
            
            this.pointsConfig = 0;
            this.roomConfig = '',
            this.activityConfig = ''
        },

        createGroup(){
            let player = {
                nick:'',
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
                logs: [],
                goal: 0
            }).then(docRef=>{
                this.$router.push({name: 'MainTabs', params: {id: docRef.id}});
            }).catch(err)
        }
    }
}
</script>