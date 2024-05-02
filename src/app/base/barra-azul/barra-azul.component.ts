import { Component } from '@angular/core';

@Component({
  selector: 'app-barra-azul',
  templateUrl: './barra-azul.component.html',
  styleUrls: ['./barra-azul.component.scss']
})
export class BarraAzulComponent{

  obtenerTitular() {
    return localStorage.getItem('titulo-Azul');
  }

}
