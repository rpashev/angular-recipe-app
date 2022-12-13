import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAuthored, getEmail } from 'src/app/+store/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  email$ = this.store.select(getAuthored);
  constructor(private store: Store) {}
}
