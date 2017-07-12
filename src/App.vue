<template>
  <div id="app">
    <div class="top-bar">
      <ul class="menu expanded">
        <li class="logo">
          <router-link to="/">Title</router-link>
        </li>
      </ul>
    </div>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
    <!-- <div id="bottom-bar" class="top-bar">
      <p>&copy; 2017 Spiffy Ventures</p>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'app',

};
</script>



<style lang="scss">
  @import './styles/global';
  @import url('https://fonts.googleapis.com/css?family=Raleway');

  // Chrome Reset

  a:focus {
    outline: none;
  }

  .logo, .logo a {
    color: $white;
    font-weight: normal;
  }

  li a.menu-button {
    border-radius: 20px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
    display: inline-block;
    float: right;
  }

  .content-wrapper {
  }


  .top-bar, .logo, .logo ~ li, .bottom-bar {
    background-color: #333;
  }

  // Custom Styles
  
  #heading h1:first-child {
    margin-top: 20px;

  }

  #heading h1:last-child {
    text-align: center;
    margin-top: 40px;
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
    cursor: pointer;
    width: 20%;
  }

  .cheer, .encourage {
    text-align: center;
    margin: 50px auto;
  }

  button.success {
    margin: 100px auto;
    display: block;
  }

  #bottom-bar {
    color: #FFF;
    display: table;
    width: 100%;
  }

  #bottom-bar > p {
    display: table-cell;
    vertical-align: middle;
    padding: 8px;
  }

</style>
