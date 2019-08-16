import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoadFolderPage } from './load-folder.page';

const routes: Routes = [
  {
    path: '',
    component: LoadFolderPage
  },
  {
    path: 'music',
    loadChildren: '../music/music.module#MusicPageModule',
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoadFolderPage]
})
export class LoadFolderPageModule {}
