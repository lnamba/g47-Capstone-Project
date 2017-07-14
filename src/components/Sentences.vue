<template lang="html">
  <div class="grid-container">
    <div v-if="!hidebutton">
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
  button{
    cursor: pointer;
  }
</style>
