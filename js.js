document.addEventListener("DOMContentLoaded", function () {
    /* ----------------------------
       Dropdown: "Tøj"
    ----------------------------- */
    const clothesItem = document.querySelector(".has-mega");
    if (clothesItem) {
        const triggerLink = clothesItem.querySelector(".nav-link");

        // Åbn/luk ved klik på "Tøj"
        triggerLink.addEventListener("click", function (e) {
            e.preventDefault(); // undgå navigation
            clothesItem.classList.toggle("is-open");
        });

        // Luk når man klikker udenfor
        document.addEventListener("click", function (e) {
            if (!clothesItem.contains(e.target)) {
                clothesItem.classList.remove("is-open");
            }
        });
    }

    /* ----------------------------
       Produkt-galleri: skift billeder
    ----------------------------- */
    document.querySelectorAll("[data-product-gallery]").forEach((gallery) => {
        const images = gallery.querySelectorAll(".product-photo");
        const dots   = gallery.querySelectorAll(".product-dot");

        if (!images.length || !dots.length) return;

        function showImage(index) {
            images.forEach((img, i) => {
                img.classList.toggle("is-active", i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle("is-active", i === index);
            });
        }

        dots.forEach((dot) => {
            dot.addEventListener("click", () => {
                const index = parseInt(dot.dataset.index, 10);
                showImage(index);
            });
        });
    });

/* -------------------------------------------
   DETAIL-GALLERY (venstre side): klik for at skifte stort billede/video
-------------------------------------------- */
const galleryItems = document.querySelectorAll(".detail-gallery .gallery-item");
const detailMedia = document.querySelector(".detail-media");

if (galleryItems.length && detailMedia) {
    galleryItems.forEach(item => {
        item.addEventListener("click", () => {

            // Fjern aktiv styling
            galleryItems.forEach(i => i.classList.remove("is-active"));
            item.classList.add("is-active");

            // Find hvad der er inde i galleriet (img eller video)
            const img = item.querySelector("img");
            const video = item.querySelector("video");

            // Slet tidligere indhold i det store område
            detailMedia.innerHTML = "";

            if (img) {
                // Hvis det er et billede – vis stort billede
                const bigImg = document.createElement("img");
                bigImg.src = img.src;
                bigImg.alt = img.alt || "";
                bigImg.style.width = "100%";
                bigImg.style.height = "625px";
                bigImg.style.objectFit = "cover";
                detailMedia.prepend(bigImg);
            }

            if (video) {
                // Hvis det er video – vis videoen
                const bigVideo = document.createElement("video");
                bigVideo.src = video.src;
                bigVideo.controls = true;
                bigVideo.playsInline = true;
                bigVideo.style.width = "100%";
                bigVideo.style.height = "625px";
                bigVideo.style.objectFit = "cover";
                detailMedia.prepend(bigVideo);
            }
        });
    });
}

/* -------------------------------------------
   POPUP: "Flere detaljer"
-------------------------------------------- */

const popup = document.getElementById("product-popup");
const popupClose = document.querySelector(".popup-close");

// Åbn popup når man klikker på "Flere detaljer"
document.querySelectorAll(".product-more").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        popup.style.display = "flex";
    });
});

// Luk popup ved klik på kryds
popupClose.addEventListener("click", () => {
    popup.style.display = "none";
});

// Luk popup ved klik udenfor boksen
popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.style.display = "none";
    }
});


});
