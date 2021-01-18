<template>
    <div class="DashboardView">
        <h2 class="DashboardView__Title">
          Welcome to SpottyStats, {{this.user.display_name || null}}!
        </h2>
        <StatBox/>
    </div>
</template>

<script>
import StatBox from '../components/StatBox/StatBox.vue';

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
/* Portrait */
@media only screen and (min-device-width: 375px){

  .DashboardView{
    display: flex;
    flex-direction: column;
    width: 100%;
  }

}

/* Desktop */
@media only screen and (min-device-width: 813px){

  .DashboardView{
    display: grid;
    grid-template-columns: 250px calc(100% - 250px);
    grid-template-rows: 50px calc(100% - 50px);
    height: 100%;
    width: 100%;

      &__Title{
        grid-column-start: 2;
        grid-row-start: 1;
        margin: auto;
      }
  }

}
</style>
