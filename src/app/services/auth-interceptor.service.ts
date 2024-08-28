import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, from, catchError, throwError } from 'rxjs';
import { KeycloackService } from './keycloack.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private keycloackService: KeycloackService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return from(this.keycloackService.getToken()).pipe(
      switchMap(token => {
        let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        if (request.headers.has('Content-Type')) {
          headers = headers.set('Content-Type', request.headers.get('Content-Type') || '');
        }
        const authReq = request.clone({ headers });

        return next.handle(authReq).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 403) {
              // Redirect to unauthorized page or handle it as needed
              this.router.navigate(['/unauthorized']);
            }
            return throwError(() => error);
          })
        );
      }),
      catchError((error) => {
        // Handle any errors that occur while getting the token
        return throwError(() => error);
      })
    );
  }
}
