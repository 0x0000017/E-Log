<template>
  
    <div v-if="isLoggedIn" class="container animate__animated animate__fadeIn mainMenu">
      <h2 class="mb-5">Menu</h2>
      
      <div class="row">

        <div class="col mb-5">
            <router-link to="/logs">
              <button class="btn btn-primary custom-btn" @mouseover="hoverEffect" @mouseleave="resetEffect">
                <img :src="require('@/assets/dark-logs.png')" :class="'normal-image'">
                <img :src="require('@/assets/logs-hover.png')" :class="'hover-image'">
              </button>
            </router-link><br>
            <span>Logs</span>
        </div>

        <div class="col">
            <router-link to="/choose-vehicle">
              <button class="btn btn-primary custom-btn" @mouseover="hoverEffect" @mouseleave="resetEffect">
                <img :src="require('@/assets/dark-add.png')" class="normal-image">
                <img :src="require('@/assets/add-hover.png')" class="hover-image">
              </button>
            </router-link><br>
            <span>Create a Record</span>
        </div>

      </div>

      <div class="prevPanel">
        <div class="row">
          <div class="col"></div>
          <div class="col">
            <router-link to="/">
              <button class="btn btn-primary custom-btn circleBtn" @mouseover="hoverEffect" @mouseleave="resetEffect">
                <img :src="require('@/assets/back-btn.png')" alt="">
              </button>
            </router-link>
          </div>
          <div class="col"></div>
        </div>
      </div>
    </div>

    <div v-else class="bypassLogin">
      <div class="center-container">
        <p style="font-size: 1.2rem; font-weight: 700;">You are not logged in. Please <router-link to="/login" @click="redirectToLogin">log in</router-link> to access the main menu.</p>
      </div>
    </div>

</template>
  

<style scoped> 
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .mainMenu {
    text-align: center;
  }
  .custom-btn {
    background-color: transparent;
    border: none;
    transition: transform 0.3s ease-in-out;
  }
  .custom-btn:hover {
    background-color: #D5D6E2;
    border-radius: 25px;
    transform: scale(1.1);
  }
  
  .normal-image {
    display: block;
  }
  
  .custom-btn:hover .normal-image {
    display: none;
  }
  .custom-btn:hover .hover-image {
    display: block;
  }

  .hover-image {
    display: none;
  }

  .prevPanel {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: auto;
  }

  .circleBtn {
    width: 100px;
    background-color: #515478;
    border-radius: 25px;
  }

  .bypassLogin {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .center-container {
    text-align: center;
  }

  @media screen and (max-width: 320px) {
    .normal-image {
      max-width: 280px;
    }
    .hover-image {
      max-width: 300px;
    }
  }

</style>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['isLoggedIn']),
  },
  methods: {
    hoverEffect() {
    },
    resetEffect() {
    },
  },
};
</script>