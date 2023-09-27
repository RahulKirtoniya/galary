document.addEventListener("DOMContentLoaded", function () {
    const categoryInput = document.getElementById("categoryInput");
    const searchButton = document.getElementById("searchButton");
    const pictureGallery = document.getElementById("pictureGallery");

    searchButton.addEventListener("click", function () {
        const category = categoryInput.value;
        if (category) {
            fetchPictures(category);
        }
    });

    async function fetchPictures(category) {
        const apiKey = "zt3bGkPc2LPS__yD4qLV4bRtatmY0l8rX73dSISqS80";
        const apiUrl = `https://api.unsplash.com/search/photos?query=${category}&per_page=12&client_id=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            pictureGallery.innerHTML = "";

            data.results.forEach((photo) => {
                const pictureCard = document.createElement("div");
                pictureCard.classList.add("picture-card");

                const img = document.createElement("img");
                img.src = photo.urls.small;
                img.alt = photo.alt_description;

                const authorLink = document.createElement("a");
                authorLink.href = photo.user.links.html;
                authorLink.target = "_blank";
                authorLink.textContent = `By ${photo.user.name}`;

                const description = document.createElement("p");
                description.textContent = photo.description || "Sorry! No description available.";

                pictureCard.appendChild(img);
                pictureCard.appendChild(authorLink);
                pictureCard.appendChild(description);

                pictureGallery.appendChild(pictureCard);
            });
        } catch (error) {
            console.error("Error fetching pictures:", error);
        }
    }
});
