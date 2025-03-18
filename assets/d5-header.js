function stickyD5() { 
    const header = document.querySelector(".d5-header-main");
    let isSticky = false;
    let isTransitioning = false; // This flag will help to avoid adding/removing classes during the transition

    window.addEventListener("scroll", () => {
        if (window.scrollY >= 100 && !isSticky && !isTransitioning) {
            isTransitioning = true;
            header.classList.add("sticky-d5");
            // Set a small timeout for adding the "active" class
            setTimeout(() => {
                header.classList.add("active");
                isSticky = true;
                isTransitioning = false; // Allow the class to be added again after the transition is done
            }, 10);
        } else if (window.scrollY < 100 && isSticky && !isTransitioning) {
            isTransitioning = true;
            header.classList.remove("active");
            // Set a timeout to remove the "sticky-d5" class after the transition
            setTimeout(() => {
                header.classList.remove("sticky-d5");
                isSticky = false;
                isTransitioning = false;
            }, 200);
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
        openSearch.addEventListener('click', (e) => {
            e.preventDefault();
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

    openIcon?.addEventListener('click', (e) => {
        e.preventDefault();
        drawer.classList.add('active');
        overlay.classList.add('active');
    });

    closeIcon?.addEventListener('click', (e) => {
        e.preventDefault();
        drawer.classList.remove('active');
        overlay.classList.remove('active');
    });
  
    overlay?.addEventListener('click', (e) => {
        e.preventDefault();
        drawer.classList.remove('active');
        overlay.classList.remove('active');
    });
}
openDrawerD5();


