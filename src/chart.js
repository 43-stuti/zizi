import {
        Line,
        mixins
    } from 'vue-chartjs'

import _ from 'lodash';
    export default {
        extends: Line,
        mixins: [mixins.reactiveProp],
        data() {
            return {
                habitlog:[],
                letitbe: {
                    labels:[],
                    datasets:[]
                },
                allLoaded:false,
                missedlog:[],
                fb:{},
                options: { //Chart.js options
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                max:10
                            },
                            gridLines: {
                                display: true
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    legend: {
                        display: true
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },
        mounted() {
            
                this.fb = require('./firebase/index.js')
                this.fb.habitRef.once('value',(snapshot) =>{
                  let data = snapshot.val();
                  console.log('DATA',data.log)
                  let log  = data.log;
                  for (let eachlog in log) {
                    console.log('child',log[eachlog])
                    this.habitlog.push({date:log[eachlog].date,time:log[eachlog].time})
                  }
                  
                  var dategrouped = _.groupBy(this.habitlog,'date');
                  var dataArray = [];
                  var label = []
                  for(let log in dategrouped) {
                    label.push(log)
                    dataArray.push(dategrouped[log].length)
                  }
                  this.letitbe.datasets.push({
                    label: "Daily Log",
                    backgroundColor: "#ffffff",
                    data: dataArray,
                    borderWidth:4,
                    borderColor:'#9fd9e3'
                  })
                  this.letitbe.labels = label
                  this.renderChart(this.letitbe, this.options)
                })
                this.fb.habitLogRef.on('child_added',(data) => {
                  this.habitlog.push({date:data.val().date,time:data.val().time})
                })
                this.allLoaded = true
                /*this.fb.habitLogRef.once('value',(data) =>{
                  data.forEach((child) => {
                    this.habitlog.push(child)
                  })
                })
                this.fb.habitLogRef.on('child_added',(data) => {
                  this.habitlog.push({date:data.val().date,time:data.val().time})
                })*/
              
            
        }

    }