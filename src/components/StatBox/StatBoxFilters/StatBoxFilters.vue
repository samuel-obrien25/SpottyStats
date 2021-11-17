<template>
    <div class="StatBoxFilters">
      <h3>
        <button v-on:click="showFilters = !showFilters">
          {{showFilters ? 'Hide Filters' : 'Show Filters'}}
        </button>
      </h3>
      <div class="StatBoxFilters__List" v-if="showFilters">
        <h4>Frequency Options</h4>
        <label>
          Timespan
          <select id="TimespanSelect" v-model="timeSpanValue">
            <option value=''>Default</option>
            <option value='short_term'>1 Month</option>
            <option value='medium_term'>6 Months</option>
            <option value='long_term'>Several Years</option>
          </select>
        </label>

        <label>
          Display Options
          <select id="NumResultsFilter" v-model="numResultsValue">
            <option value=''>Default</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='50'>50</option>
          </select>
        </label>

        <h4>Stack Options</h4>

        <h5>Top Artists</h5>
        <label>
          Show Genres
          <input id="GenresFilter" type="checkbox" v-model="filters.artists.showGenres"/>
        </label>

        <label>
          Show Popularity
          <input id="PopularityFilter" type="checkbox" v-model="filters.artists.showPopularity"/>
        </label>

        <h5>Top Songs</h5>
        <label>
          Show Album Title
          <input id="AlbumTitleFilter" type="checkbox" v-model="filters.songs.showAlbumTitle"/>
        </label>

        <label>
          Show Release Date
          <input type="checkbox" v-model="filters.songs.showReleaseDate"/>
        </label>

        <label>
          Show Popularity
          <input type="checkbox" v-model="filters.songs.showPopularity"/>
        </label>

        <label>
          Show Song Duration
          <input type="checkbox" v-model="filters.songs.showDuration"/>
        </label>

        <div class="StatBoxFilters__ActionsContainer">
          <ActionButton
            type="Constructive"
            v-on:click.native="updateStack"
          >
          Update Stack
          </ActionButton>
          <ActionButton type="Destructive">Reset Options</ActionButton>
        </div>

      </div>

    </div>
</template>

<script>
import ActionButton from '../../Buttons/ActionButton.vue';

export default {
  name: 'StatBoxFilters',
  components: {
    ActionButton,
  },
  data() {
    return {
      filters: {
        artists: {
          showGenres: null,
          showPopularity: null,
        },
        songs: {
          showAlbumTitle: null,
          showDuration: null,
          showPopularity: null,
          showReleaseDate: null,
        },
      },
      showFilters: false,
      numResultsValue: '',
      timeSpanValue: '',
    };
  },
  mounted() {
    this.filters = {
      artists: {
        showGenres: this.$store.getters.getFiltersArtists.showGenres,
        showPopularity: this.$store.getters.getFiltersArtists.showPopularity,
      },
      songs: {
        showAlbumTitle: this.$store.getters.getFiltersSongs.showAlbumTitle,
        showDuration: this.$store.getters.getFiltersSongs.showDuration,
        showPopularity: this.$store.getters.getFiltersSongs.showPopularity,
        showReleaseDate: this.$store.getters.getFiltersSongs.showReleaseDate,
      },
    };
  },
  methods: {
    updateStack() {
      const stackFilters = this.filters;
      this.$store.dispatch('setTableFilters', {
        ...stackFilters,
      });

      this.$store.dispatch('setTopArtists', {
        timeRange: this.timeSpanValue,
        limit: this.numResultsValue,
      });

      this.$store.dispatch('setTopSongs', {
        timeRange: this.timeSpanValue,
        limit: this.numResultsValue,
      });
    },
  },
};
</script>

<style lang="scss">
    .StatBoxFilters{
      grid-row-end: span 2;
      grid-column-start: 1;
      padding: 10px;
      width: 90%;

        h3, h4, h5 {
            text-align: left;
        }

        h3{
          width: 100%;

          :hover {
            cursor: pointer;
          }

          button{
            background-color: rgb(255, 227, 107);
            box-shadow: -3px 3px 0px 1px rgb(255, 207, 0);
            border: 3px solid rgba(0, 0, 0, 0.85);
            border-radius: 10px;
            display: block;
            font-size: 1.17em;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            padding: 10px 15px;
            font-weight: bold;
            width: 100%;
          }

        }

        h5{
          border-bottom: 2px dotted #159ed4;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 10px;
          padding-bottom: 5px;
          text-transform: uppercase;
        }

      &__List{
        background-color: rgba(0,0,0,.1);
        border-radius: 10px;
        box-sizing: border-box;
        padding: 10px;
        width: 100%;

        label{
            display: flex;
            flex-wrap: wrap;
            padding: 10px 0px;

            input {
            margin: auto;
            }
            select {
            width: 100%;
            }

        }

      }
      &__ActionsContainer{
        display: flex;
        flex-direction: column;
        height: 150px;
        width: 100%;

        *{
            margin-left: 0;
        }
      }
    }
</style>
