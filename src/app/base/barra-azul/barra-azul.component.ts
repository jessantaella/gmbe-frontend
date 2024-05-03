import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TitulosService } from 'src/app/services/titulos.services';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-barra-azul',
  templateUrl: './barra-azul.component.html',
  styleUrls: ['./barra-azul.component.scss']
})
export class BarraAzulComponent{
  titulo:string = '';
  isBrowser = false;

  constructor(private titulos: TitulosService,@Inject(PLATFORM_ID) private platformId:any){
    this.isBrowser = isPlatformBrowser(this.platformId);
    if(this.isBrowser){
      this.titulos.getBienvenida().subscribe(
        res=>{this.titulo = res})
      }
    
    }


}
