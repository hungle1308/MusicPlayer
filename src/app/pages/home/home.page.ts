import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { MusicService } from '../../services/music.service';
import { PlayListOnline } from '../../models/playListOnline.model';
import { Singer } from '../../models/singer.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  search: String = '';
  playListOnline = new PlayListOnline('');
  singer =  [ new Singer('')];
  ImageArray: any = [];
  ImageArrayTopicsSliding: any = [];
  ImageArrayTopics: any = [];
  public segment = 'online';
  public segmentbottom = 'home';
  file: string;
  slideOptions = {
    initialSlide: 1,
    speed: 400,
  };

  constructor(private navCtrl: NavController, private musicService: MusicService) {
    this.ImageArray =
    [
      {image: '../../assets/image/1.jpg'},
      {image: '../../assets/image/2.jpg'},
      {image: '../../assets/image/3.jpg'},
      {image: '../../assets/image/4.jpg'},
      {image: '../../assets/image/5.jpg'},
    ];

    this.ImageArrayTopicsSliding =
    [
      {image: '../../assets/image/tophit.jpg'},
      {image: '../../assets/image/summer.jpg'},
      {image: '../../assets/image/homnaynghegi.jpg'},
      {image: '../../assets/image/nhachot.jpg'},
      {image: '../../assets/image/casivietnam.jpg'},
    ];
    this.ImageArrayTopics =
    [
      {image: '../../assets/image/tophit.jpg'},
      {image: '../../assets/image/summer.jpg'},
      {image: '../../assets/image/homnaynghegi.jpg'},
      {image: '../../assets/image/nhachot.jpg'},
      {image: '../../assets/image/casivietnam.jpg'},
      {image: '../../assets/image/remix.jpg'},
      {image: '../../assets/image/trutinh.jpg'},
      {image: '../../assets/image/top100songs.jpg'},
      {image: '../../assets/image/latin.jpg'},
      {image: '../../assets/image/party.jpg'},
      {image: '../../assets/image/nhacbuon.jpg'},
      {image: '../../assets/image/spa.jpg'},
      {image: '../../assets/image/nhacthuynga.jpg'},
      {image: '../../assets/image/nhachaingoai.jpg'},
      {image: '../../assets/image/indie.jpg'},
      {image: '../../assets/image/yoga.jpg'},
      {image: '../../assets/image/lamviec.jpg'},
      {image: '../../assets/image/cuoituan.jpg'},
      {image: '../../assets/image/taptrunglamviec.jpg'},
      {image: '../../assets/image/nonstop.jpg'},
      {image: '../../assets/image/dulich.jpg'},
      {image: '../../assets/image/casiaumy.jpg'},
      {image: '../../assets/image/bathuaumy.jpg'},
      {image: '../../assets/image/gym.jpg'},
      {image: '../../assets/image/nhacthieunhi.jpg'},
      {image: '../../assets/image/mua.jpg'},
      {image: '../../assets/image/nhacphim.jpg'},
      {image: '../../assets/image/caphe.jpg'},
    ];
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  ngOnInit() {
    // this.getPlayListOnline();
    this.getSinger();
  }

  segmentChanged(event) {
    const valueSegment = event.detail.value;
  }
  segmentBottomChanged(event) {
    const valueSegment = event.detail.value;
  }
  
  getSinger():void{
    this.musicService.getSinger().subscribe(res =>
      {
      this.singer = res;
      console.log(res);
      }
      
    )
  }
  detail(){

  }
}
