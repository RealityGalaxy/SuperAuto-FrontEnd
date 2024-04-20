<template>
  <div class="forum-post-creation-page">
    <h1>{{$route.params.id ? "Atnaujinti įrašą" : "Sukurti naują įrašą"}}</h1>
    <form @submit.prevent="submitPost">
      <div class="form-group">
        <label for="post-title">Pavadinimas:</label>
        <input id="post-title" v-model="post.Title" required>
      </div>

      <div class="form-group">
        <label for="post-content">Turinys:</label>
        <textarea id="post-content" v-model="post.Content" rows="10" required></textarea>
      </div>

      <button type="submit">{{ $route.params.id ? "Atnaujinti įrašą" : "Sukurti įrašą" }}</button>
      <router-link :to="'/forum/post/'+$route.params.id" v-if="$route.params.id">Atgal į įrašą</router-link>
    </form>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'
import { postService } from '../_services'
import { router } from '../_helpers';

export default {
    data() {
        return {
            showFilterPopup: false,
            post: {
                Title: '',
                Content: ''
            }
        };
    },
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all
        }),
    },
    async created() {
        if (this.$route.params.id) {
            this.getPostData(this.$route.params.id);
        }
    },
    methods: {
        getPostData(id) {
            postService.getById(id).then(post => {
                this.post.Title = post.title;
                this.post.Content = post.content;
            });
        },
        submitPost() {
            if (!this.post.Title || !this.post.Content) {
                alert("Užpildykite visus laukus");
                return;
            }

            if(this.$route.params.id){
                this.updatePost();
            }else{
                this.createPost();
            }
        },
        async createPost(){
            this.post.Author = this.account.user.id;
            this.post.Title = await this.censor(this.post.Title);
            postService.create(this.post)
                .then(post => {
                this.$router.push('/forum/post/' + post.id);
            }, error => {
                this.error = error;
                this.loading = false;
            });
        },
        async updatePost(){
            this.post.id = parseInt(this.$route.params.id);
            this.post.Title = await this.censor(this.post.Title);
            postService.update(this.post)
                .then(post => {
                this.$router.push('/forum/post/' + post.id);
            }, error => {
                this.error = error;
                this.loading = false;
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
    },
    components: { router }
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
