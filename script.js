document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const gallery = document.querySelector('.gallery');
    let isFullscreenOpen = false;

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            if (isFullscreenOpen) return;
            isFullscreenOpen = true;

            const rect = item.getBoundingClientRect();
            const fullscreen = document.createElement('div');
            fullscreen.classList.add('fullscreen');

            const img = document.createElement('img');
            img.src = item.src;
            img.style.position = 'absolute';
            img.style.top = `${rect.top}px`;
            img.style.left = `${rect.left}px`;
            img.style.width = `${rect.width}px`;
            img.style.height = `${rect.height}px`;
            img.style.transition = 'all 0.3s ease';

            fullscreen.appendChild(img);
            document.body.appendChild(fullscreen);

            requestAnimationFrame(() => {
                fullscreen.style.transition = 'background 0.3s ease';
                fullscreen.style.background = 'rgba(0, 0, 0, 0.8)';
                img.style.top = '50%';
                img.style.left = '50%';
                img.style.transform = 'translate(-50%, -50%)';
                img.style.width = '90%';
                img.style.height = 'auto';
                if (img.offsetHeight > window.innerHeight * 0.8) {
                    img.style.height = '80%';
                    img.style.width = 'auto';
                }
            });

            fullscreen.addEventListener('click', () => {
                img.style.width = `${rect.width}px`;
                img.style.height = `${rect.height}px`;
                img.style.top = `${rect.top}px`;
                img.style.left = `${rect.left}px`;
                img.style.transform = 'translate(0, 0)';
                fullscreen.style.background = 'rgba(0, 0, 0, 0)';
                img.addEventListener('transitionend', () => {
                    fullscreen.remove();
                    isFullscreenOpen = false;
                });
                gallery.classList.remove('blur-background');
            });

            gallery.classList.add('blur-background');
        });
    });
});
