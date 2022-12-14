import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getisLoggedIn } from '../+store/selectors';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  loggedIn = false;

  constructor(private store: Store, private router: Router) {
    this.store.select(getisLoggedIn).subscribe((val) => {
      console.log(val);
      this.loggedIn = val;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.loggedIn) return true;
    return this.router.createUrlTree(['/']);
  }
}
