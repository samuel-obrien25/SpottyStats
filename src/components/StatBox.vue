<template>
  <div class="StatBox">
    <ul class="StatBox__ControlList">
      <li class="StatBox__ControlItem">
          <button class="StatBox__ControlItemButton">Top Songs</button>
      </li>
      <li class="StatBox__ControlItem">
          <button class="StatBox__ControlItemButton">Top Artists</button>
      </li>
      <li class="StatBox__ControlItem">
          <button class="StatBox__ControlItemButton">Top Playlists</button>
      </li>
    </ul>
    <div class="StatBox__Content">
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatBox',
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
