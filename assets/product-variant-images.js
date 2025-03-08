const productImages = document.querySelectorAll('.d4-product .product-gallery__image');
const productForm = document.querySelector('.d4-product .shopify-product-form');
const swatchOptions = document.querySelectorAll('.swatch__option input');
swatchOptions[0].checked = true;

function ShowProductImages() {
 productImages.forEach(image=> {
   const imageAttr = image.getAttribute('d4-img-alt');
  const match = imageAttr.match(/\$(.*?)\$/);
   
   if(match) {
     const finalValue = match[1];
     
     swatchOptions.forEach(option=> {
       if(option.checked == true) {
         if(option.value == finalValue) {
           image.classList.add('d4-display-image');
         } else {
           if(image.classList.contains('d4-dislay-image')) {
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
  if(event.target.checked == true){
    ShowProductImages();
  }
    });
// console.log('Swatch Options', swatchOptions);