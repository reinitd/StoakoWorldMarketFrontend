<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
</script>

<main>
  <div id="wrapper" class="flex-row">
    <div id="sidebar" class="content">
      <p>MarketPlace by Stoako</p>
    </div>
    <div id="content"></div>
  </div>
</main>

<style>
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .content {
    background-color: #1f2122;
    border-top: 1px solid #404446;
    border-bottom: 1px solid #404446;
    padding: 0 10px;
  }

  #wrapper {
    width: 70vw;
  }
  #sidebar {
    min-width: 100px;
  }
</style>
