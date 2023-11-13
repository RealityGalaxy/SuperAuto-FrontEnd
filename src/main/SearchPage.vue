<template>
  <div class="car-listing-page">
    <button @click="showFilterPopup = true">Filtruoti</button>

    <div v-if="showFilterPopup" class="filter-popup">
      <div class="filter-content">
        <h2>Filtruoti autombilius</h2>
        <form @submit.prevent="applyFilters">
          <!-- Make -->
          <div class="form-group">
            <label for="filter-make">Markė:</label>
            <input id="filter-make" v-model="filters.make">
          </div>

          <!-- Model -->
          <div class="form-group">
            <label for="filter-model">Modelis:</label>
            <input id="filter-model" v-model="filters.model">
          </div>

          <!-- Mileage -->
          <div class="form-group">
            <label for="filter-mileage">Rida:</label>
            <input id="filter-mileage" type="number" v-model.number="filters.mileage">
          </div>

          <!-- Gearbox Type -->
          <div class="form-group">
            <label for="filter-gearbox-type">Pavarų dėžė:</label>
            <select id="filter-gearbox-type" v-model="filters.gearboxType">
              <option value="">-</option>
              <option value="Manual">Mechaninė</option>
              <option value="Automatic">Automatinė</option>
            </select>
          </div>

          <!-- Fuel Type -->
          <div class="form-group">
            <label for="filter-fuel-type">Kuro tipas:</label>
            <select id="filter-fuel-type" v-model="filters.fuelType">
              <option value="">-</option>
              <option value="gasoline">Benzinas</option>
              <option value="diesel">Dyzelis</option>
              <option value="gas/electric">Benzinas/Elektra</option>
              <option value="hydrogen">Dujos</option>
              <option value="gasoline/hydrogen">Benzinas/Dujos</option>
              <option value="electric">Elektra</option>
            </select>
          </div>

          <!-- Body Type -->
          <div class="form-group">
            <label for="filter-body-type">Kėbulo tipas:</label>
            <select id="filter-body-type" v-model="filters.bodyType">
              <option value="">-</option>
              <option value="hatchback">Hečbekas</option>
              <option value="jeep">Visureigis</option>
              <option value="pickup">Pikapas</option>
              <option value="coupe">Kupė</option>
              <option value="cabriolet">Kabrioletas</option>
              <option value="sedan">Sedanas</option>
              <option value="universal">Universalas</option>
            </select>
          </div>

          <!-- Seat Count -->
          <div class="form-group">
            <label for="filter-seat-count">Sėdynių sk.:</label>
            <input id="filter-seat-count" type="number" v-model.number="filters.seatCount">
          </div>

          <!-- State -->
          <div class="form-group">
            <label for="filter-state">Būsena:</label>
            <select id="filter-state" v-model="filters.state">
              <option value="">-</option>
              <option value="perfect">Be defektų</option>
              <option value="minimal defects">Minimalūs gedimai</option>
              <option value="totaled">Daužta</option>
              <option value="serious problems">Rimti gedimai</option>
            </select>
          </div>

          <!-- Price Range -->
          <div class="form-group">
            <label for="filter-price-min">Kainos:</label>
            <input id="filter-price-min" type="number" placeholder="Nuo" v-model.number="filters.minPrice">
            <input id="filter-price-max" type="number" placeholder="Iki" v-model.number="filters.maxPrice">
          </div>

          <button type="submit">Pritaikyti filtrus</button>
          <button @click="showFilterPopup = false">Uždaryti</button>
        </form>
      </div>
    </div>

    <div class="car-list">
      <div v-for="car in cars" :key="car.id" class="car-item">
        <img :src="car.imageUrl" alt="Car Image" class="car-image">
        <div class="car-info">
          <h3>
      <router-link to="/entry">{{ car.make }} {{ car.model }}</router-link></h3>
          <p>Kaina: {{ car.price }}</p>
          <p>{{ car.mileage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      showFilterPopup: false,
      filters: {
        make: '',
        model: '',
        licensePlate: '',
        mileage: null,
        gearboxType: '',
        fuelType: '',
        bodyType: '',
        seatCount: null,
        state: '',
        minPrice: null,
        maxPrice: null
      },
      cars: [
        {
          imageUrl: 'https://static8.depositphotos.com/1010338/960/i/950/depositphotos_9600579-stock-photo-man-driving-imaginary-car.jpg',
          make:'Markinė',
          model:'Modelinė',
          price:'-0.0€',
          mileage:'50000 km'
        }
      ], // This should be fetched from your data source
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
    updateBalance() {
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
.car-listing-page {
  position: relative;
}

.filter-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.car-list {
  display: flex;
  flex-direction: column;
}

.car-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.car-image {
  width: 100px;
  height: auto;
  margin-right: 15px;
}

.car-info h3 {
  margin: 0;
  margin-bottom: 5px;
}
</style>
