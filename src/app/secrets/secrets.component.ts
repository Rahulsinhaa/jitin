import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-secrets',
  templateUrl: './secrets.component.html',
  styleUrls: ['./secrets.component.css']
})
export class SecretsComponent implements OnInit{
  data:any;
  secrets:any;
  constructor(private authService:AuthService ) {
  }

  ngOnInit(): void {
    this.getSecrets()
  }

  getSecrets(){
    this.authService.getSecretsByCode(sessionStorage.getItem("username")).subscribe((data)=>{
      this.data = data;
      console.log(data)
      this.secrets = this.data.secret;
      console.log("secret ka secret",this.secrets.secret);

    })
  }



}
