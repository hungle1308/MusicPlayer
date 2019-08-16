import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MusicService } from 'src/app/services/music.service';
import { FileList } from 'src/app/models/file-list.model';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {

  fileList: FileList[];

  constructor(
    private router: Router,
    private musicService: MusicService,
  ) {
  }

  ngOnInit() {
    
  }


}
