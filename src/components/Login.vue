<template lang="html">
    <div class="row" id="outer">
      <div id="login">
        <div id="inner">
          <form v-on:submit.prevent="submitForm">
            <h1><b>Login</b></h1>
            <div class="row">
              <div class="medium-6 columns">
                <label>Email Address:
                  <input type="text" name="email" v-model="email">
                </label>
              </div>
              <div class="medium-6 columns">
                <label>Password:
                  <input type="password" name="password" v-model="password">
                </label>
              </div>
            </div>
            <div class="row">
              <div class="medium-6 columns">
                <input class="button alert" type="submit" name="submit" value="Login">
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import Router from 'vue-router';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      userInfo: []
    };
  },
  methods: {
    submitForm() {
      // 1 == simplified, 2 == traditional, 1 is default
      let self = this;
      axios({
        method: 'post',
        url: 'https://www.hanyu.co/ajax/login.aspx',
        data:{
          email: this.email,
          password: this.password
        },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
      }).then(function(response) {
        self.userInfo = response.data;
        // need auth here
        console.log(response.data);
        self.$cookies.set('user', self.userInfo.uniqueID, 'session')
        self.$router.push({name: 'sentences', params: {guid:self.userInfo.uniqueID }});
      })
    }
  }
};
</script>

<style lang="css">

#login {
  padding-top: 150px;
  font-family: "Raleway", "Helvetica Neue", sans-serif;
}

form > h1 {
  font-family: "Raleway", "Helvetica Neue", sans-serif;
  color: #FFF;
}

#inner {
  width: 50%;
  height: 55%;
  margin: 0 auto;
  padding: 20px;
  float: left;
  margin-left: 10%;
}

#outer {
  height: 100vh;
  background: url('../assets/img/lanterns.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

label {
  font-size: 1.5em;
  color: #FFF;
}

div.medium-6.columns:first-child {
  padding: 30px 30px 0 30px;
}

div.medium-6.columns:last-child {
  padding: 0 30px 30px 30px;
}

/*input.large {
  color: #FCEBEA;
}*/
</style>
