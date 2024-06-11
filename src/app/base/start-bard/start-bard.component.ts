import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-start-bard',
  templateUrl: './start-bard.component.html',
  styleUrls: ['./start-bard.component.scss']
})
export class StartBardComponent {

  abrir = false;
  usuario:any;
  faUser=faUser;
  abrirAdmin = false;

  constructor(private router: Router) { }

  validaToken(): boolean{
    this.getUsuario();
    //return localStorage.getItem('token-gpatic') !== null;
    return true;
  }
  
  cerrarSesion(){
    //localStorage.clear();
    this.router.navigate(['/login'])
  }

  desplegar(){
    this.abrir = !this.abrir;
  }
  getUsuario(){
    this.usuario = 'Prueba';//localStorage.getItem('nombreUsuario');
  }

  rolUsuario(): Number{
    return 1 ;//Number(localStorage.getItem('idRol'));
  }

  desplegarAdmin(){
    this.abrirAdmin = !this.abrirAdmin;
  }
  
}
