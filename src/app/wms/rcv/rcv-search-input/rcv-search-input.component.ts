import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchHelperService } from '../../common-wms/search-helper/search-helper.service.';

@Component({
  selector: 'wms-rcv-search-input',
  templateUrl: './rcv-search-input.component.html',
  styleUrls: ['./rcv-search-input.component.css']
})
export class RcvSearchInputComponent implements OnInit {

  @Input('VO') dataObject: any;
  @Input('RCVSTA') RCVSTA: any[];
  @Input('RCVTYP') RCVTYP: any[];
  @Output() clickEvent = new EventEmitter<any>();

  constructor() { }
  lookUp_PTNKEY = {
    key: 'PTNKEY',
    callback: (res) => {
      if (res) {
        this.dataObject.PTNKEY = res['PTNKEY'];
        this.dataObject.PTNRNM = res['PTNRNM'];
      } else {
        SearchHelperService.openHelper('PTNKEY', this.dataObject).subscribe(
          rowData => {
            for (let key of Object.keys(this.dataObject)) {
              this.dataObject[key] = rowData[key]
            }
          });
      }
    }
  };

  lookUp_SKUKEY = {
    key: 'SKUKEY',
    callback: (res) => {
      if (res) {
        this.dataObject.SKUKEY = res['SKUKEY'];
        this.dataObject.SKUNAM = res['SKUNAM'];
      } else {
        SearchHelperService.openHelper('SKUKEY', this.dataObject).subscribe(
          rowData => {
            for (let key of Object.keys(this.dataObject)) {
              this.dataObject[key] = rowData[key]
            }
          });
      }
    }
  }

  searchPtnBtn = {
    icon: 'search',
    type: 'default',
    onClick: (e) => {
      SearchHelperService.openHelper('PTNKEY', this.dataObject).subscribe(
        rowData => {
          for (let key of Object.keys(this.dataObject)) {
            this.dataObject[key] = rowData[key]
          }
        });
    }
  };

  searchSkuBtn = {
    icon: 'search',
    type: 'default',
    onClick: (e) => {
      SearchHelperService.openHelper('SKUKEY', this.dataObject).subscribe(
        rowData => {
          for (let key of Object.keys(this.dataObject)) {
            this.dataObject[key] = rowData[key]
          }
        });
    }
  }


  ngOnInit(): void {
  }

}
