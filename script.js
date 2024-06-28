document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.add('fullscreen');
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('fullscreen')) {
            e.target.classList.remove('fullscreen');
            e.target.classList.add('fullscreen-close');
            setTimeout(() => {
                e.target.classList.remove('fullscreen-close');
            }, 200); // Ensure the bounce effect is noticeable
        }
    });
});
