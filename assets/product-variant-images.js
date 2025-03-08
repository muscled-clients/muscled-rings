const productImages = document.querySelectorAll('.d4-product .product-gallery__image');
const productForm = document.querySelector('.d4-product .shopify-product-form');
const swatchOptions = document.querySelectorAll('.swatch__option input');


const intervalCheck = setInterval(() => {
    const fliktyMain = document.querySelector('.product-gallery__main');
    
    if (fliktyMain) {
        let flkty = Flickity.data(fliktyMain);
        console.log("Flickity Data: ", flkty);

        if (flkty) {
            console.log("✅ Flickity is initialized!");
            clearInterval(intervalCheck); // Stop checking once Flickity is found
        }
    } else {
        console.log("❌ Flickity container not found.");
    }
}, 2000); // Run every 2 seconds

// Stop checking after 15 seconds
setTimeout(() => {
    clearInterval(intervalCheck);
    console.log("⏳ Stopped checking after 15 seconds.");
}, 15000);



swatchOptions[0].checked = true;

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
         } else {
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
  }
    });