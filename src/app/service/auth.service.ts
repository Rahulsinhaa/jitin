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
  secretUrl = 'http://localhost:3000/mySecrets'



  logOut(){
    console.log("before log out",sessionStorage.getItem("username"))
    sessionStorage.clear();
    console.log("after log out",sessionStorage.getItem("username"))
    this.router.navigate([''])
  }

  RegisterUser(inputdata:any){
    return this.http.post(this.apiurl,inputdata)
  }

  GetUserbyCode(id:any){
    return this.http.get(this.apiurl+'/'+id);
  }

    getSecretsByCode(id:any){
      return this.http.get(this.secretUrl+'/'+id);
    }

  addsecret(secret:any){
    return this.http.post(this.secretUrl,secret)
  }

  updateuser(id:any,inputdata:any){
    console.log('inside api call',inputdata)
    console.log(id)
    return this.http.put(this.secretUrl+'/'+id,inputdata);
  }
}
