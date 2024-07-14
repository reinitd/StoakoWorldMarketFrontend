var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function searchCatalogEntries(query, pageNumber, pageAmount) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = new Result(false, "An unhandled error occured.", null);
        const url = `https://localhost/api/v1/catalog-entry/search?q=${query}&pagenumber=${pageNumber}&pageamount=${pageAmount}`;
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
        const url = `https://localhost/api/v1/catalog-entry/fetch/${uuid}`;
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
        const url = `https://localhost/api/v1/catalog-entry/fetchall?pageNumber=${pageNumber}&pageAmount=${pageAmount}`;
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
