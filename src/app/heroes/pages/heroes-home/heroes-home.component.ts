import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autorizador } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-heroes-home',
  templateUrl: './heroes-home.component.html',
  styles: [`
  .contenedor{margin:20px}
  `
  ]
})
export class HeroesHomeComponent implements OnInit {


  constructor(private enrutador:Router,
              private autorizadoServ:AuthService) { 
              }
  get loginData(){
    return this.autorizadoServ;
  }

  ngOnInit(): void {
  }

  logout(){
    this.enrutador.navigate(['./auth']);
  }
  
}
