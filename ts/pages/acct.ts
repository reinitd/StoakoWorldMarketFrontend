document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = getCookieValue("WORLDMARKETAPIKEY");
    if (apiKey == null) {
        window.location.replace('https://mc-auth.com/oAuth2/authorize?client_id=3407823596079285374&redirect_uri=https%3A%2F%2Fstoako.com%2Flogin&scope=profile&response_type=code');
    }

    const loadingScreen = document.getElementById('loading');
    const spinner = document.getElementById('spinner');

    const jwt = WMJWTDecode(apiKey);
    document.getElementById('js-head-img').setAttribute('src', `https://crafatar.com/avatars/${jwt.payload.uuid}.png`);

    const populateUserResult = await populateUserInfo(jwt.payload.uuid);
    if (!populateUserResult.success) {
        spinner.remove();
        const warning = document.createElement('p');
        warning.innerHTML = `There's been an error fetching your user data.<br/><br/><pre><code>${populateUserResult.message}</code></pre>`;
        warning.style.padding = '1rem';
        loadingScreen.appendChild(warning);
        return;
    }

    const user = populateUserResult.value;
    const pathname = this.location.pathname.toLowerCase();

    if (pathname == '/acct/edit') {
        confirmLeave();
        await handleEdit(user, apiKey);
    } else if (pathname == '/acct/vl') {
        await handleVL(apiKey);
    }

    loadingScreen.remove();
    //@ts-ignore
    tippy('#tippy-reload', { content: "Refresh username", placement: 'right', delay: [500, 0] });
});

async function handleEdit(user:User, apiKey:string) {
    const nationAffiliationInput = document.getElementById('js-nation-affiliation-input') as HTMLInputElement;
    const locationInput = document.getElementById('js-location-input') as HTMLInputElement;
    const submit = document.getElementById('js-submit-edits');

    nationAffiliationInput.setAttribute('value', user.nationAffiliation);
    nationAffiliationInput.setAttribute('placeholder', user.nationAffiliation);
    locationInput.setAttribute('value', user.location);
    locationInput.setAttribute('placeholder', user.location);

    submit.addEventListener('click', async () => {

        if (isEmpty(nationAffiliationInput.value)) {
            nationAffiliationInput.value = user.nationAffiliation;
        }

        if (isEmpty(locationInput.value)) {
            locationInput.value = user.location;
        }

        user.nationAffiliation = nationAffiliationInput.value.trim();
        user.location = locationInput.value.trim();

        const updateRes = await updateUser(user, apiKey);
        showModal({ title: updateRes.success ? "Success" : "Uh oh.", content: updateRes.message });
    });
}


async function handleVL(apiKey: string) {
    const jwt = WMJWTDecode(apiKey);
    const searchResults = document.getElementById('search-results');
    const pageBack = document.getElementById('js-page-back');
    const pageForward = document.getElementById('js-page-forward');
    const loadingScreen = document.getElementById('loading');
    const spinner = document.getElementById('spinner');
    const filter = {
        showOnlyActive: document.getElementById('js-filter-show-only-active') as HTMLInputElement,
        showOnlyInactive: document.getElementById('js-filter-show-only-inactive') as HTMLInputElement,
        clear: document.getElementById('js-clear-filter'),
        apply: document.getElementById('js-apply-filter')
    };

    const pageNumber: number = getParamFromUrl("pagenumber", Number) as number ?? 1;
    const pageAmount: number = getParamFromUrl("pageamount", Number) as number ?? 20;


    const fShowOnlyActive = getParamFromUrl('fshowonlyactive', Boolean) as boolean ?? false;
    const fShowOnlyInactive = getParamFromUrl('fshowonlyinactive', Boolean) as boolean ?? false;

    fShowOnlyActive && (filter.showOnlyActive.checked = fShowOnlyActive);
    fShowOnlyInactive && (filter.showOnlyInactive.checked = fShowOnlyInactive);


    filter.clear.onclick = () => {
        location.href = `/acct/vl?pageNumber=${pageNumber}&pageAmount=${pageAmount}`;
    };
    filter.apply.onclick = () => {
        const currentFSOA = filter.showOnlyActive.checked;
        const currentFSOI = filter.showOnlyInactive.checked;

        let filters = [];

        if (currentFSOA) {
            filters.push(
                ['fshowonlyactive', encodeURIComponent(currentFSOA)]
            );
        }
        if (currentFSOI) {
            filters.push(
                ['fshowonlyinactive', encodeURIComponent(currentFSOI)]
            );
        }

        let fUrl = `/acct/vl?pageNumber=${encodeURIComponent(pageNumber)}&pageAmount=${encodeURIComponent(pageAmount)}`;
        filters.forEach(f => {
            fUrl += `&${f[0]}=${encodeURIComponent(f[1])}`;
        });

        location.href = fUrl;
    };

    document.getElementById('js-page-number').textContent = pageNumber.toString();

    const res = await fetchCatalogEntriesFromSeller(jwt.payload.uuid, pageNumber, pageAmount, fShowOnlyActive, fShowOnlyInactive, apiKey);

    if (!res.success) {
        const warning = document.createElement('p');
        warning.innerHTML = `There's been an error fetching the search result data.<br/><br/><code>${res.message}</code>`;
        warning.style.padding = '1rem';
        searchResults.parentElement.parentElement.prepend(warning);
        document.getElementById('js-search-results-table').remove();
        loadingScreen.remove();
        throw new Error(`Error when fetching data: ${res.message}`);
    }

    res.value.forEach(async ce => {
        const tr = await makeVlCeHtml(ce);
        searchResults.appendChild(tr);
    });



    const nextPageRes = await fetchCatalogEntriesFromSeller(jwt.payload.uuid, pageNumber + 1, pageAmount, fShowOnlyActive, fShowOnlyInactive, apiKey);
    if (pageNumber <= 1) {
        pageBack.style.cursor = 'not-allowed';
    } else {
        pageBack.onclick = () => {
            if ((pageNumber - 1) > 0) {
                location.href = `/acct/vl?pageNumber=${pageNumber - 1}&pageAmount=${pageAmount}&showOnlyActive=${fShowOnlyActive}&showOnlyInactive=${fShowOnlyInactive}`;
            }
        };
    }
    
    if (searchResults.children.length < 20 && (nextPageRes.value == null || nextPageRes.value.length == 0)) {
        pageForward.style.cursor = 'not-allowed';
    } else {
        pageForward.onclick = () => {
            location.href = `/acct/vl?pageNumber=${pageNumber + 1}&pageAmount=${pageAmount}&showOnlyActive=${fShowOnlyActive}&showOnlyInactive=${fShowOnlyInactive}`;
        };
    }

    const sortTable = (attribute: string, ascending = true, isNumeric = true, isAttribute = false) => {
        let rowsArray = Array.from(searchResults.getElementsByTagName('tr'));

        rowsArray.sort((a, b) => {
            let valueA, valueB;
            if (isAttribute) {
                valueA = a.getAttribute(attribute);
                valueB = b.getAttribute(attribute);
            } else {
                valueA = a.querySelector(attribute).textContent;
                valueB = b.querySelector(attribute).textContent;
            }

            if (isNumeric) {
                valueA = Number(valueA);
                valueB = Number(valueB);
            }

            if (ascending) {
                return valueA - valueB;
            } else {
                return valueB - valueA;
            }
        });

        rowsArray.forEach(row => searchResults.appendChild(row));
    };

    // document.getElementById('js-sort-by-price-cheapest').onclick = () => {
    //     sortTable('.ce-payment-price', true);
    // };

    // document.getElementById('js-sort-by-price-expensive').onclick = () => {
    //     sortTable('.ce-payment-price', false);
    // };

    document.getElementById('js-sort-by-creation-latest').onclick = () => {
        sortTable('data-creation', false, true, true);
    };

    document.getElementById('js-sort-by-creation-oldest').onclick = () => {
        sortTable('data-creation', true, true, true);
    };

    document.getElementById('js-sort-by-quantity-most').onclick = () => {
        sortTable('.ce-quantity', false);
    };

    document.getElementById('js-sort-by-quantity-least').onclick = () => {
        sortTable('.ce-quantity', true);
    };

    loadingScreen.remove();
}