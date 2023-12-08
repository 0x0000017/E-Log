<template>
    <div>
      <div class="container  animate__animated animate__fadeIn ">
        <!-- Your existing content -->
        <div class="row">
          <div class="col"></div>
          <div class="col">
            <img :src="require('@/assets/logo-gc.png')" alt="" class="img-fluid mb-5">
            <h1 class="title">GC PARKING</h1>
            <h2 class="subTitle">Your vehicle is our priority</h2>

            <div v-if="!isLoggedIn">
                <router-link to="/login">
                    <button class="btn btn-primary">GET STARTED</button>
                </router-link>
            </div>

            <div v-else>
                <router-link to="/menu">
                    <button class="btn btn-primary">GET STARTED</button>
                </router-link>
            </div>

          </div>
          <div class="col"></div>
        </div>
      </div>
    </div>
  </template>
  

<script scoped>
    export default {
    data() {
        return {
        loginUsername: '',
        loginPassword: '',
        error: '',
        };
    },
    methods: {
        async login() {
        try {
            const response = await fetch('http://localhost/api/api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: "login",
                username: this.loginUsername,
                password: this.loginPassword,
            }),
            });

            if (response.ok) {
            this.$router.push('/menu');
            } else {
            const errorData = await response.json();
            this.error = errorData.error || 'Invalid username or password';
            }
        } catch (error) {
            console.error('Login failed:', error);
            this.error = 'Login failed. Please try again.';
        }
        },
    },
    };
</script>
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

    .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 50px;
    }

    .form-group {
    margin-bottom: 15px;
    }

    button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    }

    .error-message {
    color: red;
    margin-top: 10px;
    }

    .modal-content {
        background-color: #22222f;
    }
</style>