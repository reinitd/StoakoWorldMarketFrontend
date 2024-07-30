var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class McAuthProfileResponse {
    constructor(uuid, minecraftUsername, message) {
        this.uuid = uuid;
        this.minecraftUsername = minecraftUsername;
        this.message = message;
    }
}
class ExchangeMcAuthResponse {
    constructor(isNewUser, worldMarketApiKey, accessToken, expiresIn, userData) {
        this.isNewUser = isNewUser;
        this.worldMarketApiKey = worldMarketApiKey;
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
        this.userData = userData;
    }
}
function exchangeMcAuthCode(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = new Result(false, "An unhandled error occured.", null);
        const url = `https://api.stoako.com/api/v1/auth/exchange-code`;
        try {
            const response = yield fetch(url, {
                method: "POST",
                body: JSON.stringify({ code: code }),
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                }
            });
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
function revokeJwt(confirm) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = new Result(false, "An unhandled error occured.");
        if (!confirm) {
            return;
        }
        const apiKey = getCookieValue("WORLDMARKETAPIKEY");
        if (apiKey == null) {
            result.message = "User does not have an API key cookie.";
            return result;
        }
        const url = 'https://api.stoako.com/api/v1/auth/revoke-token';
        try {
            const response = yield fetch(url, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${apiKey}`
                }
            });
            if (!response.ok) {
                result.message = response.status.toString();
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            result.success = data.success;
            result.message = data.message;
        }
        catch (error) {
            result.message = error;
            console.error(error);
        }
        return result;
    });
}
