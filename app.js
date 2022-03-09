const apikey = "563492ad6f917000010000011e572bb3ad434e20b8f4b6cb36259942";

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-btn");
const form = document.querySelector(".search-form");

const more = document.querySelector(".more");
let value;
let page = 1;
let currentsearch;
// console.log(process.env);
searchInput.addEventListener("input", (e) => {
  value = e.target.value;
  currentsearch = value;
  console.log(value);
});
more.addEventListener("click", loadMore);
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  getSearchedphotos();
});

async function getPhotos(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application.json",
      Authorization: apikey,
    },
  });

  const imagesData = await response.json();
  return imagesData;
}

async function getAllPhotos() {
  const url = "https://api.pexels.com/v1/curated?per_page=15&page=1";

  const imagesData = await getPhotos(url);

  imagesData.photos.forEach((photo) => {
    const galleryImage = document.createElement("div");
    galleryImage.classList.add("gallery-img");
    galleryImage.innerHTML = `<img src=${photo.src.large}></img>
    <div class="gallery-info">
        <div class="decoration">
     <span class="dot"></span>
    <span class="dot2"></span>
    <span class="dot3"></span>
    </div>
    <p>${photo.photographer}</p>
    <a href=${photo.src.original} target="_blank">View full image</a>
    </div>`;

    gallery.appendChild(galleryImage);
  });
}

async function getSearchedphotos() {
  let url;
  if (!value) {
    url = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  } else
    url = `https://api.pexels.com/v1/search?query=${value}+query&per_page=15&page=1`;

  const imagesData = await getPhotos(url);

  clear();
  imagesData.photos.forEach((photo) => {
    const galleryImage = document.createElement("div");
    galleryImage.classList.add("gallery-img");
    galleryImage.innerHTML = `
    <img src=${photo.src.large}></img>
    <div class="gallery-info">
    <div class="decoration">
     <span class="dot"></span>
     <span class="dot2"></span>
     </div>
     <p>${photo.photographer}</p>
    <a href=${photo.src.orignal} target="_blank">View full image</a>
    </div>`;

    gallery.appendChild(galleryImage);
  });
}

function clear() {
  gallery.innerHTML = "";
}

async function loadMore() {
  page++;
  let url;
  if (currentsearch) {
    url = `https://api.pexels.com/v1/search?query=${currentsearch}+query&per_page=15&page=${page}`;
  } else {
    url = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }

  const imagesData = await getPhotos(url);

  imagesData.photos.forEach((photo) => {
    const galleryImage = document.createElement("div");
    galleryImage.classList.add("gallery-img");
    galleryImage.innerHTML = `
    <img src=${photo.src.large}></img>
    <div class="gallery-info">
    <div class="decoration">
     <span class="dot"></span>
     <span class="dot2"></span>
     </div>
     <p>${photo.photographer}</p>
    <a href=${photo.src.orignal} target="_blank">View full image</a>
    </div>`;

    gallery.appendChild(galleryImage);
  });
}

getAllPhotos();
