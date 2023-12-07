<template>
    <div class="container animate__animated animate__fadeIn">
      <h2 class="mb-5">Choose Vehicle</h2>
      
      <div class="row">

        <div class="col mb-5">
            <router-link to="/choose-parking-spot/motorcycle">
              <button class="btn btn-primary custom-btn" @mouseover="hoverEffect" @mouseleave="resetEffect">
                <img :src="require('@/assets/dark-motor.png')" class="normal-image">
                <img :src="require('@/assets/motor-hover.png')" class="hover-image">
              </button>
            </router-link>
        </div>

        <div class="col">
            <router-link to="/choose-parking-spot/car">
              <button class="btn btn-primary custom-btn" @mouseover="hoverEffect" @mouseleave="resetEffect">
                <img :src="require('@/assets/dark-car.png')" class="normal-image">
                <img :src="require('@/assets/car-hover.png')" class="hover-image">
              </button>
            </router-link>
        </div>

      </div>

      <div class="prevPanel">
        <div class="row">
          <div class="col"></div>
          <div class="col">
            <router-link to="/menu">
              <button class="btn btn-primary custom-btn circleBtn" @mouseover="hoverEffect" @mouseleave="resetEffect">
                <img :src="require('@/assets/back-btn.png')" alt="">
              </button>
            </router-link>
          </div>
          <div class="col"></div>
        </div>
      </div>
    </div>
  </template>
  

<style scoped>

  .container {
    text-align: center;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
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
export default {
  methods: {
    hoverEffect() {
    },
    resetEffect() {
    },
  },
};
</script>