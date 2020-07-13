import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RCVComponent } from './rcv.component';
import { MasterGridComponent } from './master-grid/master-grid.component';
import { DetailGridComponent } from './detail-grid/detail-grid.component';
import { RcvRoutingModule } from './rcv-routing.module';
import { CommonWmsModule } from '../common-wms/common-wms.module';
import { RcvSearchInputComponent } from './rcv-search-input/rcv-search-input.component';
import { RcvSearchInputSubComponent } from './rcv-search-input-sub/rcv-search-input-sub.component';
import { RcvService } from './rcv.service';
import { RcvDetailSearchInputComponent } from './rcv-detail-search-input/rcv-detail-search-input.component';


const MODULE = [
  CommonWmsModule,
  RcvRoutingModule,
];
const COMPONENT = [
  RCVComponent,
  MasterGridComponent,
  DetailGridComponent,
  RcvSearchInputComponent,
  RcvSearchInputSubComponent,
]

@NgModule({
  declarations: [
    ...COMPONENT,
    RcvDetailSearchInputComponent,
  ],
  imports: [
    ...MODULE
  ],
  providers:[
    RcvService,
  ]
})
export class RcvModule { }
