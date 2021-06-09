import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, never, NEVER } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { AuthenticationService } from 'app/services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private token: any;
  private freshchatToken: any = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJsY"
  +"1pWMF82VTNza2RKU19GOV9qdGNMNXotNlZPc05EaGNuZ1lLNHFHaVJvIn0.eyJqdGkiOiIxZjEyMTY2Yy0x"
  +"MGU0LTRkODctODQ2Mi0xMTA0Njk1ZjljNGIiLCJleHAiOjE5MzgzMjcwMjksIm5iZiI6MCwiaWF0IjoxNjI"
  +"yOTY3MDI5LCJpc3MiOiJodHRwOi8vaW50ZXJuYWwtZmMtYXBzMS0wMC1hbGIta2V5Y2xvYWstMjAzODM0MDk"
  +"xMS5hcC1zb3V0aC0xLmVsYi5hbWF6b25hd3MuY29tL2F1dGgvcmVhbG1zL3Byb2R1Y3Rpb24iLCJhdWQiOiI"
  +"zNjUzZjlmNy1lOTcyLTQ0NjctODBkNy1hN2E0Njk3NzY2NDIiLCJzdWIiOiJlODIwYmFhMS1lM2I2LTQyZGQ"
  +"tOGZlNy0yZjRkMmYzZmM2NWYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiIzNjUzZjlmNy1lOTcyLTQ0NjctODB"
  +"kNy1hN2E0Njk3NzY2NDIiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiI2NWVmMGQ3Ny0xY2I5LTQ2"
  +"MWYtOGM3Ni00NjliN2M3NzMyMDciLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZ"
  +"XNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2"
  +"FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGl"
  +"ua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im1lc3NhZ2U6Z2V0IGFnZW50OnVwZGF0ZSBkYXNoYm9h"
  +"cmQ6cmVhZCBhZ2VudDpyZWFkIG1lc3NhZ2U6Y3JlYXRlIGFnZW50OmRlbGV0ZSBtZXNzYWdpbmctY2hhbm5lbH"
  +"M6bWVzc2FnZTpzZW5kIHJlcG9ydHM6cmVhZCBjb252ZXJzYXRpb246dXBkYXRlIGltYWdlOnVwbG9hZCByZXBv"
  +"cnRzOmV4dHJhY3QgdXNlcjp1cGRhdGUgYWdlbnQ6Y3JlYXRlIHJlcG9ydHM6ZXh0cmFjdDpyZWFkIHVzZXI6cm"
  +"VhZCBmaWx0ZXJpbmJveDpyZWFkIG91dGJvdW5kbWVzc2FnZTpnZXQgbWVzc2FnaW5nLWNoYW5uZWxzOnRlbXBs"
  +"YXRlOmdldCByb2xlOnJlYWQgcmVwb3J0czpmZXRjaCBtZXNzYWdpbmctY2hhbm5lbHM6bWVzc2FnZTpnZXQgbW"
  +"Vzc2FnaW5nLWNoYW5uZWxzOnRlbXBsYXRlOmNyZWF0ZSBmaWx0ZXJpbmJveDpjb3VudDpyZWFkIGNvbnZlcnNh"
  +"dGlvbjpyZWFkIHVzZXI6ZGVsZXRlIGNvbnZlcnNhdGlvbjpjcmVhdGUgb3V0Ym91bmRtZXNzYWdlOnNlbmQgYml"
  +"sbGluZzp1cGRhdGUgdXNlcjpjcmVhdGUiLCJjbGllbnRJZCI6IjM2NTNmOWY3LWU5NzItNDQ2Ny04MGQ3LWE3YT"
  +"Q2OTc3NjY0MiIsImNsaWVudEhvc3QiOiIxMC42OC45LjEwNyIsImNsaWVudEFkZHJlc3MiOiIxMC42OC45LjEwN"
  +"yJ9.Knu4Vq_04pFA4Sf-Ooy-dGDetITVQS_8lu0QhFj2-FxPqgmaS3Zx1C5TfSMwiKheRr9FfBV6JUWTOI8D-RK"
  +"0xXecZW_uv3ZbbE6POSlb5JsLzBedhn2JLqoLr6xHOf4L6_cwp-zA8gO884hmYT4hZXtwikxzzrHyzlflrpNWSW8"
  +"LeVzfhTAZQhsPmi1Seh81BYaH_KgN3zyCi8H7rqIOoeWMRwypfzw2H4Rpm-S8Zp9xsdNVAk2volmHjF09cYGcP3e"
  +"hJEm8j0FqDI124JQY4oJu7faGZjRFl4ns0kbAn9i9IqhWBfBZAqYX0LJ4JsIs3L80IUUdQIkTlS8pl7XHxA";
  constructor(
    public router: Router
  ) {
    const obj = localStorage.getItem('token');
    if(obj){
      this.token = JSON.parse(obj);
    }
    
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const obj = localStorage.getItem('token');
    if(obj){
      this.token = JSON.parse(obj);
    }
    const exceptions = ['/apis/v1/user', '/apis/v1/user/reset', '/apis/v1/oauth/token']
    const url = request.url.split('?')[0];
    if (url === '/apis/v1/oauth/token') {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${btoa(environment.auth.client+':'+environment.auth.secret)}`
        }
      }); 
    } else if(url.startsWith('/freshchatapis')){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.freshchatToken}`
        }
      });
    } else if (!exceptions.includes(url) && this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.token.token_type} ${this.token.access_token}`
        }
      });
    } else if (!exceptions.includes(url) && !this.token) {
      return NEVER
    }
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('this is client side error');
          errorMsg = `Error: ${error.error.message}`;
        }
        else {
          console.log('this is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        if (error.status === 401) {
          sessionStorage.clear();
          this.router.navigate(['pages/auth/login'])
        }
        return throwError(errorMsg);
      })
    );
  }
}