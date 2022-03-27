import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(private enrutador:Router,
              private servicioAutotizacion:AuthService) { }


  login(){
    this.servicioAutotizacion.logea()
    .subscribe({
      next:(h)=>{
        if(h){
          this.enrutador.navigate(['./heroes/listado']);
        }
      },
        error:(r)=>{
          //console.warn(r);
        }
    })

  }


  sinLogin(){
    this.servicioAutotizacion.setter_usuarioData(undefined);
    this.enrutador.navigate(['./heroes/listado']);
    
  }


}
