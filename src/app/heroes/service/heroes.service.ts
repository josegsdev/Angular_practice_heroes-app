import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url='/heroes'

  constructor(private http:HttpClient) { }

  buscar():Observable<Heroe[]>{
    return this.http.get<Heroe[]>(environment.baseApiUrl + this.url);
  }

  buscarPorId(str:string):Observable<Heroe>{
    return this.http.get<Heroe>(`${environment.baseApiUrl + this.url}/${str}`);
  }

  buscarSugerencias(str:string):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${environment.baseApiUrl + this.url}?q=${str}&_limit=6`);
  }

  guardarHeroe(h:Heroe):Observable<Heroe>{
    return this.http.post<Heroe>(environment.baseApiUrl + this.url,h);
  }

  editarHeroe(h:Heroe):Observable<Heroe>{
    return this.http.put<Heroe>((environment.baseApiUrl + this.url + '/' + h.id) ,h);
  }

  eliminarHeroe(h:Heroe):Observable<any>{
    return this.http.delete<any>((environment.baseApiUrl + this.url + '/' + h.id));
  }


}
