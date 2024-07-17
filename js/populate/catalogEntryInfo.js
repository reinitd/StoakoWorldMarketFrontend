var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function populateCatalogEntryInfo(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = new Result(false, "An unhandled error occured.", null);
        const ceResult = yield fetchCatalogEntry(uuid);
        if (!ceResult.success) {
            result.message = ceResult.message;
            return result;
        }
        const ce = ceResult.value;
        const payment = JSON.parse(ce.paymentJson);
        result.value = ce;
        document.querySelectorAll('.js-title-here').forEach(element => {
            element.textContent = ce.title;
        });
        document.querySelectorAll('.js-payment-here').forEach(element => {
            element.textContent = `${payment.Amount} ${payment.Type}`;
        });
        document.querySelectorAll('.js-location-here').forEach(element => {
            element.textContent = ce.location;
        });
        document.querySelectorAll('.js-description-here').forEach(element => {
            element.textContent = ce.description;
        });
        document.querySelectorAll('.js-category-link-here').forEach(element => {
            const a = document.createElement('a');
            a.href = `/search?fcategory=${ce.category}`;
            a.target = '_blank';
            a.textContent = ce.category;
            element.appendChild(a);
        });
        document.querySelectorAll('.js-creation-here').forEach(element => {
            element.textContent = formatUnixTimeMMDDYYYY(ce.creation);
        });
        document.querySelectorAll('.js-quantity-here').forEach(element => {
            element.textContent = ce.quantity.toString();
        });
        result.success = true;
        result.message = "OK.";
        return result;
    });
}
