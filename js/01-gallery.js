import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");
const galleryItemsMarkUp = createGalleryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryItemsMarkUp);
galleryContainer.addEventListener("click", onGalleryImgClick);

function createGalleryItemsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </div>
    `;
    })
    .join("");
}

function onGalleryImgClick(event) {
  event.preventDefault();

  if (!event.target === "IMG") {
    return;
  }

  console.log(event.target.dataset.source);
}
