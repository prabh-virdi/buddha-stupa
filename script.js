document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const totalItems = galleryItems.length;

    // Clone images to create infinite scroll illusion
    function cloneImages() {
        galleryItems.forEach(item => {
            const clone = item.cloneNode(true);
            gallery.appendChild(clone);
            const cloneBefore = item.cloneNode(true);
            gallery.insertBefore(cloneBefore, gallery.firstChild);
        });
    }

    cloneImages();

    // Smooth scroll
    let isScrolling;
    gallery.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);

        isScrolling = setTimeout(() => {
            const scrollLeft = gallery.scrollLeft;
            const galleryWidth = gallery.scrollWidth / 2;

            if (scrollLeft >= galleryWidth) {
                gallery.scrollLeft = scrollLeft - galleryWidth;
            } else if (scrollLeft < 0) {
                gallery.scrollLeft = galleryWidth + scrollLeft;
            }
        }, 50);
    });

    // Scroll sideways with the mouse wheel
    gallery.addEventListener('wheel', (e) => {
        e.preventDefault();
        gallery.scrollBy({
            left: e.deltaY < 0 ? -100 : 100,
            behavior: 'smooth'
        });
    });

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

    // Arrow navigation
    function createArrow(direction) {
        const arrow = document.createElement('div');
        arrow.classList.add('arrow', direction);
        arrow.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="${direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'}"></path>
            </svg>
        `;
        arrow.addEventListener('click', () => {
            gallery.scrollBy({
                left: direction === 'left' ? -300 : 300,
                behavior: 'smooth'
            });
        });
        return arrow;
    }

    const leftArrow = createArrow('left');
    const rightArrow = createArrow('right');

    document.body.appendChild(leftArrow);
    document.body.appendChild(rightArrow);
});
