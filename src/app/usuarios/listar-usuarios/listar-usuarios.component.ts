import { Component, OnInit, TemplateRef } from '@angular/core';
import { faEye,faPencil,faTrashCan,faUserGroup, faRotate,faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { TitulosService } from 'src/app/services/titulos.services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../services/usuarios.service';


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})

export class ListarUsuariosComponent implements OnInit{

  textoBienvenida =
    "Gestión de usuarios";

//iconos
  faEye = faEye;
  faPencil = faPencil;
  faTrashCan = faTrashCan;
  faUserGroup = faUserGroup;
  faRotate = faRotate;
  faFloppyDisk = faFloppyDisk;

  usuarios!: any[];


  constructor(private titulos :TitulosService,private modalService: NgbModal,private usuariosService:UsuariosService) {
    this.titulos.changeBienvenida(this.textoBienvenida);
    this.titulos.changePestaña('Gestión de usuarios');
  }
  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.usuariosService.listarUsuarios(0,10,'','TODOS').subscribe(
      res=>{
        console.log(res);
        this.usuarios = res.content;
      }
    )
  }


  open(content: TemplateRef<any>) {
    const modalRef = this.modalService.open(content,{centered:true,size: 'lg',backdrop:'static'});
  }

  //Obtener usuarios LDAP

  //oBTENER LISTA DE GMBE

}
