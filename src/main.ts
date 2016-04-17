import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HeroService} from './app/hero/hero.service';
import {AppComponent} from './app/app.component';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  HeroService
]);

