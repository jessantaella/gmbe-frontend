import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TitulosService } from 'src/app/services/titulos.services';
import { faEye,faPencil,faTrashCan,faUserGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-listar-gmbe',
  templateUrl: './listar-gmbe.component.html',
  styleUrls: ['./listar-gmbe.component.scss']
})
export class ListarGmbeComponent {
  textoBienvenida =
    "MBE";

    //iconos
  faEye = faEye;
  faPencil = faPencil;
  faTrashCan = faTrashCan;
  faUserGroup = faUserGroup;


  constructor(private titulos :TitulosService,private modalService: NgbModal) {
    this.titulos.changePestaña('GMBE');
    this.titulos.changeBienvenida(this.textoBienvenida);
  }

  open(content: TemplateRef<any>) {
    const modalRef = this.modalService.open(content,{centered:true,size: 'lg'});
  }
}
