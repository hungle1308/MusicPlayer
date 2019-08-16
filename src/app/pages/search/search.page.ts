import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { map } from 'rxjs/operators';
import { PlayListOnline } from 'src/app/models/playListOnline.model';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  isInputText: boolean;
  search = '';
  playListOnline = new PlayListOnline('');
  constructor(
    private music: MusicService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isInputText = false;
  }
  presentSearch() {
  }
  send() {

    let reseach = / /gi;
    let str = this.search.replace(reseach, "%");
    console.log(str);
    this.music.getPlayListOnline(str).subscribe(res => {
      if (res.data.length == 0) {
        alert('không có nội dung nào phù hợp');
      }
      if (res != null) {
        this.playListOnline = res;
        this.isInputText = true;
      }

    });
  }

  goPlay(file) {
    const navigationExtras: NavigationExtras = {
      state: {
        musicFile: file,
      }
    };
    this.router.navigate(['search/music-online'], navigationExtras);
  }

}


