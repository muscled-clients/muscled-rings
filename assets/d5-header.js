function stickyD5(){
    let header = document.querySelector(".d5-header-main");
    let isSticky = false;

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 100 && !isSticky) {
        header.classList.add("sticky-d5");
        setTimeout(() => {
            header.classList.add("active"); // Delay for smooth transition
        }, 10);
        isSticky = true;
    } else if (window.scrollY < 100 && isSticky) {
        header.classList.remove("active"); // Remove active first
        setTimeout(() => {
            header.classList.remove("sticky-d5");
            window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
        }, 400); // Wait for transition before removing class
        isSticky = false;
    }
});

}
stickyD5();

function searchD5() {
    const overlay = document.querySelector('.site-overlay');
    const search = document.querySelector('.d5-header-main .search-overlay');
    const closeSearch = document.querySelector('.d5-header-main .search-overlay__close');
    const openSearch = document.querySelector('.header__link[data-show-search-trigger]');

    openSearch.addEventListener('click', () => {
        if (overlay.classList.contains('site-overlay--hidden')) {
            overlay.classList.remove('site-overlay--hidden');
            search.classList.add('is-opened');
        }
    });

    function closeSearchOverlay() {
        overlay.classList.add('site-overlay--hidden');
        search.classList.remove('is-opened');
    }

    overlay.addEventListener('click', closeSearchOverlay);
    closeSearch.addEventListener('click', closeSearchOverlay);
}

searchD5();
