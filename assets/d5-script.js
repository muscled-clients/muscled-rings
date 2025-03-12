document.addEventListener("DOMContentLoaded", function () {
    const variantSelector = document.querySelector(".variant-selection__variants"); // Variant select dropdown
    const variantSwatches = document.querySelectorAll(".swatch__option input"); // Swatch buttons
    const productUrl = document.querySelector(".variant-selection").getAttribute("product-url"); // Get product URL
    const imageElement = document.querySelector(".selected-image-d5 img"); // Image element
    const priceElement = document.querySelector(".selected-price-d5 p"); // Price element

    function updateVariantInfo(selectedVariantId) {
        fetch(`${productUrl}.json`) // Fetch product JSON
            .then(response => response.json())
            .then(data => {
                const selectedVariant = data.product.variants.find(variant => variant.id == selectedVariantId);
                if (selectedVariant) {
                    // Update Image
                    if (selectedVariant.featured_image) {
                        imageElement.src = selectedVariant.featured_image.src;
                    }

                    // Update Price
                    priceElement.textContent = `$${(selectedVariant.price / 100).toFixed(2)}`; // Convert cents to dollars
                }
            })
            .catch(error => console.error("Error fetching variant data:", error));
    }

    // Handle select dropdown change
    if (variantSelector) {
        variantSelector.addEventListener("change", function () {
            const selectedVariantId = this.value;
            updateVariantInfo(selectedVariantId);
        });
    }

    // Handle swatch buttons change
    if (variantSwatches) {
        variantSwatches.forEach(swatch => {
            swatch.addEventListener("change", function () {
                const selectedVariantName = this.value;
                const selectedVariant = [...variantSelector.options].find(
                    option => option.textContent.includes(selectedVariantName)
                );

                if (selectedVariant) {
                    updateVariantInfo(selectedVariant.value);
                }
            });
        });
    }
});
