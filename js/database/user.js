var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class User {
    constructor(uuid, minecraftUsername, nationAffiliation, location, reviewsJson, itemsSold, creation) {
        this.uuid = uuid;
        this.minecraftUsername = minecraftUsername;
        this.nationAffiliation = nationAffiliation;
        this.location = location;
        this.reviewsJson = reviewsJson;
        this.itemsSold = itemsSold;
        this.creation = creation;
    }
}
function fetchUser(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = new Result(false, "An unhandled error occured.", null);
        const url = `https://localhost/api/v1/user/fetch/${uuid}`;
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                result.message = response.status.toString();
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            const user = deserialize(data.value, User);
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
