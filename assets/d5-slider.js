document.addEventListener("DOMContentLoaded", function () {
    const containers = document.querySelectorAll('[data-slider-container]');

    containers.forEach(container => {
        const progressBar = container.querySelector("[data-progress-d5]");
        const section = container.querySelector("[data-slider-d5]");

        function updateProgressBar() {
            let visibleWidth = section.clientWidth;
            let totalWidth = section.scrollWidth;
            let initialWidth = (visibleWidth / totalWidth) * 100;

            let scrollPosition = section.scrollLeft;
            let maxScroll = totalWidth - visibleWidth;
            let scrollPercentage = (scrollPosition / maxScroll) * (100 - initialWidth) + initialWidth;

            progressBar.style.width = scrollPercentage + "%";
        }

        function setInitialProgressBar() {
            let visibleWidth = section.clientWidth;
            let totalWidth = section.scrollWidth;
            let initialWidth = (visibleWidth / totalWidth) * 100;
            progressBar.style.width = initialWidth + "%";
        }

        setInitialProgressBar();
        section.addEventListener("scroll", updateProgressBar);
    });
});
