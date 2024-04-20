<template>
  <div class="profile-page">
    <div class="car-details-page">
    <div class="text-info">
      <h1>{{ car.make }} {{ car.model }}</h1>
      <p><strong>Valstybinis numeris:</strong> {{ car.license_Plate }}</p>
      <p><strong>Rida:</strong> {{ car.mileage }}</p>
      <p><strong>Pavarų dėžė:</strong> {{ transmission(car.transmission) }}</p>
      <p><strong>Kuro tipas:</strong> {{ fuelType(car.fuel_Type) }}</p>
      <p><strong>Kėbūlo tipas:</strong> {{ bodyType(car.body_Type) }}</p>
      <p><strong>Sėdynių sk.:</strong> {{ car.seats }}</p>
      <p><strong>Būklė:</strong> {{ state(car.state) }}</p>
      <p><strong>Papildoma informacija:</strong> {{ car.extraInfo }}</p>
    </div>
    <div class="car-image">
      <img :src="car.image" alt="Car Image">
      <template v-if="$route.params.type=='rent'">
        <!--give me euro symbol-->
        <p><strong>Kaina terminui:</strong> {{ ad.price }}€</p>
        <p><strong>Užstatas:</strong> {{ ad.deposit }}€</p>
        <p><strong>Terminas:</strong> {{ term(ad.term) }}</p>
        <router-link :to="'/request/new/'+$route.params.id" v-if="ad.author!=account.user.id">Pateikti užklausą</router-link>
      </template>
      <template v-else>
        <p><strong>Kaina:</strong> {{ ad.price }}€</p>
      </template>
    </div>
  </div>
    
    <router-link :to="'/entry/'+$route.params.type+'/edit/'+$route.params.id" v-if="ad.author==account.user.id">Redaguoti</router-link>
    <button v-if="ad.author==account.user.id" @click="deleteAd()">Ištrinti</button>

  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'
import { carService } from '../_services'
import { rentadService } from '../_services';
import { userService } from '../_services'
import { saleadService } from '../_services';
import { requestService } from '../_services';

export default {
  data() {
    return {
      car: {},
      ad: {}
    };
  },
  computed:{
    ...mapState({
            account: state => state.account,
            users: state => state.users.all
        }),
  },
  async created() {
    const data = await this.fetchAdData(this.$route.params.id, this.$route.params.type);
    this.ad = data;
    this.fetchCarData(this.ad.car);
  },
  methods: {
    async fetchAdData(id, type){
      type = type.toLowerCase();
      if(type == 'rent'){
        return rentadService.getById(id);
      }else if(type == 'sale'){
        return saleadService.getById(id);
      }
    },
    fetchCarData(id){
      carService.getById(id).then(car => this.car = car);
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
    term(value){
      switch(value){
        case 'day':
          return 'Diena';
        case 'month':
          return 'Mėnuo';
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
    deleteAd(){
      if(confirm("Ar tikrai norite ištrinti skelbimą?")){
        var type = this.$route.params.type;
        type = type.toLowerCase();
        if(type == 'rent'){
          rentadService.delete(this.$route.params.id);
        }else if(type == 'sale'){
          saleadService.delete(this.$route.params.id);
        }
        this.$router.push('/search/');
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
