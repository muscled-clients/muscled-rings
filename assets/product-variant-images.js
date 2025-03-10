const productImages = document.querySelectorAll('.d4-product .product-gallery__image');
const productForm = document.querySelector('.d4-product .shopify-product-form');
const swatchOptions = document.querySelectorAll('.swatch__option input');
swatchOptions[0].checked = true;

let removedSlides = []; // Stores removed slides for restoration

// **Function to Wait for Flickity to Load**
function waitForFlickity(targetSelector, callback) {
    const checkFlickityInterval = setInterval(() => {
        const fliktyMain = document.querySelector(targetSelector);
        let flkty = Flickity.data(fliktyMain);

        if (flkty) {
            clearInterval(checkFlickityInterval);
            console.log("✅ Flickity is initialized.");
            callback(flkty); // Execute function when ready
        } else {
            console.log("⏳ Waiting for Flickity...");
        }
    }, 500);

    setTimeout(() => {
        clearInterval(checkFlickityInterval);
        console.log("⏹️ Flickity check stopped after 15 seconds.");
    }, 15000);
}

// **Function to Remove All Slides Marked with d4-remove-slide**
function removeMarkedSlides(flkty) {
    let newRemovedSlides = [];

    flkty.cells.forEach(cell => {
        let slide = cell.element;
        if (slide.classList.contains('d4-remove-slide')) {
            console.log("🗑 Removing Slide:", slide);
            newRemovedSlides.push(slide);
            flkty.remove(slide);
        }
    });

    // **Store removed slides globally**
    if (newRemovedSlides.length > 0) {
        removedSlides = [...removedSlides, ...newRemovedSlides];
        flkty.reloadCells(); // Reload Flickity after removals
        console.log("🔄 Flickity reloaded after removing slides.");
    } else {
        console.log("✅ No new slides removed.");
    }
}

// **Function to Restore All Previously Removed Slides**
function restoreSlides(flkty) {
    if (removedSlides.length > 0) {
        console.log("♻️ Restoring All Removed Slides...");
        removedSlides.forEach(slide => {
            flkty.append(slide);
            slide.classList.remove('d4-remove-slide'); // Make sure it is visible
        });

        removedSlides = []; // Clear storage after restoring
        flkty.reloadCells();
        console.log("✅ Flickity reloaded after restoring slides.");
    }
}

// **Function to Show or Hide Product Images Based on Variant**
function ShowProductImages() {
    console.log("🎨 Checking Images for Selected Variant...");

    // **Get Selected Swatch**
    const selectedSwatch = Array.from(swatchOptions).find(option => option.checked);
    if (!selectedSwatch) {
        console.log("⚠️ No swatch selected. Resetting images...");
        productImages.forEach(image => {
            image.classList.remove('d4-remove-slide'); // Show all images
        });
        return;
    }

    const selectedValue = selectedSwatch.value;
    let hasMatchingImage = false;

    // **Check Images & Apply Conditions**
    productImages.forEach(image => {
        let imageAttr = image.getAttribute('d4-img-alt');
        console.log("🔍 Checking Image Alt:", imageAttr);

        if (!imageAttr) {
            console.log(`⚠️ Skipping image (No d4-img-alt found): ${image.src}`);
            return;
        }

        let finalValue;
        const match = imageAttr.match(/\$(.*?)\$/);
        finalValue = match ? match[1] : imageAttr;

        // **Show or Remove Image**
        if (finalValue.includes(selectedValue)) {
            image.classList.remove('d4-remove-slide'); // Show this image
            hasMatchingImage = true;
        } else {
            image.classList.add('d4-remove-slide'); // Mark for removal
        }
    });

    if (!hasMatchingImage) {
        console.log("❌ No matching images found. Hiding all images.");
        productImages.forEach(image => image.classList.add('d4-remove-slide'));
    }

    // **Wait for Flickity, then Update Slides**
    waitForFlickity('.product-gallery__main', (flkty) => {
        restoreSlides(flkty); // Restore first
        removeMarkedSlides(flkty); // Then remove again
    });
}

// **Initialize on Page Load**
ShowProductImages();

// **Event Listener for Variant Selection Change**
productForm.addEventListener("change", function (event) {
  console.log("D4 variant changed");
    if (event.target.checked) {
        ShowProductImages();
    }
});
