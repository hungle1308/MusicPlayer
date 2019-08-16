import { Component, OnInit, OnDestroy } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnInit, OnDestroy {

  data: any;

  title: any;
  artist: any;
  image: string;
  filename: string;
  playTheTrack: string;
  playList: any[] = [];
  duration: any = -1;

  currPlayingFile: MediaObject;
  storageDirectory: any;
  position: any = 0;
  getPositionInterval: any;

  isPlaying = false;
  isInPlay = false;
  isReady = false;
  getDurationInterval: any;

  displayPosition: any = '00:00';
  displayDuration: any = '00:00';

  constructor(
    public platform: Platform,
    private media: Media,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.musicFile;
        console.log(this.data);
      }
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    // comment out the following line when adjusting UI in browsers
    this.prepareAudioFile();
  }

  prepareAudioFile() {
    this.platform.ready().then(() => {
      // console.log('Result: ', res);
      // this.file.resolveDirectoryUrl(this.storageDirectory).then((resolvedDirectory) => {
      //   console.log("resolved directory: ", resolvedDirectory.nativeURL);
      //   this.file.checkFile(resolvedDirectory.nativeURL, this.filename)
      // })
      this.playTheTrack = this.data.path;
      this.image = this.data.imageURL;
      this.filename = this.data.filename;
      this.getDuration();
    });
  }

  getDuration() {
    console.log('get duration');
    this.currPlayingFile = this.media.create(this.playTheTrack);
    console.log(this.currPlayingFile);
    // on occassions, the plugin only gives duration of the file if the file is played
    // at least once
    this.currPlayingFile.play();
    this.currPlayingFile.setVolume(0.0);  // you don't want users to notice that you are playing the file
    const self = this;
    // The plugin does not give the correct duration on playback start
    // Need to check for duration repeatedly
    let tempDuration = self.duration;
    this.getDurationInterval = setInterval(() => {
      if (self.duration === -1 || !self.duration) {
        // tslint:disable-next-line: no-bitwise
        self.duration = ~~(self.currPlayingFile.getDuration());  // make it an integer
        // console.log(self.duration);
      } else {
        if (self.duration !== tempDuration) {
          tempDuration = self.duration;
          console.log(self.duration);
        } else {
          self.currPlayingFile.stop();
          self.currPlayingFile.release();

          clearInterval(self.getDurationInterval);
          console.log(self.duration);
          this.displayDuration = this.toHHMMSS(self.duration);
          self.setToPlayback();
        }
      }
    }, 100);
  }

  setToPlayback() {
    this.currPlayingFile = this.media.create(this.playTheTrack);
    this.currPlayingFile.onStatusUpdate.subscribe(status => {
      switch (status) {
        case 1:
          break;
        case 2:   // 2: playing
          this.isPlaying = true;
          break;
        case 3:   // 3: pause
          this.isPlaying = false;
          break;
        case 4:   // 4: stop
        default:
          this.isPlaying = false;
          break;
      }
    });
    console.log('audio file set');
    this.isReady = true;
    this.getAndSetCurrentAudioPosition();
  }

  getAndSetCurrentAudioPosition() {
    const diff = 1;
    const self = this;
    this.getPositionInterval = setInterval(() => {
      const lastPosition = self.position;
      self.currPlayingFile.getCurrentPosition().then((position) => {
        if (position >= 0 && position < self.duration) {
          if (Math.abs(lastPosition - position) >= diff) {
            // set position
            self.currPlayingFile.seekTo(lastPosition * 1000);
            console.log(lastPosition);

          } else {
            // update position for display
            self.position = position;
            console.log(position);
            this.displayPosition = this.toHHMMSS(self.position);
          }
        } else if (position >= self.duration) {
          self.stop();
          self.setToPlayback();
        }
      });
    }, 100);
    this.playList.push(this.currPlayingFile);
    console.log('Play List: ', this.playList);
  }


  play() {
    // for(let songs of this.playList){
    //   songs.play();
    //   console.log(songs);
    // }
    this.currPlayingFile.play();
  }

  pause() {
    this.currPlayingFile.pause();
    // for(let songs of this.playList){
    //   songs.pause();
    // }
  }

  stop() {
    // for(let songs of this.playList){
    //   songs.stop();
    //   songs.release();
    //   clearInterval(this.getPositionInterval);
    //   this.position = 0;
    // }
    this.currPlayingFile.stop();
    this.currPlayingFile.release();
    clearInterval(this.getPositionInterval);
    this.position = 0;
  }

  controlSeconds(action) {
    const step = 5;
    const numberRange = this.position;
    switch (action) {
      case 'back':
        this.position = numberRange < step ? 0.001 : numberRange - step;
        break;
      case 'forward':
        this.position = numberRange + step < this.duration ? numberRange + step : this.duration;
        break;
      default:
        break;
    }
  }

  ngOnDestroy() {
    console.log(' ngOnDestroy called');
    this.stop();
  }

  toHHMMSS(secs) {
    const secNum = parseInt(secs, 10);
    const minutes = Math.floor(secNum / 60) % 60;
    const seconds = secNum % 60;

    return [minutes, seconds]
      .map(v => v < 10 ? '0' + v : v)
      .filter((v, i) => v !== '00' || i >= 0)
      .join(':');
  }
}
