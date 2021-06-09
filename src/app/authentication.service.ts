import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  randomId: any;
  private loggedInUserSubject: ReplaySubject<User> = new ReplaySubject<User>(1);
  public loggedInUser$: Observable<User>= this.loggedInUserSubject.asObservable();

  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('token') || '{}'));
  public currentUser$: Observable<User>= this.currentUserSubject.asObservable();
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean>= this.loggedInSubject.asObservable();
  private _isLoggedIn = false;
  


  constructor(
    private http: HttpClient
  ) {
    
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser$ = this.currentUserSubject.asObservable();
    // this.isLoggedIn$  = this.loggedInSubject.asObservable();
    this.checkSession().subscribe(data => {
      
    })
    
  }

  checkSession() {
    return this.http.get<any>(`${environment.apiUrl}/v1/user/me`)
      .pipe(
        map((user: any) => {
          this.loggedInUserSubject.next(user.data);
          return user.data;
        })
      )
  }

  login(username: string, password: string): Observable<any> {
    const payload = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');
    
    return this.http.post<any>(`${environment.apiUrl}/v1/oauth/token`, payload)
        .pipe(
          mergeMap(
            (token: any) => {
              console.log(token);
              
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('token', JSON.stringify(token));
              this.currentUserSubject.next(token);
              return this.checkSession();
        }));
  }

  resetPassword(email: string) {
    return this.http.get<any>(`${environment.apiUrl}/v1/user/reset?username=${email}`) 
  }

  updatePassword(token: string, new_password: string) {
    return this.http.post<any>(`${environment.apiUrl}/v1/user/reset`, {
      token: token,
      new_password: new_password
    }) 
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next({});
  }
}