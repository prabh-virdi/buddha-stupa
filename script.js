document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Open image in fullscreen on click
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const fullscreen = document.createElement('div');
            fullscreen.classList.add('fullscreen');
            const img = document.createElement('img');
            img.src = item.src;
            fullscreen.appendChild(img);

            fullscreen.addEventListener('click', () => {
                fullscreen.remove();
            });

            document.body.appendChild(fullscreen);
        });
    });
});
