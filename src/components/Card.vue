<template>
  <div class="Card">
    <div
      class="Card__Header"
      :style="{'background-image': 'url(' + this.backgroundImage + ')'}"
    >
      <span class="Card__Rank">{{ (rank + 1).toString() }}</span>
      <a
        :href="item.uri"
        class="Card__CTA"
      >Play on Spotify</a>
    </div>

    <div
      v-if="isArtistCard"
      class="Card__Body"
    >
      <h3>{{ item.name }}</h3>
      <p v-if="artistFilters.showPopularity">
        <span>Popularity:</span>
        {{ item.popularity }}
      </p>
      <p v-if="artistFilters.showGenres">
        <span>Genres:</span>
        <span
          class="normal"
          v-for="genre in item.genres"
          :key="item.uri + genre"
        >
          {{ genre + " " }}
        </span>
      </p>
    </div>

    <div
      v-if="isSongCard"
      class="Card__Body"
    >
      <h3>{{ item.name }}</h3>
      <p>
        <span>Artist:</span>
        {{ item.artists[0].name }}
      </p>
      <p v-if="songFilters.showAlbumTitle">
        <span>Album:</span>
        {{ item.name }}
      </p>
      <p v-if="songFilters.showReleaseDate">
        <span>Release Date:</span>
        {{ item.album.release_date }}
      </p>
      <p v-if="songFilters.showPopularity">
        <span>Popularity:</span>
        {{ item.popularity }}
      </p>
      <p v-if="songFilters.showDuration">
        <span>Duration:</span>
        {{ formatMilliseconds(item.duration_ms) }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Card',
  props: {
    isArtistCard: Boolean,
    isSongCard: Boolean,
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    rank: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  computed: {
    backgroundImage() {
      if (this.isArtistCard) {
        return this.item.images[1].url;
      }
      if (this.isSongCard) {
        return this.item.album.images[1].url;
      }
      return null;
    },
    ...mapState(['tableFilters']),
    artistFilters() {
      return this.tableFilters.artists;
    },
    songFilters() {
      return this.tableFilters.songs;
    },
  },
  methods: {
    formatMilliseconds(input) {
      const minutes = Math.floor(input / 60000);
      const seconds = ((input % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
  },
};
</script>

<style lang="scss" scoped>
  /* Portrait */
  @media only screen and (min-device-width: 375px){
    .Card {
        background-color: rgba(21, 158, 212, .2);
        border: 7.5px solid rgba(0, 0, 0, 0.75);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        height: 400px;
        margin: 10px;
        overflow: hidden;
        padding: 10px;
        min-width: 200px;
        scroll-snap-align: start;
        scroll-padding: 10px;
        width: 200px;

        &__Rank{
            background-color:#159ed4;
            border: 2px solid #0779a7;
            color: #fff;
            border-radius: 50%;
            font-weight: 700;
            position: absolute;
            top:-32px;
            left: -35px;
            width: 15px;
            height: 15px;
            padding-top: 30px;
            padding-left: 30px;
            padding-right: 15px;
            padding-bottom: 15px;

        }

        &__Header{
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            height: 200px;
            position: relative;
            width: 100%;
            z-index: 2;

            h3{
                bottom: 0;
                position: absolute;
                text-align: left;
            }
        }

        &__Body{
            height: 250px;
            overflow-x: auto;
            position: relative;
            text-align: left;

            p{
                span:not(.normal){
                    font-weight:700;
                }
            }
        }

        &__CTA{
            background: none;
            background-color: #6dcac1;
            border: 2px solid rgba(0,0,0,.85);
            border-radius: 20px;
            box-shadow: -2px 2px 0px 1px #34867e;
            color: rgba(0,0,0,.75);
            display: block;
            font-weight: 700;
            margin: auto;
            padding: 5px 10px;
            position: absolute;
            left: 0;
            right: 0;
            text-align: center;
            text-decoration: none;
            top: 155px;
            width: 60%;
        }
  }
}

  /* Desktop */
  @media only screen and (min-device-width: 813px){

  }
</style>
