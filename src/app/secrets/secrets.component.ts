// secrets.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../service/auth.service";

/**
 * SecretsComponent handles the functionality for displaying user secrets.
 */
@Component({
  selector: 'app-secrets',
  templateUrl: './secrets.component.html',
  styleUrls: ['./secrets.component.css']
})
export class SecretsComponent implements OnInit {
  /**
   * Variable to store the data retrieved from the service.
   */
  data: any;

  /**
   * Variable to store the user secrets.
   */
  secrets: any;

  /**
   * Constructor for SecretsComponent.
   * @param authService - The AuthService for handling authentication-related tasks.
   */
  constructor(private authService: AuthService) {
  }

  /**
   * Lifecycle hook ngOnInit. Invoked after component initialization.
   * Calls the getSecrets method to retrieve and display user secrets.
   */
  ngOnInit(): void {
    this.getSecrets();
  }

  /**
   * Retrieves user secrets by calling the getSecretsByCode method from the AuthService.
   * Sets the data and secrets variables based on the response.
   */
  getSecrets() {
    this.authService.getSecretsByCode(sessionStorage.getItem("username")).subscribe((data) => {
      this.data = data;
      console.log(data);
      this.secrets = this.data.secret;
      console.log("secret ka secret", this.secrets.secret);
    });
  }
}
