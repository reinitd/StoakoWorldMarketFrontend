<script>
    export let titleHtml = "";
    export let contentHtml = "";
</script>

<section class="content-section">
    <p class="content border-vertical"><strong>{@html titleHtml}</strong></p>
    <div class="links">{@html contentHtml}</div>
</section>

<style>
    .content-section {
        width: fit-content;
        align-items: center;

        & p {
            padding: 0.1rem 0;
            text-align: center;
            font-size: 0.925rem;
        }

        & .links {
            display: inline-flex;
            gap: 1rem;

            & ul {
                margin: 0;
                padding: 0;
                list-style-type: none;

                & li {
                    border-bottom: 1px solid #404040;
                    & * {
                        width: 100%;
                        display: inline-block;
                    }
                }
                & li:hover {
                    color: #dd65f3;
                    background-color: #232426;
                    text-decoration: underline;
                    & * {
                        color: #dd65f3;
                    }
                }
            }
        }
    }
</style>
