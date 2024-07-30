document.addEventListener("DOMContentLoaded", async () => {
    var _a, _b, _c;
    const searchResults = document.getElementById('search-results');
    const pageBack = document.getElementById('js-page-back');
    const pageForward = document.getElementById('js-page-forward');
    const loadingScreen = document.getElementById('loading');
    const spinner = document.getElementById('spinner');
    const filter = {
        location: document.getElementById('js-filter-location'),
        payementType: document.getElementById('js-filter-payment-type'),
        category: document.getElementById('js-filter-category'),
        clear: document.getElementById('js-clear-filter'),
        apply: document.getElementById('js-apply-filter')
    };
    const query = (_a = getParamFromUrl("q", String)) !== null && _a !== void 0 ? _a : '';
    const pageNumber = (_b = getParamFromUrl("pagenumber", Number)) !== null && _b !== void 0 ? _b : 1;
    const pageAmount = (_c = getParamFromUrl("pageamount", Number)) !== null && _c !== void 0 ? _c : 20;
    const fLocation = getParamFromUrl('flocation', String);
    const fPaymentType = getParamFromUrl('fpaymenttype', String);
    const fCategory = getParamFromUrl('fcategory', String);
    fLocation && (filter.location.value = fLocation);
    fPaymentType && (filter.payementType.value = fPaymentType);
    fCategory && (filter.category.value = fCategory);
    const searchFilters = new SearchFilters(fLocation, fPaymentType, fCategory);
    filter.clear.onclick = () => {
        location.href = `/search?q=${query}&pageNumber=${pageNumber}&pageAmount=${pageAmount}`;
    };
    filter.apply.onclick = () => {
        const currentFLocation = filter.location.value.trim();
        const currentFPaymentType = filter.payementType.value.trim();
        const currentFCategory = filter.category.value.trim();
        let filters = [];
        if (currentFLocation !== '') {
            filters.push(['flocation', encodeURIComponent(currentFLocation)]);
        }
        if (currentFPaymentType !== '') {
            filters.push(['fpaymenttype', encodeURIComponent(currentFPaymentType)]);
        }
        if (currentFCategory !== '') {
            filters.push(['fcategory', encodeURIComponent(currentFCategory)]);
        }
        let fUrl = `/search?q=${encodeURIComponent(query)}&pageNumber=${encodeURIComponent(pageNumber)}&pageAmount=${encodeURIComponent(pageAmount)}`;
        filters.forEach(f => {
            fUrl += `&${f[0]}=${encodeURIComponent(f[1])}`;
        });
        location.href = fUrl;
    };
    document.getElementById('js-page-number').textContent = pageNumber.toString();
    const res = await searchCatalogEntries(query, pageNumber, pageAmount, searchFilters);
    if (!res.success) {
        const warning = document.createElement('p');
        warning.innerHTML = `There's been an error fetching the search result data.<br/><br/><code>${res.message}</code>`;
        warning.style.padding = '1rem';
        searchResults.parentElement.parentElement.prepend(warning);
        document.getElementById('js-search-results-table').remove();
        loadingScreen.remove();
        throw new Error(`Error when fetching data: ${res.message}`);
    }
    res.value.forEach(async (ce) => {
        const tr = await makeCeHtml(ce);
        searchResults.appendChild(tr);
    });
    const nextPageRes = await searchCatalogEntries(query, pageNumber + 1, pageAmount, searchFilters);
    if (pageNumber <= 1) {
        pageBack.style.cursor = 'not-allowed';
    }
    else {
        pageBack.onclick = () => {
            if ((pageNumber - 1) > 0) {
                location.href = `/search?q=${query}&pageNumber=${pageNumber - 1}&pageAmount=${pageAmount}`;
            }
        };
    }
    if (searchResults.children.length < 20 && (nextPageRes.value == null || nextPageRes.value.length == 0)) {
        pageForward.style.cursor = 'not-allowed';
    }
    else {
        pageForward.onclick = () => {
            location.href = `/search?q=${query}&pageNumber=${pageNumber + 1}&pageAmount=${pageAmount}`;
        };
    }
    const sortTable = (attribute, ascending = true, isNumeric = true, isAttribute = false) => {
        let rowsArray = Array.from(searchResults.getElementsByTagName('tr'));
        rowsArray.sort((a, b) => {
            let valueA, valueB;
            if (isAttribute) {
                valueA = a.getAttribute(attribute);
                valueB = b.getAttribute(attribute);
            }
            else {
                valueA = a.querySelector(attribute).textContent;
                valueB = b.querySelector(attribute).textContent;
            }
            if (isNumeric) {
                valueA = Number(valueA);
                valueB = Number(valueB);
            }
            if (ascending) {
                return valueA - valueB;
            }
            else {
                return valueB - valueA;
            }
        });
        rowsArray.forEach(row => searchResults.appendChild(row));
    };
    document.getElementById('js-sort-by-price-cheapest').onclick = () => {
        sortTable('.ce-payment-price', true);
    };
    document.getElementById('js-sort-by-price-expensive').onclick = () => {
        sortTable('.ce-payment-price', false);
    };
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
    await delay(250);
    Array.from(searchResults.children).forEach((ce) => {
        var _a;
        //@ts-ignore
        tippy(ce.children[0], {
            content: (_a = ce.getAttribute('data-seller-username')) !== null && _a !== void 0 ? _a : 'Unknown User',
            placement: 'top'
        });
        ce.addEventListener('click', () => {
            location.href = `/ce?uuid=${ce.getAttribute('data-uuid')}`;
        });
    });
    loadingScreen.remove();
});
