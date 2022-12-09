import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");
const galleryItemsMarkUp = createGalleryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryItemsMarkUp);
galleryContainer.addEventListener("click", onGalleryImgClick);

function createGalleryItemsMarkup(items) {
  return items
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

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const originalImg = event.target.dataset.source;

  const instance = basicLightbox.create(
    `

    <img src="${originalImg}">
    
    `,
    {
      onShow: () => {
        window.addEventListener("keydown", onEscapePress);
      },
      onClose: () => {
        window.removeEventListener("keydown", onEscapePress);
      },
    }
  );

  instance.show();

  function onEscapePress(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
}

function blockAction(event) {
  event.preventDefault();
}
