const productImages = document.querySelectorAll('.d4-product .product-gallery__image');
const productForm = document.querySelector('.d4-product .shopify-product-form');
const swatchOptions = document.querySelectorAll('.swatch__option input');
swatchOptions[0].checked = true;

function checkAndModifyFlickity(targetSelector, removeClass) {
    const checkFlickityInterval = setInterval(() => {
        const fliktyMain = document.querySelector(targetSelector); // Select Flickity container
        let flkty = Flickity.data(fliktyMain); // Retrieve Flickity instance

        if (flkty) {
            console.log("✅ Flickity is initialized:", flkty);
            clearInterval(checkFlickityInterval); // Stop checking once Flickity is found

            // **Print all slide elements**
            let slides = flkty.cells.map(cell => cell.element);
            console.log("📸 All Slides in Flickity:", slides);

            // **Remove slides with the specified class**
            removeSlide(flkty, removeClass);
        } else {
            console.log("❌ Flickity is not ready yet. Checking again...");
        }
    }, 2000); // Check every 2 seconds

    // **Stop checking after 15 seconds if Flickity is not found**
    setTimeout(() => {
        clearInterval(checkFlickityInterval);
        console.log("⏳ Stopped checking for Flickity after 15 seconds.");
    }, 15000);
}

// **Function to remove slides dynamically**
function removeSlide(flkty, conditionClass) {
    let slidesRemoved = false;

    flkty.cells.forEach(cell => {
        let slide = cell.element; // Get the actual slide element
        
        if (slide.classList.contains(conditionClass)) { // Condition check
            console.log("🗑️ Removing Slide:", slide);
            flkty.remove(slide); // Remove from Flickity
            slide.remove(); // Remove from DOM
            slidesRemoved = true;
        }
    });

    if (slidesRemoved) {
        flkty.reloadCells(); // Refresh Flickity only if a slide was removed
        console.log("🔄 Flickity reloaded after slide removal.");
    } else {
        console.log("⚠️ No slides matched the condition.");
    }
}

// **Usage: Call the function**
checkAndModifyFlickity('.product-gallery__main', 'd4-remove-slide');

function ShowProductImages() {
 productImages.forEach(image=> {
   const imageAttr = image.getAttribute('d4-img-alt');
   const match = imageAttr.match(/\$(.*?)\$/);
   
   if(match) {
     const finalValue = match[1];
     
     swatchOptions.forEach(option=> {
       if(option.checked) {
         if(finalValue.includes(option.value)) {
           image.classList.add('d4-display-image');
           if(image.classList.contains('d4-remove-slide')) {
             image.classList.remove('d4-remove-slide');
           }
         } else {
           image.classList.add('d4-remove-slide');
           if(image.classList.contains('d4-display-image')) {
             image.classList.remove('d4-display-image');
           }
         }
       }
     })
  
   }
   
}) 
}

ShowProductImages();

productForm.addEventListener("change", function(event) {
  if(event.target.checked){
    ShowProductImages();
   checkAndModifyFlickity('.product-gallery__main', 'd4-remove-slide');
  }
    });