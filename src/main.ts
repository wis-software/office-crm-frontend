import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments';
import { AppModule } from './app/app.module';

/**
 * Bootstrap our Angular app with a top level NgModule
 */
export function main() {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(environment.decorateModuleRef)
    .catch((err) => console.error(err));
}


/**
 * Needed for hmr
 * in prod this is replace for document ready
 */
switch (document.readyState) {
  case 'loading':
    document.addEventListener('DOMContentLoaded', _domReadyHandler, false);
    break;
  case 'interactive':
  case 'complete':
  default:
    main();
}

function _domReadyHandler() {
  document.removeEventListener('DOMContentLoaded', _domReadyHandler, false);
  main();
}
