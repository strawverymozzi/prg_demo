import { Component, OnInit, ViewChild, Input, ɵConsole, Output, EventEmitter } from '@angular/core';
import { DETAILGRIDCOLCONFIG } from "./grid-config";
import { DxDataGridComponent } from 'devextreme-angular';
import { SearchHelperService } from '../../common-wms/search-helper/search-helper.service.';

@Component({
  selector: 'wms-detail-grid',
  templateUrl: './detail-grid.component.html',
  styleUrls: ['./detail-grid.component.css']
})
export class DetailGridComponent implements OnInit {
  @ViewChild('detailGrid', { static: false }) detailGridRef: DxDataGridComponent;
  @Input("gridData") dataSource: any[];
  @Output() gridEventEmitter = new EventEmitter<any>();

  public config: any[] = DETAILGRIDCOLCONFIG;
  private seletedRowKey: any;
  private selectedRowIdx: number;
  private selectedColumn: string;
  private selectedRowData: any;

  constructor() { }

  inlineCellBtn = {
    icon: 'search',
    type: 'default',
    onClick: (e) => {
      const initParam = {
        'PTNKEY': this.selectedRowData['CODEB'],
        'PTNRNM': this.selectedRowData['CODEC']
      }
      SearchHelperService.openHelper('PTNKEY', initParam).subscribe(
        rowData => {
          this.detailGridRef.instance.cellValue(this.selectedRowIdx, this.selectedColumn, rowData["PTNKEY"]);
          this.onEditDone();
        });
    }
  };

  onEditDone() {
    this.seletedRowKey = undefined;
    this.selectedRowIdx = undefined;
    this.selectedColumn = undefined;
    this.selectedRowData = undefined;
  }

  onEditorPreparing(e) { }

  onEditorPrepared(e) { }

  onEditingStart(e) {
    this.seletedRowKey = e.key
    this.selectedRowIdx = this.detailGridRef.instance.getRowIndexByKey(this.seletedRowKey);
    this.selectedColumn = e.column.dataField
    this.selectedRowData = e.data;
  }

  emitEvent(event, type) {
    const emittee = {
      eventObj: event,
      eventType: type,
      data: null
    };
    switch (type) {
      case 'InitNewRow':

        break;
      case 'RowInserting':

        break;
      case 'RowInserted':
        this.gridEventEmitter.emit(emittee);

        break;
      case 'RowUpdating':

        break;
      case 'RowUpdated':
        this.gridEventEmitter.emit(emittee);

        break;
      case 'RowRemoving':

        break;
      case 'RowRemoved':
        this.gridEventEmitter.emit(emittee);

        break;
    };
  }

  ngOnInit(): void {
  }

}
