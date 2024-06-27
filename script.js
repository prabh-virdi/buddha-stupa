document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

    // Create infinite scroll illusion
    function createInfiniteScroll() {
        const galleryWidth = gallery.scrollWidth;
        const firstClone = gallery.firstElementChild.cloneNode(true);
        const lastClone = gallery.lastElementChild.cloneNode(true);

        gallery.appendChild(firstClone);
        gallery.insertBefore(lastClone, gallery.firstElementChild);

        gallery.scrollLeft = galleryWidth;

        let isScrolling;
        gallery.addEventListener('scroll', () => {
            window.clearTimeout(isScrolling);

            isScrolling = setTimeout(() => {
                const scrollLeft = gallery.scrollLeft;

                if (scrollLeft >= galleryWidth * 2) {
                    gallery.scrollLeft = galleryWidth;
                } else if (scrollLeft <= 0) {
                    gallery.scrollLeft = galleryWidth;
                }
            }, 50);
        });
    }

    createInfiniteScroll();

    // Scroll sideways with the mouse wheel
    gallery.addEventListener('wheel', (e) => {
        e.preventDefault();
        gallery.scrollBy({
            left: e.deltaY < 0 ? -100 : 100,
            behavior: 'smooth'
        });
    });

    // Open image in fullscreen on click
    function openFullscreen(src) {
        const fullscreen = document.createElement('div');
        fullscreen.classList.add('fullscreen');
        const img = document.createElement('img');
        img.src = src;
        fullscreen.appendChild(img);

        fullscreen.addEventListener('click', () => {
            fullscreen.remove();
        });

        document.body.appendChild(fullscreen);
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            openFullscreen(imgSrc);
        });
    });

    // Function to create custom arrow buttons
    function createArrow(direction, imageSrc) {
        const arrow = document.createElement('div');
        arrow.classList.add('arrow', direction);
        const img = document.createElement('img');
        img.src = imageSrc; // Set custom image source for arrows
        arrow.appendChild(img);
        arrow.addEventListener('click', () => {
            gallery.scrollBy({
                left: direction === 'left' ? -300 : 300,
                behavior: 'smooth'
            });
        });
        return arrow;
    }

    // Add custom images for arrow buttons
    const leftArrow = createArrow('left', 'images/left.png');
    const rightArrow = createArrow('right', 'images/right.png');

    document.body.appendChild(leftArrow);
    document.body.appendChild(rightArrow);
});
