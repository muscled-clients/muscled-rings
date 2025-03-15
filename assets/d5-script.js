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
  const dataContainer = document.querySelector(".update-variant-info-d5"); // Source data container
  const targetContainer = document.querySelector(".answer-d5"); // Target update container

  if (!dataContainer || !targetContainer) {
    console.error("Data or target container missing.");
    return;
  }

  function updateVariantInfo(selectedVariantId) {
    if (!window.productData) {
      console.error("Product data is missing.");
      return;
    }

    console.log(`Updating variant: ${selectedVariantId}`);

    // Find the selected variant from productData
    const selectedVariant = window.productData.variants.find(
      (variant) => variant.id == selectedVariantId
    );

    if (selectedVariant) {
      console.log("Variant found:", selectedVariant);

      // Update Image
      if (selectedVariant.featured_image && imageElement) {
        imageElement.src = selectedVariant.featured_image.src;
        console.log("Updated Image:", selectedVariant.featured_image.src);
      } else {
        console.warn("Image not found for this variant.");
      }

      // Update Price
      if (typeof selectedVariant.price === "number" && priceElement) {
        priceElement.textContent = `$${(selectedVariant.price / 100).toFixed(2)}`;
        console.log("Updated Price:", priceElement.textContent);
      } else {
        console.warn("Price not found or invalid.");
      }

      // Update SKU
      const skuElement = targetContainer.querySelector(".selected-sku-d5");
      if (skuElement) {
        skuElement.textContent = selectedVariant.sku || "N/A";
        console.log("Updated SKU:", skuElement.textContent);
      }
    } else {
      console.warn("Variant data not found in productData.");
      return;
    }

    // Find the correct variant's metafield elements in update-variant-info-d5
    const variantDataElements = dataContainer.querySelectorAll(`[d5-variant="${selectedVariantId}"]`);

    if (variantDataElements.length === 0) {
      console.warn("Variant metafield data not found in update-variant-info-d5.");
      return;
    }

    // Loop through all the found elements and update corresponding elements in answer-d5
    variantDataElements.forEach((dataElement) => {
      const className = dataElement.className; // Get the class of the element (e.g., selected-metal-d5)
      const value = dataElement.textContent.trim(); // Get the text content

      // Find the corresponding element in answer-d5 and update it
      const targetElement = targetContainer.querySelector(`.${className}`);
      if (targetElement) {
        targetElement.textContent = value;
        console.log(`Updated ${className}:`, value);
      }
    });
  }

  // Handle select dropdown change
  if (variantSelector) {
    variantSelector.addEventListener("change", function () {
      updateVariantInfo(this.value);
    });

    // **Fix: On Page Load, Set the Default Variant**
    window.addEventListener("DOMContentLoaded", function () {
      const defaultVariantId = variantSelector.value;
      console.log("Default variant on page load:", defaultVariantId);
      updateVariantInfo(defaultVariantId);
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


