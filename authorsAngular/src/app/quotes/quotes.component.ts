import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  quotes = []
  author: any;
  _id: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this._id = params['_id'];
      this.getAuthorFromService();
    })
  }

  getAuthorFromService(){
    let observable = this._httpService.getAuthorById(this._id);
    observable.subscribe(data => {
      this.author = data;
      console.log(this.author.quotes);
    })
  }

  onQuoteUpvote(id, _id, votes){
    votes = votes + 1;
    console.log(votes);
  }

  // onQuoteDelete(id, _id){
  //   let observable = this._httpService.deleteQuote(id, _id);
  //   observable.subscribe(data => {
  //     console.log("removing quote", data)
  //   })
  // }

}
