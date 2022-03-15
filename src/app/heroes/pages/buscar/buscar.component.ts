import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../service/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  public termino:string='';
  public heroes:Heroe[]=[];
  public heroeSeleccionado:Heroe | undefined=undefined;


  constructor(private serv:HeroesService) { }

  ngOnInit(): void {
  }
  
  optSeleccionado(ev:MatAutocompleteSelectedEvent){
    if (!ev.option.value){
      this.heroeSeleccionado=undefined;
      return;
    }
      const heroe:Heroe=ev.option.value;
      this.termino=heroe.superhero;
    
      this.serv.buscarPorId(heroe.id!).subscribe(
        {
          next:(heroe)=>{
            this.heroeSeleccionado=heroe;
          },
          error:()=>{
            this.heroeSeleccionado=undefined;
          }
        }
      )
    
 
  }

  buscar(){
    this.serv.buscarSugerencias(this.termino).subscribe(
      {
        next:(resp)=>{
          this.heroes=resp;
        },
        error:()=>{
          this.heroes=[];
        }
      }
    )
  }

}
