import { NgModule } from '@angular/core';
import { SearchInputPtnkeyComponent } from './search-input-ptnkey/search-input-ptnkey.component';
import { SearchInputSkukeyComponent } from './search-input-skukey/search-input-skukey.component';
import { SearchHelperComponent } from './search-helper/search-helper.component';
import { DevxModule } from 'src/app/devx/devx.module';
import { LookUpDirective } from './_directive/look-up.directive';

const MODULE = [
  DevxModule,
];

const COMPONENT = [
  SearchInputPtnkeyComponent,
  SearchInputSkukeyComponent,
  SearchHelperComponent,
  LookUpDirective,
];

@NgModule({
  declarations: [...COMPONENT,],
  imports: [
    ...MODULE
  ],
  exports: [
    ...MODULE,
    ...COMPONENT
  ]
})
export class CommonWmsModule {

}