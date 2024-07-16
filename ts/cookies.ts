function getCookieValue(cookieName: string) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookiesArray = decodedCookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

function setCookie(cookieName: string, cookieValue: string, cookieExp: Date) {
    // document.cookie = `WORLDMARKETAPIKEY=${json.value.worldMarketApiKey}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`; PRODUCTION
    document.cookie = `${cookieName}=${cookieValue}; expires=${cookieExp.toUTCString()}; path=/; samesite=strict`; // DEVELOPMENT
}

function deleteCookie(name: string) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
}

interface WMJWTHeader {
    alg: string;
    typ: string;
}

interface WMJWTPayload {
    username: string;
    uuid: string;
    role: string;
    exp: string;
    iat: string;
    nbf: string;
}

class WorldMarketJWT {
    header: WMJWTHeader;
    payload: WMJWTPayload;
    signature: string;

    constructor(header: WMJWTHeader, payload: WMJWTPayload, signature: string) {
        this.header = header;
        this.payload = payload;
        this.signature = signature;
    }
}

function WMJWTDecode(jwt: string): WorldMarketJWT {
    const parts = jwt.split('.');

    const header = JSON.parse(atob(parts[0])) as WMJWTHeader;
    const payload = JSON.parse(atob(parts[1])) as WMJWTPayload;

    return new WorldMarketJWT(header, payload, parts[2]);
}
