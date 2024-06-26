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

    const loopScroll = () => {
        if (strip.scrollLeft === 0) {
            strip.scrollLeft = strip.scrollWidth - strip.clientWidth;
        } else if (strip.scrollLeft + strip.clientWidth >= strip.scrollWidth) {
            strip.scrollLeft = 1;
        }
    };

    const showModal = (thumbnail) => {
        modalImg.src = thumbnail.src;
        modal.style.display = 'flex';
        modal.classList.add('show');
        modal.classList.remove('hide');
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 50);
    };

    const hideModal = () => {
        modal.classList.remove('show');
        modal.classList.add('hide');
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500); // Match this duration with the bounceOut animation duration
    };

    updateThumbnails();

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            showModal(thumbnail);
        });

        thumbnail.addEventListener('dblclick', () => {
            showModal(thumbnail);
        });
    });

    closeModal.addEventListener('click', () => {
        hideModal();
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            hideModal();
        }
    });

    strip.addEventListener('scroll', () => {
        loopScroll();

        const center = strip.scrollLeft + strip.clientWidth / 2;
        let closestIndex = 0;
        let closestDistance = Infinity;

        thumbnails.forEach((thumbnail, index) => {
            const rect = thumbnail.getBoundingClientRect();
            const thumbnailCenter = rect.left + rect.width / 2;
            const distance = Math.abs(center - thumbnailCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        if (closestIndex !== currentIndex) {
            currentIndex = closestIndex;
            updateThumbnails();
        }
    });

    strip.scrollLeft = strip.scrollWidth / 2;
});
