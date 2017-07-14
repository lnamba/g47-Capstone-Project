<template lang="html">
  <div class="grid-container">
    <div v-if="!hidebutton">
      <h1>Welcome, {{ name }}!</h1>
      <img :src="avatar" alt="">
      <button class="button success large" @click="startGame">Start!</button>
    </div>

    <div v-if="hidebutton">
      <chinese-comprehension v-if="sentence === 0"></chinese-comprehension>
      <english-comprehension v-else-if="sentence === 1"></english-comprehension>
      <listening-comprehension v-else></listening-comprehension>
    </div>
  </div>
</template>

<script>
import store from '../Store';
export default {
  data() {
    return {
      sentence: 0,
      hidebutton: false,
      name: `${this.$cookies.get('name')}`,
      avatar: `${this.$cookies.get('avatar')}`,
    }
  },
  created(){
    this.$store.dispatch('GET_SENTENCES')
  },
  methods: {
    startGame(){
      this.sentence = Math.floor(Math.random() * 3);
      this.hidebutton = true;
    },
  },
  computed: {
    res(){
      return this.$store.state.res;
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
