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
          <li><a @click="toDash">Home</a></li>
          <!-- <li><router-link class="link align-left" to="/sentences">Home</router-link></li> -->
          <li @click="logout"><a>Logout</a></li>
        </ul>
      </div>
    </div>

    <div class="content-wrapper">
      <router-view></router-view>
    </div>

    <footer class="grid-x grid-padding-x">
      <div class="medium-4 cell">
        <p>&copy; 2017 Spiffy Ventures</p>
      </div>
      <div class="small-2 medium-1 cell small-offset-1 medium-offset-0">
        <a href="https://twitter.com/hanyudotco" target="_blank">
          <img src="../static/icons/twitter.png" alt="twitter-icon">
        </a>
      </div>
      <div class="small-2 medium-1 cell">
        <a href="https://www.facebook.com/hanyuCO" target="_blank">
          <img src="../static/icons/facebook.png" alt="facebook-icon">
        </a>
      </div>
      <div class="small-2 medium-1 cell">
        <a href="https://www.instagram.com/hanyu.co/" target="_blank">
          <img src="../static/icons/instagram.png" alt="instagram-icon">
        </a>
      </div>
      <div class="small-2 medium-1 cell">
        <a href="https://www.youtube.com/channel/UC8cnMvHc_Lk5qLOFZ3z-hzA" target="_blank">
          <img src="../static/icons/youtube.png" alt="youtube-icon">
        </a>
      </div>
      <div class="small-2 medium-1 cell">
        <a href="https://www.linkedin.com/company/hanyu-co" target="_blank">
          <img src="../static/icons/linkedin.png" alt="linkedin-icon">
        </a>
      </div>
    </footer>

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
      this.$router.push({path:'/sentences'});
    } else {
      this.logout()
    }
  },
  methods: {
    toDash(){
      this.$store.state.hidebutton = false;
      this.$router.push('sentences')
      this.$store.dispatch('GET_SENTENCES')
    },
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

  h1 {
    font-size: 3em;
  }

  #logo {
    height: 40px;
    width: 40px;
  }

  .top-bar, .top-bar ul, .top-bar a, .title-bar, #bottom-bar {
    background-color: #333;
    list-style-type: none;
  }
  html, body, template {
    height: 100%;
  }

  #app {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  div.content-wrapper {
    flex: 1;
  }

  footer {
    background-color: #333;
    height: 60px;
    padding: 10px 0 0 20px;
  }

  footer > p {
    margin: 0;
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

  .button.success:not(#login-button), .button.alert {
    margin: 150px auto 100px auto;
    display: block;
    border-radius: 10px;
    color: #FFF;
  }

  .button.warning {
    margin: 100px auto;
    display: block;
    border-radius: 10px;
    color: #000;
  }

  .button.success:hover, .button.success:focus,
  .button.alert:hover, .button.alert:focus {
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
    margin-top: 80px;
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
    border: 2px solid #555;
    margin: 40px 20px;
    font-family: "Tahoma", "Raleway", "Helvetica Neue", sans-serif;
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

  .tile:hover, .space:hover {
    background-color: #777;
    color: #FFF;
    -moz-box-shadow: inset 0 0 20px #000;
    -webkit-box-shadow: inset 0 0 20px #000;
    box-shadow: inset 0 0 20px #000;
    transition: background-color 0.25s ease-out, color 0.25s ease-out;
  }

  // .space:hover div {
  //   color: #FFF;
  // }

  .cheer, .encourage {
    text-align: center;
    margin: 50px auto;
  }

</style>
