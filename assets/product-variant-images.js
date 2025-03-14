// const productImages = document.querySelectorAll('.d4-product .product-gallery__image'); // Main images
// const productThumbnails = document.querySelectorAll('.product-gallery__thumbnail'); // Thumbnails
// const productForm = document.querySelector('.d4-product .shopify-product-form');
const swatchOptions = document.querySelectorAll('.swatch__option input');
swatchOptions[0].checked = true;

// let removedSlidesMain = []; // Stores removed slides for main Flickity
// let removedSlidesThumbs = []; // Stores removed slides for thumbnails Flickity

// // add variant attr in image
// // function assignVariantValue() {
// //   swatchOptions.forEach(swatch=> {
// //     let getValue = swatch.getAttribute('variant-metafield-attr');
// //     productThumbnails.forEach(image=> {
// //       image.setAttribute('data-title', image.getAttribute('data-title') + "," + getValue);
// //     })
// //   })
// // }

// // assignVariantValue();

// // **Function to Wait for Flickity to Load**
// function waitForFlickity(targetSelector, callback) {
//     const checkFlickityInterval = setInterval(() => {
//         const fliktyMain = document.querySelector(targetSelector);
//         let flkty = Flickity.data(fliktyMain);

//         if (flkty) {
//             clearInterval(checkFlickityInterval);
//             callback(flkty);
//         }
//     }, 500);

//     setTimeout(() => {
//         clearInterval(checkFlickityInterval);
//     }, 15000);
// }

// // **Function to Remove All Slides Marked with d4-remove-slide**
// function removeMarkedSlides(flkty, removedSlidesArray) {
//     let slidesToRemove = []; // Store elements to remove
//     let totalRemoved = 0;

//     // **Find all elements with 'd4-remove-slide'**
//     flkty.cells.forEach(cell => {
//         let slide = cell.element;
//         if (slide.classList.contains('d4-remove-slide')) {
//             slidesToRemove.push(slide);
//         }
//     });

//     console.log(`Found ${slidesToRemove.length} slides to remove.`);

//     // **Ensure all slides are removed**
//     while (slidesToRemove.length > 0) {
//         let slide = slidesToRemove.pop(); // Remove last element in array
//         flkty.remove(slide);
//         removedSlidesArray.push(slide); // Store removed slides
//         totalRemoved++;
//     }

//     if (totalRemoved > 0) {
//         console.log(`Successfully removed ${totalRemoved} slides.`);
//         flkty.reloadCells(); // Ensure Flickity updates
//         console.log(`Flickity reloaded. Remaining slides: ${flkty.cells.length}`);
//         let newCells = flkty.cells;
//       console.log(newCells);
//       for(i = 0; i < newCells.length; i++) {
//         if(newCells[i].element.classList.contains('d4-main-image')){
//           newCells[i].element.click();
//         }
//       }
//     } else {
//         console.log("No slides removed.");
//     }
// }

// // **Function to Restore All Previously Removed Slides**
// function restoreSlides(flkty, removedSlidesArray) {
//     if (removedSlidesArray.length > 0) {
//         console.log("Restoring All Removed Slides...");
//         while (removedSlidesArray.length > 0) {
//             let slide = removedSlidesArray.pop(); // Restore last removed slide
//             flkty.append(slide);
//         }
//         flkty.reloadCells();
//         console.log(`Flickity reloaded after restoring slides. Total slides: ${flkty.cells.length}`);
//     }
// }

// // **Function to Show or Hide Product Images & Thumbnails Based on Variant**
// function ShowProductImages() {
//     console.log("Checking Images for Selected Variant...");

//     // **Get Selected Swatch**
//     const selectedSwatch = Array.from(swatchOptions).find(option => option.checked);
//     if (!selectedSwatch) {
//         console.log("No swatch selected. Resetting images...");
//         productImages.forEach(image => image.classList.remove('d4-remove-slide'));
//         productThumbnails.forEach(thumb => thumb.classList.remove('d4-remove-slide'));
//         return;
//     }

//     const selectedValue = selectedSwatch.value;
//     let hasMatchingImage = false;
//     let hasMatchingThumbnail = false;

//     // **Check Main Images & Apply Conditions**
//     productImages.forEach(image => {
//         let imageAttr = image.getAttribute('d4-img-alt');

//         if (!imageAttr) {
//             console.log(`Skipping image (No d4-img-alt found): ${image.src}`);
//             return;
//         }

//         let finalValue;
//         const match = imageAttr.match(/\$(.*?)\$/);
//         finalValue = match ? match[1] : imageAttr;

//         if (finalValue.includes(selectedValue)) {
//             image.classList.remove('d4-remove-slide');
//             hasMatchingImage = true;
//         } else {
//             image.classList.add('d4-remove-slide');
//         }
//     });

//     // **Check Thumbnails & Apply Conditions**
//     productThumbnails.forEach(thumb => {
//         let thumbAttr = thumb.getAttribute('data-title');

//         if (!thumbAttr) {
//             console.log(`Skipping thumbnail (No data-title found):`, thumb);
//             return;
//         }

//         if (thumbAttr.includes(selectedValue)) {
//             thumb.classList.remove('d4-remove-slide');
//             hasMatchingThumbnail = true;
//         } else {
//             thumb.classList.add('d4-remove-slide');
//         }
//     });

//     if (!hasMatchingImage) {
//         console.log("No matching images found. Hiding all images.");
//         productImages.forEach(image => image.classList.add('d4-remove-slide'));
//     }

//     if (!hasMatchingThumbnail) {
//         console.log("No matching thumbnails found. Hiding all thumbnails.");
//         productThumbnails.forEach(thumb => thumb.classList.add('d4-remove-slide'));
//     }

//     // **Wait for Flickity, then Update Slides**
//     waitForFlickity('.product-gallery__main', (flktyMain) => {
//         restoreSlides(flktyMain, removedSlidesMain);
//         removeMarkedSlides(flktyMain, removedSlidesMain);
//     });

//     waitForFlickity('.product-gallery__thumbnails', (flktyThumbs) => {
//         restoreSlides(flktyThumbs, removedSlidesThumbs);
//         removeMarkedSlides(flktyThumbs, removedSlidesThumbs);
//     });
// }

// // **Initialize on Page Load**
// ShowProductImages();

// // **Event Listener for Variant Selection Change**
// productForm.addEventListener("change", function (event) {
//     if (event.target.checked) {
//         ShowProductImages();
//     }
// });

document.addEventListener("DOMContentLoaded", function () {
  let variantSelect = document.querySelector('.d4-product .shopify-product-form');
  let allVariantContainers = document.querySelectorAll('.d4-product .product-gallery__image');
  let allThumbnailContainers = document.querySelectorAll('.d4-product .thumbnail-container');

  let flkty; // Variable to store the Flickity instance
  let maxTimeout = 15000; // Maximum time to wait for Flickity (15 seconds)
  let intervalTime = 2000; // Interval to check for Flickity (2 seconds)
  let startTime = Date.now();

  // Function to check for Flickity initialization
  function waitForFlickity(callback) {
    if (typeof Flickity !== 'undefined' && document.querySelector('.product-gallery__main').flickity) {
      // Flickity is available
      flkty = new Flickity('.product-gallery__main'); // Initialize or reuse Flickity instance
      callback();
    } else if (Date.now() - startTime < maxTimeout) {
      // Flickity not yet available, check again after interval
      setTimeout(() => waitForFlickity(callback), intervalTime);
    } else {
      // Flickity not available after maxTimeout
      console.error('Flickity not loaded within the expected time.');
    }
  }

  // Function to update images and thumbnails based on the selected variant
  function updateVariantImages(variantId) {
    // Hide all main image containers
    allVariantContainers.forEach(container => container.style.display = "none");

    // Show the main image container for the selected variant
    let selectedImagesContainer = document.querySelector(`.d4-product .product-gallery__image[data-variant-id='${variantId}']`);
    if (selectedImagesContainer) {
      selectedImagesContainer.style.display = "block";
    }

    // Hide all thumbnail containers
    allThumbnailContainers.forEach(container => container.style.display = "none");

    // Show the thumbnail container for the selected variant
    let selectedThumbnailsContainer = document.querySelector(`.d4-product .product-gallery__thumbnail[data-variant-id='${variantId}']`);
    if (selectedThumbnailsContainer) {
      selectedThumbnailsContainer.style.display = "block";
    }

    // Reset Flickity to the first slide for the selected variant
    if (flkty) {
      flkty.select(0); // Go to the first slide
    }
  }

  // Wait for Flickity to initialize
  waitForFlickity(function () {
    // Add event listener for variant change
    variantSelect.addEventListener("change", function (event) {
      console.log('hello');
      updateVariantImages(variantSelect.querySelector('variant-selection').getAttribute('variant'));
      console.log(event.target.value);
    });

    // Initialize with the default selected variant
    updateVariantImages(variantSelect.querySelector('variant-selection').getAttribute('variant'));
  });
});