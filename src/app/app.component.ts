import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

/**
 * The root component of the application.
 *
 * @class
 * @export
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /** The title of the application. */
  title = 'login_signup';

  /**
   * Constructs a new AppComponent.
   *
   * @constructor
   * @param {AuthService} authservice - The authentication service.
   * @param {Router} router - The router service.
   */
  constructor(private authservice: AuthService, private router: Router) {
  }

  /**
   * Logs out the user.
   *
   * @method
   * @returns {void}
   */
  logOut() {
    this.authservice.logOut();
  }

  /**
   * Validates and navigates to the secrets page if the user is logged in.
   *
   * @method
   * @returns {void}
   */
  secretValidation() {
    if (this.authservice.isloggedin()) {
      console.log(this.authservice.isloggedin());
      this.router.navigate(['secrets']);
    }
  }
}
