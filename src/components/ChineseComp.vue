<template lang="html">
  <div class="grid-x" id="read-comp-1">
    <div class="medium-12 cell" id="heading">
      <audio id="audio" :src="audio" autoplay></audio>
      <h1 class="chinese">{{ chinese }}</h1>
    </div>
    <div class="medium-12 cell">
      <div id="spaces">
          <div class="space" v-for="(word, index) in wbwState" @click="removeTile(word, index)">
            <div v-show="wbwState[index]" :style="{ margin:`${8}px ${8}px 0 ${8}px`, color: '#666', fontSize:`${1.2}em` }">{{ word.pinyin }}</div>
            <div v-show="wbwState[index]" :style="{ margin:`0 ${8}px ${8}px ${8}px`, color: '#000', fontSize:`${1.2}em` }">{{ word.english }}</div>
          </div>
      </div>
      <div id="tiles">
        <button class="tile" v-for="(word, index) in shuffled" @click="clickWord(word, index)" :title="word.english">
          <div class="pinyin">{{ word.pinyin }}</div>
          <div class="eng">{{ word.english }}</div>
        </button>
      </div>
    </div>
    <div class="cell medium-12" v-show="roundClear">
      <div class="message">
        <h1 class="cheer">{{ english }}</h1>
      </div>
      <button class="button success large" @click="next">Next Sentence</button>
    </div>
    <div class="cell medium-12" v-show="!match(wbw, wbwState) && !wbwState.includes('')">
      <div class="message">
        <h1 class="encourage">Keep Trying!</h1>
        <button class="button alert large" @click="solve">Show Answer</button>
      </div>
    </div>
  </div>
</template>

<script>
import Router from 'vue-router';
import Vue from 'vue';
import VueTruncate from 'vue-truncate-filter';

export default {
  data(){
    return {
      currentIndex: 0,
      roundClear: false,
      clickedWord: '',
      matchFirstTry: true,
    }
  },
  computed: {
    sentence(){
      return this.$store.state.sentence;
    },
    audio(){
      return this.$store.state.audio;
    },
    sentenceId(){
      return this.$store.state.sentenceId;
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
        if (this.matchFirstTry){
          this.$store.state.sentencePoints++;
          this.$store.state.correctAnswers.push({Xref:`${this.$store.state.sentenceId}`, Score:'1'})
        } else {
          this.$store.state.correctAnswers.push({Xref:`${this.$store.state.sentenceId}`, Score:'3'})
        }
        this.roundClear = true;
        audio.play();
      } else if(!this.match(this.$store.state.wbw, this.$store.state.wbwState) && !this.$store.state.wbwState.includes('')) {
        this.matchFirstTry = false;
      }
    },
    match(arr1, arr2){
      if (arr1.length !== arr2.length) {
        return false;
      }
      for(let i = arr1.length; i--;) {
        if (arr1[i].id !== arr2[i].id){
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
    solve(){
      let self = this;
      this.$store.state.wbwState = [];
      this.$store.state.wbw.map(function(i, ind){
        self.$store.state.wbwState[ind] = i
      })
      this.clickWord()
    },
    next(){
      this.matchFirstTry = true;
      this.currentIndex = 0
      this.roundClear = false;
      this.clickedWord = '';
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



  .tile:hover div {
    color: white
  }

  .pinyin {
    color: #666;
    font-size: 1.2em;
  }

  .eng {
    color: #000;
    font-size: 1.2em;
  }

</style>
