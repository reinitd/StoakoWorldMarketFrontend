document.addEventListener("DOMContentLoaded", () => {
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
