import { Component, OnInit } from '@angular/core';
import { faBars } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-nav-side',
  templateUrl: './nav-side.component.html',
  styleUrls: ['./nav-side.component.scss']
})
export class NavSideComponent implements OnInit {
  idRol:any;

  faBars = faBars;

  constructor() {

   }

  getrol()
  {

    return localStorage.getItem('idRol');
  }

  activarSidebar()
  {
    let sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('active');
  }

  ngOnInit(): void {
    this.idRol=localStorage.getItem('idRol');
  }

}
