import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// Este servicio es para cambiar nombre en el cuadro azul de bienvenida y en la pestaña 

export class TitulosService {

  mostrarPestaña = new BehaviorSubject('');
  mostrarBienvenida =  new BehaviorSubject('');

  changePestaña(nombre:string){
    this.mostrarPestaña.next(nombre);  
  }
  getPestaña() : Observable<string>{
    return this.mostrarPestaña.asObservable();
  }

  changeBienvenida(texto:string){
    this.mostrarBienvenida.next(texto);
  }

  getBienvenida():Observable<string>{
    return this.mostrarBienvenida.asObservable();
  }
}
