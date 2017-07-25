import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex);
Vue.use(require('vue-cookies'))

export const store = new Vuex.Store({
  state: {
    router,
    res: [],
    audio: '',
    sentenceId: '',
    chinese: '',
    english: '',
    pinyin: '',
    wbw: [],
    wbwState: [],
    shuffled: [],
    sentenceType: 0,
    books: 0,
    currSent: 0,
    sentencePoints: 0,
    correctAnswers: [],
    endRound: false,
    hidebutton: false,
    sentenceIndex: 0,
  },
  getters: {

  },
  actions: {
    GET_SENTENCES({commit, state}){
      state.res = []
      let self = this;
      let data = {
        u: $cookies.get('user'),
        t: "readComp",
        l: 0,
        g: 0,
        sl: "false",
        av: "true"
      }
      axios({
        method: 'post',
        url: 'https://cors-anywhere.herokuapp.com/http://www.hanyu.co/ajax/getExercise.aspx',
        data,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
      }).then(function(response){
        console.log(response.data)
        state.audio = '';
        state.sentenceId = '';
        state.chinese = '';
        state.english = '';
        state.pinyin = '';
        state.wbw = [];
        state.wbwState = [];
        state.shuffled = [];
        state.endRound = false;
        state.currSent = 0;
        state.wbwState = []
        state.sentencePoints = 0;
        state.correctAnswers = [];
        state.sentenceType = 0;
        state.hidebutton = false;
        response.data.map(function(i, ind){
          if (i.wbw.length <= 1) {
            response.data.splice(ind, 1)
          }
        })
        commit('SET_SENTENCES', {sentData: response.data})
      })
    },
    SENTENCE_TRACKER({commit, state}){
      console.log(`currSent is ${state.currSent} and length is ${state.res.length}`);
      state.sentenceType = Math.floor(Math.random() * 3)
      let chosenSentence;
      if(state.currSent < state.res.length) {
        chosenSentence = state.res[state.currSent];
        console.log(chosenSentence);
        commit('SENTENCE_ID', {sentenceIdData:chosenSentence.id})
        commit('CHINESE', {chineseData:chosenSentence.chinese})
        commit('ENGLISH', {englishData:chosenSentence.english})
        commit('PINYIN', {pinyinData:chosenSentence.pinyin})
        commit('AUDIO', {audioData:chosenSentence.audio})
        commit('WBW', {wbwData:chosenSentence.wbw})
        state.currSent++;
      } else {
        state.endRound = true;
        router.push({name:'summary'})
      }
      let arr = []
      state.wbw.map(function(i){
        arr.push('')
      })
      commit('WBW_STATE', {wbwStateData: arr})
      let shuffled = state.wbw.slice(), i, j, k;
      for (i = shuffled.length; i; i--) {
        j = Math.floor(Math.random() * i);
        k = shuffled[i - 1];
        shuffled[i - 1] = shuffled[j];
        shuffled[j] = k;
      }
      commit('SHUFFLED', {shuffledData: shuffled})
    },
    POST_RESULTS({commit, state}){
      let data = {
        u: $cookies.get('user'),
        t: 'readComp',
        co: `${state.sentencePoints}`,
        un: `${0}`,
        wr: `${state.res.length - state.sentencePoints}`,
        duration: 0,
        results: state.correctAnswers
      }
      axios({
        method: 'post',
        url: 'https://cors-anywhere.herokuapp.com/https://www.hanyu.co/ajax/exerciseResults.aspx',
        data,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
      }).then(function(response){
        console.log(response);
      })
    }
  },
  mutations: {
    SET_SENTENCES(state, {sentData}){
      state.res = sentData;
    },
    CHINESE(state, {chineseData}){
      state.chinese = chineseData;
    },
    ENGLISH(state, {englishData}){
      state.english = englishData;
    },
    PINYIN(state, {pinyinData}){
      state.pinyin = pinyinData;
    },
    AUDIO(state, {audioData}){
      state.audio = audioData;
    },
    WBW(state, {wbwData}){
      state.wbw = wbwData;
    },
    WBW_STATE(state, {wbwStateData}){
      state.wbwState = wbwStateData;
    },
    SHUFFLED(state, {shuffledData}){
      state.shuffled = shuffledData;
    },
    SENTENCE_ID(state, {sentenceIdData}){
      state.sentenceId = sentenceIdData;
    }
  },
  options: {

  }
})

export default store;
