const imageData = [
    { id: "c1", url: "image1.jpg", title: "Ocean", description: "Ocean is a huge body of saltwater" },
    { id: "c2", url: "image2.jpg", title: "Tajmahal", description: "Ivory-white marble mausoleum" },
    { id: "c3", url: "image3.jpg", title: "Temple", description: "Hindu temple is a symbolic house" },
    { id: "c4", url: "image4.jpg", title: "Raza", description: "Reserved for spiritual rituals and activities" }
];

function preloadImages(imageData) {
    imageData.forEach((image) => {
        const img = new Image();
        img.src = image.url;
    });
}
preloadImages(imageData);

const gallery = document.getElementById('gallery');
let currentIndex = 0;

function showImage(index) {
    const imageInfo = imageData[index];
    const img = document.createElement('img');
    img.src = imageInfo.url;
    img.alt = imageInfo.title;

    gallery.innerHTML = '';
    gallery.appendChild(img);

    document.querySelector('.description h4').textContent = imageInfo.title;
    document.querySelector('.description p').textContent = imageInfo.description;
}

function startSlideshow() {
    setInterval(() => {
        currentIndex = (currentIndex + 1) % imageData.length;
        showImage(currentIndex);
    }, 3000);
}

const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach((radioButton, index) => {
    radioButton.addEventListener('change', () => {
        currentIndex = index;
        showImage(currentIndex);
    });
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const newImage = {
            id: 'c' + (imageData.length + 1),
            url: e.target.result,
            title: 'Custom Image',
            description: 'A custom image uploaded by the user'
        };
        imageData.push(newImage);
        const newRadioButton = document.createElement('input');
        newRadioButton.type = 'radio';
        newRadioButton.name = 'slide';
        newRadioButton.id = newImage.id;
        const newLabel = document.createElement('label');
        newLabel.htmlFor = newImage.id;
        newLabel.className = 'card';
        newLabel.innerHTML = `
            <div class="icon">${imageData.length}</div>
            <div class="description">
                <h4>${newImage.title}</h4>
                <p>${newImage.description}</p>
            </div>`;
        document.querySelector('.container').appendChild(newRadioButton);
        document.querySelector('.container').appendChild(newLabel);
        preloadImages([newImage]);
    };
    reader.readAsDataURL(file);
});

startSlideshow();
