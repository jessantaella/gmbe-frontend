import { Component, OnInit, TemplateRef } from '@angular/core';
import { faEye,faPencil,faTrashCan,faUserGroup, faRotate,faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { TitulosService } from 'src/app/services/titulos.services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  usuariosLdap! : any [];
  filteredUsuarios! :any [];
  selectedUsuario :any;

  usuarioForm: FormGroup;

  constructor(private titulos :TitulosService,private modalService: NgbModal,private usuariosService:UsuariosService,private fb:FormBuilder) {
    this.titulos.changeBienvenida(this.textoBienvenida);
    this.titulos.changePestaña('Gestión de usuarios');
    this.usuarioForm = this.fb.group({
      usuario: ['', Validators.required],
      correo: ['', Validators.required],
      rol: ['', Validators.required],
      nombre: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.obtenerUsuarios();
    this.usuariosLDAP();
  }

  obtenerUsuarios(){
    this.usuariosService.listarUsuarios(0,10,'','TODOS').subscribe(
      res=>{
        console.log(res);
        this.usuarios = res.content;
      }
    )
  }

  usuariosLDAP(){
    this.usuariosService.usuariosLDAP().subscribe(
      res=>{
        this.usuariosLdap = res;
        console.log(this.usuariosLdap)
      },
      error=>{
      })
  }

  filterUsuarios(event:any) {
    const searchTerm = event.target.value.toLowerCase();
    console.log(searchTerm)

    this.filteredUsuarios = this.usuariosLdap.filter(usuario =>
      usuario.samaccountname.toLowerCase().includes(searchTerm)
    );
    console.log(this.filteredUsuarios)
  }

  selectUsuario(usuario: any) {
    this.selectedUsuario = usuario;
    console.log(usuario)
    this.usuarioForm.get('usuario')?.setValue(usuario.samaccountname)
    this.filteredUsuarios =  []//this.usuarios.slice(); // Restablecer la lista filtrada
    console.log(this.selectedUsuario)
  }


  open(content: TemplateRef<any>) {
    const modalRef = this.modalService.open(content,{centered:true,size: 'lg',backdrop:'static'});
  }

  //Obtener usuarios LDAP

  //oBTENER LISTA DE GMBE

}
