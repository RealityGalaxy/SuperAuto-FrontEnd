<template>
  <div class="profile-page">
    <h1>{{ $route.params.id ? "Skelbimo redagavimas" : "Skelbimo kūrimas" }}</h1>
    <form @submit.prevent="createAd">
      <div class="form-group">
        <label for="car-type">Automobilis:</label>
        <select id="car-type" v-model="ad.car" required :disabled="$route.params.id">
          <option v-for="car in cars" :key="car.id" :value="car.id">{{ car.make }} {{ car.model }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="gearbox-type">Skelbimo tipas:</label>
        <select id="gearbox-type" v-model="ad.type" required :disabled="$route.params.id">
          <option value="Rent">Nuoma</option>
          <option value="Sale">Pardavimas</option>
        </select>
      </div>

      <template v-if="ad.type!=='Sale'">
        <label for="gearbox-type">Terminas:</label>
        <select id="gearbox-type" v-model="ad.term" required>
          <option value="month">Mėnesis</option>
          <option value="day">Diena</option>
        </select>

        <div class="form-group">
        <label for="license-plate">Kaina terminui:</label>
        <input id="license-plate" type="number" v-model.number="ad.price" required>
      </div>

      <div class="form-group">
        <label for="mileage">Užstatas:</label>
        <input id="mileage" type="number" v-model.number="ad.deposit" required>
      </div>

      
      </template>
      <template v-else>
        <div class="form-group">
        <label for="license-plate">Kaina:</label>
        <input id="license-plate" type="number" v-model.number="ad.price" required>
      </div>
      </template>

      <!--I need a space here that displays the users current balance, and also input for how many days they want the ad to last, showing the price it will cost to host it, the price is 0.2 per day-->
      <div class="form-group">
        <label for="mileage">Skelbimo galiojimo dienų skaičius:</label>
        <input id="mileage" type="number" v-model.number="ad.days" required :disabled="$route.params.id">
      </div>

      <div class="form-group" v-if="!$route.params.id">
        <p>Turimas balansas: {{ (account.user.balance).toFixed(2) }}</p>
        <p>Skelbimo kaina: {{ (ad.days * 0.2).toFixed(2) }}</p>
        <p>Likutis po skelbimo: {{ (account.user.balance - ad.days * 0.2).toFixed(2) }}</p>
      </div>

      <button type="submit">{{ $route.params.id ? "Atnaujinti skelbimą" : "Sukurti skelbimą" }}</button>
    </form>
    
    <router-link :to="'/entry/'+ad.type+'/'+$route.params.id" v-if="$route.params.id">Atgal į skelbimą</router-link>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'
import { carService } from '../_services';
import { saleadService } from '../_services';
import { rentadService } from '../_services';
import { billService } from '../_services';
import { userService } from '../_services';

export default {
  data() {
    return {
      ad:{
          car: '',
          type: 'Sale',
          term: 'day',
          price: 0.0,
          deposit: 0.0,
          days: 0
        },
        cars: []
    };
  },
  computed:{
    ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
  },
  async created() {
    this.getCars();
    if(this.$route.params.id){
      this.fetchAdData(this.$route.params.id, this.$route.params.type);
    }
  },
  methods: {
    getCars(){
      carService.getAll().then(cars => {
        this.cars = cars.filter(car => car.owner === this.account.user.id);
      });
    },
    fetchAdData(id, type){
      if(type === 'Sale'){
        saleadService.getById(id).then(ad => {
          this.ad = ad;
          this.ad.type = 'Sale';
        });
      }else{
        rentadService.getById(id).then(ad => {
          this.ad = ad;
          this.ad.type = 'Rent';
        });
      }
    },
    createAd(){
      if(((this.account.user.balance - this.ad.days * 0.2 >= 0 && this.ad.days > 0) || !!this.$route.params.id) && this.ad.price >= 0 && this.ad.deposit >= 0 && this.ad.car !== ''){
        if(this.ad.type === 'Sale'){
          var toAdd = {
          Car: this.ad.car,
          Price: this.ad.price,
          Days: this.ad.days,
          Author: this.account.user.id
        };
          //separate update from create
          if(this.$route.params.id){
            toAdd.id = parseInt(this.$route.params.id);
            saleadService.update(toAdd).then(
              res => {
                this.$router.push('/entry/sale/'+res.id);
              },
              error => {
                this.error = error;
                this.loading = false;
              }
            );
            return;
          }
          saleadService.create(toAdd).then(
            res => {
              this.updateBalance(this.ad.days * 0.2);
              this.$router.push('/entry/sale/'+res.id);
            },
            error => {
              this.error = error;
              this.loading = false;
            }
          );
        }else{
          var toAdd = {
          Car: this.ad.car,
          Term: this.ad.term,
          Price: this.ad.price,
          Deposit: this.ad.deposit,
          Days: this.ad.days,
          Author: this.account.user.id
        };
          //separate update from create
          if(this.$route.params.id){
            toAdd.id = parseInt(this.$route.params.id);
            rentadService.update(toAdd).then(
              res => {
                this.$router.push('/entry/rent/'+res.id);
              },
              error => {
                this.error = error;
                this.loading = false;
              }
            );
            return;
          }

          rentadService.create(toAdd).then(
            res => {
              this.updateBalance(this.ad.days * 0.2);
              var bill = {
                payer: this.account.user.id,
                sum: this.ad.days * 0.2,
                type: 'ad'
              }
              billService.create(bill);
              this.$router.push('/entry/rent/'+res.id);
            },
            error => {
              this.error = error;
              this.loading = false;
            }
          );
        }
      } else {
        alert("Neteisingi duomenys arba nepakanka lėšų");
      }
    },
    updateBalance(amount) {
      userService.update({id: this.account.user.id, balance: this.account.user.balance-amount})
          .then(
              () => {
                  this.account.user.balance -= amount;
                  localStorage.setItem('user', JSON.stringify(this.account.user));
              },
              error => {
                  this.error = error;
                  this.loading = false;
              }
          );
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
