document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const closeModal = document.querySelector('.close');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const strip = document.getElementById('strip');
    let currentIndex = Math.floor(thumbnails.length / 2);

    const updateThumbnails = () => {
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.className = 'thumbnail';
            if (index === currentIndex) {
                thumbnail.classList.add('main');
            } else if (index < currentIndex) {
                thumbnail.classList.add(`left-${currentIndex - index}`);
            } else if (index > currentIndex) {
                thumbnail.classList.add(`right-${index - currentIndex}`);
            }
        });

        strip.scrollLeft = thumbnails[currentIndex].offsetLeft - (strip.clientWidth / 2) + (thumbnails[currentIndex].clientWidth / 2);
    };

    updateThumbnails();

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentIndex = index;
            updateThumbnails();
        });

        thumbnail.addEventListener('dblclick', () => {
            modal.style.display = 'block';
            modalImg.src = thumbnail.src;
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
