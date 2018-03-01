import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {}

  getAuthors(){
    return this._http.get('/authors');
  }

  getAuthorById(_id){
    return this._http.get(`/authors/${_id}`);
  }

  addAuthor(newAuthor){
    return this._http.post('/newAuthor', newAuthor);
  }

  removeAuthor(_id){
    return this._http.delete(`/authors/${_id}`);
  }

  editAuthor(author, _id){
    return this._http.put(`/authors/${_id}`, author);
  }

  addQuote(newQuote, _id){
    return this._http.put(`/newQuote/${_id}`, newQuote);
  }

  upvoteQuote(id, _id, votes) {
    console.log("Upvoting quote recieved by service");
    console.log(id, _id, votes);
    return this._http.put(`/quotes/${_id}/upvote/${id}`, votes);
  }


}
