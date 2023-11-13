<template>
  <div class="forum-post-creation-page">
    <h1>Sukurti naują įrašą</h1>
    <form @submit.prevent="submitPost">
      <div class="form-group">
        <label for="post-title">Pavadinimas:</label>
        <input id="post-title" v-model="post.title" required>
      </div>

      <div class="form-group">
        <label for="post-content">Turinys:</label>
        <textarea id="post-content" v-model="post.content" rows="10" required></textarea>
      </div>

      <button type="submit">Kurti įrašą</button>
      <router-link to="/forum/post">Įrašas</router-link>
    </form>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      showFilterPopup: false,
      post: {
        title: '',
        content: ''
      },
      cars: [
        {
          imageUrl: 'https://static8.depositphotos.com/1010338/960/i/950/depositphotos_9600579-stock-photo-man-driving-imaginary-car.jpg',
          make:'Kap pastaisyti dusliarkią?',
          model:'Modelinė',
          price:'piatras',
          mileage:'man niaisku'
        }
      ], // This should be fetched from your data source
      userData: {
        // Fetch or initialize user data here
      },
      balanceUpdateInfo: {}
    };
  },
  computed:{
    ...mapState({
            account: state => state.account,
            users: state => state.users.all
        }),
  },
  methods: {
    updateBalance() {
      // Implement user info update logic
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
.forum-post-creation-page {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"], textarea {
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
