const productImages = document.querySelectorAll('.d4-product .product-gallery__image');
const productForm = document.querySelector('.d4-product .shopify-product-form');
const swatchOptions = document.querySelectorAll('.swatch__option input');
swatchOptions[0].checked = true;

let flickityReady = false;
let removedSlides = []; // Stores removed slides to restore later

// **Function to Wait for Flickity Initialization**
function waitForFlickity(targetSelector, callback) {
    const checkFlickityInterval = setInterval(() => {
        const fliktyMain = document.querySelector(targetSelector);
        let flkty = Flickity.data(fliktyMain);

        if (flkty) {
            clearInterval(checkFlickityInterval);
            flickityReady = true;
            console.log("✅ Flickity is initialized:", flkty);
            callback(flkty); // Execute function once Flickity is ready
        } else {
            console.log("⏳ Flickity not ready yet. Checking again...");
        }
    }, 500);

    setTimeout(() => {
        clearInterval(checkFlickityInterval);
        console.log("⏹️ Stopped checking for Flickity after 15 seconds.");
    }, 15000);
}

// **Function to Update Flickity Slides Based on the Selected Swatch**
function updateSlides(flkty, removeClass) {
    let newRemovedSlides = [];

    // **Restore previously removed slides first**
    restoreSlides(flkty);

    flkty.cells.forEach(cell => {
        let slide = cell.element;
        if (slide.classList.contains(removeClass)) {
            console.log("🗑 Removing Slide:", slide);
            newRemovedSlides.push(slide);
            flkty.remove(slide);
        }
    });

    if (newRemovedSlides.length > 0) {
        removedSlides = [...removedSlides, ...newRemovedSlides]; // Store removed slides globally
        flkty.reloadCells();
        console.log("🔄 Flickity reloaded after slide removal.");
    } else {
        console.log("✅ No new slides removed.");
    }
}

// **Function to Restore Removed Slides**
function restoreSlides(flkty) {
    if (removedSlides.length > 0) {
        console.log("♻️ Restoring Removed Slides...");
        removedSlides.forEach(slide => {
            flkty.append(slide);
            slide.classList.remove('d4-remove-slide'); // Ensure visibility
        });

        removedSlides = [];
        flkty.reloadCells();
        console.log("✅ Flickity reloaded after restoring slides.");
    }
}

// **Function to Show or Hide Product Images Based on the Selected Swatch**
function ShowProductImages() {
    const selectedSwatch = Array.from(swatchOptions).find(option => option.checked);

    if (!selectedSwatch) {
        console.log("⚠️ No swatch selected. Resetting all images...");
        productImages.forEach(image => {
            image.classList.remove('d4-display-image', 'd4-remove-slide');
        });
        return;
    }

    const selectedValue = selectedSwatch.value;
    let hasMatchingImage = false;

    productImages.forEach(image => {
        let imageAttr = image.getAttribute('d4-img-alt');
        console.log("🔍 Checking Image Alt:", imageAttr);

        if (!imageAttr) {
            console.log(`⚠️ Skipping image (No d4-img-alt found): ${image.src}`);
            return;
        }

        let finalValue;
        const match = imageAttr.match(/\$(.*?)\$/);
        if (match) {
            finalValue = match[1];
        } else {
            finalValue = imageAttr;
        }

        if (finalValue.includes(selectedValue)) {
            image.classList.add('d4-display-image');
            image.classList.remove('d4-remove-slide');
            hasMatchingImage = true;
        } else {
            image.classList.add('d4-remove-slide');
            image.classList.remove('d4-display-image');
        }
    });

    if (!hasMatchingImage) {
        console.log("❌ No matching images found. Hiding all images.");
        productImages.forEach(image => {
            image.classList.add('d4-remove-slide');
            image.classList.remove('d4-display-image');
        });
    }

    // **Update Flickity after modifying slides**
    waitForFlickity('.product-gallery__main', (flkty) => {
        restoreSlides(flkty);
        updateSlides(flkty, 'd4-remove-slide');
    });
}

// **Initialize on Page Load**
ShowProductImages();

// **Event Listener for Variant Selection Change**
productForm.addEventListener("change", function (event) {
    event.target.checked = true;
    if (event.target.checked) {
        ShowProductImages();
    }
});
