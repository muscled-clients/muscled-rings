const productImages = document.querySelectorAll('.d4-product .product-gallery__image');
const productForm = document.querySelector('.d4-product .shopify-product-form');
const swatchOptions = document.querySelectorAll('.swatch__option input');
swatchOptions[0].checked = true;

function checkAndModifyFlickity(targetSelector, removeClass) {
    const checkFlickityInterval = setInterval(() => {
        const fliktyMain = document.querySelector(targetSelector);
        let flkty = Flickity.data(fliktyMain);

        if (flkty) {
            console.log("Flickity is initialized:", flkty);
            clearInterval(checkFlickityInterval);

            let slides = flkty.cells.map(cell => cell.element);
            console.log("All Slides in Flickity:", slides);

            removeSlide(flkty, removeClass);
        } else {
            console.log("Flickity is not ready yet. Checking again...");
        }
    }, 2000);
    setTimeout(() => {
        clearInterval(checkFlickityInterval);
        console.log("Stopped checking for Flickity after 15 seconds.");
    }, 15000);
}

// **Function to remove slides dynamically**
function removeSlide(flkty, conditionClass) {
    let slidesRemoved = false;

    flkty.cells.forEach(cell => {
        let slide = cell.element; 
        
        if (slide.classList.contains(conditionClass)) { 
            console.log("Removing Slide:", slide);
            flkty.remove(slide);
            slide.remove(); 
            slidesRemoved = true;
        }
    });

    if (slidesRemoved) {
        flkty.reloadCells();
        console.log("Flickity reloaded after slide removal.");
    } else {
        console.log("No slides matched the condition.");
    }
}

// **Usage: Call the function**
// checkAndModifyFlickity('.product-gallery__main', 'd4-remove-slide');

function ShowProductImages() {
    // Get the selected swatch
    const selectedSwatch = Array.from(swatchOptions).find(option => option.checked);

    if (!selectedSwatch) {
        console.log("⚠️ No swatch selected. Resetting all images...");
        productImages.forEach(image => {
            image.classList.remove('d4-display-image', 'd4-remove-slide'); // Reset all images
        });
        return; // Exit function if no swatch is selected
    }

    const selectedValue = selectedSwatch.value;
    let hasMatchingImage = false; // Track if we find a matching image

    productImages.forEach(image => {
        const imageAttr = image.getAttribute('d4-img-alt');
        const match = imageAttr ? imageAttr.match(/\$(.*?)\$/) : null;

        if (match) {
            const finalValue = match[1]; // Extract value from $...$

            if (finalValue.includes(selectedValue)) {
                // ✅ Show matching image
                image.classList.add('d4-display-image');
                image.classList.remove('d4-remove-slide');
                hasMatchingImage = true;
            } else {
                // ❌ Hide non-matching images
                image.classList.add('d4-remove-slide');
                image.classList.remove('d4-display-image');
            }
        } else {
            console.log(`⚠️ No matching value found for image: ${image.src}`);
        }
    });

    // If no images match the selected swatch, hide all images
    if (!hasMatchingImage) {
        console.log("❌ No matching images found. Hiding all images.");
        productImages.forEach(image => {
            image.classList.add('d4-remove-slide');
            image.classList.remove('d4-display-image');
        });
    }
}


ShowProductImages();

productForm.addEventListener("change", function(event) {
  event.target.checked = true;
  if(event.target.checked){
    ShowProductImages();
   checkAndModifyFlickity('.product-gallery__main', 'd4-remove-slide');
  }
    });