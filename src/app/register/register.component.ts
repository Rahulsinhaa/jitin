// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import * as bcrypt from 'bcryptjs';

/**
 * RegisterComponent handles the functionality for user registration.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  /**
   * Constructor for RegisterComponent.
   * @param builder - The Angular FormBuilder for creating form controls.
   * @param service - The AuthService for handling authentication-related tasks.
   * @param router - The Angular Router service for navigation.
   * @param toastr - The ToastrService for displaying toastr notifications.
   */
  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
              private toastr: ToastrService) {
  }

  /**
   * FormGroup representing the registration form with various controls.
   */
  registerform: FormGroup = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isactive: this.builder.control(false)
  });

  /**
   * Hashes a plain text password using bcrypt.
   * @param plainTextPassword - The plain text password to be hashed.
   * @returns A Promise that resolves to the hashed password.
   */
  async hashPassword(plainTextPassword: string): Promise<string> {
    const saltRounds = 10; // You can adjust this value as needed
    return await bcrypt.hash(plainTextPassword, saltRounds);
  }

  /**
   * Async function to proceed with the registration process.
   * If form is valid, hashes the password and sends the form data to RegisterUser service.
   * Navigates to 'login' route on successful registration.
   */
  async proceedregister() {
    if (this.registerform?.valid) { // Use optional chaining here

      // Safely access the password form control
      const passwordControl = this.registerform?.get('password');
      if (passwordControl) {
        const plainTextPassword = passwordControl.value;

        if (plainTextPassword) { // Check if plainTextPassword is not null
          // Hash the password
          const hashedPassword = await this.hashPassword(plainTextPassword);

          // Update the form with the hashed password
          passwordControl.setValue(hashedPassword);
        } else {
          this.toastr.warning('Password field is empty.');
          return;
        }
      } else {
        this.toastr.warning('Password field not found.');
        return;
      }

      // Send the form data, including the hashed password, to the RegisterUser service
      this.service.RegisterUser(this.registerform.value).subscribe(result => {
        this.toastr.success('Please contact admin for enable access.', 'Registered successfully');
        this.router.navigate(['login']);
      });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
