var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => __awaiter(this, void 0, void 0, function* () {
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
    filter.clear.onclick = () => {
        location.href = `/search?query=${query}&pageNumber=${pageNumber}&pageAmount=${pageAmount}`;
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
        let furl = `/search?query=${encodeURIComponent(query)}&pageNumber=${encodeURIComponent(pageNumber)}&pageAmount=${encodeURIComponent(pageAmount)}`;
        filters.forEach(f => {
            furl += `&${f[0]}=${encodeURIComponent(f[1])}`;
        });
        location.href = furl;
    };
    document.getElementById('js-page-number').textContent = pageNumber.toString();
    let res;
    if (query == null) {
        res = yield fetchAllCatalogEntries(pageNumber, pageAmount);
    }
    else {
        res = yield searchCatalogEntries(query, pageNumber, pageAmount);
    }
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
            (!fCategory || ce.category.toLowerCase().includes(fCategory.toLowerCase()))) {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const span1 = document.createElement('span');
            const img = document.createElement('img');
            img.src = `https://crafatar.com/avatars/${ce.sellerUuid}.png`;
            img.alt = 'MC Head';
            span1.appendChild(img);
            td1.appendChild(span1);
            const td2 = document.createElement('td');
            td2.textContent = ce.title;
            const td3 = document.createElement('td');
            td3.classList.add('ce-category');
            td3.textContent = ce.category;
            const td4 = document.createElement('td');
            td4.classList.add('ce-quantity');
            td4.textContent = ce.quantity.toString();
            const td5 = document.createElement('td');
            td5.classList.add('flex-col');
            const p1 = document.createElement('p');
            p1.classList.add('ce-location');
            p1.textContent = ce.location;
            const p2 = document.createElement('p');
            p2.classList.add('ce-creation');
            p2.textContent = formatUnixTimeMMDDYYYY(ce.creation);
            td5.appendChild(p1);
            td5.appendChild(p2);
            const td6 = document.createElement('td');
            const span3 = document.createElement('span');
            span3.classList.add('ce-payment-price');
            span3.style.marginRight = '.5ch';
            span3.textContent = payment.Amount;
            const span4 = document.createElement('span');
            span4.classList.add('ce-payment-type');
            span4.textContent = payment.Type;
            td6.appendChild(span3);
            td6.appendChild(span4);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            const userRes = yield fetchUser(ce.sellerUuid);
            if (userRes.success) {
                tr.setAttribute('data-affiliation', userRes.value.nationAffiliation);
                tr.setAttribute('data-seller-username', userRes.value.minecraftUsername);
            }
            tr.setAttribute('data-uuid', ce.uuid);
            tr.setAttribute('data-creation', ce.creation.toString());
            searchResults.appendChild(tr);
        }
    }));
    const nextPageRes = yield searchCatalogEntries(query, pageNumber + 1, pageAmount);
    if (searchResults.children.length < 20 && nextPageRes.value.length == 0) {
        pageBack.style.cursor = 'not-allowed';
        pageForward.style.cursor = 'not-allowed';
    }
    else {
        pageBack.onclick = () => {
            if ((pageNumber - 1) > 0) {
                location.href = `/search?query=${query}&pageNumber=${pageNumber - 1}&pageAmount=${pageAmount}`;
            }
        };
        pageForward.onclick = () => {
            location.href = `/search?query=${query}&pageNumber=${pageNumber + 1}&pageAmount=${pageAmount}`;
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
}));
