import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes-home',
  templateUrl: './heroes-home.component.html',
  styles: [`
  .contenedor{margin:20px}
  `
  ]
})
export class HeroesHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
