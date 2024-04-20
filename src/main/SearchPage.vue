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
              <option value="minimal_damage">Minimalūs gedimai</option>
              <option value="totalled">Daužta</option>
              <option value="serious_damage">Rimti gedimai</option>
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
      <div v-for="ad in filteredAds" :key="ad.carObj.id+'-'+ad.id" class="car-item">
        <img :src="ad.carObj.image" alt="Car Image" class="car-image">
        <div class="car-info">
          <h3>
      <router-link :to="'/entry/'+ad.type+'/'+ad.id">{{ ad.carObj.make }} {{ ad.carObj.model }}</router-link></h3>
          <p>Kaina: {{ ad.price }}€</p>
          <p v-if="ad.type =='rent'">Užstatas {{ ad.deposit }}€</p>
          <p>{{ ad.carObj.mileage }} km - {{ ad.carObj.creation_Date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'
import { rentadService, saleadService } from '../_services';
import { carService } from '../_services';

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
      allAds: [],
      filteredAds: []
    };
  },
  computed:{
    ...mapState({
            account: state => state.account,
            users: state => state.users.all
        }),
  },
  async created() {
    await this.getAds();
    this.filteredAds = [...this.allAds];
    console.log(this.filteredAds);
  },
  methods: {
    async getAds(){
      var gottenAds = [];
      const cars = await carService.getAll();
      await rentadService.getAll().then(ads => {
        ads.forEach(ad => {
          ad.type = 'rent';
          ad.carObj = cars.find(car => car.id === ad.car);
        });
        gottenAds = ads;
      });
      await saleadService.getAll().then(ads => {
        ads.forEach(ad => {
          ad.type = 'sale';
          ad.carObj = cars.find(car => car.id === ad.car);
        });
        gottenAds = gottenAds.concat(ads);
      });
      for(var i = 0; i < gottenAds.length; i++){
        this.allAds.push(gottenAds[i]);
      }
    },
    applyFilters(){
      this.filteredAds = this.allAds.filter(ad => {
        var result = true;
        if(this.filters.make !== ''){
          result = result && ad.carObj.make.toLowerCase().includes(this.filters.make.toLowerCase());
        }
        if(this.filters.model !== ''){
          result = result && ad.carObj.model.toLowerCase().includes(this.filters.model.toLowerCase());
        }
        if(this.filters.licensePlate !== ''){
          result = result && ad.carObj.license_Plate.toLowerCase().includes(this.filters.licensePlate.toLowerCase());
        }
        if(this.filters.mileage !== null){
          result = result && ad.carObj.mileage <= this.filters.mileage;
        }
        if(this.filters.gearboxType !== ''){
          result = result && ad.carObj.gearbox_Type.toLowerCase().includes(this.filters.gearboxType.toLowerCase());
        }
        if(this.filters.fuelType !== ''){
          result = result && ad.carObj.fuel_Type.toLowerCase().includes(this.filters.fuelType.toLowerCase());
        }
        if(this.filters.bodyType !== ''){
          result = result && ad.carObj.body_Type.toLowerCase().includes(this.filters.bodyType.toLowerCase());
        }
        if(this.filters.seatCount !== null){
          result = result && ad.carObj.seat_Count <= this.filters.seatCount;
        }
        if(this.filters.state !== ''){
          result = result && ad.carObj.state.toLowerCase().includes(this.filters.state.toLowerCase());
        }
        if(this.filters.minPrice !== null){
          result = result && ad.price >= this.filters.minPrice;
        }
        if(this.filters.maxPrice !== null){
          result = result && ad.price <= this.filters.maxPrice;
        }
        return result;
      });
      this.showFilterPopup = false;
      this.resetFilterValues();
    },
    resetFilterValues(){
      this.filters = {
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
      };
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
