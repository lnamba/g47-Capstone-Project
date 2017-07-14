<template lang="html">
  <div class="grid-container">
    <div class="row">
      <h1>Exercise Summary</h1>
      <h2>You got {{points}}/4 points!</h2>
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
    }
  },
  methods: {
    nextRound(){
      this.$store.state.hidebutton = false;
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
