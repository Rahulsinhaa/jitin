import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import * as bcrypt from 'bcryptjs'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,
              private router: Router) {
      sessionStorage.clear();
  }


  result: any;

  loginform = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });



  async proceedlogin() {
    if (this.loginform.valid) {
      this.service.GetUserbyCode(this.loginform.value.id).subscribe(async item => {
        this.result = item;
        console.log("Result", this.result);

        if (this.result && this.result.password) {
          const passwordMatch = await bcrypt.compare(<string>this.loginform.value.password,this.result.password);
          console.log(passwordMatch)
          // Use bcrypt.compareSync for synchronous comparison
          if (passwordMatch) {
            sessionStorage.setItem('username',this.result.id);
            console.log('Sessionid:',sessionStorage.getItem("username"));
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
