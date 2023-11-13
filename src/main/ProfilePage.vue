<template>
  <div class="profile-page">
    <h1>Jūsų profilis</h1>
    <div class="user-info">
      <p><strong>Slapyvardis:</strong> {{ account.user.username }}</p>
      <div>
        <span><strong>Balansas:</strong> {{ account.user.balance ? account.user.balance : "0.00€" }}</span>
        <router-link to="/profile/balance">Papildyti</router-link>
      </div>
      <p><strong>Registracijos data:</strong> {{ userRegistrationDate }}</p>
      
      <input 
          v-model="editableUserData.firstName"
          :placeholder="userFirstName"
          :disabled="!editMode">

      <input 
          v-model="editableUserData.lastName"
          :placeholder="userLastName"
          :disabled="!editMode">

      <input
          v-model="editableUserData.email"
          :placeholder="userEmail"
          :disabled="!editMode">

      <input
          v-model="editableUserData.phoneNumber"
          :placeholder="userPhoneNumber"
          :disabled="!editMode">

      <template v-if="!editMode">
          <button @click="editMode = true">Redaguoti</button>
      </template>

      <template v-else>
          <button @click="editMode = false">Išsaugoti pakeitimus</button>
          <button @click="editMode = false">Atšaukti</button>
      </template>
      
    </div>

    <div class="automobiliai-section">
      <h2>Jūsų automobiliai</h2>
      <!-- Display cars here -->
      <router-link to="/profile/car">Markinė Modelinė</router-link>
      <br><br>
      <router-link to="/profile/newcar">Pridėti automobilį</router-link>
    </div>

    <div class="pagalbos-bilietai-section">
      <h2>Jūsų pagalbos bilietai</h2>
      <router-link to="/profile/ticket">Bilietas 1 - Kaip pašalinti skelbimą?</router-link>
    </div>

    <div class="pagalbos-bilietai-section">
      <h2>Jūsų nuomos užklausos</h2>
      <router-link to="/profile/request">Užklausa 1 - Markinė Modelinė</router-link>
    </div>
    

    <br><br>
    <router-link to="/profile/stats">Gauti statistikas</router-link>
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
      editableUserData: {},
      editMode: false
    };
  },
  computed:{
    ...mapState({
            account: state => state.account,
            users: state => state.users.all
        }),
    userFirstName(){
      return this.account.user.firstName ? this.account.user.firstName : "Vardas";
    },
    userLastName(){
      return this.account.user.lastName ? this.account.user.lastName : "Pavardė";
    },
    userRegistrationDate(){
      return this.account.user.registrationDate ? this.account.user.registrationDate : "????-??-??";
    },
    userEmail(){
      return this.account.user.email ? this.account.user.email : "El. paštas";
    },
    userPhoneNumber(){
      return this.account.user.phoneNumber ? this.account.user.phoneNumber : "Telefono nr.";
    }
  },
  methods: {
    updateUserInfo() {
      // Implement user info update logic
    },
    addCar() {
      // Logic to add a car
    },
    getStatistics() {
      // Logic to get statistics
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
