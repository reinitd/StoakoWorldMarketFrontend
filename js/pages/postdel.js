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
        const ceWrapper = document.getElementById('ce-wrapper');
        const uuidInput = document.getElementById('js-uuid-to-delete');
        const jwt = WMJWTDecode(apiKey);
        const uuid = getParamFromUrl("uuid", String);
        if (uuid)
            uuidInput.value = uuid;
        document.getElementById('js-delete').onclick = () => __awaiter(this, void 0, void 0, function* () {
            const uuid = uuidInput.value.trim();
            const confirmation = prompt(`Please type the following to confirm you want to delete this CE:\n'Delete ${uuid.slice(0, 2)}...${uuid.slice(-2)}'`);
            if (confirmation.trim() != `Delete ${uuid.slice(0, 2)}...${uuid.slice(-2)}`) {
                alert("Confirmation does not match.\nNothing deleted.");
                return;
            }
            const ceRes = yield fetchCatalogEntry(uuid);
            if (!ceRes.success) {
                ceWrapper.innerHTML = '';
                const warning = document.createElement('p');
                warning.innerHTML = `There's been an error fetching the CE data.<br/><br/><pre><code>${ceRes.message}</code></pre>`;
                warning.style.padding = '1rem';
                ceWrapper.appendChild(warning);
                return;
            }
            if (ceRes.value.sellerUuid != jwt.payload.uuid) {
                alert("You cannot delete someone else's CE.");
                return;
            }
            const delRes = yield deleteCatalogEntry(ceRes.value.uuid, apiKey);
            if (!delRes.success) {
                ceWrapper.innerHTML = '';
                const warning = document.createElement('p');
                warning.innerHTML = `There's been an error deleting the CE.<br/><br/><pre><code>${ceRes.message}</code></pre>`;
                warning.style.padding = '1rem';
                ceWrapper.appendChild(warning);
                return;
            }
            showModal({
                title: "Success",
                content: "Successfully deleted the catalog entry!"
            });
        });
    });
});
