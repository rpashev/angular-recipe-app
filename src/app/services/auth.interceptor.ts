import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getToken } from '../+store/selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token!: string | null;
  constructor(private store: Store) {
    this.store.select(getToken).subscribe((val) => {
      console.log(val);
      this.token = val;
    });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(this.token);
    if (this.token) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.token}`),
      });
      return next.handle(authRequest);
    }

    return next.handle(request);
  }
}
