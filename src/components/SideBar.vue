<template>
    <div class="sidebarMenu ">
        <div class="sideBar">
            <div class="logoPanel">
                <img :src="require('@/assets/logo-gc.png')" alt="" class="logo-ph img-fluid mb-5">
                <h1 class="title">Park Hub</h1>
                <hr>
            </div>

            <div class="menuItems"> 
                <div class="list-group list-group-flush">
                    <router-link to="/"  class="list-group-item list-group-item-action"><i class="fas fa-home"></i>Home</router-link>
                    <router-link to="/logs"  class="list-group-item list-group-item-action"><i class="fas fa-file"></i> Logs</router-link>
                    <a href="#" class="list-group-item list-group-item-action" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-parking"></i> Choose Parking Spot</a>
                        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                            <li><router-link to="/choose-parking-spot/car"  class="dropdown-item"><i class="fas fa-car"></i> Car</router-link></li>
                            <li><router-link to="/choose-parking-spot/motorcycle"  class="dropdown-item"><i class="fas fa-motorcycle"></i>Motorcycle</router-link></li>
                        </ul>
                    <router-link v-if="!isLoggedIn" to="/login" class="list-group-item list-group-item-action"><i class="fas fa-user"></i>Login</router-link>
                    <a v-if="isLoggedIn" @click="confirmLogout" class="list-group-item list-group-item-action"><i class="fas fa-right-from-bracket"></i>Logout</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .sidebarMenu {
        max-height: 100%;
        overflow-x: hidden;
    }
    .sideBar {
        height: 100vh;
        background-color: #4C4C4F;
    }
    .logoPanel {
        text-align: center;
    }
    .logo-ph {
        margin-top: 2vw;
    }
    .menuItems {
        padding-left: 1vw;
    }
    .list-group-item {
        background-color: #4C4C4F!important;
        /* border-bottom: none!important; */
        color: white!important;
        cursor: pointer;
    }
    .list-group-item:hover {
        color: black!important;
    }
    .loginBtn {
        height: 10vh;
        margin-top: auto;
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