import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as jsmediatags from 'jsmediatags';
import { FileList } from 'src/app/models/file-list.model';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-load-folder',
  templateUrl: './load-folder.page.html',
  styleUrls: ['./load-folder.page.scss'],
})
export class LoadFolderPage implements OnInit {

  fileList: FileList[] = [];
  key = 'musicDB';
  showLoader = false;
  index = 0;
  loading: any;
  i = 0;

  constructor(
    public platform: Platform,
    private storage: Storage,
    private router: Router,
    private file: File,
    private loadingController: LoadingController,
  ) {
  }

  ngOnInit() {
    this.getNativeFile();
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      message
    });
    return this.loading.present();
  }

  getNativeFile() {
    this.platform.ready().then(() => {
      console.log('Home');
      this.storage.get('musicDB').then((data) => {
        console.log('Test: ', data);
        if (data) {
          if (Array.isArray(data)) {
            if (data.length) {
              this.fileList = data;
              console.log('List: ', this.fileList);
            } else {
              console.log('Test');
              this.getData();
            }
          }
        } else {
          console.log('Test');
          this.getData();
        }
      },
        (error) => {
          console.log(error);
          this.getData();
        });
    });
  }

  goPlay(file) {
    const navigationExtras: NavigationExtras = {
      state: {
        musicFile: file,
      }
    };
    this.router.navigate(['load-folder/music'], navigationExtras);
  }

  getData() {
    this.showLoader = true;
    if (this.showLoader === true) {
      this.presentLoading('Đồng bộ dữ liệu từ thiết bị...');
    }
    this.file.listDir(this.file.externalRootDirectory, '').then((result) => {
      console.log('get data...', result);
      console.log('length data :', result.length);
      for (const item of result) {
        this.i += 1;
        if (item.isDirectory === true && item.name !== '.' && item.name !== '..') {
          this.getFileList(item.name); // Get all the files inside the folder. recursion will probably be useful here.
        } else if (item.isFile === true) {
          // File found
          if ((item.name.indexOf('.mp3') !== -1 && item.name.indexOf('AUD-') === -1 && item.name.indexOf('._') === -1)
            || (item.name.indexOf('.flac') !== -1 && item.name.indexOf('AUD-') === -1 && item.name.indexOf('._') === -1)) {
            jsmediatags.read(item.toInternalURL(), {
              onSuccess: (res) => {
                console.log('get data??? ', res);
                const tags = res.tags;
                const image = res.picture;
                let base64 = '';
                if (image) {
                  let base64String = '';
                  for (const img of image.data.length) {
                    base64String += String.fromCharCode(img);
                  }
                  base64 = 'data:image/jpeg;base64,' + window.btoa(base64String);
                }
                if (base64) {
                  this.fileList.push(new FileList({
                    filename: item.name,
                    path: item.nativeURL,
                    imageURL: base64
                  }));
                } else {
                  this.fileList.push(new FileList({
                    filename: item.name,
                    path: item.nativeURL,
                    imageURL: './assets/image/music.jpg'
                  }));
                }
              },
              onError: (error) => {
                console.log(error);
                this.fileList.push(new FileList({
                  filename: item.name,
                  path: item.nativeURL,
                  imageURL: './assets/image/music.jpg'
                }));
              }
            });
          }
        }
      }
      if (this.i === result.length) {
        console.log('Length of files ' , result.length);
        console.log('here...');
        this.showLoader = false;
        if (this.showLoader === false) {
          this.loading.dismiss();
        }
      }
    }).catch(error => {
      console.log(error);
    });
    this.storage.get('musicDB').then(data => {
      if (data) {
        if (Array.isArray(data)) {
          if (data.length) {
            this.fileList = data;
          }
        }
      }
    });
  }

  public getFileList(path: string): any {
    const file = new File();
    this.file.listDir(file.externalRootDirectory, path).then((result) => {
      console.log('What: ', result);
      for (const item of result) {
        if (item.isDirectory === true && item.name !== '.' && item.name !== '..') {
          this.getFileList(path + '/' + item.name);
        } else if (item.isFile === true) {
          if ((item.name.indexOf('.mp3') !== -1 && item.name.indexOf('AUD-') === -1 && item.name.indexOf('._') === -1)
            || (item.name.indexOf('.flac') !== -1 && item.name.indexOf('AUD-') === -1 && item.name.indexOf('._') === -1)) {
            jsmediatags.read(item.toInternalURL(), {
              onSuccess: (res) => {
                console.log('get list : ', res);
                const tags = res.tags;
                const image = res.picture;
                let base64 = '';
                if (image) {
                  let base64String = '';
                  for (const img of image.data.length) {
                    base64String += String.fromCharCode(img);
                  }
                  base64 = 'data:image/jpeg;base64,' + window.btoa(base64String);
                }
                if (base64) {
                  this.fileList.push(new FileList({
                    filename: item.name,
                    path: item.nativeURL,
                    imageURL: base64
                  }));
                } else {
                  this.fileList.push(new FileList({
                    filename: item.name,
                    path: item.nativeURL,
                    imageURL: './assets/image/music.jpg'
                  }));
                }
              },
              onError: (error) => {
                console.log(error);
                this.fileList.push(new FileList({
                  filename: item.name,
                  path: item.nativeURL,
                  imageURL: './assets/image/music.jpg'
                }));
              }
            });
          }
        }
      }
      this.storage.set(this.key, this.fileList);
    }).catch(error => {
      console.log(error);
    });
  }

}
