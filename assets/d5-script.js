document.addEventListener("DOMContentLoaded", function () {
  stepsUpdate();
  faqD5();
});

function faqD5(){
  const faqMain = document.querySelectorAll('.d5-faq-main');
  faqMain.forEach((faq) => {
    const quest = faq.querySelector('.quest-d5');
    quest.addEventListener('click', () =>{
      faq.classList.toggle('active');
    })
  })
  
}


function stepsUpdate() {
  const variantSelector = document.querySelector(
    ".variant-selection__variants"
  ); // Variant select dropdown
  const variantSwatches = document.querySelectorAll(".swatch__option input"); // Swatch buttons
  const imageElement = document.querySelector(".selected-image-d5 img"); // Image element
  const priceElement = document.querySelector(".selected-price-d5 p"); // Price element

  if (!window.productData) {
    console.error("Product data is not available.");
    return;
  }

  function updateVariantInfo(selectedVariantId) {
    const selectedVariant = window.productData.variants.find(
      (variant) => variant.id == selectedVariantId
    );
    if (selectedVariant) {
      // Update Image
      if (selectedVariant.featured_image) {
        imageElement.src = selectedVariant.featured_image.src;
      }

      // Update Price
      priceElement.textContent = `$${(selectedVariant.price / 100).toFixed(2)}`;
    } else {
      console.warn("Variant not found in product data.");
    }
  }

  // Handle select dropdown change
  if (variantSelector) {
    variantSelector.addEventListener("change", function () {
      updateVariantInfo(this.value);
    });
  }

  // Handle swatch buttons change
  if (variantSwatches.length) {
    variantSwatches.forEach((swatch) => {
      swatch.addEventListener("change", function () {
        const selectedVariantName = this.value;
        const selectedVariant = [...variantSelector.options].find((option) =>
          option.textContent.includes(selectedVariantName)
        );

        if (selectedVariant) {
          updateVariantInfo(selectedVariant.value);
        }
      });
    });
  }
}
