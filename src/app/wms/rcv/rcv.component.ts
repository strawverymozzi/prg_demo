import { Component, OnInit } from '@angular/core';
import { RcvService } from './rcv.service';
import { RCVFORM, RCVSUBFORM, RCVDETAILFORM } from './_form/rcv-form';

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
  //action
  public actionVisible = false;
  public actionSheetData = [
    {
      text: "Cancel", onClick: (e) => {
      }
    },
  ]

  constructor(private thisService: RcvService) { }

  masterSearch = {
    text: '검색',
    icon: 'search',
    onClick: (e) => {
      const param = this.RCVFORM.toRSQL();
      const paramSub = this.RCVSUBFORM.toRSQL();
      const queryStr = param ? param + ';' + paramSub : paramSub
      this.thisService.getListMasterGrid(queryStr).subscribe(gridData => {
        this.masterGridData = gridData;
      });
    }
  };

  masterSave = {
    text: 'Save Master',
    icon: 'save',
    onClick: (e) => {
      this.thisService.saveMaster(this.RCVDETAILFORM).subscribe(res=>{
        
      })
      return false;
    }
  };

  onCancelClick(e) {
    e.cancel = true;
  }

  onMasterGridEvent(emitee) {
    switch (emitee.eventType) {
      case 'RowDblClick':
        const selectedData: any[] = emitee.data[0];
        console.log(selectedData)
        for (let key of Object.keys(this.RCVDETAILFORM)) {
          this.RCVDETAILFORM[key] = selectedData[key];
        }
        const param = this.RCVDETAILFORM.toRSQL();
        this.thisService.getListDetailGrid(param).subscribe(gridData => {
          this.detailGridData = gridData;
          this.actionVisible = true;
        })

        // code block
        break;
    }
  }

  onDetailGridEvent(emitee) {
    switch (emitee.eventType) {
      case 'InitNewRow':

        break;
      case 'RowInserting':

        break;
      case 'RowInserted':
        // this.thisService.insertRowDetailGrid()
        break;
      case 'RowUpdating':

        break;
      case 'RowUpdated':

        break;
      case 'RowRemoving':

        break;
      case 'RowRemoved':

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
