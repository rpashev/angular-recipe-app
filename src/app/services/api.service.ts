import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { login } from '../+store/actions';
import { environment } from '../../environments/environment';
import { ILoginUserData, ISignUpUserData } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = environment.baseURL;

  constructor(private http: HttpClient, private store: Store) {}

  register(data: ISignUpUserData) {
    const url = this.baseUrl + 'users/register';
    return this.http.post<any>(url, data).pipe(
      tap((response) => {
        this.store.dispatch(login({ userData: response }));
      })
    );
  }

  login(data: ILoginUserData) {
    const url = this.baseUrl + 'users/login';
    return this.http.post<any>(url, data).pipe(
      tap((response) => {
        this.store.dispatch(login({ userData: response }));
      })
    );
  }
}
