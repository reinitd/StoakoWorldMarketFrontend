document.addEventListener('DOMContentLoaded', async () => {
    const pageNumber: number = getParamFromUrl("pagenumber", Number) as number ?? 1;
    const pageAmount: number = getParamFromUrl("pageamount", Number) as number ?? 20;
    const pageBack = document.getElementById('js-page-back');
    const pageForward = document.getElementById('js-page-forward');
    const loadingScreen = document.getElementById('loading');
    const spinner = document.getElementById('spinner');
    const searchResults = document.getElementById('search-results');

    const uuid = getParamFromUrl("uuid", String) as string;
    if (uuid == null) {
        window.location.replace('/');
    }

    document.getElementById('js-head-img').setAttribute('src', `https://crafatar.com/avatars/${uuid}.png`);

    const populateUserResult = await populateUserInfo(uuid);
    if (!populateUserResult.success) {
        spinner.remove();
        const warning = document.createElement('p');
        warning.innerHTML = `There's been an error fetching your user data.<br/><br/><pre><code>${populateUserResult.message}</code></pre>`;
        warning.style.padding = '1rem';
        loadingScreen.appendChild(warning);
        return;
    }

    const user = populateUserResult.value;

    const filter = {
        location: document.getElementById('js-filter-location') as HTMLInputElement,
        payementType: document.getElementById('js-filter-payment-type') as HTMLInputElement,
        category: document.getElementById('js-filter-category') as HTMLInputElement,
        clear: document.getElementById('js-clear-filter'),
        apply: document.getElementById('js-apply-filter')
    };

    const fLocation = getParamFromUrl('flocation', String) as string;
    const fPaymentType = getParamFromUrl('fpaymenttype', String) as string;
    const fCategory = getParamFromUrl('fcategory', String) as string;

    fLocation && (filter.location.value = fLocation);
    fPaymentType && (filter.payementType.value = fPaymentType);
    fCategory && (filter.category.value = fCategory);

    filter.clear.onclick = () => {
        location.href = `/user?uuid=${uuid}&pageNumber=${pageNumber}&pageAmount=${pageAmount}`;
    };
    filter.apply.onclick = () => {
        const currentFLocation = filter.location.value.trim();
        const currentFPaymentType = filter.payementType.value.trim();
        const currentFCategory = filter.category.value.trim();

        let filters = [];

        if (currentFLocation !== '') {
            filters.push(
                ['flocation', encodeURIComponent(currentFLocation)]
            );
        }
        if (currentFPaymentType !== '') {
            filters.push(
                ['fpaymenttype', encodeURIComponent(currentFPaymentType)]
            );
        }
        if (currentFCategory !== '') {
            filters.push(
                ['fcategory', encodeURIComponent(currentFCategory)]
            );
        }

        let fUrl = `/user?uuid=${uuid}&pageNumber=${encodeURIComponent(pageNumber)}&pageAmount=${encodeURIComponent(pageAmount)}`;
        filters.forEach(f => {
            fUrl += `&${f[0]}=${encodeURIComponent(f[1])}`;
        });

        location.href = fUrl;
    };

    document.getElementById('js-page-number').textContent = pageNumber.toString();

    const res = await fetchAllCatalogEntries(pageNumber, pageAmount);

    if (!res.success) {
        const warning = document.createElement('p');
        warning.innerHTML = `There's been an error fetching the search result data.<br/><br/><code>${res.message}</code>`;
        warning.style.padding = '1rem';
        searchResults.parentElement.parentElement.appendChild(warning);
        document.getElementById('js-search-results-table').remove();
        throw new Error(`Error when fetching data: ${res.message}`);
    }

    res.value.forEach(async ce => {

        const payment = JSON.parse(ce.paymentJson);

        if (
            (!fLocation || ce.location.toLowerCase().includes(fLocation.toLowerCase())) &&
            (!fPaymentType || payment.Type.toLowerCase().includes(fPaymentType.toLowerCase())) &&
            (!fCategory || ce.category.toLowerCase().includes(fCategory.toLowerCase())) &&
            (ce.sellerUuid == uuid)
        ) {

            const tr = await makeCeHtml(ce);

            searchResults.appendChild(tr);
        }
    });

    const nextPageRes = await fetchAllCatalogEntries(pageNumber + 1, pageAmount);
    if (searchResults.children.length < 20 && nextPageRes.value.length == 0) {
        pageBack.style.cursor = 'not-allowed';
        pageForward.style.cursor = 'not-allowed';
    } else {
        pageBack.onclick = () => {
            if ((pageNumber - 1) > 0) {
                location.href = `/user?uuid=${uuid}&pageNumber=${pageNumber - 1}&pageAmount=${pageAmount}`;
            }
        };
        pageForward.onclick = () => {
            location.href = `/user?uuid=${uuid}&pageNumber=${pageNumber + 1}&pageAmount=${pageAmount}`;
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
    Array.from(searchResults.children).forEach((ce: HTMLElement) => {
        ce.addEventListener('click', () => {
            location.href = `/ce?uuid=${ce.getAttribute('data-uuid')}`;
        });
    });

    loadingScreen.remove();
});