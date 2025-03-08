const productImages = document.querySelectorAll('.d4-product .product-gallery__image');
const productForm = document.querySelector('.d4-product .shopify-product-form');
const swatchOptions = document.querySelectorAll('.swatch__option input');
const sliderMain = document.querySelector('.flickity-slider');
// let flkty = window.Flickity.data;
document.addEventListener("DOMContentLoaded", function () {
    console.log("Flickity on window after DOM loaded:", window.Flickity.data(sliderMain));
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