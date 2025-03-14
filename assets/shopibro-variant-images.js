const shopiThumbnail = document.querySelectorAll('.shopibro-product-thumbnails');
const shopiSwatch = document.querySelectorAll('.swatch__option input');
const shopiForm = document.querySelector('.d4-product .shopify-product-form');

function showSelectedImagesShopi(swatchValue){
  shopiThumbnail.forEach(image=> {
    let imageAttr = image.getAttribute('data-title');

    if (!imageAttr) {
        console.log(`Skipping image (No data-title found): ${image.src}`);
        return;
    }

    let finalValue;
    const match = imageAttr.match(/\$(.*?)\$/);
    finalValue = match ? match[1] : imageAttr;
    console.log("Final value: ", finalValue);
  })
}

showSelectedImagesShopi();

shopiForm.addEventListener('change', (event)=> {
  if(event.target.checked) {
    console.log(event.target.value);
  }
})