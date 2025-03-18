document.addEventListener("DOMContentLoaded", function () {
    const containers = document.querySelectorAll('[data-slider-container]');

    containers.forEach(container => {
        const progressBar = container.querySelector("[data-progress-d5]");
        const section = container.querySelector("[data-slider-d5]");
        const prevButton = container.querySelector("[data-prev-d5]");
        const nextButton = container.querySelector("[data-next-d5]");
        const slides = section.querySelectorAll("[data-slide-d5]"); // Ensure slides have a class "slide"

        const totalSlides = slides.length;
        const slideWidth = section.scrollWidth / totalSlides; // Dynamically get width of one slide
        const visibleSlides = Math.round(section.clientWidth / slideWidth); // Calculate visible slides

        function updateProgressBar() {
            let visibleWidth = section.clientWidth;
            let totalWidth = section.scrollWidth;
            let initialWidth = (visibleWidth / totalWidth) * 100;

            let scrollPosition = section.scrollLeft;
            let maxScroll = totalWidth - visibleWidth;
            let scrollPercentage = (scrollPosition / maxScroll) * (100 - initialWidth) + initialWidth;

            progressBar.style.width = scrollPercentage + "%";
            updateArrowState();
        }

        function setInitialProgressBar() {
            let visibleWidth = section.clientWidth;
            let totalWidth = section.scrollWidth;
            let initialWidth = (visibleWidth / totalWidth) * 100;
            progressBar.style.width = initialWidth + "%";
            updateArrowState();
        }

        function updateArrowState() {
            if (prevButton) {
                if (section.scrollLeft <= 0) {
                    prevButton.classList.add("d5-disable");
                } else {
                    prevButton.classList.remove("d5-disable");
                }
            }

            if (nextButton) {
                let maxScrollLeft = section.scrollWidth - section.clientWidth;
                if (section.scrollLeft >= maxScrollLeft - 1) { // Adjust to avoid small rounding errors
                    nextButton.classList.add("d5-disable");
                } else {
                    nextButton.classList.remove("d5-disable");
                }
            }
        }

        function scrollLeft() {
            section.scrollBy({ left: -slideWidth * visibleSlides, behavior: "smooth" });
        }

        function scrollRight() {
            section.scrollBy({ left: slideWidth * visibleSlides, behavior: "smooth" });
        }

        if (prevButton) prevButton.addEventListener("click", () => {
            scrollLeft();
            setTimeout(updateArrowState, 500); // Increased timeout to ensure smooth scroll updates
        });

        if (nextButton) nextButton.addEventListener("click", () => {
            scrollRight();
            setTimeout(updateArrowState, 500); // Increased timeout to ensure smooth scroll updates
        });

        setInitialProgressBar();
        section.addEventListener("scroll", updateProgressBar);
    });
});
