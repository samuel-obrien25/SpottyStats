<template>
  <BasePage :is-splash="true" />
</template>

<script>
import 'vue-router';
import BasePage from './BasePage.vue';

export default {
  name: 'App',
  components: {
    BasePage,
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    logOut() {
      this.$store.commit('mutateUser', null);
      this.$store.commit('mutateAccessToken', null);
      this.$store.commit('mutateDidSucceed', null);
      this.$router.push({ name: 'Home' });
    },
  },
  created() {
    if (this.$route.query && this.$route.query.access_token) {
      this.$store.commit('mutateAccessToken', this.$route.query.access_token);
      this.$store.dispatch('setUser').then(() => {
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
