document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let isFullscreenOpen = false;

    // Open image in fullscreen on click
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            if (isFullscreenOpen) return; // Prevent opening multiple fullscreen images
            isFullscreenOpen = true;

            const fullscreen = document.createElement('div');
            fullscreen.classList.add('fullscreen');
            const img = document.createElement('img');
            img.src = item.src;
            fullscreen.appendChild(img);

            // Add animation to move from original position to center
            requestAnimationFrame(() => {
                fullscreen.classList.add('fullscreen-open');
            });

            fullscreen.addEventListener('click', () => {
                fullscreen.classList.remove('fullscreen-open');
                fullscreen.classList.add('fullscreen-close');
                document.querySelector('.gallery').classList.remove('blur-background');
                fullscreen.addEventListener('transitionend', () => {
                    fullscreen.remove();
                    isFullscreenOpen = false;
                });
            });

            document.body.appendChild(fullscreen);
            document.querySelector('.gallery').classList.add('blur-background');
        });
    });
});
