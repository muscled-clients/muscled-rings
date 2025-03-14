function searchD5() {
  const overlay = document.querySelector('.site-overlay');
  const search = document.querySelector('.d5-header-main .search-overlay');
  const closeSearch = document.querySelector('.d5-header-main .search-overlay__close');
  const openSearch = document.querySelector('.header-link[data-show-search-trigger]');

  openSearch.addEventListener('click', () => {
    if(overlay.classList.contains('site-overlay--hidden')){
    overlay.classList.remove('site-overlay--hidden');
      search.classList.add('is-opened');
    }
  })
  
}
searchD5();