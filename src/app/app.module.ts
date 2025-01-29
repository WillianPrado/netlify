import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponentComponent } from './components/first-component/first-component.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { LeadsComponent } from './components/leads/leads.component';
import { AutomaticLeadCaptureComponent } from './components/automatic-lead-capture/automatic-lead-capture.component';  
import { CalcularLanceComponent } from './components/calcular-lance/calcular-lance.component';


@NgModule({
  declarations: [
    AppComponent,
    FirstComponentComponent,
    NotFoundComponent,
    EventosComponent,
    LoginComponent,
    LeadsComponent,
    AutomaticLeadCaptureComponent,
    CalcularLanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
