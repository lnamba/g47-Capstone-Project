<template lang="html">
  <div class="grid-container" id="read-comp-1">
    <div class="row" id="heading">
      <h1>Exercises</h1>
      <h1 class="chinese">{{ chinese }}</h1>
    </div>
    <div class="row">
      <div id="spaces" class="medium-8 columns">
          <div class="space" v-for="(word, index) in wbwState" v-on:click="removeTile(word, index)">
            <div v-show="wbwState[index]" v-bind:style="{ margin:`${8}px ${8}px 0 ${8}px`, color: '#000' }">{{ word.pinyin }}</div>
            <div v-show="wbwState[index]" v-bind:style="{ margin:`0 ${8}px ${8}px ${8}px`, color: '#239D1F' }"><b>{{ word.english }}</b></div>
          </div>
      </div>
      <div id="tiles">
        <button class="tile" v-for="(word, index) in shuffled" v-on:click="clickWord(word, index)" v-bind:title="word.english">
          <div class="pinyin">{{ word.pinyin }}</div>
          <div class="eng">{{ word.english }}</div>
        </button>
      </div>
    </div>
    <div class="row" v-show="roundClear">
      <div class="message">
        <h1 id="cheer">{{ english }}</h1>
      </div>
      <button class="button success large" v-on:click="next">Next Sentence</button>
    </div>
    <div class="row" v-show="!match(wbw, wbwState) && !wbwState.includes('')">
      <div class="message">
        <h1 id="encourage">Keep Trying!</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Router from 'vue-router';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueTruncate from 'vue-truncate-filter';

export default {
  data(){
    return {
      res: '',
      guid: this.$route.params.guid,
      chinese: '',
      english: '',
      pinyin: '',
      wbw: [],
      wbwState: [],
      unshuffled: [],
      shuffled: [],
      currentIndex: 0,
      roundClear: false,
      clickedWord: {},
      roundOver: false,
    }
  },
  mounted(){
    if (this.$cookies.get('user')){
      this.start()
    }
  },
  methods: {
    start() {
      let self = this;
      let data = {
        u: this.$cookies.get('user'),
        t: "readComp",
        l: 0,
        g: 0,
        sl: "false",
        av: "true"
      }
      axios({
        method: 'post',
        url: 'http://www.hanyu.co/ajax/getExercise.aspx',
        data,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
      }).then(function(response){
        self.res = response.data;
        let random = Math.floor(Math.random() * response.data.length)
        let chosenSentence = response.data[random]
        console.log('chosen sentence is', chosenSentence);
        self.chinese = chosenSentence.chinese;
        self.english = chosenSentence.english;
        self.wbw = chosenSentence.wbw;
        self.wbw.map(function(i){
          self.wbwState.push('')
        })

        let shuffled = self.wbw.slice(), i, j, k;
        for (i = shuffled.length; i; i--) {
          j = Math.floor(Math.random() * i);
          k = shuffled[i - 1];
          shuffled[i - 1] = shuffled[j];
          shuffled[j] = k;
        }
        self.shuffled = shuffled;
      })
    },
    clickWord(word, index){
      let empty = this.wbwState.find(function(i){
        return i === ''
      });
      this.currentIndex = this.wbwState.indexOf(empty);
      this.clickedWord = word;
      this.wbwState[this.currentIndex] = this.clickedWord;
      if (this.wbwState[this.currentIndex] === this.wbw[this.currentIndex].chinese) {
        console.log('matches');
      }
      let self = this;
      this.shuffled.map(function(i, index){
        if (i === word) {
          self.shuffled.splice(index, 1)
        }
      })
      this.currentIndex++;

      //check if the wbwState and wbw matches
      if (this.match(this.wbw, this.wbwState)){
        this.roundClear = true;
      } else {
        console.log('no match');
      }
    },
    match(arr1, arr2){
      if (arr1.length !== arr2.length) {
        return false;
      }
      for(let i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i]){
          return false;
        }
      }
      return true;
    },
    removeTile(word, index){
      this.shuffled.push(word);
      this.wbwState.splice(index, 1, '');
      this.currentIndex = index;
    },
    next(){
      this.guid = this.$route.params.guid;
      this.chinese = '';
      this.english = '';
      this.pinyin = '';
      this.wbw = [];
      this.wbwState = [];
      this.unshuffled = [];
      this.shuffled = [];
      this.currentIndex = 0;
      this.roundClear = false;
      this.clickedWord = {};
      this.start()
    }
  },
  filters: {
    truncate: function(value) {
      let length = 50;
      if (value.length <= length) {
        return value;
      } else {
        return value.substring(0, length) + '...';
      }
    }
  }
}

</script>

<style lang="css">
  #read-comp-1 {
    height: 100vh;
  }

  #heading h1:first-child {
    margin-top: 20px;

  }

  #heading h1:last-child {
    text-align: center;
    margin-top: 40px;
  }

  .chinese {
    font-family: 'Yuanti SC';
    font-weight: 100;
  }

  #spaces {
    display: block;
    margin: 100px auto 80px auto;
    text-align: center;
  }

  .space {
    display: inline-block;
    width: 20%;
    height: 5%;
    border: 2px solid #000;
    margin: 40px 20px;
    font-family: "Tahoma", "Raleway", "Helvetica Neue", sans-serif;
    color: #55CC99;
    cursor: pointer;
    border-radius: 15px;
    background-color: #DDD;
  }

  .space div:first-child {
    font-size: 1.5em;
  }

  .space div:last-child {
    font-size: 1em;
  }

  #spaces > span {
    font-size: 3em;
    margin: 0;
    display: inline-block;
    height: 50px;
  }

  #tiles {
    text-align: center;
    margin-bottom: 50px;
  }

  .tile {
    line-height: 1.5;
    border: 2px solid #000;
    margin: 30px 20px;
    padding: 8px;
    font-family: "Tahoma", "Raleway", "Helvetica Neue", sans-serif;
    border-radius: 15px;
    background-color: #DDD;
    cursor: pointer;
    width: 20%;
  }

  .pinyin {
    color: #000;
    font-size: 1.5em;
  }

  .eng {
    color: #C10E40;
    font-size: 1em;
  }

  #cheer, #encourage {
    text-align: center;
    margin: 50px auto;
  }

  button.success {
    margin: 100px auto;
    display: block;
  }


</style>
