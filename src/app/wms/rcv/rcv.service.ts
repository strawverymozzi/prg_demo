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
    return this.postJson(REGISTRY.RCVMASTERGRID.POST, param).pipe(
      map(data => {
        return data;
      })
    );
  }

  public saveDetail(param?: any): Observable<any> {
    return this.postJson(REGISTRY.RCVDETAILGRID.POST, param).pipe(
      map(data => {
        return data;
      })
    );
  }

  public saveAll(param?: any) {
    return this.postJson(REGISTRY.RCVGRID.POST, param).pipe(
      map(data => {
        return data;
      })
    );
  }

  //delete Output : 0이 정상
  public deleteMaster(id: any[], options: any): Observable<any> {
    return this.delete(REGISTRY.RCVMASTERGRID.DELETE, options).pipe(
      map(data => {
        return data;
      })
    );
  }

  public deleteDetail(id: any[], options: any): Observable<any> {
    return this.delete(REGISTRY.RCVDETAILGRID.DELETE, options).pipe(
      map(data => {
        return data;
      })
    );
  }


}