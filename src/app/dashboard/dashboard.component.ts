import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  patients: Array<any> = [];

  constructor(private service: AppService, private notification: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.service.getRelatedPatients().subscribe(
      (patients: any) => {
        console.log(patients);
        
        this.patients = patients.data.patients
      },
      (error: any) => this.notification.error(error)
    )
  }

  selectPatient(patientId: number){
    this.router.navigate(['sprybuddy','patients', patientId]);
  }

}
