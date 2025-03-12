document.addEventListener("DOMContentLoaded", function () {
    const variantSelector = document.querySelector(".d5-variant-selector");

    if (!variantSelector) return;

    variantSelector.addEventListener("change", function () {
        const selectedVariantId = this.getAttribute("variant"); // Get selected variant ID

        fetch(`/products/{{ product.handle }}.json`) // Fetch product JSON
            .then(response => response.json())
            .then(data => {
                const selectedVariant = data.product.variants.find(variant => variant.id == selectedVariantId);
                if (selectedVariant) {
                    // Update Image
                    const imageElement = document.querySelector(".selected-image-d5 img");
                    if (selectedVariant.featured_image) {
                        imageElement.src = selectedVariant.featured_image.src;
                    }

                    // Update Price
                    const priceElement = document.querySelector(".selected-price-d5 p");
                    priceElement.textContent = `$${(selectedVariant.price / 100).toFixed(2)}`; // Shopify price is in cents
                }
            })
            .catch(error => console.error("Error fetching variant data:", error));
    });
});
