import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./base/inicio/inicio.component";
import { LoginComponent } from "./base/login/login.component";
import { ListarUsuariosComponent } from "./usuarios/listar-usuarios/listar-usuarios.component";
import { ListarGmbeComponent } from "./gmbe/listar-gmbe/listar-gmbe.component";
import { CrearGmbeComponent } from "./gmbe/crear-gmbe/crear-gmbe.component";
import { BurbujasComponent } from "./graficas/burbujas/burbujas.component";
import { VistaPreviaComponent } from "./gmbe/vista-previa/vista-previa.component";
import { EditarGmbeComponent } from "./gmbe/editar-gmbe/editar-gmbe.component";

const routes: Routes = [
  { path: "", redirectTo: "inicio", pathMatch: "full" },
  { path: "inicio", component: InicioComponent },
  { path: "login", component: LoginComponent },
  { path: "usuarios", component: ListarUsuariosComponent },
  { path: "gmbe", component: ListarGmbeComponent },
  { path: "crear-gmbe", component: CrearGmbeComponent },
  { path: "editar-gmbe/:id", component: EditarGmbeComponent },
  { path: "vista-previa/:id", component: VistaPreviaComponent },
  { path: "grafica", component: BurbujasComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabledBlocking",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
