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
        <a class="gallery__link" href="large-image.jpg">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join("");
}

function onGalleryImgClick(event) {
  blockAction(event);

  const largeImg = event.target.dataset.source;
  const instance = basicLightbox.create(`
    <img src="${largeImg}" width="800" height="600">
`);

  const isImgEl = event.target.classList.contains("gallery__image");

  if (!isImgEl) {
    return;
  }

  instance.show();

  galleryContainer.addEventListener(
    "keydown",
    (event) => {
      if (event.code === "Escape") {
        instance.close();
      }
    },
    { once: true }
  );
}

function blockAction(event) {
  event.preventDefault();
}
