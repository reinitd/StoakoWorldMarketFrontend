document.addEventListener("DOMContentLoaded", () => {

    const search = document.getElementById('search') as HTMLInputElement;
    search.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            
            let url = `/search?q=${search.value}&pageNumber=1&pageAmount=20`;

            // if (isEmpty(search.value)) {
            //     // redirect or something, figure it out later.
            // }

            location.href = url;
        }
    });

});
