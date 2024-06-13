import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerConfigService } from 'src/app/server-config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient,private serverConfigService: ServerConfigService) { }

  listarUsuarios(pagina:number,size:number,busqueda:string,filtro:string):Observable<any>{
    let url = this.serverConfigService.getServerConfig()+'api/gmbe-catalogos/api/usuarios/search-paginados?page='+pagina+'&size='+size+'&busqueda='+busqueda+'&filtro='+filtro;
    return this.http.get<any>(url);
  }
}
