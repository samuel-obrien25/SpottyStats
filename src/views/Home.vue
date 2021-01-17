<template>
  <DefaultPage/>
</template>

<script>
import Vue from 'vue';
import 'vue-router';
import DefaultPage from '../templates/DefaultPage.vue';

export default {
  name: 'App',
  components: {
    DefaultPage,
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    logOut() {
      this.$store.commit('mutateUser', null);
      this.$router.push({ name: 'Home' });
    },
  },
  created() {
    if (this.$route.query) {
      Vue.axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${this.$route.query.access_token}`,
        },
      }).then((response) => {
        this.$store.commit('mutateUser', response.data);
        console.log('Response from server: ');
        console.log(this.$store.state.user);
      }).then(() => {
        this.$router.push('/dashboard');
      });
    }
  },
  mounted() {
    if (this.user) {
      this.$router.push('/dashboard');
    } else {
      this.$router.push('/login');
    }
  },
};
</script>

<style>

</style>
