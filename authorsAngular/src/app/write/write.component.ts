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
  err = "";

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
    console.log("submitting through component");
    observable.subscribe(response => {
      console.log(response);
      
      // this.newQuote = response;
      // this.quotes.push(this.newQuote);
      // this.goBack();
      // if (response == "Author validation failed: name: Author name required") {
      //   this.err = "Author name must have at least 3 characters";
      //   this.refresh();
      // } else if (response == "Author validation failed: name: Author name must have at least 3 characters") {
      //   this.err = "Author name must have at least 3 characters";
      //   this.refresh();
      // } else {
      //   console.log(response);
      //   this.newAuthor = response;
      //   this.goHome();
      // }
    })
  }

  goBack() {
    this._router.navigate([`/quotes/${this._id}`]);
  }

  refresh() {
    this._router.navigate([`/write/${this._id}`]);
  }

}
