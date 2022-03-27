import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../service/heroes.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalEliminarComponent } from '../../components/modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles:[]
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

  constructor(private rutaActiva:ActivatedRoute,
              private serv:HeroesService,
              private enrutador:Router,
              private  alerta:MatSnackBar,
              public modalElimina:MatDialog) { }

  ngOnInit(): void {
  if(!this.enrutador.url.includes('editar')){
    return;
  }
        this.rutaActiva.params
    .pipe(
      switchMap(({id})=>{
        return this.serv.buscarPorId(id)
      })
    )
    .subscribe(
      {
        next:(h)=>{this.heroe=h;},
        error:(err)=>{console.log('no hay id para editar')}
      }
    )



  }


  guardar(){
    if(this.heroe.superhero.trim().length === 0){return;}
    console.log(this.heroe.id);

    if(this.heroe.id){
      this.serv.editarHeroe(this.heroe).subscribe(
        {
          next:(h)=>{
            this.levantaAlerta('Editado con exito!','cerrar');
          },
          error:(err)=>{
            console.warn(err);
          }
        }
      )
    }else{
      this.serv.guardarHeroe(this.heroe).subscribe(
        {
          next:(h)=>{
            this.levantaAlerta('Creado con exito!','cerrar',{url:'/heroes/editar',id:h.id});
            
          },
          error:(err)=>{
            console.log(err)
          }
        }
      )
    }
  }

  eliminarHeroe(){

    this.modalElimina.open(ModalEliminarComponent,{
      data:{... this.heroe}
    }).afterClosed().subscribe({
      next:(resp)=>{//pregunto si el this.modalRef.close() devuelve true o false para confirmar la eliminacion
        if(!resp){ return;}
        
        this.serv.eliminarHeroe(this.heroe).subscribe({
            next:()=>{
              this.enrutador.navigate(['/heroes/listado']);
            },
            error:(r)=>{
              console.log(r);
            }
          })
      },
      error:()=>{}
    })


  }

  levantaAlerta(mensaje:string,accion:string,redir?:{url?:string,id?:string}):void{
    this.alerta.open(mensaje,accion,{
      duration:1500
    })
    .afterDismissed()
    .subscribe(()=>{
      if(!redir){return;}
      this.enrutador.navigate([redir.url,redir.id]);
    })
    
  }


}
