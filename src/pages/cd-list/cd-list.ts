import { Collection } from './../../models/Collection';
import { BookAndCdServices } from './../../sevices/collection.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController, ModalController, LoadingController } from 'ionic-angular';
import { LendCdPage } from '../lend-cd/lend-cd';
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the CdListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})

export class CdListPage implements OnInit, OnDestroy {
 

  cdList: Collection[];
  cdSubscription: Subscription;

  constructor(
    public menuCtrl: MenuController,
    public cdServices: BookAndCdServices,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController
    ) {
  }


  ngOnInit(){
    //this.bookList = this.bookService.bookList.slice();
    this.cdList = this.cdServices.cdList.slice();
    
    this.cdSubscription = this.cdServices.cd$.subscribe(
      (cd: Collection[]) =>{
        this.cdList = cd.slice();
      }
    );

     //this.cdServices.emitCds()
     this.onFetchList()
      

  }

  ionViewWillEnter() {
    //this.cdList = this.cdServices.cdList.slice()
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  openModal(index: number) {
    let modal = this.modalCtrl.create(LendCdPage, { index: index });
    modal.present();
  }


  onFetchList() {
    let loader = this.loadingCtrl.create({
      content: 'Récuperation en cours…'
    });
    loader.present();
    this.cdServices.retrieveDataCD().then(
      () => {
        loader.dismiss();
      },
      (error) => {
        loader.dismiss();
      }
    );
  }

  ngOnDestroy(){
    this.cdSubscription.unsubscribe();
  }  

}
