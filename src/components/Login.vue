<template>

    <div v-if="!isLoggedIn" class="container  animate__animated animate__fadeIn ">
      <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="loginUsername" class="form-label">Username:</label>
          <input v-model="loginUsername" type="text" class="form-control" id="loginUsername" required>
        </div>
        <div class="mb-3">
          <label for="loginPassword" class="form-label">Password:</label>
          <input v-model="loginPassword" type="password" class="form-control" id="loginPassword" required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
    </div>

    <div v-else class="bypassLogin">
      <div class="center-container">
        <p style="font-size: 1.2rem; font-weight: 700;">Click
          <router-link to="/menu" @click="redirectToLogin">here
          </router-link> to access the main menu.</p>
      </div>
    </div>

  </template>
  
<script scoped>
import { mapState } from 'vuex';
import Swal from 'sweetalert2';
import { mapMutations } from 'vuex';

  export default {
    data() {
        return {
        loginUsername: '',
        loginPassword: '',
        error: '',
        };
    },
    methods: {
        ...mapMutations(['setLoggedIn']),
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
              this.setLoggedIn(true);
              await Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'Redirecting ...',
              });
            this.$router.push('/');
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
    computed: {
      ...mapState(['isLoggedIn']),
    }
  };
</script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
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

  .bypassLogin {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .center-container {
    text-align: center;
  }

  @media screen and  (max-width: 768px) {
    .login-container {
      margin-top: 20vw;
    }
  }
  </style>
  