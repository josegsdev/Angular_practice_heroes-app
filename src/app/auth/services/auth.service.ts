import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Autorizador } from '../interfaces/auth.interface';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuarioData:Autorizador | undefined;

  get getUsuarioData():Autorizador{
    return {...this._usuarioData!}
  }

  setter_usuarioData(d:Autorizador | undefined){
    this._usuarioData=d
  }

  constructor(private httpReq:HttpClient) { }


  verificaExistenciaID():Observable<boolean>{
    if(!localStorage.getItem('usuarioId')){return of(false)}
    return this.httpReq.get<Autorizador>(`${environment.baseApiUrl}/usuarios/${1}`)
    .pipe(
      tap((autorizador)=>{this._usuarioData=autorizador}),
      map((autorizador)=>{
        if(autorizador.id){return true}
        return false;
      })
    )
  }




  logea(){
   return this.httpReq.get<Autorizador>(`${environment.baseApiUrl}/usuarios/${1}`)
   .pipe(
     tap((usuarioData)=>{this._usuarioData=usuarioData;}),
     tap((usuarioData)=>{localStorage.setItem('usuarioId',usuarioData.id)})
   )
  }


}
