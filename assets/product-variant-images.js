const productImages = document.querySelectorAll('.d4-product .product-gallery__image'); // Main images
const productThumbnails = document.querySelectorAll('.product-gallery__thumbnail'); // Thumbnails
const productForm = document.querySelector('.d4-product .shopify-product-form');
const swatchOptions = document.querySelectorAll('.swatch__option input');
swatchOptions[0].checked = true;

let removedSlidesMain = []; // Stores removed slides for main Flickity
let removedSlidesThumbs = []; // Stores removed slides for thumbnails Flickity

// **Function to Check if Flickity is Initialized**
function isFlickityInitialized(selector) {
    const element = document.querySelector(selector);
    return element && Flickity.data(element);
}

// **Function to Remove or Hide Slides Based on Flickity Use**
function removeSlides(flkty, removedSlidesArray, selector) {
    let slidesToRemove = document.querySelectorAll(`${selector} .d4-remove-slide`);

    if (flkty) {
        // **If Flickity is active, remove slides**
        slidesToRemove.forEach(slide => {
            flkty.remove(slide);
            removedSlidesArray.push(slide);
        });
        flkty.reloadCells();
    } else {
        // **If Flickity is NOT active, just hide slides (for desktop)**
        slidesToRemove.forEach(slide => {
            slide.style.display = 'none';
        });
    }
}

// **Function to Restore or Show Slides Based on Flickity Use**
function restoreSlides(flkty, removedSlidesArray, selector) {
    if (removedSlidesArray.length > 0) {
        if (flkty) {
            while (removedSlidesArray.length > 0) {
                let slide = removedSlidesArray.pop();
                flkty.append(slide);
            }
            flkty.reloadCells();
        } else {
            // **If Flickity is NOT active, show slides again**
            document.querySelectorAll(`${selector} .d4-remove-slide`).forEach(slide => {
                slide.style.display = 'block';
            });
        }
    }
}

// **Function to Show or Hide Product Images & Thumbnails Based on Variant**
function ShowProductImages() {
    console.log("Checking Images for Selected Variant...");

    // **Get Selected Swatch**
    const selectedSwatch = Array.from(swatchOptions).find(option => option.checked);
    if (!selectedSwatch) {
        console.log("No swatch selected. Resetting images...");
        productImages.forEach(image => image.classList.remove('d4-remove-slide'));
        productThumbnails.forEach(thumb => thumb.classList.remove('d4-remove-slide'));
        return;
    }

    const selectedValue = selectedSwatch.value;
    let hasMatchingImage = false;
    let hasMatchingThumbnail = false;

    // **Check Main Images & Apply Conditions**
    productImages.forEach(image => {
        let imageAttr = image.getAttribute('d4-img-alt');

        if (!imageAttr) {
            console.log(`Skipping image (No d4-img-alt found): ${image.src}`);
            return;
        }

        let finalValue;
        const match = imageAttr.match(/\$(.*?)\$/);
        finalValue = match ? match[1] : imageAttr;

        const isNumeric = /^\d+$/.test(selectedValue);

        if (isNumeric ? finalValue == selectedValue : finalValue.includes(selectedValue)) {
            image.classList.remove('d4-remove-slide');
            hasMatchingImage = true;
        } else {
            image.classList.add('d4-remove-slide');
        }
    });

    // **Check Thumbnails & Apply Conditions**
    productThumbnails.forEach(thumb => {
        let thumbAttr = thumb.getAttribute('data-title');

        if (!thumbAttr) {
            console.log(`Skipping thumbnail (No data-title found):`, thumb);
            return;
        }

        const isNumeric = /^[0-9]+$/.test(selectedValue);

        if (isNumeric ? thumbAttr == selectedValue : thumbAttr.includes(selectedValue)) {
            thumb.classList.remove('d4-remove-slide');
            hasMatchingThumbnail = true;
        } else {
            thumb.classList.add('d4-remove-slide');
        }
    });

    if (!hasMatchingImage) {
        console.log("No matching images found. Hiding all images.");
        productImages.forEach(image => image.classList.add('d4-remove-slide'));
    }

    if (!hasMatchingThumbnail) {
        console.log("No matching thumbnails found. Hiding all thumbnails.");
        productThumbnails.forEach(thumb => thumb.classList.add('d4-remove-slide'));
    }

    // **Check if Flickity is Used**
    const isFlickityMain = isFlickityInitialized('.product-gallery__main');
    const isFlickityThumbs = isFlickityInitialized('.product-gallery__thumbnails');

    // **Restore & Remove Slides for Main Gallery**
    restoreSlides(isFlickityMain, removedSlidesMain, '.product-gallery__main');
    removeSlides(isFlickityMain, removedSlidesMain, '.product-gallery__main');

    // **Restore & Remove Slides for Thumbnails**
    restoreSlides(isFlickityThumbs, removedSlidesThumbs, '.product-gallery__thumbnails');
    removeSlides(isFlickityThumbs, removedSlidesThumbs, '.product-gallery__thumbnails');

    // **Handle Case When Thumbnails are NOT Using Flickity on Desktop**
    if (!isFlickityThumbs && window.innerWidth >= 1024) {
        console.log("Flickity is not active on desktop thumbnails. Using display: none/block.");
        document.querySelectorAll('.product-gallery__thumbnails .d4-remove-slide').forEach(slide => {
            slide.style.display = 'none';
        });
    } else {
        document.querySelectorAll('.product-gallery__thumbnails .d4-remove-slide').forEach(slide => {
            slide.style.display = 'block';
        });
    }
}

// **Initialize on Page Load**
ShowProductImages();

// **Event Listener for Variant Selection Change**
productForm.addEventListener("change", function (event) {
    if (event.target.checked) {
        ShowProductImages();
    }
});
