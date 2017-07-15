<template lang="html">
  <div class="grid-container">
    <div v-if="!hidebutton">
      <h1>Welcome, {{ name }}!</h1>
      <img :src="avatar" alt="avatar" v-if="avatar !== 'null'">
      <img src="../assets/img/blankUser.png" alt="avatar" v-else>
      <button class="button success large" @click="startGame">Start!</button>
    </div>

    <div v-if="hidebutton">
      <chinese-comprehension v-if="arr === 1"></chinese-comprehension>
      <english-comprehension v-else-if="arr === 2"></english-comprehension>
      <listening-comprehension v-else-if="arr === 3"></listening-comprehension>
      <span v-else>Component failed {{arr}}</span>
    </div>
  </div>
</template>

<script>
import store from '../Store';
export default {
  data() {
    window.sentenceType = 2;
    return {
      // sentenceType: 0,
      name: `${this.$cookies.get('name')}`,
      avatar: `${this.$cookies.get('avatar')}`,
      arr: window.sentenceType
    }
  },
  created(){
    this.$store.dispatch('GET_SENTENCES')
    // localStorage.setItem("sentenceType", 0);
    // this.arr = Math.floor(Math.random()*3
    window.sentenceType = Math.floor(Math.random()*3)+1;
    console.log('its being created',this.arr);
  },
  methods: {
    startGame(){
      // this.$store.state.sentenceType = Math.floor(Math.random()*3)
      // this.$store.state.books = Math.floor(Math.random()*3)
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
    // sentenceType(){
    //   return this.$store.state.sentenceType;
    // },
    // books(){
    //   console.log("calling books in the browser");
    //   let blah =  this.$store.state.sentenceType;
    //   // return localStorage.getItem("sentenceType")
    //   return this.$store.state.sentenceType;
    // },
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
