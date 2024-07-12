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