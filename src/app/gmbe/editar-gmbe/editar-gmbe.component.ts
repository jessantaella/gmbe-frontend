import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GmbeServicesService } from '../services/gmbe-services.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TitulosService } from 'src/app/services/titulos.services';
import {
  faRotateLeft,
  faFloppyDisk,
  faX
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-editar-gmbe',
  templateUrl: './editar-gmbe.component.html',
  styleUrls: ['./editar-gmbe.component.scss']
})
export class EditarGmbeComponent {

  faFloppyDisk=faFloppyDisk;
  faRotateLeft=faRotateLeft;
  faX=faX;

  id:number = 0;
  generales: FormGroup;
  imageUrl: SafeUrl | null = null;
  textoBienvenida = 'Edición de GMBE';

  constructor(private titulos: TitulosService,private route: ActivatedRoute,private gmbservices:GmbeServicesService,private fb: FormBuilder,private sanitizer: DomSanitizer){
    this.titulos.changePestaña('Edición de  GMBE');
    this.titulos.changeBienvenida(this.textoBienvenida);

    this.id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.generales = this.fb.group({
      nombre: [''],
      objetivo: [''],
      resumen: [''],
    });
    this.cargaMBE();
    
  }

  cargaMBE(){
    this.gmbservices.obtenerInfoGMBE(this.id).subscribe(
      res=>{
        this.generales = this.fb.group({
          nombre: [res?.nombre],
          objetivo: [res?.objetivo],
          resumen: [res?.resumen],
        });
        this.obtenerImagen(res.ruta);
      },
      err=>{}
    )
  }

  obtenerImagen(ruta:string){
    this.gmbservices.getImage(ruta).subscribe(
      res=>{
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(res);
    },
      err=>{
        console.log('Error al traer la imagen',err)
      }
    );
  }

  borrarImagen(){
    this.imageUrl = null;
  }


}
