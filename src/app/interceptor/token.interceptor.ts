import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Intercepts outgoing HTTP requests and adds the user's token if they are authorized.
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${user.token}`
                }
            });
        }
        return next.handle(request);
    }
    
}