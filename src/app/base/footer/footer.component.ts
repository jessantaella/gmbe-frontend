import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DataDynamic } from '../services/dinamic-data.services';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  generales:any;
  datos:any;
  redes:any;
  isBrowser = false;

  constructor(private servicio:DataDynamic,
    @Inject(PLATFORM_ID) private platformId: any
  ) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.consultarData();
  }

  consultarData(){
    this.servicio.getInformacion().subscribe(
      res=>{
        this.generales = res.generales;
        this.redes = res.generales.redes;
      }
    )
   }

   getImagen(imagen: string) {
    if (this.isBrowser) {
      let url = window.location.hostname;
      
      if(url === 'localhost'){
        return  'HTTP://' + url + ':4200/assets/img/' + imagen;

      }else if(url.includes('qa') || url.includes('sistemas')){
        return url + '/conf/GMBE/assets/'+imagen;

      }else{
        return 'HTTP://' + url + ':81/conf/GMBE/assets/' + imagen;
        
      }
    } else {
      return '';
    }
  }

}