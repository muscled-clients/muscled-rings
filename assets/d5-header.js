function stickyD5() { 
    const header = document.querySelector(".d5-header-main");
    let isSticky = false;

    window.addEventListener("scroll", () => {
        if (window.scrollY >= 100) {
            if (!isSticky) {
                header.classList.add("sticky-d5");
                setTimeout(() => header.classList.add("active"), 10);
                isSticky = true;
            }
        } else {
            if (isSticky) {
                header.classList.remove("active");
                setTimeout(() => header.classList.remove("sticky-d5"), 400);
                isSticky = false;
            }
        }
    });
}
stickyD5(); 

function searchD5() {
    const overlay = document.querySelector('.site-overlay');
    const search = document.querySelector('.d5-header-main .search-overlay');
    const closeSearch = document.querySelector('.d5-header-main .search-overlay__close');
    const openSearch = document.querySelector('.header__link[data-show-search-trigger]');

    if (openSearch) {
        openSearch.addEventListener('click', () => {
            overlay.classList.remove('site-overlay--hidden');
            search.classList.add('is-opened');
        });
    }

    function closeSearchOverlay() {
        overlay.classList.add('site-overlay--hidden');
        search.classList.remove('is-opened');
    }

    overlay?.addEventListener('click', closeSearchOverlay);
    closeSearch?.addEventListener('click', closeSearchOverlay);
}
searchD5();

function openDrawerD5() {
    const overlay = document.querySelector('.d5-overlay');
    const openIcon = document.querySelector('.menu-icon-d5');
    const closeIcon = document.querySelector('.close-icon-d5');
    const drawer = document.querySelector('.navigation-d5');

    openIcon?.addEventListener('click', () => {
        drawer.classList.add('active');
        overlay.classList.add('active');
    });

    closeIcon?.addEventListener('click', () => {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
    });
  
    overlay?.addEventListener('click', () => {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
    });
}
openDrawerD5();


