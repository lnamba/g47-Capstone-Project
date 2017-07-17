<template>
  <div id="app">
    <div class="title-bar" data-responsive-toggle="navbar" data-hide-for="medium">
      <button class="menu-icon" type="button" data-toggle="navbar"></button>
      <div class="title-bar-title">Menu</div>
    </div>
    <div class="top-bar" id="navbar">
      <div class="top-bar-left">
        <ul class="menu">
          <li class="brand">
            <a href="http://www.hanyu.co/default.aspx"><img id="logo" src="./assets/img/logo4white.png" alt="logo">HANYU.CO</a>
          </li>
        </ul>
      </div>
      <div class="top-bar-right">
        <ul class="menu" v-if="this.$cookies.get('user')">
          <li><router-link class="link align-left" to="/sentences">Home</router-link></li>
          <li @click="logout"><a>Logout</a></li>
        </ul>
      </div>
    </div>

    <div class="content-wrapper">
      <router-view></router-view>
    </div>

    <!-- <div class="columns small-6 right" id="bottom-bar">

        <p>&copy; 2017 Spiffy Ventures</p>

    </div> -->


  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return {
      loggedIn: false,
    }
  },
  mounted(){
    $(document).foundation();
    if (this.$cookies.get('user')) {
      this.loggedIn = true;
    } else {
      this.logout()
    }
  },
  methods: {
    logout(){
      this.loggedIn = false;
      this.$cookies.remove('user');
      this.$cookies.remove('name');
      this.$cookies.remove('avatar');
      this.$router.push({path:'/'});
    }
  }
};
</script>



<style lang="scss">
  @import './styles/global';
  @import url('https://fonts.googleapis.com/css?family=Raleway');

  // Chrome Reset

  a:focus {
    outline: none;
  }

  li > a, .brand {
    color: $white;
  }

  // Custom Styles

  #logo {
    height: 40px;
    width: 40px;
  }

  .top-bar, .top-bar ul, .top-bar a, .title-bar, #bottom-bar {
    background-color: #333;
    list-style-type: none;
  }

  #bottom-bar {
    padding: 16px 0 0 20px;
    color: #FFF;
    display: table;
    width: 100%;
    height: 40px;
    font-family: 'Helvetica Neue', Helvetica, 'Roboto', Arial, sans-serif;
  }

  #bottom-bar > p {
    display: table-cell;
    vertical-align: middle;
  }

  .brand {
    font-size: 1.2em;
    line-height: 35px;
    font-weight: 100;
    font-family: 'Raleway', sans-serif;
  }

  .brand a {
    padding: 0;
  }

  .top-bar-right a {
    font-family: 'Helvetica Neue', Helvetica, 'Roboto', Arial, sans-serif;
    font-size: 1em;
  }

  a:hover {
    color: #DA5961;
  }

  a:active, a:focus {
    color: #FFF;
  }

  // LOGIN PAGE

  p {
    font-size: 1.1em;
    color: #FFF;
  }

  p > a {
    color: #9AB4CB
  }

  p > a:hover {
    color: #DA5961;
    font-weight: bold;
    font-size: 1.1em;
  }


  //Begin exercise styles

  #heading h1 {
    margin-top: 30px;
    text-align: center;
  }

  .chinese {
    font-family: 'Yuanti SC';
    font-weight: 100;
  }

  #spaces {
    display: block;
    margin: 100px auto 80px auto;
    text-align: center;
  }

  .space {
    display: inline-block;
    width: 20%;
    height: 5%;
    border: 2px solid #000;
    margin: 40px 20px;
    font-family: "Tahoma", "Raleway", "Helvetica Neue", sans-serif;
    color: #55CC99;
    cursor: pointer;
    border-radius: 15px;
    background-color: #DDD;
  }

  #spaces > span {
    font-size: 3em;
    margin: 0;
    display: inline-block;
    height: 50px;
  }

  #tiles {
    text-align: center;
    margin-bottom: 50px;
  }

  .tile {
    line-height: 1.5;
    border: 2px solid #000;
    margin: 30px 20px;
    padding: 8px;
    font-family: "Tahoma", "Raleway", "Helvetica Neue", sans-serif;
    border-radius: 15px;
    background-color: #DDD;
    color: #000;
    cursor: pointer;
    width: 20%;
  }

  .tile:hover {
    background-color: #55CC99;
    -moz-box-shadow: inset 0 0 20px #2B664D;
   -webkit-box-shadow: inset 0 0 20px #2B664D;
   box-shadow: inset 0 0 20px #2B664D;
   transition: background-color 0.25s ease-out, color 0.25s ease-out;
  }

  .tile:hover > .eng {
    color: #333;
  }

  .cheer, .encourage {
    text-align: center;
    margin: 50px auto;
  }

  button.success, button.alert {
    margin: 100px auto;
    display: block;
  }



</style>
