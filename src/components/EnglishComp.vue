<template lang="html">
  <div class="grid-x" id="read-comp-2">
    <div class="medium-12 cell" id="heading">
      <audio id="audio" :src="audio"></audio>
      <h1><b>{{ english }}</b></h1>
    </div>
    <div class="medium-12 cell">
      <div id="spaces" class="medium-8 columns">
          <div class="space" v-for="(word, index) in wbwState" @click="removeTile(word, index)">
            <div v-show="wbwState[index]" :class="{chinese}" :style="{ margin:`${8}px` }">{{ word.chinese }}</div>
          </div>
      </div>
      <div id="tiles">
        <button class="tile" v-for="(word, index) in shuffled" @click="clickWord(word, index)" :title="word.pinyin">
          <div class="chinese">{{ word.chinese }}</div>
        </button>
      </div>
    </div>
    <div class="medium-12 cell" v-show="roundClear">
      <div class="message">
        <h1 class="cheer">{{ chinese }}</h1>
        <h3 class="cheer">{{ pinyin }}</h3>
      </div>
      <button class="button success large" @click="next">Next Sentence</button>
    </div>
    <div class="medium-12 cell" v-show="!match(wbw, wbwState) && !wbwState.includes('')">
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

      // check ifthis.$store.state.wbwState and wbw matches
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
      this.$store.dispatch('SENTENCE_TRACKER')
    }
  },
}
</script>

<style lang="css" scoped>

  .space:hover div {
    color: #FFF;
  }

  .chinese {
    font-size: 2.5em;
  }

</style>
