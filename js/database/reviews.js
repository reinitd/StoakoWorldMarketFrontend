var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Review {
    constructor(uuid, reviewerUuid, revieweeUuid, stance, content, itemTitle, creation) {
        this.uuid = uuid;
        this.reviewerUuid = reviewerUuid;
        this.revieweeUuid = revieweeUuid;
        this.stance = stance;
        this.content = content;
        this.itemTitle = itemTitle;
        this.creation = creation;
    }
}
function fetchReview(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = new Result(false, "An unhandled error occured.", null);
        const url = `https://localhost/api/v1/review/fetch/${uuid}`;
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                result.message = response.status.toString();
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            const user = deserialize(data.value, Review);
            result.success = true;
            result.message = "OK.";
            result.value = user;
        }
        catch (error) {
            result.message = error;
            console.error('Error fetching data:', error);
        }
        return result;
    });
}
function fetchReviewsFromReviewee(revieweeUuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = new Result(false, "An unhandled error occured.", null);
        const url = `https://localhost/api/v1/review/fetch-from-reviewee/${revieweeUuid}`;
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
function fetchReviewsFromReviewer(reviewerUuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = new Result(false, "An unhandled error occured.", null);
        const url = `https://localhost/api/v1/review/fetch-from-reviewer/${reviewerUuid}`;
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
function deleteReview(uuid, worldMarketApiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = new Result(false, "An unhandled error occured.");
        const url = `https://localhost/api/v1/review/create/${uuid}`;
        try {
            const response = yield fetch(url, {
                method: "DELETE",
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
        }
        catch (error) {
            result.message = error;
            console.error('Error creating review:', error);
        }
        return result;
    });
}
function createReview(reviewerUuid, revieweeUuid, stance, content, itemUuid, worldMarketApiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = new Result(false, "An unhandled error occured.", null);
        const url = `https://localhost/api/v1/review/create`;
        try {
            const response = yield fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    ReviewerUuid: reviewerUuid,
                    RevieweeUuid: revieweeUuid,
                    Stance: stance,
                    Content: content,
                    ItemUuid: itemUuid
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
            console.error('Error creating review:', error);
        }
        return result;
    });
}
