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

    const container = document.createElement('div');

    container.classList.add('container');

    const img = document.createElement('img');

    img.src = imageInfo.path;

    img.alt = imageInfo.name;

    img.draggable = false;

    container.appendChild(img);

    const imgInfoDataContainer = document.createElement('div');

    imgInfoDataContainer.classList.add('img-info-data-container');

    imgInfoDataContainer.classList.add('no-select');

    const imgInfo = document.createElement('div');

    imgInfo.classList.add('img-info');

    const name = document.createElement('div');

    name.classList.add('name');

    name.textContent = imageInfo.name;

    imgInfo.appendChild(name);

    const info = document.createElement('div');

    info.classList.add('info');

    const infoFields = [

        { className: 'device', text: imageInfo.device },

        { className: 'camera', text: imageInfo.camera },

        { className: 'country', text: imageInfo.country }

    ];

    infoFields.forEach(field => {

        const element = document.createElement('div');

        element.classList.add(field.className);

        element.textContent = field.text;

        info.appendChild(element);

    });

    imgInfo.appendChild(info);

    imgInfoDataContainer.appendChild(imgInfo);

    const imgData = document.createElement('div');

    imgData.classList.add('img-data');

    const dataFields = [

        { className: 'focal-length', text: imageInfo.focallength },

        { className: 'aperture', text: imageInfo.aperture },

        { className: 'shutter-speed', text: imageInfo.shutterspeed },

        { className: 'iso', text: imageInfo.iso },

        { className: 'ev', text: imageInfo.ev }

    ];

    dataFields.forEach(field => {

        const element = document.createElement('div');

        element.classList.add(field.className);

        element.textContent = field.text;

        imgData.appendChild(element);

    });

    imgInfoDataContainer.appendChild(imgData);

    const emptyDiv = document.createElement('div');

    imgInfoDataContainer.appendChild(emptyDiv);

    container.appendChild(imgInfoDataContainer);

    return container;

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