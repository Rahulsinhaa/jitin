import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router: Router) {}

  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }



  apiurl='http://localhost:3000/user';



  logOut(){
    sessionStorage.clear();
    this.router.navigate([''])
  }

  RegisterUser(inputdata:any){
    return this.http.post(this.apiurl,inputdata)
  }

  GetUserbyCode(id:any){
    return this.http.get(this.apiurl+'/'+id);
  }

}
