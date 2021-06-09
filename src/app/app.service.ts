import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

  getRelatedPatients(){

    return this.http.get('/apis/v1/patient?activeFilter=false');
  }

  getPatientDetails(patientId: any){
    return this.http.get(`/apis/v1/patient/${patientId}`);
  }

  getSpryBuddyAccount(userId: any){
    return this.http.get(`/apis/v1/sprybuddy/accounts?user_id=${userId}`);
  }

  createSpryBuddyAccount(userId:any, patient:any){
    const createUserRequest = {
      reference_id: userId,
      email: patient.email_address,
      avatar: {},
      phone: patient.mobile,
      properties: [],
      first_name: patient.name,
      last_name: ''
      }
    
    return this.http.post('/freshchatapis/v2/users', createUserRequest)
    .pipe(
      switchMap((createdUser: any) => {
        console.log(createdUser);
        
        const addUserInfoRequest = {
          user_id: userId,
          spry_buddy_id: createdUser.id,
          restore_id: null
        }
        return this.http.post('/apis/v1/sprybuddy/accounts', addUserInfoRequest);
      })
    )
    
  }
}
