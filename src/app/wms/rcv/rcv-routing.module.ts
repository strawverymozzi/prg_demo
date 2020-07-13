import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RCVComponent } from './rcv.component';


const routes: Routes = [
  {
    path: '',
    component: RCVComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RcvRoutingModule { }
