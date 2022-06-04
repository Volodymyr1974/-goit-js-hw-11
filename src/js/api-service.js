const BASE_URL = 'https://pixabay.com/api/';

export default class ApiService{
  constructor() { 
    this.searchQuery = '';
    this.page = 1;
  }
  fetchArticles() {
    console.log("до", this);
    return fetch(`${BASE_URL}?key=27772870-4058b108341efce898c1dbbbe&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
      .then(response => response.json())
      .then(({hits}) => {
        this.page += 1;
       console.log(hits);
        console.log("after", this);
        return hits;
      });
  }
  resetPage(){
    this.page = 1;    
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQury) {
    this.searchQuery = newQury;
  }
}