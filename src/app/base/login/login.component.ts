import { Component } from "@angular/core";
import { faLock, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import { TitulosService } from "src/app/services/titulos.services";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  faLock = faLock;
  faUser = faUser;
  faTimes = faTimes;
  textoBienvenida =
    "Bienvenido al Sistema para la Generación de Mapas de Brechas de Evidencia (GMBE)";


  constructor(private titulos :TitulosService) {
    this.titulos.changeBienvenida(this.textoBienvenida);
  }
}
