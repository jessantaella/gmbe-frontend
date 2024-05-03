import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { isPlatformBrowser } from '@angular/common';
import { TitulosService } from 'src/app/services/titulos.services';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  gmbe: any;
  opciones: any;
  redes: any;
  generales: any;
  public href: string = "";
  rutaActual = "/";
  btn: any;
  vlinks: any;
  hlinks: any;
  numOfItems: number = 0;
  totalSpace: number = 0;
  closingTime: number = 1000;
  breakWidths: any = [];
  minWrap=0;
  currentRoute:any;

  isBrowser = false;
  nombreCorto = 'GMBE'


  constructor( private titulos:TitulosService, private titleService: Title,@Inject(PLATFORM_ID) private platformId:any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if(this.isBrowser){
      this.titulos.getPestaña().subscribe(
        res=>{
          this.cambiarTitulo(res);
        })
      /*this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
          console.log(this.currentRoute)
          this.cambiarPagina();
        }
      });*/
    }
  }

  // revisar para cambiar el nombre mostrado en la pestaña
  cambiarTitulo(nombre: string) {
    this.titleService.setTitle(this.nombreCorto + " | " + nombre);
  }


}
