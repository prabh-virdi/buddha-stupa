document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.add('fullscreen');
            setTimeout(() => {
                item.style.transform = 'translate(0, 0)';
            }, 1); // Ensure the transition starts
        });

        item.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'transform' && !item.classList.contains('fullscreen')) {
                item.classList.remove('fullscreen-close');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('fullscreen')) {
            e.target.style.transform = 'translate(0, 0) scale(0.9)';
            e.target.classList.remove('fullscreen');
            e.target.classList.add('fullscreen-close');
        }
    });
});
