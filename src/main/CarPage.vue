<template>
  <div class="profile-page">
    <div class="car-details-page">
    <div class="text-info">
      <h1>{{ car.make }} {{ car.model }}</h1>
      <p><strong>Valstybinis numeris:</strong> {{ car.license_Plate }}</p>
      <p><strong>Gamybos metai:</strong> {{ car.creation_Date }}</p>
      <p><strong>Rida:</strong> {{ car.mileage }}</p>
      <p><strong>Pavarų dėžė:</strong> {{ transmission(car.transmission) }}</p>
      <p><strong>Kuro tipas:</strong> {{ fuelType(car.fuel_Type) }}</p>
      <p><strong>Kebūlo tipas:</strong> {{ bodyType(car.body_Type) }}</p>
      <p><strong>Sėdynių sk.:</strong> {{ car.seats }}</p>
      <p><strong>Būsena:</strong> {{ state(car.state) }}</p>
      <p><strong>Papildoma informacija:</strong> {{ car.description }}</p>
    </div>
    <div class="car-image">
      <img :src="car.image" alt="Automobilio nuotrauka">
    </div>
  </div>
    
    <router-link :to="'/car/edit/'+car.id" v-if="car.owner == account.user.id">Redaguoti</router-link>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'
import { carService } from '../_services'
import { Transmission, FuelType, BodyType, State } from '../_helpers/enums'

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
        })
  },
  async created() {
    this.fetchCarData(this.$route.params.id);
  },
  methods: {
    fetchCarData(id){
      carService.getById(id).then(car => {
        this.car = car;
      });
      console.log(this.car);
    },
    transmission(value) {
      switch(value){
        case 'automatic':
          return 'Automatinė';
        case 'manual':
          return 'Mechaninė';
        default:
            return 'Nežinoma';
      }
    },
    fuelType(value) {
      //Write switch case based on the types in FuelType enum
      switch(value){
        case 'gasoline':
          return 'Benzinas';
        case 'diesel':
          return 'Dyzelis';
        case 'electricity':
          return 'Elektra';
        case 'hydrogen':
          return 'Dujos';
        case 'gasoline_hydrogen':
          return 'Benzinas/Dujos';
        case 'gasoline_electricity':
          return 'Benzinas/Elektra';
        default:
            return 'Nežinomas';
      }
    },
    bodyType(value) {
      switch(value){
        case 'hatchback':
          return 'Hečbekas';
        case 'truck':
          return 'Visureigis';
        case 'pickup':
          return 'Pikapas';
        case 'coupe':
          return 'Kupė';
        case 'cabriolet':
          return 'Kabrioletas';
        case 'sedan':
          return 'Sedanas';
        case 'universal':
          return 'Universalas';
        case 'minivan':
          return 'Vienatūris';
        default:
            return 'Nežinomas';
      }
    },
    state(value) {
      switch(value){
        case 'perfect':
          return 'Be defektų';
        case 'minimal_damage':
          return 'Minimalūs gedimai';
        case 'serious_damage':
          return 'Rimti gedimai';
        case 'totalled':
          return 'Daužtas';
        default:
            return 'Nežinoma';
      }
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
