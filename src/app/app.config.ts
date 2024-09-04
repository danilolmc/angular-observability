import { ApplicationConfig } from '@angular/core';
import { } from '@grafana/faro-web-tracing';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideApiEndpoint, provideObservability } from './providers/global';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideApiEndpoint(),
    ...provideObservability(),
  ]
};
