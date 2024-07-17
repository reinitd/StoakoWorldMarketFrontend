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
    const loadingScreen = document.getElementById('loading');
    const spinner = document.getElementById('spinner');
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
    loadingScreen.remove();
}));
