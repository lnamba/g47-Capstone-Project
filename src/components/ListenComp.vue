<template lang="html">
  <div class="grid-container" id="listen-comp">
    <div class="row" id="heading">
      <i class="fi-play" @click="replay"></i>
      <audio id="audio" :src="audio" autoplay></audio>
    </div>
    <div class="row">
      <div id="spaces" class="medium-8 columns">
        <div class="space" v-for="(word, index) in wbwState" @click="removeTile(word, index)">
          <div v-show="wbwState[index]" :class="{chinese}" :style="{ margin:`${8}px`, color: '#000' }">{{ word.chinese }}</div>
        </div>
      </div>
      <div id="tiles">
        <button class="tile" v-for="(word, index) in shuffled" @click="clickWord(word, index)" :title="`${word.pinyin} - ${word.english}`">
          <div class="chinese">{{ word.chinese }}</div>
        </button>
      </div>
    </div>
    <div class="row" v-show="roundClear">
      <div class="message">
        <h1 class="cheer">{{ chinese }}</h1>
        <h1 class="cheer">{{ english }}</h1>
      </div>
      <button class="button success large" @click="next">Next Sentence</button>
    </div>
    <div class="row" v-show="!match(wbw, wbwState) && !wbwState.includes('')">
      <div class="message">
        <h1 class="encourage">Keep Trying!</h1>
        <button class="button alert large" @click="solve">Solve</button>
      </div>
    </div>
  </div>
</template>

<script>
import Router from 'vue-router';
import Vue from 'vue';
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
  created(){
    // this.$store.dispatch('SENTENCE_TRACKER');

  },
  computed: {
    audio(){
      return this.$store.state.audio;
    },
    sentence(){
      return this.$store.state.sentence;
    },
    res(){
      return this.$store.state.res;
    },
    chinese(){
      console.log(this.$store.state.chinese);
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
    replay(){
      let audio = document.getElementById('audio');
      audio.currentTime = 0;
      audio.play()
    },
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

      // check if the wbwState and wbw matches
      if (this.match(this.$store.state.wbw, this.$store.state.wbwState)){
        this.replay()
        if (this.matchFirstTry){
          this.$store.state.sentencePoints++;
          this.$store.state.correctAnswers.push({Xref:`${this.$store.state.sentenceId}`, Score:'1'})
        } else {
          this.$store.state.correctAnswers.push({Xref:`${this.$store.state.sentenceId}`, Score:'3'})
        }
        this.roundClear = true;
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

  /*#listen-comp {
    height: 100vh;
  }*/

  #audio {
    margin: 0 auto;
    display: block;
  }

  i.fi-play, i.fi-refresh {
    font-size: 5em;
    text-align: center;
    display: block;
    cursor: pointer;
  }

  .chinese {
    font-size: 2.5em;
  }

</style>
