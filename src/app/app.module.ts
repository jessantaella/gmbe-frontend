import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './base/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InicioComponent } from './base/inicio/inicio.component';
import { FooterComponent } from './base/footer/footer.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {APP_BASE_HREF} from '@angular/common';
import { ObjetoMbeComponent } from './objeto-mbe/objeto-mbe.component';
import { StartBarComponent } from './base/start-bar/start-bar.component';
import { BarraAzulComponent } from './base/barra-azul/barra-azul.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    FooterComponent,
    ObjetoMbeComponent,
    StartBarComponent,
    BarraAzulComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    AccordionModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/GMBE/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
