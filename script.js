document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let isFullscreenOpen = false;

    // Open image in fullscreen on click
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            if (isFullscreenOpen) return; // Prevent opening multiple fullscreen images
            isFullscreenOpen = true;

            const rect = item.getBoundingClientRect();
            const fullscreen = document.createElement('div');
            fullscreen.classList.add('fullscreen');
            fullscreen.style.width = `${rect.width}px`;
            fullscreen.style.height = `${rect.height}px`;
            fullscreen.style.top = `${rect.top}px`;
            fullscreen.style.left = `${rect.left}px`;

            const img = document.createElement('img');
            img.src = item.src;
            fullscreen.appendChild(img);

            document.body.appendChild(fullscreen);

            // Add animation to move from original position to center
            requestAnimationFrame(() => {
                fullscreen.style.transition = 'all 0.3s ease';
                fullscreen.style.width = 'auto';
                fullscreen.style.height = 'auto';
                fullscreen.style.top = '50%';
                fullscreen.style.left = '50%';
                fullscreen.style.transform = 'translate(-50%, -50%) scale(1)';
            });

            fullscreen.addEventListener('click', () => {
                fullscreen.style.transform = 'translate(-50%, -50%) scale(0.1)';
                fullscreen.addEventListener('transitionend', () => {
                    fullscreen.remove();
                    isFullscreenOpen = false;
                });
            });

            document.querySelector('.gallery').classList.add('blur-background');
        });
    });
});
