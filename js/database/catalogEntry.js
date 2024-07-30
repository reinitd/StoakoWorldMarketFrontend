var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function searchCatalogEntries(query, pageNumber, pageAmount, filters) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const response = yield fetch(url);
            if (!response.ok) {
                result.message = response.status.toString();
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            result.success = data.success;
            result.message = data.message;
            result.value = data.value;
        }
        catch (error) {
            result.message = error;
            console.error('Error fetching data:', error);
        }
        return result;
    });
}
function fetchCatalogEntry(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = new Result(false, "An unhandled error occured.", null);
        let url = `https://api.stoako.com/api/v1/catalog-entry/fetch/${uuid}`;
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                result.message = response.status.toString();
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            result.success = data.success;
            result.message = data.message;
            result.value = data.value;
        }
        catch (error) {
            result.message = error;
            console.error('Error fetching data:', error);
        }
        return result;
    });
}
function fetchAllCatalogEntries(pageNumber, pageAmount) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = new Result(false, "An unhandled error occured.", null);
        const url = `https://api.stoako.com/api/v1/catalog-entry/fetchall?pageNumber=${pageNumber}&pageAmount=${pageAmount}`;
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                result.message = response.status.toString();
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            result.success = data.success;
            result.message = data.message;
            result.value = data.value;
        }
        catch (error) {
            result.message = error;
            console.error('Error fetching data:', error);
        }
        return result;
    });
}
function fetchCatalogEntriesFromSeller(sellerUuid, pageNumber, pageAmount, showOnlyActive, showOnlyInactive, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = new Result(false, "An unhandled error occured.", null);
        const url = `https://api.stoako.com/api/v1/catalog-entry/fetch-from-seller/${sellerUuid}?pageNumber=${pageNumber}&pageAmount=${pageAmount}&showOnlyActive=${showOnlyActive}&showOnlyInactive=${showOnlyInactive}&token=${apiKey}`;
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                result.message = response.status.toString();
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            result.success = data.success;
            result.message = data.message;
            result.value = data.value;
        }
        catch (error) {
            result.message = error;
            console.error('Error fetching data:', error);
        }
        return result;
    });
}
function createCatalogEntry(sellerUuid, title, description, category, location, paymentType, paymentAmount, quantity, worldMarketApiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = new Result(false, "An unhandled error occured.", null);
        const url = `https://api.stoako.com/api/v1/catalog-entry/create`;
        try {
            const response = yield fetch(url, {
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
            const data = yield response.json();
            result.success = data.success;
            result.message = data.message;
            result.value = data.value;
        }
        catch (error) {
            result.message = error;
            console.error('Error creating catalog entry:', error);
        }
        return result;
    });
}
function updateCatalogEntry(ce, worldMarketApiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = new Result(false, "An unhandled error occured.", null);
        const url = `https://api.stoako.com/api/v1/catalog-entry/update`;
        try {
            const response = yield fetch(url, {
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
            const data = yield response.json();
            result.success = data.success;
            result.message = data.message;
            result.value = data.value;
        }
        catch (error) {
            result.message = error;
            console.error('Error updating catalog entry:', error);
        }
        return result;
    });
}
function deleteCatalogEntry(catalogEntryUuid, worldMarketApiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = new Result(false, "An unhandled error occured.", null);
        const url = `https://api.stoako.com/api/v1/catalog-entry/delete/${catalogEntryUuid}`;
        try {
            const response = yield fetch(url, {
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
            const data = yield response.json();
            result.success = data.success;
            result.message = data.message;
            result.value = data.value;
        }
        catch (error) {
            result.message = error;
            console.error('Error deleting catalog entry:', error);
        }
        return result;
    });
}
