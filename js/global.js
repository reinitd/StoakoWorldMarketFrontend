function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const emoteMap = {
    ':smile:': '<img src="/assets/emotes/smile.gif" alt="smiley"/>',
    ':metal:': '<img src="/assets/emotes/metal.gif" alt="metal"/>',
    ':thumbup:': '<img src="/assets/emotes/thumbup.gif" alt="thumbup"/>',
    ':thumbdown:': '<img src="/assets/emotes/thumbdown.gif" alt="thumbdown"/>',
    ':banghead:': '<img src="/assets/emotes/banghead.gif" alt="banghead"/>',
    ':feedback:': '<img src="/assets/emotes/feedback.gif" alt="feedback"/>',
    ':crazy:': '<img src="/assets/emotes/crazy.gif" alt="crazy"/>',
    ':biggrin:': '<img src="/assets/emotes/biggrin.gif" alt="biggrin"/>',
    ':beer:': '<img src="/assets/emotes/beer.gif" alt="beer"/>',
    ':party:': '<img src="/assets/emotes/party.gif" alt="party"/>',
};
document.addEventListener("DOMContentLoaded", async () => {
    // Begin CA Check
    /*
    ##### NOTICE #####
    This will go away once the closed-alpha is over.
    If you want to view the code, it is located here:
        - https://github.com/reinitd/StoakoWorldMarketFrontend/tree/production
    
    */
    const apiKey = getCookieValue("WORLDMARKETAPIKEY");
    if (apiKey == null && window.location.pathname != '/login') {
        window.location.replace("https://mc-auth.com/oAuth2/authorize?client_id=3407823596079285374&redirect_uri=https%3A%2F%2Fwm.stoako.com%2Flogin&scope=profile&response_type=code");
    }
    // End CA Check
    const search = document.getElementById('search');
    search.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            let url = `/search?q=${search.value}&pageNumber=1&pageAmount=20`;
            location.href = url;
        }
    });
    replaceTextInDocument(document.body);
});
function confirmLeave() {
    window.addEventListener('load', function () {
        fetch(window.location.href, {
            method: 'POST',
            body: JSON.stringify({ data: 'example' }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                window.history.replaceState({}, '', window.location.href.replace('#cfr', '') + '#cfr');
            }
        });
    });
    window.addEventListener('beforeunload', function (event) {
        // This will cause the "Confirm form resubmission" dialog to appear
        event.preventDefault();
        event.returnValue = '';
    });
    window.addEventListener('popstate', function (event) {
        if (window.location.hash === '#cfr') {
            window.history.replaceState({}, '', window.location.href.split('#')[0]);
            window.location.reload();
        }
    });
}
function replaceTextWithHTML(node, emoteMap) {
    let desc = node.nodeValue;
    let parentNode = node.parentNode;
    for (const [key, value] of Object.entries(emoteMap)) {
        const regex = new RegExp(key, 'g');
        desc = desc.replace(regex, value);
    }
    if (desc !== node.nodeValue) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(desc, 'text/html');
        while (doc.body.firstChild) {
            parentNode.insertBefore(doc.body.firstChild, node);
        }
        parentNode.removeChild(node);
    }
}
function replaceTextInDocument(element) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
    let node;
    while ((node = walker.nextNode())) {
        replaceTextWithHTML(node, emoteMap);
    }
}
