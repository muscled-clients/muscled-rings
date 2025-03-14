const shopiThumbnail = document.querySelectorAll('.shopibro-product-thumbnails');
const shopiSwatch = document.querySelectorAll('.swatch__option input');
const shopiForm = document.querySelector('.d4-product .shopify-product-form');

function showSelectedImagesShopi(swatchValue){
  console.log(swatchValue);
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
    if(finalValue == swatchValue) {
      image.style.display = 'block';
    } else {
      image.style.display = 'none';
    }
  })
}

showSelectedImagesShopi(shopiForm[0].value);

shopiForm.addEventListener('change', (event)=> {
  if(event.target.checked) {
    showSelectedImagesShopi(event.target.value);
  }
})