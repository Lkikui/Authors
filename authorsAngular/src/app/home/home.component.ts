import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authors = [];

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getAuthorsFromService();
    this._route.params.subscribe((params: Params) => console.log(params['_id']));
  }

  getAuthorsFromService(){
    console.log("hello from home component");
    let observable = this._httpService.getAuthors();
    observable.subscribe(response => {
      let data = response as any;
      this.authors = data;
      console.log(data);
    })
  }

  onDelete(_id){
    console.log(_id);
    let observable = this._httpService.removeAuthor(_id);
    observable.subscribe(data => {
      console.log("removing author from component", data);
    })
  }
}
