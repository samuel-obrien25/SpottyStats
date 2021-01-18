<template>
    <div class="Card">
        <div class="Card__Header"
             v-bind:style="{ 'background-image': 'url(' + this.backgroundImage + ')' }"
        >
            <span class="Card__Rank">{{(rank + 1).toString()}}</span>
        </div>

        <div v-if="isArtistCard" class="Card__Body">
            <h3>{{item.name}}</h3>
            <p v-if="artistFilters.showPopularity">
                <span>Popularity:</span>
                {{item.popularity}}
            </p>
            <p v-if="artistFilters.showGenres">
                <span>Genres:</span>
                <span class="normal" v-for="genre in item.genres" :key="item.uri + genre">
                    {{ genre + " " }}
                </span>
            </p>
        </div>

        <div v-if="isSongCard" class="Card__Body">
            <p>
                <span>Song:</span>
                {{item.name}}
            </p>
            <p>
                <span>Artist:</span>
                {{item.artists[0].name}}
            </p>
            <p v-if="songFilters.showAlbumTitle">
                <span>Album:</span>
                {{item.name}}
            </p>
            <p v-if="songFilters.showReleaseDate">
                <span>Release Date:</span>
                {{item.album.release_date}}
            </p>
            <p v-if="songFilters.showPopularity">
                <span>Popularity:</span>
                {{item.popularity}}
            </p>
            <p v-if="songFilters.showDuration">
                <span>Duration:</span>
                {{formatMilliseconds(item.duration_ms)}}
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
    item: Object,
    rank: Number,
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
        width: 200px;

        scroll-snap-align: start;
        scroll-padding: 10px;

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

            h3{
                bottom: 0;
                position: absolute;
                text-align: left;
            }
        }

        &__Body{
            height: 250px;
            overflow-x: auto;
            text-align: left;

            p{
                span:not(.normal){
                    font-weight:700;
                }
            }
        }
  }
}

  /* Desktop */
  @media only screen and (min-device-width: 813px){

  }
</style>
