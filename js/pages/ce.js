var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const uuid = getParamFromUrl("uuid", String);
        if (uuid == null) {
            window.location.replace('/search');
        }
        const loadingScreen = document.getElementById('loading');
        const spinner = document.getElementById('spinner');
        const ceResult = yield populateCatalogEntryInfo(uuid);
        if (!ceResult.success) {
            spinner.remove();
            const warning = document.createElement('p');
            warning.innerHTML = `There's been an error fetching the catalog entry data.<br/><br/><pre><code>${ceResult.message}</code></pre>`;
            warning.style.padding = '1rem';
            loadingScreen.appendChild(warning);
            return;
        }
        const ce = ceResult.value;
        let seller = {
            name: 'Unknown Seller',
            affiliation: 'Unknown',
            location: 'Unknown'
        };
        const sellerResult = yield fetchUser(ce.sellerUuid);
        if (ceResult.success) {
            seller.name = sellerResult.value.minecraftUsername;
            seller.affiliation = sellerResult.value.nationAffiliation;
            seller.location = sellerResult.value.location;
        }
        document.querySelectorAll('.js-seller-link-here').forEach(element => {
            const a = document.createElement('a');
            a.href = `/user?uuid=${ce.sellerUuid}`;
            a.textContent = seller.name;
            element.appendChild(a);
        });
        document.querySelectorAll('.js-seller-affiliation-here').forEach(element => {
            if (seller.affiliation.toLowerCase() == "unaffiliated") {
                element.textContent = "no nation";
            }
            else if (seller.affiliation.toLowerCase() == "not set") {
                element.textContent = "someone they don't want you to know";
            }
            else {
                element.textContent = seller.affiliation;
            }
        });
        document.querySelectorAll('.js-seller-location-here').forEach(element => {
            element.textContent = seller.location;
        });
        document.querySelectorAll('.js-seller-name-here').forEach(element => {
            element.textContent = seller.name;
        });
        const apiKey = getCookieValue('WORLDMARKETAPIKEY');
        if (apiKey) {
            const jwt = WMJWTDecode(apiKey);
            const buyerRes = yield fetchUser(jwt.payload.uuid);
            if (buyerRes.success) {
                //@ts-ignore
                document.getElementById('js-order-delivery-location').value = buyerRes.value.location;
            }
        }
        loadingScreen.remove();
        //@ts-ignore
        tippy('#tippy-reload', { content: "Refresh username", placement: 'right', delay: [500, 0] });
    });
});
