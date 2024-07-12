<script lang="ts">
  import Sidebar from "./lib/Sidebar.svelte";
  import ContentSection from "./lib/ContentSection.svelte";
  import LocationsSidebar from "./lib/LocationsSidebar.svelte";

  const catagoriesContent = {
    building: `<ul>
            <li><a href="#">All-type Planks</a></li>
            <li><a href="#">Stone</a></li>
            <li><a href="#">Stone Brick</a></li>
        </ul>
        <ul>
            <li><a href="#">Quartz</a></li>
            <li><a href="#">Glass</a></li>
        </ul>`,
    colored: `<ul>
            <li><a href="#">Wool</a></li>
            <li><a href="#">Stained Glass</a></li>
            <li><a href="#">Concrete</a></li>
        </ul>
        <ul>
            <li><a href="#">Concrete Powder</a></li>
            <li><a href="#">Terracotta</a></li>
        </ul>`,
    natural: `<ul>
          <li><a href="#">Dirt</a></li>
          <li><a href="#">Sand</a></li>
          <li><a href="#">Ice</a></li>
      </ul>
      <ul>
          <li><a href="#">All-type Ore</a></li>
          <li><a href="#">All-type Logs</a></li>
          <li><a href="#">All-type Leaves</a></li>
      </ul>`,
    functional: `<ul>
          <li><a href="#">Anvil</a></li>
          <li><a href="#">Painting</a></li>
          <li><a href="#">End Crystals</a></li>
      </ul>
      <ul>
          <li><a href="#">Shulker Box</a></li>
          <li><a href="#">All-type Heads</a></li>
      </ul>`,
    redstone: `<ul>
          <li><a href="#">Redstone Dust</a></li>
          <li><a href="#">Redstone Blocks</a></li>
          <li><a href="#">Repeaters</a></li>
          <li><a href="#">Comparator</a></li>
      </ul>
      <ul>
          <li><a href="#">Slime Block</a></li>
          <li><a href="#">Honey Block</a></li>
          <li><a href="#">Redstone Lamp</a></li>
          <li><a href="#">TNT</a></li>
      </ul>
      <ul>
          <li><a href="#">Piston</a></li>
          <li><a href="#">Sticky Piston</a></li>
          <li><a href="#">Observer</a></li>
          <li><a href="#">All-Type Rails</a></li>
      </ul>`,
    toolsUtility: `<ul>
          <li><a href="#">All-Type Shovels</a></li>
          <li><a href="#">All-Type Pickaxes</a></li>
          <li><a href="#">All-Type Axes</a></li>
          <li><a href="#">All-Type Hoes</a></li>
      </ul>
      <ul>
          <li><a href="#">Saddle</a></li>
          <li><a href="#">Ender Pearl</a></li>
          <li><a href="#">All-Type Music Discs</a></li>
          <li><a href="#">Elytra</a></li>
      </ul>`,
    combat: `<ul>
          <li><a href="#">Totem of Undying</a></li>
          <li><a href="#">Shields</a></li>
          <li><a href="#">Netherite Swords</a></li>
          <li><a href="#">Diamond Swords</a></li>
          <li><a href="#">Netherite Armour Set</a></li>
          <li><a href="#">Diamond Armour Set</a></li>
          
      </ul>
      <ul>
          <li><a href="#">All-Type Helmets</a></li>
          <li><a href="#">All-Type Chestplates</a></li>
          <li><a href="#">All-Type Leggings</a></li>
          <li><a href="#">All-Type Boots</a></li>
          <li><a href="#">Horse Armour</a></li>
          <li><a href="#">Tridents</a></li>
      </ul>`,
    fooddrink: `<ul>
          <li><a href="#">Golden Apples</a></li>
          <li><a href="#">Enchanted Gapples</a></li>
          <li><a href="#">Chorus Fruit</a></li>
          <li><a href="#">Drinks</a></li>
      </ul>
      <ul>
          <li><a href="#">Cocaine</a></li>
          <li><a href="#">Potions</a></li>
          <li><a href="#">Splash Potions</a></li>
          <li><a href="#">Lingering Potions</a></li>
      </ul>`,
    ingredients: `<ul>
          <li><a href="#">Nether Warts</a></li>
          <li><a href="#">Blaze Rods</a></li>
          <li><a href="#">Raw Gold</a></li>
          <li><a href="#">Bottle o' Enchanting</a></li>
          <li><a href="#">Bones</a></li>
      </ul>
      <ul>
          <li><a href="#">Pottery Sherd</a></li>
          <li><a href="#">Smithing Template</a></li>
          <li><a href="#">Enchanted Books</a></li>
          <li><a href="#">Nether Star</a></li>
          <li><a href="#">Eye of Ender</a></li>
      </ul>`,
  };
</script>

<main>
  <div id="wrapper">
    <div id="container" class="flex-row">
      <Sidebar />
      <div id="content" class="flex-col">
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
        <div class="flex-col" style="gap: var(--u-main-gap);">
          <span>
            <ContentSection
              titleHtml="<a href='#' style='display: inline-block; width: 100%;'>Building</a>"
              contentHtml={catagoriesContent.building}
            />
            <ContentSection
              titleHtml="<a href='#' style='display: inline-block; width: 100%;'>Colored</a>"
              contentHtml={catagoriesContent.colored}
            />
            <ContentSection
              titleHtml="<a href='#' style='display: inline-block; width: 100%;'>Natural</a>"
              contentHtml={catagoriesContent.natural}
            />
          </span>
          <span>
            <ContentSection
              titleHtml="<a href='#' style='display: inline-block; width: 100%;'>Functional</a>"
              contentHtml={catagoriesContent.functional}
            />
            <ContentSection
              titleHtml="<a href='#' style='display: inline-block; width: 100%;'>Redstone</a>"
              contentHtml={catagoriesContent.redstone}
            />
          </span>
          <span>
            <ContentSection
              titleHtml="<a href='#' style='display: inline-block; width: 100%;'>Ingredients</a>"
              contentHtml={catagoriesContent.ingredients}
            />
            <ContentSection
              titleHtml="<a href='#' style='display: inline-block; width: 100%;'>Combat</a>"
              contentHtml={catagoriesContent.combat}
            />
          </span>
          <span>
            <ContentSection
              titleHtml="<a href='#' style='display: inline-block; width: 100%;'>Food &amp; Drinks</a>"
              contentHtml={catagoriesContent.fooddrink}
            />
            <ContentSection
              titleHtml="<a href='#' style='display: inline-block; width: 100%;'>Tools &amp; Utility</a>"
              contentHtml={catagoriesContent.toolsUtility}
            />
          </span>
        </div>
      </div>
      <LocationsSidebar />
    </div>
  </div>
</main>

<style>
  #container {
    width: 100%;
    height: auto;
    gap: var(--u-main-gap);
    margin: 0 auto;

    & header {
      flex-shrink: 1;
      padding: 0.5rem 1rem;

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
    flex-shrink: 1;
    gap: var(--u-main-gap);
    padding-bottom: var(--u-main-gap);

    & header > h1 {
      flex-grow: 1;
    }

    & > div span {
      gap: var(--u-main-gap);
      display: inline-flex;
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

  .grid-3x3 {
    display: grid;
    grid-template-columns: repeat(3, auto);

    & * {
      box-sizing: border-box;
    }
  }
</style>
