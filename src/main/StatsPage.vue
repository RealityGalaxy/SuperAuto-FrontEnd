<template>
  <div class="profile-page">
    <h1>Jūsų statistikos</h1>
    <div class="user-info">
      <p>Pradžios data:</p>
      <input
          type = "date" 
          v-model="stats.startDate">

      <p>Pabaigos data:</p>
      <input 
          type = "date"
          v-model="stats.endDate">    
          
    </div>
    <button @click="getStats()">Gauti statistikas</button>
    <router-link to="/profile">Atgal į profilį</router-link>
    <!--Create <p> displays for everything a user could have done on the website-->
    <!--For example:-->
    <p>Automobiliai: {{ stats.carsUploaded }}</p>
    <p>Nuomos skelbimai: {{ stats.rentAdsUploaded }}</p>
    <p>Pardavimo skelbimai: {{ stats.saleAdsUploaded }}</p>
    <p>Gautos nuomos užklausos: {{ stats.rentRequestsReceived }}</p>
    <p>Siųstos nuomos užklausos: {{ stats.rentRequestsSent }}</p>
    <p>Užklausos pagalbos skyriui: {{ stats.helpTickets }}</p>
    <p>Įrašai forume: {{ stats.posts }}</p>
    <p>Komentarai: {{ stats.comments }}</p>

  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'
import { userService } from '../_services';
import { carService } from '../_services';
import { rentadService } from '../_services';
import { saleadService } from '../_services';
import { requestService } from '../_services';
import { ticketService } from '../_services';
import { postService } from '../_services';
import { commentService } from '../_services';



export default {
  data() {
    return {
      stats: {
        startDate: '',
        endDate: '',
        carsUploaded: 0,
        rentAdsUploaded: 0,
        saleAdsUploaded: 0,
        rentRequestsReceived: 0,
        rentRequestsSent: 0,
        helpTickets: 0,
        posts: 0,
        comments: 0
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
    
  },
  methods: {
    async getStats() {
  const start = new Date(this.stats.startDate);
  const end = new Date(this.stats.endDate);
  console.log(start);
  console.log(end);

  const cars = await carService.getAll();
  this.stats.carsUploaded = cars.filter(car => car.owner == this.account.user.id).length;

  const rentAds = await rentadService.getAll();
  this.stats.rentAdsUploaded = rentAds.filter(ad => {
    const creationDate = new Date(ad.creation_Date);
    return ad.author == this.account.user.id && creationDate >= start && creationDate <= end;
  }).length;

  const saleAds = await saleadService.getAll();
  this.stats.saleAdsUploaded = saleAds.filter(ad => {
    const creationDate = new Date(ad.creation_Date);
    return ad.author == this.account.user.id && creationDate >= start && creationDate <= end;
  }).length;

  const requests = await requestService.getAll();
  this.stats.rentRequestsReceived = requests.filter(req => {
    const creationDate = new Date(req.start_Date);
    return req.owner == this.account.user.id && creationDate >= start && creationDate <= end;
  }).length;
  this.stats.rentRequestsSent = requests.filter(req => {
    const creationDate = new Date(req.start_Date);
    return req.renter == this.account.user.id && creationDate >= start && creationDate <= end;
  }).length;

  const tickets = await ticketService.getAll();
  this.stats.helpTickets = tickets.filter(ticket => {
    const creationDate = new Date(ticket.creation_Date);
    console.log(creationDate);
    return ticket.author == this.account.user.id && creationDate >= start && creationDate <= end;
  }).length;

  const posts = await postService.getAll();
  this.stats.posts = posts.filter(post => {
    const creationDate = new Date(post.creation_Date);
    return post.authorId == this.account.user.id && creationDate >= start && creationDate <= end;
  }).length;

  const comments = await commentService.getAll();
  this.stats.comments = comments.filter(comment => {
    const creationDate = new Date(comment.creation_Date);
    return comment.authorId == this.account.user.id && creationDate >= start && creationDate <= end;
  }).length;

  console.log(this.stats);
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
