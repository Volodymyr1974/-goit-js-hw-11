import './css/styles.css';
import { makeCardsMarkup } from './js/markup';
import ApiService from "./js/api-service";
import LoadMoreBtn from './js/load-more-btn';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const lightbox = new SimpleLightbox('.gallery a');

const refs = {  
  cardsContainer: document.querySelector(".gallery"),
  };

 const searchForm = new LoadMoreBtn({
   selector: '.search-form',
 });
    
 const loadMoreBtn = new LoadMoreBtn({
   selector: '[data-action="load-more"]',
   hidden: true,
 });

const newsApiService = new ApiService();

searchForm.showForm();

searchForm.refs.button.addEventListener("submit", onSearch);
loadMoreBtn.refs.button.addEventListener("click", fetchHits);


function onSearch(e) {
  e.preventDefault();
    newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  if (newsApiService.query === '') {
    return Notify.failure(`Рядок пошуку не може бути порожнім. Будь ласка, вкажіть свій пошуковий запит`);
  }

  loadMoreBtn.show();
  newsApiService.resetPage();
  clearCardsContainer();
  searchForm.hideForm();
  fetchHits();
  };

async function fetchHits() {
  loadMoreBtn.disable();
  try {const res = await newsApiService.fetchArticles()
      
  if (res.hits. length === 0) {
            Notify.failure(`На жаль, немає зображень, що відповідають вашому запиту: ${newsApiService.query}. Будь ласка спробуйте ще раз.`);
            loadMoreBtn.hide();searchForm.showForm();
            return;
      }
      
  if (newsApiService.page === 2) {
            Notify.info(`Ура! Ми знайшли для Вас ${res.totalHits} зображень.`);
    };

     appendCardsMarkup(res.hits);
     lightbox.refresh();
    
    if (newsApiService.page > Math.ceil(res.totalHits / res.hits.length)) {
            console.log(Math.round(res.totalHits / res.hits.length))
            Notify.failure(`Вибачте, Ви досягли межі доступних зображень для безкоштовного акаунту....`);
            loadMoreBtn.hide();
            return;
    };
    
    loadMoreBtn.enable();
    searchForm.showForm();
    
  } catch (error) {
    console.log(error);
  };
   
}


function appendCardsMarkup(hits) {
  refs.cardsContainer.insertAdjacentHTML('beforeend', makeCardsMarkup(hits));
};
function clearCardsContainer() {
  refs.cardsContainer.innerHTML = '';
};


