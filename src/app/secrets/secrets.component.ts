import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-secrets',
  templateUrl: './secrets.component.html',
  styleUrls: ['./secrets.component.css']
})
export class SecretsComponent implements OnInit {
  data: any;
  secrets: any;
  mydata!: Object;
  fullsecret: any

  constructor(private authService: AuthService, private builder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getSecrets()
  }

  getSecrets() {
    this.authService.getSecretsByCode(sessionStorage.getItem("username")).subscribe((data) => {
      this.data = data;
      this.secrets = this.data.secret;
      console.log('all of my secrets', this.secrets)
    })
  }




  secretForm = this.builder.group({
    secret: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    id: [sessionStorage.getItem('username'), Validators.required]
  });

  async addSecret() {
    console.log(this.secretForm.value)
    if (this.secrets !== null) {
      let newSecret;
      this.authService.getSecretsByCode(sessionStorage.getItem("username")).subscribe((data) => {

        this.data = data;
        this.data.secret.push(this.secretForm.value.secret);
        this.authService.updateuser(sessionStorage.getItem('username'), this.data).subscribe(
          response => {
            console.log('PUT request response:', response);
            this.getSecrets()
          },
          error => {
            console.error('PUT request error:', error);
          }
        )
      })
    } else {
      console.log('rahul')
      this.authService.addsecret(this.secretForm.value).subscribe();
      this.getSecrets()
    }

  }

}
