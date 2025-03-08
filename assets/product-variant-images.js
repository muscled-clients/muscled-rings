const productImages = document.querySelectorAll('.d4-product .product-gallery__image');
const productForm = document.querySelector('.d4-product .shopify-product-form');
const swatchOptions = document.querySelectorAll('.swatch__option input');
// let flkty = window.Flickity.data;
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(()=> {
    const sliderMain = document.querySelector('.flickity-slider');
  console.log("Main slider: ", sliderMain);
  }, 10000);

if (sliderMain) {
    var flkty = window.Flickity.data(sliderMain); // Retrieve existing instance

    if (!flkty) { // If Flickity is NOT initialized, create a new one
        flkty = new Flickity(sliderMain, {
            cellAlign: 'left',
            contain: true
        });
        console.log("Flickity Initialized:", flkty);
    } else {
        console.log("Flickity already exists:", flkty);
    }
}

});

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