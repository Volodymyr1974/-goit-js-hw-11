import './css/styles.css';
import { makeCardsMarkup } from './js/markup';
import ApiService from "./js/api-service";
import LoadMoreBtn from './js/load-more-btn';

const refs = {
  // searchForm: document.querySelector(".search-form"),
  cardsContainer: document.querySelector(".gallery"),
  // loadMoreBtn: document.querySelector(".load-more")
};
 const searchForm = new LoadMoreBtn({
   selector: '.search-form',
   
 });
searchForm.showForm();

 const loadMoreBtn = new LoadMoreBtn({
   selector: '[data-action="load-more"]',
   hidden: true,
 });
const newsApiService = new ApiService();
console.log(newsApiService);
console.log(loadMoreBtn);
console.log(searchForm);
searchForm.refs.button.addEventListener("submit", onSearch);
loadMoreBtn.refs.button.addEventListener("click", onLoadMore);



function onSearch(e) {
  e.preventDefault();
    newsApiService.query = e.currentTarget.elements.searchQuery.value;
  if (newsApiService.query === '') {
    return alert;
  }
  
  loadMoreBtn.show();
  newsApiService.resetPage();
  clearCardsContainer();
   console.dir(newsApiService.query);
  searchForm.hideForm();
  fetchHits();
  
};

function onLoadMore() {
  fetchHits();
};

function fetchHits() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(hits => {
    appendCardsMarkup(hits);
    loadMoreBtn.enable();
    searchForm.showForm();
  });
}

function appendCardsMarkup(hits) {
  refs.cardsContainer.insertAdjacentHTML('beforeend', makeCardsMarkup(hits));
};
function clearCardsContainer() {
  refs.cardsContainer.innerHTML = '';
}

