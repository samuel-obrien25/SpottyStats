<template>
  <div class="StatBox">
    <ul class="StatBox__ControlList">
      <li class="StatBox__ControlItem">
          <button class="StatBox__ControlItemButton" v-on:click="visibleStats = 'songs'">
            Top Songs
          </button>
      </li>
      <li class="StatBox__ControlItem">
          <button class="StatBox__ControlItemButton" v-on:click="visibleStats = 'artists'">
            Top Artists
          </button>
      </li>
    </ul>
    <div class="StatBox__Content">
      <table v-if="visibleStats === 'artists'">
        <thead>
            <th>Artist</th>
            <th>Genres</th>
            <th>Popularity</th>
            <th>URL</th>
        </thead>
        <tbody>
          <tr v-for="item in this.topArtists.data.items" :key="item.name">
            <td>{{item.name}}</td>
            <td>
              <span v-for="genre in item.genres" :key="genre">{{genre + " "}} </span>
            </td>
            <td>{{item.popularity}}</td>
            <td><a :href='item.uri'>LINK</a></td>
          </tr>
        </tbody>
      </table>

      <table v-if="visibleStats === 'songs'">
        <thead>
            <th>Song</th>
            <th>Artist</th>
            <th>Album</th>
            <th>URL</th>
        </thead>
        <tbody>
          <tr v-for="item in this.topSongs.data.items" :key="item.name">
            <td>{{item.name}}</td>
            <td>{{item.artists[0].name}}</td>
            <td>{{item.album.name}}</td>
            <td><a :href='item.uri'>LINK</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'StatBox',
  computed: mapState([
    'topArtists',
    'topSongs',
    'user',
  ]),
  data() {
    return {
      visibleStats: 'none',
    };
  },
  mounted() {
    if (!this.$store.getters.getTopArtists) {
      this.$store.dispatch('setTopArtists').then(() => {
        console.log(this.$store);
      });
    }
    if (!this.$store.getters.getTopSongs) {
      this.$store.dispatch('setTopSongs');
    }
  },
};
</script>

<style lang="scss" scoped>
  .StatBox{
    margin: auto;

    &__ControlList{
      display: inline-flex;
      list-style: none;
    }
    &__ControlItem{
      margin: 5px;
    }
  }
</style>
