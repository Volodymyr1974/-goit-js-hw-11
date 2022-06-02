export default class ApiService{
    constructor() { }
    fetchArticles(searchQuery) {
        fetch(`https://pixabay.com/api/?key=27772870-4058b108341efce898c1dbbbe&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(r => r.json())
  .then(console.log)
    }
}