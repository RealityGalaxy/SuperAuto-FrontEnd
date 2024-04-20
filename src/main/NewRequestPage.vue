<template>
  <div class="profile-page">
    <h1>Nauja nuomos užklausa</h1>
    <div class="user-info">
      <p>Pradžios data:</p>
      <input
          type = "date" 
          v-model="request.start_Date">

      <p>Pabaigos data:</p>
      <input 
          type = "date"
          v-model="request.end_Date">    
          
    </div>
    <button @click="createRequest()">Pateikti užklausą</button>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'
import { requestService } from '../_services';
import { carService } from '../_services';
import { rentadService } from '../_services';

export default {
  data() {
    return {
      request: {
        start_Date: Date.now,
        end_Date: Date.now,
        car: -1,
        owner: -1,
        renter: -1
      }
    };
  },
  computed:{
    ...mapState({
            account: state => state.account,
            users: state => state.users.all
        }),
  },
  async created() {
    const ad = await rentadService.getById(parseInt(this.$route.params.id));
    const car = await carService.getById(ad.car);
    this.request.car = car.id;
    this.request.renter = this.account.user.id;
    this.request.owner = car.owner;
  },
  methods: {
    async createRequest(){
      const ad = await rentadService.getById(parseInt(this.$route.params.id));
      const car = await carService.getById(ad.car);
      this.request.car = car.id;
      this.request.owner = car.owner;
      requestService.create(this.request).then(
        request => {
          this.$router.push('/profile');
        },
        error => {
          console.log(error);
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
</style>
