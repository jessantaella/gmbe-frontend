import {Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import { DataDynamic } from '../services/dinamic-data.services';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { faUser,faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit{

  redes: any;
  nombreSistema: any;
  fontSizeTitulo = '24px';
  fontSizeTituloNormal = '20px';
  isBrowser = false;
  celular = false;
  @ViewChild('main')
  main!: ElementRef;
  alto = 100;
  faUser= faUser;
  faSortDown= faSortDown;
  faSortUp= faSortUp;
  textoAbajo = true;

  rutaImagenAlimentacion: string = 'assets/img/Alimentacion.png';
  rutaImagenCuidadoInfantil: string = 'assets/img/CuidadoInfantil.png';
  rutaImagenSeguridadSocial: string = 'assets/img/SeguridadSocial.png';


  mbes = [
    {urlImg:this.rutaImagenAlimentacion,nombre:"Alimentación"},
    {urlImg:this.rutaImagenCuidadoInfantil,nombre:"Cuidado Infantil"},
    {urlImg:this.rutaImagenSeguridadSocial,nombre:"Seguridad Social"}]

  constructor(
    private servicio: DataDynamic,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    @Inject(PLATFORM_ID) private platformId: any
  ){
    this.consultarData();
    if (this.isBrowser) {
      this.breakpointObserver
        .observe(['(max-width: 768px)'])
        .subscribe((result: BreakpointState) => {
          if (result.matches) {
            this.fontSizeTitulo = '14px';
            this.fontSizeTituloNormal = '12px';
            this.celular = true;
          } else {
            this.fontSizeTitulo = '24px';
            this.fontSizeTituloNormal = '20px';
            this.celular = false;
          }
        });
    }
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      window.history.replaceState(null, '', '/');
      this.router.navigateByUrl('/');
    }
  }
  consultarData() {
    //if (this.isBrowser) {
      this.servicio.getInformacion().subscribe((res) => {
        this.nombreSistema = res?.mbe?.sistema;
        this.redes = res.generales.redes;
        console.log(this.redes);
      });
    //}
  }

  mostrarTexto(){
    this.textoAbajo = !this.textoAbajo;
  }

}
