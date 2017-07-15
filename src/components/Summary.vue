<template lang="html">
  <div class="grid-container">
    <div class="row">
      <h1>Exercise Summary</h1>
      <h2>You answered {{points}}/{{resLength}} questions correctly!</h2>
    </div>
    <div class="row">
      <button class="button success large" @click="nextRound">Next Round</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      points: this.$store.state.sentencePoints,
      resLength: this.$store.state.res.length,
    }
  },
  methods: {
    nextRound(){
      this.$store.state.hidebutton = false;
      console.log('here is the results', this.$store.state.correctAnswers);
      this.$store.dispatch('POST_RESULTS')
      this.$router.push('sentences')
    }
  }
}
</script>

<style lang="css" scoped>
  h1 {
    margin-top: 30px;
  }
</style>
