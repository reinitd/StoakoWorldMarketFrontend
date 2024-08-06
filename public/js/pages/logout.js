document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = getCookieValue("WORLDMARKETAPIKEY");
    if (apiKey == null) {
        window.location.replace('/');
    }
    const loadingScreen = document.getElementById('loading');
    const spinner = document.getElementById('spinner');
    const status = document.getElementById('status');
    status.textContent = 'Revoking JWT..';
    const revokeRes = await revokeJwt(true);
    if (!revokeRes.success) {
        spinner.remove();
        status.remove();
        const warning = document.createElement('p');
        warning.innerHTML = `There's been an error revoking your token.<br/><br/><code>${revokeRes.message}</code>`;
        warning.style.padding = '1rem';
        loadingScreen.appendChild(warning);
        return;
    }
    deleteCookie('WORLDMARKETAPIKEY');
    status.textContent = 'Success!';
    window.location.replace('/');
});
