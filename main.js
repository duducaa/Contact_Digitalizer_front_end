export const URL_BASE = "http://localhost:5000";

$(document).ready(() => {
    const fileInput = $("#file-insert");
    const image = $(".image");
    const imageName = $(".image-name");
    const prevImage = $(".prev-image");
    const nextImage = $(".next-image");
    const sendImagesButton = $(".send-images");

    let actualImageIndex = 0;
    let url = null;
    let files = [];

    fileInput.on('change', (event) => {
        files = event.target.files;
        if (files.length > 1) {
            prevImage.removeClass("d-none");
            nextImage.removeClass("d-none");
        }
        url = URL.createObjectURL(files[0]);
        imageName.html(files[actualImageIndex].name);
        image.attr("src", url);
    });

    prevImage.on('click', () => {
        if (actualImageIndex > 0) {
            actualImageIndex--;
            URL.revokeObjectURL(url);
            url = URL.createObjectURL(files[actualImageIndex]);
            imageName.html(files[actualImageIndex].name);
            image.attr("src", url);
        }
    });

    nextImage.on('click', () => {
        if (actualImageIndex < files.length - 1) {
            actualImageIndex++;
            URL.revokeObjectURL(url);
            url = URL.createObjectURL(files[actualImageIndex]);
            imageName.html(files[actualImageIndex].name);
            image.attr("src", url);
        }
    });

    sendImagesButton.on('click', () => {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const image = e.target.result.split(',')[1];

            sendImages({image: image}).then(response => {
                console.log(response['contacts']);
            });
        }; 
        reader.readAsDataURL(file);
    });
});

function sendImages(image) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: URL_BASE + "/detection",
            data: JSON.stringify([image]),
            dataType: "json",
            contentType: "application/json",
            success: (response) => resolve(response),
            error: (response) => reject(response)
        });
    });
}