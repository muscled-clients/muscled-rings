const productImages = document.querySelectorAll('.d4-product .product-gallery__image');
const productForm = document.querySelector('.d4-product shopify-product-form');
const swatchOptions = document.querySelectorAll('.swatch__option input');
productForm.addEventListener("change", function(event) {
        console.log("Input changed:", event.target.name, event.target.value);
    });
// console.log('Swatch Options', swatchOptions);