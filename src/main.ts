import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router';
import {HeroService} from './app/hero/hero.service';
import {AppComponent} from './app/app.component';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  HeroService
]);

