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
            window.location.replace('/');
            alert("Sign-up coming soon.");
        }
        const loadingScreen = document.getElementById('loading');
        const spinner = document.getElementById('spinner');
        const jwt = WMJWTDecode(apiKey);
        document.getElementById('js-head-img').setAttribute('src', `https://crafatar.com/avatars/${jwt.payload.uuid}.png`);
        document.querySelectorAll('.js-username-here').forEach(element => {
            element.innerHTML = jwt.payload.username + element.innerHTML;
        });
        document.querySelectorAll('.js-uuid-here').forEach(element => {
            element.textContent = jwt.payload.uuid;
        });
        const userResult = yield fetchUser(jwt.payload.uuid);
        if (!userResult.success) {
            spinner.remove();
            const warning = document.createElement('p');
            warning.innerHTML = `There's been an error fetching your user data.<br/><br/><pre><code>${userResult.message}</code></pre>`;
            warning.style.padding = '1rem';
            loadingScreen.appendChild(warning);
            return;
        }
        const user = userResult.value;
        document.querySelectorAll('.js-joindate-here').forEach(element => {
            element.textContent = formatUnixTime(user.creation);
        });
        document.querySelectorAll('.js-nation-affiliation-here').forEach(element => {
            element.textContent = user.nationAffiliation;
        });
        document.querySelectorAll('.js-location-here').forEach(element => {
            element.textContent = user.location;
        });
        loadingScreen.remove();
        //@ts-ignore
        tippy('#tippy-reload', { content: "Refresh username", placement: 'right', delay: [500, 0] });
    });
});
