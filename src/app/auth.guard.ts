import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { map, tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(public auth: AuthenticationService, public router: Router, private notification: NotificationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.auth.getToken();
      if(token){
        return of(true);
      } else {
        this.notification.error('Session expired. Please login again.')
        this.router.navigate(['login']);
        return of(false);
      }
      
    }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      
      /*
      return this.auth.isLoggedIn$.pipe(
        tap((loggedIn: boolean) => {
          if (!loggedIn) {
            this.router.navigate(['pages/auth/login'])
          }
        })
      );
      */
      /*
     return this.auth.checkSession().pipe(
        map((user: any) => {
          return user ? true : false;
        })
      );*/

      return new Promise((resolve, reject) => {
        /*
        return this.auth.checkSession().subscribe((user: any) => {
          if (user) {
            resolve(true);
          } else {
            resolve(false);
          }
        })*/
        return this.auth.currentUser$.subscribe((user: any) =>{
          if (user && user.access_token) {
            resolve(true);  
          } else {
            this.router.navigate(['pages/auth/login'])
            resolve(false);
          }
        });
      })
    }
}
