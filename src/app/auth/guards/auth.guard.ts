import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router,Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable,tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {

  constructor(private servAutorizador:AuthService,
              private enrutador:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


      return this.servAutorizador.verificaExistenciaID()
      .pipe(
        tap((existe)=>{
          if(!existe){
            this.enrutador.navigate(['./auth/login'])
          }
        })
      )

      /*if(this.servAutorizador.getUsuarioData.id){
        console.log(this.servAutorizador.getUsuarioData.id);
        return true;
      }
      console.log('Bloqueado por CanActivate');
      return false;
      */
  }

  canLoad(//carga el modulo si pasa la validacion, una vez cargado ya puede ingresar
    route: Route,
    segments: UrlSegment[]): Observable<boolean> |  Promise<boolean> |  boolean {


      return this.servAutorizador.verificaExistenciaID()
      .pipe(
        tap((existe)=>{
          if(!existe){
            this.enrutador.navigate(['./auth/login'])
          }
        })
      )


      /*if(this.servAutorizador.getUsuarioData.id){return true;}
      console.log('Bloqueado por CanLoad');
      return false;*/

  }
}
