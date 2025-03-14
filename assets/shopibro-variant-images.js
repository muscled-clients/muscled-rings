const shopiThumbnail = document.querySelectorAll('.shopibro-product-thumbnails');
const shopiSwatch = document.querySelectorAll('.swatch__option input');
const shopiForm = document.querySelector('.d4-product .shopify-product-form');

shopiForm.addEventListener('change', (event)=> {
  if(event.target.checked) {
    console.log(event.target.value);
  }
})