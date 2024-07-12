<script>
  export let title = "";
  export let content = "";
  export let showModal = false;

  const closeModal = () => {
    showModal = false;
  };
</script>

{#if showModal}
  <div class="modal" on:click={closeModal}>
    <div class="modal-content" on:click|stopPropagation>
      <span class="close" on:click={closeModal}>&times;</span>
      <h2>{title}</h2>
      <p>{@html content}</p>
    </div>
  </div>
{/if}

<style>
  .modal {
    display: block;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    background-color: #1f2122;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: fit-content;
    word-wrap: break-word;
    font-size: 0.95rem !important;
    text-align: left !important;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #777;
    text-decoration: none;
    cursor: pointer;
  }
</style>
