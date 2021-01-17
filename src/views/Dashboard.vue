<template>
    <div class="DashboardView">
        <h2 class="DashboardView__Title">Welcome to SpottyStats, {{this.user.display_name}}!</h2>
        <StatBox/>
    </div>
</template>

<script>
import StatBox from '../components/StatBox.vue';

export default {
  name: 'Dashboard',
  components: {
    StatBox,
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
};
</script>

<style lang="scss">

.DashboardView{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    &__Title{
        margin: auto;
    }
}

</style>
