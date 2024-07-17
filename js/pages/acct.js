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
        const apiKey = getCookieValue("WORLDMARKETAPIKEY");
        if (apiKey == null) {
            window.location.replace('https://mc-auth.com/oAuth2/authorize?client_id=3407823596079285374&redirect_uri=http%3A%2F%2Flocalhost%2Flogin&scope=profile&response_type=code');
        }
        const loadingScreen = document.getElementById('loading');
        const spinner = document.getElementById('spinner');
        const jwt = WMJWTDecode(apiKey);
        document.getElementById('js-head-img').setAttribute('src', `https://crafatar.com/avatars/${jwt.payload.uuid}.png`);
        const populateUserResult = yield populateUserInfo(jwt.payload.uuid);
        if (!populateUserResult.success) {
            spinner.remove();
            const warning = document.createElement('p');
            warning.innerHTML = `There's been an error fetching your user data.<br/><br/><pre><code>${populateUserResult.message}</code></pre>`;
            warning.style.padding = '1rem';
            loadingScreen.appendChild(warning);
            return;
        }
        const user = populateUserResult.value;
        if (this.location.pathname.toLowerCase() == '/acct/edit') {
            const nationAffiliationInput = document.getElementById('js-nation-affiliation-input');
            const locationInput = document.getElementById('js-location-input');
            const submit = document.getElementById('js-submit-edits');
            nationAffiliationInput.setAttribute('value', user.nationAffiliation);
            nationAffiliationInput.setAttribute('placeholder', user.nationAffiliation);
            locationInput.setAttribute('value', user.location);
            locationInput.setAttribute('placeholder', user.location);
            submit.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                if (isEmpty(nationAffiliationInput.value)) {
                    nationAffiliationInput.value = user.nationAffiliation;
                }
                if (isEmpty(locationInput.value)) {
                    locationInput.value = user.location;
                }
                user.nationAffiliation = nationAffiliationInput.value.trim();
                user.location = locationInput.value.trim();
                const updateRes = yield updateUser(user, apiKey);
                showModal({ title: updateRes.success ? "Success" : "Uh oh.", content: updateRes.message });
            }));
        }
        loadingScreen.remove();
        //@ts-ignore
        tippy('#tippy-reload', { content: "Refresh username", placement: 'right', delay: [500, 0] });
    });
});
