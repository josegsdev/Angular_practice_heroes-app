import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../service/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {

  private heroes:Heroe[]=[];

  get heroesdata():Heroe[]{
    return [...this.heroes];
  }
  constructor(private hs:HeroesService) { }

  ngOnInit(): void {
    this.hs.buscar().subscribe({
      next:(resp)=>{
        this.heroes=resp;
      },
      error:()=>{
        this.heroes=[];
      }
    })


  }

}
