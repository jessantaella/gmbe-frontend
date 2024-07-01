import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  faEye,
  faPencil,
  faTrashCan,
  faUserGroup,
  faRotate,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';
import { TitulosService } from 'src/app/services/titulos.services';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var swal: any;

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss'],
})
export class ListarUsuariosComponent implements OnInit {
  textoBienvenida = 'Gestión de usuarios';

  //Paginación
  currentPage: number = 0;
  page: number = 0;
  pageSize: number = 10;
  items: number = 0;
  totalPage: number = 0;
  seachValue: string = '';
  isModeSearch: boolean = false;
  desde: number = 0;
  palabra :string  = '';

  //iconos
  faEye = faEye;
  faPencil = faPencil;
  faTrashCan = faTrashCan;
  faUserGroup = faUserGroup;
  faRotate = faRotate;
  faFloppyDisk = faFloppyDisk;

  usuarios!: any[];
  usuariosLdap!: any[];
  filteredUsuarios!: any[];
  roles!: any[];
  listaMBE! : any[];
  selectedUsuario: any;
  usuarioEditar:any;
  seleccionados: number[] = [];

  usuarioForm: FormGroup;
  usuarioEditForm: FormGroup;

  private modalRef: NgbModalRef | undefined;

  constructor(
    private titulos: TitulosService,
    private modalService: NgbModal,
    private usuariosService: UsuariosService,
    private fb: FormBuilder
  ) {
    this.titulos.changeBienvenida(this.textoBienvenida);
    this.titulos.changePestaña('Gestión de usuarios');
    this.usuarioForm = this.fb.group({
      userName: ['', Validators.required],
      correo: ['', Validators.required],
      idRol: ['', Validators.required],
      nombre: ['', Validators.required],
    });

    this.usuarioEditForm = this.fb.group({
      userName: ['', Validators.required],
      correo: ['', Validators.required],
      idRol: ['', Validators.required],
      nombre: ['', Validators.required],
    });
    this.usuarioForm.get('nombre')?.disable();
    this.usuarioForm.get('correo')?.disable();
  }
  ngOnInit(): void {
    this.cambiarPaginaGetAll(0,10,'','TODOS');
    //this.obtenerUsuarios();
    this.usuariosLDAP();
    this.obtenerRoles();
    this.obtenerMBEs();
  }

  obtenerRoles() {
    this.usuariosService.getRoles().subscribe((res) => {
      console.log(res);
      this.roles = res;
    });
  }

  obtenerUsuarios() {
    this.usuariosService.listarUsuarios(0, 10, '', 'TODOS').subscribe((res) => {
      console.log(res);
      this.usuarios = res.content;
    });
  }

  usuariosLDAP() {
    this.usuariosService.usuariosLDAP().subscribe(
      (res) => {
        this.usuariosLdap = res;
        console.log(this.usuariosLdap);
      },
      (error) => {}
    );
  }

  obtenerMBEs(){
    this.usuariosService.listarMBE().subscribe(
      res=>{
        this.listaMBE = res;
      }
    )
  }

  filterUsuarios(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredUsuarios = this.usuariosLdap.filter((usuario) =>
      usuario.samaccountname.toLowerCase().includes(searchTerm)
    );
  }

  selectUsuario(usuario: any) {
    this.selectedUsuario = usuario;
    this.usuarioForm.get('userName')?.setValue(usuario.samaccountname);
    this.usuarioForm.get('nombre')?.setValue(usuario.commonName);
    this.usuarioForm.get('correo')?.setValue(usuario.userPrincipal);

    this.filteredUsuarios = []; //this.usuarios.slice(); // Restablecer la lista filtrada
  }

  onCheckboxChange(event: any, idMbe: number) {
    if (event.target.checked) {
      this.seleccionados.push(idMbe);
    } else {
      this.seleccionados = this.seleccionados.filter(id => id !== idMbe);
    }
  }


  open(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });
  }

  openEditar(content:TemplateRef<any>,usuario:any){
    this.open(content);
    console.log(usuario)
    this.usuarioEditar = usuario;
    this.usuarioEditForm = this.fb.group({
      userName: [this.usuarioEditar.userName, Validators.required],
      correo: [this.usuarioEditar.correo, Validators.required],
      idRol: [this.usuarioEditar?.rolUsuario?.idRol, Validators.required],
      nombre: [this.usuarioEditar?.nombre, Validators.required],
    });

    this.usuarioEditForm.get('userName')?.disable();
    this.usuarioEditForm.get('correo')?.disable();
    this.usuarioEditForm.get('nombre')?.disable();
  }

  crear() {
    let usuarioObj = this.usuarioForm.getRawValue();
    usuarioObj.listaMBEs = [];
    this.usuariosService.crearUsuario(usuarioObj).subscribe(
      (res) => {
        swal.fire('', 'Usuario creado exitosamente', 'success');
        if (this.modalRef) {
          this.modalRef.close();
          this.obtenerUsuarios();
        }
      },
      (err) => {}
    );
  }

  editar(){
    let usuarioObj = this.usuarioEditForm.getRawValue();
    usuarioObj.listaMBEs = [];
    usuarioObj.idUsuario = this.usuarioEditar.idUsuario;
    this.usuariosService.editarUsuario(usuarioObj).subscribe(
      (res) => {
        swal.fire('', 'Usuario actualizado exitosamente', 'success');
        if (this.modalRef) {
          this.modalRef.close();
          this.obtenerUsuarios();
        }
      },
      (err) => {}
    );
  }

  loadPage(e: number) {
    console.log('seaqrchvalue');
    console.log(this.seachValue);
    console.log('loadPage');
    if (e !== this.currentPage) {
      console.log('currentPage');
      console.log(this.currentPage);
      if (this.isModeSearch) {
        console.log('Busqueda');
        if (this.seachValue === '') {
          this.cambiarPaginaGetAll(e - 1, this.pageSize, '', 'TODOS');
        } else {
          this.searchCoincidences(e - 1, this.pageSize, 'TODOS');
        }
      } else {
        console.log('Paginacion');
        this.cambiarPaginaGetAll(e - 1, this.pageSize,'', 'TODOS');
      }
    }
  }

  cambiarPaginaGetAll(
    page: number = 0,
    size: number = 10,
    busqueda: string,
    bandUsers: string
  ) {
    this.usuarios = [];
    this.usuariosService
      .listarUsuarios(page, size, busqueda, bandUsers)
      .subscribe((data) => {
        this.usuarios = data?.content!;
        this.items = data?.totalElements;
        this.page = data?.pageable?.pageNumber + 1;
        this.currentPage = data?.pageable?.pageNumber + 1;
        this.totalPage = data.totalPages;
        this.desde = (this.page - 1) * this.pageSize + 1;
      });
  }

  searchCoincidences(page:number=0,size:number=10, bandUsers:string = ''){

    this.palabra = this.seachValue.trim()

    if (this.palabra===""){
      this.cambiarPaginaGetAll(0,10,'','TODOS');
    }
    if(this.palabra.length>=2){
        this.usuariosService.listarUsuarios(page, size, this.palabra.trim() ,bandUsers).subscribe(data => {
          this.usuarios = data?.content!
          this.items = data?.totalElements;
          this.page = data?.pageable?.pageNumber + 1;
          this.currentPage = data?.pageable?.pageNumber + 1
          this.totalPage = data?.totalPages
          this.desde = ((this.page - 1) * this.pageSize) + 1;
        })
    }
  }



}
