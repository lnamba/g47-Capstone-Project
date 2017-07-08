<template>
  <div id="app">
    <div class="off-canvas position-right" id="offCanvas" data-off-canvas>

    </div>
    <div class="off-canvas-content" data-off-canvas-content>
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

    </div>
    <div id="bottom-bar" class="top-bar">
      <p>&copy; 2017 Spiffy Ventures</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    this.offCanvas = new Foundation.OffCanvas($('#offCanvas'));
  },
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

  .sidebar-menu {
    @include menu-base();
    @include menu-direction(vertical);
    a {
      color: $secondary-color;
      font-weight: normal;
    }
    a.active {
      font-weight: 600;
      color: $primary-color;
    }
  }

  .top-bar, .logo, .logo ~ li, .bottom-bar {
    background-color: #333;
  }

  .menu-button{
    background-color: #9b2f33;
  }

  #bottom-bar {
    color: #FFF;

  }

</style>
