import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { CanActivate } from "@angular/router/src/utils/preactivation";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  canActivate(): boolean {
    if (this.auth.estaAutenticado()) {
      return true;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
    return;
  }
}
