import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api';
export default class ApiService{
  constructor() { 
    this.searchQuery = '';
    this.page = 1;
  }
  
    async fetchArticles() {
            try{
            const response = await axios.get(`/?key=27772870-4058b108341efce898c1dbbbe&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);
            this.incrementPage();
           return response.data;
        
        } catch (error) {
              console.log(error.message);
        }         
  }
  resetPage(){
    this.page = 1;    
  }
  incrementPage() {
    this.page += 1;
  }
  
  get query() {
    return this.searchQuery;
  }
  set query(newQury) {
    this.searchQuery = newQury;
  }
}