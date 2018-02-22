import { Component, OnInit } from '@angular/core';
// import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // authors = [];

  constructor(/*private _httpService: HttpService*/){}

  ngOnInit(){
    // this.getAuthorsFromService();
  }

  // getAuthorsFromService(){
  //   let observable = this._httpService.getAuthors();
  //   observable.subscribe(data => {
  //     console.log(data);
  //     this.authors = data;
  //   })
  // }
}
