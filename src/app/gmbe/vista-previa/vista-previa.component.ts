import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GmbeServicesService } from '../services/gmbe-services.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-vista-previa',
  templateUrl: './vista-previa.component.html',
  styleUrls: ['./vista-previa.component.scss']
})
export class VistaPreviaComponent {
  id:number = 0;
  generales: FormGroup;
  imageUrl: SafeUrl | null = null;


  estructuraFinalColumnasTitulos:any[] = [];
  estructuraFinalFilasTitulos:any[] = [];
  estructuraFinalFilasSubitulos:any[] = [];
  datosIntersecciones:any [] = [];

  constructor(private route: ActivatedRoute, private gmbservices:GmbeServicesService,private fb: FormBuilder,private sanitizer: DomSanitizer){
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.generales = this.fb.group({
      nombre: [''],
      objetivos: [''],
      resumen: [''],
    });
    this.cargaMBE();
    this.cargarEstructuraMbe();
    this.cargarDatosMbe();
  }

  cargaMBE(){
    this.gmbservices.obtenerInfoGMBE(this.id).subscribe(
      res=>{
        console.log(res)
        this.generales = this.fb.group({
          nombre: [res?.nombre],
          objetivos: [res?.objetivo],
          resumen: [res?.resumen],
        });
        this.generales.disable();
        this.obtenerImagen(res.ruta);
      },
      err=>{}
    )
  }

  obtenerImagen(ruta:string){
    this.gmbservices.getImage(ruta).subscribe(
      res=>{
        console.log(res);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(res);
    },
      err=>{}
    );
  }

cargarEstructuraMbe(){
  this.gmbservices.obtenerEstructuraGMBE(this.id).subscribe(
    res=>{
      console.log(res);
      //obtiene categorias filas
      this.estructuraFinalColumnasTitulos = this.filtrarCategoriasUnicas(this.obtenerTipo(res,2));
      this.estructuraFinalColumnasTitulos.forEach(c=>{
        c.hijos = [];
        res.forEach((e: { idSubCategoria: { idRelacion: any; }; })=>{
          if(e?.idSubCategoria?.idRelacion ===c.idCatalogo){
           c.hijos.push(e);
          }
        });
      });     
      //obtiene categorias de columnas
      this.estructuraFinalFilasTitulos = this.filtrarCategoriasUnicas(this.obtenerTipo(res,1));
      this.estructuraFinalFilasTitulos.forEach(c=>{
        c.hijos = [];
        res.forEach((e: { idSubCategoria: { idRelacion: any; }; })=>{
          if(e?.idSubCategoria?.idRelacion ===c.idCatalogo){
           c.hijos.push(e);
          }
        });
      });  
      this.estructuraFinalFilasTitulos.forEach(e=>{
        this.estructuraFinalFilasSubitulos= this.estructuraFinalFilasSubitulos.concat(e.hijos)
      })
      console.log('Columnas',this.estructuraFinalColumnasTitulos)
      console.log('subtitulos',this.estructuraFinalFilasSubitulos);
      console.log('hijos filas',this.estructuraFinalFilasTitulos)
    },
    err=>{}
  )
}

cargarDatosMbe(){
  this.gmbservices.obtenerDatosGMBE(this.id).subscribe(
    res=>{
      console.log(res);
      this.datosIntersecciones = res;
    },
    err=>{}
  );
}

obtenerTipo(arreglo:any,tipo:number){
  let salida = [];
  salida = arreglo.filter((e: any )=>e.idTipo?.idCatalogo ===tipo);
  return salida;
}

filtrarCategoriasUnicas(arreglo: any){
  const categoriasMap = new Map<number, any>();
  arreglo.forEach((obj: { idCategoria: any; idEstructura: any; countSubCats: any; }) => {
    const categoria = obj.idCategoria;
    categoria.idEstructura = obj.idEstructura;
    if (categoriasMap.has(categoria.idCatalogo)) {
      categoriasMap.get(categoria.idCatalogo)!.countSubCats! += obj.countSubCats;
    } else {
      categoria.countSubCats = obj.countSubCats;
      categoriasMap.set(categoria.idCatalogo, categoria);
    }
  });

  return Array.from(categoriasMap.values());
}


datosInterseccion(fila:number,columna:number){
  console.log(fila,columna);
  let respuesta =  this.datosIntersecciones.find(
    obj => obj.idFila === fila && obj.idColumna === columna
  );
  console.log(respuesta);
  return 1;
}

}
