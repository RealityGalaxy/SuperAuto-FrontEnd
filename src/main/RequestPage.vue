<template>
  <div class="profile-page">
    <h1>Nuomos užklausa</h1>
    <div class="user-info">
      <p>Pradžios data: 2023-12-01</p>
      <p>Pabaigos data: 2023-12-14</p>
      <p>Terminas: savaitinis</p>
      <p>Kaina: 120</p>
          
    </div>
    <button @click="getStats()">Patvirtinti užklausą</button>
    <button @click="getStats()">Atmesti užklausą</button>
    <router-link to="/profile/newrequest">Redaguoti</router-link>
    <br>
    <router-link to="/profile">Atgal į profilį</router-link>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      userData: {
        // Fetch or initialize user data here
      },
      balanceUpdateInfo: {}
    };
  },
  computed:{
    ...mapState({
            account: state => state.account,
            users: state => state.users.all
        }),
  },
  methods: {
    getStats() {
      // Implement user info update logic
    }
  },
  async created() {
    // Fetch user data on component creation
    this.userData = await this.fetchUserData();
    this.editableUserData = { ...this.userData };
  },
  methods: {
    fetchUserData() {
      // Fetch user data from API or store
    },
    addCar() {
          //Route to add car page
          
    }
  }
};
</script>

<style scoped>
/* Add your CSS styling here */
.profile-page {
  /* Styles for the profile page */
}
.user-info, .edit-user-info, .automobiliai-section, .pagalbos-bilietai-section {
  /* Styles for the different sections */
}
</style>
