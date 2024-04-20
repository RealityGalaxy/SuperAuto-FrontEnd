<template>
  <div class="forum-post-creation-page" v-if="account.user.type != 'admin'">
    <h1>Naujas pagalbos bilietas</h1>
    <form @submit.prevent="submitPost">
      <div class="form-group">
        <label for="post-title">Trumpas problemos aprašas:</label>
        <input id="post-title" v-model="post.Title" required>
      </div>

      <div class="form-group">
        <label for="post-content">Turinys:</label>
        <textarea id="post-content" v-model="post.Content" rows="10" required></textarea>
      </div>

      <button type="submit">Pateikti bilietą</button>
      <router-link to="/profile/ticket">Bilietas</router-link>
    </form>
  </div>
  <div v-else>
    <h1>Administratoriaus puslapis</h1>
    <h2>Neatsakyti bilietai:</h2>
    <div class="post-item" v-for="ticket in tickets" :key="ticket.id">
      <div class="post-info">
        <router-link :to="'/help/ticket/'+ticket.id">{{ ticket.title }}</router-link>
      </div>
    </div>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'
import { ticketService } from '../_services';

export default {
  data() {
    return {
      showFilterPopup: false,
      post: {
        Title: '',
        Content: ''
      },
      tickets: []
    };
  },
  computed:{
    ...mapState({
            account: state => state.account,
            users: state => state.users.all
        }),
  },
  async created() {
    if(this.account.user.type == 'admin'){
      this.tickets = await ticketService.getAll().then(tickets => {
        return tickets.filter(ticket => ticket.status != 'answered' && ticket.status != 'closed');
      });
    }
  },
  methods: {
    submitPost() {
      if (!this.post.Title || !this.post.Content) {
        alert("Užpildykite visus laukus");
        return;
      }
      this.post.Author = this.account.user.id;

      ticketService.create(this.post)
                .then(post => {
                this.$router.push('/help/ticket/' + post.id);
            }, error => {
                this.error = error;
                this.loading = false;
            });
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
