
async function populateCatalogEntryInfo(uuid:string) : Promise<Result<CatalogEntry>> {
    let result = new Result<CatalogEntry>(false, "An unhandled error occured.", null);

    const ceResult = await fetchCatalogEntry(uuid);
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
}