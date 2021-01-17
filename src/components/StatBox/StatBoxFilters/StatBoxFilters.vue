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
          <select id="TimespanSelect">
            <option>1 Month</option>
            <option>6 Months</option>
            <option>Several Years</option>
          </select>
        </label>

        <label>
          Display Options
          <select id="NumResultsFilter">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </label>

        <h4>Table Options</h4>

        <label>
          Show Genres
          <input id="GenresFilter" type="checkbox"/>
        </label>

        <label>
          Show Popularity
          <input id="PopularityFilter" type="checkbox"/>
        </label>

        <div class="StatBoxFilters__ActionsContainer">
          <ActionButton type="Constructive">Update Table</ActionButton>
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
      showFilters: false,
    };
  },
};
</script>

<style lang="scss">
    .StatBoxFilters{
      grid-row-end: span 2;
      grid-column-start: 1;
      padding: 10px;
      width: 90%;

        h3, h4 {
            text-align: left;
        }

        h3{
          width: 100%;

          :hover {
            cursor: pointer;
          }

          button{
            background-color: rgb(255, 227, 107);
            box-shadow: -3px 3px 0px 1px rgba(255, 207, 0);
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
