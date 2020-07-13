import { Injectable } from '@angular/core';
import { CommonHttpService } from 'src/app/common/common.http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { REGISTRY } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class RcvService extends CommonHttpService {

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  //get
  public getListMasterGrid(queryStr?: string): Observable<any> {
    return this.getJson(REGISTRY.RCVMASTERGRID.GET + queryStr).pipe(
      map(data => {
        return data["list"] || [];
      })
    );
  }

  public getListDetailGrid(queryStr?: string): Observable<any> {
    return this.getJson(REGISTRY.RCVDETAILGRID.GET + queryStr).pipe(
      map(data => {
        return data["list"] || [];
      })
    );
  }

  //--입고 저장에서 UID값이 있을경우 Update됨.
  //insert+update
  public saveMaster(param?: any): Observable<any> {
    //   {
    //     "tenant":"1000",
    //     "rcvKey":"신규_RCV0001",
    //     "rcvType":"STD",
    //     "sts":200,
    //     "companycd":"INIT_COMP02",
    //     "rcvSchDate":{
    //        "year":2020,
    //        "month":6,
    //        "day":9
    //     },
    //     "receiveDate":{
    //        "year":2020,
    //        "month":6,
    //        "day":11
    //     },
    //     "logisticscd":"INIT_COMP01",
    //     "warehousecd":"WAREHOUSE_10000"
    //  }
    return this.postJson(REGISTRY.RCVMASTERGRID.POST, param).pipe(
      map(data => {
        return data["list"] || [];
      })
    );
  }

  public saveDetail(param?: any): Observable<any> {
    //{
    //   "tenant": "1000",
    //   "rcvKey": "RCV0001",
    //   "rcvLineNo": 10,
    //   "ownercd": "INIT_COMP01",
    //   "itemAdmincd": "A1000",
    //   "itemcd": "ITEM_CD001",
    //   "expectQty1": 100
    // }
    return this.postJson(REGISTRY.RCVDETAILGRID.POST, param).pipe(
      map(data => {
        return data["list"] || [];
      })
    );
  }

  public saveAll(param?: any) {
    // {
    //   "rcvMasterDto": {
    //     "tenant": "1000",
    //     "rcvKey": "신규_RCV0002",
    //     "rcvType": "STD",
    //     "sts": 200,
    //     "companycd": "INIT_COMP02",
    //     "rcvSchDate": {
    //       "year": 2020,
    //       "month": 6,
    //       "day": 9
    //     },
    //     "receiveDate": {
    //       "year": 2020,
    //       "month": 6,
    //       "day": 11
    //     },
    //     "logisticscd": "INIT_COMP01",
    //     "warehousecd": "WAREHOUSE_10000"
    //   },
    //   "rcvDetailDtoList": [
    //     {
    //       "tenant": "1000",
    //       "rcvKey": "신규_RCV0002",
    //       "rcvLineNo": 10,
    //       "ownercd": "INIT_COMP01",
    //       "itemAdmincd": "A1000",
    //       "itemcd": "ITEM_CD001",
    //       "expectQty1": 100
    //     },
    //     {
    //       "tenant": "1000",
    //       "rcvKey": "신규_RCV0002",
    //       "rcvLineNo": 11,
    //       "ownercd": "INIT_COMP01",
    //       "itemAdmincd": "A1000",
    //       "itemcd": "ITEM_CD002",
    //       "expectQty1": 300
    //     },
    //     {
    //       "tenant": "1000",
    //       "rcvKey": "신규_RCV0002",
    //       "rcvLineNo": 12,
    //       "ownercd": "INIT_COMP01",
    //       "itemAdmincd": "A1000",
    //       "itemcd": "ITEM_CD003",
    //       "expectQty1": 500
    //     }
    //   ]
    // }
    return this.postJson(REGISTRY.RCVGRID.POST, param).pipe(
      map(data => {
        return data["list"] || [];
      })
    );
  }

  //delete Output : 0이 정상
  public deleteMaster(id?: string): Observable<any> {
    return this.delete(REGISTRY.RCVDETAILGRID.GET + id).pipe(
      map(data => {
        return data["list"] || [];
      })
    );
  }

  public deleteDetail(id?: string): Observable<any> {
    return this.delete(REGISTRY.RCVDETAILGRID.GET + id).pipe(
      map(data => {
        return data["list"] || [];
      })
    );
  }


}