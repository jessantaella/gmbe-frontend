import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TitulosService } from 'src/app/services/titulos.services';
import { faX, faRotateLeft, faFloppyDisk} from "@fortawesome/free-solid-svg-icons";

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

  /** Arreglos de pruebas */

arregloCategorias = [
    { id: 1, nombre: 'Categoría 1' },
    { id: 2, nombre: 'Categoría 2' },
    { id: 3, nombre: 'Categoría 3' },
    { id: 4, nombre: 'Categoría 4' },
    { id: 5, nombre: 'Categoría 5' }
];

mostrarSubcategoria: { id: number; id_padre: number; nombre: string; }[] | undefined;

subCategorias=[
  { id: 1, id_padre: 1, nombre: 'Subcategoría 1.1' },
    { id: 2, id_padre: 1, nombre: 'Subcategoría 1.2' },
    { id: 3, id_padre: 2, nombre: 'Subcategoría 2.1' },
    { id: 4, id_padre: 2, nombre: 'Subcategoría 2.2' },
    { id: 5, id_padre: 3, nombre: 'Subcategoría 3.1' },
    { id: 6, id_padre: 3, nombre: 'Subcategoría 3.2' },
    { id: 7, id_padre: 4, nombre: 'Subcategoría 4.1' },
    { id: 8, id_padre: 4, nombre: 'Subcategoría 4.2' },
    { id: 9, id_padre: 5, nombre: 'Subcategoría 5.1' },
    { id: 10, id_padre: 5, nombre: 'Subcategoría 5.2' }
];

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

  constructor(private titulos :TitulosService,private modalService: NgbModal) {
    this.titulos.changePestaña('Creación de  GMBE');
    this.titulos.changeBienvenida(this.textoBienvenida);
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

  changeTipo(valor:any){
    this.tipo = parseInt(valor.target.value);
  }

  obtenerSubCategorias(idPadre:any){
    let selectElement = idPadre.target as HTMLSelectElement;
    let selectedValue = Number(selectElement.value);
    this.categoria = this.arregloCategorias.find(c=>c.id === selectedValue);
    this.mostrarSubcategoria = this.subCategorias.filter(subCategoria => subCategoria.id_padre === selectedValue);
    this.subcategoriasAgregadas = [];
    this.ver = false;
  }

  subcategoriaSeleccionada(sub: any){
    if (!this.subcategoriasAgregadas) {
      this.subcategoriasAgregadas = [];
    }
  
    const pos = this.subcategoriasAgregadas.findIndex(e => e.id === sub.id);
    
    if (pos === -1) {
      this.subcategoriasAgregadas.push(sub);
    } else{
      const nuevoArreglo = this.subcategoriasAgregadas?.filter(elemento => elemento.id !== sub.id);
      this.subcategoriasAgregadas = nuevoArreglo;
    }
  }

  agregar(){
    //Fila
    if(this.tipo ===1){

      this.estructuraFinalFilasTitulos.push(
        {categoria:this.categoria,subcategorias:this.subcategoriasAgregadas}
      )
      this.estructuraFinalFilasSubitulos = this.estructuraFinalFilasSubitulos.concat(this.subcategoriasAgregadas);
    }else{
    //columna
      this.estructuraFinalColumnasTitulos.push(
        {categoria:this.categoria,subcategorias:this.subcategoriasAgregadas}
      )
    this.estructuraFinalColumnasSubitulos = this.estructuraFinalColumnasSubitulos.concat(this.subcategoriasAgregadas);
    }
    console.log(this.estructuraFinalFilasSubitulos);
  }

  regresaPapa(idPadre:number){
    this.padreAnterior = idPadre;
    return this.estructuraFinalFilasTitulos.find((e:any)=>e.categoria.id === idPadre);
  }

}
