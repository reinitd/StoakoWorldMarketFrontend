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
        const code = getParamFromUrl("code", String);
        if (apiKey != null || code == null) {
            window.location.replace('/');
        }
        const loadingScreen = document.getElementById('loading');
        const spinner = document.getElementById('spinner');
        const status = document.getElementById('status');
        status.textContent = 'Exchanging code from MC-Auth...';
        const exchangeRes = yield exchangeMcAuthCode(code);
        if (!exchangeRes.success) {
            spinner.remove();
            status.remove();
            const warning = document.createElement('p');
            warning.innerHTML = `There's been an error exchanging the MC-Auth code.<br/><br/><code>${exchangeRes.message}</code>`;
            warning.style.padding = '1rem';
            loadingScreen.appendChild(warning);
            return;
        }
        const expires = new Date();
        expires.setTime(expires.getTime() + (5 * 24 * 60 * 60 * 1000)); // 5 days in milliseconds
        setCookie("WORLDMARKETAPIKEY", exchangeRes.value.worldMarketApiKey, expires);
        if (exchangeRes.value.isNewUser) {
            status.textContent = 'Success!';
            window.location.replace('/acct/edit');
        }
        else {
            status.textContent = 'Welcome back...';
            window.location.replace('/acct');
        }
    });
});
