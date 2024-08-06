class McAuthProfileResponse {
    uuid: string;
    minecraftUsername: string;
    message: string;

    constructor(uuid: string, minecraftUsername: string, message: string) {
        this.uuid = uuid;
        this.minecraftUsername = minecraftUsername;
        this.message = message;
    }
}

class ExchangeMcAuthResponse {
    isNewUser: boolean;
    worldMarketApiKey: string;
    accessToken: string;
    expiresIn: string;
    userData: McAuthProfileResponse;

    constructor(
        isNewUser: boolean,
        worldMarketApiKey: string,
        accessToken: string,
        expiresIn: string,
        userData: McAuthProfileResponse
    ) {
        this.isNewUser = isNewUser;
        this.worldMarketApiKey = worldMarketApiKey;
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
        this.userData = userData;
    }
}


async function exchangeMcAuthCode(code: string): Promise<Result<ExchangeMcAuthResponse>> {
    const result = new Result<ExchangeMcAuthResponse>(false, "An unhandled error occured.", null);

    const url = `https://api.stoako.com/api/v1/auth/exchange-code`;
    try {
        const response = await fetch(url, {
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

async function revokeJwt(confirm: boolean) : Promise<Result> {
    let result = new Result(false, "An unhandled error occured.");    

    if (!confirm) { return; }

    const apiKey = getCookieValue("WORLDMARKETAPIKEY");
    if (apiKey == null) {
        result.message = "User does not have an API key cookie.";
        return result;
    }

    const url = 'https://api.stoako.com/api/v1/auth/revoke-token';
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${apiKey}`
            }
        });
        if (!response.ok) {
            result.message = response.status.toString();
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        result.success = data.success;
        result.message = data.message;

    }
    catch (error) {
        result.message = error;
        console.error(error);
    }

    return result;
}