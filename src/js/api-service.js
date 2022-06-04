export default class ApiService{
  constructor() { 
    this.searchQuery = "";
    this.page = 1;
    }
  fetchArticles(searchQuery) {
    console.log("до", this);
    return fetch(`https://pixabay.com/api/?key=27772870-4058b108341efce898c1dbbbe&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
      .then(r => r.json())
      .then(data => {
        this.page += 1;
       console.log(data);
        console.log("after", this);
        return data.hits;
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