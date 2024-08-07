async function handleSubmit(worldMarketApiKey: string, originalCe: CatalogEntry = null): Promise<Result<String>> {
    let result = new Result(false, "An unhandled error occured.", null);

    const category = document.getElementById('js-ce-category') as HTMLSelectElement;
    const title = document.getElementById('js-ce-title') as HTMLInputElement;
    const quantity = document.getElementById('js-ce-quantity') as HTMLInputElement;
    const price = document.getElementById('js-ce-price') as HTMLInputElement;
    const currency = document.getElementById('js-ce-currency') as HTMLInputElement;
    const location = document.getElementById('js-ce-location') as HTMLInputElement;
    const description = document.getElementById('js-ce-description') as HTMLTextAreaElement;

    let error = null;
    if (category.value == "") {
        error = "Please select a category.";
    }
    if (title.value.trim() == "") {
        error = "You must have a title.";
    }
    if (quantity.value == "" || quantity.value == "0") {
        error = "You must define the quantity.";
    }
    if (price.value == "") {
        error = "You must have the price.";
    }
    if (currency.value.trim() == "") {
        error = "You must have a currency type.";
    }
    if (location.value.trim() == "") {
        error = "You must define the location.";
    }
    if (description.value.trim() == "" ||
        description.value.trim().length <= 50 ||
        description.value.trim().length > 2000) {
        error = "You must have a description of at least 50 characters and no more than 2000 characters."
    }

    if (error != null) {
        alert(error);
        return;
    }

    let res: Result<string>;
    const jwt = WMJWTDecode(worldMarketApiKey);

    if (originalCe) {
        const paymentObject = {
            Type: currency.value.trim(),
            Amount: Number(price.value)
        };
        
        const ce = new CatalogEntry(
            originalCe.uuid,
            originalCe.creation,
            title.value.trim(),
            description.value.trim(),
            category.value.trim(),
            location.value.trim(),
            JSON.stringify(paymentObject),
            Number(quantity.value),
            originalCe.active,
            originalCe.lastActiveTimestamp,
            jwt.payload.uuid
        );
        res = await updateCatalogEntry(
            ce,
            worldMarketApiKey
        );
    } else {
        res = await createCatalogEntry(
            jwt.payload.uuid,
            title.value.trim(),
            description.value.trim(),
            category.value,
            location.value.trim(),
            currency.value.trim(),
            price.value,
            Number(quantity.value),
            worldMarketApiKey
        );
    }

    result.success = res.success;
    result.message = res.message;
    result.value = res.value;

    return result;
}

function adjustWidth(element) {
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.position = "absolute";
    span.style.whiteSpace = "pre";
    span.style.fontSize = window.getComputedStyle(element).fontSize;
    span.style.fontFamily = window.getComputedStyle(element).fontFamily;
    span.textContent = element.value || element.placeholder || "";

    document.body.appendChild(span);
    const width = span.getBoundingClientRect().width;
    document.body.removeChild(span);

    if (element.getAttribute('type') == 'number') {
        element.style.width = `${width + 15}px`;
    } else {
        element.style.width = `${width + 2}px`;
    }
}

function resizeInputs() {
    [...document.getElementsByClassName("resize-input")].forEach((element) => {
        adjustWidth(element);
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = getCookieValue("WORLDMARKETAPIKEY");
    if (apiKey == null) {
        window.location.replace('https://mc-auth.com/oAuth2/authorize?client_id=3407823596079285374&redirect_uri=http%3A%2F%2Flocalhost%2Flogin&scope=profile&response_type=code');
    }
    confirmLeave();

    const loadingScreen = document.getElementById('loading');
    const spinner = document.getElementById('spinner');

    const jwt = WMJWTDecode(apiKey);
    let originalCe = null;

    const pathname = this.location.pathname.toLowerCase();
    if (pathname == '/post/edit') {
        const uuid = getParamFromUrl("uuid", String) as string;
        if (uuid == null) {
            window.location.replace('/');
        }

        const ceRes = await fetchCatalogEntry(uuid);
        if (!ceRes.success) {
            spinner.remove();
            const warning = document.createElement('p');
            warning.innerHTML = `There's been an error fetching the CE data.<br/><br/><code>${ceRes.message}</code>`;
            warning.style.padding = '1rem';
            loadingScreen.appendChild(warning);
            return;
        }
        if (ceRes.value.sellerUuid != jwt.payload.uuid) {
            window.location.replace('/');
        }

        const ce = ceRes.value;
        originalCe = ce;

        const category = document.getElementById('js-ce-category') as HTMLSelectElement;
        const title = document.getElementById('js-ce-title') as HTMLInputElement;
        const quantity = document.getElementById('js-ce-quantity') as HTMLInputElement;
        const price = document.getElementById('js-ce-price') as HTMLInputElement;
        const currency = document.getElementById('js-ce-currency') as HTMLInputElement;
        const location = document.getElementById('js-ce-location') as HTMLInputElement;
        const description = document.getElementById('js-ce-description') as HTMLTextAreaElement;

        const payment = JSON.parse(ce.paymentJson);

        category.value = ce.category;
        title.value = ce.title;
        quantity.value = ce.quantity.toString();
        price.value = payment.Amount;
        currency.value = payment.Type;
        location.value = ce.location;
        description.value = ce.description;
    }

    const populateUserResult = await populateUserInfo(jwt.payload.uuid);
    if (!populateUserResult.success) {
        spinner.remove();
        const warning = document.createElement('p');
        warning.innerHTML = `There's been an error fetching your user data.<br/><br/><code>${populateUserResult.message}</code>`;
        warning.style.padding = '1rem';
        loadingScreen.appendChild(warning);
        return;
    }

    resizeInputs();
    document.addEventListener("input", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        if (!target.matches(".resize-input")) return;
        adjustWidth(target);
    });
    loadingScreen.remove();

    document.getElementById('submit').onclick = async () => {
        const submitRes = await handleSubmit(apiKey, originalCe);
        const successHtml = `Successfully created catalog entry.<br/><p class="blue-text self" onclick="window.location.replace('/ce?uuid=${submitRes.value}')">View it here.</p>`;
        showModal({ title: submitRes.success ? "Success" : "Uh oh.", content: submitRes.success ? successHtml : submitRes.message });
    };
});
