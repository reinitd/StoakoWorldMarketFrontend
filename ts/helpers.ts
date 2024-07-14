function deserialize<T>(data: any, classType: { new(...args: any[]): T }): T {
    return new classType(...Object.values(data));
}

function formatUnixTime(unixTime: number): string {
    const date = new Date(unixTime * 1000); // Convert Unix time to milliseconds

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];

    const day = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();

    return `${month} ${day}, ${year} at ${hours}:${minutesStr}${ampm}`;
}

function formatUnixTimeMMDDYYYY(unixTime: number): string {
    const date = new Date(unixTime * 1000);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
}


function isEmpty(value: string): boolean {
    return value === null || value === undefined || value.trim() === '';
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getParamFromUrl<T>(paramName: string, paramType: { new(value: string): T }): T | null {
    const urlParams = new URLSearchParams(window.location.search);

    const actualParamName = Array.from(urlParams.keys()).find(key => key.toLowerCase() === paramName.toLowerCase());

    if (!actualParamName) {
        return null;
    }

    const paramValue = decodeURIComponent(urlParams.get(actualParamName));

    if (!paramValue) {
        return null;
    }

    try {
        const parsedValue = new paramType(paramValue);
        return parsedValue;
    } catch {
        return null;
    }
}