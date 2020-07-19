import { Component, OnInit, ViewChild } from '@angular/core';
import { RcvService } from './rcv.service';
import { RCVFORM, RCVSUBFORM, RCVDETAILFORM } from './_form/rcv-form';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-rcv',
  templateUrl: './rcv.component.html',
  styleUrls: ['./rcv.component.css'],
})
export class RCVComponent implements OnInit {
  //initF
  public RCVSTA_COMBO: any[];
  public RCVTYP_COMBO: any[];
  public MALLID_COMBO: any[];
  //form
  public RCVFORM: RCVFORM = new RCVFORM();
  public RCVSUBFORM: RCVSUBFORM = new RCVSUBFORM();
  public RCVDETAILFORM = new RCVDETAILFORM();
  //grid
  public masterGridData: any[];
  public detailGridData: any[];
  public detailGridDataTrack: any = [];
  //action
  public actionVisible = false;
  public actionSheetData = [
    {
      text: "Cancel", onClick: (e) => {
        this.detailGridDataTrack = [];
      }
    },
  ]

  constructor(private thisService: RcvService) { }

  masterSearchBtn = {
    text: '검색',
    icon: 'search',
    onClick: (e?) => {
      const param = this.RCVFORM.toRSQL();
      const paramSub = this.RCVSUBFORM.toRSQL();
      const queryStr = param ? param + ';' + paramSub : paramSub
      this.thisService.getListMasterGrid(queryStr).subscribe(gridData => {
        this.masterGridData = gridData;
      });
    }
  };

  masterSaveBtn = {
    text: 'Save Master',
    icon: 'save',
    onClick: (e) => {
      confirm("Confirm Update?", "UPDATE_MASTER").then((ok) => {
        if (ok) {
          this.thisService.saveMaster(this.RCVDETAILFORM).subscribe(res => {
            notify({ message: res.msg, width: 500, position: 'top' }, res ? "success" : "error", 2000);
            this.masterSearchBtn.onClick();
            this.actionVisible = false;
          })
        }
      });
    }
  };

  onSaveAll(e) {
    e.cancel = true;
    this.detailGridDataTrack[0].instance.closeEditCell();
    const modifiedRows = this.detailGridDataTrack[0].instance.getVisibleRows().filter(row => row.modified || row.isNewRow);
    const modifiedData = modifiedRows.map(row => row.data);
    if (!modifiedData.length) {
      notify({ message: "No Modified data", width: 500, position: 'top' }, "error", 2000);
      return;
    }
    console.log(modifiedData)
    confirm("전체 저장하시겠습니까?", "SAVE_ALL").then((ok) => {
      if (ok) {
        const data = {
          "rcvMasterDto": this.RCVDETAILFORM,
          "rcvDetailDtoList": modifiedData
        }
        this.thisService.saveAll(data).subscribe(res => {
          notify({ message: res.msg, width: 500, position: 'top' }, res ? "success" : "error", 2000);
          this.masterSearchBtn.onClick();
          this.actionVisible = false;
        })
      }
    });
  }

  private selectedMasterData: any;
  onMasterGridEvent(emitee) {
    this.selectedMasterData = emitee.data;
    switch (emitee.eventType) {
      case 'RowDblClick':
        for (let key of Object.keys(this.RCVDETAILFORM)) {
          this.RCVDETAILFORM[key] = this.selectedMasterData[key];
        }
        const param = this.RCVDETAILFORM.toRSQL();
        this.thisService.getListDetailGrid(param).subscribe(gridData => {
          this.detailGridData = gridData;
          this.actionVisible = true;
        })
        break;
      case 'RowInserting':
        break;
      case 'RowInserted':
        this.thisService.saveMaster(this.selectedMasterData).subscribe(res => {
          notify({ message: res.msg, width: 500, position: 'top' }, res ? "success" : "error", 3000);
          this.masterSearchBtn.onClick();
        })
        break;
      case 'RowRemoving':
        break;
      case 'RowRemoved':
        this.thisService.deleteMaster(this.selectedMasterData["uid"]).subscribe(res => {
          notify({ message: res.msg, width: 500, position: 'top' }, res ? "success" : "error", 3000);
          this.masterSearchBtn.onClick();
        })
        break;
    }
  }

  setNewUID(old: string, nw: string) {
    for (let row of this.detailGridData) {
      if (row["uid"] == old) {
        row["uid"] = nw;
      }
    }
  }

  onDetailGridEvent(emitee) {
    const selectedData: any[] = emitee.data;
    switch (emitee.eventType) {
      case 'InitNewRow':
        break;
      case 'RowInserting':
        break;
      case 'RowInserted':
        this.thisService.saveDetail(selectedData).subscribe(res => {
          notify({ message: res.msg, width: 500, position: 'top' }, res ? "success" : "error", 3000);
          this.setNewUID(selectedData["uid"], res['list'][0]["uid"]);
        })
        break;
      case 'RowUpdating':
        break;
      case 'RowUpdated':
        this.thisService.saveDetail(selectedData).subscribe(res => {
          notify({ message: res.msg, width: 500, position: 'top' }, res ? "success" : "error", 3000);
        })
        break;
      case 'RowRemoving':
        break;
      case 'RowRemoved':
        this.thisService.deleteDetail(selectedData["uid"]).subscribe(res => {
          notify({ message: res.msg, width: 500, position: 'top' }, res ? "success" : "error", 3000);
        });
        break;
    }
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
