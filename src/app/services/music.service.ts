import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as jsmediatags from 'jsmediatags';
import { FileList } from '../models/file-list.model';
import { PlayListOnline } from '../models/playListOnline.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchPage } from '../pages/search/search.page';
import { Singer } from '../models/singer.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
textSend : string = '';
urlSinger : string = '..//assets/data/singer.json';

  constructor(private httpClient: HttpClient) {
    
  }
getPlayListOnline(str): Observable<PlayListOnline> {

 let  url: string= `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?redirect_uri=http%253A%252F%252Fguardian.mashape.com%252Fcallback&q=${str}&index=0`;
  return this.httpClient.get(url).pipe(map
    (res =>{
      console.log(res);      
      return new PlayListOnline(res);
    }));
}
getSinger(): Observable<Singer[]>{
  return this.httpClient.get(this.urlSinger).pipe(map((res: []) =>{
   return res.map(item =>{
     return new Singer(item);
    })
  }))
  

}
}
