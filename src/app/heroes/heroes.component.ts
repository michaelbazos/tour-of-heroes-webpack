import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {HeroService} from '../hero/hero.service';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';
import {Hero} from '../hero/hero.model';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes/heroes.component.html',
  styleUrls: ['app/heroes/heroes.component.css'],
  directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private _heroService: HeroService, private _router: Router) { }

  getHeroes() {
    this._heroService.getHeroes()
      .then(heroes => this.heroes = heroes);
  }

  gotoDetail() {
    this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }
}
