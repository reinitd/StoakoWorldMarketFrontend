<script lang="ts">
    import Modal from "./Modal.svelte";

    const scamModalContent = `The overwhelming majority of WorldMarket users are trustworthy and well-meaning.<br/>
    <br/>
    Sometimes you may encounter someone pretending to be a WorldMarket user or other trusted authority<br/>in order to get your money, items, or personal information.<br/>
    <br/>
    We have gathered some indicators that may help you stay safe and identify fake offers on WorldMarket:`;

    const safetyContent = `The overwhelming majority of WorldMarket users are trustworthy and well-meaning.<br/>
    <br/>
    As with all transactions, please practice caution when interacting with others.<br/>
    <br/>
    When meeting someone for the first time, please remember to:<br/>
    <ul>
        <li>Insist on a public meeting place like a bank or police department.</li>
        <li>Do not meet in a secluded place or invite strangers into your home.</li>
        <li>Be especially careful buying/selling high value items.</li>
        <li>Tell a friend or family member where you're going.</li>
        <li>Consider having a friend accompany you.</li>
        <li>Trust your instincts.</li>
    </ul>
    Taking these simple precautions helps make WorldMarket safer for everyone.`;

    let showHelpModal = false;
    let showScamModal = false;
    let showSafetyModal = false;

    const openScamModal = () => {
        showScamModal = true;
    };
    const openSafetyModal = () => {
        showSafetyModal = true;
    };
    const openHelpModal = () => {
        showHelpModal = true;
    };
</script>

<div id="sidebar" class="content flex-col border-lateral">
    <div style="display: flex; flex-direction: column; align-items: center;">
        <div id="blurb">
            <p>WM</p>
        </div>
        <br />
        <span id="post-container">
            <i class="bx bx-edit"></i>
            <p>post an item</p>
        </span>
        <br />
        <span id="search-container">
            <i class="bx bx-fw bx-search-alt-2"></i>
            <input type="text" id="search" placeholder="search worldmarket" />
        </span>
    </div>
    <div class="sidebar-group blue-text">
        <p on:click={openHelpModal}>help, faq, abuse, legal</p>
        <Modal
            title="Coming Soon."
            content='The "help, faq, abuse, legal" page is coming soon <small>(probably never)</small>.'
            bind:showModal={showHelpModal}
        />
        <p on:click={openScamModal}>avoid scams and fraud</p>
        <Modal
            title="Scams"
            content={scamModalContent}
            bind:showModal={showScamModal}
        />

        <p on:click={openSafetyModal}>personal safety tips</p>
        <Modal
            title="Safety"
            content={safetyContent}
            bind:showModal={showSafetyModal}
        />
    </div>
    <div class="sidebar-group blue-text">
        <p>about WorldMarket</p>
        <p>WorldMarket is hiring</p>
    </div>
    <div class="sidebar-group blue-text">
        <p>WorldMarket is brought to you by New Stoako.</p>
    </div>
</div>

<style>
    #sidebar {
        flex-grow: 1;
        gap: 5rem;
        padding: 1rem 0.5rem;
        max-width: 20%;
        width: auto;
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    #blurb {
        text-align: center;
        user-select: none;
        min-width: 0;
        width: fit-content;
        margin: 0;
        padding: 0 1rem;
        height: fit-content;
        border: 1px solid #404446;
        border-radius: 10px;
        background-image: url("/images/stoakoflag.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    #blurb p {
        font-weight: bold;
        color: white;
        -webkit-text-stroke: 2px black;
        font-size: clamp(1rem, 3.75rem, 4rem);
        margin: 0;
        padding: 0;
        display: inline-block;
        white-space: nowrap;
    }

    #post-container {
        cursor: pointer;
        background-color: #151515;
        display: flex;
        border-radius: 5px;
        padding: 0;
        margin: 0;
        align-items: center;
        justify-content: space-between;
        padding: 0.2rem 0.3rem;
        gap: 2.5px;
        height: min-content;
        color: #7be459;

        & p {
            margin: 0;
            font-weight: 500;
            font-size: .9rem;
        }

        & i {
            line-height: 100%;
            font-size: 1.25rem;
        }
    }
    #post-container:hover p {
        text-decoration: underline;
    }

    #search-container {
        background-color: #3b3b3b;
        display: flex;
        border-radius: 5px;
        align-items: center;
        justify-content: space-evenly;
        padding: 0.3rem 0.1rem;

        & i {
            padding: 0.2rem;
            opacity: 0.7;
            line-height: 100%;
            font-size: 1.5rem;
        }
    }
    #search-container:focus-within {
        outline: 2px solid white;
    }
    #search {
        outline: 0;
        min-width: 0;
        width: 100%;
        height: 100%;
        font-size: 0.9rem;
        border-radius: 3px;
        border: 0;
        box-sizing: border-box;
    }

    .sidebar-group {
        font-size: 0.9rem;
        text-align: center;
        & p {
            margin: 0;
        }
    }
</style>
