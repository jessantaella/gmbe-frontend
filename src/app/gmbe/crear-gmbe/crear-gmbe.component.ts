import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TitulosService } from 'src/app/services/titulos.services';
import { faX} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-crear-gmbe',
  templateUrl: './crear-gmbe.component.html',
  styleUrls: ['./crear-gmbe.component.scss']
})
export class CrearGmbeComponent {

  textoBienvenida =
  "Creación de GMBE";
  faX = faX;

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
}
