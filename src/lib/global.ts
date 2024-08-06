import { getCookieValue } from "./cookies";

export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const emoteMap: Record<string, string> = {
    ':smile:': '<img src="/assets/emotes/smile.gif" alt="smiley"/>',
    ':metal:': '<img src="/assets/emotes/metal.gif" alt="metal"/>',
    ':thumbup:': '<img src="/assets/emotes/thumbup.gif" alt="thumbup"/>',
    ':thumbdown:': '<img src="/assets/emotes/thumbdown.gif" alt="thumbdown"/>',
    ':banghead:': '<img src="/assets/emotes/banghead.gif" alt="banghead"/>',
    ':feedback:': '<img src="/assets/emotes/feedback.gif" alt="feedback"/>',
    ':crazy:': '<img src="/assets/emotes/crazy.gif" alt="crazy"/>',
    ':biggrin:': '<img src="/assets/emotes/biggrin.gif" alt="biggrin"/>',
    ':beer:': '<img src="/assets/emotes/beer.gif" alt="beer"/>',
    ':party:': '<img src="/assets/emotes/party.gif" alt="party"/>',
    ':sad:': '<img src="/assets/emotes/sad.gif" alt="sad"/>',
};

export function confirmLeave() {
    window.addEventListener('load', function () {
        fetch(window.location.href, {
            method: 'POST',
            body: JSON.stringify({ data: 'example' }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                window.history.replaceState({}, '', window.location.href.replace('#cfr', '') + '#cfr');
            }
        });
    });

    window.addEventListener('beforeunload', function (event) {
        // This will cause the "Confirm form resubmission" dialog to appear
        event.preventDefault();
        event.returnValue = '';
    });

    window.addEventListener('popstate', function (event) {
        if (window.location.hash === '#cfr') {
            window.history.replaceState({}, '', window.location.href.split('#')[0]);
            window.location.reload();
        }
    });
}


export function replaceTextWithHTML(node: Text, emoteMap: Record<string, string>) {
    let desc = node.nodeValue as string;
    let parentNode = node.parentNode as HTMLElement;

    for (const [key, value] of Object.entries(emoteMap)) {
        const regex = new RegExp(key, 'g');
        desc = desc.replace(regex, value);
    }

    if (desc !== node.nodeValue) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(desc, 'text/html');

        while (doc.body.firstChild) {
            parentNode.insertBefore(doc.body.firstChild, node);
        }

        parentNode.removeChild(node);
    }
}

export function replaceTextInDocument(element: HTMLElement) {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null
    );

    let node: Text | null;
    while ((node = walker.nextNode() as Text | null)) {
        replaceTextWithHTML(node, emoteMap);
    }
}
