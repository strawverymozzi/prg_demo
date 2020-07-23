import { Component, OnInit, ViewChild } from '@angular/core';
import { RcvService } from './rcv.service';
import { RCVFORM, RCVSUBFORM, RCVDETAILFORM } from './_form/rcv-form';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import { SearchHelperService } from '../common-wms/search-helper/search-helper.service.';
import { RcvGridConfig } from './rcv.grid-config';
import { comparison, eq } from 'rsql-builder';

@Component({
  selector: 'app-rcv',
  templateUrl: './rcv.component.html',
  styleUrls: ['./rcv.component.css'],
})
export class RCVComponent implements OnInit {
  @ViewChild('masterGrid', { static: false }) masterGridRef: DxDataGridComponent;
  @ViewChild('detailGrid', { static: false }) detailGridRef: DxDataGridComponent;

  //initF
  public RCVSTA_COMBO: any[];
  public RCVTYP_COMBO: any[];
  public MALLID_COMBO: any[];
  //form
  public RCVFORM: RCVFORM = new RCVFORM();
  public RCVSUBFORM: RCVSUBFORM = new RCVSUBFORM();
  public RCVDETAILFORM = new RCVDETAILFORM();
  //grid
  public gridConfig: RcvGridConfig = new RcvGridConfig();
  public masterGridData: any[];
  public masterFocusedKey: any;
  public detailGridData: any[];
  public detailFocusedKey: any;
  //action
  public actionVisible = false;

  constructor(
    private thisService: RcvService,
  ) { }

  onMasterGridEvent(event, type) {
    const selectedMasterData = event.data;
    switch (type) {
      case 'RowDblClick':
        for (let key of Object.keys(this.RCVDETAILFORM)) {
          this.RCVDETAILFORM[key] = selectedMasterData[key];
        }
        const tenant = comparison('tenant', eq(1000));//from token
        const uid = comparison('rcvId.uid', eq(selectedMasterData["uid"]));
        this.thisService.getListDetailGrid(`${tenant};${uid}`).subscribe(gridData => {
          this.detailGridData = gridData;
          this.actionVisible = true;
        })
        break;
      case 'RowInserting':
        break;
      case 'RowInserted':
        this.thisService.saveMaster(selectedMasterData).subscribe(res => {
          notify({ message: res.msg, width: 500, position: 'top' }, res ? 'success' : 'error', 3000);
          this.masterSearchBtn.onClick();
        })
        break;
    }
  }

  onDetailGridEvent(event, type) {
    const selectedData: any[] = event.data;
    switch (type) {
      case 'EditingStart':
        break;
      case 'InitNewRow':
        break;
      case 'InitNewRow':
        break;
      case 'RowInserting':
        break;
      case 'RowInserted':
        this.thisService.saveDetail(selectedData).subscribe(res => {
          notify({ message: res.msg, width: 500, position: 'top' }, res ? 'success' : 'error', 3000);
          for (let row of this.detailGridData) {
            if (row['uid'] == selectedData['uid']) {
              row['uid'] = res['list'][0]['uid'];
            }
          }
        })
        break;
      case 'RowUpdating':
        break;
      case 'RowUpdated':
        this.thisService.saveDetail(selectedData).subscribe(res => {
          notify({ message: res.msg, width: 500, position: 'top' }, res ? 'success' : 'error', 3000);
        })
        break;
    }
  }

  masterSearchBtn = {
    text: '검색',
    icon: 'search',
    onClick: (e?) => {
      const tenant = comparison('tenant', eq(1000));//from token
      const param = this.RCVFORM.toRSQL();
      const paramSub = this.RCVSUBFORM.toRSQL();
      const queryStr = `${tenant};${param};${paramSub}`;
      this.thisService.getListMasterGrid(queryStr).subscribe(gridData => {
        this.masterGridData = gridData;
      });
    }
  };

  masterSaveBtn = {
    text: 'Save Master',
    icon: 'save',
    onClick: (e) => {
      confirm('Confirm Update?', 'UPDATE_MASTER').then((ok) => {
        if (ok) {
          this.thisService.saveMaster(this.RCVDETAILFORM).subscribe(res => {
            notify({ message: res.msg, width: 500, position: 'top' }, res ? 'success' : 'error', 2000);
            this.masterSearchBtn.onClick();
            this.actionVisible = false;
          })
        }
      });
    }
  };

  masterDeleteBtn = {
    text: 'Delete',
    icon: 'trash',
    type: 'danger',
    onClick: (e) => {
      const selected = this.masterGridRef.instance.getSelectedRowsData();
      if (!selected.length) {
        notify({ message: 'No Selected data', width: 500, position: 'top' }, 'error', 2000);
        return;
      }
      confirm('Confirm Delete Selected Rows?', 'DELETE_MASTER').then((ok) => {
        if (ok) {
          this.thisService.deleteMaster(selected, { body: selected }).subscribe(res => {
            notify({ message: res.msg, width: 500, position: 'top' }, res ? 'success' : 'error', 3000);
            this.masterSearchBtn.onClick();
          })
        }
      });
    }
  };

  detailDeleteBtn = {
    text: 'Delete',
    icon: 'trash',
    type: 'danger',
    onClick: (e) => {
      const selected = this.detailGridRef.instance.getSelectedRowsData();
      if (!selected.length) {
        notify({ message: 'No Selected data', width: 500, position: 'top' }, 'error', 2000);
        return;
      }
      confirm('Confirm Delete Selected Rows?', 'DELETE_DETAIL').then((ok) => {
        if (ok) {
          this.thisService.deleteDetail(selected, { body: selected }).subscribe(res => {
            notify({ message: res.msg, width: 500, position: 'top' }, res ? 'success' : 'error', 3000);
            this.masterSearchBtn.onClick();
          })
        }
      });
    }
  };

  saveAllBtn = {
    text: 'Save All',
    icon: 'save',
    type: 'default',
    onClick: (e) => {
      e.cancel = true;
      this.detailGridRef.instance.closeEditCell();
      const modifiedRows = this.detailGridRef.instance.getVisibleRows().filter(row => row['modified'] || row['isNewRow']);
      const modifiedData = modifiedRows.map(row => row.data);
      if (!modifiedData.length) {
        notify({ message: 'No Modified data', width: 500, position: 'top' }, 'error', 2000);
        return;
      }
      confirm('전체 저장하시겠습니까?', 'SAVE_ALL').then((ok) => {
        if (ok) {
          const data = {
            'rcvMasterDto': this.RCVDETAILFORM,
            'rcvDetailDtoList': modifiedData
          }
          this.thisService.saveAll(data).subscribe(res => {
            notify({ message: res.msg, width: 500, position: 'top' }, res ? 'success' : 'error', 2000);
            this.masterSearchBtn.onClick();
            this.actionVisible = false;
          })
        }
      });
    }
  }

  inlineCellBtn = {
    icon: 'search',
    type: 'default',
    onClick: (e) => {
      const selectedRowIdx = this.detailGridRef.instance.getRowIndexByKey(this.detailFocusedKey);
      SearchHelperService.openHelper('PTNKEY', {}).subscribe(
        rowData => {
          this.detailGridRef.instance.cellValue(selectedRowIdx, 'CODEB', rowData['PTNKEY']);
          this.detailGridRef.instance.cellValue(selectedRowIdx, 'CODEC', rowData['PTNRNM']);
        });
    }
  };

  onInlineCellValChange(event, cellInfo) {
    cellInfo.setValue(event.value)
  }

  lookUp_PTNKEY = {
    key: 'PTNKEY',
    callback: (res, triedValue) => {
      const selectedRowIdx = this.detailGridRef.instance.getRowIndexByKey(this.detailFocusedKey);
      if (res && res[0]) {
        this.detailGridRef.instance.cellValue(selectedRowIdx, 'CODEB', res[0]['PTNKEY']);
        this.detailGridRef.instance.cellValue(selectedRowIdx, 'CODEC', res[0]['PTNRNM']);
      } else {
        const initParam = {
          'PTNKEY': triedValue,
        }
        SearchHelperService.openHelper('PTNKEY', initParam).subscribe(
          rowData => {
            this.detailGridRef.instance.cellValue(selectedRowIdx, 'CODEB', rowData['PTNKEY']);
            this.detailGridRef.instance.cellValue(selectedRowIdx, 'CODEC', rowData['PTNRNM']);
          });
      }
    }
  };



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
    //combo
    this.RCVSTA_COMBO = [1, 2, 3];
    this.RCVTYP_COMBO = [3, 4, 5];
    this.MALLID_COMBO = [1, 3, 4];
    //grid
    this.masterGridData = [];
    this.detailGridData = [];
  }

}
