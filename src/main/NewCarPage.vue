<template>
  <div class="profile-page">
    <h1>{{ $route.params.id ? "Automobilio redagavimas" : "Naujas automobilis" }}</h1>
    <form @submit.prevent="createCar">
      <div class="form-group">
        <label for="make">Markė:</label>
        <input id="make" v-model="car.Make" required>
      </div>

      <div class="form-group">
        <label for="model">Modelis:</label>
        <input id="model" v-model="car.Model" required>
      </div>

      <div class="form-group">
        <label for="year">Metai:</label>
        <select id="year" v-model="car.Creation_Date" required>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="license-plate">Valstybinis numeris:</label>
        <input id="license-plate" v-model="car.License_Plate" required>
      </div>

      <div class="form-group">
        <label for="mileage">Rida:</label>
        <input id="mileage" type="number" v-model.number="car.Mileage" required>
      </div>

      <div class="form-group">
        <label for="gearbox-type">Pavarų dėžė:</label>
        <select id="gearbox-type" v-model="car.Transmission" required>
          <option value="manual">Mechaninė</option>
          <option value="automatic">Automatinė</option>
        </select>
      </div>

      <div class="form-group">
        <label for="fuel-type">Kuro tipas:</label>
        <select id="fuel-type" v-model="car.Fuel_Type" required>
          <option value="gasoline">Benzinas</option>
          <option value="diesel">Dyzelis</option>
          <option value="gasoline_electricity">Benzinas/Elektra</option>
          <option value="hydrogen">Dujos</option>
          <option value="gasoline_hydrogen">Benzinas/Dujos</option>
          <option value="electricity">Elektra</option>
        </select>
      </div>

      <div class="form-group">
        <label for="body-type">Kebūlo tipas:</label>
        <select id="body-type" v-model="car.Body_Type" required>
          <option value="hatchback">Hečbekas</option>
          <option value="truck">Visureigis</option>
          <option value="pickup">Pikapas</option>
          <option value="coupe">Kupė</option>
          <option value="cabriolet">Kabrioletas</option>
          <option value="sedan">Sedanas</option>
          <option value="universal">Universalas</option>
          <option value="minivan">Vienatūris</option>
        </select>
      </div>

      <div class="form-group">
        <label for="seat-count">Sėdynių skaičius:</label>
        <input id="seat-count" type="number" v-model.number="car.Seats" required>
      </div>

      <div class="form-group">
        <label for="state">Būklė:</label>
        <select id="state" v-model="car.State" required>
          <option value="perfect">Be defektų</option>
          <option value="minimal_damage">Minimalūs gedimai</option>
          <option value="totalled">Daužta</option>
          <option value="serious_damage">Rimti gedimai</option>
        </select>
      </div>

      <div class="form-group">
        <label for="extra-info">Papildoma informacija:</label>
        <textarea id="extra-info" v-model="car.Description"></textarea>
      </div>

      <div class="form-group">
        <label for="car-image">Nuotraukos:</label>
        <input type="file" id="car-image">
      </div>
      <button type="submit">{{ $route.params.id ? "Atnaujinti duomenis" : "Sukurti automobilį" }}</button>
    </form>
    
    <router-link :to="'/card/'+$route.params.id" v-if="$route.params.id">Atgal į automobilį</router-link>
    <router-link to="/profile" v-else>Atgal į profilį</router-link>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'
import { carService } from '../_services'

export default {
  data() {
    return {
      car: {
        Make: '',
        Model: '',
        License_Plate: '',
        Mileage: 0,
        Creation_Date: 1984,
        Transmission: 'manual',
        Owner: 0,
        Fuel_Type: 'gasoline',
        Body_Type: 'hatchback',
        Seats: 0,
        State: 'perfect',
        Description: ''
      },
      years: []
    };
  },
  computed:{
    ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
  },
  async created() {
      this.populateYears();
      if(this.$route.params.id){
        this.fetchCarData(this.$route.params.id);
      }
  },
  methods: {
    fetchCarData() {
      carService.getById(this.$route.params.id).then(car => {
        this.car.Make = car.make;
        this.car.Model = car.model;
        this.car.License_Plate = car.license_Plate;
        this.car.Mileage = car.mileage;
        this.car.Creation_Date = car.creation_Date;
        this.car.Transmission = car.transmission;
        this.car.Fuel_Type = car.fuel_Type;
        this.car.Body_Type = car.body_Type;
        this.car.Seats = car.seats;
        this.car.State = car.state;
        this.car.Description = car.description;
      });
    },
    populateYears() {
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 1980; year--) {
            this.years.push(year);
        }
    },
    async basicUpload(params) {  
  const baseUrl  = 'https://api.bytescale.com';
  const path     = `/v2/accounts/${params.accountId}/uploads/binary`;
  const entries  = obj => Object.entries(obj).filter(([,val]) => (val !== undefined && val !== null));
  const query = entries(params.querystring || {})
                 .flatMap(([k, v]) => Array.isArray(v) ? v.map(v2 => [k, v2]) : [[k, v]])
                 .map(kv => kv.join("=")).join("&");
  const response = await fetch(`${baseUrl}${path}${query.length > 0 ? "?" : ""}${query}`, {
    method: "POST",
    body: params.requestBody,
    headers: Object.fromEntries(entries({
      "Authorization": `Bearer ${params.apiKey}`,
      "X-Upload-Metadata": JSON.stringify(params.metadata)
    }))
  });
  const result = await response.json();
  if (Math.floor(response.status / 100) !== 2)
    throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`);
  return result;
},
    async createCar() {
      // Only if there is image
      if(document.getElementById('car-image').files[0]){
        const imageFile = document.getElementById('car-image').files[0];
      const data = await this.basicUpload({
        accountId: 'FW25bok',
        apiKey: 'public_FW25bokGKW26bw7V23ezvnDruxpF',
        requestBody: new Blob([imageFile], { type: imageFile.type }),
        });
      this.car.Image = data.fileUrl;
      }
      this.car.Owner = this.account.user.id;
      if(this.$route.params.id){
        this.car.Id = parseInt(this.$route.params.id);
        carService.update(this.car);
        this.$router.push('/car/'+this.$route.params.id);
      }
      else{
        const car = await carService.create(this.car);
        this.$router.push('/car/'+car.id);
      }
    },
    
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
