<template>
  <div class="StatBox">
    <StatBoxFilters />

    <ul class="StatBox__ControlList">
      <li class="StatBox__ControlItem">
        <button
          class="StatBox__ControlItemButton"
          @click="visibleStats = 'songs'"
        >
          Top Songs
        </button>
      </li>
      <li class="StatBox__ControlItem">
        <button
          class="StatBox__ControlItemButton"
          @click="visibleStats = 'artists'"
        >
          Top Artists
        </button>
      </li>
    </ul>
    <div class="StatBox__Content">
      <transition-group
        class="CardStack"
        name="list"
        v-if="visibleStats === 'artists'"
        tag="div"
      >
        <SSCard
          v-for="(item, index) in this.topArtists.data.items"
          :key="item.id"
          :is-artist-card="true"
          :item="item"
          :rank="index"
        />
      </transition-group>
      <transition-group
        class="CardStack"
        name="list"
        v-if="visibleStats === 'songs'"
        tag="div"
      >
        <SSCard
          v-for="(item, index) in this.topSongs.data.items"
          :key="item.id"
          :is-song-card="true"
          :item="item"
          :rank="index"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SSCard from './SSCard.vue';
import StatBoxFilters from './StatBoxFilters.vue';

export default {
  name: 'StatBox',
  components: {
    SSCard,
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
  watch: {
    visibleStats(oldVal, newVal) {
      if (oldVal !== newVal) {
        window.setTimeout(() => {
          document.querySelector('.CardStack').scrollLeft = 0;
        }, 500);
      }
    },
  },
};
</script>

<style lang='scss'>
/* Portrait */
@media only screen and (min-device-width: 375px){
  .list-enter-active, .list-leave-active {
    transition: all .5s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }

  .StatBox{
    display: flex;
    flex-direction: column;
    height: auto;
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
      height: auto;
      width: 100%;
      padding: 10px 0px
    }

    .CardStack{
      display: flex;
      flex-direction: row;
      align-items:flex-start;
      height: auto;
      position: relative;
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
