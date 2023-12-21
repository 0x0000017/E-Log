<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-lg-none d-xl-none d-xxl-none">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Park Hub</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link to="/" class="nav-link"><i class="fas fa-home"></i>Home</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/logs" class="nav-link"><i class="fas fa-file"></i> Logs</router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-parking"></i> Choose Parking Spot</a>
                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                        <li><router-link to="/choose-parking-spot/car"  class="dropdown-item"><i class="fas fa-car"></i> Car</router-link></li>
                        <li><router-link to="/choose-parking-spot/motorcycle"  class="dropdown-item"><i class="fas fa-motorcycle"></i>Motorcycle</router-link></li>
                    </ul>
            </li>
            <li class="nav-item">
                <router-link v-if="!isLoggedIn" to="/login" class="nav-link"><i class="fas fa-user"></i>Login</router-link>
                <a v-if="isLoggedIn" @click="confirmLogout" class="nav-link"><i class="fas fa-right-from-bracket"></i>Logout</a>
            </li>
        </ul>
        </div>
    </div>
</nav>
</template>

<style>
    .navbar {
        color: white;
        background-color: #212529!important;
    }
    .fas {
        padding-right: 1vw;
    }
</style>

<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import Swal from 'sweetalert2';

export default {
    computed: {
      ...mapState(['isLoggedIn']),
      ...mapMutations(['setLoggedIn']),
    },
    methods: {
        confirmLogout() {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You will be logged out!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, log me out!',
            }).then((result) => {
                if (result.isConfirmed) {
                this.logout();
                }
            });
        },
        logout() {
            this.$store.commit('setLoggedIn', false);
            Swal.fire({
                icon: 'success',
                title: 'Logged out',
              });
            this.$router.push('/');
        }
    }
}
</script>