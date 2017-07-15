<template lang="html">
  <div class="grid-container">
    <div v-if="!hidebutton" class="grid-x grid-margin-x">
      <div class="cell medium-12 large-offset-1">
        <h1>Welcome, {{ name }}!</h1>
        <img :src="avatar" alt="avatar" v-if="avatar !== 'null'">
        <img src="../assets/img/blankUser.png" alt="avatar" v-else>
        <button class="button success large" @click="startGame">Start!</button>
      </div>
    </div>

    <div v-if="hidebutton">
      <chinese-comprehension v-if="sentenceType === 0"></chinese-comprehension>
      <english-comprehension v-else-if="sentenceType === 1"></english-comprehension>
      <listening-comprehension v-else></listening-comprehension>
    </div>
  </div>
</template>

<script>
import store from '../Store';
export default {
  data() {
    return {
      sentenceType: 0,
      name: `${this.$cookies.get('name')}`,
      avatar: `${this.$cookies.get('avatar')}`,
    }
  },
  created(){
    this.$store.dispatch('GET_SENTENCES')
  },
  methods: {
    startGame(){
      this.sentenceType = Math.floor(Math.random()*3);
      this.$store.state.endRound = false;
      this.$store.state.hidebutton = true;
    },
  },
  computed: {
    res(){
      return this.$store.state.res;
    },
    hidebutton(){
      return this.$store.state.hidebutton;
    },
  }
}
</script>

<style lang="css" scoped>
  h1 {
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
