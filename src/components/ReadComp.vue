<template lang="html">
  <div class="grid-container" id="read-comp">
    <div class="row" id="heading">
      <h1>Exercises</h1>
      <h1>{{ chinese }}</h1>
    </div>
    <div class="row">
      <div id="spaces" class="medium-8 columns">
          <!-- <div class="space" v-for="(word, index) in spaceArr" v-on:click="appendWord(unshuffled[index], index)">
            <span>{{ word }}</span>
          </div> -->
          <a><div class="space" v-for="(word, index) in unshuffled" v-on:click="appendWord(word, index)">
            <span v-show="spaceArr[index]">{{ word }}</span>
          </div></a>
          <span v-model="punctuation">{{ punctuation }}</span>
      </div>
      <div id="tiles">
        <button class="tile" v-for="tile in tiles" v-on:click="clickWord(tile)">{{ tile }}</button>
      </div>
    </div>
    <div class="row" v-show="roundClear">
      <div class="message">
        <h1 id="cheer">Nice Job!</h1>
      </div>
      <button class="button success" v-on:click="next">Next Sentence</button>
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
     wordCount: 0,
     punctuation: '',
     tiles: [],
     clickedWord: '',
     currInd: 0,
     unshuffled: [],
     wordCorrect: false,
     roundClear: false,
     spaceArr : []
    }
  },
  // watch: {
  //   spaceArr:{
  //     handler: function(val, oldVal){
  //       console.log('watching',val);
  //     },
  //     deep: true,
  //   }
  // },
  mounted(){
    this.start()
  },
  methods: {
    start(){
      // hotmail - 2612f3ef-ce14-4dae-9917-bed20ddfca98
      // gmail - 8f3e9255-f0bf-4418-9b64-9b02b0ec05fd
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
        self.wordCount = chosenSentence.english.split(' ').length;
        self.punctuation = chosenSentence.english.charAt(chosenSentence.english.length - 1);
        self.unshuffled = chosenSentence.english.split(' ');

        let last = self.unshuffled[self.unshuffled.length - 1]
        let punct =last.split('').splice(0, last.length-1).join('')
        self.unshuffled[self.unshuffled.length - 1] = punct
        console.log(self.unshuffled);

        self.unshuffled.map(function(i) {
          self.spaceArr.push('');
        })

        let shuffled = self.unshuffled.slice(), i, j, k;
        for (i = shuffled.length; i; i--) {
          j = Math.floor(Math.random() * i);
          k = shuffled[i - 1];
          shuffled[i - 1] = shuffled[j];
          shuffled[j] = k;
        }
        self.tiles = shuffled;
      })
    },
    clickWord(tile){
      this.clickedWord = tile;
      console.log(this.clickedWord);
    },
    appendWord(word, index){
      if (word === this.clickedWord) {
        this.wordCorrect = true;
        this.spaceArr[index] = word;
        console.log(this.spaceArr);
      }
      if (!this.spaceArr.includes('')) {
        this.roundClear = true;
      }
    },
    next(){
      this.chinese = '';
      this.english = '';
      this.wordCount = 0;
      this.punctuation = '';
      this.tiles = [];
      this.clickedWord = '';
      this.currInd = 0;
      this.unshuffled = [];
      this.wordCorrect = false;
      this.roundClear = false;
      this.spaceArr  = [];
      this.start()
    }
    // appendWord(word, index){
    //   console.log(index);
    //   if (word === this.clickedWord) {
    //     this.spaceArr[index] = word;
    //   }
    //   console.log(this.spaceArr);
    // }
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
    width: 15%;
    height: 5%;
    border-bottom: 2px solid #000;
    margin: 40px 20px;
    font-family: "Raleway", "Helvetica Neue", sans-serif;
    font-size: 2em;
    color: #55CC99;

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
    font-size: 2em;
    border: 2px solid #000;
    margin: 0 20px;
    padding: 10px;
    font-family: "Raleway", "Helvetica Neue", sans-serif;
    border-radius: 15px;
    background-color: #DDD;
    cursor: pointer;
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
