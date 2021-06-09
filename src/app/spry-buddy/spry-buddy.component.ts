import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxFreshChatService } from 'ngx-freshchat';
import { AppService } from '../app.service';
import { AuthenticationService } from '../authentication.service';
import { NgxFreshBotService } from '../ngx-fresh-bot.service';
import { switchMap, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-spry-buddy',
  templateUrl: './spry-buddy.component.html',
  styleUrls: ['./spry-buddy.component.scss']
})
export class SpryBuddyComponent implements OnInit {

  constructor(
    private chat: NgxFreshChatService,
    private bot: NgxFreshBotService,
    private service: AppService,
    private authService: AuthenticationService,
    private route: ActivatedRoute) { }

/*   ngOnInit(){
    this.chat.init({
      token: "2a67bace-6de3-4cd7-87a7-2761ec9adf1e",
      host: "https://wchat.in.freshchat.com",
      firstName: 'Ashish',
      lastName: 'Sandey',
      email: 'ashishsandey5@gmail.com',
      externalId: '1',
      restoreId: '5e3ea060-eee2-4fdd-8253-99cc9d67e2bf'
    }).pipe(
      switchMap(()=>this.chat.onUserCreate())
    ).subscribe(
      (user) => {
        console.log('Freshchat Started');
        console.log(user);
      }
    )
  } */


  token: any
  clinicId: any
  patient: any;
  doctorId: any;
  access_token: any
  spryBuddyAccount: any;

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const patientId = routeParams.get('patientId');
    this.authService.currentUser$.pipe(
      switchMap((token:any) => {
        this.token = token;
        this.access_token = token.access_token;
        return this.service.getPatientDetails(patientId);
      }),
      tap((patient: any) => this.patient=patient.data)
    ).pipe(
      switchMap(() => {
        const req = this.service.getSpryBuddyAccount(this.token.userId)
        
        return req.pipe(
          switchMap((res: any) => {

            if(res.code === 2000){
              console.log('account already exist');
              
              return req;
            } else if(res.code === 2701) {
              console.log('create new account');
              
              return this.service.createSpryBuddyAccount(this.token.userId, this.patient);
            } else {
              return throwError('Some unknown Error')
            }
          })
        )
      }),
      tap(
        (spryBuddyAccount: any) => this.spryBuddyAccount=spryBuddyAccount.data)
    )
    .subscribe(
      () => {
        console.log(this.patient);
        console.log(this.spryBuddyAccount);
        
        this.bot.init({
          //name: this.patient.name,
          externalId: this.token.userId,
          //email: 'ashishsandey5@gmail.com',
          //phone: '9893355357',
          restoreId: this.spryBuddyAccount? this.spryBuddyAccount.spry_buddy_id:null,
          customFunctions: {
            getBackedBaseUrl: this.getBackedBaseUrl,
            getAccessToken: this.getAccessToken,
            getPatientId: this.getPatientId,
            getDoctorId: this.getDoctorId,
            getClinicId: this.getClinicId
          }
        })
          .pipe().subscribe(
            (user: any) => {
              console.log('Freshchat Started');
              console.log(user);
              
            }
          )
      }

    )
  }

  getBackedBaseUrl = () => {
    return {
      a: 'http://15.206.230.180'
    }
  }

  getAccessToken = () => {
    return {
      a: `Bearer ${this.access_token}`
    }
  }

  getPatientId = () => {
    return {
      a: this.patient.patient_id
    }
  }

  getDoctorId = () => {
    return {
      a: this.doctorId
    }
  }

  getClinicId = () => {
    return {
      a: this.clinicId
    }
  }

}


