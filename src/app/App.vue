<template>
    <div>
      <navbar v-if="isLoggedIn"></navbar>
      <div class="jumbotron">
        <div class="container">
          <div class="row">
            <div class="col-sm-6 offset-sm-3">
              <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import Navbar from '../components/Navbar.vue'
  import { userInfo } from 'os';
 
  export default {
    name: 'app',

    components: {
      Navbar
    },
    computed: {
      ...mapState({
        alert: state => state.alert,
      }),
      ...mapGetters({
         isLoggedIn: 'account/isLoggedIn'
      })
    },
    methods: {
      ...mapActions({
        clearAlert: 'alert/clear'
      })
    },
    watch: {
      $route(to, from) {
        // clear alert on location change
        this.clearAlert();
      }
    }
  };
  </script>
  