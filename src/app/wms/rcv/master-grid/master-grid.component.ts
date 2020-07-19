import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as ExcelJS from 'exceljs';
import * as FileSaver from "file-saver";
import { MASTERGRIDCONFIG } from "./grid-config";
import { eventsHandler } from 'devextreme/events';

@Component({
  selector: 'wms-master-grid',
  templateUrl: './master-grid.component.html',
  styleUrls: ['./master-grid.component.css']
})
export class MasterGridComponent implements OnInit {

  @ViewChild('masterGrid', { static: false }) masterGridRef: DxDataGridComponent;
  @Input("gridData") dataSource: any[] = [];
  @Output() gridEventEmitter = new EventEmitter<any>();

  public config: any[] = MASTERGRIDCONFIG;
  public deleteText: string = '삭제';
  public deleteMessage: string = '정말로 이 행을 삭제하시겠습니까?';
  constructor() {
  }

  emitEvent(event, type) {
    if (!event.data) {
      return;
    }
    const emittee = {
      eventType: type,
      data: event.data
    };
    switch (type) {
      case 'InitNewRow':
        event.data["uid"] = " ";//prevent auto key generation
        break;
      case 'RowDblClick':
        this.gridEventEmitter.emit(emittee);
        break;
      case 'RowInserting':
        break;
      case 'RowInserted':
        this.gridEventEmitter.emit(emittee);
        break;
      case 'RowRemoving':
        break;
      case 'RowRemoved':
        this.gridEventEmitter.emit(emittee);
        break;
    }
  }

  onExporting(e) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('testSheet');
    exportDataGrid({
      component: e.component,
      worksheet: worksheet,
      autoFilterEnabled: true
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer) {
        FileSaver.saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
      });
    });
    e.cancel = true;
  }

  ngOnInit(): void {
  }

}
