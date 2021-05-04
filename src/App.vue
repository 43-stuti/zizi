<template>
  <v-app>
    <v-container class="main">
       <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
      <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="error"
            dark
            medium
            v-bind="attrs"
            v-on="on"
          >
            Add Habit
          </v-btn>
        </template>
        <v-card>
          <v-toolbar
            dark
            color="error"
          >
            <v-btn
              icon
              dark
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Add new habit</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                dark
                text
                @click="dialog = false"
              >
                Save Habit
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-container>
            <v-card
              class="pa-3 mt-12"
              tile
              outlined>
              <h4> Which habit would you like to be held accountable for? </h4>
              <v-row>
                <v-col
                :cols = 12>
                  <v-text-field
                    v-model="habit"
                    hint="eg: Drink water"
                    persistent-hint
                  ></v-text-field>
                </v-col>
              </v-row>
          </v-card>
          <v-card
              class="pa-3 mt-12"
              tile
              outlined>
              <h4> How often would you like to be reminded of it </h4>
              <v-row class="ml-2 mt-6 mb-n8">
                Every
              </v-row>
              <v-row>
                <v-col :cols = 6>
                  <v-text-field
                    v-model="habit"
                    hint="eg: 15"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col :cols = 6>
                   <v-select
                    v-model="periodUnit"
                    :items="periodUnits"
                    hint="eg: Minute"
                    persistent-hint
                  ></v-select>
                </v-col>
              </v-row>
          </v-card>
          </v-container>
        </v-card>
        
    </v-dialog>
    <v-row class="mt-12 ml-1 mb-8">
      <v-row>
        <h2 class="ml-1"> Currently tracking : {{nowtracking}}</h2>
      </v-row>
       <v-row class="ml-1">
        <h5> Daily Target : 10</h5>
      </v-row>
    </v-row>
    <v-row>
      <Chart></Chart>
    </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Chart from "./chart.js"
export default {
  name: 'App',
  data () {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      periodUnits: ['Minute', 'Day', 'Hour'],
      habit:'',
      period:'',
      periodUnit:'',
      nowtracking: null,
      habitlog:[],
      chartData: {
        labels:[],
        datasets:[]
      },
      allLoaded:false,
      missedlog:[],
      fb:{}
    }
  },
  components: {
    Chart
  },
  mounted() {
     this.fb = require('./firebase/index.js')
     this.fb.habitRef.once('value',(snapshot) =>{
      let data = snapshot.val();
      console.log('DATA',data.name)
      this.nowtracking  = data.name;
     })
  }
};
</script>

<style scoped>
.main {
}
</style>