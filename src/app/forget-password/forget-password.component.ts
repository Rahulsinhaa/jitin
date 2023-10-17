// forget-password.component.ts
import { Component } from '@angular/core';
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";

/**
 * ForgetPasswordComponent handles the functionality for initiating a password reset.
 */
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  /**
   * The email input for initiating a password reset.
   */
  email: string = '';

  /**
   * Constructor for ForgetPasswordComponent.
   * @param authService - The AuthService used for initiating password reset requests.
   * @param router - The Angular Router service for navigation.
   */
  constructor(private authService: AuthService, private router: Router) {}

  // email: string = '';
  // successMessage: string = '';
  // errorMessage: string = '';
  //
  // constructor(private authService: AuthService) {}
  //
  // resetPassword() {
  //   this.authService.getUserByEmail(this.email).subscribe(
  //     (user) => {
  //       if (user) {
  //         // Generate a random password reset token (you can use a library for this)
  //         const resetToken = Math.random().toString(36).slice(-8);
  //
  //         // Update the user with the reset token
  //         user.resetToken = resetToken;
  //         this.authService.updateUser(user).subscribe(
  //           () => {
  //             this.successMessage = 'Password reset link sent to your email.';
  //           },
  //           (error) => {
  //             this.errorMessage = 'Error updating user: ' + error;
  //           }
  //         );
  //       } else {
  //         this.errorMessage = 'User not found with the provided email.';
  //       }
  //     },
  //     (error) => {
  //       this.errorMessage = 'Error fetching user: ' + error;
  //     }
  //   );
  // }

  // email: string = '';
  //
  // constructor(private authService: AuthService) {}
  //
  // onSubmit() {
  //   this.authService.forgotPassword(this.email).subscribe(
  //     (response) => {
  //       console.log('Reset link sent successfully!', response);
  //       // You can handle the response here (e.g., show a success message)
  //     },
  //     (error) => {
  //       console.error('Error sending reset link:', error);
  //       // Handle the error (e.g., show an error message)
  //     }
  //   );
  // }

  /**
   * Initiates a password reset request using the provided email.
   * Navigates to the 'resetPassword' route on successful request.
   */
  requestReset() {
    this.authService.requestPasswordReset(this.email).subscribe(
      (response) => {
        console.log('Reset link sent successfully:', response);
        this.router.navigate(['resetPassword']);
      },
      (error) => {
        console.error('Error sending reset link:', error);
      }
    );
  }
}
