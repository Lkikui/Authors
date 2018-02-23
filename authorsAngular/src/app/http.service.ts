import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {}

  getAuthors(){
    return this._http.get('/authors');
  }

  getAuthorById(_id){
    // console.log("from service, getAuthorById():")
    // console.log(_id);
    return this._http.get(`/authors/${_id}`);
  }

  addAuthor(newAuthor){
    console.log("sending newAuthor from service");
    return this._http.post('/newAuthor', newAuthor);
  }

  removeAuthor(_id){
    console.log("deleting from service");
    return this._http.delete(`/authors/${_id}`);
  }

  editAuthor(author, _id){
    console.log("editing author recieved by service:");
    console.log(author);
    console.log("id recieved by service:");
    console.log(_id);
    return this._http.put(`/authors/${_id}`, author);
  }

  addQuote(newQuote, _id){
    console.log(newQuote);
    console.log(_id);
    return this._http.put(`/newQuote/${_id}`, newQuote);
  }



}
