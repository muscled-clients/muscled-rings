const productImages = document.querySelectorAll('.d4-product .product-gallery__image'); // Main images
const productThumbnails = document.querySelectorAll('.product-gallery__thumbnail'); // Thumbnails
const productForm = document.querySelector('.d4-product .shopify-product-form');
const swatchOptions = document.querySelectorAll('.swatch__option input');

let removedSlidesMain = []; // Stores removed slides for main Flickity
let removedSlidesThumbs = []; // Stores removed slides for thumbnails Flickity

// **Function to Wait for Flickity to Load**
function waitForFlickity(targetSelector, callback) {
    const checkFlickityInterval = setInterval(() => {
        const fliktyMain = document.querySelector(targetSelector);
        let flkty = Flickity.data(fliktyMain);

        if (flkty) {
            clearInterval(checkFlickityInterval);
            callback(flkty);
        }
    }, 500);

    setTimeout(() => {
        clearInterval(checkFlickityInterval);
    }, 15000);
}

// **Function to Remove All Slides Marked with d4-remove-slide**
function removeMarkedSlides(flkty, removedSlidesArray) {
    let slidesToRemove = []; // Store elements to remove
    let totalRemoved = 0;

    // **Find all elements with 'd4-remove-slide'**
    flkty.cells.forEach(cell => {
        let slide = cell.element;
        if (slide.classList.contains('d4-remove-slide')) {
            slidesToRemove.push(slide);
        }
    });


    // **Ensure all slides are removed**
    while (slidesToRemove.length > 0) {
        let slide = slidesToRemove.pop(); // Remove last element in array
        flkty.remove(slide);
        removedSlidesArray.push(slide); // Store removed slides
        totalRemoved++;
    }

    if (totalRemoved > 0) {
        flkty.reloadCells(); // Ensure Flickity updates
        let newCells = flkty.cells;
      for(i = 0; i < newCells.length; i++) {
        if(newCells[i].element.classList.contains('d4-main-image')){
          newCells[i].element.click();
        }
      }
    } else {
        console.log("No slides removed.");
    }
}

// **Function to Restore All Previously Removed Slides**
function restoreSlides(flkty, removedSlidesArray) {
    if (removedSlidesArray.length > 0) {
        while (removedSlidesArray.length > 0) {
            let slide = removedSlidesArray.pop(); // Restore last removed slide
            flkty.append(slide);
        }
        flkty.reloadCells();
    }
}

// **Function to Show or Hide Product Images & Thumbnails Based on Variant**
function ShowProductImages() {

    // **Get Selected Swatch**
    const selectedSwatch = Array.from(swatchOptions).find(option => option.checked);
    if (!selectedSwatch) {
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
        return;
    }

    let finalValue;
    const match = imageAttr.match(/\$(.*?)\$/);
    finalValue = match ? match[1] : imageAttr;

    // Check if selectedValue is purely numeric
    const isNumeric = /^\d+$/.test(selectedValue);

     let validVariants = finalValue.split(',').map(v => v.trim()); 

    if (isNumeric ? validVariants.includes(selectedValue) : finalValue.includes(selectedValue)) {
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
        return;
    }

      let finalValue;
    const match = thumbAttr.match(/\$(.*?)\$/);
    finalValue = match ? match[1] : thumbAttr;
    // Check if selectedValue is purely numeric (still a string like "5")
    const isNumeric = /^[0-9]+$/.test(selectedValue);

      let validVariants = finalValue.split(',').map(v => v.trim()); 

    if (isNumeric ? validVariants.includes(selectedValue) : thumbAttr.includes(selectedValue)) {
        thumb.classList.remove('d4-remove-slide');
        hasMatchingThumbnail = true;
      thumb.style.display = 'block';
    } else {
        thumb.classList.add('d4-remove-slide');
      thumb.style.display = 'none';
    }
});

    if (!hasMatchingImage) {
        productImages.forEach(image => image.classList.add('d4-remove-slide'));
    }

    if (!hasMatchingThumbnail) {
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


// **Event Listener for Variant Selection Change**
productForm.addEventListener("change", function (event) {
    if (event.target.checked) {
        ShowProductImages();
    }
});
