<template lang="html">
  <div class="grid-container" id="read-comp">
    <div class="row" id="heading">
      <h1>Exercises</h1>
      <h1>{{ chinese }}</h1>
    </div>
    <div class="row">
      <div id="spaces" class="medium-8 columns">
          <div class="space" v-for="(word, index) in wbw">
            <div v-show="wbwState[index]" v-bind:style="{ margin:`${8}px ${8}px 0 ${8}px`, color: '#000' }">{{ word.pinyin }}</div>
            <div v-show="wbwState[index]" v-bind:style="{ margin:`0 ${8}px ${8}px ${8}px`, color: '#C10E40' }">{{ word.english }}</div>
          </div>
      </div>
      <div id="tiles">
        <button class="tile" v-for="(word, index) in shuffled" v-on:click="clickWord(word, index)">
          <div class="pinyin">{{ word.pinyin }}</div>
          <div class="eng">{{ word.english }}</div>
        </button>
      </div>
    </div>
    <div class="row" v-show="roundClear">
      <div class="message">
        <h1 id="cheer">Nice Job!</h1>
      </div>
      <button class="button success large" v-on:click="next">Next Sentence</button>
    </div>
  </div>
</template>

<script>
import Router from 'vue-router';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

export default {
  data(){
    return {
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
    }
  },
  mounted(){
    this.start()
  },
  methods: {
    start() {
      let self = this;

      let data = {
        u: this.$route.params.guid,
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
        let random = Math.floor(Math.random() * response.data.length)
        let chosenSentence = response.data[random]
        console.log(chosenSentence);
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
      this.clickedWord = word;
      if (this.wbw.indexOf(this.clickedWord) === this.currentIndex){
        this.wbwState[this.currentIndex] = this.clickedWord.chinese;
        let self = this;
        this.shuffled.map(function(i, index){
          if (i === word) {
            console.log("we're removing", i);
            self.shuffled.splice(index, 1)
            console.log('updated shuffled', self.shuffled);
            console.log(self.wbwState);
          }
        })
        this.$forceUpdate();
        this.currentIndex++;
      }
      if (!this.wbwState.includes('')) {
        this.roundClear = true;
      }
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
  }
}

</script>

<style lang="css">
  #read-comp {
    height: 100vh;
  }

  #heading h1:first-child {
    margin-top: 20px;
  }

  #heading h1:last-child {
    text-align: center;
  }

  #spaces {
    display: block;
    margin: 100px auto;
    text-align: center;
  }

  .space {
    display: inline-block;
    width: 20%;
    height: 5%;
    border: 2px solid #000;
    margin: 30px 20px;
    font-family: "Raleway", "Helvetica Neue", sans-serif;
    font-size: 2em;
    color: #55CC99;
    cursor: pointer;
    border-radius: 15px;
    background-color: #DDD;
  }

  .pinyin {
    color: #000;
  }

  .eng {
    color: #C10E40;
  }

  #spaces > span {
    font-size: 3em;
    margin: 0;
    display: inline-block;
    height: 50px;
  }

  #tiles {
    text-align: center;
  }

  .tile {
    line-height: 1.5;
    font-size: 2em;
    border: 2px solid #000;
    margin: 30px 20px;
    padding: 8px;
    font-family: "Raleway", "Helvetica Neue", sans-serif;
    border-radius: 15px;
    background-color: #DDD;
    cursor: pointer;
    width: 20%;
  }

  #cheer {
    text-align: center;
    margin: 50px auto;
  }

  button.success {
    margin: auto;
    display: block;
  }


</style>
