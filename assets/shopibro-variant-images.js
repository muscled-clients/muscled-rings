const shopiThumbnail = document.querySelectorAll('.shopibro-product-thumbnails');
const shopiSwatch = document.querySelectorAll('.swatch__option input');
const shopiForm = document.querySelector('.d4-product .shopify-product-form');

function showSelectedImagesShopi(swatchValue){
  if (window.innerWidth <= 768) {
    console.log("Skipping script execution on devices ≤ 768px.");
    return;
  }
  shopiThumbnail.forEach(image=> {
    let imageAttr = image.getAttribute('data-title');

    if (!imageAttr) {
        return;
    }

    let finalValue;
    const match = imageAttr.match(/\$(.*?)\$/);
    finalValue = match ? match[1] : imageAttr;
    
    if(finalValue == swatchValue) {
      image.style.display = 'block';
    } else {
      image.style.display = 'none';
    }
  })
}

showSelectedImagesShopi(shopiSwatch[0].value);

shopiForm.addEventListener('change', (event)=> {
  if(event.target.checked) {
    showSelectedImagesShopi(event.target.value);
  }
})