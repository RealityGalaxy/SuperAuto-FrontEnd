<template>
  <div class="profile-page">
    <h1>Naujas automobilis</h1>
    <form @submit.prevent="createCar">
      <div class="form-group">
        <label for="make">Markė:</label>
        <input id="make" v-model="car.make" required>
      </div>

      <div class="form-group">
        <label for="model">Modelis:</label>
        <input id="model" v-model="car.model" required>
      </div>

      <div class="form-group">
        <label for="license-plate">Valstybinis numeris:</label>
        <input id="license-plate" v-model="car.licensePlate" required>
      </div>

      <div class="form-group">
        <label for="mileage">Rida:</label>
        <input id="mileage" type="number" v-model.number="car.mileage" required>
      </div>

      <div class="form-group">
        <label for="gearbox-type">Pavarų dėžė:</label>
        <select id="gearbox-type" v-model="car.gearboxType" required>
          <option value="Manual">Mechaninė</option>
          <option value="Automatic">Automatinė</option>
        </select>
      </div>

      <div class="form-group">
        <label for="fuel-type">Kuro tipas:</label>
        <select id="fuel-type" v-model="car.fuelType" required>
          <option value="gasoline">Benzinas</option>
          <option value="diesel">Dyzelis</option>
          <option value="gas/electric">Benzinas/Elektra</option>
          <option value="hydrogen">Dujos</option>
          <option value="gasoline/hydrogen">Benzinas/Dujos</option>
          <option value="electric">Elektra</option>
        </select>
      </div>

      <div class="form-group">
        <label for="body-type">Kebūlo tipas:</label>
        <select id="body-type" v-model="car.bodyType" required>
          <option value="hatchback">Hečbekas</option>
          <option value="jeep">Visureigis</option>
          <option value="pickup">Pikapas</option>
          <option value="coupe">Kupė</option>
          <option value="cabriolet">Kabrioletas</option>
          <option value="sedan">Sedanas</option>
          <option value="universal">Universalas</option>
        </select>
      </div>

      <div class="form-group">
        <label for="seat-count">Sėdynių skaičius:</label>
        <input id="seat-count" type="number" v-model.number="car.seatCount" required>
      </div>

      <div class="form-group">
        <label for="state">Būklė:</label>
        <select id="state" v-model="car.state" required>
          <option value="perfect">Be defektų</option>
          <option value="minimal defects">Minimalūs gedimai</option>
          <option value="totaled">Daužta</option>
          <option value="serious problems">Rimti gedimai</option>
        </select>
      </div>

      <div class="form-group">
        <label for="extra-info">Papildoma informacija:</label>
        <textarea id="extra-info" v-model="car.extraInfo"></textarea>
      </div>

      <div class="form-group">
        <label for="car-image">Nuotraukos:</label>
        <input type="file" id="car-image">
      </div>

      <router-link to="/profile/car">Automobilis</router-link>
      <button type="submit">Sukurti automobilį</button>
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
        licensePlate: '',
        mileage: 0,
        gearboxType: 'Manual',
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
