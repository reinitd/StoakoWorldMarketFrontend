document.addEventListener("DOMContentLoaded", () => {

    const search = document.getElementById('search') as HTMLInputElement;
    search.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            let url = `/search?q=${search.value}&pageNumber=1&pageAmount=20`;
            location.href = url;
        }
    });

});

function confirmLeave() {
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
