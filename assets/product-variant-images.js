const productImages = document.querySelectorAll('.d4-product .product-gallery__image'); // Main images
const productThumbnails = document.querySelectorAll('.product-gallery__thumbnail'); // Thumbnails
const productForm = document.querySelector('.d4-product .shopify-product-form');
const swatchOptions = document.querySelectorAll('.swatch__option input');
swatchOptions[0].checked = true;

let removedSlidesMain = []; // Stores removed slides for main Flickity
let removedSlidesThumbs = []; // Stores removed slides for thumbnails Flickity

// **Function to Wait for Flickity to Load**
function waitForFlickity(targetSelector, callback) {
    const checkFlickityInterval = setInterval(() => {
        const fliktyMain = document.querySelector(targetSelector);
        let flkty = Flickity.data(fliktyMain);

        if (flkty) {
            clearInterval(checkFlickityInterval);
            console.log(`✅ Flickity for ${targetSelector} is initialized.`);
            callback(flkty);
        } else {
            console.log(`⏳ Waiting for Flickity (${targetSelector})...`);
        }
    }, 500);

    setTimeout(() => {
        clearInterval(checkFlickityInterval);
        console.log(`⏹️ Stopped checking for Flickity after 15 seconds (${targetSelector}).`);
    }, 15000);
}

// **Function to Remove All Slides Marked with d4-remove-slide**
function removeMarkedSlides(flkty, removedSlidesArray) {
    let newRemovedSlides = [];

    flkty.cells.forEach(cell => {
        let slide = cell.element;
        if (slide.classList.contains('d4-remove-slide')) {
            console.log("🗑 Removing Slide:", slide);
            newRemovedSlides.push(slide);
            flkty.remove(slide);
        }
    });

    if (newRemovedSlides.length > 0) {
        removedSlidesArray.push(...newRemovedSlides); // Store removed slides
        flkty.reloadCells(); // Reload Flickity after removals
        console.log("🔄 Flickity reloaded after removing slides.");
    } else {
        console.log("✅ No new slides removed.");
    }
}

// **Function to Restore All Previously Removed Slides**
function restoreSlides(flkty, removedSlidesArray) {
    if (removedSlidesArray.length > 0) {
        console.log("♻️ Restoring All Removed Slides...");
        removedSlidesArray.forEach(slide => {
            flkty.append(slide);
            slide.classList.remove('d4-remove-slide');
        });

        removedSlidesArray.length = 0; // Clear storage after restoring
        flkty.reloadCells();
        console.log("✅ Flickity reloaded after restoring slides.");
    }
}

// **Function to Show or Hide Product Images & Thumbnails Based on Variant**
function ShowProductImages() {
    console.log("🎨 Checking Images for Selected Variant...");

    // **Get Selected Swatch**
    const selectedSwatch = Array.from(swatchOptions).find(option => option.checked);
    if (!selectedSwatch) {
        console.log("⚠️ No swatch selected. Resetting images...");
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
            console.log(`⚠️ Skipping image (No d4-img-alt found): ${image.src}`);
            return;
        }

        let finalValue;
        const match = imageAttr.match(/\$(.*?)\$/);
        finalValue = match ? match[1] : imageAttr;

        if (finalValue.includes(selectedValue)) {
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
            console.log(`⚠️ Skipping thumbnail (No data-title found):`, thumb);
            return;
        }

        if (thumbAttr.includes(selectedValue)) {
            thumb.classList.remove('d4-remove-slide');
            hasMatchingThumbnail = true;
        } else {
            thumb.classList.add('d4-remove-slide');
        }
    });

    if (!hasMatchingImage) {
        console.log("❌ No matching images found. Hiding all images.");
        productImages.forEach(image => image.classList.add('d4-remove-slide'));
    }

    if (!hasMatchingThumbnail) {
        console.log("❌ No matching thumbnails found. Hiding all thumbnails.");
        productThumbnails.forEach(thumb => thumb.classList.add('d4-remove-slide'));
    }

    // **Wait for Flickity, then Update Slides**
    waitForFlickity('.product-gallery__main', (flktyMain) => {
        restoreSlides(flktyMain, removedSlidesMain);
        removeMarkedSlides(flktyMain, removedSlidesMain);
    });

    waitForFlickity('.product-gallery__thumbnails', (flktyThumbs) => {
        restoreSlides(flktyThumbs, removedSlidesThumbs);
        removeMarkedSlides(flktyThumbs, removedSlidesThumbs);
    });
}

// **Initialize on Page Load**
ShowProductImages();

// **Event Listener for Variant Selection Change**
productForm.addEventListener("change", function (event) {
    if (event.target.checked) {
        ShowProductImages();
    }
});
