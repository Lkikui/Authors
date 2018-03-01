import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newAuthor: any;
  authors = [];
  err = "";
  
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}
  
  ngOnInit(){
    this.newAuthor = {name: "", quotes: {quote: "", votes: ""} };
  }
  
  onSubmit(){
    let observable = this._httpService.addAuthor(this.newAuthor);
    console.log("submitting through component");
    observable.subscribe(response => {
      if (response == "Author validation failed: name: Author name required") {
        this.err = "Author name must have at least 3 characters";
        this.refresh();
      } else if (response == "Author validation failed: name: Author name must have at least 3 characters") {
        this.err = "Author name must have at least 3 characters";
        this.refresh();
      } else {
        console.log(response);
        this.newAuthor = response;
        this.goHome();
      }
    })
  }

  goHome() {
    this._router.navigate(['/home']);
  }

  refresh() {
    this._router.navigate(['/new']);
  }

}
