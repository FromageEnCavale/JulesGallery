const CONFIG = {

    GALLERY_CONTAINER_ID: 'gallery-container',

    LOAD_DELAY_MS: 500,

    ERROR_RETRY_COUNT: 2

};

function createErrorHandler(imagePath, retryCount = 0) {

    return (error) => {

        if (retryCount < CONFIG.ERROR_RETRY_COUNT) {

            console.warn(`Reloading attempt for ${imagePath}`);

            return loadImageAsPromise(imagePath, retryCount + 1);

        }

        console.error(`Loading failed: ${imagePath}`, error);

        return null;

    };

}

function loadImageAsPromise(imageInfo, retryCount = 0) {

    return new Promise((resolve, reject) => {

        const img = new Image();

        img.onload = () => {

            setTimeout(() => resolve(imageInfo), CONFIG.LOAD_DELAY_MS);

        };

        img.onerror = createErrorHandler(imageInfo.path, retryCount);

        img.src = imageInfo.path;

    });

}

function createImageElement(imageInfo) {

    const content = document.createElement('div');

    content.classList.add('content');

    const imgContainer = document.createElement('div');

    imgContainer.classList.add('img-container');

    const img = document.createElement('img');

    img.src = imageInfo.path;

    img.alt = imageInfo.name;

    img.draggable = false;

    content.appendChild(imgContainer);

    imgContainer.appendChild(img);

    const imgInfoContainer = document.createElement('div');

    imgInfoContainer.classList.add('img-info-container');

    const imgInfo = document.createElement('div');

    imgInfo.classList.add('img-info');

    const infoFields = [

        { className: 'name', text: imageInfo.name },

        { className: 'device', text: imageInfo.device },

        { className: 'camera', text: imageInfo.camera },

        { className: 'country', text: imageInfo.country },

        { className: 'focal-length', text: imageInfo.focallength },

        { className: 'aperture', text: imageInfo.aperture },

        { className: 'shutter-speed', text: imageInfo.shutterspeed },

        { className: 'iso', text: imageInfo.iso },

        { className: 'ev', text: imageInfo.ev }

    ];

    infoFields.forEach(field => {

        const element = document.createElement('div');

        element.classList.add(field.className);

        element.textContent = field.text;

        imgInfo.appendChild(element);

    });

    imgInfoContainer.appendChild(imgInfo);

    content.appendChild(imgInfoContainer);

    return content;

}

async function loadImagesFromAssets() {

    const galleryContainer = document.getElementById(CONFIG.GALLERY_CONTAINER_ID);

    galleryContainer.innerHTML = '';

    for (const imageInfo of assetImages) {

        try {

            const loadedImage = await loadImageAsPromise(imageInfo);

            if (loadedImage) {

                const imgElement = createImageElement(loadedImage);

                galleryContainer.appendChild(imgElement);

            }

        } catch (error) {

            console.error('Loading error', error);

        }

    }

}

document.addEventListener('DOMContentLoaded', () => {

    loadImagesFromAssets().catch(console.error);

});