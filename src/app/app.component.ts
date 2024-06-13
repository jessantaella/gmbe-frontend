import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { DataDynamic } from './base/services/dinamic-data.services';
import { isPlatformBrowser } from '@angular/common';
import { ServerConfigService } from './server-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'GMBE';
  version = 'V-1.0.1' + new Date();
  tags: any;
  ga: any;
  isBrowser = false;


  constructor(private meta: Meta, private servicio: DataDynamic, @Inject(PLATFORM_ID) private platformId: any,private url:ServerConfigService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.url.loadServerConfig();
  }

  ngOnInit(): void {
    this.consultarTags();

    this.meta.addTag({
      "name": "description",
      "content": "Sistema para la Generación de Mapas de Brechas de Evidencia (GMBE)"
    });
    this.meta.addTag({
      "name": "canonical",
      "content": "https://sistemas.coneval.org.mx/GMBE/"
    });
    this.meta.addTag({
      "name": "keywords",
      "content": "MBE, herramientas visuales, organizar, sintetizar, evidencia, marco conceptual, intervenciones, resultados, estudios, evaluaciones, áreas, concentración, brechas, panorama, revisiones, sector, subsector, programas, Mapas CONEVAL, conocimiento"
    });
    this.meta.addTag({
      "name": "language",
      "content": "ES-MX"
    })
    this.meta.addTag({
      "name": "robots",
      "content": "index, follow"
    })
    this.meta.addTag({
      "name": "charset",
      "content": "UTF-8"
    })

  }


  cargaGA() {
    return new Promise((resolve, reject) => {
      let body = document.body;
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = '';
      script.src = this.ga;
      script.onload = () => {
        resolve({ loaded: true, status: 'Loaded' });
      };
      script.onerror = (error: any) => resolve({ loaded: false, status: 'Loaded' });
      script.async = true;
      script.defer = true;
      body.appendChild(script);
    });
  }

  consultarTags() {
    this.servicio.getInformacion().subscribe(
      res => {
        this.tags = res.gmbe?.metas;
        this.ga = res.gmbe?.ga?.url;
          this.addTags();
      })
  }

  addTags() {
    this.tags.forEach((tg: { name: any; content: any; }) => {
      this.meta.addTag({ name: tg.name, content: tg.content });
    });
  }
}
