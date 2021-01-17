<template>
  <div class="StatBox">

    <StatBoxFilters/>

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
      <table class="StatBox__Table" v-if="visibleStats === 'artists'">
        <thead>
            <th>Rank</th>
            <th>Artist</th>
            <th v-if="tableFilters.artists.showGenres">Genres</th>
            <th v-if="tableFilters.artists.showPopularity">Popularity</th>
            <th>URL</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in this.topArtists.data.items" :key='item.uri'>
            <td>{{index+1}}</td>
            <td>{{item.name}}</td>
            <td v-if="tableFilters.artists.showGenres">
              <span v-for="genre in item.genres" :key="item.uri + genre">{{genre + " "}} </span>
            </td>
            <td v-if="tableFilters.artists.showPopularity">{{item.popularity}}</td>
            <td><a :href='item.uri'>LINK</a></td>
          </tr>
        </tbody>
      </table>

      <table class="StatBox__Table" v-if="visibleStats === 'songs'">
        <thead>
            <th>Rank</th>
            <th>Song</th>
            <th>Artist</th>
            <th v-if="tableFilters.songs.showAlbumTitle">Album</th>
            <th v-if="tableFilters.songs.showReleaseDate">Release Date</th>
            <th v-if="tableFilters.songs.showDuration">Duration</th>
            <th v-if="tableFilters.songs.showPopularity">Popularity</th>
            <th>URL</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in this.topSongs.data.items" :key="item.uri">
            <td>{{index+1}}</td>
            <td>{{item.name}}</td>
            <td>{{item.artists[0].name}}</td>
            <td v-if="tableFilters.songs.showAlbumTitle">
              {{item.album.name}}
            </td>
            <td v-if="tableFilters.songs.showReleaseDate">
              {{item.album.release_date}}
            </td>
            <td v-if="tableFilters.songs.showDuration">
              {{formatMilliseconds(item.duration_ms)}}
            </td>
            <td v-if="tableFilters.songs.showPopularity">
              {{item.popularity}}
            </td>
            <td><a :href='item.uri'>LINK</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import StatBoxFilters from './StatBoxFilters/StatBoxFilters.vue';

export default {
  name: 'StatBox',
  components: {
    StatBoxFilters,
  },
  computed: mapState([
    'topArtists',
    'topSongs',
    'tableFilters',
  ]),
  data() {
    return {
      visibleStats: 'none',
    };
  },
  methods: {
    formatMilliseconds(input) {
      const minutes = Math.floor(input / 60000);
      const seconds = ((input % 60000) / 1000).toFixed(0);
      return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    },
  },
  mounted() {
    console.log(this.$store.state);
    if (!this.$store.getters.getTopArtists) {
      this.$store.dispatch({ type: 'setTopArtists' });
    }

    if (!this.$store.getters.getTopSongs) {
      this.$store.dispatch({ type: 'setTopSongs' });
    }
  },
};
</script>

<style lang="scss">
  .StatBox{
    display: grid;
    grid-column-end: span 2;
    grid-gap: 0px 25px;
    grid-row-start: 2;
    grid-template-columns: 250px calc(100% - 250px);
    grid-template-rows: 50px calc(100% - 50px);
    justify-items: center;

    &__Content{
      grid-row-start: 2;
      grid-column-start: 2;
    }

    &__ControlList{
      display: inline-flex;
      grid-row-start: 1;
      grid-column-start: 2;
      list-style: none;
      padding: 0;
    }

    &__ControlItem{
      margin: 5px;
    }

    &__Table{
      background-color: rgba(215, 238, 247, 0.25);
      border: 10px solid rgba(0,0,0,.8);
      border-spacing: 0px;
      border-radius: 10px;
      padding: 10px;

      thead{

        th{
          background-color: #fdb1be;
          border: 2px solid rgba(0,0,0,.85);
          border-right: none;
          border-top-left-radius: 7.5px;
          border-top-right-radius: 7.5px;
          padding: 10px;
          text-align: right;

          &:first-of-type{
            text-align: center;
            border-right: none;
          }

          &:nth-of-type(2){
            text-align: left;
          }

          &:last-of-type{
            border-right: 2px solid black;;
          }
        }
      }

      td{
        border: 2px solid rgba(0,0,0,.85);
        border-right: none;
        border-top: none;
        max-width: 400px;
        padding: 10px;
        text-align: right;
        transition: cubic-bezier(0.075, 0.82, 0.165, 1);

        &:first-of-type{
          text-align: center;
          border-right: none;
        }

        &:nth-of-type(2){
          text-align: left;
        }

        &:last-child{
          border-right: 2px solid black;;
        }
      }

      tr{
        &:hover{
          color: rgba(0,0,0,.9);
          background-color: rgba(21, 158, 212, .5);
        }
      }
    }
  }
</style>
