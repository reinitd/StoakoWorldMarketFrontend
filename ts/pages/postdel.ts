document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = getCookieValue("WORLDMARKETAPIKEY");
    if (apiKey == null) {
        window.location.replace('https://mc-auth.com/oAuth2/authorize?client_id=3407823596079285374&redirect_uri=https%3A%2F%2Fwm.stoako.com%2Flogin&scope=profile&response_type=code');
    }

    const ceWrapper = document.getElementById('ce-wrapper');
    const uuidInput = document.getElementById('js-uuid-to-delete') as HTMLInputElement;
    const jwt = WMJWTDecode(apiKey);
    const uuid = getParamFromUrl("uuid", String) as string;

    if (uuid) uuidInput.value = uuid;

    document.getElementById('js-delete').onclick = async () => {
        const uuid = uuidInput.value.trim();
        const confirmation = prompt(`Please type the following to confirm you want to delete this CE:\n'Delete ${uuid.slice(0, 2)}...${uuid.slice(-2)}'`);
        if (confirmation.trim() != `Delete ${uuid.slice(0, 2)}...${uuid.slice(-2)}`) {
            alert("Confirmation does not match.\nNothing deleted.");
            return;
        }
        const ceRes = await fetchCatalogEntry(uuid);
        
        if (!ceRes.success) {
            ceWrapper.innerHTML = '';
            const warning = document.createElement('p');
            warning.innerHTML = `There's been an error fetching the CE data.<br/><br/><code>${ceRes.message}</code>`;
            warning.style.padding = '1rem';
            ceWrapper.appendChild(warning);
            return;
        }
        if (ceRes.value.sellerUuid != jwt.payload.uuid) {
            alert("You cannot delete someone else's CE.");
            return;
        }

        const delRes = await deleteCatalogEntry(ceRes.value.uuid, apiKey);
        if (!delRes.success) {
            ceWrapper.innerHTML = '';
            const warning = document.createElement('p');
            warning.innerHTML = `There's been an error deleting the CE.<br/><br/><code>${ceRes.message}</code>`;
            warning.style.padding = '1rem';
            ceWrapper.appendChild(warning);
            return;
        }

        showModal({
            title: "Success",
            content: "Successfully deleted the catalog entry!"
        });


    };
});