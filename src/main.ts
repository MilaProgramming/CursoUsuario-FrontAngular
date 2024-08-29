import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './app/services/auth.interceptor';
import { KeycloakService } from './app/services/keycloack.service';
import { routes } from './app/app.routes'; // Update path as necessary

bootstrapApplication(AppComponent, {
  providers: [
    HttpClientModule,
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    KeycloakService
  ]
}).catch((err) => console.error('Bootstrap error:', err));
