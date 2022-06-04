
export { makeCardsMarkup };
export { makeInfoMarkup };
    



function makeCardsMarkup (data ) {
  return data
    .map(
      ({ webformatURL, largeImageURL,tags,likes,views,comments,downloads }) =>
        // `<li><img src="${flags.svg}" alt="${name.official}" width="50" height="40">${name.official}</li>`
        `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:${likes}</b>
    </p>
    <p class="info-item">
      <b>Views:${views}</b>
    </p>
    <p class="info-item">
      <b>Comments:${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:${downloads}</b>
    </p>
  </div>
</div>`,
    )
    .join('');
};

function makeInfoMarkup (data) {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<h1><img src="${flags.svg}" alt="${name.official}" width="60" height="50">${
        name.official
      }</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`,
  );
};