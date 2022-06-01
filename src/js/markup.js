
export { makeListMarkup };
export { makeInfoMarkup };
    



function makeListMarkup (data ) {
  return data
    .map(
      ({ name, flags }) =>
        `<li><img src="${flags.svg}" alt="${name.official}" width="50" height="40">${name.official}</li>`,
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