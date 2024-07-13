import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TitulosService } from 'src/app/services/titulos.services';
import { faEllipsisVertical, faEye,faTrashCan,faUserGroup, faUpload, faPencil, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { GmbeServicesService } from '../services/gmbe-services.service';

@Component({
  selector: 'app-listar-gmbe',
  templateUrl: './listar-gmbe.component.html',
  styleUrls: ['./listar-gmbe.component.scss']
})
export class ListarGmbeComponent implements OnInit{

//Paginación
currentPage: number = 0;
page: number = 0;
pageSize: number = 10;
items: number = 0;
totalPage: number = 0;
isModeSearch: boolean = false;
desde: number = 0;

listaMBE:any[]=[];

  textoBienvenida =
    "MBE";

    //iconos
  faEye = faEye;
  faEllipsisVertical = faEllipsisVertical;
  faTrashCan = faTrashCan;
  faUserGroup = faUserGroup;
  faUpload = faUpload;
  faPencil = faPencil;
  faCircleCheck = faCircleCheck;


  constructor(private titulos :TitulosService,private modalService: NgbModal, private gmbeServices:GmbeServicesService) {
    this.titulos.changePestaña('GMBE');
    this.titulos.changeBienvenida(this.textoBienvenida);
  }


  ngOnInit(): void {
    this.cambiarPaginaGetAll(0,10);  
  }

  open(content: TemplateRef<any>) {
    const modalRef = this.modalService.open(content,{centered:true,size: 'lg'});
  }


  cambiarPaginaGetAll(
    page: number = 0,
    size: number = 10,
  ) {
    this.listaMBE = [];
    this.gmbeServices
      .listarGmbes(page, size)
      .subscribe((data) => {
        console.log(data)
        this.listaMBE = data?.content!;
        this.items = data?.totalElements;
        this.page = data?.pageable?.pageNumber + 1;
        this.currentPage = data?.pageable?.pageNumber + 1;
        this.totalPage = data.totalPages;
        this.desde = (this.page - 1) * this.pageSize + 1;
      });
  }

  loadPage(e: number) {
    if (e !== this.currentPage) {
      console.log('currentPage');
      console.log(this.currentPage);
        this.cambiarPaginaGetAll(e - 1, this.pageSize);
    }
  }

}
