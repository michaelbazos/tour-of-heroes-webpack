import {Component, Input, OnInit} from '@angular/core';
import {RouteParams} from '@angular/router';

import {Hero} from '../hero/hero.model';
import {HeroService} from '../hero/hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail/hero-detail.component.html',
  styleUrls: ['app/hero-detail/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(private _heroService: HeroService,
              private _routeParams: RouteParams) {
  }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._heroService.getHero(id).then(hero => this.hero = hero);
  }

  goBack() {
    window.history.back();
  }
}
