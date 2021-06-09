import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
    loginForm: any;
 
  constructor(
    private _formBuilder: FormBuilder, 
    private router: Router, 
    private _route: ActivatedRoute,
    private _auth: AuthenticationService,
    private _notification: NotificationService
    ) { }

  ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    onSubmit () {
        this._auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
            (data) => {
                this._route.queryParams.pipe(take(1)).subscribe(params=>{
                    if (params && params.redirect_path) {
                        this.router.navigate([params.redirect_path])
                    }  else {
                        this.router.navigate(["dashboard"])
                    }
                })
            },
            (error) => {
                this._notification.error('Invalid username and password Please try again');
            }
        )
    }

}
