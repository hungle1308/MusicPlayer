import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MENU } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private _menu: string = MENU;

  constructor(private http: HttpClient) { }

  getMenuContent(): Observable<any>{
    return this.http.get(this._menu);
  }
}
