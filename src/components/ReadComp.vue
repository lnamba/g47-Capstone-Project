<template lang="html">
  <div class="grid-container" id="read-comp">
    <div class="row" id="heading">
      <h1>Exercises</h1>
      <h1>{{ sentence }}</h1>
    </div>
    <div class="row" id="tiles"></div>
    <div class="row" id="spaces"></div>
  </div>
</template>

<script>
import Router from 'vue-router';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

export default {
  data(){
    return {
     guid: this.$route.params.guid,
     sentence: '',

    }
  },
  mounted(){
    // hotmail - 2612f3ef-ce14-4dae-9917-bed20ddfca98
    // gmail - 8f3e9255-f0bf-4418-9b64-9b02b0ec05fd
    let self = this;
    let data = {
      u: this.$route.params.guid,
      t: 'readComp',
      l: 0,
      g: '',
      sl: false,
      av: true
    }
    // $.ajax({
    //   type: "POST",
    //   url: "https://www.hanyu.co/ajax/getExercise.aspx",
    //   data,
    //   success: function(res){
    //     console.log('this is the res',res);
    //   }
    // })
    axios({
      method: 'post',
      url: 'https://www.hanyu.co/ajax/getExercise.aspx',
      data,
    }).then(function(response){
      self.sentence = response.data
      console.log(response);
    })
  }
}
</script>

<style lang="css">
  #read-comp {
    height: 100vh;
  }

  #heading h1:first-child {
    margin-top: 20px;
  }
</style>
