document.addEventListener('DOMContentLoaded', async () => {
    const loadingScreen = document.getElementById('loading');
    const spinner = document.getElementById('spinner');

    const uuid = getParamFromUrl("uuid", String) as string;
    if (uuid == null) {
        window.location.replace('/');
    }

    document.getElementById('js-head-img').setAttribute('src', `https://crafatar.com/avatars/${uuid}.png`);

    const populateUserResult = await populateUserInfo(uuid);
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
});