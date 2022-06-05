import './css/styles.css';
import { makeCardsMarkup } from './js/markup';
import ApiService from "./js/api-service";
import LoadMoreBtn from './js/load-more-btn';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const lightbox = new SimpleLightbox('.gallery a');

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
// console.log(newsApiService);
// console.log(loadMoreBtn);
// console.log(searchForm);
searchForm.refs.button.addEventListener("submit", onSearch);
loadMoreBtn.refs.button.addEventListener("click", fetchHits);


function onSearch(e) {
  e.preventDefault();
    newsApiService.query = e.currentTarget.elements.searchQuery.value;
  if (newsApiService.query === '') {
    return Notify.failure(`The search string cannot be empty. Please specify your search query`);
  }
  
  loadMoreBtn.show();
  newsApiService.resetPage();
  clearCardsContainer();
  console.dir(newsApiService.query);
  searchForm.hideForm();
  fetchHits();
  
};

// function onLoadMore() {
//   fetchHits();
// };

function fetchHits() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(data => {
    console.log(data.hits, data.totalHits)
    if (data.hits. length === 0) {
            Notify.failure(`Sorry, there are no images matching your search query: ${newsApiService.query}. Please try again.`);
            loadMoreBtn.hide();searchForm.showForm();
            return;
        }
      
    if (newsApiService.page === 2) {
      console.log("поточна сторынка",newsApiService.page);
       Notify.info(`Hooray! We found ${data.totalHits} images.`);
    };
    appendCardsMarkup(data.hits);
     lightbox.refresh();
    if (newsApiService.page > Math.round(data.totalHits / data.hits.length)) {
      console.log(Math.round(data.totalHits / data.hits.length))
      Notify.failure(`We're sorry, but you've reached the end of search results.`);
      loadMoreBtn.hide();
    return;
    };
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

