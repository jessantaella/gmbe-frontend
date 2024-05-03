import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser,faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-start-bar',
  templateUrl: './start-bar.component.html',
  styleUrls: ['./start-bar.component.scss']
})
export class StartBarComponent implements OnInit {
  abrir = false;
  abrirAdmin = false;
  abrirCoor = false;
  idRol:any;
  abrirCed = false;
  nombreLogeado:any
  faUser= faUser;
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.idRol=1 ;//localStorage.getItem('idRol');
    this.nombreLogeado='';//localStorage.getItem('nombreUsuario');
  }


  getrol()
  {
    return localStorage.getItem('idRol') ;

  }

  getNombreLogeado(){
    return localStorage.getItem('nombreUsuario');

  }


  getCoordinacion(){
    return localStorage.getItem('idCoordinacion');
  }

  validarToken(): boolean{
    return true //localStorage.getItem('token-proedit') !== null;
  }

  cerrarSesion(){
    //localStorage.clear();
    this.router.navigate(['/login'])
  }

  desplegar(){
    this.abrir = !this.abrir;
  }

  desplegarAdmin(){
    this.abrirAdmin = !this.abrirAdmin;
  }
/*
  desplegarCoordinaciones(){
    this.abrirCoor = !this.abrirCoor;
  }
*/
  desplegarCedula(){
    this.abrirCed = !this.abrirCed;
  }

}
