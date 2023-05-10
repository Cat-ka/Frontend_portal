import { isNull } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpiration$ = timer(0, 1000).pipe(
    map(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        return tokenPayload.exp * 1000; // prevedie čas expirácie z sekúnd na milisekundy
      }
      return undefined; // vráti undefined, ak token nie je v localStorage
    })
  );



  constructor(private router: Router) {
    this.tokenExpiration$.subscribe(expiration => {
      const now = new Date().getTime();
      if (expiration !== undefined && expiration - now < 60000) { // limit 1 minúta, ak expiration nie je undefined

        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }
    });
  }



  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }

  public getUserRole(): string {
    const token = localStorage.getItem('token');
    if (!token) {
      return '';
    } else {
      const decodedToken = jwtDecode(token) as { role: string };
      return decodedToken.role;
    }
  }

  public checkTokenValidity() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: { exp: number } = jwt_decode(token); // špecifikácia typu pro dekódovaný token
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
      }
    }
  }
}
