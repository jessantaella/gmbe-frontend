import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TitulosService } from 'src/app/services/titulos.services';
import { faX, faRotateLeft, faFloppyDisk, faPlus} from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GmbeServicesService } from '../services/gmbe-services.service';

@Component({
  selector: 'app-crear-gmbe',
  templateUrl: './crear-gmbe.component.html',
  styleUrls: ['./crear-gmbe.component.scss']
})
export class CrearGmbeComponent {

  textoBienvenida =
  "Creación de GMBE";
  faX = faX;
  faRotateLeft = faRotateLeft;
  faFloppyDisk = faFloppyDisk;
  faPlus = faPlus;
  generales: FormGroup;

  opcionesTipoEstructura! :any [];

  /** Arreglos de pruebas */

arregloCategorias! :any[];

mostrarSubcategoria: { id: number; id_padre: number; nombre: string; }[] | undefined;

subCategorias! : any[];

tipo=0;
categoria:any;
subcategoriasAgregadas :any[] = [];
estructuraFinalFilasTitulos :any = [];
estructuraFinalFilasSubitulos :any = [];
estructuraFinalColumnasTitulos :any = [];
estructuraFinalColumnasSubitulos :any = [];
padreAnterior = 0;
ver =false;

  imageUrl: string | ArrayBuffer | null | undefined = null;
  imageFile: File | null = null;

  constructor(private titulos :TitulosService,private modalService: NgbModal,private fb:FormBuilder, private gmbeservice:GmbeServicesService) {
    this.titulos.changePestaña('Creación de  GMBE');
    this.titulos.changeBienvenida(this.textoBienvenida);
    this.tipoEstructura();
    this.obtenerCategorias();
    this.generales = this.fb.group({
      nombre: ['', Validators.required],
      objetivos: ['', Validators.required],
      hallazgos: ['', Validators.required]
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  clearImage(): void {
    this.imageUrl = null;
    this.imageFile = null;
  }



  subcategoriaSeleccionada(sub: any){
    if (!this.subcategoriasAgregadas) {
      this.subcategoriasAgregadas = [];
    }
    const pos = this.subcategoriasAgregadas.findIndex(e => e.idCatalogo === sub.idCatalogo);
    
    if (pos === -1) {
      this.subcategoriasAgregadas.push(sub);
    } else{
      const nuevoArreglo = this.subcategoriasAgregadas?.filter(elemento => elemento.idCatalogo !== sub.idCatalogo);
      this.subcategoriasAgregadas = nuevoArreglo;
    }
  }

  agregar(){
    //Columna
    if(this.tipo ===2){
      //let index = this.estructuraFinalFilasTitulos.findIndex((obj: any) => obj.idCatalogo === this.categoria.idCatalogo);

      this.estructuraFinalFilasTitulos.push(
        {categoria:this.categoria,subcategorias:this.subcategoriasAgregadas}
      )
      this.estructuraFinalFilasSubitulos = this.estructuraFinalFilasSubitulos.concat(this.subcategoriasAgregadas);
    }else{
    //Fila
      this.estructuraFinalColumnasTitulos.push(
        {categoria:this.categoria,subcategorias:this.subcategoriasAgregadas}
      )
    this.estructuraFinalColumnasSubitulos = this.estructuraFinalColumnasSubitulos.concat(this.subcategoriasAgregadas);
    }
    console.log(this.estructuraFinalFilasTitulos);
    console.log(this.estructuraFinalFilasSubitulos);
  }

  regresaPapa(idPadre:number){
    console.log(idPadre)
    this.padreAnterior = idPadre;
    return this.estructuraFinalFilasTitulos.find((e:any)=>e.categoria.idCatalogo === idPadre);
  }

// uno para obtener fila o columna
  tipoEstructura(){
    this.gmbeservice.listarCatalogo(1).subscribe(
      res=>{
        this.opcionesTipoEstructura = res;
        console.log(res);
      },
    err=>{

    });
  }
  
  changeTipo(valor:any){
    this.tipo = parseInt(valor.target.value);
    this.subCategorias = []
    this.obtenerCategorias()
  }


  obtenerCategorias(){
    this.gmbeservice.listarCatalogo(2).subscribe(
      res=>{
        this.arregloCategorias = res;
      },
    err=>{

    });
  }


  obtenerSubCategorias(idPadre:any){
    let selectElement = idPadre.target as HTMLSelectElement;
    let selectedValue = Number(selectElement.value);
    this.categoria = this.arregloCategorias.find(c=>c.idCatalogo === selectedValue);
    this.gmbeservice.listarSubcategorias(this.categoria.idCatalogo).subscribe(
      res=>{
        this.subCategorias = res;
      }
    )
    this.subcategoriasAgregadas = [];
    this.ver = false;
  }


  guardar(){
    console.log(this.generales.value);
  }

}
