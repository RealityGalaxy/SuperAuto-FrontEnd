<template>
  <div class="profile-page">
    <h1>Jūsų profilis</h1>
    <div class="user-info">
      <p><strong>Slapyvardis:</strong> {{ userData.username }}</p>
      <p><strong>Registracijos data:</strong> {{ userData.registrationDate }}</p>
      
      <input 
          v-model="editableUserData.firstName"
          :placeholder="userData.firstName"
          :disabled="!editMode">

      <input 
          v-model="editableUserData.lastName"
          :placeholder="userData.lastName"
          :disabled="!editMode">

      <input
          v-model="editableUserData.email"
          :placeholder="userData.email"
          :disabled="!editMode">

      <input
          v-model="editableUserData.phoneNumber"
          :placeholder="userData.phoneNumber"
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
      <button @click="newCar()">Add Car</button>
    </div>

    <div class="pagalbos-bilietai-section">
      <h2>Jūsų pagalbos bilietai</h2>
      <!-- Display tickets here -->
    </div>
    <button @click="getStatistics()">Gauti statistikas</button>
  </div>
</template>

<script>
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

<style>
/* Add your CSS styling here */
.profile-page {
  /* Styles for the profile page */
}
.user-info, .edit-user-info, .automobiliai-section, .pagalbos-bilietai-section {
  /* Styles for the different sections */
}
</style>
