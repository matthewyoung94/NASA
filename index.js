window.addEventListener("load", function () {

    function showDescription(evt) {
        console.log('working');

        const box = this.parentElement;
        box.querySelector('h2').classList.toggle('visible');
        box.querySelector('p').classList.toggle('visible');
        box.querySelector('h3').classList.toggle('visible');
    }

    document.querySelector("#form").addEventListener("submit", function (evt) {
        evt.preventDefault();

        const search = document.querySelector("#search").value.trim();
        const noResult = document.querySelector("#noResult");
        const searchHint = document.querySelector("#searchHint");
        const results = document.querySelector("#results");

        if (search.length === 0) {
            searchHint.style.display = 'block';
            results.style.display = 'none';
            noResult.style.display = 'none';
        } else {
            const url = "https://images-api.nasa.gov/search?q=" + encodeURIComponent(search);
            loading.style.display = "block";

            const xhr = new XMLHttpRequest();
            xhr.addEventListener("load", function () {

                loading.style.display = "";

                if (xhr.status == 200) {
                    const info = JSON.parse(xhr.responseText),
                        items = info.collection.items,
                        results = document.querySelector("#results");
                    information = document.querySelector("#information");

                    if (items.length > 0) {
                        
                        while (results.lastChild) {
                            results.removeChild(results.firstChild);
                        } 
                        
                        for (let i = 0; i < items.length; i++) {

                            const div = document.createElement("div");

                            const img = document.createElement("img");
                            img.classList.add("images");
                            img.addEventListener('click', showDescription);
                            
                            const title = document.createElement("h2");
                            title.textContent = items[i].data[0].title;

                            const desc = document.createElement("p");
                            desc.textContent = items[i].data[0].description;

                            const date = document.createElement("h3");
                            // Converting the date to an English format
                            const dateConvert = new Date(items[i].data[0].date_created);
                            date.textContent = dateConvert.toLocaleDateString('en-US');
                            
                            //if loop to stop undefined error in the link.
                            if (items[i].links != undefined) {
                            img.src = items[i].links[0].href;
                            div.appendChild(img);
                            div.appendChild(title);
                            div.appendChild(date);
                            div.appendChild(desc);
                            results.appendChild(div);
                            }
                        }

                        results.style.display = "";
                        noResult.style.display = "";
                        searchHint.style.display = "";
                    } else {
                        noResult.style.display = "block";
                        results.style.display = "none";
                        searchHint.style.display = "none";
                    }
                } else {
                    noResult.style.display = "block";
                    results.style.display = "";
                    searchHint.style.display = "none";
                }
            });
      
            xhr.open("GET", url, true);
            xhr.send();
        }
    });
});
