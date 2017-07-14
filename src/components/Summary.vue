<template lang="html">
  <div class="grid-container">
    <div class="row">
      <h1>Exercise Summary</h1>
    </div>
    <div class="row">
      <button class="button success large" @click="nextRound">Next Round</button>
      <!-- <router-link :to="{ path: '/sentences' }"><button class="button success large">Next Round</button></router-link> -->
    </div>
  </div>
</template>

<script>
export default {
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
