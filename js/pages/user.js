var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => __awaiter(this, void 0, void 0, function* () {
    var _a, _b;
    const pageNumber = (_a = getParamFromUrl("pagenumber", Number)) !== null && _a !== void 0 ? _a : 1;
    const pageAmount = (_b = getParamFromUrl("pageamount", Number)) !== null && _b !== void 0 ? _b : 20;
    const pageBack = document.getElementById('js-page-back');
    const pageForward = document.getElementById('js-page-forward');
    const loadingScreen = document.getElementById('loading');
    const spinner = document.getElementById('spinner');
    const searchResults = document.getElementById('search-results');
    const uuid = getParamFromUrl("uuid", String);
    if (uuid == null) {
        window.location.replace('/');
    }
    document.getElementById('js-head-img').setAttribute('src', `https://crafatar.com/avatars/${uuid}.png`);
    const populateUserResult = yield populateUserInfo(uuid);
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
        location: document.getElementById('js-filter-location'),
        payementType: document.getElementById('js-filter-payment-type'),
        category: document.getElementById('js-filter-category'),
        clear: document.getElementById('js-clear-filter'),
        apply: document.getElementById('js-apply-filter')
    };
    const fLocation = getParamFromUrl('flocation', String);
    const fPaymentType = getParamFromUrl('fpaymenttype', String);
    const fCategory = getParamFromUrl('fcategory', String);
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
            filters.push(['flocation', encodeURIComponent(currentFLocation)]);
        }
        if (currentFPaymentType !== '') {
            filters.push(['fpaymenttype', encodeURIComponent(currentFPaymentType)]);
        }
        if (currentFCategory !== '') {
            filters.push(['fcategory', encodeURIComponent(currentFCategory)]);
        }
        let fUrl = `/user?uuid=${uuid}&pageNumber=${encodeURIComponent(pageNumber)}&pageAmount=${encodeURIComponent(pageAmount)}`;
        filters.forEach(f => {
            fUrl += `&${f[0]}=${encodeURIComponent(f[1])}`;
        });
        location.href = fUrl;
    };
    document.getElementById('js-page-number').textContent = pageNumber.toString();
    const res = yield fetchAllCatalogEntries(pageNumber, pageAmount);
    if (!res.success) {
        const warning = document.createElement('p');
        warning.innerHTML = `There's been an error fetching the search result data.<br/><br/><code>${res.message}</code>`;
        warning.style.padding = '1rem';
        searchResults.parentElement.parentElement.appendChild(warning);
        document.getElementById('js-search-results-table').remove();
        throw new Error(`Error when fetching data: ${res.message}`);
    }
    res.value.forEach((ce) => __awaiter(this, void 0, void 0, function* () {
        const payment = JSON.parse(ce.paymentJson);
        if ((!fLocation || ce.location.toLowerCase().includes(fLocation.toLowerCase())) &&
            (!fPaymentType || payment.Type.toLowerCase().includes(fPaymentType.toLowerCase())) &&
            (!fCategory || ce.category.toLowerCase().includes(fCategory.toLowerCase())) &&
            (ce.sellerUuid == uuid)) {
            const tr = yield makeCeHtml(ce);
            searchResults.appendChild(tr);
        }
    }));
    const nextPageRes = yield fetchAllCatalogEntries(pageNumber + 1, pageAmount);
    if (searchResults.children.length < 20 && nextPageRes.value.length == 0) {
        pageBack.style.cursor = 'not-allowed';
        pageForward.style.cursor = 'not-allowed';
    }
    else {
        pageBack.onclick = () => {
            if ((pageNumber - 1) > 0) {
                location.href = `/user?uuid=${uuid}&pageNumber=${pageNumber - 1}&pageAmount=${pageAmount}`;
            }
        };
        pageForward.onclick = () => {
            location.href = `/user?uuid=${uuid}&pageNumber=${pageNumber + 1}&pageAmount=${pageAmount}`;
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
    yield delay(250);
    Array.from(searchResults.children).forEach((ce) => {
        ce.addEventListener('click', () => {
            location.href = `/ce?uuid=${ce.getAttribute('data-uuid')}`;
        });
    });
    loadingScreen.remove();
}));
