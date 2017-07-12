<template lang="html">
  <div class="grid-container" id="listen-comp">
    <div class="row" id="heading">
      <h1>Exercises</h1>
      <audio id="audio-controls">
        <source v-bind:src="audiofile" type="audio/mp3">
      </audio>
    </div>
    <div class="row">
      <div id="spaces" class="medium-8 columns">
          <div class="space" v-for="(word, index) in wbwState" v-on:click="removeTile(word, index)">
            <div v-show="wbwState[index]" v-bind:style="{ margin:`${8}px ${8}px 0 ${8}px`, color: '#000' }">{{ word.chinese }}</div>
          </div>
      </div>
      <div id="tiles">
        <button class="tile" v-for="(word, index) in shuffled" v-on:click="clickWord(word, index)" v-bind:title="word.english">
          <div class="pinyin">{{ word.chinese }}</div>
        </button>
      </div>
    </div>
    <div class="row" v-show="roundClear">
      <div class="message">
        <h1 id="cheer">{{ chinese }}</h1>
        <h3 id="cheer">{{ pinyin }}</h3>
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
export default {
  data(){
    return {
      audiofile: '',
      
    }
  }
}
</script>

<style lang="css">
</style>
