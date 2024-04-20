<template>
  <div class="profile-page">
    <h1>Jūsų profilis</h1>
    <div class="user-info">
      <p><strong>Slapyvardis:</strong> {{ account.user.username }}</p>
      <div v-if="account.user.type != 'admin'">
        <span><strong>Balansas:</strong> {{ account.user.balance ? account.user.balance : "0.00" }}€</span>
        <router-link to="/profile/balance">Papildyti</router-link>
      </div>
      <p><strong>Registracijos data:</strong> {{ account.user.creation_Date.substring(0,10) }}</p>
      
      <div>
        <span>Vardas:</span>
        <template v-if="!editMode">
          <span>{{ userFirstName }} {{ userLastName }}</span>
        </template>
        <template v-else>
          <input
            v-model="editableUserData.firstName"
            placeholder="Vardas"
          >
          <input
            v-model="editableUserData.lastName"
            placeholder="Pavardė"
          >
        </template>
      </div>
    
      <div>
        <span>El. paštas:</span>
        <template v-if="!editMode">
          <span>{{ userEmail }}</span>
        </template>
        <template v-else>
          <input
            v-model="editableUserData.email"
            placeholder="El. paštas"
          >
        </template>
      </div>

      <template v-if="!editMode">
          <button @click="startEditing()">Redaguoti</button>
      </template>

      <template v-else>
          <button @click="saveChanges()">Išsaugoti pakeitimus</button>
          <button @click="cancelChanges()">Atšaukti</button>
      </template>
      
    </div>

    <div class="automobiliai-section" v-if="account.user.type != 'admin'">
      <h2>Jūsų automobiliai</h2>
      <!-- Display cars here -->
      <!-- v-for with router-links for every car in array cars-->
      <span v-for="car in cars" :key="car.id">
        <router-link :to="'/car/'+car.id">{{car.make}} {{car.model}} - {{ car.creation_Date }}</router-link>
        <br>
      </span>
      


      <br><br>
      <router-link to="/profile/newcar">Pridėti automobilį</router-link>
    </div>
    <br>
    <div class="pagalbos-bilietai-section" v-if="account.user.type != 'admin'">
      <h2>Jūsų pagalbos bilietai</h2>
      <span v-for="ticket in tickets" :key="ticket.id">
        <router-link  :to="'/help/ticket/'+ticket.id">Bilietas {{ticket.id}} - {{ ticket.title }} - {{ status(ticket.status) }}</router-link>
        <br>
      </span>
    </div>
    <br>
    <div class="pagalbos-bilietai-section" v-if="account.user.type != 'admin'">
      <h2>Jūsų nuomos užklausos</h2>
      <span v-for="request in requests" :key="request.id">
        <router-link :to="'/profile/request/'+request.id">Užklausa {{request.id}} - {{ statusR(request.status, request.owner) }}</router-link>
        <br>
      </span>
      
    </div>
    

    <br><br>
    <router-link to="/profile/stats" v-if="account.user.type != 'admin'">Gauti statistikas</router-link>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'
import { userService } from '../_services';
import { carService } from '../_services';
import { ticketService } from '../_services';
import { requestService } from '../_services';

export default {
  data() {
    return {
      editableUserData: {},
      editMode: false,
      cars: [],
      tickets: [],
      requests: []
    };
  },
  computed:{
    ...mapState({
            account: state => state.account,
            users: state => state.users.all
        }),
    userFirstName(){
      return this.account.user.firstName ? this.account.user.firstName : "Vardas";
    },
    userLastName(){
      return this.account.user.lastName ? this.account.user.lastName : "Pavardė";
    },
    userRegistrationDate(){
      return this.account.user.Creation_Date ? this.account.user.Creation_Date : "????-??-??";
    },
    userEmail(){
      return this.account.user.email ? this.account.user.email : "El. paštas";
    }
  },
  async created() {
    this.getAllCars();
    this.getAllTickets();
    this.getAllRequests();
  },
  methods: {
    fetchUserData() {
      // Fetch user data from API or store
    },
    addCar() {
          //Route to add car page
          
    },
    status(s){
      switch(s){
        case 'created':
          return "Sukurtas";
        case 'answered':
          return "Atsakytas";
        case 'updated':
          return "Atnaujintas";
        case 'closed':
          return "Uždarytas";
      }
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
    isValidName(name) {
      const regex = /^[a-zA-Z]+$/; // Regex for letters only
      return regex.test(name);
    },
    isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
      return regex.test(email);
    },
    setEditableData(){
      this.editableUserData.email = this.userEmail;
      this.editableUserData.firstName = this.userFirstName;
      this.editableUserData.lastName = this.userLastName;
      this.editableUserData.id = this.account.user.id;
    },
    displayError(message){
      alert(message);
    },
    getAllCars(){
      carService.getAll().then(cars => this.cars = cars.filter(car => car.owner == this.account.user.id));
    },
    getAllTickets(){
      ticketService.getAll().then(tickets => this.tickets = tickets.filter(ticket => ticket.author == this.account.user.id));
    },
    getAllRequests(){
      requestService.getAll().then(requests => this.requests = requests.filter(request => request.owner == this.account.user.id || request.renter == this.account.user.id));
    },
    startEditing() {
      this.setEditableData();
      this.editMode = true;
    },
    saveChanges() {
      console.log(this.editableUserData);
      if(!this.isValidEmail(this.editableUserData.email) || !this.isValidName(this.editableUserData.firstName) || !this.isValidName(this.editableUserData.lastName)){
        this.displayError("Neteisingi įvesti duomenys");
        return;
      }
      this.editMode = false;
      userService.update(this.editableUserData);
      this.account.user.email = this.editableUserData.email;
      this.account.user.firstName = this.editableUserData.firstName;
      this.account.user.lastName = this.editableUserData.lastName;
      localStorage.setItem('user', JSON.stringify(this.account.user));
    },
    cancelChanges() {
      this.editMode = false;
    }
  }
};
</script>

<style scoped>
/* Add your CSS styling here */
.profile-page {
  /* Styles for the profile page */
}
.invalid-input {
  border-color: red; /* Style for invalid input */
}
.user-info, .edit-user-info, .automobiliai-section, .pagalbos-bilietai-section {
  /* Styles for the different sections */
}
</style>
