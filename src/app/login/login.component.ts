// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";
import * as bcrypt from 'bcryptjs';

/**
 * LoginComponent handles the functionality for user login.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  /**
   * Constructor for LoginComponent.
   * @param builder - The Angular FormBuilder for creating form controls.
   * @param toastr - The ToastrService for displaying toastr notifications.
   * @param service - The AuthService for handling authentication-related tasks.
   * @param router - The Angular Router service for navigation.
   */
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,
              private router: Router) {
    sessionStorage.clear();
  }

  /**
   * Result variable to store the user information retrieved from the service.
   */
  result: any;

  /**
   * FormGroup representing the login form with 'id' and 'password' controls.
   */
  loginform: FormGroup = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  /**
   * Async function to proceed with the login process.
   * If form is valid, retrieves user information and checks password using bcrypt.
   * Navigates to 'secrets' route on successful login.
   */
  async proceedlogin() {
    if (this.loginform.valid) {
      this.service.GetUserbyCode(this.loginform.value.id).subscribe(async item => {
        this.result = item;
        console.log("Result", this.result);

        if (this.result && this.result.password) {
          const passwordMatch = await bcrypt.compare(<string>this.loginform.value.password, this.result.password);
          console.log(passwordMatch);

          if (passwordMatch) {
            sessionStorage.setItem('username', this.result.id);
            console.log('Sessionid:', sessionStorage.getItem("username"));
            this.router.navigate(['secrets']);
            console.log('We are logged in to the safe area');
          } else {
            this.toastr.error('Invalid credentials');
          }
        } else {
          this.toastr.error('Invalid credentials');
        }
      });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
