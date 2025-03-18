document.addEventListener("DOMContentLoaded", function () {
  faqD5();
  readMoreLess();
  stepsUpdate();

});

function faqD5() {
  const faqMain = document.querySelectorAll(".d5-faq-main");
  faqMain.forEach((faq) => {
    const quest = faq.querySelector(".quest-d5");
    quest.addEventListener("click", () => {
      faq.classList.toggle("active");
    });
  });
}

function readMoreLess() {
  document
    .querySelectorAll(".description-text")
    .forEach(function (textContainer) {
      let button = textContainer.nextElementSibling;
      let lineHeight = parseFloat(
        window.getComputedStyle(textContainer).lineHeight
      );
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
  const variantSelector = document.querySelector(
    ".variant-selection__variants"
  );
  const variantSwatches = document.querySelectorAll(".swatch__option input");
  const imageElement = document.querySelector(".selected-image-d5 img");
  const priceElement = document.querySelector(".selected-price-d5 p");
  const dataContainer = document.querySelector(".update-variant-info-d5");
  const targetContainer = document.querySelector(".answer-d5");
  const plusPrice = document.querySelector(".d5-option-value");

  if (!dataContainer || !targetContainer) return;

  function updateVariantInfo(selectedVariantId) {
    if (!window.productData) return;

    const selectedVariant = window.productData.variants.find(
      (variant) => variant.id == selectedVariantId
    );

    if (selectedVariant) {
      // Update image and price
      if (selectedVariant.featured_image && imageElement) {
        imageElement.src = selectedVariant.featured_image.src;
      }

      if (typeof selectedVariant.price === "number" && priceElement) {
        priceElement.textContent = `$${(selectedVariant.price / 100).toFixed(2)}`;
      }

      // Update SKU
      const skuElement = targetContainer.querySelector(".selected-sku-d5");
      if (skuElement) {
        skuElement.textContent = selectedVariant.sku || "N/A";
      }

      // Handle the plus price update
      const plusPriceElement = plusPrice.querySelector(".selected-plus-price");
      if (plusPriceElement) {
        const variantPlusPrice = selectedVariant.d5_meta && selectedVariant.d5_meta.variant_plus_price;

        if (variantPlusPrice) {
          // Create span and append it
          const priceSpan = document.createElement("span");
          priceSpan.textContent = `$${(variantPlusPrice / 100).toFixed(2)}`;
          plusPriceElement.innerHTML = '';  // Clear the previous content
          plusPriceElement.appendChild(priceSpan);
        } else {
          // Clear the span if no plus price exists
          plusPriceElement.innerHTML = '';
        }
      }
    } else {
      return;
    }

    const variantDataElements = dataContainer.querySelectorAll(
      `[d5-variant="${selectedVariantId}"]`
    );

    if (variantDataElements.length === 0) return;

    variantDataElements.forEach((dataElement) => {
      const className = dataElement.className;
      const value = dataElement.textContent.trim();
      const targetElement = targetContainer.querySelector(`.${className}`);
      if (targetElement) {
        targetElement.textContent = value;
      }
    });
  }

  if (variantSelector) {
    variantSelector.addEventListener("change", function () {
      updateVariantInfo(this.value);
    });
  }

  setTimeout(() => {
    updateVariantInfo(variantSelector.value);
  }, 1000);

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


