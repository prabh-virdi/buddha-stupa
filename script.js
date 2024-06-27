document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

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
            img.src = item.querySelector('img').src;
            fullscreen.appendChild(img);

            fullscreen.addEventListener('click', () => {
                fullscreen.remove();
            });

            document.body.appendChild(fullscreen);
        });
    });

    // Function to create custom arrow buttons
    function createArrow(direction, imageSrc) {
        const arrow = document.createElement('div');
        arrow.classList.add('arrow', direction);
        const img = document.createElement('img');
        img.src = 'fsdf'; // Set custom image source for arrows
      ;
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

    // Add a text box above the images as a title
    const titleBox = document.createElement('div');
    titleBox.classList.add('title-box');
    titleBox.innerText = 'BUDDHA STUPA'; // Set the title text here
    document.body.insertBefore(titleBox, document.querySelector('.gallery-container'));
});
