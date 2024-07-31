function extractTextFromHtml(html) {
    const sanitizedHtml = DOMPurify.sanitize(html);
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedHtml, 'text/html');
    return doc.body.textContent || '';
}
const emoteMap = {
    ':smile:': '<img src="/assets/emotes/smile.gif" alt="smiley"/>',
    ':metal:': '<img src="/assets/emotes/metal.gif" alt="metal"/>',
    ':thumbup:': '<img src="/assets/emotes/thumbup.gif" alt="thumbup"/>',
    ':thumbdown:': '<img src="/assets/emotes/thumbdown.gif" alt="thumbdown"/>',
    ':banghead:': '<img src="/assets/emotes/banghead.gif" alt="banghead"/>',
    ':feedback:': '<img src="/assets/emotes/feedback.gif" alt="feedback"/>',
    ':crazy:': '<img src="/assets/emotes/crazy.gif" alt="crazy"/>',
    ':biggrin:': '<img src="/assets/emotes/biggrin.gif" alt="biggrin"/>',
    ':beer:': '<img src="/assets/emotes/beer.gif" alt="beer"/>',
    ':party:': '<img src="/assets/emotes/party.gif" alt="party"/>',
};
async function populateCatalogEntryInfo(uuid) {
    let result = new Result(false, "An unhandled error occured.", null);
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
        let desc = extractTextFromHtml(ce.description);
        for (const [key, value] of Object.entries(emoteMap)) {
            desc = desc.replace(new RegExp(key, 'g'), value);
        }
        element.innerHTML = desc;
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
