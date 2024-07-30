class SearchFilters {
    constructor(location, paymentType, category) {
        this.Location = location;
        this.PaymentType = paymentType;
        this.Category = category;
    }
}
class CatalogEntry {
    constructor(uuid, creation, title, description, category, location, paymentJson, quantity, active, lastActiveTimestamp, sellerUuid) {
        this.uuid = uuid;
        this.creation = creation;
        this.title = title;
        this.description = description;
        this.category = category;
        this.location = location;
        this.paymentJson = paymentJson;
        this.quantity = quantity;
        this.active = active;
        this.lastActiveTimestamp = lastActiveTimestamp;
        this.sellerUuid = sellerUuid;
    }
}
async function searchCatalogEntries(query, pageNumber, pageAmount, filters) {
    const result = new Result(false, "An unhandled error occured.", null);
    let url = `https://api.stoako.com/api/v1/catalog-entry/search?q=${query}&pagenumber=${pageNumber}&pageamount=${pageAmount}`;
    const addParamToUrl = (key, value) => {
        if (value !== null && value !== undefined && value !== '') {
            url += `&${key}=${encodeURIComponent(value)}`;
        }
    };
    addParamToUrl('flocation', filters.Location);
    addParamToUrl('fcategory', filters.Category);
    addParamToUrl('fpaymenttype', filters.PaymentType);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            result.message = response.status.toString();
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        result.success = data.success;
        result.message = data.message;
        result.value = data.value;
    }
    catch (error) {
        result.message = error;
        console.error('Error fetching data:', error);
    }
    return result;
}
async function fetchCatalogEntry(uuid) {
    const result = new Result(false, "An unhandled error occured.", null);
    let url = `https://api.stoako.com/api/v1/catalog-entry/fetch/${uuid}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            result.message = response.status.toString();
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        result.success = data.success;
        result.message = data.message;
        result.value = data.value;
    }
    catch (error) {
        result.message = error;
        console.error('Error fetching data:', error);
    }
    return result;
}
async function fetchAllCatalogEntries(pageNumber, pageAmount) {
    const result = new Result(false, "An unhandled error occured.", null);
    const url = `https://api.stoako.com/api/v1/catalog-entry/fetchall?pageNumber=${pageNumber}&pageAmount=${pageAmount}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            result.message = response.status.toString();
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        result.success = data.success;
        result.message = data.message;
        result.value = data.value;
    }
    catch (error) {
        result.message = error;
        console.error('Error fetching data:', error);
    }
    return result;
}
async function fetchCatalogEntriesFromSeller(sellerUuid, pageNumber, pageAmount, showOnlyActive, showOnlyInactive, apiKey) {
    const result = new Result(false, "An unhandled error occured.", null);
    const url = `https://api.stoako.com/api/v1/catalog-entry/fetch-from-seller/${sellerUuid}?pageNumber=${pageNumber}&pageAmount=${pageAmount}&showOnlyActive=${showOnlyActive}&showOnlyInactive=${showOnlyInactive}&token=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            result.message = response.status.toString();
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        result.success = data.success;
        result.message = data.message;
        result.value = data.value;
    }
    catch (error) {
        result.message = error;
        console.error('Error fetching data:', error);
    }
    return result;
}
async function createCatalogEntry(sellerUuid, title, description, category, location, paymentType, paymentAmount, quantity, worldMarketApiKey) {
    let result = new Result(false, "An unhandled error occured.", null);
    const url = `https://api.stoako.com/api/v1/catalog-entry/create`;
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                SellerUuid: sellerUuid,
                Title: title,
                Description: description,
                Category: category,
                Location: location,
                PaymentType: paymentType,
                PaymentAmount: paymentAmount,
                Quantity: quantity
            }),
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${worldMarketApiKey}`
            }
        });
        if (!response.ok) {
            result.message = response.status.toString();
            throw new Error(`Http error! Status: ${response.status}`);
        }
        const data = await response.json();
        result.success = data.success;
        result.message = data.message;
        result.value = data.value;
    }
    catch (error) {
        result.message = error;
        console.error('Error creating catalog entry:', error);
    }
    return result;
}
async function updateCatalogEntry(ce, worldMarketApiKey) {
    let result = new Result(false, "An unhandled error occured.", null);
    const url = `https://api.stoako.com/api/v1/catalog-entry/update`;
    try {
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                CatalogEntry: ce
            }),
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${worldMarketApiKey}`
            }
        });
        if (!response.ok) {
            result.message = response.status.toString();
            throw new Error(`Http error! Status: ${response.status}`);
        }
        const data = await response.json();
        result.success = data.success;
        result.message = data.message;
        result.value = data.value;
    }
    catch (error) {
        result.message = error;
        console.error('Error updating catalog entry:', error);
    }
    return result;
}
async function deleteCatalogEntry(catalogEntryUuid, worldMarketApiKey) {
    let result = new Result(false, "An unhandled error occured.", null);
    const url = `https://api.stoako.com/api/v1/catalog-entry/delete/${catalogEntryUuid}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Accept": "*/*",
                "Authorization": `Bearer ${worldMarketApiKey}`
            }
        });
        if (!response.ok) {
            result.message = response.status.toString();
            throw new Error(`Http error! Status: ${response.status}`);
        }
        const data = await response.json();
        result.success = data.success;
        result.message = data.message;
        result.value = data.value;
    }
    catch (error) {
        result.message = error;
        console.error('Error deleting catalog entry:', error);
    }
    return result;
}
