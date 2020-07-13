import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as ExcelJS from 'exceljs';
import * as FileSaver from "file-saver";
import { MASTERGRIDCONFIG } from "./grid-config";

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

  constructor() {
  }

  emitEvent(event, type) {
    const emittee = {
      eventObj: event,
      eventType: type,
      data: null
    };
    switch (type) {
      case 'RowDblClick':
        const selectedData = this.masterGridRef.instance.getSelectedRowsData();
        emittee.data = selectedData;
        break;
    }

    this.gridEventEmitter.emit(emittee);
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
