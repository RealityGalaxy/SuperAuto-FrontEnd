<template>
  <div class="forum-post-display-page">
    <h1>{{ post.title }}</h1>
    <div class="post-metadata">
      <span>Autorius: {{ post.author }}</span>
    </div>
    <div class="post-content">
      {{ post.content }}
    </div>

    <!--display all ticket answers-->
    <div class="post-comments">
      <div class="comment-item" v-for="answer in answers" :key="answer.id">
        <br>
        <div class="comment-info">
          <h2>{{ answer.author }}</h2>
          <p>{{ answer.content }}</p>
        </div>
      </div>
    </div>
    <br><br>

    <div class="form-group" v-if="post.status != 'closed'">
        <p>Parašykite naują atsakymą:</p>
        <textarea id="post-content" v-model="newAns.Content" rows="4" required></textarea>
        <button type="submit" @click="submitAnswer()">Pateikti atsakymą</button>
    </div>

    <button v-if="post.status != 'closed' && account.user.type == 'admin'" @click="closeTicket()">Uždaryti bilietą</button>
    
    <router-link to="/profile">Atgal į profilį</router-link>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'
import { userService } from '../_services';
import { ticketService } from '../_services'
import { answerService } from '../_services';

export default {
  data() {
    return {
      post: {
        title: '-',
        author: '-',
        content: '-'
      },
      newAns:{
        Content: ''
      },
      answers: []
    };
  },
  computed:{
    ...mapState({
            account: state => state.account,
            users: state => state.users.all
        }),
  },
  async created() {
    this.getTicketData(this.$route.params.id);
    this.getAllAnswers(this.$route.params.id);
  },
  methods: {
    async getTicketData(id){
      const data = await ticketService.getById(id);
      this.post.title = data.title;
      this.post.content = data.content;
      this.post.id = data.id;
      this.post.authorid = data.author;
      this.post.status = data.status;
      const name = await this.getUsername(data.author);
      this.post.author = name;
    },
    async getAllAnswers(id){
      answerService.getAll().then(answers => {
        this.answers = answers.filter(answer => answer.ticket == id);
        for(let i = 0; i < this.answers.length; i++){
          this.getUsername(this.answers[i].author).then(username => {
            this.answers[i].author = username;
          });
        }
      });
    },
    async getUsername(id){
      const user = await userService.getById(id);
      return user.username;
    },
    async getEmail(id){
      const user = await userService.getById(id);
      return user.email;
    },
    async submitAnswer(){
      this.newAns.Author = this.account.user.id;
      this.newAns.Ticket = this.post.id;
      const email = await this.getEmail(this.post.authorid);
      answerService.create(this.newAns).then(ans => {
        var toAdd = {
          author: this.account.user.username,
          content: this.newAns.Content,
          id: ans.id
        }
        this.answers.push(toAdd);
      });
    },
    closeTicket(){
      if(confirm("Ar tikrai norite uždaryti bilietą?")){
        var toSend = {
          id: this.post.id,
          status: 'closed',
        }
        ticketService.update(toSend).then(() => {
          this.post.status = 'closed';
        });
      }
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
