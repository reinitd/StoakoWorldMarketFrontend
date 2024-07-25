class SearchFilters {
    Location?: string;
    PaymentType?: string;
    Category?: string;

    constructor(
        location?: string,
        paymentType?: string,
        category?: string
    ) {
        this.Location = location;
        this.PaymentType = paymentType;
        this.Category = category;
    }
}


class CatalogEntry {
    uuid: string;
    creation: number;
    title: string;
    description: string;
    category: string;
    location: string;
    paymentJson: string;
    quantity: number;
    active: number;
    lastActiveTimestamp?: number;
    sellerUuid: string;

    constructor(
        uuid: string,
        creation: number,
        title: string,
        description: string,
        category: string,
        location: string,
        paymentJson: string,
        quantity: number,
        active: number,
        lastActiveTimestamp: number | undefined,
        sellerUuid: string
    ) {
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

async function searchCatalogEntries(query: string, pageNumber: number, pageAmount: number, filters: SearchFilters): Promise<Result<CatalogEntry[]>> {
    const result = new Result<CatalogEntry[]>(false, "An unhandled error occured.", null);

    let url = `https://localhost/api/v1/catalog-entry/search?q=${query}&pagenumber=${pageNumber}&pageamount=${pageAmount}`;
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

    } catch (error) {
        result.message = error;
        console.error('Error fetching data:', error);
    }

    return result;
}

async function fetchCatalogEntry(uuid: string): Promise<Result<CatalogEntry>> {
    const result = new Result<CatalogEntry>(false, "An unhandled error occured.", null);

    let url = `https://localhost/api/v1/catalog-entry/fetch/${uuid}`;
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

    } catch (error) {
        result.message = error;
        console.error('Error fetching data:', error);
    }

    return result;
}

async function fetchAllCatalogEntries(pageNumber: number, pageAmount: number): Promise<Result<CatalogEntry[]>> {
    const result = new Result<CatalogEntry[]>(false, "An unhandled error occured.", null);

    const url = `https://localhost/api/v1/catalog-entry/fetchall?pageNumber=${pageNumber}&pageAmount=${pageAmount}`;
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

    } catch (error) {
        result.message = error;
        console.error('Error fetching data:', error);
    }

    return result;
}

async function createCatalogEntry(
    sellerUuid: string,
    title: string,
    description: string,
    category: string,
    location: string,
    paymentType: string,
    paymentAmount: string,
    quantity: number,
    worldMarketApiKey: string
): Promise<Result<string>> {
    let result = new Result<string>(false, "An unhandled error occured.", null);

    const url = `https://localhost/api/v1/catalog-entry/create`;
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

    } catch (error) {
        result.message = error;
        console.error('Error creating catalog entry:', error);
    }

    return result;
}