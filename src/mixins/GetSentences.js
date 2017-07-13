// import Router from 'vue-router';
// import Vue from 'vue';
// import axios from 'axios';
// import VueAxios from 'vue-axios';
// import VueTruncate from 'vue-truncate-filter';
//
// export default {
//   mounted(){
//     if (this.$cookies.get('user')){
//       this.start()
//     }
//   },
//   methods: {
//     start(){
//       let self = this;
//       let data = {
//         u: this.$cookies.get('user'),
//         t: "readComp",
//         l: 0,
//         g: 0,
//         sl: "false",
//         av: "true"
//       }
//       axios({
//         method: 'post',
//         url: 'http://www.hanyu.co/ajax/getExercise.aspx',
//         data,
//         headers: {
//           'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
//         }
//       }).then(function(response){
//         self.res = response.data;
//         console.log(response.data);
//         let chosenSentence;
//         while(!chosenSentence){
//           let random = Math.floor(Math.random() * response.data.length)
//           if(response.data[random].wbw.length > 1) {
//             chosenSentence = response.data[random]
//           }
//         }
//         console.log('chosen sentence is', chosenSentence);
//         self.chinese = chosenSentence.chinese;
//         self.english = chosenSentence.english;
//         self.pinyin = chosenSentence.pinyin;
//         self.audio = chosenSentence.audio;
//         self.wbw = chosenSentence.wbw;
//         self.wbw.map(function(i){
//           self.wbwState.push('')
//         })
//
//         let shuffled = self.wbw.slice(), i, j, k;
//         for (i = shuffled.length; i; i--) {
//           j = Math.floor(Math.random() * i);
//           k = shuffled[i - 1];
//           shuffled[i - 1] = shuffled[j];
//           shuffled[j] = k;
//         }
//         self.shuffled = shuffled;
//       })
//     }
//   }
// }
