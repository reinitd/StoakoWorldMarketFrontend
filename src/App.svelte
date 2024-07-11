<script lang="ts">
  import Sidebar from "./lib/Sidebar.svelte";
</script>

<main>
  <div id="wrapper">
    <div id="container" class="flex-row">
      <Sidebar />
      <div id="content" class="flex-row">
        <header class="content border-vertical flex-center-vertical">
          <h1><strong>WorldMarket</strong> <small>by Stoako</small></h1>
          <div id="actions" class="flex-row">
            <a href="#" style="color: #7be459;">
              <i class="bx bx-edit"></i>
            </a>
            <a href="#" style="color: rgb(200, 195, 188);">
              <i class="bx bx-user"></i>
            </a>
          </div>
        </header>
      </div>
      <div id="location" class="content border-lateral">
        <p>Locations</p>
      </div>
    </div>
  </div>
</main>

<style>
  #container {
    width: 100%;
    height: 70%;
    gap: 20px;
    margin: 0 auto;

    & header {
      flex-grow: 1;
      height: 50px;

      & h1 {
        font-family: "Times New Roman", Times, serif;
        margin: 0;
        padding: 0;
        font-weight: normal;
        font-size: 1.25rem;
      }
    }
  }
  #content {
    flex-grow: 1;

    & header > h1 {
      flex-grow: 1;
    }
  }
  #actions {
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  #actions a {
    display: flex;
    align-items: center;
    justify-content: center;

    & i {
      font-size: 1.5rem;
    }
  }
  #wrapper {
    min-width: 50%;
    width: fit-content;
    margin: 0 auto;
    margin-top: 25px;
    height: 100vh;
  }

  #location {
    min-width: 90px;
    text-align: center;
    padding: 1rem 0.5rem;  /* TODO: turn px to rem. */
  }
</style>
