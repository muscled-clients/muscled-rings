 window.addEventListener("scroll", function () {
        let header = document.querySelector(".d5-header-main");
        if (window.scrollY >= 100) {
            header.classList.add("sticky-d5");
        } else {
            header.classList.remove("sticky-d5");
        }
    });

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
