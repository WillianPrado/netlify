import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponentComponent } from './components/first-component/first-component.component';
import { LeadsComponent } from './components/leads/leads.component';
import { AutomaticLeadCaptureComponent } from './components/automatic-lead-capture/automatic-lead-capture.component';
import { HomeComponent } from './components/home/home.component';
import { CalcularLanceComponent } from './components/calcular-lance/calcular-lance.component';
import { CartasContempladasComponent } from './components/cartas-contempladas/cartas-contempladas.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'automatic-lead-capture', component: AutomaticLeadCaptureComponent},
  { path: 'calcular-lance', component: CalcularLanceComponent},
  { path: 'cartas-comtempladas', component: CartasContempladasComponent},
  { path: 'home', component: HomeComponent}

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}