import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'wms',
    canActivate: [],
    loadChildren: () => import('./wms/wms.module')
      .then(m => m.WmsModule)
  },

  { path: '', redirectTo: 'wms/rcv', pathMatch: 'full' },
  { path: '**', redirectTo: 'wms' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
