function getCookieValue(cookieName) {
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
function setCookie(cookieName, cookieValue, cookieExp) {
    // document.cookie = `WORLDMARKETAPIKEY=${json.value.worldMarketApiKey}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`; PRODUCTION
    document.cookie = `${cookieName}=${cookieValue}; expires=${cookieExp.toUTCString()}; path=/; samesite=strict`; // DEVELOPMENT
}
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
}
class WorldMarketJWT {
    constructor(header, payload, signature) {
        this.header = header;
        this.payload = payload;
        this.signature = signature;
    }
}
function WMJWTDecode(jwt) {
    const parts = jwt.split('.');
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    return new WorldMarketJWT(header, payload, parts[2]);
}
