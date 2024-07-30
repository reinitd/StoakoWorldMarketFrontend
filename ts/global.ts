document.addEventListener("DOMContentLoaded", () => {
    
    // Begin CA Check
    debugger;
    /*
    ##### NOTICE #####
    This will go away once the closed-alpha is over.
    If you want to view the code, it is located here:
        - https://github.com/reinitd/StoakoWorldMarketFrontend/tree/production
    
    */
    const apiKey = getCookieValue("WORLDMARKETAPIKEY");
    const jwt = WMJWTDecode(apiKey);
    const ClosedAlphaUuids: string[] = [
        // "6bff3c7f-8f32-4333-a302-ac452d1510c5", // thesandmannn
        "43de37b5-be49-41a1-bbc5-9c427356fc15", // 3r5x4
        "d5c6e3f8-5b45-4ad4-a02d-341978f76683", // catpaco
        "d2621d6f-b052-4341-b73f-0146a164739e", // goomyman77
        "e40b7ff3-293b-40f4-b87e-f6edda0a5893", // Habit_Cat
        "77139ecd-6f32-4a63-87fa-062ec259a251", // mejackmac
        "44db08ca-6b6b-46e8-8e15-345b65bbd933", // Pirka
    ];

    if (!ClosedAlphaUuids.includes(jwt.payload.uuid)) {
        document.body.innerHTML = "";
        document.body.style.backgroundColor = "#191a1b";
        document.body.textContent = "You do not have access to the closed alpha.";
    }
    // End CA Check

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
