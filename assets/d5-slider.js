document.addEventListener("DOMContentLoaded", function () {
    const containers = document.querySelectorAll('[data-slider-container]');

    containers.forEach(container => {
        const progressBar = container.querySelector("[data-progress-d5]");
        const section = container.querySelector("[data-slider-d5]");
        const prevButton = container.querySelector("[data-prev-d5]");
        const nextButton = container.querySelector("[data-next-d5]");

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
                if (Math.ceil(section.scrollLeft) >= maxScrollLeft) { // Used Math.ceil for precision fix
                    nextButton.classList.add("d5-disable");
                } else {
                    nextButton.classList.remove("d5-disable");
                }
            }
        }

        function scrollLeft() {
            section.scrollBy({ left: -section.clientWidth / 2, behavior: "smooth" });
        }

        function scrollRight() {
            section.scrollBy({ left: section.clientWidth / 2, behavior: "smooth" });
        }

        if (prevButton) prevButton.addEventListener("click", () => {
            scrollLeft();
            setTimeout(updateArrowState, 300); // Delay to ensure state updates after smooth scroll
        });

        if (nextButton) nextButton.addEventListener("click", () => {
            scrollRight();
            setTimeout(updateArrowState, 300); // Delay to ensure state updates after smooth scroll
        });

        setInitialProgressBar();
        section.addEventListener("scroll", updateProgressBar);
    });
});
