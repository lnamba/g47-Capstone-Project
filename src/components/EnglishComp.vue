<template lang="html">
  <div class="grid-container" id="read-comp-2">
    <div class="row" id="heading">
      <h1>Exercises</h1>
      <h1><b>{{ english }}</b></h1>
    </div>
    <div class="row">
      <div id="spaces" class="medium-8 columns">
          <div class="space" v-for="(word, index) in wbwState" @click="removeTile(word, index)">
            <div v-show="wbwState[index]" :class="{chinese}" :style="{ margin:`${8}px`, color: '#000' }">{{ word.chinese }}</div>
          </div>
      </div>
      <div id="tiles">
        <button class="tile" v-for="(word, index) in shuffled" @click="clickWord(word, index)" :title="word.pinyin">
          <div class="chinese">{{ word.chinese }}</div>
        </button>
      </div>
    </div>
    <div class="row" v-show="roundClear">
      <div class="message">
        <h1 class="cheer">{{ chinese }}</h1>
        <h3 class="cheer">{{ pinyin }}</h3>
      </div>
      <button class="button success large" @click="next">Next Sentence</button>
    </div>
    <div class="row" v-show="!match(wbw, wbwState) && !wbwState.includes('')">
      <div class="message">
        <h1 class="encourage">Keep Trying!</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Router from 'vue-router';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import GetSentences from '../mixins/GetSentences';

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
  methods: {
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

      // check if the wbwState and wbw matches
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
  mixins: [ GetSentences ]
}
</script>

<style lang="css" scoped>
  #read-comp-2 {
    height: 100vh;
  }

  .chinese {
    font-size: 2.5em;
  }

</style>
