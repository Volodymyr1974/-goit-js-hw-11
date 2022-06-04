// import './css/styles.css';
// import { fetchCountries } from './js/fetchCountries';
import { makeCardsMarkup } from './js/markup';
// import { makeInfoMarkup } from './js/markup';
// import debounce from 'lodash.debounce';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const DEBOUNCE_DELAY = 300;

// const refs = {
//     inputCountryEl: document.querySelector("#search-box"),
//     countryListEl:document.querySelector(".country-list"),
//     countryInfoEl: document.querySelector(".country-info"),
// };
// console.dir(refs.inputCountryEl);
// console.dir(refs.countryListEl);
// console.dir(refs.countryInfoEl);

// refs.inputCountryEl.addEventListener("input",  debounce(onInputCountry, DEBOUNCE_DELAY));


// function onInputCountry (e){
//   const inputText = e.target.value.trim();

//     if (!inputText) {
//         refs.countryListEl.innerHTML = '';
//         refs.countryInfoEl.innerHTML = '';    
//     return;
//   }

//   fetchCountries(inputText)
//     .then(data => {
//             if (data.length > 10) {
//         Notify.info('Too many matches found. Please enter a more specific name');
//         return;
//       }
//       renderMarkup(data);
//     })
//       .catch(err => {
//         refs.countryListEl.innerHTML = '';
//         refs.countryInfoEl.innerHTML = '';
//           Notify.failure('Oops, there is no country with that name');
//     });
// };

// function renderMarkup (data ) {
//   if (data.length === 1) {
//    refs.countryListEl.innerHTML = '';
//     const markupInfo = makeInfoMarkup(data);
//     refs.countryInfoEl.innerHTML = markupInfo;
//   } else {
//      refs.countryInfoEl.innerHTML = '';
//     const markupList = makeListMarkup(data);
//     refs.countryListEl.innerHTML = markupList;
//   }
// };

// fetch("https://pixabay.com/api/?key=27772870-4058b108341efce898c1dbbbe&q=cat&image_type=photo")
//   .then(r => r.json())
//   .then(console.log);
import ApiService from "./js/api-service";
const refs = {
  searchForm: document.querySelector(".search-form"),
  cardsContainer: document.querySelector(".gallery"),
  loadMoreBtn: document.querySelector(".load-more")
};
const newsApiService = new ApiService();
console.log(newsApiService);

refs.searchForm.addEventListener("submit", onSearch);
refs.loadMoreBtn.addEventListener("click", onLoadMore);



function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();
  console.dir(newsApiService.query);
  newsApiService.fetchArticles().then(appendCardsMarkup);
};

function onLoadMore() {
  newsApiService.fetchArticles().then(appendCardsMarkup);
};

function appendCardsMarkup(hits) {
  refs.cardsContainer.insertAdjacentHTML('beforeend', makeCardsMarkup(hits));
}
