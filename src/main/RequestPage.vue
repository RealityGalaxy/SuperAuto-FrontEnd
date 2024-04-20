<template>
  <div class="profile-page">
    <h1>Nuomos užklausa</h1>
    <div class="user-info">
      <!--this is the display for the data in the request-->
      <p>Pradžios data: {{ request.start_Date.substring(0, 10) }}</p>
      <p>Pabaigos data: {{ request.end_Date.substring(0, 10) }}</p>
      <p>Automobilis: {{ request.car.make }} {{ request.car.model }}</p>
      <p>Savininkas: {{ request.ownerName }}</p>
      <p>Nuomininkas: {{ request.renterName }}</p>
      <p>Būsena: {{ statusR(request.status, request.owner) }}</p>
    </div>
    <button v-if="account.user.id==request.owner && request.status == 'created'" @click="approveReq()">Patvirtinti užklausą</button>
    <button v-if="account.user.id==request.owner && request.status == 'created'" @click="rejectReq()">Atmesti užklausą</button>
    <router-link to="/profile">Atgal į profilį</router-link>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'
import { requestService } from '../_services';
import { carService } from '../_services';
import { userService } from '../_services';

export default {
  data() {
    return {
      request: {
        start_Date: '',
        end_Date: '',
        car: -1,
        owner: -1,
        renter: -1,
        ownerId: -1
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
    this.getRequestData();
  },
  methods: {
    async getRequestData(){
      const req = await requestService.getById(this.$route.params.id);
      const car = await carService.getById(req.car);
      var request = {};
      this.request.car = car;
      this.request.owner = req.owner;
      const owner = await userService.getById(req.owner);
      this.request.ownerName = owner.username + " - " + owner.firstName + " " + owner.lastName;
      const renter = await userService.getById(req.renter);
      this.request.renterName = renter.username + " - " + renter.firstName + " " + renter.lastName;
      this.request.start_Date = req.start_Date;
      this.request.end_Date = req.end_Date;
      this.request.status = req.status;
      this.request.id = req.id;
    },
    statusR(s, owner){
      switch(s){
        case 'created':
          return owner == this.account.user.id ? "Gauta" : "Išsiųsta";
        case 'accepted':
          return "Priimta";
        case 'denied':
          return "Atmesta";
      }
    },
    async approveReq(){
      var toUpd = {
        id: this.request.id,
        status: "accepted"
      }
      await requestService.update(toUpd);
      this.$router.push('/profile');
    },
    async rejectReq(){
      var toUpd = {
        id: this.request.id,
        status: "denied"
      }
      await requestService.update(toUpd);
      this.$router.push('/profile');
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
