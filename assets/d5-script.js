document.addEventListener("DOMContentLoaded", function () {
  stepsUpdate();
  faqD5();
  readMoreLess();
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

function readMoreLess(){
  document.querySelectorAll(".description-text").forEach(function (textContainer) {
      let button = textContainer.nextElementSibling;
      let lineHeight = parseFloat(window.getComputedStyle(textContainer).lineHeight);
      let maxHeight = lineHeight * 2; // Maximum height for two lines

      // Get actual height of text
      let actualHeight = textContainer.getBoundingClientRect().height;

      if (actualHeight > maxHeight) {
        button.style.display = "block"; // Show button if text exceeds two lines
      }

      button.addEventListener("click", function (e) {
        e.preventDefault();
        if (textContainer.classList.contains("expanded")) {
          textContainer.classList.remove("expanded");
          this.textContent = "More";
        } else {
          textContainer.classList.add("expanded");
          this.textContent = "Less";
        }
      });
    });
}


function stepsUpdate() {
  const variantSelector = document.querySelector(".variant-selection__variants"); // Variant select dropdown
  const variantSwatches = document.querySelectorAll(".swatch__option input"); // Swatch buttons
  const imageElement = document.querySelector(".selected-image-d5 img"); // Image element
  const priceElement = document.querySelector(".selected-price-d5 p"); // Price element
  const skuElement = document.querySelector('.selected-sku-d5');

  // Elements for metafield updates
  const settingsElement = document.querySelector('.selected-settings-d5');
  const sizesElement = document.querySelector('.selected-sizes-d5');
  const stoneElement = document.querySelector('.selected-stone-d5');
  const metalElement = document.querySelector('.selected-metal-d5');
  const shapeElement = document.querySelector('.selected-shape-d5');

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

      // Update SKU
      if (skuElement) {
        skuElement.textContent = selectedVariant.sku;
      }

      // Update Price
      if (priceElement) {
        priceElement.textContent = `$${(selectedVariant.price / 100).toFixed(2)}`;
      }

      // Update Metafield Data if available
      if (selectedVariant.metafields && selectedVariant.metafields.custom) {
        const metafields = selectedVariant.metafields.custom;

        if (settingsElement && metafields.setting_style) {
          settingsElement.textContent = metafields.setting_style.value || "N/A";
        }

        if (sizesElement && metafields.sizes_available) {
          sizesElement.textContent = metafields.sizes_available.value || "N/A";
        }

        if (stoneElement && metafields.center_stone_carat_weight) {
          stoneElement.textContent = metafields.center_stone_carat_weight.value || "N/A";
        }

        if (metalElement && metafields.metal) {
          metalElement.textContent = metafields.metal.value || "N/A";
        }

        if (shapeElement && metafields.supported_diamond_shape) {
          shapeElement.textContent = metafields.supported_diamond_shape.value || "N/A";
        }
      }
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

