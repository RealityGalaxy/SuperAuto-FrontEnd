<template>
  <div class="forum-post-display-page">
    <h1>{{ post.title }}</h1>
    <div class="post-metadata">
      <span>Autorius: {{ post.author }}</span>
    </div>
    <div class="post-content">
      {{ post.content }}
    </div>
    
    <router-link to="/profile">Atgal į profilį</router-link>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      showFilterPopup: false,
      post: {
        title: 'Kaip pašalinti skelbimą?',
        author: 'Naujokas',
        content: 'Sveiki, man nepavyksta pašalinti skelbimo, kaip tai padaryti?',
        createdAt: '2023-11-10' // ISO 8601 format
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
.forum-post-display-page {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.post-metadata {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 20px;
}

.post-metadata span {
  display: block;
  margin-bottom: 5px;
}

.post-content {
  white-space: pre-line; /* Ensures that line breaks in the content are respected */
}
</style>
