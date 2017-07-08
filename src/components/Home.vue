<template>
  <div class="row align-middle">
    <login></login>
  </div>
</template>

<script>
import Vue from 'vue';
import Login from '@/components/Login';

Vue.component('login', Login);

export default {
  name: 'hello',
  data() {
    return {

    };
  },
};
</script>

<style lang="scss" scoped>

  .image {
    margin-top: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .call-button {
    border-radius: 20px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
  }


</style>
