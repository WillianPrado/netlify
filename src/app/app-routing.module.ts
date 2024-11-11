import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponentComponent } from './components/first-component/first-component.component';
import { LeadsComponent } from './components/leads/leads.component';
import { AutomaticLeadCaptureComponent } from './components/automatic-lead-capture/automatic-lead-capture.component';

const routes: Routes = [
  { path: '', component: LeadsComponent },
  { path: 'automatic-lead-capture', component: AutomaticLeadCaptureComponent}

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}