<template>
    <div>
        <h1>Sveiki {{account.user.firstName}}!</h1>
        <p>Jūs esate prisijungę prie sistemos SuperAuto.pl!!</p>
        <p>
            <router-link to="/login">Atsijungti</router-link>
        </p>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
    },
    created () {
        this.getAllUsers();
    },
    methods: {
        ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete'
        })
    }
};
</script>