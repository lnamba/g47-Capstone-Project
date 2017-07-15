<template lang="html">
  <div class="grid-container" id="read-comp-1">
    <div class="row" id="heading">
      <h1>Exercises</h1>
      <h1 class="chinese">{{ chinese }}</h1>
    </div>
    <div class="row">
      <div id="spaces" class="medium-8 columns">
          <div class="space" v-for="(word, index) in wbwState" @click="removeTile(word, index)">
            <div v-show="wbwState[index]" :style="{ margin:`${8}px ${8}px 0 ${8}px`, color: '#000' }">{{ word.pinyin }}</div>
            <div v-show="wbwState[index]" :style="{ margin:`0 ${8}px ${8}px ${8}px`, color: '#239D1F' }"><b>{{ word.english }}</b></div>
          </div>
      </div>
      <div id="tiles">
        <button class="tile" v-for="(word, index) in shuffled" @click="clickWord(word, index)" :title="word.english">
          <div class="pinyin">{{ word.pinyin }}</div>
          <div class="eng">{{ word.english }}</div>
        </button>
      </div>
    </div>
    <div class="row" v-show="roundClear">
      <div class="message">
        <h1 class="cheer">{{ english }}</h1>
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
import VueTruncate from 'vue-truncate-filter';
import GetSentences from '../mixins/GetSentences';

export default {
  data(){
    return {
      currentIndex: 0,
      roundClear: false,
      clickedWord: '',
      matchFirstTry: true,
    }
  },
  mounted(){
    this.$store.dispatch('SENTENCE_TRACKER')

  },
  computed: {
    sentence(){
      return this.$store.state.sentence;
    },
    chinese(){
      return this.$store.state.chinese;
    },
    english(){
      return this.$store.state.english;
    },
    pinyin(){
      return this.$store.state.pinyin;
    },
    wbw(){
      return this.$store.state.wbw;
    },
    wbwState(){
      return this.$store.state.wbwState;
    },
    unshuffled(){
      return this.$store.state.unshuffled;
    },
    shuffled(){
      return this.$store.state.shuffled;
    },
    correctAnswers(){
      return this.$store.state.correctAnswers;
    },
    sentencePoints(){
      return this.$store.state.sentencePoints;
    },
  },
  methods: {
    clickWord(word, index){
      let empty = this.$store.state.wbwState.find(function(i){
        return i === ''
      });
      this.currentIndex = this.$store.state.wbwState.indexOf(empty);
      this.clickedWord = word;
      this.$store.state.wbwState[this.currentIndex] = this.clickedWord;
      let self = this;
      this.$store.state.shuffled.map(function(i, index){
        if (i === word) {
          self.$store.state.shuffled.splice(index, 1)
        }
      })
      this.currentIndex++;

      //check ifthis.$store.state.wbwState and wbw matches
      if (this.match(this.$store.state.wbw, this.$store.state.wbwState)){
        // console.log('matches');
        if (this.matchFirstTry){
          this.$store.state.sentencePoints++;
          // console.log('Points for the user', this.$store.state.sentencePoints);
        }
        this.roundClear = true;
      } else if(!this.match(this.$store.state.wbw, this.$store.state.wbwState) && !this.$store.state.wbwState.includes('')) {
        // console.log('no match');
        this.matchFirstTry = false;
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
      this.$store.state.shuffled.push(word);
      this.$store.state.wbwState.splice(index, 1, '');
      this.currentIndex = index;
    },
    next(){
      console.log("next was clicked");
      this.matchFirstTry = true;
      this.currentIndex = 0
      this.roundClear = false;
      this.clickedWord = '';
      window.sentenceType = Math.floor(Math.random()*3)+1
      console.log(window.sentenceType);
      // this.$store.state.sentenceType = Math.floor(Math.random()*3)
      // this.$store.dispatch('RANDOMIZE_SENTENCE')
      // localStorage.setItem("sentenceType", Math.floor(Math.random() * 3));
      this.$store.dispatch('SENTENCE_TRACKER')

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
  },
}

</script>

<style lang="css" scoped>
  #read-comp-1 {
    height: 100vh;
  }

  .space div:first-child {
    font-size: 1.5em;
  }

  .space div:last-child {
    font-size: 1em;
  }

  .pinyin {
    color: #000;
    font-size: 1.5em;
  }

  .eng {
    color: #C10E40;
    font-size: 1em;
  }

</style>
