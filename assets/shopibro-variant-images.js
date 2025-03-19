const shopiThumbnail = document.querySelectorAll('.shopibro-product-thumbnails');
const shopiSwatch = document.querySelectorAll('.swatch__option input');
const shopiForm = document.querySelector('.d4-product .shopify-product-form');
// shopiSwatch[0].checked = true;

shopiThumbnail.forEach(image=> {
  image.style.display = "block";
})

// Function to show selected images based on swatch selection
function showSelectedImagesShopi(swatchValue) {
  // Check if device width is greater than 768px
  if (window.innerWidth <= 768) {
    return;
  }

  shopiThumbnail.forEach(image => {
    let imageAttr = image.getAttribute('data-title');

    if (!imageAttr) {
        return;
    }

    let finalValue;
    const match = imageAttr.match(/\$(.*?)\$/);
    finalValue = match ? match[1] : imageAttr;

    // **Check if finalValue contains multiple variants (comma-separated)**
    let validVariants = finalValue.split(',').map(v => v.trim()); // Convert to array

    if (validVariants.includes(swatchValue)) {
      image.style.display = 'block';
    } else {
      image.style.display = 'none';
    }
  });
}

// Run script only if window width is greater than 768px
if (window.innerWidth > 768) {
  showSelectedImagesShopi(shopiSwatch[0].value);
}

// Event listener for swatch changes
shopiForm.addEventListener('change', (event) => {
  if (window.innerWidth > 768 && event.target.checked) {
    showSelectedImagesShopi(event.target.value);
  }
});