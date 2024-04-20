<template>
  <div class="profile-page">
    <h1>Balanso papildymas</h1>
    <div class="user-info">
      <p><strong>Dabartinis balansas:</strong> {{ account.user.balance ? account.user.balance : "0.00"}}€</p>

      <input 
          v-model.number="balanceUpdateInfo.balance"
          :placeholder="0.00">
          <button @click="updateBalance()">Pildyti balansą</button>
    </div>
    
    <router-link to="/profile">Atgal į profilį</router-link>
  </div>
</template>



<script>
import { mapState, mapActions } from 'vuex'
import { userService } from '../_services'
import { billService } from '../_services'

export default {
  data() {
    return {
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
    displayError(message) {
      alert(message);
    },
    updateBalance() {
      if(!this.balanceUpdateInfo.balance || this.balanceUpdateInfo.balance < 0){
        displayError("Įveskite teigiamą sumą");
        return;
      }
      userService.update({id: this.account.user.id, balance: this.balanceUpdateInfo.balance+this.account.user.balance})
          .then(
              () => {
                  var bill = {
                    payer: this.account.user.id,
                    sum: this.balanceUpdateInfo.balance,
                    type: 'refill'
                  }
                  billService.create(bill);
                  this.account.user.balance += this.balanceUpdateInfo.balance;
                  localStorage.setItem('user', JSON.stringify(this.account.user));
                  this.$router.push('/profile');
              },
              error => {
                  this.error = error;
                  this.loading = false;
              }
          );
    }
  },
  async created() {
    //Nothing again
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
