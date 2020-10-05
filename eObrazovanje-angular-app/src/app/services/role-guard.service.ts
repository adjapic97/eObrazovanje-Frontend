import { TokenStorageService } from './token-storage.service';
import { AuthServiceService } from './auth-service.service';
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  isAdmin: boolean;
  constructor(private tokenStorageService: TokenStorageService, public auth: AuthServiceService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
     this.isAdmin = this.tokenStorageService.getUser().authorities.includes('ROLE_ADMIN');
    const expectedRole = route.data.expectedRole;
    const token = this.tokenStorageService.getToken();
    // decode the token to get its payload
    const tokenPayload = decode(token);
    console.log(this.isAdmin)
    console.log(tokenPayload.role)
    if (
      !this.auth.isAuthenticated() ||
      !this.isAdmin
    ) {
      window.alert("Not authorized to be here!");
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }


}
