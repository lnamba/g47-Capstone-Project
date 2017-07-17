<template lang="html">
  <div>
    <div class="row" v-if="!hidebutton">
      <!-- <div class="cell medium-6">
        <div class="row"> -->

          <div class="cell medium-10">
            <img :src="photo">
            <h1 class="text-center">Welcome, {{ name }}!</h1>
            <img class="float-center" :src="avatar" alt="avatar" v-if="avatar !== 'null'">
            <img class="float-center" src="../assets/img/blankUser.png" alt="avatar" v-else>
            <button class="button success large" @click="startGame">Start!</button>
          </div>
        <!-- </div>
      </div> -->
      <!-- <div class="cell medium-6" id="about"> -->
        <!-- <img :src="photo"> -->
        <!-- <div class="row">
          <div class="cell medium-10">
            <h2 class="text-center">Instructions</h2>
          </div>
        </div> -->
      </div>
    <!-- </div> -->

    <div class="grid-container" v-if="hidebutton">
      <div class="cell medium-12">
        <h1 id="exercise-heading">Exercises</h1>
        <chinese-comprehension v-if="sentenceType === 0"></chinese-comprehension>
        <english-comprehension v-else-if="sentenceType === 1"></english-comprehension>
        <listening-comprehension v-else></listening-comprehension>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../Store';
export default {
  data() {
    return {
      // sentenceType: 0,
      name: `${this.$cookies.get('name')}`,
      avatar: `${this.$cookies.get('avatar')}`,
      photo: '',

    }
  },
  created(){
    this.$store.dispatch('GET_SENTENCES')
    let randPhoto = Math.floor(Math.random() * 6)
    let photoArr = ['../../static/random/horizontal/field.jpg',
      '../../static/random/horizontal/skyline.jpg',
      '../../static/random/horizontal/stadium.jpg',
      '../../static/random/horizontal/station.jpg',
      '../../static/random/horizontal/wall.jpg',
    ]
    this.photo = photoArr[randPhoto]
    console.log(this.photo);
  },
  methods: {
    startGame(){
      // this.sentenceType = Math.floor(Math.random()*3);
      this.$store.state.endRound = false;
      this.$store.state.hidebutton = true;
      this.$store.dispatch('SENTENCE_TRACKER')
    },
  },
  computed: {
    res(){
      return this.$store.state.res;
    },
    hidebutton(){
      return this.$store.state.hidebutton;
    },
    sentenceType(){
      return this.$store.state.sentenceType;
    },
  }
}
</script>

<style lang="css" scoped>

  h1, h2 {
    margin-top: 30px;
  }

  #exercise-heading {
    margin-left: 30px;
  }

  img.float-center {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    margin-top: 40px;
  }

  button{
    cursor: pointer;
  }

  #about {

    /*background: url('../assets/img/random/xian.jpg') no-repeat center center fixed;*/
  }

</style>
