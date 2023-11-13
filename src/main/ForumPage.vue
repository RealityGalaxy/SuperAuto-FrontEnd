<template>
  <div class="car-listing-page">
    <router-link to="/forum/newpost">Naujas įrašas</router-link>

    <div class="car-list">
      <div v-for="car in cars" :key="car.id" class="car-item">
        <div class="car-info">
          <h3>
      <router-link to="/forum/post">{{ car.make }}</router-link></h3>
          <p>Autorius: {{ car.price }}</p>
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
          make:'Kap pastaisyti dusliarkią?',
          model:'Modelinė',
          price:'piatras',
          mileage:'man niaisku'
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
