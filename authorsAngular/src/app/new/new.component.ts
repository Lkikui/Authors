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

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.newAuthor = {name: ""}
  }

  onSubmit(){
    let observable = this._httpService.addAuthor(this.newAuthor);
    observable.subscribe(data => {
      console.log(data);
      this.newAuthor = data;
    })
    this.goHome();
  }

  goHome() {
    this._router.navigate(['/home']);
  }

}
