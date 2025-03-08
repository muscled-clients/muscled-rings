const productImages = document.querySelectorAll('.d4-product .product-gallery__image');
const productForm = document.querySelector('.d4-product .shopify-product-form');
const swatchOptions = document.querySelectorAll('.swatch__option input');
swatchOptions[0].checked = true;

function ShowProductImages() {
 productImages.forEach(image=> {
   const imageAttr = image.getAttribute('data-title');
  const match = imageAttr.match(/\$(.*?)\$/);
   if(match) {
     console.log("split string: ", match[1]);
   }
  console.log(image.getAttribute('data-title'));
   
}) 
}

ShowProductImages();
productForm.addEventListener("change", function(event) {
        console.log("Input changed:", event.target.value);
    });
// console.log('Swatch Options', swatchOptions);