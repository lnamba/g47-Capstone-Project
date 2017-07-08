<template lang="html">
  <div class="top-bar">

      <ul class="menu expanded">
        <li class="logo">
          <router-link to="/">Title</router-link>
        </li>
      </ul>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
  .top-bar, .logo, .logo ~ li, .bottom-bar {
    background-color: #333;
  }
</style>
