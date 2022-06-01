import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { makeListMarkup } from './js/markup';
import { makeInfoMarkup } from './js/markup';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputCountryEl: document.querySelector("#search-box"),
    countryListEl:document.querySelector(".country-list"),
    countryInfoEl: document.querySelector(".country-info"),
};
console.dir(refs.inputCountryEl);
console.dir(refs.countryListEl);
console.dir(refs.countryInfoEl);

refs.inputCountryEl.addEventListener("input",  debounce(onInputCountry, DEBOUNCE_DELAY));


function onInputCountry (e){
  const inputText = e.target.value.trim();

    if (!inputText) {
        refs.countryListEl.innerHTML = '';
        refs.countryInfoEl.innerHTML = '';    
    return;
  }

  fetchCountries(inputText)
    .then(data => {
            if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name');
        return;
      }
      renderMarkup(data);
    })
      .catch(err => {
        refs.countryListEl.innerHTML = '';
        refs.countryInfoEl.innerHTML = '';
          Notify.failure('Oops, there is no country with that name');
    });
};

function renderMarkup (data ) {
  if (data.length === 1) {
   refs.countryListEl.innerHTML = '';
    const markupInfo = makeInfoMarkup(data);
    refs.countryInfoEl.innerHTML = markupInfo;
  } else {
     refs.countryInfoEl.innerHTML = '';
    const markupList = makeListMarkup(data);
    refs.countryListEl.innerHTML = markupList;
  }
};
