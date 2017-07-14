<template lang="html">
  <div class="grid-container">
    <div class="row">
      <h1>Exercise Summary</h1>
    </div>
    <div class="row">
      <router-link :to="{ path: '/sentences' }"><button class="button success large">Next Round</button></router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="css" scoped>
  h1 {
    margin-top: 30px;
  }
</style>
