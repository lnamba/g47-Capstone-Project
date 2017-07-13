<template lang="html">
  <div class="grid-container">
    <button @click="startGame" v-if="!sentence">Start!</button>
    <chinese-comprehension v-if="sentence === 0"></chinese-comprehension>
    <english-comprehension v-else-if="sentence === 1"></english-comprehension>
    <listening-comprehension v-else></listening-comprehension>
  </div>
</template>

<script>
import store from '../Store';
export default {
  data() {
    return {
      sentence: 0,
      guid: this.$route.params.guid,
    }
  },
  created(){
    this.$store.dispatch('GET_SENTENCES')
  },
  methods: {
    startGame(){
      this.sentence = Math.floor(Math.random() * 3);
    },
  },
  computed: {
    res(){
      return this.$store.state.res;
    },
    // sentence(){
    //   return this.$store.state.template;
    // }
  }
}
</script>

<style lang="css">
</style>
