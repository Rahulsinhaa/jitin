// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../service/auth.service";

/**
 * AuthGuard is a route guard service that implements CanActivate interface.
 * It checks if the user is logged in before allowing navigation to a route.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * Constructor for AuthGuard.
   * @param authService - The AuthService used to check if the user is logged in.
   * @param router - The Angular Router service used for navigation.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * canActivate method is called to determine if a route can be activated.
   * @param next - The next ActivatedRouteSnapshot representing the future state of the route.
   * @param state - The current RouterStateSnapshot representing the current state of the router.
   * @returns Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
   *   - If true, navigation to the route is allowed.
   *   - If false, navigation is canceled, and the user is redirected to the login route.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isloggedin()) {
      // User is logged in, allow navigation to the route
      return true;
    } else {
      // User is not logged in, redirect to the login route
      this.router.navigate(['login']);
      return false; // Cancel navigation
    }
  }
}
