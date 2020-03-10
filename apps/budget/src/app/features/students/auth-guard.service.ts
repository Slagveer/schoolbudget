import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private route: ActivatedRoute, private router: Router) {}

  canActivate(): boolean {
    console.log(this.route.snapshot);
    if (!this.route.snapshot.queryParams) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
