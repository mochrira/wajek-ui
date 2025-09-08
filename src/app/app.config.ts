import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providerWui } from '@wajek/wui';

export const appConfig: ApplicationConfig = {
  providers: [
    ...providerWui(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes)]
};
