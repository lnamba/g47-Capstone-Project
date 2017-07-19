<template lang="html">
  <div>
    <div v-if="!hidebutton">
      <div class="cell medium-12">
        <img :src="photo">
      </div>
      <div class="grid-x grid-padding-x">
        <div class="cell medium-6" id="user">
          <h1 class="text-center">Welcome, {{ name }}!</h1>
          <img class="float-center" :src="avatar" alt="avatar" v-if="avatar !== 'null'">
          <img class="float-center" src="../assets/img/blankUser.png" alt="avatar" v-else>
          <button class="button success large" @click="startGame">Start!</button>
        </div>
        <div class="cell medium-6" id="instructions">
          <h1 class="text-center">Instructions</h1>
          <ul>
            <li>There are three types of exercises: Chinese to English, English to Chinese, and Listening. They will be presented in random order.</li>
            <li>Click the tiles to arrange them in the order that matches the sentence given.</li>
            <li>If you are correct, you'll pass to the next round. If you are incorrect, you can continue rearranging tiles until you answer correctly or click the "Show Answer" button to be shown the answer.</li>
            <li>View your results to see how many answers were correct.</li>
          </ul>
        </div>
      </div>
    </div>

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
    let randPhoto = Math.floor(Math.random() * 8)
    let photoArr = ['../../static/random/Horizontal/field.jpg',
      '../../static/random/Horizontal/skyline.jpg',
      '../../static/random/Horizontal/stadium.jpg',
      '../../static/random/Horizontal/station.jpg',
      '../../static/random/Horizontal/wall.jpg',
      '../../static/random/Horizontal/peking.jpg',
      '../../static/random/Horizontal/tower.jpg',
      '../../static/random/Horizontal/game.jpg',
    ]
    this.photo = photoArr[randPhoto]
    console.log(this.photo);
  },
  methods: {
    startGame(){
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
  h1 {
    font-size: 3em;
  }

  h2 {
    font-size: 2em;
  }

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

  #instructions {
    background-color: #545454;
    color: #FFF;
    padding: 0 30px;
  }

  #instructions li {
    margin-bottom: 20px;
    font-size: 1.2em;
  }

</style>
