document.addEventListener('DOMContentLoaded', function() {

    loadImagesFromAssets();

});

function loadImagesFromAssets() {

    const gallery = document.getElementById('gallery');

    gallery.innerHTML = '';

    const assetImages = [
        'assets/IMG_01.jpg',
        'assets/IMG_02.jpg',
        'assets/IMG_03.jpg',
        'assets/IMG_04.jpg',
        'assets/IMG_05.jpg',
        'assets/IMG_06.jpg',
    ];

    assetImages.forEach(imagePath => {

        const imgElement = createImageElement(imagePath);

        gallery.appendChild(imgElement);

    });

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const img = entry.target.querySelector('img');

                if (img) {

                    img.src = img.dataset.src;

                    img.classList.add('loaded');

                    observer.unobserve(entry.target);

                }

            }

        });

    });

    const imageElements = document.querySelectorAll('.sliderBloc img');

    imageElements.forEach(img => {

        observer.observe(img.parentElement.parentElement);

    });

}

function createImageElement(src) {

    const sliderBloc = document.createElement('div');

    sliderBloc.classList.add('sliderBloc');

    const imgContainer = document.createElement('div');

    imgContainer.classList.add('imgContainer');

    const img = document.createElement('img');

    img.classList.add('lazy');

    img.dataset.src = src;

    img.draggable = false;

    sliderBloc.appendChild(imgContainer);

    imgContainer.appendChild(img);

    return sliderBloc;

}