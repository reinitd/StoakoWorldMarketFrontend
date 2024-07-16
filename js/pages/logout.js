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
        }
        const loadingScreen = document.getElementById('loading');
        const spinner = document.getElementById('spinner');
        const status = document.getElementById('status');
        status.textContent = 'Revoking JWT..';
        const revokeRes = yield revokeJwt(true);
        if (!revokeRes.success) {
            spinner.remove();
            status.remove();
            const warning = document.createElement('p');
            warning.innerHTML = `There's been an error revoking your token.<br/><br/><pre><code>${revokeRes.message}</code></pre>`;
            warning.style.padding = '1rem';
            loadingScreen.appendChild(warning);
            return;
        }
        deleteCookie('WORLDMARKETAPIKEY');
        status.textContent = 'Success!';
        window.location.replace('/');
    });
});
