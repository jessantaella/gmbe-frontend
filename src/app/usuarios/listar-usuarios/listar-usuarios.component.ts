import { Component, TemplateRef } from '@angular/core';
import { faEye,faPencil,faTrashCan,faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { TitulosService } from 'src/app/services/titulos.services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})

export class ListarUsuariosComponent {

  textoBienvenida =
    "Gestión de usuarios";

//iconos
  faEye = faEye;
  faPencil = faPencil;
  faTrashCan = faTrashCan;
  faUserGroup = faUserGroup;


  constructor(private titulos :TitulosService,private modalService: NgbModal) {
    this.titulos.changeBienvenida(this.textoBienvenida);
    this.titulos.changePestaña('Gestión de usuarios');
  }

  open(content: TemplateRef<any>) {
    const modalRef = this.modalService.open(content,{centered:true,size: 'lg'});
  }

}
