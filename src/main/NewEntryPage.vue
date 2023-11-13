<template>
  <div class="profile-page">
    <h1>Skelbimo kūrimas</h1>
    <form @submit.prevent="createCar">
      <div class="form-group">
        <label for="car-type">Automobilis:</label>
        <select id="car-type" v-model="car.carType" required>
          <option value="first">Markinė modelinė</option>
        </select>
      </div>

      <div class="form-group">
        <label for="gearbox-type">Skelbimo tipas:</label>
        <select id="gearbox-type" v-model="car.gearboxType" required>
          <option value="Rent">Nuoma</option>
          <option value="Sale">Pardavimas</option>
        </select>
      </div>

      <template v-if="car.gearboxType!=='Sale'">
        <div class="form-group">
        <label for="license-plate">Kaina:</label>
        <input id="license-plate" type="number" v-model="car.licensePlate" required>
      </div>

      <div class="form-group">
        <label for="mileage">Užstatas:</label>
        <input id="mileage" type="number" v-model.number="car.mileage" required>
      </div>

      <label for="gearbox-type">Terminas:</label>
        <select id="gearbox-type" v-model="car.fuelType" required>
          <option value="b">Savaitė</option>
          <option value="gasoline">Mėnesis</option>
          <option value="a">Diena</option>
        </select>
      </template>
      <template v-else>
        <div class="form-group">
        <label for="license-plate">Kaina:</label>
        <input id="license-plate" type="number" v-model="car.licensePlate" required>
      </div>
      </template>

      <router-link to="/entry">Skelbimas</router-link>
      <button type="submit">Sukurti skelbimą</button>
    </form>
    
    <router-link to="/profile">Atgal į profilį</router-link>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      car: {
        make: '',
        model: '',
        licensePlate: 0,
        mileage: 0,
        carType: 'first',
        gearboxType: 'Sale',
        fuelType: 'gasoline',
        bodyType: 'hatchback',
        seatCount: 0,
        state: 'perfect',
        extraInfo: ''
      },
      editableCarData: {},
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
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input, select, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
