const galleryItems = document.querySelectorAll('.gallery-item');
const fullscreenContainer = document.createElement('div');
fullscreenContainer.classList.add('fullscreen');
document.body.appendChild(fullscreenContainer);

galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
        const img = document.createElement('img');
        img.src = item.src || item.querySelector('img').src;
        fullscreenContainer.innerHTML = ''; // Clear previous image
        fullscreenContainer.appendChild(img);
        fullscreenContainer.classList.add('fullscreen-open');
    });
});

fullscreenContainer.addEventListener('click', () => {
    fullscreenContainer.classList.remove('fullscreen-open');
});
