import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import * as nodemailer from 'nodemailer';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router: Router) {}

  initiatePasswordReset(email: string): Observable<any> {
    // Replace this with your actual email sending logic using nodemailer (for Mailtrap simulation)
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: 'b02ea6829dde16',
        pass: '4d1a795ca04a5d',
      },
    });

    const mailOptions = {
      from: 'jitin2430@gmail.com', // Replace with your sender email
      to: email,
      subject: 'Password Reset',
      text: 'You requested a password reset.',
      html: '<strong>You requested a password reset.</strong>',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        throw error; // Throw the error to help identify the issue
      } else {
        console.log('Email sent:', info.response);
      }
    });

    // Simulate the API response (you would typically get this from the server)
    return this.http.post(`${this.apiUrl}/password-reset`, { email });
  }


  isloggedin(){

    return sessionStorage.getItem('username')!=null;
  }



  apiUrl='http://localhost:3000';
  userApiUrl = this.apiUrl+'user';
  secretUrl = 'http://localhost:3000/mySecrets'










    logOut(){
    console.log("before log out",sessionStorage.getItem("username"))
    sessionStorage.clear();
    console.log("after log out",sessionStorage.getItem("username"))
    this.router.navigate([''])
  }

  RegisterUser(inputdata:any){
    return this.http.post(this.userApiUrl,inputdata)
  }

  GetUserbyCode(id:any){
    return this.http.get(this.userApiUrl+'/'+id);
  }

  getSecretsByCode(id:any){
    return this.http.get(this.secretUrl+'/'+id);
  }


  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.userApiUrl}?email=${email}`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.userApiUrl}/${user.id}`, user);
  }


  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/resetTokens`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/resetPassword`, { token, newPassword });
  }

}
