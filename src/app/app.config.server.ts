import { provideServerRendering } from '@angular/platform-server';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.config';

export const config = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideServerRendering()
  ]
};
