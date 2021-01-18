<template>
  <div class="StatBox">
    <StatBoxFilters />

    <ul class="StatBox__ControlList">
      <li class="StatBox__ControlItem">
        <button
          class="StatBox__ControlItemButton"
          v-on:click="visibleStats = 'songs'"
        >
          Top Songs
        </button>
      </li>
      <li class="StatBox__ControlItem">
        <button
          class="StatBox__ControlItemButton"
          v-on:click="visibleStats = 'artists'"
        >
          Top Artists
        </button>
      </li>
    </ul>
    <div class="StatBox__Content">
      <div class="CardStack" v-if="visibleStats === 'artists'">
        <Card v-for="(item, index) in this.topArtists.data.items"
              v-bind:key="index"
              v-bind:isArtistCard="true"
              v-bind:item="item"
              v-bind:rank="index"
        />
      </div>
      <div class="CardStack" v-if="visibleStats === 'songs'">
        <Card v-for="(item, index) in this.topSongs.data.items"
              v-bind:key="index"
              v-bind:isSongCard="true"
              v-bind:item="item"
              v-bind:rank="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Card from '../Card.vue';
import StatBoxFilters from './StatBoxFilters/StatBoxFilters.vue';

export default {
  name: 'StatBox',
  components: {
    Card,
    StatBoxFilters,
  },
  computed: mapState(['topArtists', 'topSongs', 'tableFilters']),
  data() {
    return {
      visibleStats: 'none',
    };
  },
  mounted() {
    if (!this.$store.getters.getTopArtists) {
      this.$store.dispatch({ type: 'setTopArtists' });
    }

    if (!this.$store.getters.getTopSongs) {
      this.$store.dispatch({ type: 'setTopSongs' });
    }
  },
};
</script>

<style lang='scss'>
/* Portrait */
@media only screen and (min-device-width: 375px){
  .StatBox{
    display: flex;
    flex-direction: column;
    position: relative;

    &__ControlList{
      list-style: none;
      margin: auto;
      padding: 0;
    }

    &__ControlItem {
      display: inline-block;
      margin: 5px 10px;
    }

    &__Content{
      width: 100%;
      overflow: scroll;
      padding: 10px 0px
    }

    .CardStack{
      display: flex;
      flex-direction: row;
      align-items:flex-start;
      width: 100%;
      overflow-y: auto;
      overflow-x: scroll;
      scroll-snap-type: x proximity;
    }
  }
}

/* Desktop */
@media only screen and (min-device-width: 813px){
  .StatBox {
    display: grid;
    grid-column-end: span 2;
    grid-gap: 0px 25px;
    grid-row-start: 2;
    grid-template-columns: 250px calc(100% - 250px);
    grid-template-rows: 50px calc(100% - 50px);
    justify-items: center;

    &__Content {
      grid-row-start: 2;
      grid-column-start: 2;
      overflow: auto;
      padding: 15px;
      width: auto;
    }

    &__ControlList {
      display: inline-flex;
      grid-row-start: 1;
      grid-column-start: 2;
      list-style: none;
      padding: 0;
    }

    &__ControlItem {
      margin: 5px;
    }

    .CardStack{
      flex-wrap: wrap;
    }

  }
}

</style>
