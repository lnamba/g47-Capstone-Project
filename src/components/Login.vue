<template lang="html">
  <div class="row">
    <div id="login">
      <h1 class="text-center"><b>Login</b></h1>
      <div id="outer">
        <form>
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
              <input v-on:click="submitForm" v-class="button alert" type="submit" name="submit" value="submit">
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    submitForm() {
      // 1 == simplified, 2 == traditional, 1 is default
      const url = "https://www.hanyu.co/ajax/login.aspx";
      var x = new XMLHttpRequest();
      var credentials = "{ 'email' : '" + this.email + "', 'password' : '" + this.password + "' }";

      x.open('POST', url);
      x.responseType = 'json';

      x.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");

      x.onload = function () {
      console.log('this is the response', x.response);
      var response = x.response;
        if (x.readyState == 4 && x.status == 200) {
          if (response != null) {
          }
        }
      }

      x.send(credentials);
      router.push('read')
    }
  }
};
</script>

<style lang="css">

#login {
  height: 100vh;
  background-image: url('../assets/img/login-background.jpg');
  padding-top: 150px;
  font-family: "Raleway", "Helvetica Neue", sans-serif;
}

#login > h1 {
  font-family: "Raleway", "Helvetica Neue", sans-serif;
}

#outer {
  background-color: #FFF;
  width: 50%;
  height: 55%;
  margin: 0 auto;
  padding: 20px;
}

#outer > form {
  background-color: #FCEBEA;
  height: 100%;
}

label {
  font-size: 1.5em;
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
