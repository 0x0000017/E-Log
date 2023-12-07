<template>
    <div>
      <div class="container">
        <div class="row">
            <div class="col"></div>
            <div class="col">
                <img :src="require('@/assets/logo-gc.png')" alt="" class="img-fluid mb-5">
                <h1 class="title">GC PARKING</h1>
                <h2 class="subTitle">Your vehicle is our priority</h2>
                    <router-link to="/menu" class="animate__animated animate__fadeIn animate__delay-1s">
                        <button class="btn btn-primary">GET STARTED</button>
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
    }

    .btn {
        background-color: #B0B3C9;
        margin-top: 15vw;
        border-radius: 20px;
        border: none;
        padding-top: 1vw;
        padding-bottom: 1vw;
        padding-left: 20vw;
        padding-right: 20vw;
        color: #000;
        font-size: 1.2rem;
        letter-spacing: 5px;
        font-weight: 700;
    }
    .btn:hover {
        background-color: #393B53;
    }

    .subTitle {
        font-weight: 300;
    }
    
    .title {
        font-size: 50px;
    }
</style>