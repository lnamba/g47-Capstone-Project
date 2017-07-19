<template lang="html">
  <div id="login" class="grid-x grid-padding-x">
    <div class="medium-1 cell"></div>
    <div id="inner" class="medium-5 cell">
      <form v-on:submit.prevent="submitForm">
        <h1>Login</h1>
        <div class="row">
          <div class="medium-12 cell">
            <label>Email Address:
              <input type="text" name="email" v-model="email">
            </label>
          </div>
        </div>
        <div class="row">
          <div class="medium-12 cell">
            <label>Password:
              <input type="password" name="password" v-model="password">
            </label>
          </div>
        </div>
        <div class="row">
          <div class="medium-12 cell">
            <input id="login-button" class="button alert" type="submit" name="submit" value="Login">
          </div>
        </div>
        <div class="row">
          <div class="medium-12 cell">
            <p>Not a member? Visit our site to <a href="https://www.hanyu.co/login.aspx?register=1">sign up</a>.</p>
          </div>
        </div>
      </form>
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
        self.$cookies.set('name', self.userInfo.firstName, 'session')
        self.$cookies.set('avatar', self.userInfo.avatar, 'session')
        self.$router.push({name: 'sentences', params: { guid:self.userInfo.uniqueID, name:self.userInfo.firstName, avatar: self.userInfo.avatar }});
      })
    }
  }
};
</script>

<style lang="css">

form > h1 {
  font-family: "Raleway", "Helvetica Neue", sans-serif;
  color: #FFF;
}

#login {
  padding-top: 150px;
  font-family: "Raleway", "Helvetica Neue", sans-serif;
  height: 100vh;
  background: url('../assets/img/lanterns.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

#login-button {
  margin: 30px 0;
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

</style>
