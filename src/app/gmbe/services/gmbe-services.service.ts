import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerConfigService } from 'src/app/server-config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GmbeServicesService {

  constructor(private http:HttpClient,private serverConfigService: ServerConfigService) { }

  listarCatalogo(tipo:number):Observable<any>{
    let url = this.serverConfigService.getServerConfig()+'api/gmbe-catalogos/api/catalogo/find-by-tipo-catalogo?idTipoCatalogo='+tipo;
    return this.http.get<any>(url);
  }

  listarSubcategorias(padre:number):Observable<any>{
    let url = this.serverConfigService.getServerConfig()+'api/gmbe-catalogos/api/catalogo/find-by-id-relacion?idRelacion='+padre;
    return this.http.get<any>(url);
  }
}
