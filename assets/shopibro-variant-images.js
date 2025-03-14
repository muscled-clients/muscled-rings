const shopiThumbnail = document.querySelectorAll('.shopibro-product-thumbnails');
const shopiSwatch = document.querySelectorAll('.swatch__option input');
const shopiForm = document.querySelector('.d4-product .shopify-product-form');

function showSelectedImagesShopi(swatchValue){
  shopiThumbnail.forEach(image=> {
    let imageAttr = image.getAttribute('d4-img-alt');

    if (!imageAttr) {
        console.log(`Skipping image (No d4-img-alt found): ${image.src}`);
        return;
    }

    let finalValue;
    const match = imageAttr.match(/\$(.*?)\$/);
    finalValue = match ? match[1] : imageAttr;
  })
}

shopiForm.addEventListener('change', (event)=> {
  if(event.target.checked) {
    console.log(event.target.value);
  }
})