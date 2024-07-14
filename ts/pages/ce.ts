document.addEventListener("DOMContentLoaded", async function () {

    const uuid = getParamFromUrl("uuid", String) as string;
    if (uuid == null) {
        this.location.href = '/search';
    }

    const loadingScreen = document.getElementById('loading');
    const spinner = document.getElementById('spinner');

    const ceResult = await fetchCatalogEntry(uuid);
    if (!ceResult.success) {
        spinner.remove();
        const warning = document.createElement('p');
        warning.innerHTML = `There's been an error fetching the catalog entry data.<br/><br/><pre><code>${ceResult.message}</code></pre>`;
        warning.style.padding = '1rem';
        loadingScreen.appendChild(warning);
        return;
    }


    const ce = ceResult.value;
    const payment = JSON.parse(ce.paymentJson);

    let seller = {
        name: 'Unknown Seller',
        affiliation: 'Unknown',
        location: 'Unknown'
    };
    const sellerResult = await fetchUser(ce.sellerUuid);
    if (ceResult.success) {
        seller.name = sellerResult.value.minecraftUsername;
        seller.affiliation = sellerResult.value.nationAffiliation;
        seller.location = sellerResult.value.location;
    }

    document.querySelectorAll('.js-title-here').forEach(element => {
        element.textContent = ce.title;
    });
    document.querySelectorAll('.js-payment-here').forEach(element => {
        element.textContent = `${payment.Amount} ${payment.Type}`;
    });
    document.querySelectorAll('.js-location-here').forEach(element => {
        element.textContent = ce.location;
    });
    document.querySelectorAll('.js-category-link-here').forEach(element => {
        const a = document.createElement('a');
        a.href = `/search?fcategory=${ce.category}`;
        a.target = '_blank';
        a.textContent = ce.category;
        element.appendChild(a);
    });
    document.querySelectorAll('.js-creation-here').forEach(element => {
        element.textContent = formatUnixTimeMMDDYYYY(ce.creation);
    });
    document.querySelectorAll('.js-quantity-here').forEach(element => {
        element.textContent = ce.quantity.toString();
    });
    document.querySelectorAll('.js-seller-link-here').forEach(element => {
        const a = document.createElement('a');
        a.href = `/user?uuid=${ce.sellerUuid}`;
        a.textContent = seller.name
        element.appendChild(a);
    });
    document.querySelectorAll('.js-possessive-seller-name-here').forEach(element => {
        element.textContent = seller.name;
    });
    document.querySelectorAll('.js-seller-affiliation-here').forEach(element => {
        if (seller.affiliation.toLowerCase() == "unaffiliated") {
            element.textContent = "no nation";
        } else if (seller.affiliation.toLowerCase() == "not set") {
            element.textContent = "someone they don't want you to know"
        } else {
            element.textContent = seller.affiliation;
        }
    });
    document.querySelectorAll('.js-seller-location-here').forEach(element => {
        element.textContent = seller.location;
    });

    const apiKey = getCookieValue('WORLDMARKETAPIKEY');
    if (apiKey) {
        const jwt = WMJWTDecode(apiKey);
        const buyerRes = await fetchUser(jwt.payload.uuid);
        if (buyerRes.success) {
            //@ts-ignore
            document.getElementById('js-order-delivery-location').value = buyerRes.value.location;
        }
    }

    loadingScreen.remove();
    //@ts-ignore
    tippy('#tippy-reload', { content: "Refresh username", placement: 'right', delay: [500, 0] });
});

