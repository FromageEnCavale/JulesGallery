document.addEventListener('DOMContentLoaded', function() {

    loadImagesFromAssets();

});

function loadImagesFromAssets() {

    const galleryContainer = document.getElementById('galleryContainer');

    galleryContainer.innerHTML = '';

    const assetImages = [

        {
            path: 'assets/IMG_01.jpg',
            name: 'cat on a gutter',
            device: 'iphone 16 pro',
            camera: 'telephoto camera',
            country: 'france',
            focallength: '120mm',
            aperture: 'f/2.8',
            shutterspeed: '1/514s',
            iso: 'ISO 64',
            ev: '0ev'
        },
        {
            path: 'assets/IMG_02.jpg',
            name: 'sunset on the water',
            device: 'iphone 16 pro',
            camera: 'telephoto camera',
            country: 'france',
            focallength: '120mm',
            aperture: 'f/2.8',
            shutterspeed: '1/3058s',
            iso: 'ISO 50',
            ev: '0ev'
        },
        {
            path: 'assets/IMG_03.jpg',
            name: 'seaside dune',
            device: 'iphone 16 pro',
            camera: 'telephoto camera',
            country: 'france',
            focallength: '120mm',
            aperture: 'f/2.8',
            shutterspeed: '1/251s',
            iso: 'ISO 50',
            ev: '0ev'
        },
        {
            path: 'assets/IMG_04.jpg',
            name: 'lonely man in the desert',
            device: 'iphone 16 pro',
            camera: 'telephoto camera',
            country: 'france',
            focallength: '120mm',
            aperture: 'f/2.8',
            shutterspeed: '1/2710s',
            iso: 'ISO 50',
            ev: '0ev'
        },
        {
            path: 'assets/IMG_05.jpg',
            name: 'man on sand dune',
            device: 'iphone 16 pro',
            camera: 'fusion camera',
            country: 'france',
            focallength: '48mm',
            aperture: 'f/1.78',
            shutterspeed: '1/11364s',
            iso: 'ISO 80',
            ev: '0ev'
        },
        {
            path: 'assets/IMG_06.jpg',
            name: 'man walking in snow',
            device: 'iphone 16 pro',
            camera: 'ultra wide camera',
            country: 'france',
            focallength: '14mm',
            aperture: 'f/2.2',
            shutterspeed: '1/435s',
            iso: 'ISO 16',
            ev: '0ev'
        },

    ];

    assetImages.forEach(imageInfo => {

        const imgElement = createImageElement(imageInfo.path, imageInfo.name, imageInfo.device, imageInfo.camera, imageInfo.country, imageInfo.focallength, imageInfo.aperture, imageInfo.shutterspeed, imageInfo.iso, imageInfo.ev);

        galleryContainer.appendChild(imgElement);

    });

}

function createImageElement(src, name, device, camera, country, focallength, aperture, shutterspeed, iso, ev) {

    const content = document.createElement('div');

    content.classList.add('content');

    const imgContainer = document.createElement('div');

    imgContainer.classList.add('imgContainer');

    const img = document.createElement('img');

    img.src = src;

    img.alt = name;

    img.draggable = false;

    const imgInfoContainer = document.createElement('div');

    imgInfoContainer.classList.add('imgInfoContainer');

    const imgInfo = document.createElement('div');

    imgInfo.classList.add('imgInfo');

    const imgName = document.createElement('div');

    imgName.classList.add('name');

    imgName.textContent = name;

    const imgDevice = document.createElement('div');

    imgDevice.classList.add('device');

    imgDevice.textContent = device;

    const imgCamera = document.createElement('div');

    imgCamera.classList.add('camera');

    imgCamera.textContent = camera;

    const imgCountry = document.createElement('div');

    imgCountry.classList.add('country');

    imgCountry.textContent = country;

    const imgFocalLength = document.createElement('div');

    imgFocalLength.textContent = focallength;

    const imgAperture = document.createElement('div');

    imgAperture.textContent = aperture;

    const imgShutterSpeed = document.createElement('div');

    imgShutterSpeed.textContent = shutterspeed;

    const imgIso = document.createElement('div');

    imgIso.textContent = iso;

    const imgEv = document.createElement('div');

    imgEv.textContent = ev;

    content.appendChild(imgContainer);

    imgContainer.appendChild(img);

    content.appendChild(imgInfoContainer);

    imgInfoContainer.appendChild(imgInfo);

    imgInfo.appendChild(imgName);

    imgInfo.appendChild(imgDevice);

    imgInfo.appendChild(imgCamera);

    imgInfo.appendChild(imgCountry);

    imgInfo.appendChild(imgFocalLength);

    imgInfo.appendChild(imgAperture);

    imgInfo.appendChild(imgShutterSpeed);

    imgInfo.appendChild(imgIso);

    imgInfo.appendChild(imgEv);

    return content;

}