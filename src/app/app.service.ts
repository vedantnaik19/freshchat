import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYXBpI"
    +"l0sImNsaW5pY0lkIjoyLCJ1c2VyX25hbWUiOiJkb2N0b3JAZ21haWwuY29tIiwic2NvcGUiOls"
    +"icmVhZCIsIndyaXRlIl0sImV4cCI6MTYyNDI2NjM5MCwidXNlcklkIjozLCJhdXRob3JpdGllcy"
    +"I6WyJET0NUT1IiXSwianRpIjoiOThkNDEyZTMtMzQwZC00YTM1LWI2MGYtZTY3YTI4ZjViNjYyIi"
    +"wiY2xpZW50X2lkIjoiYW5kcm9pZC1hcHAifQ.igVdXXlz9hrIB9AvHJyt1ZltKlWK_7NF8oIbjuFT2Zg";

  constructor(private http: HttpClient) { }

  getBodyParts(){
    const bodyParts = [
      'Shoulder',
      'Knee',
      'Hip',
      'Ankle'
    ]
  
    return of(bodyParts);
  }
}
