import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  author: any;
  newQuote: any;
  _id: any;
  quotes = [];

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this._id = params['_id'];
      this.getAuthorFromService();
    })
    this.newQuote = {quote: "", votes: 0};
  }

  getAuthorFromService(){
    let observable = this._httpService.getAuthorById(this._id);
    observable.subscribe(data => {
      this.author = data;
    })
  }

  onSubmitQuote(author, _id){
    let observable = this._httpService.addQuote(this.newQuote, _id);
    observable.subscribe(data => {
      console.log(data);
      this.newQuote = data;
      this.quotes.push(this.newQuote);
      this.goBack();
    })
  }

  

  goBack() {
    this._router.navigate([`/quotes/${this._id}`]);
  }

}
