var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function deserialize(data, classType) {
    return new classType(...Object.values(data));
}
function formatUnixTime(unixTime) {
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
function formatUnixTimeMMDDYYYY(unixTime) {
    const date = new Date(unixTime * 1000);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
}
function isEmpty(value) {
    return value === null || value === undefined || value.trim() === '';
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function getParamFromUrl(paramName, paramType) {
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
    }
    catch (_a) {
        return null;
    }
}
function makeCeHtml(ce) {
    return __awaiter(this, void 0, void 0, function* () {
        const payment = JSON.parse(ce.paymentJson);
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const span1 = document.createElement('span');
        const img = document.createElement('img');
        img.src = `https://crafatar.com/avatars/${ce.sellerUuid}.png`;
        img.alt = 'MC Head';
        span1.appendChild(img);
        td1.appendChild(span1);
        const td2 = document.createElement('td');
        td2.textContent = ce.title;
        const td3 = document.createElement('td');
        td3.classList.add('ce-category');
        td3.textContent = ce.category;
        const td4 = document.createElement('td');
        td4.classList.add('ce-quantity');
        td4.textContent = ce.quantity.toString();
        const td5 = document.createElement('td');
        td5.classList.add('flex-col');
        const p1 = document.createElement('p');
        p1.classList.add('ce-location');
        p1.textContent = ce.location;
        const p2 = document.createElement('p');
        p2.classList.add('ce-creation');
        p2.textContent = formatUnixTimeMMDDYYYY(ce.creation);
        td5.appendChild(p1);
        td5.appendChild(p2);
        const td6 = document.createElement('td');
        const span3 = document.createElement('span');
        span3.classList.add('ce-payment-price');
        span3.style.marginRight = '.5ch';
        span3.textContent = payment.Amount;
        const span4 = document.createElement('span');
        span4.classList.add('ce-payment-type');
        span4.textContent = payment.Type;
        td6.appendChild(span3);
        td6.appendChild(span4);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        const userRes = yield fetchUser(ce.sellerUuid);
        if (userRes.success) {
            tr.setAttribute('data-affiliation', userRes.value.nationAffiliation);
            tr.setAttribute('data-seller-username', userRes.value.minecraftUsername);
        }
        tr.setAttribute('data-uuid', ce.uuid);
        tr.setAttribute('data-creation', ce.creation.toString());
        return tr;
    });
}
