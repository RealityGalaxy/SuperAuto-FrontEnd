<template>
  <div class="forum-post-display-page">
    <h1>{{ post.title }}</h1>
    <div class="post-metadata">
      <span>Autorius: {{ post.author }}</span>
      <span>Sukūrimo data: {{ post.creation_Date.substring(0, 10) }}</span>
    </div>
    <div class="post-content">
      {{ post.content }}
    </div>
    <router-link :to="'/forum/post/edit/'+post.id" v-if="post.authorId == account.user.id">Redaguoti</router-link>
    <button v-if="post.authorId == account.user.id" @click="deletePost()">Ištrinti</button>
    <br>
    <!--v-for for generating comments-->
    <div class="post-comments">
      <h3>Komentarai</h3>
      <div class="comment-item" v-for="comment in comments" :key="comment.id">
        <br>
        <div class="comment-info">
          <h4>Autorius: {{ comment.author }}</h4>
          <p>Sukūrimo data: {{ comment.creation_Date.substring(0, 10) }}</p>
          <p>{{ comment.content }}</p>
          <!--text that is clickable for deleting comment not a router link-->
          <p v-if="comment.authorId == account.user.id"><a @click="deleteComment(comment.id)" style="color: rgb(120, 149, 202); text-decoration: underline;">Ištrinti komentarą</a></p>
        </div>
      </div>
    </div>
    <br>
    <div class="form-group">
        <p>Parašykite naują komentarą:</p>
        <textarea id="post-content" v-model="comment.Content" rows="3" required></textarea>
        <button type="submit" @click="submitComment()">Pateikti komentarą</button>
    </div>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'
import { postService } from '../_services'
import { commentService } from '../_services';

export default {
  data() {
    return {
      post: {
        title: '-',
        author: '-',
        content: '-',
        creation_Date: '-'
      },
      comment:{
        Content: ''
      },
      comments: []
    };
  },
  computed:{
    ...mapState({
            account: state => state.account,
            users: state => state.users.all
        }),
  },
  async created() {
    this.getPostData(this.$route.params.id);
    this.getComments(this.$route.params.id);
  },
  methods: {
    getPostData(id){
      postService.getById(id).then(post => {
        this.post = post;
      });
    }, 
    async submitComment(){
      if(!this.comment.Content){
        alert("Užpildykite komentaro lauką");
        return;
      }

      this.comment.Content = await this.censor(this.comment.Content);

      this.comment.Author = this.account.user.id;
      this.comment.Post = this.post.id;
      commentService.create(this.comment).then(comment => {
        comment.author = this.account.user.username;
        this.comments.push(comment);
        this.comment.Content = "";
      });
    },
    displayConfirmation(){
      if(confirm("Ar tikrai norite ištrinti šį įrašą?")){
        return true;
      }
      return false;
    },
    deletePost(){
      if(!this.displayConfirmation()){
        return;
      }
      this.comments.forEach(comment => {
        commentService.delete(comment.id);
      });
      postService.delete(this.post.id).then(() => {
        this.$router.push('/forum');
      });
    },
    deleteComment(id){
      if(!this.displayConfirmation()){
        return;
      }
      commentService.delete(id).then(() => {
        this.comments = this.comments.filter(comment => comment.id != id);
      });
    },
    getComments(id){
      commentService.getAll().then(comments => {
        this.comments = comments.filter(comment => comment.post == id);
      });
    },
    async censor(content){
      const response = await fetch(`https://api.api-ninjas.com/v1/profanityfilter?text=${content}`,{
        method: 'GET',
        contentType: 'application/json',
        headers: {
          'X-Api-Key': '4MT5wwPLrPrY/FAfDRaKcg==VQ5O7lGGri7Jh46K'
        },
      });
      const data = await response.json();
      console.log(data);
      return data.censored;
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
