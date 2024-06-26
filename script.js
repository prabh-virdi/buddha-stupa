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

    updateThumbnails();

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentIndex = index;
            updateThumbnails();
        });

        thumbnail.addEventListener('dblclick', () => {
            // Expand image to full screen in modal
            modalImg.src = thumbnail.src;
            modalImg.style.maxHeight = '100%'; // Ensure the image fills the modal
            modalImg.style.maxWidth = '100%';

            // Show modal with smooth transition
            modal.style.opacity = '0';
            modal.style.display = 'block';
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 50); // Adjust timing as needed for smoother transition
        });
    });

    closeModal.addEventListener('click', () => {
        // Hide modal with smooth transition
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Adjust timing as needed
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            // Close modal when clicking outside the image with smooth transition
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300); // Adjust timing as needed
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
