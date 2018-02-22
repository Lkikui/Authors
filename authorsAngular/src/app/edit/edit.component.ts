import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  author: any;
  editedAuthor: any;
  _id: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['_id']);
      this._id = params['_id'];
    })
    this.getAuthorFromService();
  }

  getAuthorFromService(){
    let observable = this._httpService.getAuthorById(this._id);
    observable.subscribe(data => {
      this.author = data;
    })
  }

  onEdit(author, _id){
    this.editedAuthor = author;
    let observable = this._httpService.editAuthor(this.editedAuthor, _id);
    observable.subscribe(data => {
      console.log(`Edited data: ${data}`);
    })
    this.goHome();
  }

  goHome() {
    this._router.navigate(['/home']);
  }
}
