<template>
  <div class="car-listing-page">

    <div class="car-list">
      <div v-for="post in posts" :key="post.id" class="car-item">
        <div class="car-info">
          <h3>
      <router-link :to="'/forum/post/'+post.id">{{ post.title }}</router-link></h3>
          <p>Autorius: {{ post.author }}</p>
          <p>Sukūrimo data: {{ post.creation_Date.substring(0, 10) }}</p>
          <p>Paskutinį kartą atnaujinta: {{ post.edit_Date.substring(0, 10) }}</p>
          <p>{{ post.content.substring(0, 100) + (post.content.length < 100 ? "" : "...") }}</p>
        </div>
      </div>
    </div>
    <br>
    <router-link to="/forum/newpost">Naujas įrašas</router-link>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'
import { postService } from '../_services'

export default {
  data() {
    return {
      posts: []
    };
  },
  computed:{
    ...mapState({
            account: state => state.account,
            users: state => state.users.all
        }),
  },
  async created() {
    this.getAllPosts();
  },
  methods: {
    getAllPosts() {
      postService.getAll().then(posts => {
        this.posts = posts;
      });
    }
  }
};
</script>

<style scoped>
.car-listing-page {
  position: relative;
}

.filter-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.car-list {
  display: flex;
  flex-direction: column;
}

.car-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.car-image {
  width: 100px;
  height: auto;
  margin-right: 15px;
}

.car-info h3 {
  margin: 0;
  margin-bottom: 5px;
}
</style>
