<template lang="html">
  <div>
    <div class="grid-x" v-if="!hidebutton">
      <div class="cell medium-6">
        <div class="row">
          <div class="cell medium-10">
            <h1 class="text-center">Welcome, {{ name }}!</h1>
            <img class="float-center" :src="avatar" alt="avatar" v-if="avatar !== 'null'">
            <img class="float-center" src="../assets/img/blankUser.png" alt="avatar" v-else>
            <button class="button success large" @click="startGame">Start!</button>
          </div>
        </div>
      </div>
      <div class="cell medium-6" id="about">
        <div class="row">
          <div class="cell medium-10">
            <h2 class="text-center">Instructions</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="grid-x" v-if="hidebutton">
      <div class="cell medium-12">
        <chinese-comprehension v-if="sentenceType === 0"></chinese-comprehension>
        <english-comprehension v-else-if="sentenceType === 1"></english-comprehension>
        <listening-comprehension v-else></listening-comprehension>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../Store';
export default {
  data() {
    return {
      // sentenceType: 0,
      name: `${this.$cookies.get('name')}`,
      avatar: `${this.$cookies.get('avatar')}`,
    }
  },
  created(){
    this.$store.dispatch('GET_SENTENCES')
  },
  methods: {
    startGame(){
      // this.sentenceType = Math.floor(Math.random()*3);
      this.$store.state.endRound = false;
      this.$store.state.hidebutton = true;
      this.$store.dispatch('SENTENCE_TRACKER')
    },
  },
  computed: {
    res(){
      return this.$store.state.res;
    },
    hidebutton(){
      return this.$store.state.hidebutton;
    },
    sentenceType(){
      return this.$store.state.sentenceType;
    },
  }
}
</script>

<style lang="css" scoped>
  h1, h2 {
    margin-top: 30px;
  }

  img {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    margin-top: 40px;
  }

  button{
    cursor: pointer;
  }

  
</style>
