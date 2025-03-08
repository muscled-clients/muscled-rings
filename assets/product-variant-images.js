const productImages = document.querySelectorAll('.d4-product .product-gallery__image');
const productForm = document.querySelector('.d4-product .shopify-product-form');
const swatchOptions = document.querySelectorAll('.swatch__option input');
swatchOptions[0].checked = true;

function removeSlide(conditionClass) {
    const fliktyMain = document.querySelector('.product-gallery__main'); // Select Flickity container
    let flkty = Flickity.data(fliktyMain); // Get existing Flickity instance

    if (flkty) {
        // Find slides that match the condition
        flkty.cells.forEach(cell => {
            let slide = cell.element; // Get the actual slide element
            
            if (slide.classList.contains(conditionClass)) { // Condition check
                flkty.remove(slide); // Remove from Flickity
                slide.remove(); // Remove from DOM
                console.log("🗑️ Removed Slide: ", slide);
            }
        });

        flkty.reloadCells(); // Refresh Flickity after removing a slide
    } else {
        console.log("⚠️ Flickity is not initialized yet.");
    }
}

// Example Usage: Remove slides that have class 'hide-slide'
removeSlide("d4-remove-slide");

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
    removeSlide("d4-remove-slide");
  }
    });