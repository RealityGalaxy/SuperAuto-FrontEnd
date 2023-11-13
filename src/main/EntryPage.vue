<template>
  <div class="profile-page">
    <div class="car-details-page">
    <div class="text-info">
      <h1>{{ car.make }} {{ car.model }}</h1>
      <p><strong>Valstybinis numeris:</strong> {{ car.licensePlate }}</p>
      <p><strong>Rida:</strong> {{ car.mileage }}</p>
      <p><strong>Pavarų dėžė:</strong> {{ car.gearboxType }}</p>
      <p><strong>Kuro tipas:</strong> {{ car.fuelType }}</p>
      <p><strong>Kebūlo tipas:</strong> {{ car.bodyType }}</p>
      <p><strong>Sėdynių sk.:</strong> {{ car.seatCount }}</p>
      <p><strong>Būklė:</strong> {{ car.state }}</p>
      <p><strong>Papildoma informacija:</strong> {{ car.extraInfo }}</p>
    </div>
    <div class="car-image">
      <img :src="car.imageUrl" alt="Car Image">
      <p><strong>Kaina:</strong> -0.0€</p>
      <router-link to="/profile/newrequest">Pateikti užklausą</router-link>
    </div>
  </div>
    
    <router-link to="/profile/newcar">Redaguoti</router-link>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      car: {
        // Example car data, replace with real data
        make: 'Markinė',
        model: 'Modelinė',
        licensePlate: 'ABC123',
        mileage: '50000',
        gearboxType: 'Automatinė',
        fuelType: 'Vaizduotė',
        bodyType: 'Betūrė',
        seatCount: 1,
        state: 'Betkokia',
        extraInfo: 'Kuriasi ir važiuoja',
        imageUrl: 'https://static8.depositphotos.com/1010338/960/i/950/depositphotos_9600579-stock-photo-man-driving-imaginary-car.jpg' // Replace with actual image path
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
.car-details-page {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
}

.text-info {
  flex: 1;
  max-width: 50%;
}

.car-image {
  flex: 1;
  max-width: 50%;
}

.car-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
