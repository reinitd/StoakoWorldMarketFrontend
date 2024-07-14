document.addEventListener("DOMContentLoaded", () => {
    const search = document.getElementById('search');
    search.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            let url = `/search?q=${search.value}&pageNumber=1&pageAmount=20`;
            // if (isEmpty(search.value)) {
            //     // redirect or something, figure it out later.
            // }
            location.href = url;
        }
    });
});
