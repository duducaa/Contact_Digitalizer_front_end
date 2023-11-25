export const URL_BASE = "http://localhost:5000";

const fileInput = document.querySelector("#file-insert");
const image = document.querySelector(".image");
const imageName = document.querySelector(".image-name");
const prevImage = document.querySelector(".prev-image");
const nextImage = document.querySelector(".next-image");
const sendImages = document.querySelector(".send-images");

let actualImageIndex = 0;
let url = null;

fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    if (files.length > 1) {
        prevImage.classList.remove("d-none");
        nextImage.classList.remove("d-none");
    }
    url = URL.createObjectURL(fileInput.files[0]);
    imageName.textContent = fileInput.files[actualImageIndex].name;
    image.src = url;
});

prevImage.addEventListener('click', () => {
    if (actualImageIndex > 0) {
        actualImageIndex--;
        URL.revokeObjectURL(url);
        url = URL.createObjectURL(fileInput.files[actualImageIndex]);
        imageName.textContent = fileInput.files[actualImageIndex].name;
        image.src = url;
    }
});

nextImage.addEventListener('click', () => {
    if (actualImageIndex < fileInput.files.length - 1) {
        actualImageIndex++;
        URL.revokeObjectURL(url);
        url = URL.createObjectURL(fileInput.files[actualImageIndex]);
        imageName.textContent = fileInput.files[actualImageIndex].name;
        image.src = url;
    }
});

sendImages.addEventListener('click', () => {
    
})