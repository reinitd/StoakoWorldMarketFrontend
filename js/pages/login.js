document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = getCookieValue("WORLDMARKETAPIKEY");
    const code = getParamFromUrl("code", String);
    if (apiKey != null || code == null) {
        window.location.replace('/');
    }
    const loadingScreen = document.getElementById('loading');
    const spinner = document.getElementById('spinner');
    const status = document.getElementById('status');
    status.textContent = 'Exchanging code from MC-Auth...';
    const exchangeRes = await exchangeMcAuthCode(code);
    if (!exchangeRes.success) {
        spinner.remove();
        status.remove();
        const warning = document.createElement('p');
        warning.innerHTML = `There's been an error exchanging the MC-Auth code.<br/><br/><pre><code>${exchangeRes.message}</code></pre>`;
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
