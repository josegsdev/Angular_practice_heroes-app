import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../service/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {
  public heroe!:Heroe;
  constructor(private serv:HeroesService,
              private rutaActiva:ActivatedRoute,
              private router:Router
              ) { }



  ngOnInit(): void {

    this.rutaActiva.params
      .pipe(switchMap(({id})=> this.serv.buscarPorId(id)))
      .subscribe({
        next:(hresp)=>{
          this.heroe=hresp;
        },
        error:()=>{
        
        }
      });

  /*let ide:string='';
    this.rutaActiva.params.subscribe(({ id })=> {ide = id});
    this.serv.buscarPorId(ide).subscribe(
      {
        next:(resp)=>{
          this.heroe=resp;
          console.log(resp)
        },
        error:(err)=>{
          this.heroe=null;
        }
      }
    )*/

  }


  regresar(){
    this.router.navigate(['/heroes/listado'])
  }


}
