import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { autoLogin } from './+store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-recipe-app';

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(autoLogin());
  }
}
