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
}
