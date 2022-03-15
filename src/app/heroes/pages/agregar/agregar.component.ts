import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  public publicador=[
    {
      id:'DC Comics',
      desc:'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc:'Marvel - Comics'
    }
  ];

  public heroe:Heroe={
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher: Publisher.DCComics,
    superhero:'',
    alt_img:''
  }

  constructor(private rutaActiva:ActivatedRoute) { }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe({
      next:({id})=>{
        console.log(id)
      }
    })
  }

}
