import { Component, OnInit, ViewChild, Input, ɵConsole, Output, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import { DETAILGRIDCOLCONFIG } from "./grid-config";
import { DxDataGridComponent } from 'devextreme-angular';
import { SearchHelperService } from '../../common-wms/search-helper/search-helper.service.';

@Component({
  selector: 'wms-detail-grid',
  templateUrl: './detail-grid.component.html',
  styleUrls: ['./detail-grid.component.css']
})
export class DetailGridComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('detailGrid', { static: false }) detailGridRef: DxDataGridComponent;
  @Input("gridData") dataSource: any[];
  @Input("gridDataTrack") gridDataTrack: any[];
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
          this.detailGridRef.instance.cellValue(this.selectedRowIdx, "CODEC", rowData["PTNRNM"]);
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
    this.seletedRowKey = e.key;
    this.selectedRowIdx = this.detailGridRef.instance.getRowIndexByKey(this.seletedRowKey);
    this.selectedColumn = e.column.dataField
    this.selectedRowData = e.data;
  }

  emitEvent(event, type) {
    if (!event.data) {
      return;
    }
    const emittee = {
      eventObj: event,
      eventType: type,
      data: event.data
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

  ngOnDestroy(): void {
    const edited = this.detailGridRef.instance.hasEditData();
    // console.log(edited)
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.gridDataTrack.push(this.detailGridRef);
  }

}
