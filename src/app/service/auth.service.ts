// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import * as nodemailer from 'nodemailer';

/**
 * AuthService provides authentication and user-related functionality.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Constructor for AuthService.
   * @param http - The Angular HttpClient for making HTTP requests.
   * @param router - The Angular Router service for navigation.
   */
  constructor(private http: HttpClient, private router: Router) {}

  // initiatePasswordReset(email: string): Observable<any> {
  //   // Replace this with your actual email sending logic using nodemailer (for Mailtrap simulation)
  //   const transporter = nodemailer.createTransport({
  //     host: 'sandbox.smtp.mailtrap.io',
  //     port: 587,
  //     auth: {
  //       user: 'b02ea6829dde16',
  //       pass: '4d1a795ca04a5d',
  //     },
  //   });
  //
  //   const mailOptions = {
  //     from: 'jitin2430@gmail.com', // Replace with your sender email
  //     to: email,
  //     subject: 'Password Reset',
  //     text: 'You requested a password reset.',
  //     html: '<strong>You requested a password reset.</strong>',
  //   };
  //
  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       console.error('Error sending email:', error);
  //       throw error; // Throw the error to help identify the issue
  //     } else {
  //       console.log('Email sent:', info.response);
  //     }
  //   });
  //
  //   // Simulate the API response (you would typically get this from the server)
  //   return this.http.post(`${this.apiUrl}/password-reset`, { email });
  // }



  /**
   * Checks if a user is logged in based on the presence of a username in the session storage.
   * @returns True if a user is logged in, false otherwise.
   */
  isloggedin(): boolean {
    return sessionStorage.getItem('username') !== null;
  }

  /**
   * API base URL.
   */
  apiUrl = 'http://localhost:3000';

  /**
   * User API URL.
   */
  userApiUrl = this.apiUrl + 'user';

  /**
   * Secret API URL.
   */
  secretUrl = 'http://localhost:3000/mySecrets';

  /**
   * Logs out the current user by clearing the session storage and navigating to the home route.
   */
  logOut(): void {
    console.log("before log out", sessionStorage.getItem("username"));
    sessionStorage.clear();
    console.log("after log out", sessionStorage.getItem("username"));
    this.router.navigate(['']);
  }

  /**
   * Registers a new user by sending a POST request to the user API.
   * @param inputdata - The data of the user to be registered.
   * @returns An observable of the HTTP response.
   */
  RegisterUser(inputdata: any): Observable<any> {
    return this.http.post(this.userApiUrl, inputdata);
  }

  /**
   * Retrieves user information by user ID.
   * @param id - The ID of the user to be retrieved.
   * @returns An observable of the HTTP response.
   */
  GetUserbyCode(id: any): Observable<any> {
    return this.http.get(`${this.userApiUrl}/${id}`);
  }

  /**
   * Retrieves user secrets by user ID.
   * @param id - The ID of the user whose secrets are to be retrieved.
   * @returns An observable of the HTTP response.
   */
  getSecretsByCode(id: any): Observable<any> {
    return this.http.get(`${this.secretUrl}/${id}`);
  }

  /**
   * Retrieves user information by email.
   * @param email - The email of the user to be retrieved.
   * @returns An observable of the HTTP response.
   */
  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.userApiUrl}?email=${email}`);
  }

  /**
   * Updates user information.
   * @param user - The updated user information.
   * @returns An observable of the HTTP response.
   */
  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.userApiUrl}/${user.id}`, user);
  }

  /**
   * Initiates a password reset request by sending a POST request to the resetTokens API.
   * @param email - The email of the user requesting a password reset.
   * @returns An observable of the HTTP response.
   */
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/resetTokens`, { email });
  }

  /**
   * Resets a user's password by sending a POST request to the resetPassword API.
   * @param token - The reset token received by the user.
   * @param newPassword - The new password to be set.
   * @returns An observable of the HTTP response.
   */
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/resetPassword`, { token, newPassword });
  }
}
