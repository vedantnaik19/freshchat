import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorChatComponent } from './doctor-chat/doctor-chat.component';
import { LoginComponent } from './login/login.component';
import { SpryBuddyComponent } from './spry-buddy/spry-buddy.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: 'login', component: LoginComponent},
  {path: 'doctor-chat', component: DoctorChatComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'sprybuddy/patients/:patientId', component: SpryBuddyComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
